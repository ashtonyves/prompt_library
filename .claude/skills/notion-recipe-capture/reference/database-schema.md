# Recipes Database Schema

Database ID: `2896a7404245802385bbe9b953ed295a`
Data Source URL: `collection://2896a740-4245-80b8-b302-000b09cfdc1e`

## Properties

| Property | Type | Notes |
|---|---|---|
| Name | title | Recipe name |
| Ingredients | text | Newline-separated (`<br>` in Notion), each on its own line with quantity + ingredient |
| tags | multi_select | See options below |
| Source | text | URL if from web, or cookbook name/author/page (e.g., `Mostly Plants — Tracy Pollan, p. 56`) |
| info | text | Intro/headnote text from the recipe (orienting paragraph about the dish) |
| Made? | select | `want to make`, `made` |
| Workflow | select | `Reviewed`, `To review` |
| This week | checkbox | `__YES__` / `__NO__` |
| rating | select | `⭐` through `⭐⭐⭐⭐⭐` |
| my notes | text | Personal notes |
| image | file | Photo uploads |
| Related Recipes | relation | Links to other recipes in same DB |
| Created time | created_time | Auto-set |

## Tag Options

Categories: `weeknight`, `easy`, `vegetarian`, `soup/ stew`, `salad`, `sauces`, `condiments`, `drink`, `spaghetti`, `meat`, `fish`, `beef`, `pork`, `eggs`, `vege`, `side`, `holiday`, `fall`, `breakfast`, `party`

Cooking method: `air fryer`, `oven`, `grill`, `stovetop`

Cuisine: `Asian`, `Mexican`, `Middle Eastern`, `Mediterannean`, `Italian`

## Page Body Structure

The page body contains the recipe directions as markdown:
- Optional intro/description paragraph
- `## Steps` heading with numbered list of directions
