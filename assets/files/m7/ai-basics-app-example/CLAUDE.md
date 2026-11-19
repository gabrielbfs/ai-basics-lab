# Instructions for Claude Code in this folder

## About the project
- A one-page unit-economics calculator for the fictional Trail Club subscription. The spec is `docs/spec.md`; the original prototype is `docs/prototype.html`.
- I'm not a developer. Explain changes in plain English, one sentence per file.

## How to work
- Show a plan and file list before editing, and wait for my OK.
- Keep it plain HTML, CSS and JavaScript, with no outside libraries and no build step. It must open by double-clicking `index.html`.
- Keep calculations in `calculate()` in `app.js`, separate from page code, so `tests.html` can check them.
- After any change to the calculations, run the checks in `tests.html` and tell me the result.

## Never
- Never put API keys, passwords or real company data in any file. This folder will be public on GitHub.
- Keep the footer line that says the figures are made up.
