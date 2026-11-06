# AI Basics Lab: course site

A self-paced course website for MIT Sloan students. It's plain HTML, CSS and JavaScript, with no framework and no server. The content plan is in `../AI_Basics_Lab_Revision_Plan.md`.

## See it

Double-click `index.html` to open it in your browser. Each module is its own page (`m1.html` … `m8.html`). `sample.html` shows the module template with every section filled in.

## What's where

| Path | What it is | Edit it to… |
| --- | --- | --- |
| `content/course.js` | Course settings, module list and order, overview page text, schedule | change the overview, rename or reorder modules |
| `content/modules/m1.js` … | One file per module, holding all of that module's text | write or fix a module |
| `content/modules/_template.js` | Blank module showing every field, with notes | start a new module (copy, rename, fill in) |
| `assets/css/site.css` | All styling: brand colors, fonts, layout, dark mode | change the look (rarely) |
| `assets/js/aib.js` | The one page template that lays out every page | change the page structure (rarely) |
| `assets/js/widgets.js` | Shared interactive parts: demo stepper, copy button, checklist, quiz | change how a widget behaves (rarely) |
| `assets/img/` | Screenshots for "What good looks like" and similar | add images (always give alt text) |
| `assets/files/m2/` | Module 2 downloads (CSV + Excel): practice data and the assumptions template | nothing; they're generated (see below) |
| `tools/make-m2-files.js` | Makes the Module 2 downloads. It also checks that the planted duplicate rows change the answer, and prints the numbers used in "Check your answer" | change the practice data, then run `node tools/make-m2-files.js` |
| `assets/files/m3/` | Module 3 downloads: two short fictional articles that disagree (rent vs. buy) | nothing; they're generated |
| `assets/files/m4/prototype-example.html` | Example prototype for Module 4: a savings goal planner (hand-written; also the catch-up download in Module 5) | edit by hand, then retake `assets/img/m4-prototype-example.png` |
| `assets/files/m5/prototype-example-unit-economics.html` | The worked example prototype (Trail Club calculator) that the Module 5 example spec and the Module 7 example app are built from (hand-written) | edit by hand, then run `make-m5-files.js` and `make-m7-files.js` |
| `tools/make-m3-files.js` | Makes the Module 3 downloads. It checks the numbers in the articles (mortgage payment, price growth) | edit the text in this script, then run it |
| `assets/files/m5/build-spec-writer/SKILL.md` | Reference skill for Module 5 (hand-written) | edit by hand, then run `make-m5-files.js` |
| `assets/files/m5/spec-example-unit-economics.md` | Example build spec for the default prototype (hand-written; catch-up download in Module 7) | edit by hand, then run `make-m5-files.js` |
| `tools/make-m5-files.js` | Checks the skill against the Help Center limits (name ≤64, description ≤200 characters) and the spec against the example prototype's numbers, then zips the skill for upload | — |
| `assets/files/m6/work-week/`, `work-week.zip` | Module 6 sandbox: a fictional week of calendar, emails and notes for students who can't connect a real app | nothing; they're generated |
| `tools/make-m6-files.js` | Makes the sandbox. Checks every file says it's fictional, every email address ends in `.example`, and exactly one email is marked confidential | edit the content in this script, then run it |
| `assets/files/m7/ai-basics-app-example/` | Finished Module 7 app for the default project (hand-written: `index.html`, `style.css`, `app.js`, `tests.html`, `README.md`, `CLAUDE.md`); also the Module 8 starter repo | edit by hand, then run `make-m7-files.js` |
| `tools/make-m7-files.js` | Copies the worked example prototype and spec (assets/files/m5/) into the example's `docs/`, runs the spec's acceptance checks against `app.js` in Node, and zips the app with `ai-basics-app/` at the root | — |
| `tools/xlsx-lite.js`, `docx-lite.js`, `zip-lite.js` | Small Excel, Word and zip writers used by the generators (no installs needed; same files every run) | — |
| `index.html`, `m1.html` … | Short page files that load the above | nothing; they're all the same apart from the module id |
| `tools/build-single.js` | Bundles everything into one HTML file | — |

