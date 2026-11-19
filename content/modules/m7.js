/* ==========================================================================
   Module 7 · Claude Code (prototype to real app)
   Spec: AI_Basics_Lab_Revision_Plan.md, "Module 7 · Claude Code: prototype to real app"
   Example app: assets/files/m7/ai-basics-app-example/ (hand-written; docs copied, checks
   run and zip built by tools/make-m7-files.js). Also the Module 8 starter repo.
   Status: draft, awaiting timed test run (Nov 3, 2026)
   ========================================================================== */
window.AIB_MODULES = window.AIB_MODULES || {};

// The example app's CLAUDE.md, shown in full on the page (folded). Must match
// assets/files/m7/ai-basics-app-example/CLAUDE.md; tools/make-m7-files.js checks that.
const M7_CLAUDE_MD = "# Instructions for Claude Code in this folder\n\n## About the project\n- A one-page unit-economics calculator for the fictional Trail Club subscription. The spec is `docs/spec.md`; the original prototype is `docs/prototype.html`.\n- I'm not a developer. Explain changes in plain English, one sentence per file.\n\n## How to work\n- Show a plan and file list before editing, and wait for my OK.\n- Keep it plain HTML, CSS and JavaScript, with no outside libraries and no build step. It must open by double-clicking `index.html`.\n- Keep calculations in `calculate()` in `app.js`, separate from page code, so `tests.html` can check them.\n- After any change to the calculations, run the checks in `tests.html` and tell me the result.\n\n## Never\n- Never put API keys, passwords or real company data in any file. This folder will be public on GitHub.\n- Keep the footer line that says the figures are made up.";

