# Component Implementation Prompt Template

This document contains prompt templates for requesting component analysis and implementation from Figma designs into code using the Figma MCP (Model Context Protocol).

## Overview

This prompt template helps you:
1. Analyze Figma components using Figma MCP tools
2. Map Figma design tokens to your project's design system
3. Implement components following your project's patterns
4. Create demos and integrate components into your application

**Before using:** Customize the paths and conventions in the prompt to match your specific project structure.

---

## Required Project Structure

Before using this prompt, ensure your project has the following structure (adjust paths as needed for your project):

```
project-root/
├── docs/
│   └── figma-mappings/          # Token mapping documents
├── src/
│   └── components/              # Component implementations
│       └── [ComponentName]/
│           ├── [ComponentName].tsx (or .jsx, .vue, etc.)
│           ├── [ComponentName].module.css (or .scss, styled-components, etc.)
│           ├── [ComponentName]Demo.tsx (optional demo component)
│           └── index.ts
└── design-tokens/               # Design token definitions (if using design tokens)
    └── token-registry.md        # Documentation of available tokens
```

**Optional but recommended:**
- A design token system (CSS variables, style dictionary, or similar)
- A demo/showcase application to preview components
- TypeScript for type safety

---

## Full Prompt Template

```
Please use the Figma MCP to analyze the Figma component and implement it following the project's design patterns:

**Figma Component:**
[Paste Figma component URL here]

**Component Name:** [e.g., "Button", "Card", "Input"]
**Node ID:** [Extract from URL or provide if known]

Do not implement anything or write any code if you cannot connect to the Figma MCP. Tell me you cannot connect and I will troubleshoot the connection before we more forward.

**Requirements:**
1. **Analyze the component** using Figma MCP tools:
   - Get design context, metadata, variable definitions, and screenshot
   - Identify all design tokens used (colors, typography, spacing, shape, etc.)

2. **Map Figma tokens to project tokens (if applicable):**
   - Identify the project's token system (CSS variables, design tokens, theme system, etc.)
   - Create a token mapping document in `docs/figma-mappings/` (or your project's docs location):
     - Filename: `figma-[component-name]-token-mapping.md`
   - Include tables showing:
     - Figma token → Project token mapping (with theme variants if applicable)
     - Status (✅ Exact Match, ⚠️ Close Match, ⚠️ Gap/Missing)
     - Notes explaining any gaps or differences
   - Document any missing tokens that need to be added to the design system
   - If no token system exists, document the raw design values (colors, spacing, typography)

3. **Implement the component:**
   - Create component in the appropriate location (e.g., `src/components/[ComponentName]/`)
   - Files to create (adjust based on project tech stack):
     - `[ComponentName].tsx` - Main component (or .jsx, .vue, .svelte, etc.)
     - `[ComponentName].module.css` - Styles (or .scss, styled-components, etc.)
     - `index.ts` - Export file
   - Follow existing component patterns in the project
   - Use design tokens/CSS variables when available (e.g., `var(--color-text-primary)`)
   - Support theme variants if the project has them (light/dark, etc.)
   - Add proper type definitions (TypeScript, PropTypes, or JSDoc)
   - Include accessibility attributes (aria-labels, roles, etc. as needed)

4. **Ask for clarification on:**
   - External dependencies (e.g., "Do you want to use Material UI icons?" or "Any specific icon library?")
   - Component variants/props that need clarification
   - Missing tokens - should we add them or use closest matches?
   - Any special requirements or edge cases

5. **Create demo component (if project has a demo/showcase system):**
   - Create `[ComponentName]Demo.tsx` (or equivalent for your framework)
   - Include:
     - Interactive controls for all props/variants
     - Live preview section
     - All variants showcase
     - Code examples with copy functionality (if desired)
     - Common use cases
   - Follow existing demo patterns in the project
   - Create associated styles matching the project's demo styling pattern

6. **Integrate into the application:**
   - Add the component to the main app or routing system (if applicable)
   - Add navigation/route entries following existing patterns
   - Ensure the component is properly exported and accessible

**Implementation Guidelines:**
- Follow the project's styling approach (CSS Modules, styled-components, Tailwind, etc.)
- Reference the project's design token system or style guide
- Use higher-level tokens over raw values when available
- Document any gaps in token mappings or design system coverage
- Ensure components work with the project's theme system (if applicable)
- Follow the project's type system and best practices (TypeScript, PropTypes, etc.)
- Match the existing code style, patterns, and conventions
- Consider the project's framework (React, Vue, Svelte, etc.)

**Output:**
- Token mapping document (in project's docs location)
- Component implementation files
- Demo component files (if applicable)
- Integration into the app (if applicable)
- Summary of what was implemented and any questions/decisions made

Please start by analyzing the Figma component and asking any clarification questions before proceeding with implementation.
```

