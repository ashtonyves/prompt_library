Review and sync Figma component with codebase:

1. Use Figma MCP to analyze [Component Name] from 
   https://www.figma.com/file/[FILE_KEY]/...
   
2. Examine the current implementation at 
   /path/to/components/[ComponentName].tsx
   
3. Compare and document:
   - Props/variants: Figma properties vs React props
   - Styling: Figma styles vs implemented CSS/tokens
   - States: Interactive states in both
   - Accessibility: ARIA patterns and semantic HTML
   - Missing features in either direction
   
4. Output a detailed comparison report showing:
   - ✅ What matches
   - ⚠️ What differs
   - ❌ What's missing from implementation
   - 📋 What exists in code but not in Figma
   
5. If differences exist:
   - Ask for confirmation before making changes
   - Update the component to match Figma source of truth
   - Preserve any implementation-specific logic
   - Update related files (types, styles, stories)
   
6. Generate a summary of changes made (or not needed)