// Apps you could build: small tools for MBA work, each with a one-line spec, one acceptance check and one edge case.
// csv: true = the app loads a CSV, so the starter prompt asks for a made-up example file.
// The numbers in each check are worked out by hand (and checked in tools/make-m7-files.js).
const M7_IDEAS = [
  { name: "Break-even calculator", goodFor: "Pricing, finance classes",
    spec: "Enter a price, a variable cost per unit and fixed costs; see break-even units and break-even revenue.",
    check: "Price $50, variable cost $30, fixed costs $10,000 → 500 units and $25,000 revenue.",
    edge: "Price equal to the variable cost → a clear message, not \"Infinity\"." },
  { name: "Cohort retention table", goodFor: "Marketing analytics",
    spec: "Load a CSV of customers with a signup month and active months; see a retention table by cohort.",
    check: "A cohort of 100 customers with 60 still active in month 3 shows 60% in month 3.",
    edge: "A CSV without the signup column → a message that names the missing column.", csv: true },
  { name: "Case-interview timer", goodFor: "Recruiting",
    spec: "A practice timer with four sections (clarify, structure, analysis, recommendation) that shows which one you're in.",
    check: "With sections of 2, 5, 13 and 5 minutes, the timer switches to Analysis at 7:00.",
    edge: "Pause, then resume → the time picks up where it stopped." },
  { name: "Club budget tracker", goodFor: "Clubs, events",
    spec: "Set a budget, add expenses by category, and see what's spent and what's left.",
    check: "Budget $2,000 with expenses of $450 and $300 → $1,250 left, 37.5% spent.",
    edge: "Expenses over the budget → the overspend shows in red." },
  { name: "Survey summary", goodFor: "Research projects",
    spec: "Load a survey CSV; see counts and percentages for each multiple-choice question.",
    check: "20 answers to a yes/no question with 15 Yes shows Yes 75%, No 25%.",
    edge: "Blank answers aren't counted, and the page says how many were skipped.", csv: true },
  { name: "OKR tracker", goodFor: "Team projects",
    spec: "List objectives and key results with targets, enter progress, and see the percentage done for each.",
    check: "A key result with a target of 40 interviews and 10 done shows 25%.",
    edge: "Progress past the target → shows 100% and \"Done\"." }
];
window.AIB_MODULES["m7"] = {
  id: "m7",
  title: "Claude Code",
  level: "No coding needed · Setup B done",

  goal: "Learn to build a real app from your spec with Claude Code.",
  outcomes: ["Know when to use Claude Code", "Approve a plan before code", "Run and change your app", "Know which file does what"],

  budget: { read: 6, do: 22, check: 2 },

  before: {
    needs: [
      { text: "The **Code** tab opens in the Claude desktop app ([Setup B](m00-course-overview.html#setup)). Claude Code is built in; there's nothing else to install.",
        ifNot: "No Code tab? See *Stuck?* below. You can still follow along with the finished example app (in Exercise B)." },
      "A new folder called **ai-basics-app**, next to your **ai-basics** folder (not inside it: Module 8 publishes this folder on GitHub).",
      { text: "Inside it, a **docs** folder with copies of your `spec.md` (Module 5) and `prototype.html` (Module 4).",
        ifNot: "Missing either file? Download **both** examples below and save them in `ai-basics-app/docs/` as `spec.md` and `prototype.html`. The example spec describes the example prototype (a unit-economics calculator), so their checks match.",
        files: [
          { label: "Example spec (.md)", url: "assets/files/m5/spec-example-unit-economics.md" },
          { label: "Example prototype (.html)", url: "assets/files/m5/prototype-example-unit-economics.html" }
        ] },
      { text: "**Your spec ends with acceptance checks**: inputs and an expected number or message you can test by hand. Exercise B runs them.",
        ifNot: "No checks in yours? Use the example spec's." }
    ],
    // the folder layout, drawn (same note-box format as Modules 3 and 6)
    note: { title: "Your two folders",
      text: "Keep them side by side. Everything in **ai-basics-app** becomes public in Module 8, so it only holds copies of what the app needs.",
      shot: { image: "assets/img/m7-folders.svg", caption: "Where your files go in Modules 7 and 8.",
              alt: "Diagram of two folders side by side. ai-basics, for Modules 1 to 6, stays private. Next to it, not inside it, ai-basics-app, for Modules 7 and 8, becomes public on GitHub. Inside ai-basics-app is a docs folder holding spec.md and prototype.html, copies of the files in ai-basics." } }
  },

  breakdown: {
    key: "You describe the app and approve the plan. Claude Code writes the files; you check that they work.",
    // Plain-language definitions, shown right under the key line (same as Modules 4-6)
    defs: [
      { term: "Claude Code", text: "is Claude working inside a folder on your computer. It reads and writes files, runs them and fixes errors, and asks you first." },
      { term: "CLAUDE.md", text: "is a plain-text file at the top of the folder that Claude reads at the start of every session, like a project's instructions in Module 4." },
      { term: "A diff", text: "is the list of exact changes Claude made, line by line. It shows as counts like `+12 −1`: click them to see each change." }
    ],
    // top: true puts the drawing under the key line (each module's "picture"); the tables stay after the cards
    figure: { top: true, wide: true, image: "assets/img/m7-build-loop.svg",
      alt: "Diagram: the build loop. 1, Plan, marked start here: Plan mode, Claude proposes and changes nothing. 2, Approve: switch to Manual and say go. 3, Build: Claude asks before each edit or command, and you read the diff. 4, Check: run your acceptance checks by hand. An arrow loops from Check back to Plan: one change at a time.",
      caption: "**The build loop.** Every change, from the first build to a small fix, goes through the same four steps." },
    // text can be one paragraph or a list of short bullets (same style as Modules 1-6)
    concepts: [
      { title: "Why Claude Code",
        text: ["Real files you can version, host and extend", "The way engineering teams work", "No coding needed: you describe and check"] },
      { title: "Plan first",
        text: ["**Plan** mode proposes and changes nothing", "Ask about anything unclear", "Then switch to **Manual** and say go"] },
      { title: "Read before you approve",
        text: ["Every edit shows a diff", "Ask what any command does, and why", "Press stop any time and redirect"] },
      { title: "Secrets never go in files",
        text: ["No API keys, passwords or real data", "The folder goes public in Module 8", "Your CLAUDE.md says so too"] }
    ],
    // compare: a list of tables. Mode names and behavior from the Claude Code desktop docs (checked Nov 19, 2026).
    compare: [
      { caption: "Which one?", head: ["", "Artifact (Module 4)", "Claude Code app (Module 7)"], rows: [
        ["What it is", "One interactive page in Claude", "A folder of real files on your computer"],
        ["Where it lives", "In your Claude account", "On your computer, then GitHub (Module 8)"],
        ["Version and host it?", "Share inside your organization", "Full version history, and your own public link"],
        ["Best for", "Trying an idea quickly", "A tool you'll keep improving and share widely"]
      ]},
      { caption: "The five modes (pick one in the row under the prompt box)", head: ["Mode", "What Claude does", "In this course"], rows: [
        ["**Plan**", "Reads your files and proposes a plan. Changes nothing.", "Start here"],
        ["**Manual**", "Asks before every edit or command. You see each change.", "Build here"],
        ["**Accept edits**", "Edits files without asking; still asks before other commands.", "Later, once you trust the work"],
        ["**Auto**", "Runs without routine questions; a safety check reviews riskier actions.", "Later"],
        ["**Bypass permissions**", "Runs without asking at all.", "Not for this course"]
      ]}
    ]
  },

  // A working example on the page (between Key ideas and the tool sections), like Module 4's prototype
  tryIt: {
    title: "Try the finished app",
    text: "This is what Claude Code built from the example spec: a real app made of plain files. The data is made up. Three things to try:",
    // points: a short list of things to try, under the text
    points: [
      "Set churn to **5%**: LTV/CAC drops to 2.9 in red and a warning appears",
      "Set churn to **0**: a clear message instead of \"Infinity\"",
      "[Open its tests](assets/files/m7/ai-basics-app-example/tests.html): the 10 acceptance checks run and pass"
    ],
    url: "assets/files/m7/ai-basics-app-example/index.html",
    label: "Trail Club unit economics, the finished example app",
    height: 760
  },

  // Three sections, each with its own place in the menu
  frameworks: [
    { title: "A tour of the Code tab",
      intro: "Six parts you'll use in every session. Open your own Code tab now and find **1**, **3** and **5** before Exercise A.",
      shot: { image: "assets/img/m7-code-tab.svg", wide: true, caption: "Illustration; your screen may look slightly different.",
              alt: "Illustration of the Code tab in the Claude desktop app, with six numbered parts. 1, at the top: the folder ai-basics-app, running Local. 2, the prompt box at the bottom. 3, under it, the mode selector: start in Plan, then switch to Manual. 4, in the conversation: a permission request, Claude wants to edit app.js, with Deny and Allow buttons. 5, on the right: the Changes card showing plus 12 minus 1, with app.js and index.html listed. 6, the stop button next to the prompt box." },
      // the numbers match the drawing; shortcuts and the Changes card from the Claude Code desktop docs (checked Nov 19, 2026)
      table: { head: ["#", "Part", "What you do with it"], rows: [
        ["**1**", "Folder · Local", "Check it says **ai-basics-app** before you send anything"],
        ["**2**", "Prompt box", "Send prompts. Type **@** to point at a file, like `@docs/spec.md`"],
        ["**3**", "Mode selector", "**Plan** to start, **Manual** to build. Shortcut: Cmd/Ctrl + Shift + M"],
        ["**4**", "Permission request", "Read what it will change and which file. Not sure? Ask \"What does this do?\" before you Allow"],
        ["**5**", "Changes `+12 −1`", "Click to see the diff, file by file. Shortcut: Cmd/Ctrl + Shift + D"],
        ["**6**", "Stop", "Interrupt and redirect, without starting over"]
      ]} },

    { title: "Inside the folder",
      intro: "What Claude Code builds: a handful of plain files, each with one job. Knowing which file does what tells you what to ask for. Each example request says what you saw, what you expected, and which file. [Download the whole example folder (.zip)](assets/files/m7/ai-basics-app-example.zip) to open the real files.",
      table: { head: ["File", "What it does", "Who reads it", "Ask Claude, for example"], rows: [
        { group: "What people see" },
        ["`index.html`", "The page: inputs, results and labels", "Your users", "*\"Add a Reset to example values button.\"*"],
        ["`style.css`", "Colors, spacing, and how it fits a phone", "The browser", "*\"On a phone, the results run off the side. Stack them in one column.\"*"],
        { group: "What makes it work" },
        ["`app.js`", "The calculations, and what updates when you type", "The browser", "*\"With churn at 5%, LTV/CAC shows 3.0; the spec says 2.9. Fix it in app.js and rerun tests.html.\"*"],
        ["`tests.html`", "Runs your spec's acceptance checks", "You", "*\"Add a check: with CAC at 0, a clear message appears.\"*"],
        { group: "For people, and for Claude" },
        ["`README.md`", "What the app is and how to open it", "Other people (Module 8)", "*\"Rewrite the README for someone who has never seen the app.\"*"],
        ["`CLAUDE.md`", "Standing instructions for this folder", "Claude, every session", "*\"Add a rule to CLAUDE.md: always show a plan first.\"*"],
        ["`AGENTS.md` (optional)", "The same kind of instructions, in a format many AI coding tools read", "Claude Code and other coding agents", "*\"Move my instructions to AGENTS.md and import it from CLAUDE.md.\"*"],
        ["`docs/`", "Your spec and prototype, the inputs for the build", "Claude and you", "*\"I changed the spec. Update the app to match.\"*"]
      ]},
      // AGENTS.md facts from the Claude Code docs, "How Claude remembers your project" (checked Nov 19, 2026)
      note: { label: "CLAUDE.md or AGENTS.md?", points: [
        "**AGENTS.md** is an open format for instructions to AI coding agents, a README for agents. Many coding tools read it, so one file can serve all of them.",
        "**Claude Code reads AGENTS.md too,** when the folder has no CLAUDE.md. If both are there, it reads only CLAUDE.md by default.",
        "**One file for every tool:** keep your instructions in AGENTS.md, and put a CLAUDE.md next to it with one line: `@AGENTS.md`. Claude Code then reads AGENTS.md through it.",
        "**In this course,** CLAUDE.md is enough: Exercise A asks Claude to write one. Switch to AGENTS.md when your team also uses other coding tools."
      ]},
      reference: { title: "See a whole CLAUDE.md: the example app's", intro: "Three parts: what the project is, how to work, and what never to do. You'll write yours in Exercise A.", text: M7_CLAUDE_MD,
        url: "assets/files/m7/ai-basics-app-example/CLAUDE.md", label: "Download CLAUDE.md" } },

    { title: "Apps you could build",
      intro: "Once your first app works, the same steps build other small tools, about 20 minutes each. Each idea has a one-line spec and two acceptance checks you can test by hand: a normal case and an edge case. Use made-up data only.",
      cards: M7_IDEAS.map(a => ({ name: a.name, goodFor: a.goodFor,
        parts: [["One-line spec", a.spec], ["Acceptance check", a.check], ["Edge case", a.edge]] })),
      sample: {
        title: "Start one: spec first, then build",
        task: "Optional, after the course. **1. In a chat:** copy a prompt below and send it. Your Module 5 skill should write the spec (ask \"Which skills did you use?\"). **2. In the Code tab:** make a new folder with the spec in `docs/`, choose **Plan** mode, and send: *\"Here is my spec (@docs/spec.md). Build it as a one-page web app in this folder using plain HTML, CSS and JavaScript, with no outside libraries. Add a README.md and a CLAUDE.md. Show me a plan and file list first, and wait for my OK.\"*",
        items: M7_IDEAS.map(a => ({ name: a.name,
          prompt: "Write a build spec for this tool and save it as spec.md.\nWhat it does: **" + a.spec + "**\nAcceptance checks:\n1. " + a.check + "\n2. " + a.edge +
            (a.csv ? "\nInclude a made-up example-data.csv to test it with." : "") + "\nThe page should say the data is made up." }))
      } }
  ],

  // One example per key-ideas card, same format as Modules 4-6 (idea tag, coloured parts, "You get" lines, guess first)
  examplesIntro: "Read each weak version and guess what's missing. Then open **What changed?** to check.",
  examplesGuess: true,
  examples: [
    { title: "A build request", idea: "Why Claude Code",
      weak: "make me a website",
      strong: "[[Inputs::Here is my spec (@docs/spec.md) and my prototype (@docs/prototype.html).]] [[Output::Rebuild it as a one-page web app in this folder]] [[Constraints::using plain HTML, CSS and JavaScript, no outside libraries.]] [[Plan first::Show me a plan and file list first, and wait for my OK.]]",
      gets: { weak: "A guess at a website, built before you've seen a plan.",
              strong: "A plan you can check against your spec, then real files." },
      why: "The spec says what done looks like, the prototype shows it, and \"plan first\" keeps the build small and understandable." },
    { title: "Reviewing the plan", idea: "Plan first",
      weak: "Looks good, go.",
      strong: "[[Check::Which file does the calculations, and where do the acceptance checks come from?]] [[Narrow::Leave out the chart for now; just the four results.]] [[Go::Then go.]]",
      gets: { weak: "Everything in the plan, including what you didn't want.",
              strong: "A smaller build you understand before it starts." },
      why: "The plan is the cheapest place to change your mind. Ask about anything unclear and cut what you don't need yet, then switch to Manual." },
    { title: "A permission request you don't understand", idea: "Read before you approve",
      weak: "(click Allow and hope)",
      strong: "[[What::Before I approve: what does this command do,]] [[Why::and why do you need it?]] [[Limit::Only change files in this folder.]]",
      gets: { weak: "A change you can't explain.",
              strong: "A decision you made, in plain English." },
      why: "You stay the decision-maker. Asking is always fine, Claude will explain, and you can still say no." },
    { title: "Real data and secrets", idea: "Secrets never go in files",
      weak: "Connect it to our sales data. The password is …",
      strong: "[[Example data::Use the example numbers in docs/spec.md, not real data.]] [[No secrets::Don't put keys or passwords in any file.]] [[Check::Before you finish, check every file for anything that looks like a key or real customer data.]]",
      gets: { weak: "A password in a file that goes public on GitHub in Module 8.",
              strong: "A folder that's safe to publish." },
      why: "Everything in this folder becomes public in Module 8. Made-up data and no secrets keep it safe, and a final check catches anything that slipped in." }
  ],

  // {group: "..."} = an unnumbered heading row; keep its minutes in line with the exercises below.
  // Wording follows the Claude Code desktop quickstart (checked Nov 19, 2026).
  steps: [
    { group: "Exercise A · ~12 min" },
    { title: "Open the folder", text: "In the Code tab, use the row under the prompt box: set the environment to **Local**, then click the folder control → **Open folder…** → **ai-basics-app**. (Part 1 in the tour.)",
      shot: { image: "assets/img/m7-open-folder.svg", caption: "Illustration. Your screen may look slightly different.",
              alt: "Illustration of the row under the prompt box in the Code tab. 1, the first control, the environment selector, set to Local. 2, next to it, the folder control is open, with Open folder… highlighted; choose ai-basics-app. Further right are the mode and model controls." } },
    { title: "Pick Plan and send the prompt", text: "Choose **Plan** in the mode selector (part 3 in the tour), then send Exercise A's prompt. Claude reads your spec and prototype and changes nothing." },
    { title: "Read the plan", text: "Ask about anything unclear, and cut what you don't need yet (Example 2: *\"Leave out the chart for now.\"*)." },
    { title: "Switch to Manual and say go", text: "Read each change before you **Allow** it. Don't understand a command? Ask what it does and why." },
    { title: "Open the app", text: "Double-click `index.html` in the ai-basics-app folder. It opens in your browser." },
    { group: "Exercise B · ~6 min" },
    { title: "Run every acceptance check", text: "By hand, all of them, not just the first. If one fails, say exactly what you saw: *\"Check 2 fails: with churn at 5% I see 3.0.\"*" },
    { title: "Ask for one change, then read the diff", text: "A fix or a small feature. Then click the `+N −N` count and read each change." },
    { title: "Ask which file does what", text: "Send Exercise B's prompt, then write your own one sentence per file." }
  ],
  // A worked build, step by step (same widget as Modules 4-6)
  stepsDemo: {
    title: "Watch a build: plan, approve, check",
    turns: [
      { who: "you", text: "Here is my spec (@docs/spec.md) and my prototype (@docs/prototype.html). Rebuild it as a one-page web app… Show me a plan and file list first, and wait for my OK.",
        note: "**Plan mode.** Claude reads and proposes; it changes nothing yet." },
      { who: "claude", text: "Plan: index.html (the page), style.css (the layout), app.js (the calculations), tests.html (your acceptance checks), README.md and CLAUDE.md. I'd also add a chart of LTV over time.",
        note: "**Read the plan.** Is anything there you didn't ask for?" },
      { who: "you", text: "Leave out the chart for now; just the four results. Then go.",
        note: "**Narrow it,** then switch the mode to **Manual**." },
      { who: "claude", text: "Claude wants to create app.js (+58 lines): the calculate() function and the code that updates the results as you type.",
        note: "**A permission request.** Read what and where, then **Allow**." },
      { who: "you", text: "Check 2 fails: with churn at 5% I see 3.0, and the spec says 2.9.",
        note: "**Run your checks.** Say exactly what you saw and what the spec says." },
      { who: "claude", text: "The spec says LTV/CAC is rounded down to one decimal, and I rounded to the nearest. 2.95 should show as 2.9. I'll change that in app.js and rerun tests.html.",
        note: "**Claude explains before it fixes.** Allow the change." },
      { who: "claude", text: "Done. tests.html: all 10 checks pass, including churn at 5% showing 2.9 in red with the warning.",
        note: "**Check it yourself** in the app, not just in the tests." },
      { who: "you", text: "Explain which file does what, in one sentence each, for someone who doesn't code.",
        note: "That's Exercise B's last step. Then write your own sentence per file." }
    ]
  },
  tip: "If Claude heads somewhere you didn't want, press **stop** and say what you want instead. Or type a correction and press **Enter** while it works: it steers without stopping. Either way, you don't have to start over.",
  transfer: "GitHub Copilot and Cursor work the same way: describe the outcome, approve a plan, review each change, and ask what any command does. Many of them also read **AGENTS.md** (see *Inside the folder*).",

  exercises: [
    {
      title: "A · Build your app",
      where: "Claude desktop app · Code tab",
      minutes: 12,
      // intro / deliverable / stretch: a sentence, a list of bullets, or {text, points}
      intro: { text: "Plan first, then build, reading each change.", points: [
        "Open **ai-basics-app** in the Code tab (environment **Local**)",
        "Choose **Plan** and send the prompt below",
        "Read the plan: ask about anything unclear, and cut what you don't need yet",
        "Switch to **Manual** and say go. Read each change before you **Allow** it",
        "Double-click `index.html` to open your app"
      ]},
      promptLabel: "Copy this prompt",
      // parts match the build request in Examples; Tests matches tests.html in "Inside the folder"
      prompt: "[[Inputs::Here is my spec (@docs/spec.md) and my prototype (@docs/prototype.html).]]\n[[Output::Rebuild it as a one-page web app in this folder]] [[Files::using plain HTML, CSS and JavaScript, with no outside libraries: index.html, style.css and app.js.]]\n[[Tests::Add a tests.html that runs the acceptance checks in docs/spec.md when I open it in my browser.]]\n[[README::Add a README.md that says what it is and how to open it,]] [[CLAUDE.md::and a CLAUDE.md that records my preferences: explain changes in plain English, show a plan first, plain HTML/CSS/JS only, never put keys or real data in any file.]]\n[[Plan first::Show me a plan and file list first, and wait for my OK.]]",
      help: { title: "Stuck, or no Code tab?",
        text: "Download the finished example app (in Downloads, above the prompt), unzip it, and follow along: open `index.html`, then `tests.html`, then read `CLAUDE.md`. No Code tab? See *Stuck?* below and bring it to office hours." },
      files: [
        { label: "Finished example app (.zip)", url: "assets/files/m7/ai-basics-app-example.zip" }
      ],
      deliverable: { text: "In your **ai-basics-app** folder:", points: [
        "An app that opens by double-clicking `index.html`",
        "`tests.html`, `README.md` and `CLAUDE.md` next to it",
        "Every change read before you allowed it"
      ]},
      goodLooksLike: { text: "**A folder like the example's:** `index.html` · `style.css` · `app.js` · `tests.html` · `README.md` · `CLAUDE.md` · `docs/` (what each one does: *Inside the folder*).\n\n**From the example's CLAUDE.md:** *\"Show a plan and file list before editing, and wait for my OK.\"* · *\"Never put API keys, passwords or real company data in any file. This folder will be public on GitHub.\"*" }
    },
    {
      title: "B · Check it, change it, explain it",
      where: "The same Code session",
      minutes: 6,
      intro: { text: "Check it against your spec, change one thing, and make sure you can explain it.", points: [
        "Run **every** acceptance check by hand, and open `tests.html`",
        "If a check fails, tell Claude exactly what you saw",
        "Ask for **one change**: a \"Reset to example values\" button, a phone fix, or a \"Copy results\" button",
        "Click the `+N −N` count and read the diff",
        "Send the prompt below, then write your own sentence for each file"
      ]},
      promptLabel: "Copy this prompt",
      prompt: "Explain which file does what, in one sentence each, for someone who doesn't code.",
      deliverable: { text: "Keep:", points: [
        "Which acceptance checks passed (and what you fixed)",
        "Your one change",
        "Your own one-sentence explanation of each file"
      ]},
      stretch: "Ask: *\"Move my instructions to AGENTS.md, and make CLAUDE.md import it with @AGENTS.md.\"* Then start a new session and ask *\"What are your instructions for this folder?\"* to check Claude still follows them.",
      goodLooksLike: { text: "**One sentence per file, for the example app:**\n`index.html` is the page you see, with the four inputs and four results.\n`style.css` decides how it looks, and stacks it on a phone.\n`app.js` does the math every time you type, and shows a message instead of a broken number.\n`tests.html` checks the numbers against my spec; I open it to see them pass.\n`README.md` tells someone else what the app is and how to open it.\n`CLAUDE.md` reminds Claude how I like to work, every session." },
      reveal: {
        title: "Run your acceptance checks (open it after you've built yours)",
        text: "**For the default project** (from the example spec):\n**Defaults:** gross profit **$35.28**, LTV **$1,176**, LTV/CAC **4.9**, payback **6.8** months, and no warning.\n**Churn at 5%:** LTV/CAC **2.9** in red, and the warning appears.\n**Churn at 0:** the message \"Churn must be above 0 to estimate lifetime value.\", and no \"Infinity\" or \"NaN\" anywhere.\n**Phone width:** nothing runs off the side.\n\n**If a check fails,** tell Claude exactly what you saw: *\"Acceptance check 2 fails: with churn at 5% I see 3.0 and no warning.\"* That's faster than \"it doesn't work\".\n\n**Your own project?** Use the checks in your own spec the same way."
      }
    }
  ],

  // Facts from the Claude Code security docs (checked Nov 19, 2026): the folder boundary, allow once vs. from then on,
  // web commands always ask.
  responsibleUse: {
    title: "Claude Code works on your computer",
    text: "**Claude Code acts on your computer, with your account's access.** Open only the folder you're building in, and read before you allow.",
    useLabel: "Open as a project", use: ["Your **ai-basics-app** folder", "A new, empty folder for each new app"],
    neverLabel: "Never open", never: ["Your home, Documents or Desktop folder", "A folder with real client, company or personal data", "A folder with passwords or keys in it"],
    after: ["**Before you allow a command, check:**",
            ["What it does, in plain English (ask if you're not sure)", "Which files it touches, and that they're in your folder", "Whether it reaches the internet (commands that fetch from the web always ask first)"],
            "**Why commands matter:** in Manual mode, Claude asks before its file tools read or write outside your folder, but a command you approve can reach anywhere your account can.",
            "**Allow once, not always,** while you're learning. And stay in **Plan** and **Manual** for this course: Accept edits, Auto and Bypass permissions skip some or all of these questions (see *The five modes*)."],
    shot: { image: "assets/img/m7-command-request.svg", caption: "Illustration. The real request may look different. Read the command before you click.",
            alt: "Illustration of a command permission request in the Code tab. Claude wants to run a command: python3 -m http.server 8000, to preview the app in your browser. Buttons: Deny, Always allow, Allow once. Labels: 1, the command. 2, not sure? Ask what it does. 3, allow once while you're learning." },
    tip: "Before Module 8, ask Claude: *\"Check every file in this folder for keys, passwords or real data, and list anything you find.\"*",
    note: "More from Anthropic: [Use Claude Code Desktop](https://code.claude.com/docs/en/desktop) · [Claude Code security](https://code.claude.com/docs/en/security)."
  },

  // Fixes from the Claude Code desktop docs, Troubleshooting (checked Nov 19, 2026)
  stuck: [
    { problem: "No Code tab, or an \"upgrade\" prompt",
      fix: "Claude Code needs a paid plan (Pro, Max, Team or Enterprise), and on Enterprise your admins decide who gets it. For now, download the finished example app (in Exercise A) and follow along, and come to office hours." },
    { problem: "\"Error 403: Forbidden\" in the Code tab",
      fix: "Sign out and back in from the app menu: that's the most common fix. Still there? Quit the app completely (not just the window), reopen it and sign in again." },
    { problem: "My controls are above the prompt box, not under it",
      fix: "You have the earlier layout. Update the app: **Claude → Check for Updates…** on a Mac, **Help → Check for Updates…** on Windows. Then start a new session." },
    { problem: "\"Git is required\"",
      fix: "Git is only needed for sessions that run in their own worktree, and older Windows versions asked for it anyway. Update the app first. Still there? Install Git (Mac: accept the developer-tools prompt; Windows: Git for Windows). You need it for Module 8 anyway." },
    { problem: "\"Failed to load session\"",
      fix: "The folder was probably moved or renamed. Choose it again: folder control → **Open folder…** → **ai-basics-app**." },
    { problem: "Claude wants to run a command I don't understand",
      fix: "Ask: \"What does this command do, and why do you need it?\" Approve only when the answer makes sense, and **allow once**, not always. If you're unsure, deny it; Claude will find another way or explain." },
    { problem: "The page is blank or something is broken",
      fix: "Open `index.html` and `tests.html` directly from the folder. Then tell Claude what you see: *\"The page is blank, and check 1 fails in tests.html. Check app.js for errors and explain the fix before you make it.\"*" },
    { problem: "Claude changed something I didn't want",
      fix: "Click the `+N −N` count to see every change. Hover a line in the diff, click **+** and write what to change; Claude reads your comments and revises. Or ask: *\"Undo your last change to app.js.\"* From Module 8 on, Git gives you a real undo button." },
    { problem: "Claude ignores my CLAUDE.md",
      fix: "Check it's at the top of **ai-basics-app** (not inside `docs/`) and named exactly `CLAUDE.md`, then start a new session. If the folder also has an AGENTS.md, Claude reads only CLAUDE.md by default." }
  ],
  // grouped like Modules 4-6; all links checked Nov 19, 2026
  resources: [
    { group: "Start here", source: "Claude Code docs", type: "Guide",
      label: "Get started with the desktop app", url: "https://code.claude.com/docs/en/desktop-quickstart" },
    { group: "Start here", source: "Claude Help Center", type: "Help article",
      label: "Your first day in Claude Code", url: "https://support.claude.com/en/articles/14552382-your-first-day-in-claude-code" },
    { group: "Claude Code how-to", source: "Claude Code docs", type: "Reference",
      label: "Use Claude Code Desktop", url: "https://code.claude.com/docs/en/desktop" },
    { group: "Claude Code how-to", source: "Claude Code docs", type: "Guide",
      label: "Choose a permission mode", url: "https://code.claude.com/docs/en/permission-modes" },
    { group: "Claude Code how-to", source: "Claude Code docs", type: "Guide",
      label: "How Claude remembers your project: CLAUDE.md and AGENTS.md", url: "https://code.claude.com/docs/en/memory" },
    { group: "Claude Code how-to", source: "Claude Code docs", type: "Guide",
      label: "Security", url: "https://code.claude.com/docs/en/security" },
    { group: "Learn more", source: "Claude Code docs", type: "Guide",
      label: "Best practices for Claude Code", url: "https://code.claude.com/docs/en/best-practices" },
    { group: "Learn more", source: "Claude Code docs", type: "Tutorials",
      label: "Common workflows", url: "https://code.claude.com/docs/en/common-workflows" },
    { group: "Learn more", source: "Anthropic Academy", type: "Course",
      label: "Claude Code in Action", url: "https://anthropic.skilljar.com/claude-code-in-action" },
    { group: "Learn more", source: "agents.md", type: "Open format",
      label: "AGENTS.md", url: "https://agents.md" }
  ]
};
