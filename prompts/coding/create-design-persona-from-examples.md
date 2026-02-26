# Creating a Design Persona from Competitor Examples

Generate production-quality UI by analyzing competitor designs and codifying patterns into reusable rules.

> Source: [YouTube walkthrough](https://www.youtube.com/watch?v=cMcg2VC80Ik)

---

## Prerequisites

- AI coding assistant (Claude in Cursor, or similar)
- 3-5 competitor screenshots (use [Mobbin](https://mobbin.com) or similar)
- A working prototype or clear product spec

---

## Step 1: Generate a Baseline UI

Create an initial layout to establish your functional requirements.

**Prompt:**
```
Design a responsive web dashboard UI for a [PRODUCT TYPE]. Include:
- [Section A]
- [Section B]
- [Section C]

Use a clean, minimal style with [color preferences], clear hierarchy, and good spacing.
Output semantic HTML with Tailwind utility classes. Keep the layout production-ready.
```

**Example for finance app:**
```
Design a responsive web dashboard UI for a personal finance app. Include:
- Main balance area
- Income vs expenses chart over time
- Recent transactions table
- Cards for key metrics (monthly savings, budget used, upcoming bills)

Use a clean, minimal style with black, white, and subtle grays, clear hierarchy, and good spacing.
Output semantic HTML with Tailwind utility classes. Keep the layout production-ready.
```

This gives you a working starting point—functional but generic.

---

## Step 2: Analyze Competitor Screenshots

Attach 3-5 competitor screenshots and have the AI deeply analyze each one separately.

**Prompt:**
```
Analyze each competitor screenshot individually. For each one, document:
- Design principles
- Spacing patterns
- Color usage
- Typography hierarchy
- Layout structure
- Notable components or patterns

Do not modify our existing design.
Store notes for each screenshot in separate markdown files I can reference later.
```

**Output:** Individual markdown files with detailed observations per competitor.

---

## Step 3: Synthesize Common Patterns

Extract shared design principles across all competitors.

**Prompt:**
```
Using the markdown notes from all competitor screenshots, identify common threads and patterns that appear across multiple competitors. Document in a new markdown file:

- Color strategy
- Typography hierarchy
- Spacing system (include pixel ranges)
- Layout patterns
- Card and table treatments
- Interaction patterns (tabs, chips, buttons)
```

**Output:** A synthesized design patterns document.

---

## Step 4: Create the Designer Persona Rule

Convert the synthesis into a persistent rule for all future designs.

**Prompt:**
```
Convert the common patterns into a structured design rule. Include:

- Color system (palette, usage guidelines)
- Typography hierarchy (sizes, weights, when to use each)
- Spacing system (token-like ranges: 4px, 8px, 16px, etc.)
- Layout patterns (dashboards, cards, tables, charts)
- Interaction patterns (tabs, filters, buttons)
- Visual tone (e.g., "calm fintech, high-trust, data-first")

Format as a clear, referenceable rule. Do not modify the current design.
```

**If the output lacks detail:** Ask to "go more in depth" on specific sections until you have concrete tokens and specifications.

**Output:** Save as a Cursor rule or `.mdc` file for persistent reference.

---

## Step 5: Store Research Assets

Keep screenshots accessible for future reference.

**Prompt:**
```
Store these competitor screenshots for future reference in the workspace.
Associate each with its corresponding markdown notes.
Do not modify the current design.
```

This enables the AI to cross-reference visuals when designing new screens.

---

## Step 6: Regenerate with the Persona

Re-run your original functional prompt with all research context applied.

**Prompt:**
```
Using our competitor analysis, common patterns document, and design rule,
build a new dashboard design based on the original [PRODUCT] prompt.

Requirements:
- Keep it responsive and production-ready
- If conflicts exist between the old layout and new rules, prefer the new rules
- Preserve all core functional sections from the original prompt
```

**Output:** A polished, production-quality UI informed by real competitor patterns.

---

## Quick Reference

| Step | Action | Output |
|------|--------|--------|
| 1 | Generate baseline UI | Working prototype |
| 2 | Analyze competitors individually | Per-screenshot markdown notes |
| 3 | Synthesize common patterns | Design patterns document |
| 4 | Create designer persona rule | Reusable design rule file |
| 5 | Store research assets | Linked screenshots + notes |
| 6 | Regenerate with persona | Production-quality UI |

---

## Adapting for Other Domains

Replace the bracketed values for any product type:

- **Logistics dashboard:** Fleet status, shipment tracking, driver assignments
- **Admin panel:** User management, analytics, settings
- **Marketplace:** Product grid, filters, cart summary
- **SaaS tool:** Feature usage, billing, team management
