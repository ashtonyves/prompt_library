---
name: accessibility-inclusive-design-skills-v1
description: The complete master guide for Accessibility, Inclusive Design, Neurodiversity, Data Viz, and UX Patterns. Put together by Vitaly Friedman.
---

# Accessibility & Inclusive Design Skills

Apply the following rules when designing and building user interfaces to support diverse user needs, including neurodiversity, mental health, global audiences, AI interactions, and assistive technology.

---

## Semantic Structure & HTML

*Context: Proper HTML is the foundation of accessibility for screen readers and search engines.*

- MUST use semantic HTML elements (`<button>`, `<nav>`, `<main>`) over generic `<div>`
- MUST nest headings (`<h1>`–`<h6>`) sequentially without skipping levels
- MUST identify the main language of the page in the `<html>` tag
- MUST use unique `id` attributes for active elements on the same page
- MUST structure content order in the code to match the visual order
- MUST ensure interactive elements have borders or distinct outlines to remain visible in Windows High Contrast / Forced Colors mode
- SHOULD use landmarks (`<header>`, `<aside>`, `<footer>`) to define page regions
- SHOULD use lists (`<ul>`, `<ol>`, `<dl>`) for grouped items to convey structure
- SHOULD use tables strictly for tabular data, not for layout
- NEVER use headings solely for visual sizing (use CSS instead)
- NEVER duplicate IDs on a single page
- NEVER block the ability to zoom text up to 400%

## Screen Readers & Assistive Tech

*Context: Users often listen at 1.5–2.0x speed. Structure is conveyed via content order and headers.*

- MUST use native HTML elements first before adding ARIA roles
- MUST link labels to inputs explicitly (`for`/`id` or wrapping)
- MUST ensure content follows a logical linear layout
- MUST include navigation landmarks so users can jump content blocks
- MUST update `aria-expanded` or `aria-hidden` states dynamically via JS
- MUST announce dynamic content changes using `aria-live` regions
- SHOULD use `aria-label` when no visible label is present (e.g., icon buttons)
- SHOULD avoid repetitive labels (e.g., repeating the same image caption)
- NEVER use automated "overlay" widgets to "fix" compliance; they often obstruct native assistive technology
- NEVER use ARIA attributes on elements that don't support them
- NEVER hardcode static `aria-hidden="true"` on focusable elements
- NEVER rely on visuals alone (users may not see them at all)
- NEVER use generic link text like "Click here" or "Read more"

## Video, Audio & Advanced Captioning

*Context: Captions are for accessibility (sounds + dialogue); Subtitles are for translation. 85% of social video is watched without sound.*

- MUST distinguish between "Captions" (includes sound effects, speaker IDs) and "Subtitles" (translation only)
- MUST allow decoupling of audio tracks from subtitle languages (e.g., English Audio + French Subtitles)
- MUST provide a searchable transcript linked to video timestamps
- SHOULD limit subtitle sequences to 1–8 seconds duration and ~40 characters per line
- SHOULD position subtitles *below* the video content (not overlaying) or allow users to relocate them
- SHOULD offer customization presets: Font (Dyslexic, Monospace), Size, High Contrast, and Background Opacity
- SHOULD format multi-line captions in a "pyramid" shape (longer line on top) for reading balance
- NEVER "burn in" subtitles permanently; always use closed captions that can be customized or translated
- NEVER auto-play audio; it alarms and frustrates users

## Documents, PDFs & E-Books

*Context: "Print to PDF" usually creates an inaccessible image. PDFs need a hidden "Tag" structure similar to the DOM.*

- MUST ensure all PDFs are "Tagged" (PDF/UA compliant) to define reading order and structure.
- MUST set the Document Title in PDF properties so screen readers read the title, not the filename
- MUST verify the "Reading Order" panel matches the visual flow (standard PDFs often scramble columns).
- MUST provide alt text for charts and figures within the PDF structure itself.
- SHOULD prefer HTML web views over PDF downloads for essential documentation (easier to reflow/zoom).
- NEVER use "Print as Image" or "Scan to PDF" without running Optical Character Recognition (OCR) and tagging.

## Complex Patterns: Carousels & Sliders

*Context: Carousels often suffer from discoverability issues. If used, they must be strictly controlled.*

