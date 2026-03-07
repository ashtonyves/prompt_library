---
argument-hint: [figma-url] [component-name]
description: Implement a Figma component with full token mapping and detailed guidelines
---

Please use the Figma MCP to analyze the Figma component and implement it following our design system patterns:

**Figma Component:** $1
**Component Name:** $2


Do not implement anything or write any code if you cannot connect to the Figma MCP. Tell me you cannot connect and I will troubleshoot the connection before we move forward.

**Requirements:**
1. **Analyze the component** using Figma MCP tools:
   - Get design context, metadata, variable definitions, and screenshot
   - Identify all design tokens used (colors, typography, spacing, shape, etc.)

2. **Map Figma tokens to project tokens:**
   - Follow the token hierarchy: **Semantic → Primitive**
   - Create a token mapping document in `docs/figma-mappings/` following the pattern:
     - `figma-[component-name]-token-mapping.md`
   - Include tables showing:
     - Figma token → Project token mapping (with light/dark mode)
     - Status (✅ Exact Match, ⚠️ Close Match, ⚠️ Gap/Missing)
     - Notes explaining any gaps or differences
   - Document any missing tokens that need to be added

3. **Implement the component:**
   - Create component structure: `src/design-system/components/[ComponentName]/`
   - Files to create:
     - `[ComponentName].tsx` - Main component with TypeScript types
     - `[ComponentName].module.css` - Styles using CSS variables from tokens
     - `index.ts` - Export file
   - Follow existing patterns (reference Typography/Icon components)
   - Use semantic tokens via CSS variables (e.g., `var(--color-text-primary)`)
   - Support light/dark theme via CSS variables
   - Add proper TypeScript types and JSDoc comments
   - Include accessibility attributes (aria-labels, roles, etc. as needed)

4. **Ask for clarification on:**
   - External dependencies (e.g., "Do you want to use Material UI icons?" or "Any specific icon library?")
   - Component variants/props that need clarification
   - Missing tokens - should we add them or use closest matches?
   - Any special requirements or edge cases

5. **Create demo component:**
   - Create `[ComponentName]Demo.tsx` following TypographyDemo/IconDemo pattern
   - Include:
     - Interactive controls for all props/variants
     - Live preview section
     - All variants showcase
     - Code examples with copy functionality
     - Common use cases
   - Create `[ComponentName]Demo.module.css` matching the demo styling pattern

6. **Integrate into App:**
   - Add navigation route in `App.tsx`
   - Add to the View type and routing logic
   - Follow the same pattern as Typography/Icon demos

7. **Export from Public API:**
   - Add component export to `src/index.ts`
   - Export the default component and all TypeScript types
   - Follow the alphabetical ordering in the file
   - Example:
     ```typescript
     // MyComponent
     export { default as MyComponent } from './design-system/components/MyComponent'
     export type { MyComponentProps, MyComponentVariant } from './design-system/components/MyComponent'
     ```

**Implementation Guidelines:**
- Use CSS Modules for styling
- Reference `token-registry.md` for available tokens
- Use semantic tokens over primitive tokens when available
- Document any gaps in token mappings
- Ensure components work in both light and dark themes
- Follow TypeScript best practices
- Match the existing code style and patterns

**Token Mapping Document Structure:**
1. **Component Overview** - Description and purpose
2. **Component Structure** - Variants, props, dimensions
3. **Color Token Mapping** - Table with Figma → Project tokens
4. **Typography Token Mapping** - Font sizes, weights, line heights
5. **Spacing Token Mapping** - Padding, margins, gaps
6. **Shape Token Mapping** - Border radius, sizing
7. **Implementation Recommendations** - Code examples
8. **Gaps/Missing Tokens** - What needs to be added
9. **Summary** - Perfect matches, close matches, gaps

See `docs/figma-mappings/figma-icon-token-mapping.md` for reference examples.

**Output:**
- Token mapping document in `docs/figma-mappings/`
- Component implementation files
- Demo component files
- Integration into App.tsx
- Export added to `src/index.ts` (public API entry point)
- Summary of what was implemented and any questions/decisions made

Please start by analyzing the Figma component and asking any clarification questions before proceeding with implementation.