There is no practice folder: every file a student needs is a download on its module's page, and students save their work in their own `ai-basics` folder (Setup A).

**Rebuilding the downloads:** after changing any generated or checked file, run all five, in order:

```
node tools/make-m2-files.js && node tools/make-m3-files.js && node tools/make-m5-files.js && node tools/make-m6-files.js && node tools/make-m7-files.js
```

## Write a module

1. Copy `content/modules/_template.js` to `content/modules/m1.js` (or whichever module).
2. Change `id: "_template"` to `id: "m1"`, and change `["_template"]` to `["m1"]` on the line above it.
3. Replace the text. Leave out any section you don't need yet; it won't show.
4. Refresh `m1.html` in the browser.

Text formatting in content files: `**bold**`, `*italic*`, `` `code` ``, `[link text](https://...)`. Prompts and examples are shown exactly as typed, line breaks included.

The page's section order is fixed by the template. A section only appears if the module has content for it. In the sidebar, the current module lists its sections, grouped:
- **Learn:** Before you start · Breakdown · Prompt frameworks (Module 1) · Examples · Demo
- **Do:** Step by step · Your exercise(s)
- **Check:** Responsible use · Stuck? · Mastery check · Go deeper

On phones, the same list is an "On this page" menu at the top of the module. "Before you start" items are checkboxes, saved in the browser like the mastery check.

## Make a single-file version

```
node tools/build-single.js
```

This writes `dist/ai-basics-lab.html`, one file with all the pages and images built in. Pages switch by `#m1`, `#m2` and so on. Links between modules are converted automatically. Videos and downloads stay as links, so the downloads only work if the `assets/files/` folder sits next to the single file. Run it again after any edit; never edit the `dist/` file by hand.

## Brand

Source: [MIT Sloan Brand Guidelines: Color, Typography, Photography](https://mitsloan.mit.edu/brand-guidelines/color-typography-photography). The full palette is listed at the top of `assets/css/site.css`.

**Colors used on the site:**

| Role | Light mode | Dark mode |
| --- | --- | --- |
| Main color (links, buttons, headings' accent) | Sloan Red `#A31F34` | lighter tint of Sloan Red |
| Body text / secondary text | Dark Gray 2 `#333D47` / Dark Gray `#545759` | tint of Light Gray / Light Gray `#C9C8C7` |
| Lines, panels | Light Gray `#C9C8C7` and its tints | Dark Gray `#545759`, Dark Gray 2 `#333D47` |
| Info boxes (navigation, "Before you start") | Navy `#041D40` | Light Blue `#6AA2B8` |
| Done / correct | Dark Green `#006B67` | tint of Dark Green |
| **The one highlight color** (tips, "in progress", draft tag) | Orange `#ED7700` | Light Orange `#F6B221` |

- The guidelines say to use one highlight color per application, so Light Blue 2 and Bright Red are not used.
- Tints and shades are needed for soft backgrounds and for dark mode, where most palette colors are too dark to read.
- Every text color meets WCAG AA contrast (4.5:1) in both modes. Orange is never used for small text, only for marks and borders.

**Fonts:** the guidelines use Futura LT Pro for headlines and Adelle for website body text. Both are licensed. The site uses the real font when the computer has it (Macs include Futura); otherwise it falls back to free look-alikes: Jost for Futura and Bitter for Adelle, then Arial. Getting web licenses from Sloan (brand.mitsloan@mit.edu) would make the brand fonts show for everyone; nothing else would need to change.
- **No logo yet.** The logo files on mitsloan.mit.edu/brand-guidelines/downloads need an MIT Touchstone login. Check with the Sloan brand office (brand.mitsloan@mit.edu) before adding one.

## Light and dark mode

A switch in the sidebar offers **Auto** (follows the device, the default), **Light** and **Dark**. The choice is saved in the student's browser. For live sessions, pick **Light** before projecting. `assets/js/theme.js` applies the saved choice before the page draws, so it doesn't flash the wrong mode first.

## Progress tracking

Checkmarks and quiz answers are saved in the student's own browser only.
