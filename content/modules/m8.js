/* ==========================================================================
   Module 8 · Save & ship (Git, GitHub, hosting) + course reflection
   Spec: AI_Basics_Lab_Revision_Plan.md, "Module 8 · Save & ship"
   Decisions (Nov 3, 2026): public repo by default, private alternative via GitHub
   Education (GitHub Pro); sign-in with the GitHub CLI (gh), installed in Setup B.
   Starter repo / catch-up: assets/files/m7/ai-basics-app-example.zip
   Status: draft, awaiting timed test run (Nov 3, 2026)
   ========================================================================== */
window.AIB_MODULES = window.AIB_MODULES || {};
window.AIB_MODULES["m8"] = {
  id: "m8",
  title: "Save & Ship",
  level: "Builds on Module 7 · Setup B done",

  goal: "Learn to save your app on GitHub and publish it.",
  outcomes: ["Save versions with Git", "Put your app on GitHub", "Go live with GitHub Pages", "Judge what it takes at work"],

  budget: { read: 6, do: 22, check: 2 },

  before: {
    needs: [
      { text: "**[Setup B](m00-course-overview.html#setup) done:** Git installed, the **GitHub CLI** (`gh`) installed, and a free GitHub account. **Check:** open the Code tab's terminal (press **Ctrl** and the **backtick** key) and type `git --version`, then `gh --version`. Both should print a version number.",
        ifNot: "Missing one? Finish Setup B, or ask Claude: *\"Explain how to install it on my computer, then do it with my approval.\"*" },
      { text: "On GitHub, **Settings → Emails**: tick **Keep my email addresses private** and **Block command line pushes that expose my email**, so your personal email never appears in the public history. Copy the noreply address shown there (it looks like `12345678+your-username@users.noreply.github.com`).",
        shot: { image: "assets/img/setup-github-emails.svg", caption: "Illustration. Your screen may look slightly different.",
                alt: "Illustration of GitHub Settings, Emails page. Two checkboxes are ticked and highlighted: Keep my email addresses private, and Block command line pushes that expose my email." } },
      { text: "Your **ai-basics-app** folder from Module 7, open in the desktop app's **Code** tab. First, ask Claude: *\"Check every file in this folder for keys, passwords or real data, and list anything you find.\"*",
        ifNot: "No working app from Module 7? Download the finished example app, unzip it, and use its ai-basics-app folder.",
        files: [{ label: "Finished example app (.zip)", url: "assets/files/m7/ai-basics-app-example.zip" }] },
      "**Your GitHub username becomes part of your live link** (`your-username.github.io/…`), so use one you'd put on a résumé."
    ],
    // public or private (same note-box format as Modules 6-7)
    note: { title: "Public or private repo?",
      text: "The repo holds your code; the live site is what people open. Pick one before Exercise A.",
      table: { head: ["", "Public repo", "Private repo"],
               rows: [["Who sees the code", "Anyone", "Only you, and people you invite"],
                      ["Who sees the live site", "Anyone with the link", "Anyone with the link"],
                      ["What you need", "A free account", "GitHub Pro: free through GitHub Education, but approval can take days"],
                      ["Use it when", "The default for this course", "You'd rather keep the code to yourself"]] } }
  },

  breakdown: {
    key: "Git is an unlimited undo button with labels. GitHub keeps those labeled versions online, and GitHub Pages turns them into a link anyone can open.",
    // Plain-language definitions, shown right under the key line (same as Modules 4-7)
    defs: [
      { term: "A repository (repo)", text: "is a folder whose history Git tracks: every saved version, and who saved it when." },
      { term: "A commit", text: "is a saved snapshot of the folder, with a short message saying what changed." },
      { term: "Push", text: "sends your commits to GitHub, so they're kept online. With GitHub Pages on, it also updates your live site." }
    ],
    // top: true puts the drawing under the key line (each module's "picture"); the tables stay after the cards
    figure: { top: true, wide: true, image: "assets/img/m8-ship-flow.svg",
      alt: "Diagram: from your folder to a live link. 1, Commit: save a version, on your computer. 2, Push: send your commits to GitHub. 3, GitHub repo: your versions, online. 4, Live link: GitHub Pages turns the repo into a site, highlighted. An arrow loops back from the live link to commit: change something, commit and push, and the site updates.",
      caption: "**From your folder to a live link.** After the first time, it's always the same loop: change, commit, push." },
    // text can be one paragraph or a list of short bullets (same style as Modules 1-7)
    concepts: [
      { title: "Commit often",
        text: ["Small steps, each with a clear message", "\"Add LTV warning\", not \"stuff\"", "Revert undoes any one of them"] },
      { title: "Push to share",
        text: ["GitHub keeps every version online", "Every push updates your live site", "Check the live link after each push"] },
      { title: "Secrets stay out",
        text: ["Never commit keys, passwords or real data", "Once pushed, the history keeps them", "Replace (rotate) a leaked key; deleting isn't enough"] },
      { title: "Static vs. dynamic",
        text: ["Your app is **static**: it runs in the visitor's browser", "Logins, stored data or AI calls make it **dynamic**", "At work: a security review, data rules, a budget and an owner"] }
    ],
    // Hosting facts checked Nov 19, 2026 (Supabase: supabase.com/pricing)
    compare: [
      { caption: "Git in plain English", head: ["Plain English", "Git term", "Ask Claude Code"], rows: [
        ["What's not saved yet", "status", "\"What have I changed since my last commit?\""],
        ["Save a version", "commit", "\"Commit these changes with a clear message.\""],
        ["Upload to GitHub", "push", "\"Push my commits to GitHub.\""],
        ["Undo a change", "revert", "\"Undo the last commit but keep the history.\""],
        ["See what changed", "log", "\"Show me the last 5 commits in plain English.\""]
      ]},
      { caption: "Where things you build can live", head: ["Option", "Good for", "Cost"], rows: [
        { group: "Static: runs in the visitor's browser" },
        ["Published artifact (Module 4)", "Single-page tools built in Claude, shared inside your organization", "Included"],
        ["GitHub Pages", "Static sites from a repo, like your app", "Free with a public repo; a private repo needs GitHub Pro"],
        ["Vercel or Netlify", "Static sites now, server features later", "Free tier"],
        { group: "Dynamic: needs a server or database" },
        ["Supabase", "Adding a database and logins to an app. It's a back end, used with a host like Vercel or Netlify", "Free tier (2 projects, paused after a week without use); Pro from $25 a month"],
        ["Company cloud (AWS, Azure, GCP)", "Dynamic apps with logins, data and AI calls", "Paid, managed with IT"]
      ]}
    ],
    // a line under the tables
    note: "Real customer or company data in any of these needs your organization's approval first."
  },

  // Four sections between Key ideas and Examples, each with its own place in the menu
  frameworks: [
    { title: "A tour of your repo on GitHub",
      intro: "Where everything is once you've pushed. After your first push in Exercise A, open your repo on GitHub and find **1**, **2** and **3**.",
      shot: { image: "assets/img/m8-repo-tour.svg", wide: true, caption: "Illustration; GitHub's page may look slightly different.",
              alt: "Illustration of a repository page on GitHub, with six numbered parts. 1, the repository name your-username / trail-club-calculator and a Public badge. 2, the commits count, 4 commits. 3, the file list, with index.html at the top level highlighted. 4, the README under the files, showing the live link. 5, the Settings tab. 6, the About box on the right, with the live site link." },
      // the numbers match the drawing
      table: { head: ["#", "Part", "What you do with it"], rows: [
        { group: "After Exercise A (your first push)" },
        ["**1**", "Name · Public or Private", "Check it's the visibility you chose"],
        ["**2**", "Commits", "Your history: click it to see every version and exactly what changed"],
        ["**3**", "`index.html`", "Must be at the top level, not inside a folder, or the live link shows a 404"],
        { group: "In Exercise B (going live)" },
        ["**4**", "README", "Shown under the files. Your live link goes at the top"],
        ["**5**", "Settings", "Settings → **Pages** is where you turn the site on (drawing below)"],
        ["**6**", "About", "Click the gear next to **About**, tick **Use your GitHub Pages website**, then **Save**"]
      ]},
      shotAfter: { image: "assets/img/m8-pages-settings.svg", caption: "**Settings → Pages.** Illustration; GitHub's page may look slightly different.",
                   alt: "Illustration of GitHub's Settings, Pages page. Under Build and deployment: 1, Source set to Deploy from a branch. 2, Branch set to main and / (root), then Save. 3, a minute or two later, a box says Your site is live at your-username.github.io/trail-club-calculator, with a Visit site button." } },

    { title: "Read a history",
      intro: "Your commits, newest first, as GitHub shows them. Click **Commits** in your repo (part 2 in the tour), then click any commit to see exactly which lines changed.",
      shot: { image: "assets/img/m8-history.svg", wide: true, caption: "Illustration; GitHub's page may look slightly different.",
              alt: "Illustration of a commit history on GitHub, in two panels. Left, the commits list, newest first: Add live link to README (9d4e7b2), Revert Change page title (7c1a0f5), Change page title (3f9c2a1), First version of Trail Club calculator (b82e604). Labels: 1, the message; 2, the short ID. Right, the commit Change page title opened: in index.html, a red line removed, title Trail Club unit economics, and a green line added, title Trail Club calculator. Label 3: red removed, green added." },
      table: { head: ["Commit (newest first)", "What it tells you", "Ask Claude Code"], rows: [
        ["`Add live link to README`", "What changed and where", "*\"What changed in the last commit?\"*"],
        ["`Revert \"Change page title\"`", "A revert: undoes the commit below it, and keeps both in the history", "*\"Undo 'Change page title' with a revert.\"*"],
        ["`Change page title`", "The change that was undone", "*\"Show me the lines this commit changed.\"*"],
        ["`First version of Trail Club calculator`", "Where the history starts", "*\"Show me the history in plain English.\"*"]
      ]},
      note: "**Each commit has a short ID** (like `3f9c2a1`). Give it to Claude to point at an exact version: *\"Revert 3f9c2a1.\"*" },

    { title: "What stays out: .gitignore",
      intro: "A `.gitignore` is a plain-text list of files and folders Git should never save. Claude writes one in Exercise A: read it before your first commit.",
      // CLAUDE.local.md: the Claude Code docs ("How Claude remembers your project") say to add it to .gitignore
      table: { head: ["Line", "What it means or keeps out", "Why"], rows: [
        { group: "How to read a line" },
        ["`#`", "Starts a comment", "A note for people; Git skips the line"],
        ["`*`", "Any name", "`*.key` means every file ending in .key"],
        ["`/` at the end", "A whole folder", "`notes-private/` means everything in it"],
        { group: "In this course's .gitignore" },
        ["`.DS_Store`, `Thumbs.db`", "System clutter from Mac and Windows", "Not part of your app"],
        ["`.env`, `*.key`, `*.pem`", "Files that hold keys and passwords", "Secrets never go in the repo"],
        ["`CLAUDE.local.md`", "Your own instructions for Claude in this folder", "Just for you; Claude Code's docs say to keep it out"],
        ["`notes-private/`, `data-real/`", "Your own notes and any real data", "Everything committed can become public"]
      ]},
      note: { label: "Check it, and know its limit", points: [
        "**Before your first commit,** ask Claude: *\"Show me my .gitignore and explain each line in one sentence. Then list the files my next commit will include.\"*",
        "**After you push,** ignored files shouldn't appear in your repo's file list (part 3 in the tour).",
        "**It only stops new files.** A file that's already committed stays in the history. If it holds a key, replace it: get a new key from the service that issued it, turn the old one off, then ask Claude to stop tracking the file."
      ]},
      reference: { title: "See a whole .gitignore", text: "# Files Git should never save in this repo\n\n# System clutter (Mac and Windows)\n.DS_Store\nThumbs.db\n\n# Secrets: keys and passwords never go in the repo\n.env\n*.key\n*.pem\n\n# Your own instructions for Claude in this folder\nCLAUDE.local.md\n\n# Your own notes and any real data\nnotes-private/\ndata-real/" } },

    { title: "Static or dynamic?",
      intro: "Your app is **static**: files that run in the visitor's browser, so GitHub Pages is enough. A quick check for work: each feature below would make it **dynamic**, and at work that means more people and more checks.",
      table: { head: ["If your tool needs…", "For example", "You'd need", "At work, talk to"], rows: [
        ["**Logins**", "Each club member sees only their own budget", "A sign-in service, such as Supabase", "IT security"],
        ["**Stored data**", "Save results so you can come back to them", "A database", "Data and privacy owners"],
        ["**AI calls**", "Summarize survey comments with Claude", "A server that keeps the API key secret, and a budget", "IT and finance"],
        ["**Payments**", "Sell tickets for a club event", "A payment provider", "Finance and legal"],
        ["**Real customer data**", "Load your employer's sales export", "Approved storage, and approval first", "The privacy office"],
        ["**None of these**", "The Trail Club calculator", "GitHub Pages is enough", "Nobody extra: ship it"]
      ]},
      note: { label: "Two things to know", points: [
        "**Never put an API key** in `index.html` or `app.js`. On a static site, anyone can open your files in their browser and read it. That's why AI calls need a server.",
        "**Free tiers, like Supabase's, are fine for practice** with made-up data. At work, use the tools IT has approved."
      ]},
      sample: {
        title: "Ask what it would take: copy the prompt",
        task: "This is Exercise B's stretch. Pick one feature, send the prompt in Claude, and bring the answer to the live session.",
        items: [
          { name: "What would it take?", prompt: "My app is static: plain HTML, CSS and JavaScript on GitHub Pages. If I wanted to add **[logins / stored data / AI calls]**, what would change, who at a company would need to approve it, and roughly what would it cost each month?" }
        ]
      } }
  ],

  // One example per key-ideas card, same format as Modules 4-7 (idea tag, coloured parts, "You get" lines, guess first)
  examplesIntro: "Read each weak version and guess what's missing. Then open **What changed?** to check.",
  examplesGuess: true,
  examples: [
    { title: "Commit messages", idea: "Commit often", labels: ["Weak message", "Strong message"], noCopy: true,
      weak: "stuff  /  final v2",
      strong: "[[What changed::Add LTV warning]] [[When::when LTV/CAC is below 3]]",
      gets: { weak: "A history nobody can read, so you can't tell which version to go back to.",
              strong: "A history where you can find, and undo, the right version." },
      why: "Say what changed, in a few words, as if finishing the sentence \"This commit will…\". Claude Code writes good messages if you ask." },
    { title: "Asking to publish", idea: "Push to share",
      weak: "put it online",
      strong: "[[Check first::Before you push, check every file for keys, passwords or real data.]] [[Push::Then commit with a clear message and push to GitHub.]] [[Confirm::Tell me when the live site has updated, and give me the link.]]",
      gets: { weak: "Whatever is in the folder goes public, checked or not.",
              strong: "A checked push, and the link to open on your phone." },
      why: "Every push updates a public site. A check before and a confirmation after make each push safe and visible." },
    { title: "A key slipped in", idea: "Secrets stay out",
      weak: "delete the file with the key",
      strong: "[[Replace first::I'll replace the key at the service first.]] [[Stop tracking::Then stop tracking config.js and add it to .gitignore.]] [[Explain::Explain why deleting the file isn't enough.]]",
      gets: { weak: "The key is gone from the folder, but still in the history, and it still works.",
              strong: "The old key is useless, and the folder won't save it again." },
      why: "Once pushed, a secret stays in the history. Replacing it at the service is what makes it safe; the rest stops it happening again." },
    { title: "Choosing a host", idea: "Static vs. dynamic",
      weak: "where should I host this?",
      strong: "[[What it is::My app is plain HTML/CSS/JS in a GitHub repo,]] [[What it doesn't need::with no server, no logins and no stored data.]] [[Ask::Recommend the simplest free host and walk me through it.]]",
      gets: { weak: "A survey of ten hosting options.",
              strong: "One answer, and the steps to follow." },
      why: "Saying what the app needs, and doesn't, tells Claude it's static, so the answer is short: GitHub Pages." }
  ],

  // {group: "..."} = an unnumbered heading row; keep its minutes in line with the exercises below
  steps: [
    { group: "Exercise A · ~10 min" },
    { title: "Sign in to GitHub once", text: "Open the Code tab's terminal (press **Ctrl** and the **backtick** key) and type `gh auth login --web`. Copy the one-time code it shows, paste it in the browser page that opens, and authorize.",
      shot: { image: "assets/img/m8-gh-signin.svg", wide: true, caption: "Illustration. Your screens may look slightly different.",
              alt: "Illustration of signing in with the GitHub CLI, in two panels. Left, the terminal: you type gh auth login --web, and it says First copy your one-time code: ABCD-1234, then Press Enter to open github.com in your browser. Label 1: copy the code. Right, the browser at github.com/login/device: Device Activation, enter the code displayed on your device, with the code typed into the boxes and a Continue button. Label 2: paste it, Continue, then Authorize." } },
    { title: "Send Exercise A's prompt", text: "In **Manual** mode. Read each Git command before you allow it, and ask what it does if you're not sure." },
    { title: "Read the .gitignore", text: "Before the first commit, check what it keeps out (see *What stays out*)." },
    { title: "Check your repo on GitHub", text: "Find parts **1**, **2** and **3** from the tour: the visibility, your commits, and `index.html` at the top level." },
    { title: "Practice a change and a revert", text: "Change something small, commit it, then undo it with a revert. Look at the history (see *Read a history*)." },
    { group: "Exercise B · ~8 min" },
    { title: "Run the safety check", text: "Send Exercise B's prompt. Part 1 checks for keys, passwords, real data and your real email." },
    { title: "Turn on Pages", text: "In your repo: **Settings → Pages** → *Deploy from a branch* → `main`, `/ (root)` → **Save** (the drawing in the tour)." },
    { title: "Open it on your phone, fix one thing, push", text: "Then check the site updates. Not yet? Wait a minute and hard-refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)." }
  ],
  // A worked first push, step by step (same widget as Modules 4-7)
  stepsDemo: {
    title: "Watch it ship: first push to live link",
    turns: [
      { who: "you", text: "I'm new to Git. Please set this folder up as a Git repository with a sensible .gitignore… create a public GitHub repository called trail-club-calculator and push to it…",
        note: "**Exercise A's prompt,** in Manual mode." },
      { who: "claude", text: "Done: git init made this folder a repository; the .gitignore keeps out system files and secrets; the first commit, \"First version of Trail Club calculator\", saved all your files.",
        note: "**One sentence per command.** Ask about any you don't follow." },
      { who: "claude", text: "Claude wants to run: gh repo create trail-club-calculator --public --source=. --push. This creates the repo on GitHub and uploads your commits.",
        note: "**A permission request.** Check the name and Public, then **Allow**." },
      { who: "you", text: "Now change the page title, commit it, then revert it, keeping the history.",
        note: "**Practice the undo** while nothing is at stake." },
      { who: "claude", text: "Committed \"Change page title\", then reverted it. The history now has both commits plus the revert, so nothing is lost.",
        note: "That's the history in *Read a history*." },
      { who: "you", text: "Check this repo for anything that shouldn't be public… then walk me through publishing it with GitHub Pages.",
        note: "**Exercise B's prompt.**" },
      { who: "claude", text: "No keys, passwords or real data found, and every commit uses your noreply email. Now open Settings → Pages and choose Deploy from a branch, then main and / (root), and click Save.",
        note: "**You click this part yourself** (step 7)." },
      { who: "claude", text: "It's live at https://your-username.github.io/trail-club-calculator/. I added the link to the top of README.md, committed and pushed.",
        note: "**Open it on your phone.** Then fix one thing and push again." }
    ]
  },
  tip: "You never have to type Git commands yourself. Say what you want (\"save this version\", \"undo that\"), and ask Claude to explain each command it runs in one sentence. In **Manual** mode, Claude asks before each Git command: read it, as in Module 7.",
  transfer: "GitHub Desktop (a free app with buttons instead of commands), VS Code and other AI coding tools use the same commit, push and revert, so this habit carries over.",

  exercises: [
    {
      title: "A · Save it on GitHub",
      where: "Claude desktop app · Code tab",
      minutes: 10,
      // intro / deliverable / stretch: a sentence, a list of bullets, or {text, points}
      intro: { text: "Put your folder under Git and on GitHub, and practice the undo.", points: [
        "Sign in once (Step by step, step 1)",
        "Choose **public**, unless your GitHub Education approval came through and you want the code private",
        "Pick a short repo name with dashes, like `trail-club-calculator`",
        "Send the prompt in **Manual** mode, and read each command before you allow it",
        "Then open your repo on GitHub and find parts **1**, **2** and **3** from the tour"
      ]},
      promptLabel: "Copy this prompt and fill in the brackets",
      prompt: "I'm new to Git. Please:\n1) [[Set up::Set this folder up as a Git repository with a sensible .gitignore, show it to me, and make a first commit.]] [[Private email::Use my GitHub noreply email for commits in this repo: [your noreply address].]]\n2) [[Sign-in check::Check that I'm signed in to GitHub (gh auth status). If I'm not, tell me what to type and wait.]]\n3) [[Create and push::Create a [public / private] GitHub repository called [name] and push to it.]]\n4) [[Practice undo::Make a practice change (change the page title), commit it, then revert it, keeping the history.]]\n[[Explain::After each step, explain the command you ran in one sentence.]]",
      help: { title: "Sign-in or push trouble?",
        text: "**The code expired?** Run `gh auth login --web` again.\n**The browser didn't open?** Go to **github.com/login/device** yourself and type the code.\n**The push was blocked over your email?** See *Stuck?* below." },
      deliverable: { text: "On GitHub:", points: [
        "A repo link",
        "At least 3 commits, including one revert",
        "Commits that use your noreply email"
      ]},
      goodLooksLike: { text: "**Your history after Exercise A** (newest first): `Revert \"Change page title\"` · `Change page title` · `First version of Trail Club calculator`\n**Your file list:** `index.html` at the top level, next to `app.js`, `style.css`, `tests.html`, `README.md`, `CLAUDE.md` and `docs/`." },
      reveal: {
        title: "Check your repo (open it after your first push)",
        text: "**The visibility is the one you chose:** Public or Private, next to the repo name.\n**At the top level:** `index.html`, not inside a folder.\n**Your email is private:** open one of your commits, add `.patch` to the end of its address, and look at the *From:* line. It should show your noreply address.\n**Nothing secret is listed:** no `.env`, key files or real data."
      }
    },
    {
      title: "B · Go live",
      where: "The same Code session, plus GitHub in your browser",
      minutes: 8,
      intro: { text: "Check it, publish it, and see it on your phone.", points: [
        "Send the prompt below",
        "When Claude says what to click, do it yourself in **Settings → Pages** (the drawing in the tour)",
        "Open the live link **on your phone**",
        "Fix one thing, push, and check that the site updates",
        "Optional: add the link to **About** (part 6 in the tour)"
      ]},
      promptLabel: "Copy this prompt",
      prompt: "1) [[Safety check::Check this repo for anything that shouldn't be public: keys, passwords, real data, personal information, and my real email in any commit.]]\n2) [[Publish::Walk me through publishing it with GitHub Pages, and tell me exactly what to click.]]\n3) [[README link::When it's live, add the live link to the top of README.md, commit and push.]]\n[[Explain::Explain each command in one sentence.]]",
      deliverable: { text: "Keep:", points: [
        "A live link that works on a phone",
        "The link at the top of your README",
        "One fix, pushed and visible on the live site"
      ]},
      stretch: "Ask what it would take to add logins, stored data or AI calls: copy the prompt in *Static or dynamic?*, and bring the answer to the live session's discussion.",
      goodLooksLike: { text: "**The top of the README:**\n**# Trail Club unit economics**\n**Live:** https://your-username.github.io/trail-club-calculator/\n\n**The history on GitHub** (newest first): `Add live link to README` · `Revert \"Change page title\"` · `Change page title` · `First version of Trail Club calculator`" },
      reveal: {
        title: "Before and after you go live (open it once your site is up)",
        text: "**The safety check found nothing:** no keys, passwords, real data or real email.\n**The site works on your phone:** nothing runs off the side.\n**It updated after your fix.** If not, wait (up to 10 minutes), then hard-refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac).\n**Private repo?** The site is still public: anyone with the link can open it."
      }
    }
  ],

  // Push protection facts from GitHub Docs, "Push protection" (checked Nov 19, 2026): on by default for users on
  // public repos; a blocked push can be bypassed by choosing a reason.
  responsibleUse: {
    title: "Public means public",
    text: "**Everything you push can be read by anyone,** and the live site is public even when the repo is private.",
    useLabel: "Push", use: ["Your app's files", "Made-up example data", "Your spec and prototype (`docs/`), if they hold nothing real"],
    neverLabel: "Never push", never: ["Keys, passwords or tokens (`.env` files)", "Real customer, company or personal data", "Your real email (use the noreply address)"],
    after: ["**Before every push, check:**",
            ["Run the safety check (Exercise B, part 1)", "Read the list of files Claude is about to commit", "Your commits use your noreply email"],
            "**GitHub's safety net:** it may block a push that contains a known kind of key (push protection is on by default for public repos). If it does, don't bypass it: remove the key and replace it.",
            "**If a key or real data is ever pushed,** deleting the file isn't enough: it stays in the history. Replace the key first (get a new one from the service, and turn the old one off), then ask for help before you do anything else."],
    tip: "Assume anything pushed to a public repo has been copied. Making it private or deleting it later doesn't undo that.",
    note: "More from GitHub Docs: [Setting your commit email address](https://docs.github.com/en/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address) · [Push protection](https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection)."
  },
  stuck: [
    { problem: "\"gh: command not found\"",
      fix: "Type `gh --version` in the terminal. No version number? The GitHub CLI isn't installed yet (it's part of Setup B; get it from cli.github.com). Or ask Claude: \"Explain how to install the GitHub CLI on my computer, then do it with my approval.\" Restart the desktop app afterwards." },
    { problem: "The sign-in code expired, or the browser didn't open",
      fix: "Run `gh auth login --web` again. If the browser doesn't open, go to **github.com/login/device** yourself, type the code, click **Continue**, then **Authorize GitHub CLI**." },
    { problem: "\"Permission denied\" or \"Authentication failed\" when pushing",
      fix: "Type `gh auth status`. Not signed in? Sign in again (step 1). Signed in? Ask Claude to run `gh auth setup-git`, which tells Git to use your GitHub CLI sign-in, then push again." },
    { problem: "The push was blocked: it \"would publish a private email address\"",
      fix: "That's your email setting doing its job. Ask Claude: \"Set my noreply email for this repo, fix the author of my commits, and push again.\"" },
    { problem: "The push was blocked: a secret was detected",
      fix: "That's GitHub's push protection: the secret never reached GitHub. Ask Claude: \"Remove the secret from my unpushed commits, add the file to .gitignore, and push again.\" Don't bypass the block, and if it's a real key, replace it anyway." },
    { problem: "\"Name already exists on this account\"",
      fix: "You already have a repo with that name. Pick another name, or ask Claude to push to the repo you already have." },
    { problem: "I chose the wrong visibility",
      fix: "In your repo: **Settings → General**, then **Change visibility** near the bottom. Going from public to private doesn't undo copies people already made, and a private repo needs GitHub Pro for Pages." },
    { problem: "The live link shows a 404",
      fix: "Wait up to 10 minutes after turning on Pages. Then check **Settings → Pages**: Source = *Deploy from a branch*, your branch, `/ (root)`. Your branch may be called `master`, not `main`: pick the one the menu shows. And `index.html` must be at the top of the repo. A private repo needs GitHub Pro (GitHub Education) for Pages." },
    { problem: "The live site still shows the old version",
      fix: "Wait a minute or two, then hard-refresh (Ctrl+Shift+R or Cmd+Shift+R). Still old? Check **Deployments** on the right of your repo, or the **Actions** tab: a red ✗ on *pages build and deployment* means that update failed, so ask Claude to read the error. If there's nothing new there, ask Claude to check your last commit was pushed." }
  ],
  // grouped like Modules 4-7; all links checked Nov 19, 2026
  resources: [
    { group: "Start here", source: "GitHub Docs", type: "Article",
      label: "About Git", url: "https://docs.github.com/en/get-started/using-git/about-git" },
    { group: "Start here", source: "GitHub Docs", type: "Tutorial",
      label: "Hello World", url: "https://docs.github.com/en/get-started/start-your-journey/hello-world" },
    { group: "Start here", source: "GitHub Skills", type: "Free course",
      label: "Introduction to GitHub (under an hour)", url: "https://github.com/skills/introduction-to-github" },
    { group: "Publishing", source: "GitHub Docs", type: "Article",
      label: "What is GitHub Pages?", url: "https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages" },
    { group: "Publishing", source: "GitHub Docs", type: "Tutorial",
      label: "Quickstart for GitHub Pages", url: "https://docs.github.com/en/pages/quickstart" },
    { group: "Publishing", source: "GitHub CLI manual", type: "Reference",
      label: "gh auth login", url: "https://cli.github.com/manual/gh_auth_login" },
    { group: "Keeping it safe", source: "GitHub Docs", type: "Guide",
      label: "Setting your commit email address", url: "https://docs.github.com/en/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address" },
    { group: "Keeping it safe", source: "GitHub Docs", type: "Guide",
      label: "Ignoring files (.gitignore)", url: "https://docs.github.com/en/get-started/git-basics/ignoring-files" },
    { group: "Keeping it safe", source: "GitHub Docs", type: "Article",
      label: "Push protection", url: "https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection" },
    { group: "Keeping it safe", source: "GitHub Docs", type: "Guide",
      label: "Removing sensitive data from a repository", url: "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository" },
    { group: "Learn more", source: "GitHub Docs", type: "Article",
      label: "About GitHub Education for students", url: "https://docs.github.com/en/education/about-github-education/github-education-for-students/about-github-education-for-students" },
    { group: "Learn more", source: "GitHub Docs", type: "Docs",
      label: "GitHub Desktop documentation", url: "https://docs.github.com/en/desktop" },
    { group: "Learn more", source: "Supabase", type: "Docs",
      label: "Supabase docs, if your app goes dynamic", url: "https://supabase.com/docs" }
  ]
};
