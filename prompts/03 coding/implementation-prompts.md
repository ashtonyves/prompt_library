# Code Prompting Patterns

Personal collection of coding, implementation, code review, debugging, and context management prompts.

---

## Implementation Prompts

**Start clean implementation:**
```
Implement the feature described in Issue #[number].
```

*Source: [xaelophone / how-i-code](https://github.com/xaelophone/how-i-code/blob/main/cheatsheets/prompting-patterns.md)*

---

**Scope control (prevent creep):**
```
Let's keep this PR focused on just [specific feature]. We'll handle [other thing] in a separate PR.
```

*Source: [xaelophone / how-i-code](https://github.com/xaelophone/how-i-code/blob/main/cheatsheets/prompting-patterns.md)*

---

**Simple over clever:**
```
Let's keep this simple for now. Just implement the straightforward version—we can refactor later if needed.
```

*Source: [xaelophone / how-i-code](https://github.com/xaelophone/how-i-code/blob/main/cheatsheets/prompting-patterns.md)*

---

**Allow duplication:**
```
I know this duplicates some code from [other file]. That's intentional—I'd rather have duplication than a premature abstraction.
```

*Source: [xaelophone / how-i-code](https://github.com/xaelophone/how-i-code/blob/main/cheatsheets/prompting-patterns.md)*

---

## Learning Prompts

**Understand the code:**
```
Explain how this code works. I want to be able to write something similar myself in the future.
```

*Source: [xaelophone / how-i-code](https://github.com/xaelophone/how-i-code/blob/main/cheatsheets/prompting-patterns.md)*

---

**Understand logs/errors:**
```
Explain what these [logs/error messages] are telling me. What are the common causes and how would I debug this?
```

*Source: [xaelophone / how-i-code](https://github.com/xaelophone/how-i-code/blob/main/cheatsheets/prompting-patterns.md)*

---

**Understand architecture:**
```
Walk me through how [this system/flow] works. Explain it like I'm a PM who needs to understand it well enough to debug issues.
```

*Source: [xaelophone / how-i-code](https://github.com/xaelophone/how-i-code/blob/main/cheatsheets/prompting-patterns.md)*

---

## Review Prompts

**Self-review:**
```
Review this PR draft and provide feedback. Be critical—what could break? What's unclear? What would you do differently?
```

*Source: [xaelophone / how-i-code](https://github.com/xaelophone/how-i-code/blob/main/cheatsheets/prompting-patterns.md)*

---

**Competitive review:**
```
Here's code that [other model/previous session] wrote. Review it critically. What are the issues? What would you improve?
```

*Source: [xaelophone / how-i-code](https://github.com/xaelophone/how-i-code/blob/main/cheatsheets/prompting-patterns.md)*

---

**Pre-merge checklist:**
```
Before I merge this, help me verify:
1. Does this do what the Issue asked for?
2. Are there any obvious bugs or edge cases?
3. Is anything confusing that needs comments?
4. Any security or performance concerns?
```

*Source: [xaelophone / how-i-code](https://github.com/xaelophone/how-i-code/blob/main/cheatsheets/prompting-patterns.md)*

---

## Context Management Prompts

**Summarize for handoff:**
```
Summarize what we implemented. Note any divergences from the original plan and anything we learned. Format this as a comment I can post on the GitHub Issue.
```

*Source: [xaelophone / how-i-code](https://github.com/xaelophone/how-i-code/blob/main/cheatsheets/prompting-patterns.md)*

---

**Reset context cleanly:**
```
[Start new chat]
I'm implementing Issue #[number]. Here's the context: [paste issue or link].
```

*Source: [xaelophone / how-i-code](https://github.com/xaelophone/how-i-code/blob/main/cheatsheets/prompting-patterns.md)*

---

**Recover lost context:**
```
I'm continuing work on [feature]. Here's what was already done: [summary]. The current state is [description]. Let's continue from here.
```

*Source: [xaelophone / how-i-code](https://github.com/xaelophone/how-i-code/blob/main/cheatsheets/prompting-patterns.md)*

---

## Debug Prompts

**Investigate an error:**
```
I'm seeing this error: [error]. Here's the relevant code: [code]. Walk me through what's happening and how to fix it.
```

*Source: [xaelophone / how-i-code](https://github.com/xaelophone/how-i-code/blob/main/cheatsheets/prompting-patterns.md)*

---

**Trace a flow:**
```
Help me trace what happens when [action]. Start from [entry point] and walk through each step.
```

*Source: [xaelophone / how-i-code](https://github.com/xaelophone/how-i-code/blob/main/cheatsheets/prompting-patterns.md)*

---

**Rubber duck:**
```
I'm stuck on [problem]. Let me explain what I've tried, and help me think through what I might be missing.
```

*Source: [xaelophone / how-i-code](https://github.com/xaelophone/how-i-code/blob/main/cheatsheets/prompting-patterns.md)*

---

## Anti-Patterns to Avoid

| Don't | Do Instead |
|----------|---------------|
| "Fix this" (vague) | "This error occurs when X. I think the issue is Y. Can you verify and fix?" |
| "Make it better" | "Specifically, I want to improve [aspect] by [metric]" |
| Letting scope creep | "Let's keep this focused on X only" |
| Accepting code you don't understand | "Explain this so I can understand it" |
| Long sessions without clearing | Clear context after each completed task |

---

## The Golden Rule

End planning prompts with:
> **"Ask me any clarifying questions you might have."**

This single habit prevents more wasted work than any other.

---

<!--
TEMPLATE — copy the block below to add a new prompt.
Place under an existing `## Category` heading, or create a new one.

## [Category Name] Prompts

**[Short prompt label]:**
```
[Paste the exact prompt text here. Keep it clean — no leading/trailing spaces — so it copies cleanly.]
```

[1–2 sentences: what it does, when to use it, why it works.]

*Source: [Display name](URL)*

---
-->