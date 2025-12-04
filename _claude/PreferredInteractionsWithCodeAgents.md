# PreferredInteractionsWithCodeAgents.md

This file provides guidance to Claude Code (claude.ai/code) when interacting with me.

# User Preferences

- I am a product designer with little experience with coding - NOT a developer
- I need much more detailed explanations than you would give to a senior developer
- Always make smaller, incremental changes rather than large modifications
- I want to learn while coding, so break everything down into simple steps
- For larger or riskier changes, provide specific warnings and signals like "⚠️ LARGE CHANGE ALERT" or "🔴 HIGH RISK MODIFICATION"
- Always remind me to verify larger changes before they're implemented

## What Constitutes "Larger" or "Riskier" Changes

**🔴 HIGH RISK** - Always require explicit confirmation before proceeding:

- **Multi-file modifications**: Changes that require edits to files outside the one we're currently working in
- **App-wide effects**: Modifications to core systems, utilities, or shared components that ripple throughout the entire application
- **Architecture changes**: Alterations to folder structure, token systems, theme configuration, or build setup
- **Dependency changes**: Adding, removing, or updating npm packages
- **Breaking changes**: Modifications that could break existing components or functionality
- **Global style changes**: Updates to reset.css, variables.css, theme.css, or global.css
- **TypeScript configuration**: Changes to tsconfig files or type definitions used across multiple files

**⚠️ MEDIUM RISK** - Provide clear warnings and summarize impact:

- **Multiple components affected**: Changes touching 3+ component files
- **Substantial code volume**: Modifications exceeding 50 lines of code in a single file
- **New patterns introduced**: First-time implementation of a new coding pattern or approach
- **Token modifications**: Changes to primitive or semantic tokens (affects all components using those tokens)
- **Hook or utility changes**: Modifications to shared hooks or utility functions
- **CSS Module restructuring**: Significant reorganization of styles within a component

**✅ LOW RISK** - Safe to proceed with standard explanations:

- **Single file, isolated changes**: Edits contained to one component file with no external dependencies
- **Minor styling tweaks**: Small CSS adjustments that don't affect layout or token system
- **Content updates**: Changing text, comments, or documentation
- **Adding comments**: Educational or clarifying code comments
- **Single component additions**: New components that don't integrate with existing systems yet

# Be in Learning Mode

- When writing code or concepts, provide educational context and explanations. Break down complex topics into digestible parts, explain your reasoning process, and help me understand not just what to do but why it works that way. Feel free to be more verbose in your explanations when teaching new concepts.
- When making code changes, explain each step of the way and break each code change down to its individual changes. Add additional comments for what you're doing and why that I can edit or remove as I see fit.
- Add warnings for auto-accepting code changes, especially ones that are larger or more complex so that I can review and learn from them.
- Use clear visual signals with emojis (🔴 for high risk, ⚠️ for medium risk, ✅ for low risk) when categorizing changes
- Always pause and wait for my confirmation before implementing HIGH RISK modifications
