---
name: notion-recipe-capture
description: Extracts recipes from photos of cookbook pages and saves them to the Notion Recipes database. Use when the user shares 1-2 photos of a recipe (from a cookbook, magazine, or handwritten) and wants it filed in Notion. Also use when the user says "add this recipe", "save this recipe", shares recipe photos, or points to a folder of recipe photos for batch processing.
---

# Recipe Capture

Extracts recipe content from photos of cookbook pages and creates a structured entry in the Notion Recipes database.

## Workflow

### Step 0: Verify image orientation

Photos must be **right-side up** (text readable without rotation) before processing. If images appear sideways or upside down, ask the user to re-orient them first. Sideways text leads to inaccurate transcription.

### Step 1: Read the photos

Use the Read tool to view the recipe photo(s). Extract:

- **Recipe name**
- **Ingredients** — full list with quantities and units exactly as written
- **Directions** — numbered steps
- **Intro text** — any orienting paragraph (yield, description, headnotes)
- **Source** — cookbook name, author, page number if visible
- **Food photo** — note whether the cookbook page includes a food photo (yes/no)

If the text is partially cut off or unclear, flag what's ambiguous and ask.

#### Image processing

For any image that contains a food photo, **just copy and rename it** — no cropping or rotation. The user will crop manually.

1. Copy the source image to the same folder with a recipe-based kebab-case filename (e.g., `chicken-parm.jpg`).
2. After creating the Notion page, tell the user where the renamed photo is so they can crop it and drag it into the `image` property.

**Limitation:** The Notion API cannot upload local files to `file` type properties. The image must be added manually by dragging it onto the page's `image` property in Notion. If the recipe source is a URL with an image, the `image` property can be set directly using the external URL.

### Step 2: Confirm with user

Present a brief summary:

```
**[Recipe Name]**
Source: [cookbook, author, p. XX]
Ingredients: [count] items
Tags (suggested): [auto-tagged based on content]
```

Suggest tags by analyzing ingredients and method, **only from existing tags** in the database (see [reference/database-schema.md](reference/database-schema.md) for the full list):
- Protein: `meat`, `fish`, `beef`, `pork`, `eggs`, `vegetarian`/`vege`
- Method: `oven`, `stovetop`, `grill`, `air fryer`
- Cuisine: `Asian`, `Mexican`, `Middle Eastern`, `Mediterannean`, `Italian`
- Type: `soup/ stew`, `salad`, `sauces`, `condiments`, `drink`, `side`, `breakfast`
- Effort: `easy`, `weeknight` (suggest if prep+cook < 45 min or < 6 steps)
- Other: `holiday`, `fall`, `party`

**Only suggest tags that already exist in the database.** If a recipe clearly warrants a tag that doesn't exist yet (e.g., a new cuisine or category), mention it separately and ask: "This could also use a new tag `[X]` — want me to add it?" Do not create new tags without explicit approval.

Ask: "Ready to save, or any changes?"

### Step 3: Create the Notion page

Use `Notion:notion-create-pages` with database ID `2896a7404245802385bbe9b953ed295a`.

**Properties:**
- `Name`: recipe title
- `Ingredients`: each ingredient on its own line, joined with `<br>`
- `tags`: confirmed tag list as a **JSON array string** — e.g., `"[\"meat\", \"beef\", \"Asian\"]"`. Must be a serialized JSON array, not comma-separated or pipe-separated.
- `Source`: the origin of the recipe. For cookbooks: name, author, page (e.g., `Mostly Plants — Tracy Pollan, p. 56`). For web recipes: the URL.
- `info`: intro/headnote text from the recipe (the orienting paragraph about the dish, if present). Leave empty if no intro. Do NOT put the source/citation here.
- `Workflow`: `To review`
- `Made?`: `want to make`
- `This week`: `__NO__`

**Page body content** (directions only — no intro text here, that goes in `info`):
```markdown
## Steps
1. [Direction 1]
2. [Direction 2]
...
```

### Step 4: Return the link

Share the Notion page URL so the user can review it.

## Guidelines

- Transcribe ingredients and directions **faithfully** — don't rephrase, convert units, or omit steps
- Keep original measurement units (don't convert tbsp to mL, etc.)
- If a recipe spans two photos, synthesize both into one complete entry
- **Never fabricate or guess at text you can't read.** If something is illegible or uncertain, use `[illegible]` and flag it. This applies to intro text, ingredients, directions — everything. It is far better to leave a field as `[illegible — review original]` than to hallucinate plausible-sounding text.
- For the `Source` field: use `Book Title — Author, p. XX` for cookbooks, or the URL for web recipes
- For the `info` field, use the recipe's intro/headnote text only (if any). Do not put source/citation info here.

See [reference/database-schema.md](reference/database-schema.md) for full schema details.

## Batch Mode (folder of photos)

When the user provides a folder path instead of individual images:

### Step 1: Scan and group

1. List all image files in the folder (jpg, jpeg, png, heic)
2. Read each image and classify it:
   - **Recipe text page** — has a visible recipe title, ingredients, or directions
   - **Food photo page** — primarily a photograph of a dish
   - **Continuation page** — no title, but continues ingredients or directions from a previous page
3. Group images into recipes by matching:
   - Same recipe title appearing across images
   - Page numbers that are consecutive or part of the same spread
   - A food photo that faces or is adjacent to a recipe text page
   - Continuation text that picks up where a previous image left off

### Step 2: Present the grouping for confirmation

```
Found [N] recipes in [M] images:

1. **[Recipe Name]** — images: file1.jpg, file2.jpg
   Ingredients: [count] | Tags: [suggested] | Photo: yes/no
2. **[Recipe Name]** — images: file3.jpg
   Ingredients: [count] | Tags: [suggested] | Photo: no
...

Ungrouped images (if any): file7.jpg — [description of what's on it]
```

Ask: "Does this grouping look right? Any changes before I save them all?"

### Step 3: Batch create

After confirmation, create all Notion pages. Use `Notion:notion-create-pages` with the data source ID to create multiple pages in a single call when possible. Process food photos for each recipe that has one.

### Step 4: Summary

```
Created [N] recipes:
1. [Recipe Name] — [Notion URL] | Photo: /tmp/recipe-name.jpg
2. [Recipe Name] — [Notion URL] | No photo
...

Drag photos into their respective Notion pages' `image` property.
```
