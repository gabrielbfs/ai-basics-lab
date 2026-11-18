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

  goal: "Save versions of your app on GitHub and publish it with a link anyone can open. Then work out what it would take to make a tool like it real at your company.",
  outcomes: ["Explain repo, commit, push and revert", "Put your app on GitHub", "Go live with GitHub Pages", "Explain static vs. dynamic, and what it means for IT and budget"],

  budget: { read: 6, do: 22, check: 2 },

  before: {
    needs: [
      "**Setup B done:** Git installed, the **GitHub CLI** (`gh`) installed, and a free GitHub account.",
      "On GitHub, **Settings → Emails**: tick **Keep my email addresses private** and **Block command line pushes that expose my email**. Copy the noreply address shown there (it looks like `12345678+your-username@users.noreply.github.com`).",
      "Your **ai-basics-app** folder from Module 7, open in the desktop app's **Code** tab.",
      "**Want the code private?** Your GitHub Education student verification must already be approved (it gives you GitHub Pro). Otherwise use a public repo; the site is public either way."
    ],
    catchUp: { text: "No working app from Module 7? Download the finished example app, unzip it, and use its ai-basics-app folder.", label: "Get the example app (.zip)", url: "assets/files/m7/ai-basics-app-example.zip" }
  },

  breakdown: {
    key: "Git is an unlimited undo button with labels. GitHub keeps those labeled versions online, and GitHub Pages turns them into a link anyone can open.",
    concepts: [
      { title: "Repository and commit",
        text: "A repository (repo) is a folder whose history Git tracks. A commit is a saved snapshot with a short message saying what changed." },
      { title: "GitHub and push",
        text: "GitHub keeps your repo online. **Push** sends your commits there. With GitHub Pages, every push also updates your live site." },
      { title: "Secrets stay out",
        text: "Never commit keys, passwords or real data. Once pushed, a secret stays in the history: it must be **replaced** (rotated), not just deleted." },
      { title: "Static vs. dynamic",
        text: "Your app is **static**: files that run in the visitor's browser. Logins, stored data or AI calls make it **dynamic**: that means a server, a security review, data rules, a budget and an owner at your company." }
    ],
    compare: [
      { caption: "Git in plain English", head: ["Plain English", "Git term", "Ask Claude Code"], rows: [
        ["Save a version", "commit", "\"Commit these changes with a clear message.\""],
        ["Upload to GitHub", "push", "\"Push my commits to GitHub.\""],
        ["Undo a change", "revert", "\"Undo the last commit but keep the history.\""],
        ["See what changed", "log", "\"Show me the last 5 commits in plain English.\""]
      ]},
      { caption: "Where things you build can live", head: ["Option", "Good for", "Cost"], rows: [
        ["Published artifact (Module 4)", "Single-page tools built in Claude, shared inside your organization", "Included"],
        ["GitHub Pages", "Static sites from a repo, like your app", "Free with a public repo; private repo needs GitHub Pro"],
        ["Vercel or Netlify", "Static sites now, server features later", "Free tier"],
        ["Company cloud (AWS, Azure, GCP)", "Dynamic apps with logins, data and AI calls", "Paid, managed with IT"]
      ]}
    ]
  },

  examples: [
    { title: "Commit messages",
      weak: "\"stuff\" / \"final v2\"",
      strong: "\"Add LTV warning\" / \"Fix payback when churn is 0\"",
      why: "Good messages make the history readable, so you can find (and undo) the right version later." },
    { title: "Choosing a host",
      weak: "where should I host this?",
      strong: "My app is plain HTML/CSS/JS in a GitHub repo, with no server, no logins and no stored data. Recommend the simplest free host and walk me through it.",
      why: "Describing what the app needs (and doesn't) gets you a specific answer instead of a survey of options." }
  ],

  steps: [
    { title: "Commit and push with Claude Code", text: "Sign in once with `gh auth login --web`, then send Exercise A's prompt." },
    { title: "Practice a change and a revert", text: "Change something small, commit it, then undo it with a revert. Look at the history on GitHub." },
    { title: "Run the safety check, then turn on Pages", text: "Send Exercise B's prompt, then click through Settings → Pages yourself." },
    { title: "Fix one thing, push, confirm the redeploy", text: "Open the live link on your phone, fix one thing, push, and check the site updates." }
  ],
  tip: "You never have to type Git commands yourself. Say what you want (\"save this version\", \"undo that\"), and ask Claude to explain each command it runs in one sentence.",
  transfer: "GitHub Desktop, VS Code and other AI coding tools use the same commit, push and revert, so this habit carries over.",

  exercises: [
    {
      title: "A · Save it on GitHub",
      where: "Claude desktop app · Code tab",
      minutes: 10,
      intro: "**Sign in once:** open the terminal pane in the Code tab (**Ctrl+`**), type `gh auth login --web`, copy the one-time code it shows, and approve it in the browser. Then send the prompt. Choose **public**, unless your GitHub Education verification is approved and you want the code private. Use a short repo name with dashes, like `trail-club-calculator`.",
      prompt: "I'm new to Git. Please:\n1) Set this folder up as a Git repository with a sensible .gitignore, and make a first commit. Use my GitHub noreply email for commits in this repo: [your noreply address].\n2) Check that I'm signed in to GitHub (gh auth status). If I'm not, tell me what to type and wait.\n3) Create a [public / private] GitHub repository called [name] and push to it.\n4) Make a practice change (change the page title), commit it, then revert it, keeping the history.\nAfter each step, explain the command you ran in one sentence.",
      deliverable: "A repo link with at least 3 commits, including one revert."
    },
    {
      title: "B · Go live",
      where: "The same Code session, plus GitHub in your browser",
      minutes: 8,
      intro: "Send the prompt. When Claude tells you what to click, do it yourself in your repo's **Settings → Pages**. Then open the live link **on your phone**, fix one thing, push, and check that the site updates.",
      promptLabel: "Copy this prompt",
      prompt: "1) Check this repo for anything that shouldn't be public: keys, passwords, real data, personal information, and my real email in any commit.\n2) Walk me through publishing it with GitHub Pages, and tell me exactly what to click.\n3) When it's live, add the live link to the top of README.md, commit and push.\nExplain each command in one sentence.",
      deliverable: "A live link that works on a phone, with the link at the top of your README.",
      stretch: "Ask Claude: \"If my tool needed to call an AI model and store customer data, what would change, who would need to approve it, and roughly what would it cost?\" Bring the answer to the live session's discussion.",
      goodLooksLike: { text: "The top of the README:\n**# Trail Club unit economics**\n**Live:** https://your-username.github.io/trail-club-calculator/\n\nThe history on GitHub (newest first): `Add live link to README` · `Revert \"Change page title\"` · `Change page title` · `First version of Trail Club calculator`" },
      reveal: {
        title: "Before and after you go live (open it once your site is up)",
        text: "**Your email is private.** Open one of your commits on GitHub, add `.patch` to the end of its address, and look at the *From:* line. It should show your noreply address.\n\n**Nothing secret is in the repo:** no keys, no passwords, no real data.\n\n**index.html is at the top level** of the repo, not inside a folder.\n\n**The site updated after your fix.** If not, wait (up to 10 minutes), then hard-refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac).\n\n**Private repo?** The site is still public. Anyone with the link can open it."
      }
    }
  ],

  responsibleUse: {
    title: "Public means public",
    rules: [
      "**The site is public,** even if the repo is private. Anyone with the link can open it, and search engines may find it.",
      "**Made-up data only,** in the app and everywhere in the repo, including docs/.",
      "**Check before you publish.** Run Exercise B's safety check every time you add files.",
      "**If a key or real data is ever pushed,** deleting the file isn't enough: it stays in the history. Replace (rotate) the key, and ask for help before you do anything else."
    ],
    note: "More: [Setting your commit email address](https://docs.github.com/en/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address) (GitHub Docs)."
  },

  stuck: [
    { problem: "\"gh: command not found\"",
      fix: "The GitHub CLI isn't installed yet (it's part of Setup B; get it from cli.github.com). Or ask Claude: \"Explain how to install the GitHub CLI on my computer, then do it with my approval.\" Restart the desktop app afterwards." },
    { problem: "The sign-in code expired, or the browser didn't open",
      fix: "Run `gh auth login --web` again. If the browser doesn't open, go to **github.com/login/device** yourself and type the code." },
    { problem: "The push was blocked: it \"would publish a private email address\"",
      fix: "That's your email setting doing its job. Ask Claude: \"Set my noreply email for this repo, fix the author of my commits, and push again.\"" },
    { problem: "The live link shows a 404",
      fix: "Wait up to 10 minutes after turning on Pages. Then check: **Settings → Pages** shows Source = Deploy from a branch, `main`, `/ (root)`; and `index.html` is at the top of the repo. A private repo needs GitHub Pro (GitHub Education) for Pages." },
    { problem: "The live site still shows the old version",
      fix: "Wait a minute or two, then hard-refresh (Ctrl+Shift+R or Cmd+Shift+R). If it's still old after 10 minutes, ask Claude to check that your last commit was pushed." }
  ],

  resources: [
    { label: "GitHub Docs: Hello World", url: "https://docs.github.com/en/get-started/start-your-journey/hello-world" },
    { label: "GitHub Docs: GitHub Pages quickstart", url: "https://docs.github.com/en/pages/quickstart" },
    { label: "GitHub Docs: Setting your commit email address", url: "https://docs.github.com/en/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address" },
    { label: "GitHub CLI manual: gh auth login", url: "https://cli.github.com/manual/gh_auth_login" },
    { label: "GitHub Docs: About GitHub Education for students", url: "https://docs.github.com/en/education/about-github-education/github-education-for-students/about-github-education-for-students" }
  ]
};