- MUST provide a visible "Pause/Stop" button for any auto-advancing carousel
- MUST group "Previous" and "Next" buttons close together for easier motor control
- MUST pause auto-rotation on hover and stop completely on interaction
- SHOULD avoid auto-advancing carousels whenever possible
- SHOULD replace progress dots with distinct labels, icons, or thumbnails
- SHOULD display navigation buttons *above* the carousel on desktop and *below* on mobile
- IF auto-advancing, MUST add at least a 5–7 second delay per slide
- NEVER rely on dragging movements alone for navigation

## Complex Patterns: Drag-and-Drop

*Context: Most drag-and-drop libraries fail accessibility checks. Users need keyboard control (Space/Arrows).*

- MUST support keyboard navigation: `Space` to pick up/drop, `Arrow keys` to move
- MUST design distinct visual states for: Grabbed, Dragged, Dropped, and Error
- MUST ensure dragged items move content out of the way to create room (reflow)
- MUST move dragged items toward the user in the z-dimension (elevation)
- SHOULD remove the item from the stack immediately upon drag (for cards) or upon drop (for tables)
- SHOULD use a haptic "bump" on mobile to indicate an item has been grabbed
- NEVER rely solely on mouse interactions

## Layout, Scanning & The "F-Shape" Pattern

*Context: Users don't read; they scan. The "F-Shape" pattern means they miss content on the right.*

- MUST front-load headings and paragraphs with keywords (users focus on the first 2 words)
- MUST align text to the left; horizontal attention leans heavily to the left side (80% of time)
- SHOULD use the "Layer-Cake" pattern: frequent subheadings to guide scanning eyes
- SHOULD use floating headers for large data tables so users keep context while scrolling
- SHOULD visually group small chunks of related content to create "anchors"
- NEVER justify text (creates uneven gaps that hurt scanning)

## Keyboard Navigation & Focus

*Context: Essential for power users and those with motor disabilities who cannot use a mouse.*

- MUST ensure all interactive elements are focusable via `Tab` key
- MUST provide a visible, high-contrast focus indicator for active elements
- MUST follow a logical tab order (left-to-right, top-to-bottom)
- MUST allow users to navigate into and out of all UI components (no keyboard traps)
- SHOULD provide "Skip to Content" links for main content areas
- SHOULD ensure focus moves to a modal/dialog when it opens
- SHOULD return focus to the trigger element when a modal closes
- NEVER remove the browser default focus ring (`outline: none`) without a replacement
- NEVER rely on hover states that aren't accessible via keyboard focus
- NEVER leave focus lost on the `<body>` tag after closing a view

## Navigation Patterns: Sticky Menus, TOC & Skip Links

*Context: Guidelines for advanced navigation patterns to prevent obstruction and repetitive tabbing.*

- MUST include a "Skip to main content" link as the first focusable element
- MUST ensure focusable elements are not obscured by sticky headers when tabbing (use scroll-padding)
- MUST ensure sufficient contrast between sticky menus and content
- SHOULD limit sticky bar items to a maximum of 5 to avoid rage taps
- SHOULD use a sticky sidebar (left preferred) for Table of Contents on long pages
- SHOULD convert Table of Contents headings into accordions on mobile
- NEVER allow long sticky menus to create multiple scrollbars
- NEVER hide skip links permanently (they must appear on focus)
- NEVER include external links in the Table of Contents

## Color, Contrast & Visual Perception

*Context: Includes guidelines for Color Blindness (300M people) and the "Dark Yellow" problem.*

- MUST ensure text has a contrast ratio of at least 4.5:1 against the background (WCAG AA)
- MUST ensure UI components/graphics have a contrast ratio of at least 3:1
- MUST use more than color to communicate data (labels, patterns, shapes)
- MUST ensure yellow/orange meets 4.5:1 contrast; usually requires shifting hue toward brown/burnt orange
- MUST always accompany yellow UI elements with dark text or icons to articulate meaning
- SHOULD use Blue as a safe hue (perceived clearly by most)
- SHOULD respect prefers-color-scheme media queries to support system Dark Mode
- SHOULD use "brown" (dark yellow) if yellow is required for text
- NEVER rely on color alone to convey meaning or status
- NEVER use instructions that rely solely on sensory characteristics (shape, size, visual location, orientation, or sound)
- NEVER mix Red, Green, and Brown together
- NEVER mix Pink, Turquoise, and Grey together

## Typography & Readability

