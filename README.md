# Prompt Library

A collection of reusable prompts, templates, and workflows for AI-assisted product design and development.

## Structure

```
prompts/
├── 01 planning/       # Planning and ideation prompts
├── 02 design/         # Design workflow prompts
├── 03 coding/         # Implementation and coding prompts
├── 04 documentation/  # Writing and documentation prompts
└── rg/                # Project-specific prompts (RyderGyde)

context/               # Project context documents
study-plans/           # Learning resources
.claude/skills/        # Claude Code skills for automation
```

## Prompts

### Planning

| Prompt | Description |
|--------|-------------|
| [Voice-to-Prompt Template](prompts/01%20planning/VoiceToPromptTemplate.md) | Transform voice-to-text rambles into structured prompts |
| [GitHub Issue Template](prompts/01%20planning/github-issue-template.md) | Create well-structured, atomic GitHub issues |
| [Prompt Generator for AI Prototyping](prompts/01%20planning/prompt-generator-for-ai-prototyping.md) | Turn rough product ideas into design specs for prototyping |

### Design

| Prompt | Description |
|--------|-------------|
| [Create Design Persona from Examples](prompts/02%20design/create-design-persona-from-examples.md) | Analyze competitor screenshots to build a reusable design persona |

### Coding

| Prompt | Description |
|--------|-------------|
| [Prompting Patterns](prompts/03%20coding/prompting-patterns.md) | Quick reference for effective AI coding patterns |
| [Component Implementation](prompts/03%20coding/component-implementation-prompt.md) | Implement Figma components using MCP with token mapping |
| [Compare Figma to Codebase](prompts/03%20coding/compare-figma-to-codebase.md) | Sync Figma designs with existing code implementations |

### Documentation

| Prompt | Description |
|--------|-------------|
| [Case Study Write-Up](prompts/04%20documentation/CaseStudyWriteUp.md) | Transform project notes into portfolio-ready case studies |

## Usage

Copy the relevant prompt into your AI assistant (Claude, ChatGPT, Cursor, etc.) and follow the instructions. Most prompts include:

- Clear role/context setup
- Step-by-step instructions
- Example outputs
- Customization guidance

## Claude Code Commands

The `.claude/commands/` directory contains slash commands for Claude Code:

| Command | Description |
|---------|-------------|
| [/audit-file](.claude/commands/audit-file/SKILL.md) | Audit a file for quality issues, broken references, and inconsistencies |
| [/summarize-work](.claude/commands/summarize-work/SKILL.md) | Summarize a coding session and post to GitHub Issues |

## Claude Code Skills

The `.claude/skills/` directory contains automation skills for Claude Code:

- **notion-meeting-intelligence** - Prepare meeting materials with Notion integration
- **notion-research-documentation** - Create research docs from Notion workspace
- **notion-knowledge-capture** - Transform conversations into structured documentation
- **notion-spec-to-implementation** - Convert specs into implementation tasks
- **skill-creator** - Guide for creating new Claude Code skills

## Contributing

Add new prompts following the existing structure:

1. Place in the appropriate category folder
2. Use markdown with clear headers
3. Include usage instructions and examples
4. Update this README with a description
