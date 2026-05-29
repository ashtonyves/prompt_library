# Design Prompts

Personal collection of product design and design engineering prompts.

---

## Simplification Prompts

**Simplify and dumb it down:**
```
Let's step back and think really hard. How can we make this simpler and dumber while still achieving our goals?
```

Use every time AI proposes something — ask it to simplify and dumb it down while still hitting the goal, instead of just accepting the first clever-looking solution.

*Source: [Brian Lovin](https://www.youtube.com/watch?v=dvEwb1Ajkwo)*

---

## Design Planning Prompts

**Convert PRD to user flows:**
```
*Behaviour*
You are an expert in user experience design for complex platforms.

*Task*
Please convert the attached PRD (Product requirements document) into a set of user experience outputs.

Steps
1. Read the document and ask clarifying questions to help you understand the intention and the context of this feature amongst what has already been built.
2. Ask any clarifying questions about the users and user types.
3. Breakdown the features mentioned in the document into details, steps or actions a user would take. Organize them by user intent or journey stage, e.g. onboarding, main interaction, post interaction. Identify key decision points, inputs and outputs for each feature to help visualize the user flow.
```

Turns a PRD into structured user experience outputs by surfacing clarifying questions about intent and users, then breaking features into user steps organized by journey stage. Use at the start of a design exploration when you need to translate product requirements into user flows.

*Source: [Rob Boyett](https://github.com/robboyett/Becoming-an-AI-designer/blob/main/Prompt-Lib/Prompt_convert-PRD-to-userflows.md)*

---

## UI Implementation Prompts

**Use predefined components and libraries:**

```
Create [a responsive navigation bar] using the shadcn/ui library with Tailwind CSS for styling.
```

Specify the UI libraries or components to use so generated code stays consistent and compatible with your stack. Use when you want the AI to build against a known design system rather than invent one.

---

## Mobile Implementation Prompts

**Mobile-first responsive design:**

```
Make the app responsive across all breakpoints, with a mobile-first approach.

Rules:
- Apply modern UI/UX best practices when deciding how components should adapt at each breakpoint.
- Use shadcn and Tailwind's built-in breakpoints. Do not introduce custom breakpoints unless explicitly requested.
- Preserve the existing design and functionality — do not change visual design or behavior, only adapt the layout for smaller screens and touch interactions.

Process:
1. Analyze the current layout and responsiveness. Identify what needs to change for mobile and touch.
2. Produce a detailed plan before editing any code.
3. After implementing, test across device sizes to confirm behavior matches the original.
4. If anything is ambiguous, pause and propose options instead of guessing.
```

Sets a mobile-first responsive baseline using shadcn/Tailwind breakpoints and forces a plan-before-edit pass focused on layout and touch interactions. Use when retrofitting or building a responsive app and you want behavior preserved while adapting to smaller screens.

---

**Fix a mobile layout issue from a screenshot:**

```
This screenshot shows a layout issue on mobile. Adjust margins and padding to make it responsive while keeping the same design structure.
```

Targets a specific mobile layout bug shown in a screenshot — fix spacing without redesigning the component. Use when you have a visible breakage on small screens and want a minimal, structure-preserving fix.

---

## Motion Implementation Prompts

**Add motion to a component:**

```
Add subtle, performant animations to this component to enhance user experience:

[paste component]

Include enter/exit animations, hover states, and micro-interactions that provide feedback without being distracting.
```

Layers motion onto an existing component — enter/exit transitions, hover states, and feedback micro-interactions — while keeping things subtle and performant. Use when a component feels static and you want it to communicate state changes through motion.

---

**Animate concepts with SVG + GSAP:**
```
For each [concept] I want you to show an animated visual of each concept in action using SVG and the GSAP animation library.
```

Creates concept-by-concept motion demos using SVG and GSAP so each idea is shown in action rather than described statically. Use when you want explanatory visuals for motion design explorations, presentations, or prototype storytelling.

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

