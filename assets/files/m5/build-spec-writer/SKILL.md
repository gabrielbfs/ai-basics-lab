---
name: build-spec-writer
description: Turns a prototype or tool idea into a one-page build spec for Claude Code. Use when asked for a build spec or spec.md, or to get a prototype ready to build as a real app.
---

# Build-spec writer

Turn a prototype (an HTML file, an artifact, or a description of a tool) into a one-page build spec that Claude Code can follow to build the tool as a small real app.

## Steps

1. Read the prototype and any files the user shares (for example inputs.xlsx or brief.docx). Work out the inputs, the outputs and how each output is calculated.
2. If something you need is missing, ask the user at most 3 questions, one at a time, and wait for each answer:
   - Who will use the tool, and for what decision?
   - What must stay exactly as it is in the prototype?
   - What should be better in the real app?
3. Write the spec in the format below. Keep it to one page. Use the prototype's real numbers in the acceptance checks.
4. Save it as spec.md where the user asks. If you can't save files, show the whole spec in one block so the user can copy it.

## Output format

# Build spec: [tool name]

**Who it's for:** one sentence.

**What it does:** one sentence.

**Inputs:** a table with name, unit, default value and valid range for each input.

**Outputs:** a table with name, how it's calculated, and the one-line explanation shown under it.

**Edge cases and rules:** what happens with zero, blank or out-of-range inputs (show a clear message, never "Infinity" or "NaN"), plus any warnings or thresholds.

**Constraints:**
- Plain HTML, CSS and JavaScript, with no outside libraries.
- One screen that works on a phone.
- Example data pre-filled and labeled as examples.
- No real company data, no passwords and no API keys anywhere in the files.

**Files:** index.html (page), style.css (look), app.js (calculations), README.md (what it is and how to open it).

**Acceptance checks:** 3 to 5 checks, each with inputs and an expected result someone can test by hand, for example: "With the default inputs, LTV shows $1,176."

**Before writing code:** show a plan and file list and wait for my OK.

## Rules

- Don't invent features the user didn't ask for. List ideas under "Later" at the end instead.
- Don't include client names, real data or anything confidential in the spec.
