---
name: save-prompt
description: Formats a new prompt entry (a prompt + its label, description, and optional source) into the project's prompt-library template, previews it for confirmation, then appends it to the appropriate collection file under /Users/ashton/dev/prompt_library/prompts/. Use when the user says "save this prompt", "add this to my prompt library", "save-prompt", or shares a prompt they want filed for later reuse.
---

# Save Prompt

Add a new prompt entry to the user's prompt library, formatted to match the existing template, with a confirmation step before writing.

## Collection files

The prompt library lives at `/Users/ashton/dev/prompt_library/prompts/`. Each collection is a single `.md` file containing many prompts grouped under `## Category` headings.

Currently registered collections:

| Topic | File |
|---|---|
| Product design, design engineering, design critique, visual design, UI/UX | `/Users/ashton/dev/prompt_library/prompts/02 design/design-prompts.md` |

When the user creates a new collection file in the future and wants this skill to know about it, they will say something like "the skill should also know about X.md" — append a new row to the table above. Until a file appears in this table, do not write to it.

## Workflow

### 1. Gather the inputs

Required from the user (ask only for what is missing — do not interrogate if already provided):

- **Prompt text** — the exact prompt to save, verbatim
- **Label** — a short bolded title (3–7 words). If absent, propose one and confirm.
- **What it does** — 1–2 sentences on what the prompt is for and when to use it. If absent, draft one from the prompt text and confirm.

Optional:

- **Source** — author and/or URL (e.g. "Brian Lovin @ Notion — https://...")
- **Category** — the `## Category Prompts` heading to file it under. If absent, infer from the prompt content and existing categories in the target file. Confirm in the preview.

### 2. Pick the destination file

Match the prompt's topic against the **Collection files** table above.

- If exactly one file fits, use it.
- If none fit, tell the user no registered collection covers this topic and ask whether to (a) save into the closest existing file anyway, or (b) stop so they can create a new collection file first.
- Never invent a file path.

### 3. Read the destination file

Before formatting, Read the target file to:

- See existing categories (so a new entry slots into an existing `## Category Prompts` heading when possible)
- Locate the HTML-commented `<!-- TEMPLATE ... -->` block at the bottom — new entries are inserted **immediately before** that block
- Confirm formatting conventions in use (separator style, source line format)

### 4. Format the entry

Use exactly this structure (where `\`\`\`` is a real triple-backtick fence):

```
**[Label]:**
` ` `
[Prompt text — verbatim, no leading/trailing whitespace]
` ` `

[1–2 sentences: what it does, when to use it.]

*Source: [Author / Where] — [URL if applicable]*

---
```

Rules:

- The fenced code block must contain *only* the prompt text, with no trailing blank line inside the fence — keeps copy-paste clean.
- Omit the `*Source: ...*` line entirely if no source was given. Do not write "Source: unknown".
- Always end the entry with a `---` separator on its own line, followed by a blank line.

### 5. Decide placement within the file

- If a matching `## [Category] Prompts` heading exists, append the new entry as the last item **under that heading**, before the next `## ` heading or before the `<!-- TEMPLATE` block — whichever comes first.
- If no matching category exists, create a new `## [Category] Prompts` heading just before the `<!-- TEMPLATE` block, and put the entry under it.

### 6. Show the preview and confirm

Output a preview to the chat in this exact shape, then stop and wait:

```
Preview — will append to: <relative path from prompt_library/>
Category: <existing heading name OR "NEW: [Category] Prompts">

---
<the formatted entry exactly as it will appear>
---

Save this? (yes / edit / cancel)
```

Do not call Edit or Write until the user replies "yes" (or equivalent affirmative).

If the user says "edit", ask what to change, regenerate the preview, and ask again. If "cancel", stop without writing.

### 7. Write

On confirmation, use Edit to insert the formatted entry at the chosen location. Do not re-write the whole file.

After the write, reply with one short line confirming what was saved and where (e.g. `Saved "Simplify and dumb it down" to 02 design/design-prompts.md under Simplification Prompts.`). Do not summarize the prompt content again.

## Adding a new collection file (future)

When the user adds a new prompt collection file and asks this skill to recognize it, edit this `SKILL.md` to add a row to the **Collection files** table with:

- A description of the topics it covers (used for routing)
- The absolute path to the file

That is the only change required — no other logic depends on the file list.
