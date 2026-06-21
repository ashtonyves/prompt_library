---
name: playground
description: "Spin up visual UI prototypes fast, each at /playground/NAME, navigable from a collapsible left-nav. Auto-detects whether it's inside an existing web app (adds a route there) or a non-app environment (scaffolds a dedicated portable Vite + React + Tailwind playground). Use when the user wants to quickly prototype an idea, mock up a screen, sketch a UI variation, or says 'make a playground page', 'prototype this', 'new playground', or '/playground'. Triggers on: playground, prototype, mock up, sketch a UI, quick prototype, scaffold a prototype, /playground/NAME."
argument-hint: "[page-name] [one-line idea]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Playground

Spin up visual prototypes fast. Each prototype lives at `/playground/NAME` and is reachable from a collapsible left-nav. The skill's job is to remove the friction between "I have an idea" and "I'm looking at it in a browser" — scaffold immediately, then iterate.

**Core insight:** A playground is a *registry of pages*, not a pile of files. Every prototype self-registers in one manifest so the nav and the routes never drift apart. Adding a page is appending one entry.

## Quick Start

**Make a new prototype (adaptive — the default):**
> `/playground card-grid` — "a dark grid of cards with a floating add button"
> `/playground` — (asks for a name + one-line idea, then builds)

**Iterate an existing prototype:**
> "make the cards in /playground/card-grid bigger and add a hover state"

The skill asks for only two things — a **page name** and a **one-line idea** — then scaffolds and shows you the result. Everything else it infers; you refine after.

---

## Core Principles

These apply to ALL modes:

1. **Scaffold first, refine after** — Don't interrogate. Get something on screen from name + one line, then iterate with the user. Speed is the whole point.

2. **The manifest is the source of truth** — Pages register in one routes manifest. The nav is *generated from* that manifest, never hand-maintained in parallel. Add a page = add a manifest entry + a page file. Never edit the nav list directly.

3. **Minimal chrome, maximal canvas** — The shell is just a collapsible left-nav + a content area in neutral dark mode. The prototype owns its own look. Don't impose a design system on the page content.

4. **Respect the host** — Inside an existing app, detect its framework and conventions and fit in. Confirm the route path before writing. Never reformat or restructure the host app to suit the playground.

5. **Portable when standalone** — In a non-app environment, the scaffold is self-contained (Vite + React + Tailwind) and runnable with `npm install && npm run dev`. No assumptions about the surrounding repo.

6. **URL-safe names** — A page name becomes a URL segment and an identifier. Slugify it (lowercase, hyphens) for the route; keep a human label for the nav. Never put a raw, unslugified name in a path.

---

## Entry Point Detection

First **detect the environment**, then route. Detection drives everything.

```
Is there a package.json with a web framework (next / vite / react-scripts / @remix-run)?
├── No package.json, or no web framework
│   ├── Does a playground already exist here (playground/ dir with its own package.json)?
│   │   ├── No  → workflows/scaffold-new-playground.md   (create the portable app + first page)
│   │   └── Yes → workflows/add-page-to-playground.md    (just add a page to it)
└── Yes — we're inside an existing web app
    └── workflows/add-page-existing-app.md               (detect framework, confirm path, add route + manifest entry)
```

Run this to detect quickly (from the directory the user is working in):

- Look for `package.json` at the repo root and in obvious app subdirs.
- Grep its `dependencies` for `next`, `vite`, `react-scripts`, `@remix-run`.
- Look for an existing `playground/` directory containing its own `package.json` (a previously-scaffolded portable playground).

| Situation | Route To |
|-----------|----------|
| No framework found, no existing playground | `workflows/scaffold-new-playground.md` |
| No framework found, playground already scaffolded | `workflows/add-page-to-playground.md` |
| Inside an existing web app (Next/Vite/CRA/Remix) | `workflows/add-page-existing-app.md` |
| Ambiguous (e.g. multiple apps, monorepo) | Ask which target, then route |

**After selecting a workflow, read it and follow it exactly.**

---

## Adaptive Intake

Every mode starts the same minimal way. Don't expand this into a questionnaire.

1. **Get the page name.** From `$ARGUMENTS[0]` if provided; otherwise ask: *"What should this prototype be called?"* Slugify for the route, keep the original as the nav label.
2. **Get the one-line idea.** From the rest of `$ARGUMENTS` if provided; otherwise ask: *"One line — what's the idea?"*
3. **Scaffold immediately.** Build the page from those two inputs. Make reasonable design choices; don't ask about colors, layout, or libraries up front.
4. **Then iterate.** Show what you built and invite refinement.

If both name and idea are already in `$ARGUMENTS`, ask nothing — go straight to scaffolding.

---

## Reference Index

All domain knowledge in `references/`:

| File | Contents | Load When |
|------|----------|-----------|
| [nav-registration.md](references/nav-registration.md) | The manifest contract — how a page self-registers, how the nav is generated, how slugs map to routes | **Always** (every mode touches the manifest) |
| [framework-detection.md](references/framework-detection.md) | Detecting Next/Vite/CRA/Remix and where routes + nav live in each | Existing-app mode only |

## Workflow Index

| Workflow | Purpose |
|----------|---------|
| [scaffold-new-playground.md](workflows/scaffold-new-playground.md) | Non-app environment → create the portable Vite + React + Tailwind playground and its first page |
| [add-page-to-playground.md](workflows/add-page-to-playground.md) | Playground already exists → add a page and register it |
| [add-page-existing-app.md](workflows/add-page-existing-app.md) | Inside an existing app → detect framework, confirm route path, add the route + manifest entry |

## Templates

| Template | Use When |
|----------|----------|
| [templates/vite-playground/](templates/vite-playground/) | The full portable scaffold — copied wholesale when creating a new playground |
| [templates/prototype-page.tsx](templates/prototype-page.tsx) | The blank prototype page stub — the starting point for every new page in every mode |
