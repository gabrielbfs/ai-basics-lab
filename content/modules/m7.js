/* ==========================================================================
   Module 7 · Claude Code (prototype to real app)
   Spec: AI_Basics_Lab_Revision_Plan.md, "Module 7 · Claude Code: prototype to real app"
   Example app: assets/files/m7/ai-basics-app-example/ (hand-written; docs copied, checks
   run and zip built by tools/make-m7-files.js). Also the Module 8 starter repo.
   Status: draft, awaiting timed test run (Nov 3, 2026)
   ========================================================================== */
window.AIB_MODULES = window.AIB_MODULES || {};
window.AIB_MODULES["m7"] = {
  id: "m7",
  title: "Claude Code",
  level: "No coding needed · Setup B done",

  goal: "Turn your prototype into a real app in a folder on your computer, by giving Claude Code your spec, approving its plan, and steering the build.",
  outcomes: ["Explain when Claude Code beats an artifact", "Approve a plan before code", "Run the app and change it once", "Say which file does what"],

  budget: { read: 6, do: 21, check: 3 },

  before: {
    needs: [
      "The **Code** tab opens in the Claude desktop app (Setup B). Claude Code is built in; there's nothing else to install.",
      "A new folder called **ai-basics-app**, next to your **ai-basics** folder (not inside it: Module 8 publishes this folder on GitHub).",
      "Inside it, a **docs** folder with your `spec.md` (Module 5) and `prototype.html` (Module 4), copied from your ai-basics folder."
    ],
    catchUp: { text: "Missing either file? Download the [example spec](assets/files/m5/spec-example-unit-economics.md) (save it as `spec.md`) and the [example prototype](assets/files/m5/prototype-example-unit-economics.html) (save it as `prototype.html`) into `ai-basics-app/docs/`." }
  },

  breakdown: {
    key: "You don't write code. You describe what you want, approve a plan, check that it works, and ask good questions about what was built.",
    concepts: [
      { title: "What Claude Code is, and why now",
        text: "Claude working in a folder on your computer: it creates files, runs them and fixes errors. Unlike an artifact, the result is real files you can version (Module 8), host and extend, the way engineering teams work." },
      { title: "Plan first, then permissions",
        text: "Start in **Plan** mode: Claude proposes and changes nothing. Then switch to **Manual**: Claude shows each change and asks before it edits a file or runs a command." },
      { title: "CLAUDE.md",
        text: "A file at the top of the folder that Claude reads at the start of every session, like project instructions in Module 4: your preferences, rules and what the project is." },
      { title: "Secrets never go in code files",
        text: "No API keys, passwords or real data in any file in the folder. In Module 8 the whole folder becomes public on GitHub." }
    ],
    compare: { head: ["", "Artifact (Module 4)", "Claude Code app (Module 7)"], rows: [
      ["What it is", "One interactive page in Claude", "A folder of real files on your computer"],
      ["Where it lives", "In your Claude account", "On your computer, then GitHub (Module 8)"],
      ["Version and host it?", "Share inside your organization", "Full version history, and your own public link"],
      ["Best for", "Trying an idea quickly", "A tool you'll keep improving and share widely"]
    ]}
  },

  examples: [
    { title: "A build request",
      weak: "make me a website",
      strong: "Here is my spec (@docs/spec.md) and my prototype (@docs/prototype.html). Rebuild it as a one-page web app in this folder using plain HTML, CSS and JavaScript, no outside libraries. Show me a plan and file list first, and wait for my OK.",
      why: "The spec says what done looks like, the prototype shows it, and \"plan first\" keeps the build small and understandable." },
    { title: "A permission request you don't understand",
      weak: "(click Approve and hope)",
      strong: "Before I approve: what does this command do, and why do you need it?",
      why: "You stay the decision-maker. Asking is always fine, and Claude will explain in plain English." }
  ],

  steps: [
    { title: "Open the folder in Claude Code", text: "In the desktop app: **Code** tab → environment **Local** → **Open folder…** → choose ai-basics-app." },
    { title: "Send the spec prompt in Plan mode, then approve", text: "Pick **Plan** in the row under the prompt box, send Exercise A's prompt, read the plan, then switch to **Manual** and say go." },
    { title: "Open the app and check one acceptance check", text: "Double-click index.html in the folder. Compare what you see with check 1 in your spec." },
    { title: "Ask for one change, then which file does what", text: "A fix or a small feature. Then: \"Explain which file does what, one sentence each.\"" }
  ],
  tip: "If Claude heads somewhere you didn't want, press **stop** and say what you want instead. You don't have to wait for it to finish, or start over.",
  transfer: "GitHub Copilot and Cursor work the same way: describe the outcome, approve a plan, review each change, and ask what any command does.",

  exercises: [
    {
      title: "A · Build your app",
      where: "Claude desktop app · Code tab",
      minutes: 12,
      intro: "Open **ai-basics-app** in the Code tab and choose **Plan** mode. Send the prompt and read the plan; ask about anything unclear. Then switch to **Manual**, approve, and read each change Claude asks to make.",
      promptLabel: "Copy this prompt",
      prompt: "Here is my spec (@docs/spec.md) and my prototype (@docs/prototype.html).\nRebuild it as a one-page web app in this folder using plain HTML, CSS and JavaScript, with no outside libraries: index.html, style.css and app.js.\nAdd a README.md that says what it is and how to open it, and a CLAUDE.md that records my preferences: explain changes in plain English, show a plan first, plain HTML/CSS/JS only, never put keys or real data in any file.\nShow me a plan and file list first, and wait for my OK.",
      deliverable: "A working app in ai-basics-app/ that opens by double-clicking index.html."
    },
    {
      title: "B · Check it, change it, explain it",
      where: "The same Code session",
      minutes: 6,
      intro: "Run your spec's acceptance checks by hand. Then ask for **one change** (a fix, or something small like a \"Reset to example values\" button). Finally, send the prompt below.",
      promptLabel: "Copy this prompt",
      prompt: "Explain which file does what, in one sentence each, for someone who doesn't code.",
      deliverable: "Your app, changed once, and your own one-sentence explanation of each file.",
      stretch: "Ask: \"Add a simple test for the calculation that I can run by opening a tests.html file in my browser.\" Then open it. (The example app has one.)",
      files: [
        { label: "Finished example app (.zip)", url: "assets/files/m7/ai-basics-app-example.zip" }
      ],
      goodLooksLike: { text: "A finished folder, like the example's:\n`index.html`: the page you see · `style.css`: how it looks · `app.js`: the calculations and what updates when you type · `tests.html`: the acceptance checks (stretch) · `README.md`: what it is and how to open it · `CLAUDE.md`: standing instructions · `docs/`: your spec and prototype.\n\nFrom the example's CLAUDE.md: *\"Show a plan and file list before editing, and wait for my OK.\"* · *\"Never put API keys, passwords or real company data in any file. This folder will be public on GitHub.\"*" },
      reveal: {
        title: "Run your acceptance checks (open it after you've built yours)",
        text: "**For the default project** (from the example spec):\n1. With the default inputs: gross profit **$35.28**, LTV **$1,176**, LTV/CAC **4.9**, payback **6.8** months, and no warning.\n2. With churn at 5%: LTV/CAC **2.9** in red, and the warning appears.\n3. With churn at 0: the message \"Churn must be above 0 to estimate lifetime value.\", and no \"Infinity\" or \"NaN\" anywhere.\n4. On a phone-width window, nothing runs off the side.\n\n**If a check fails,** tell Claude exactly what you saw: *\"Acceptance check 2 fails: with churn at 5% I see 3.0 and no warning.\"* That's faster than \"it doesn't work\".\n\n**Your own project?** Use the checks in your own spec the same way."
      }
    }
  ],

  responsibleUse: {
    title: "Claude Code works on your computer",
    rules: [
      "**Read each permission request.** If you don't understand a command, ask what it does and why before you approve.",
      "**Work only in the ai-basics-app folder.** Don't open your Documents or Desktop folder as a project.",
      "**No keys, passwords or real data in any file.** Everything in this folder becomes public in Module 8.",
      "**Stay in Manual mode** until you're comfortable with what Claude is doing. Auto and Accept edits are for later."
    ],
    note: "More: [Use Claude Code Desktop](https://code.claude.com/docs/en/desktop)."
  },

  stuck: [
    { problem: "No Code tab, an \"upgrade\" prompt, or a 403 error",
      fix: "Your account's seat or role doesn't include Claude Code yet; your organization's admins control this. Download the finished example app (in Exercise B) so you can still follow along, and come to office hours." },
    { problem: "\"Git is required\"",
      fix: "Update the desktop app first; recent versions only need Git for some advanced features. If it still appears, install Git now (Mac: accept the developer-tools prompt; Windows: Git for Windows). You need it for Module 8 anyway." },
    { problem: "Claude wants to run a command I don't understand",
      fix: "Ask: \"What does this command do, and why do you need it?\" Approve only when the answer makes sense. If you're unsure, decline; Claude will find another way or explain." },
    { problem: "The page is blank or something is broken",
      fix: "Open index.html directly from the folder. Then tell Claude what you see: \"The page is blank. Check app.js for errors and explain the fix before you make it.\"" },
    { problem: "Claude changed something I didn't want",
      fix: "Click the **+N −N** indicator to see every change in the diff view, then tell Claude what to undo. From Module 8 on, Git gives you a real undo button." }
  ],

  checks: [
    { text: "I can say when to use Claude Code instead of an artifact", evidence: "One sentence." },
    { text: "I approved a plan before any code was written", evidence: "It's in your session." },
    { text: "My app runs, passes an acceptance check, and I changed it once", evidence: "Demo it." },
    { text: "I can say which file does what", evidence: "Explain it to a classmate." }
  ],
  quiz: [
    { q: "Claude Code asks to run a command you don't recognize. What do you do?",
      options: [
        "Approve it: Claude knows what it's doing",
        "Ask what the command does and why it's needed, then decide",
        "Switch to Auto mode so it stops asking"
      ],
      answer: 1,
      explain: "You stay the decision-maker. Asking is always fine, and declining is too." },
    { q: "Later, your app needs an API key for a data service. Where does the key go?",
      options: [
        "In app.js: the folder is only on my laptop for now",
        "In no file in the folder: real apps keep keys in a secrets store, set up with IT",
        "In README.md, so it isn't lost"
      ],
      answer: 1,
      explain: "Keys in files get shared by accident, especially once the folder is on GitHub. If one ever leaks, it has to be replaced." },
    { q: "Which of these is a job for Claude Code rather than an artifact?",
      options: [
        "A one-off chart for tomorrow's meeting",
        "A quick explanation of a formula",
        "A tool you'll keep improving, with version history and your own public link"
      ],
      answer: 2,
      explain: "Artifacts are great for quick, one-page things. Real files in a folder are what you version, host and keep building on." }
  ],

  resources: [
    { label: "Claude Code docs: Get started with the desktop app", url: "https://code.claude.com/docs/en/desktop-quickstart" },
    { label: "Claude Code docs: Use Claude Code Desktop", url: "https://code.claude.com/docs/en/desktop" },
    { label: "Claude Help Center: Your first day in Claude Code", url: "https://support.claude.com/en/articles/14552382-your-first-day-in-claude-code" },
    { label: "Claude Code docs: Best practices", url: "https://code.claude.com/docs/en/best-practices" }
  ]
};
