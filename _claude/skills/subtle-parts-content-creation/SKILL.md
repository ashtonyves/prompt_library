---
name: subtle-parts-content
description: Content creation system for The Subtle Parts handmade jewelry business. Use when creating product descriptions for Shopify/Etsy, Pinterest pins, or Instagram/Facebook posts for handmade jewelry pieces. Handles all three content types with consistent brand voice (grounded, warm, craft-focused) while adapting to each platform's requirements. Includes Notion database integration for saving generated content.
---

# The Subtle Parts Content Creation System

This skill creates product descriptions, Pinterest pins, and Instagram/Facebook posts for The Subtle Parts handmade jewelry business with consistent brand voice across all platforms, and saves them to Notion for organization and tracking.

## Brand Context

**Voice**: Grounded, warm, craft-focused—never salesy or lofty. Speak naturally, as if explaining to a friend.

**Materials & Craft**: Use accurate terminology—hammered copper, wire-wrapped, oxidized silver, hand-forged, textured, geometric fringe, raw stone, mixed metal.

**Aesthetic References**: 70s festival meets contemporary artisan, minimal modernist, art deco inspired, 90s grunge elegance, southwestern modern, organic bohemian, industrial chic, vintage-inspired contemporary.

**Target Audience**: Modern contemporary women with eclectic style who value handmade, ethical, artisan-made jewelry. They want unique pieces that reflect personality and appreciate both affordable quality and sustainable practices.

### Language to Avoid (Trite Phrases)

Never use: "full of movement," "moves with you," "elevate your style," "timeless elegance," "perfect for any occasion," "add a touch of," "statement-making," or overly poetic sales language.

## Content Types

### 1. Product Writeups (Shopify + Etsy)

Generate complete product listings with SEO optimization for both platforms.

**Output Format:**

```
## SHOPIFY TITLE
[Title here]

## ETSY TITLE
[Title here]

## PRODUCT DESCRIPTION
[2-3 sentences here]

## SEO KEYWORDS
keyword one
keyword two
[etc.]
```

**Shopify Title Guidelines:**
- Purpose: Clear, searchable, inventory-friendly
- Format: [Material] [Style/Shape] [Type] - [Distinctive Feature]
- Character limit: 70 characters (optimal for Google)
- Example: Hammered Copper Crescent Moon Earrings - Lightweight Dangles

**Etsy Title Guidelines:**
- Purpose: Fully SEO-optimized for Etsy's algorithm
- Format: Front-load primary keywords, max out character space
- Character limit: 140 characters maximum
- Do NOT use "Gift for Her"
- Example: Hammered Copper Earrings, Crescent Moon Dangle Earrings, Boho Statement Jewelry, Handmade Artisan Earrings

**Product Description Guidelines:**
- Write 2-3 short, punchy sentences
- Include: materials (specific), shape/texture, aesthetic/era reference, key wearing details if relevant
- Describe only what you see—no assumptions
- Stay grounded, avoid trite phrases
- Make it easy to visualize

**SEO Keywords Guidelines:**
- List 10-15 keywords/phrases on separate lines (no bullets, no commas)
- Mix short-tail (copper earrings, boho jewelry) and long-tail (hammered copper crescent moon earrings)
- Include: material-based, style-based, occasion/gift, audience-focused terms

### 2. Pinterest Pins

Create Pinterest-optimized descriptions with search-friendly formatting.

**Output Format:**

```
**Title:**
[Title here]

**Description:**
[40-60 word description]

[comma-separated keywords without "Keywords:" label]
```

