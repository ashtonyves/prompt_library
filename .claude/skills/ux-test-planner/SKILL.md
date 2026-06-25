---
name: ux-test-planner
description: "Plans and scripts moderated usability testing sessions from a digital prototype. Reviews a codebase or Figma design, identifies what to evaluate, and produces a ready-to-use moderator script with scenarios and tasks. Use when preparing for a user testing session, unsure what to test in a prototype, needing to turn evaluation goals into structured tasks, or wanting a moderator script for a usability study. Triggers on phrases like 'plan a user test', 'create a test script', 'what should we test', 'write a moderator script', 'prepare for usability testing', or 'help me run a user test'."
---

# UX Test Planner

Plans moderated usability testing sessions from a digital prototype. Works with React/Next.js codebases, Figma files, static HTML, or any combination.

## Two Entry Paths

**Goals known** — The user provides evaluation goals, session duration, and optionally an existing script outline. Skip to [Build the Session Plan](#build-the-session-plan).

**Goals unknown** — Review the prototype first, surface evaluation candidates, and align with the user before planning. Start at [Discover What to Evaluate](#discover-what-to-evaluate).

---

## Discover What to Evaluate

When the user hasn't specified what to evaluate:

1. **Review the prototype** — Read key screens/components from the codebase, or use Figma MCP tools if a Figma URL is provided. Focus on: primary flows, navigation patterns, forms/inputs, error states, and any novel or complex interactions.

2. **Identify 4–6 evaluation candidates** — Use the heuristics in `references/evaluation-heuristics.md` to select areas with the highest testing value.

3. **Present candidates conversationally** — For each candidate, give:
   - A one-line label (e.g., "Onboarding flow")
   - One sentence on *why* it's a strong testing candidate (friction risk, learnability, business criticality, etc.)
   - A rough sense of how much session time it would take

4. **Align before proceeding** — Ask the user which candidates to include, whether to swap any out, and confirm session duration. Do not generate the script until alignment is reached.

---

## Build the Session Plan

Inputs needed before generating the script:
- Confirmed evaluation goals / areas (1–4 topics)
- Session duration (e.g., 45 min, 60 min)
- Any existing script outline or format preference (optional)

**Time budget:** Reserve ~10 min for intro/warm-up and ~5 min for debrief. Divide remaining time across scenarios, allowing buffer for participant tangents (~30% overhead per task).

**For each evaluation goal, define:**
- A scenario (realistic framing story that gives the participant context without telegraphing the answer)
- 1–3 key tasks within the scenario
- 2–3 probing questions per task

Use `references/script-structure.md` as the default output structure. If the user provides their own template, adapt to match it while preserving scenario/task/probe organization.

---

## Output

After building the plan, ask: "Where should I save this — markdown file in the project, Notion page, or just here in chat?"

Then produce the script in the chosen format following `references/script-structure.md`.

---

## Reference Files

- **`references/evaluation-heuristics.md`** — Criteria and patterns for identifying strong usability testing candidates. Read when entering the discovery path.
- **`references/script-structure.md`** — Default moderator script template with section guidance. Read when generating the final script.
