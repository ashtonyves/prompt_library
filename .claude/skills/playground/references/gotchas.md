# Gotchas

Hard-won details. Each of these cost real debugging time; none are obvious from
reading the code.

## Contents

- [Scroll-spy: don't use IntersectionObserver](#scroll-spy-dont-use-intersectionobserver)
- [Verifying scroll behavior in an automated browser](#verifying-scroll-behavior-in-an-automated-browser)
- [target="_blank" needs a plain anchor, not a router Link](#targetblank-needs-a-plain-anchor-not-a-router-link)
- [scroll-behavior belongs on html](#scroll-behavior-belongs-on-html)
- [SSR + localStorage: hydration mismatch](#ssr--localstorage-hydration-mismatch)
- [Server functions for file mtimes: don't](#server-functions-for-file-mtimes-dont)
- [Bogus file mtimes](#bogus-file-mtimes)
- [Width switcher does not test breakpoints](#width-switcher-does-not-test-breakpoints)
- [Screenshots go stale silently](#screenshots-go-stale-silently)
- [Gated and dynamic routes](#gated-and-dynamic-routes)

---

## Scroll-spy: don't use IntersectionObserver

The obvious implementation — observe each section, highlight whichever is
intersecting — fails in two distinct ways:

1. **First section pins forever.** Short trailing sections never satisfy a
   viewport-fraction `rootMargin` threshold, so they never fire.
2. **Last section pins forever.** A naive "if scrolled to bottom, highlight the
   last section" fix triggers on any page barely taller than the viewport.

Working approach — plain scroll position:

```js
// Last heading scrolled past the sticky header wins.
const passed = elements.filter((el) => el.getBoundingClientRect().top <= 140);
let current = passed[passed.length - 1] ?? elements[0];

// At the very bottom, promote the last section ONLY if it's actually on screen.
if (maxScroll > 0 && scrollTop >= maxScroll - 2) {
  const last = elements[elements.length - 1];
  if (last && last.getBoundingClientRect().top < window.innerHeight) current = last;
}
```

Hoist the id array to a module constant so the effect isn't re-run by a new
array identity on every render.

### Expected non-bug at page end

If the last section is short, jumping to the second-to-last section and the last
section can resolve to the *same* final scroll position — the page can't scroll
further. The spy then highlights the last one. That is correct end-of-page
behavior, not a defect. Verify before "fixing" it:

```js
const target = el.getBoundingClientRect().top + document.documentElement.scrollTop - 110;
const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
target > maxScroll; // true → capped by page end, not a spy bug
```

## Verifying scroll behavior in an automated browser

Automated browser panes are unreliable for scroll testing. Observed failure
modes, all of which look like application bugs but are not:

- **Synthetic scroll times out** when the pane is hidden.
- **`window.scrollTo` silently no-ops** while `scroll-behavior: smooth` is set,
  because the scroll animates asynchronously.
- **Native scroll events don't fire** when the harness scrolls the pane, so a
  correct listener appears dead.
- **Console logs are a cumulative buffer** that isn't cleared across
  navigations, so stale HMR errors from earlier edits look current.

Reliable procedure:

```js
const prev = document.documentElement.style.scrollBehavior;
document.documentElement.style.scrollBehavior = 'auto';  // disable smooth
window.scrollTo(0, y);
window.dispatchEvent(new Event('scroll'));               // harness won't
// ...assert...
document.documentElement.style.scrollBehavior = prev;
```

Prefer asserting on the live DOM (`aria-current`, computed styles, element
counts) over reading the console. When a render truly fails, the error boundary
puts "is not defined" in `document.body.innerText` — check that instead.

## target="_blank" needs a plain anchor, not a router Link

A client-side router `Link` intercepts the click to navigate in place, which
defeats `target="_blank"`. Use a plain `<a href target="_blank" rel="noreferrer">`.
This also restores native middle-click and ⌘-click behavior.

Remove the now-unused router import or lint will flag it.

Keep TOC anchors as same-tab links — they're in-page jumps.

## scroll-behavior belongs on html

The scroll container is `<html>`, so a `scroll-smooth` class on a wrapper `div`
does nothing. Scope it with an inline `<style>` block on the page, and honor
reduced motion:

```html
<style>
  html { scroll-behavior: smooth; }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
</style>
```

Pair with `scroll-mt-28` on each section so headings clear the sticky header(s).

## SSR + localStorage: hydration mismatch

Reading `localStorage` during the initial render breaks SSR hydration. Initialize
state to the default, then apply the stored preference in an effect after mount:

```js
const [view, setView] = useState("cards");            // same on server + client
useEffect(() => {
  const stored = localStorage.getItem(VIEW_STORAGE_KEY);
  if (stored === "cards" || stored === "list") setView(stored);
}, []);
```

## Server functions for file mtimes: don't

A server function reading mtimes at request time is the "right" instinct and it
fails in practice: the query resolves during SSR, never hits the network, and
renders empty. Debugging it is not worth it for what is effectively static
build-time data.

Write `mtimes.json` from the capture script and `fetch` it. Same source of truth
as the screenshots, refreshed by the same command, and it cannot break the page.

## Bogus file mtimes

Repos extracted from an archive often carry a `1979-11-30` epoch on most files.
If there's no git history either, those dates are genuinely unrecoverable.

Emit `null` for any pre-2000 mtime and render "Modified unknown". Never display
a date you know is wrong. If the repo *is* a git checkout, prefer
`git log -1 --format=%ct -- <file>` for real authored dates.

## Width switcher does not test breakpoints

The lab's width buttons constrain a *container*, not the viewport, so `lg:`
utilities don't fire. At "Mobile 390" a component may still show its 3-column
desktop layout.

It's an accurate test of **content reflow at a given measure**, not of
**responsive behavior**. Say so when handing it over. For real breakpoint
testing, resize the browser viewport.

## Screenshots go stale silently

Captures are static PNGs. A page changes; its thumbnail doesn't. Nothing warns
you. Re-run the capture script after meaningful UI changes — especially for the
directory page's own thumbnail, which changes every time the directory changes.

Blank grey card images during verification are usually `loading="lazy"` still in
flight, not broken files. Confirm before chasing it:

```js
const imgs = [...document.querySelectorAll('img[alt^="Screenshot"]')];
imgs.filter(i => i.complete && i.naturalWidth === 0);  // genuinely broken
```

## Gated and dynamic routes

- **Auth-gated routes** screenshot as their login screen. Two gated routes
  produce byte-identical files — a useful signal. Mark them with a "Gated" badge
  and a note, so the thumbnail isn't mistaken for the real page.
- **Dynamic routes** (`/case/$token`) have no linkable URL. Check for a demo
  fixture in the codebase first — one may make the route reachable (e.g.
  `/case/demo`), often with query-param variants worth listing separately. If
  none exists, render a non-clickable card with a "No capture" placeholder and
  say what's needed to reach it.
