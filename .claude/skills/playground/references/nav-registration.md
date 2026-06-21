# Nav Registration — The Manifest Contract

Every playground, in every mode, follows one rule: **pages register in a single manifest, and the left-nav is generated from it.** This is the one principle all three workflows share. Read this before touching any nav or route.

## The contract

There is exactly one file — `playground.routes.ts` (or `.tsx`) — that exports an array of route entries. The router builds routes from it. The nav builds links from it. Neither is hand-maintained.

```ts
// playground.routes.ts
import type { ComponentType } from "react";
import CardGrid from "./pages/card-grid";
import FeedExploration from "./pages/feed-exploration";

export type PlaygroundRoute = {
  slug: string;        // URL segment, lowercase-hyphenated → /playground/card-grid
  label: string;       // human label shown in the nav → "Card grid"
  Component: ComponentType;
};

export const routes: PlaygroundRoute[] = [
  { slug: "card-grid", label: "Card grid", Component: CardGrid },
  { slug: "feed-exploration", label: "Feed exploration", Component: FeedExploration },
];
```

**Adding a page is two edits, never three:**
1. Create the page file under `pages/<slug>.tsx`.
2. Append one entry to `routes` (import + array item).

That's it. The nav updates because it maps over `routes`. The router resolves `/playground/:slug` against `routes`. There is no third place to keep in sync — and that is the point of Principle 2.

## Slug rules

The name the user gives becomes both a URL segment and an import. Normalize it:

- Lowercase.
- Spaces and underscores → single hyphens.
- Strip anything that isn't `a-z`, `0-9`, or `-`.
- Collapse repeated hyphens; trim leading/trailing hyphens.
- Keep the **original** text (or a title-cased version) as `label`.

| User says | `slug` | `label` |
|-----------|--------|---------|
| `Card Grid` | `card-grid` | `Card grid` |
| `V3 Frosted Blur` | `v3-frosted-blur` | `V3 frosted blur` |
| `feed_exploration` | `feed-exploration` | `Feed exploration` |

If a slug already exists in the manifest, **don't silently overwrite** — tell the user it exists and ask whether to open it for iteration or pick a new name.

## How the router consumes it

The portable scaffold uses `react-router-dom`. Routes are derived, not enumerated by hand:

```tsx
// App.tsx (essence)
import { routes } from "./playground.routes";

<Routes>
  <Route path="/" element={<Home />} />
  {routes.map(({ slug, Component }) => (
    <Route key={slug} path={`/playground/${slug}`} element={<Component />} />
  ))}
</Routes>
```

## How the nav consumes it

```tsx
// Nav.tsx (essence)
import { NavLink } from "react-router-dom";
import { routes } from "./playground.routes";

{routes.map(({ slug, label }) => (
  <NavLink key={slug} to={`/playground/${slug}`}>{label}</NavLink>
))}
```

The nav is collapsible — a toggle controls a `collapsed` state that narrows the rail to icons/initials. Collapsing is pure UI; it does not touch the manifest.

## Existing-app variants

Inside a host app, the same contract holds but the file location and import style follow the host's conventions (see [framework-detection.md](framework-detection.md)):

- **Vite/CRA host** → mirror the portable approach: a `playground.routes.ts` manifest + a derived nav, mounted under the host's router at `/playground/*`.
- **Next.js app router** → routing is filesystem-native (`app/playground/[slug]/page.tsx` *or* `app/playground/<slug>/page.tsx`), so the **router half** of the contract is the filesystem. But the **nav half still needs a manifest** — keep a `playground.routes.ts` (data only: `{ slug, label }`, no `Component`) that the playground layout's nav maps over. Filesystem gives you routes; the manifest gives you the nav. Both must be updated when adding a page.

## Gotchas

- **Don't hand-edit the nav list.** If you find yourself adding a `<NavLink>` by hand, stop — add a manifest entry instead. A nav that's edited in parallel with the manifest is exactly the drift this design exists to prevent.
- **Don't forget the import when appending a manifest entry.** The array item references `Component`; an entry without its matching `import` is a build error. Two lines, always together.
- **Don't put an unslugified name in a path or filename.** `/playground/Card Grid` and `pages/Card Grid.tsx` break routing and imports. Slugify first, every time.
- **Don't overwrite an existing slug without asking.** Re-running with a name that's already registered should offer to iterate the existing page, not clobber it.
- **In Next.js, don't assume the manifest also drives routes.** It only drives the nav there; the route comes from the file you create under `app/playground/`. Skipping the file (and only editing the manifest) yields a nav link that 404s.