*Context: 10% of users have dyslexia. Reading can take them 3× as long. Fluid typography ensures legibility.*

- MUST define font sizes using relative units (`rem`, `em`, `%`) rather than fixed `px`
- MUST align text to the left; NEVER justify text
- MUST avoid heavy underlines, all-caps, and italics
- MUST maintain a readable line height (at least 1.5x font size)
- MUST limit line width to ~80 characters for comfortable reading
- SHOULD use dark grey text on soft/off-white backgrounds rather than pure black/white
- NEVER use text contained within images
- NEVER use dynamic, moving, or flashing images near text content

## Forms, Input & Identity

*Context: Forms are the #1 barrier. Assumptions about names, gender, and formats cause lock-outs.*

- MUST ensure every input has a clear, persistent text label
- MUST provide text-based error messages identifying the invalid field
- MUST use a single input field for phone numbers (including country code)
- MUST allow people to type their name exactly as they prefer (incl. special chars)
- MUST support copy-pasting for all inputs (users often paste data)
- MUST provide 3 interaction modes for sliders: handle, text box, and +/- steppers
- SHOULD make Gender/Ethnicity fields optional and include a "Self-describe" text option
- SHOULD ask how a user prefers to be addressed if specific formalities are needed
- SHOULD display useful hints *above* the text box, not as placeholders
- SHOULD show errors immediately only for severe/blocking issues
- NEVER use placeholder text as a replacement for a label
- NEVER split phone numbers into multiple fields
- NEVER validate prematurely (while user is focused or just starting to type)
- NEVER tell a user their name is "invalid"

## Time Zones & Localization

*Context: Assumptions about time (DST, offsets) are often wrong. People think in "Local Time," not UTC.*

- MUST support autocomplete for city, country, and locality when selecting time zones
- MUST show the current local time within autocomplete suggestions
- MUST sort time zone options alphabetically by country/city, not by UTC offset
- MUST account for non-standard offsets (e.g., 30 or 45 mins in India, Nepal)
- NEVER assume DST happens at the same time everywhere or follows a 1-hour rule

## Authentication & Security UX

*Context: 34% of users use password managers. Security shouldn't destroy usability.*

- MUST NOT disable copy-paste for password fields (blocks password managers)
- MUST include `autocomplete="new-password"` so browsers generate strong passwords
- SHOULD nudge users toward 2FA/MFA rather than imposing strict, complex password rules
- SHOULD provide an "access recovery stack" (Authenticator apps, Passkeys, Magic links, backup codes, but NOT SMS)
- NEVER rely solely on security questions (easily socially engineered)

## Interaction: Cancel, Confirm & Undo

*Context: Clarity > Consistency for destructive actions. "Undo" is preferred for frequent actions.*

- MUST use explicit labels for Cancel actions (e.g., "Discard Changes", "Close", "Stay")
- MUST make destructive buttons (Delete, Cancel) visually distinct and harder to reach
- SHOULD use "Undo" for low-severity, frequent actions
- SHOULD use "Confirm" dialogs for severe, rare, or irreversible actions
- NEVER use an ambiguous "X" icon in a modal (can mean Close, Save, or Cancel)
- NEVER use double negatives in confirmation dialogs (e.g., "Cancel the cancellation")

## Touch Targets & Mobile

*Context: Finger precision varies by screen zone. Users are most accurate in the center (7mm) and least accurate at the top/bottom edges (11–12mm).*

- MUST ensure a hard minimum interactive size of 24×24px (WCAG 2.2 AA) with sufficient spacing
- MUST encapsulate the entire element (full-width bars/cards) rather than just the text or icon
- MUST provide single-pointer alternatives for complex gestures (e.g., a visible 'Delete' button in addition to 'Swipe to Delete')
- SHOULD aim for "Safe Zone" targets based on screen position (Steven Hoober’s Rule):
    - **Top of screen:** ~42px (11mm) minimum
    - **Bottom of screen:** ~46px (12mm) minimum
    - **Center of screen:** ~27px (7mm) minimum
- SHOULD limit bottom tab bars to a maximum of 5 items
- SHOULD use distinct "Tap" buttons rather than hover tooltips for mobile actions
- SHOULD use magnification overlays (like iOS text selection) for very small precise targets
- SHOULD increase target sizes significantly for sticky menus to account for movement
- NEVER place interactive elements flush against the screen edge without padding
- NEVER disable the visual zoom pinch gesture
- NEVER crowd targets; if a target is small (<44px), the spacing around it MUST be large

