# Evaluation Heuristics

Use these criteria to identify the strongest candidates for a usability testing session when evaluation goals haven't been defined.

## What Makes a Good Testing Candidate

**High learnability demand** — First-time users must figure out something non-obvious (e.g., a novel navigation pattern, an unconventional interaction model, an unfamiliar mental model).

**Critical path risk** — If a user fails or abandons here, the core value of the product is blocked (sign-up, checkout, primary workflow, key decision point).

**High cognitive load** — Many choices, dense information, or multi-step sequences where users are likely to lose their place or make errors.

**Ambiguous affordances** — UI elements whose purpose or behavior isn't immediately clear from their appearance (e.g., icons without labels, gestures, progressive disclosure patterns).

**Error-prone interactions** — Forms, filters, or configurators where wrong input is easy and recovery is not obvious.

**Assumed context** — Flows that assume prior knowledge the user may not have (domain jargon, prerequisite steps, invisible state).

**High business stakes** — Areas tied to conversion, retention, or trust (pricing, permissions, onboarding, data visibility).

---

## Common Testing Candidate Patterns

| Pattern | Why it's valuable to test |
|---|---|
| Onboarding / first-run experience | Sets mental model; abandonment here is permanent |
| Primary task flow | Core reason the product exists; failure = product failure |
| Navigation / wayfinding | Users often don't explore — they expect to find things intuitively |
| Empty states | Often overlooked in design; users hit them early and get stuck |
| Error recovery | Error messages and recovery paths are frequently under-designed |
| Settings / configuration | Complex, low-frequency; users return to it frustrated |
| Search and filtering | High variability in user mental models vs. system model |
| Multi-step forms or wizards | Drop-off risk at each step; error recovery is critical |
| Role-based or permission-gated content | Confusion about what's visible/available and why |
| Notifications and alerts | Often ignored in testing; users may miss critical info |

---

## Scoping Candidates to Session Time

Rough time costs per area (including probing questions, think-aloud, transitions):

- Simple navigational task: 5–8 min
- Multi-step flow (3–5 screens): 10–15 min
- Complex configurator or form: 12–18 min
- Exploratory "find X" task: 8–12 min

For a 60-min session (after 15 min intro/debrief), target 2–3 areas max. For 45 min, 1–2 areas. Prioritize depth over breadth — partial insight on a critical flow beats surface-level data on five flows.

---

## Framing Candidates for the User

When presenting candidates, lead with the *risk*, not the feature name:

- Instead of: "We could test the settings page"
- Say: "The settings page has several multi-step configuration flows — users who misset these may not know how to recover, and it's not something they'll do often enough to learn by repetition."

This helps the user evaluate candidates on testing value, not product familiarity.
