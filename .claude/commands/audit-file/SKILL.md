# Audit File

Perform a comprehensive audit of the currently open or specified file, checking for quality and consistency issues.

## Workflow

1. **Identify the file to audit:**
   - If a file path is provided as an argument (e.g., `/audit-file path/to/file.md`), use that file
   - If no argument is provided, use the currently open file in the IDE
   - If unclear, ask the user which file to audit

2. **Read and analyze the file** for the following issues:

3. **Generate an audit report** with these sections:

```markdown
## File Audit Report: [filename]

### Outdated Information
- [List any content that appears outdated, deprecated, or no longer accurate]
- If none found: "✓ No outdated information detected."

### Broken References
- [List any broken links, missing file references, incorrect paths, or dead URLs]
- If none found: "✓ No broken references detected."

### Missing or Incomplete Sections
- [List any sections that appear incomplete, have TODO markers, or are missing expected content]
- If none found: "✓ All sections appear complete."

### Inconsistencies with Current Patterns
- [List formatting inconsistencies, naming convention violations, or deviations from established patterns]
- Check against similar files in the same directory if applicable
- If none found: "✓ No pattern inconsistencies detected."

### Recommendations
- [Actionable suggestions for improving the file]
- Prioritize high-impact changes
```

4. **Present the audit report** to the user for review.

5. **Offer to fix issues:**
   - Ask if the user wants you to fix any of the identified issues
   - Make targeted edits based on user confirmation

## Important

- Focus on substantive issues, not minor stylistic preferences
- Provide specific line numbers or examples when identifying problems
- Be objective and factual in assessments
- Consider the file's context (documentation, code, configuration, etc.) when auditing
- Check related files in the same directory to understand local patterns and conventions
