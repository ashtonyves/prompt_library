---
name: playground
description: "Build an internal design-exploration workspace in a web app: a /playground route directory listing every page as a screenshot card (with title, path, and last-modified date), plus per-component variation labs for comparing design alternatives side by side against a live production baseline. Includes a headless-Chrome screenshot capture script, a sticky table of contents with scroll-spy, cards/list view toggle, and grouped sections that visually separate internal tooling from shipped product pages. Use when the user wants to explore design ideas or variations, compare design alternatives, redesign an existing component, needs an index or directory of all routes/pages in an app, wants screenshots of every page, or says 'playground', 'design exploration', 'variations', 'try some options', 'explore ideas for this', 'lab page', or 'show me all the pages'."
---

# Playground

An internal workspace for exploring design ideas inside a real app. Two pieces:

1. **`/playground`** — a directory of every route, as screenshot cards. Makes the
   app's surface area visible and gives every experiment a home you can find later.
2. **A variations lab** per component under exploration (e.g. `/diagram-lab`) —
   alternatives stacked against identical content, with the current production
   version as variation 01.

**Core insight:** design exploration needs a *live baseline in the same viewport*.
Comparing a new concept against a remembered one is guesswork. Everything here
exists to put the real current component next to the alternatives.

Both are internal: `noindex, nofollow`, never linked from site nav, and nothing
is wired into production until a winner is picked.

## Workflow

### 1. Survey the routes

Find every route and its title. Don't guess paths — read them.

```bash
grep -rn "createFileRoute\|createBrowserRouter\|<Route " src/ | head -40
```

Then for each route file, pull the page `title` from its head/meta block.

Handle two special cases:

- **Dynamic routes** (`/case/$token`, `/user/:id`) — grep for a demo fixture
  (`DEMO_TOKEN`, `demo`, `fixture`). One often exists and makes the route
  linkable (e.g. `/case/demo`), sometimes with query-param variants
  (`?role=dispatcher`, `?state=closed`) worth listing as separate entries.
- **Auth-gated routes** — they'll screenshot as a login screen. Mark them.

### 2. Build the directory page

Copy `assets/playground-page.tsx` into the host's routes directory and adapt:
the route-definition idiom, the header component, and the `ENTRIES` array.

`ENTRIES` is the single source of truth. `GROUP_ORDER`, the TOC, section counts,
and anchors all derive from it — adding a route is appending one entry.

Grouping guidance:

- Group by **role in the product**, not by directory. Marketing / Case views /
  Agent console reads better than a mirror of `src/routes/`.
- Put the **design sandboxes group first** — that's what's actively being worked
  in. It renders inside a dashed, tinted container with an "Internal" pill,
  because sandboxes are tooling, not product.
- Entry points belong with what they produce (an intake flow that creates a case
  belongs with the case views, not with marketing).

### 3. Capture screenshots

Copy `scripts/capture-shots.sh` into the host's `scripts/`, and write a
`routes.txt` beside it with one `slug|path` per line:

```
home|/
about|/about
case-driver|/case/demo
case-dispatcher|/case/demo?role=dispatcher
```

Run it with the dev server up:

```bash
bash scripts/capture-shots.sh
```

It finds Chrome across platforms, writes `public/playground-shots/*.png`, and
emits `mtimes.json` for the "last modified" dates. No new dependencies — no
Playwright or Puppeteer install.

Re-run after meaningful UI changes; captures are static and go stale silently.

### 4. Build a variations lab

Copy `assets/variations-lab.tsx`, named for what's being explored
(`diagram-lab.tsx`, `nav-lab.tsx`). Add it to `ENTRIES` under the sandboxes group.

Rules that make it work:

- **Variation 01 is always the unmodified production component.** Non-negotiable.
- Give each variation a **name and a one-line rationale** ("Radial. Most iconic
  at a glance.") so the tradeoff under test is legible.
- Export variants as siblings from the same component file, so they share the
  real design tokens instead of drifting into invented styles.
- Keep the width switcher and baseline-grid overlay — but see the breakpoint
  caveat in `references/gotchas.md`.

### 5. Verify in a browser

Load the pages and confirm: thumbnails resolve, TOC anchors hit real ids, the
view toggle switches, and the scroll-spy tracks. Check mobile too — the TOC is a
sticky chip rail there.

Assert against the live DOM rather than the console. **Read
`references/gotchas.md` before debugging anything scroll-related** — automated
browser panes produce several convincing false failures.

## What the directory page includes

Already built into the template:

- **Screenshot cards** — thumbnail, title, path, note, last-modified date
- **Cards / List toggle** — persisted in `localStorage`; list view is a dense
  one-line-per-route scan
- **Sticky TOC** — sidebar on desktop, horizontally-scrollable chip rail pinned
  under the header on mobile; active section highlights while scrolling
- **Grouped sections** with per-group counts
- **Sandbox container** — dashed border, tint, "Internal" pill
- **New-tab links** — every route opens in its own tab, so the directory stays put
- **Honest empty states** — "Gated" badges, "No capture" placeholders,
  "Modified unknown" instead of invented dates

## Non-obvious details

`references/gotchas.md` covers the things that cost real debugging time. Read it
before implementing the scroll-spy or verifying scroll behavior. Highlights:

- Scroll-spy: use scroll position, **not** IntersectionObserver
- `target="_blank"` needs a plain `<a>`, not a router `Link`
- `scroll-behavior` must be on `html`, not a wrapper div
- Don't read `localStorage` during initial render (SSR hydration)
- Don't use a server function for file mtimes — write JSON from the capture script
- Never display an mtime you know is bogus (`1979` epochs) — say "unknown"
- The width switcher tests reflow, **not** breakpoints

## Honesty rules

This workspace is a decision-making tool, so it must not overstate what it shows:

- A gated route's thumbnail shows the **login screen** — label it as such.
- An unrecoverable date is **"Modified unknown"**, never a plausible-looking guess.
- A screenshot is a **static capture**, not a live render — say when it may be stale.
- The width switcher tests **content reflow**, not responsive breakpoints.
