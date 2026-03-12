---
name: twitter-post-designer
description: Transforms rough draft updates into polished Twitter posts for product designers who use AI tools in their work. Use this skill whenever the user shares a rough draft, notes, or brain dump about something they built, designed, or learned — especially if they mention wanting to post it, turn it into a tweet, or share it on Twitter/X. Also trigger when the user says things like "write a tweet", "make this Twitter-friendly", or "polish this for social". Always output exactly 3 options in the defined styles.
---

# Twitter Post Designer

Transforms rough design/dev updates into polished, audience-appropriate Twitter posts for product designers who incorporate AI tools into their workflow.

## Target Audience

Posts should appeal to:
- **Hiring managers** — looking for evidence of initiative, modern tooling, real problem-solving
- **Product designers** — want peer-level insight and transferable technique
- **AI enthusiasts / plugged-in tech people** — interested in how AI is used in actual work, not hype

## Tone Rules

- **Not lofty, not breathless.** No "🔥 game-changer" energy.
- **Point of view without overselling.** Dry wit is fine. Filler enthusiasm is not.
- **Specific > vague.** Name the actual problem, tool, and outcome.
- **Conversational but tight.** Twitter prose, not a LinkedIn post.
- **No hashtags unless user asks.** They date the post and read as try-hard.
- **Emoji only if it genuinely aids scannability.** One or two max.

## Output Format

Always produce exactly **3 options**. Label them clearly:

---

**Option 1 — Problem-first**
Lead with the specific problem or constraint encountered. Good for engaging designers and technical readers who recognize the pain point immediately.

**Option 2 — Insight-first**
Lead with the transferable takeaway or counterintuitive observation. Good for broader reach — grabs readers who don't know the domain but care about the lesson.

**Option 3 — Minimal/Dry**
Spare, understated, confident. States what happened and what it meant, without editorializing. Often the strongest for credibility.

---

Each option should:
- Be **under 280 characters** (hard limit) OR structured as a thread if the content genuinely needs it (max 3 tweets, clearly marked)
- End with a tools line if tools were mentioned: `Tools: X · Y · Z`
- Avoid repeating the same hook or opener across options

## Extraction Checklist

Before writing, extract from the draft:
1. **The problem** — what was unclear, broken, or unanswered
2. **The method** — what tools/approach were used
3. **The resolution** — what was discovered or decided
4. **The insight** — what's transferable to someone else

If any of these are missing or vague, make a reasonable inference and note it briefly so the user can correct.

## Quick Example

**Rough draft input:**
> I used Claude Code + Figma MCP to prototype a responsive data grid before I finalized my specs. Helped me figure out column pinning on small screens.

**Option 1 — Problem-first:**
> Had one design question I couldn't answer in Figma: how do you pin columns inside a nested scrollable grid on mobile?
> 
> Built a working prototype with Claude Code + Figma MCP. Answered it in 10 minutes of actual use.
> 
> Tools: Figma · Claude Code · Figma MCP

**Option 2 — Insight-first:**
> Static designs can't tell you if a nested scrollable grid actually works on mobile. Working prototypes can.
> 
> Used Claude Code + Figma MCP to get a real answer on column pinning before finalizing specs.
> 
> Tools: Figma · Claude Code · Figma MCP

**Option 3 — Minimal/Dry:**
> Responsive data grids inside master-detail panels: one of those things that looks fine in Figma and falls apart on a small screen.
> 
> Built a prototype with Claude Code + Figma MCP before finalizing specs. Column pinning became obvious fast.
> 
> Tools: Figma · Claude Code · Figma MCP