## Animation & Motion

*Context: Motion should provide feedback, not distraction. Users may prefer reduced motion.*

- MUST respect the user's `prefers-reduced-motion` system setting
- MUST provide a mechanism to pause, stop, or hide auto-playing content
- SHOULD keep optimal speed for UI animation between 200–500ms
- NEVER use parallax effects or moving elements at different speeds without a toggle
- NEVER flash content more than 3 times per second (seizure risk)

## Neurodiversity: General & Cognitive Load

*Context: Neurodiversity is natural variation. Users rely on limited working memory (Miller’s Law: 7±2 items).*

- MUST create "islands of clarity" by chunking options into distinct groups
- MUST maintain order: simple questions and actions, one thing at a time
- MUST view differences (ADHD, dyslexia, etc.) as natural variations, not deficits
- SHOULD use persistent side panels rather than overlays for comparison tasks
- SHOULD allow users to "favorite" or store critical details for later use
- NEVER design for the "average" user (this person does not exist)
- NEVER force users to memorize data across different tabs

## Neurodiversity: ADHD & Autism

*Context: Supports impulsivity, time-blindness, anxiety, and sensory sensitivity.*

- MUST support "saving for later" to prevent data loss during distractions
- MUST break complex forms into simple, single-topic pages
- MUST use soft, muted colors; avoid pure white text on pure black backgrounds
- MUST write in literal, plain language (no idioms, sarcasm, or figures of speech)
- MUST allow users to control or stop animations (e.g., blinking ads)
- SHOULD display recently opened files and used filters to aid working memory
- NEVER auto-play videos or animations (gifs) that hijack attention
- NEVER renew contracts without a series of reminders
- NEVER use urgency tactics like countdown timers or aggressive timeouts

## Numeracy (Dyscalculia)

*Context: 3–10% of people have dyscalculia, finding it hard to spot patterns in numbers.*

- MUST allow users to include spaces when entering numbers (e.g., credit cards)
- MUST round values to the nearest whole number unless decimals are mandatory
- SHOULD use natural language for time (e.g., "5pm" not "5.00pm")
- NEVER time users out or lock them out for 24h due to entry errors

## Mental Health & Emotional Safety

*Context: Asking for help makes people feel vulnerable. Support means giving hope, not just answers.*

- MUST set up routes to anonymity and clear "ways out" of the experience
- MUST only ask people to explain and tell their traumatic story once
- MUST provide a range of channels to communicate (text, chat, voice)
- SHOULD scale up support intensity when necessary
- NEVER assume what the user wants or needs; suspend assumptions

## Aging, Dementia & Motor Control

*Context: 1 billion people are 60+. Includes guidelines for memory loss and reduced dexterity.*

