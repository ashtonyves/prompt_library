---
name: summarizework
description: Summarize what was implemented in the current session — what was planned vs. built, divergences and why, and what was learned. Formats output as a GitHub Issue comment. Use when wrapping up a coding session and wanting to document the work on a GitHub Issue.
---

# Summarize Work

Generate a summary of what was implemented in the current conversation session, formatted as a GitHub Issue comment.

## Workflow

1. Review the full conversation history to identify:
   - The original plan or task (from GitHub Issues, user instructions, or early discussion)
   - What was actually built or changed (from code edits, commits, and tool usage)
   - Any divergences between plan and implementation
   - Key learnings or discoveries

2. If a GitHub Issue number is referenced in the conversation or provided as an argument, read that issue with `gh issue view <number>` to get the original plan details.

3. Write the summary using this format:

```markdown
## Session Summary

### What was planned
- [Bullet points describing the original goals/tasks]

### What was built
- [Bullet points describing what was actually implemented]

### Divergences
- [Any differences between plan and implementation, with brief explanations of why]
- If none: "None — implementation matched the plan."

### What we learned
- [Key insights, gotchas, or discoveries from the session]
```

4. If a GitHub Issue number is known (referenced in the conversation or passed as an argument), ALWAYS post the comment automatically — do not wait for confirmation. Use the correct repo with `--repo <owner>/<repo>` when the issue lives outside the current repo:
   ```
   gh issue comment <number> --repo <owner>/<repo> --body "<summary>"
   ```
   Then report the posted comment URL back to the user.

5. Only present the summary for review (instead of posting) when NO issue number is known.

## Important

- Do NOT close the GitHub Issue — only add a comment.
- When an issue number is known, always post — never ask first.
- If no issue number is available, ask the user which issue to comment on, or just display the summary for them to copy.
- Keep bullet points concise but specific — reference file names, component names, and concrete changes.
- If the user provides an issue number as an argument (e.g., `/summarizework 42`), use that issue number.
