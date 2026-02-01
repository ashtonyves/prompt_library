# Create Subtle Parts Content

Create product content for The Subtle Parts jewelry business using the full content creation skill.

**SKU:** $1
**Image(s):** $2
**Type:** $3
**Starting description:** $4

## Instructions

First, read and follow all guidelines in the subtle-parts-content-creation skill:
@.claude/skills/subtle-parts-content-creation/SKILL.md

Then:

1. **Analyze the product image(s)** at `$2` using the Read tool. If a folder is provided, read all images in it.

2. **Use `$1` as the product SKU**

3. **Use `$3` as the content type**
    - description = product writeup
    - pin = Pinterest Pin
    - social = Instagram/Facebook
    - all = all of the above

4. **If `$4` is provided**, use it as a starting point for the description—refine and expand it following the skill guidelines rather than writing from scratch.

5. **If type not provided**, ask the user which content type(s) to generate

6. **Generate content** following the exact formats and guidelines from the skill

7. **Offer to save to Notion** using the database locations specified in the skill

## Usage

```
/spd-content <sku> <image-path> <type> "<starting description>"
```

**Examples:**
```
/spd-content E-C-136-DEC-NU-L ~/photos/E-C-136/ all
/spd-content E-C-136-DEC-NU-L ~/photos/E-C-136/ description "Hammered copper crescent earrings with turquoise beads"
```
