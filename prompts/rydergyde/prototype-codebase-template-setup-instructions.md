# RyderGyde Prototype Codebase - Instructions to link to component library

This prototype uses components from `rg-core-library`, the RyderGyde design system.

---

## AI Setup Guide

> **For Claude Code / AI Assistants:** Use this section when setting up new projects that consume `rg-core-library`.

### Quick Setup Checklist

```bash
# 1. Create new Vite + React + TypeScript project
npm create vite@latest my-project -- --template react-ts
cd my-project

# 2. Install base dependencies
npm install

# 3. Install peer dependencies required by rg-core-library
npm install @emotion/react @emotion/styled @mui/material @mui/icons-material @mui/x-date-pickers @react-google-maps/api dayjs

# 4. Link the local library (from library folder first: npm link)
npm link rg-core-library
```

### Required Imports in main.tsx

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// CRITICAL: Import styles BEFORE your app styles
// This single import includes ALL CSS variables, themes, and component styles
import 'rg-core-library/styles'

import './index.css'
import App from './App.tsx'

// ThemeProvider is required for theme switching to work
import { ThemeProvider } from 'rg-core-library'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
```

### Component API Conventions

The library uses specific conventions that differ from MUI defaults:

| Prop | Library Convention | NOT this |
|------|-------------------|----------|
| Button variant | `"Contained"`, `"Outlined"`, `"Text"` | `"contained"` |
| Button color | `"Primary"`, `"Secondary"`, `"Tertiary"`, `"Error"` | `"primary"` |
| Typography content | `content="Text here"` | `children` |
| IconButton icon | `icon={<Icon />}` | `children` |

**Examples:**
```tsx
// Button - uses capitalized variants
<Button variant="Contained" color="Primary">Click me</Button>

// Typography - uses content prop, not children
<Typography variant="h1" content="Heading Text" />
<Typography variant="body1" content="Body text here" />

// IconButton - uses icon prop, not children
<IconButton icon={<MenuIcon />} aria-label="Open menu" />
```

### Available Typography Variants

```
h1, h2, body1, body2, subtitle1, subtitle2, caption
h1 UTILITY, h2 UTILITY, h3 UTILITY, h4 UTILITY
```

### CSS Variables

All design tokens are available as CSS variables. Use the `--color-` prefix:

```css
/* Correct */
color: var(--color-primary-main);
background: var(--color-background-paper-elevation-0);

/* Incorrect - don't use --core- prefix */
color: var(--core-primary-main);  /* WRONG */
```

### Development Workflow

| Task | Command | Location |
|------|---------|----------|
| Start prototype dev server | `npm run dev` | This folder |
| Rebuild library after changes | `npm run build:lib` | Library folder |
| Re-link after npm install | `npm link rg-core-library` | This folder |

**Important:** After running `npm install` in the prototype, the link may break. Re-run `npm link rg-core-library` to restore it.

### Common Issues & Solutions

#### 1. Styles not loading / Components look unstyled
**Cause:** Missing `import 'rg-core-library/styles'`
**Solution:** Add the styles import at the top of main.tsx, BEFORE other CSS imports

#### 2. TypeScript error: Cannot find module 'rg-core-library/styles'
**Cause:** CSS files don't have TypeScript declarations
**Solution:** This is expected - the import works at runtime. You can ignore this error or add a declaration file.

#### 3. Components render but have no colors
**Cause:** CSS variables not defined (old library build)
**Solution:** Rebuild library with `npm run build:lib` in the library folder

#### 4. Import path not working (e.g., 'rg-core-library/src/...')
**Cause:** Vite only allows imports defined in package.json exports
**Solution:** Use `'rg-core-library/styles'` not direct paths to source files

#### 5. Link broken after npm install
**Cause:** npm install can overwrite symlinks
**Solution:** Re-run `npm link rg-core-library`

---

## Project Structure

```
vehicle-groups/
├── src/
│   ├── main.tsx      # Entry point with ThemeProvider
│   ├── App.tsx       # Main app component
│   ├── App.css       # App-specific styles
│   └── index.css     # Base styles
├── package.json
└── README.md
```

## Library Location

The `rg-core-library` source is located at:
```
/Users/ashton/dev/rydergyde/rg-core-library
```

## Useful Links

- Library docs: See `CLAUDE.md` in the library folder
- Component demos: Run `npm run dev` in the library folder
