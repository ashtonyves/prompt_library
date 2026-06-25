# Moderator Script Structure

Default template for moderated usability testing sessions. Adapt section lengths to fit the session duration. If the user provides their own format, use it instead — preserve scenario/task/probe organization but match their structure.

---

## Script Format

```
SESSION: [Product / Feature Name] Usability Test
Date: ___________    Participant #: ___________
Moderator: ___________    Observer(s): ___________
Duration: [X] minutes
```

---

### Introduction (~5–8 min)

**Purpose:** Set expectations, establish think-aloud protocol, build rapport.

Script (read aloud or adapt):

> "Thanks for joining today. We're testing [a prototype / an early version of the product] — not your skills. There are no right or wrong answers. We want to understand how you think and where things feel unclear.
>
> As you work through tasks, please think out loud — tell me what you're looking at, what you expect to happen, and what you're unsure about. I won't be able to answer most questions during the tasks, but please ask them anyway — it helps us understand what's confusing.
>
> We'll be recording this session [if applicable]. Any questions before we start?"

Warm-up questions (2–3, pick relevant ones):
- "Can you tell me a little about how you typically use [product category / similar tools]?"
- "When did you last [relevant behavior]?"
- "What would you normally do if you needed to [relevant goal]?"

---

### Scenario [N]: [Short Label] (~X min)

**Evaluation goal:** [What this scenario is testing — internal note, not read aloud]

**Scenario framing** (read aloud):

> "[2–4 sentence story that gives the participant realistic context and motivation. Do not mention UI elements, button names, or menu locations. End with a clear starting point.]"

**Task [N.1]:** [One specific, observable action the participant should attempt]

- Probe: "[Open-ended question about their experience or expectation]"
- Probe: "[Follow-up on confusion, hesitation, or workaround]"
- Probe: "[Question about what they expected vs. what happened — ask if they struggled]"

Observer note prompts (internal):
- [ ] Did the participant find the entry point without prompting?
- [ ] Where did they hesitate or backtrack?
- [ ] Did they use the feature as designed, or find a workaround?

**Task [N.2]:** [Next task, if applicable]

- Probe: ...

---

### Debrief (~5 min)

**Purpose:** Collect overall impressions and surface issues not observed in tasks.

Questions:
- "Overall, how did that feel compared to what you expected?"
- "Was there anything that surprised you — positively or negatively?"
- "If you could change one thing about what you just used, what would it be?"
- "Is there anything you wish you could do that wasn't there?"
- "Any other thoughts before we finish?"

Close:
> "That's really helpful — thank you. [Compensation / next steps if applicable]."

---

## Moderator Notes

**During tasks — do:**
- Let participants struggle for 30–60 seconds before offering a nudge
- Reflect questions back: "What would you expect to happen?" or "Where would you look for that?"
- Note timestamps for significant moments (confusion, workaround, delight)

**During tasks — don't:**
- Confirm or deny whether an action was correct
- Point to UI elements or name buttons
- Interject when the participant is thinking silently — wait them out

**Nudge language (use sparingly):**
- "What are you thinking right now?"
- "What would you do next if I weren't here?"
- "Is there anything else you'd try?"

---

## Script Formatting Notes

When generating a script from this template:

- Replace all bracketed placeholders with session-specific content
- Keep scenario framing in plain language — no feature names, no UI labels
- Write tasks as outcomes, not instructions: "Find out how much your bill would be next month" not "Click the Billing tab"
- Keep probes open-ended; avoid yes/no questions
- Mark internal notes clearly (e.g., italics or `[INTERNAL]` tag) so the moderator knows what not to read aloud
- Total word count for a 60-min script: ~600–900 words of spoken content
