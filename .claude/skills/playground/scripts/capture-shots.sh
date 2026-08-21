#!/usr/bin/env bash
# Capture a screenshot of each route into the public shots directory, and record
# route file mtimes alongside them.
#
#   bash scripts/capture-shots.sh
#
# Routes come from routes.txt (one "slug|path" per line) next to this script, or
# from ROUTES_FILE. Requires a Chrome/Chromium binary and a running dev server.
#
# Re-run whenever a page changes — the shots are static files, not live renders.
set -euo pipefail

BASE="${BASE:-http://localhost:8080}"
OUT="${OUT:-public/playground-shots}"
ROUTES_FILE="${ROUTES_FILE:-$(dirname "$0")/routes.txt}"
ROUTES_DIR="${ROUTES_DIR:-src/routes}"

# Chrome ships under different names/paths per platform.
find_chrome() {
  if [ -n "${CHROME:-}" ]; then echo "$CHROME"; return; fi
  for c in \
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
    "/Applications/Chromium.app/Contents/MacOS/Chromium" \
    "$(command -v google-chrome || true)" \
    "$(command -v chromium || true)" \
    "$(command -v chromium-browser || true)"; do
    [ -n "$c" ] && [ -x "$c" ] && echo "$c" && return
  done
}

CHROME_BIN="$(find_chrome)"
if [ -z "$CHROME_BIN" ]; then
  echo "No Chrome/Chromium found. Set CHROME=/path/to/chrome and retry." >&2
  exit 1
fi

if ! curl -sf -o /dev/null "$BASE"; then
  echo "Dev server not responding at $BASE — start it first." >&2
  exit 1
fi

if [ ! -f "$ROUTES_FILE" ]; then
  echo "No routes file at $ROUTES_FILE (expected 'slug|path' lines)." >&2
  exit 1
fi

mkdir -p "$OUT"

while IFS= read -r entry || [ -n "$entry" ]; do
  # Skip blanks and comments.
  case "$entry" in ''|\#*) continue ;; esac
  slug="${entry%%|*}"
  path="${entry#*|}"
  printf 'Capturing %-18s %s\n' "$slug" "$path"
  # --virtual-time-budget lets fonts/images settle before the shot.
  "$CHROME_BIN" --headless --disable-gpu --hide-scrollbars \
    --virtual-time-budget=4000 \
    --window-size=1280,800 \
    --screenshot="$OUT/$slug.png" \
    "$BASE$path" >/dev/null 2>&1 || echo "  ! failed: $slug" >&2
done < "$ROUTES_FILE"

echo "Done — wrote to $OUT/"

# Record mtimes so the directory page can show "last modified" without a server
# round-trip. Files with a pre-2000 epoch (archive extracts, no git history)
# are emitted as null so the page can say "unknown" instead of a bogus date.
node -e '
const {statSync,writeFileSync,readdirSync,existsSync}=require("fs");
const {join}=require("path");
const dir=process.argv[1], out=process.argv[2];
if(!existsSync(dir)){ console.log("No "+dir+" — skipping mtimes."); process.exit(0); }
const walk=(d)=>readdirSync(d,{withFileTypes:true}).flatMap(e=>{
  const p=join(d,e.name);
  return e.isDirectory()?walk(p):(/\.(tsx|ts|jsx|js|vue|svelte)$/.test(e.name)?[p]:[]);
});
const res={};
for(const f of walk(dir)){
  try{ const s=statSync(f); res[f]= s.mtime.getUTCFullYear()<2000 ? null : s.mtime.getTime(); }
  catch{ res[f]=null; }
}
writeFileSync(join(out,"mtimes.json"), JSON.stringify(res,null,2));
console.log("Wrote mtimes.json ("+Object.keys(res).length+" routes)");
' "$ROUTES_DIR" "$OUT"