---

## Short Version (Quick Request)

```
Please use the Figma MCP to analyze this Figma component and implement it following the project's patterns:

**Figma URL:** [paste URL]
**Component Name:** [name]

Follow this process:
1. Analyze with Figma MCP (get design context, tokens, screenshot)
2. Map tokens → create mapping doc in project's docs location
3. Implement component following project's tech stack and patterns
4. Create demo component if the project has a demo/showcase system
5. Integrate into the app following existing patterns

Ask questions about:
- External dependencies needed
- Missing tokens or close matches
- Component variants/edge cases
- Project-specific implementation details

Reference existing components in the project for patterns and conventions.
```

---

## Usage Notes

- Use the **Full Prompt Template** for new or complex components
- Use the **Short Version** for quick implementations of similar components
- Always include the Figma URL and component name
- The AI will ask clarification questions before implementing
- First-time use: Review and customize the prompt for your project's specific structure
- Adapt file paths and conventions to match your project
- Reference existing components in your project for established patterns

---

## Example Usage

### Example 1: Button Component

```
Analyze this Figma component and implement it following the project's patterns:

**Figma URL:** https://www.figma.com/design/KzfvuKFa8RB9Yd3TyzcZ7A/Core-Library?node-id=123-4567
**Component Name:** Button

Follow this process:
1. Analyze with Figma MCP (get design context, tokens, screenshot)
2. Map tokens → create mapping doc in project's docs location
3. Implement component following project's tech stack and patterns
4. Create demo component if the project has a demo/showcase system
5. Integrate into the app following existing patterns

Ask questions about:
- External dependencies needed
- Missing tokens or close matches
- Component variants/edge cases
- Project-specific implementation details

Reference existing components in the project for patterns and conventions.
```

---

## Token Mapping Document Structure

When creating token mapping documents, follow this structure (adjust based on your project's needs):

1. **Component Overview** - Description and purpose
2. **Component Structure** - Variants, props, dimensions
3. **Color Token Mapping** - Table with Figma → Project tokens
   - Include theme variants if applicable (light/dark, etc.)
4. **Typography Token Mapping** - Font sizes, weights, line heights, font families
5. **Spacing Token Mapping** - Padding, margins, gaps
6. **Shape Token Mapping** - Border radius, sizing, borders
7. **Other Tokens** - Shadows, opacity, transitions, etc.
8. **Implementation Recommendations** - Code examples and best practices
9. **Gaps/Missing Tokens** - What needs to be added to the design system
10. **Summary** - Perfect matches, close matches, gaps, and next steps

**If your project doesn't use a token system:**
- Document the raw design values (hex colors, pixel values, etc.)
- Consider creating one if multiple components will be implemented
- This documentation still helps maintain consistency across components

---

## Customizing for Your Tech Stack

### React/TypeScript Projects
- Component file: `[ComponentName].tsx`
- Use TypeScript interfaces for props
- Consider using CSS Modules, styled-components, or Tailwind
- Export types and components from `index.ts`

### Vue Projects
- Component file: `[ComponentName].vue`
- Use `<script setup lang="ts">` for TypeScript
- Follow Vue 3 Composition API or Options API
- Consider using scoped styles or CSS Modules

### Svelte Projects
- Component file: `[ComponentName].svelte`
- Use TypeScript in `<script lang="ts">`
- Leverage Svelte's built-in styling
- Export types separately if needed

### Plain JavaScript/HTML Projects
- Component file: `[ComponentName].js` or Web Component
- Use JSDoc for type documentation
- Consider using CSS custom properties for theming
- May not need complex file structure

### Adjusting Paths for Your Project
Replace these example paths with your project's structure:
- `docs/figma-mappings/` → Your docs location
- `src/components/` → Your components directory
- `design-tokens/` → Your design token/theme location
- `[ComponentName]Demo.tsx` → Your demo/storybook location