- MUST use high contrast (WCAG AA min) and large body copy (16px+)
- MUST ensure every screen contains all context needed to act (don't rely on memory)
- MUST use descriptive, verb-based labels (e.g., "Finish and Send" vs "Okay")
- SHOULD use static field labels rather than small floating labels
- SHOULD test fonts for legibility (use the "1Il0O" snippet test)
- NEVER use patronizing language (e.g., "sweetie", "good job!")
- NEVER use CAPTCHAs or puzzles; they are cognitive blockers
- NEVER rely on precise movements; accommodate reduced dexterity

## Children & Teenagers

*Context: Children need steady achievements. Teens have low patience and skim content.*

- MUST focus design on a specific two-year age range for children
- MUST use large text (18–19px) and large tap targets (min 75×75px)
- MUST provide transparent feedback for every single action performed
- SHOULD use neutral adult language for teens; address them as equals
- SHOULD refine autocomplete to help teens formulate better search queries
- SHOULD design to increase intrinsic motivation rather than relying solely on rewards
- NEVER label teens as "kids" (often a deal-breaker)
- NEVER place buttons at the bottom of the screen (young kids tap them by mistake)

## Deafness & Hard of Hearing

*Context: 466 million people. Lip reading is only ~30% effective.*

- MUST provide closed captions and transcripts for all audio/video
- MUST clearly identify speakers in audio/video content
- MUST provide text alternatives for audible alerts
- NEVER require phone calls as the only method of contact

## Resilience & Edge Cases

*Context: Design must account for the "unhappy path" to prevent dead-ends.*

- MUST design the full UI stack: blank, loading, partial, error, and ideal states
- MUST allow users to override validators or add options manually
- SHOULD suggest presets, templates, or starter kits for quick recovery
- SHOULD design for extreme scales (extra long/short names, offline mode, slow data)
- NEVER use generic error messages; explain what happened
- NEVER assume data will fit the "ideal" state layout

## Artificial Intelligence (AI) & Chat Interfaces

*Context: AI features are rarely accessible by default. Users trust transparency over "fake human" behavior.*

- MUST be transparent about whether the user is speaking to an AI or a human
- MUST explicitly label AI agents via text or `aria-labels` to distinguish from humans
- MUST provide "Skip to chat" or "Skip to last reply" links to bypass history
- MUST ensure AI-generated charts and visuals have proper alt text
- SHOULD allow users to collapse chat history without ending the session
- SHOULD provide task builders to help users articulate prompts (avoid open-ended "Ask me anything")
- NEVER use disguised AI that pretends to be human; it erodes trust
- NEVER use repetitive "busy" messages for screen reader users

## Voice UX (VUI) & Conversational Design

*Context: Human conversation doesn't have "errors." Voice assistants are chosen based on personality and trust.*

- MUST keep answers short; offer max 3 options at a time
- MUST design for long silences (allow 8–10s for users to think)
- MUST allow users to slow down, speed up, or rephrase output
- SHOULD ask direct questions and branch out rather than listing long menus
- NEVER treat user input as an "error"; re-prompt or reframe instead

## Data Visualization & Honest Charts

*Context: Charts have a job to do. Dishonest charts (e.g., truncated axes) spread biased messages.*

- MUST start bar chart baselines at 0
- MUST NOT expand the y-axis beyond the max value to dampen perception of change
- SHOULD choose chart types based on the "job": Line for time changes, Bar for comparison, Scatter for relationships
- NEVER choose narrow segments to highlight a point ("Cherrypicking")
- NEVER use leading titles to force a specific narrative interpretation

## Search, Sorting & Feature Discovery

*Context: Search results get 60% of clicks. Sorting helps re-arrange options. Hidden features hurt discoverability.*

- MUST show at least 3 search results without scrolling
- MUST repeat sorting options at the bottom of long lists
- MUST explain *why* a feature is disabled and how to re-enable it
- SHOULD start showing search suggestions immediately on focus
- SHOULD DISABLE features if the user *might* use them later; HIDE if *never*
- NEVER hide search behind an icon if high engagement is the goal
- NEVER use technical abbreviations like "ASC/DESC" for sorting

## Error Handling & Messages

*Context: Error messages are critical for recovery. Poor errors lead to abandonment.*

- MUST grade errors by impact: Annoying (warmth), Enraging (clear instructions), Horrific (apology + resolution)
- MUST categorize errors as Slips (constraints/autocomplete needed) or Mistakes (examples/explanations needed)
- MUST show errors near the input (forms) or within the row (tables)
- SHOULD allow users to override non-critical error messages
- SHOULD include an error summary with links at the top of the page to avoid auto-scrolling jumps
- NEVER rely on red color alone; always include an icon
- NEVER cover user input with the error message itself
- NEVER use technical jargon, humor, or generic terms like "forbidden" or "invalid"

## Single Page Apps (SPA) & Routing

*Context: In React/Vue/Angular, "page loads" are simulated. Focus is often lost during transitions, confusing screen reader users.*

- MUST strictly manage focus during route changes:
    - Move focus to the new `<h1>` or a wrapper `<main>` (with `tabindex="-1"`) immediately after the new view loads.
    - Announce the page title change via `document.title` or an `aria-live` region.
- MUST ensure the "Back" button restores focus to the element that triggered the navigation.
- NEVER leave focus "lost" on the `<body>` tag after a route change.

## Legal & Compliance Context

*Context: Accessibility is a legal requirement in major markets. The European Accessibility Act (EAA) takes effect in June 2025.*

- MUST aim for **WCAG 2.2 Level AA** compliance as the global safety standard.
- MUST ensure E-commerce, Banking, and Transport services comply with the EAA by 2025 to operate in the EU.
- SHOULD maintain an "Accessibility Statement" in the footer detailing known limitations and contact info.