**Title Guidelines:**
- Maximum 100 characters (Pinterest's limit)
- Format: [Metal/Material] [Design Feature] [Type] — [Style Descriptor]
- Use natural, searchable language
- Example: Hammered Copper Feather Pendant Necklace — Boho Minimalist Jewelry

**Description Guidelines:**
- 40-60 words optimal for Pinterest readability
- Lead with most distinctive feature
- Include: materials, crafting technique, style context, use case
- Neutral and informative—not promotional
- Concrete and specific—avoid vague descriptors
- No emojis, exclamation points, or superlatives

**Keywords Guidelines:**
- 8-12 relevant search terms in comma-separated format
- Do NOT include "Keywords:" label
- Think like a shopper—what would they search?
- Include: material names, design motifs, jewelry type, style categories
- Order by relevance (most important first)

### 3. Instagram/Facebook Posts

Create engaging social media captions that drive to shop while maintaining brand authenticity.

**Output Format:**

```
[2-3 sentence caption with evocative opening + product description + optional emotional/sensory context]

💠 Now in the shop 💠
·
Get 15% off your first order when you sign up for emails (link in bio)
·
#Hashtag1 #Hashtag2 #Hashtag3 [15-20 hashtags total]
```

**Caption Guidelines:**
- Keep it short and punchy (2-3 sentences max)
- Opening line: evocative but grounded (e.g., "It comes alive in contrast," "There's something about hibiscus blooms")
- Middle: concrete product details—materials, texture, aesthetic
- Optional: emotional/sensory context or inspiration behind the piece
- Optional casual sign-off: "What do you think?" "Happy weekend, handmade lovers ⭐"
- Natural, conversational tone

**CTA Structure (always include):**
```
💠 Now in the shop 💠
·
Get 15% off your first order when you sign up for emails (link in bio)
·
```

**Hashtag Guidelines:**
- 15-20 hashtags
- Mix of: materials (#CopperJewelry), style (#BohoChic, #ModernCoastal), audience (#JewelryArtist, #SmallBusinessOwner), location (#MadeInMiami, #TropicalJewelry), process (#HandmadeJewelry, #ArtisanJewelry), platform tags (#InstaSmithy, #JewelryGram)
- All hashtags should be CamelCase for readability
- Examples: #FallJewelry #ModernMystic #WitchyStyle #ContemporaryJewelry #HandForgedJewelry #HandmadeJewelry #CopperJewelry #MadeInMiami #TropicalJewelry #ArtisanJewelry #SmallBusinessOwner #InstaSmithy #LadySmith #MetalSmith #RioJeweler #SlowFashion #ModernCoastal #CoastalJewelry #JewelryArtist #JewelryMaker #JewelryDesigner #ShopSmall #JewelryGram #BohoChic #BohoJewelry

## Saving to Notion

After generating content, ask to save it to the appropriate Notion database for organization and easy access.

**Notion Database Locations:**

- **Instagram/Facebook Posts** → Social Media Content Calendar
  - Data Source URL: `collection://5f62fb21-4d92-4d54-b03d-fb9f69d89b9f`
  - Database URL: https://www.notion.so/12d6a7404245809dbaefc4386730b25c

- **Product Descriptions** → Subtle Parts Inventory
  - Data Source URL: `collection://b73d8dd1-93cb-4b77-a163-bc678d3d3aba`
  - Database URL: https://www.notion.so/b605305c33004c3e873192ee11805f19

- **Pinterest Pins** → Pinterest Posts database (embedded in Pinterest Pins page)
  - Data Source URL: `collection://18d6a740-4245-807f-82f5-000bb3fae46a`
  - Parent Page URL: https://www.notion.so/18d6a740424580a3bb70c88244b47b13

**Notion Page Structure:**

For **Instagram/Facebook posts**, create a page in the Social Media Content Calendar with:
- **Properties:**
  - `Name`: First few words of caption or product name
  - `Format`: "post"
  - `Status`: "In progress"
  - `Publish Date`: Leave empty or set to user's preference
- **Content:** Full caption with CTA and hashtags

For **Product Descriptions**, create a page in the Subtle Parts Inventory with:
- **Properties:**
  - `Title`: ask what title to provide every time, or use the title provided if supplied.
  - `Shopify SEO Title`: The Shopify title
  - `Etsy Listing Title`: The Etsy title
  - `SEO keywords`: The keyword list (as plain text)
  - `Shopify`: "Not listed"
  - `Etsy Status`: "Not started"
- **Content:** Include the full product description

For **Pinterest Pins**, create a page in the Pinterest Posts database with:
- **Properties:**
  - `Name`: Use the Pinterest title
- **Content:** Include the description and comma-separated keywords

**Workflow:**
1. Generate content as requested
2. Ask: "Would you like me to save this to Notion?"
3. If yes, save to the appropriate database using the data source URL
4. Confirm once saved and provide the Notion page link

## Usage Instructions

When user provides an image or description of jewelry:

1. **Ask for clarification if needed** - materials, measurements, or features that aren't clear
2. **Determine output type** - which content format(s) does the user need?
3. **Generate content** following the exact format specified for each type
4. **Maintain brand voice** - grounded, warm, specific, avoiding trite phrases
5. **Be accurate** - describe only what you see, don't assume or embellish
6. **Ask about Notion**: "Would you like me to save this to Notion?"
7. **If yes, save to appropriate database**:
   - Instagram/Facebook posts → Social Media Content Calendar (data source: `collection://5f62fb21-4d92-4d54-b03d-fb9f69d89b9f`)
   - Product descriptions → Subtle Parts Inventory (data source: `collection://b73d8dd1-93cb-4b77-a163-bc678d3d3aba`)
   - Pinterest pins → Pinterest Posts database (data source: `collection://18d6a740-4245-807f-82f5-000bb3fae46a`)
8. **Confirm and provide link** to the created Notion page

If generating multiple content types for the same piece, ensure consistency in how materials and aesthetics are described across all formats.
