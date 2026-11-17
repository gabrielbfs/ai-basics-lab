/* ==========================================================================
   AI Basics Lab: course settings and overview page text

   Edit the words here. Layout lives in assets/ and does not need to change.
   Text formatting you can use: **bold**, *italic*, `code`, [link text](https://...)
   ========================================================================== */
window.AIB_COURSE = {
  title: "AI Basics Lab",
  program: "MIT Sloan",
  status: "",                                    // optional tag, e.g. "Draft for review"; "" hides it

  schedule: {
    officeHours: "Fridays 8:00–9:00am",
    live: "Fridays 9:00–10:00am"
  },

  // Shown under every module's own Responsible use rules (Module 1 states them itself, with base: false).
  rulesBase: {
    title: "The course rules (from Module 1): what not to paste",
    rules: [
      "**In this course, use made-up or public information only.** Every exercise is designed to work that way.",
      "**Never paste high-risk information into any AI tool:** Social Security numbers, financial account or credit card numbers, health records, passwords. MIT's guidance says this applies even to MIT-licensed tools.",
      "**No one else's personal information,** and no non-public MIT information such as unpublished research, student records or hiring materials.",
      "**For work, your employer's AI policy comes first.** If you're not sure something is allowed, don't paste it. Ask your employer, or for MIT information, ai-guidance@mit.edu."
    ],
    note: "Based on [MIT IS&T guidance for the use of generative AI](https://ist.mit.edu/ai-guidance)."
  },

  tracks: {
    nocode: { label: "No code", text: "Modules 1–6. Briefing, research, delegating with Cowork, projects and artifacts, skills and connectors. Everything happens in the Claude app." },
    build:  { label: "Build & ship", text: "Modules 7–8. Claude Code, GitHub and hosting. The installs (Setup B) happen during the Module 5–6 office hours, so they don't eat module time." }
  },

  // Order here = order in the menu and on the overview. Each id needs a page (m1.html) and,
  // once written, a content file (content/modules/m1.js). Until then the page says "being written".
  // blurb = the few-word description on the overview card; output = what the student leaves with.
  modules: [
    { id: "m1", title: "Briefing Claude",                     short: "Briefing Claude",      track: "nocode", blurb: "Write clear briefs and check what Claude gives back.", output: "a 3-sentence project idea" },
    { id: "m2", title: "Research & analysis",                 short: "Research & Analysis",  track: "nocode", blurb: "Find sources, analyze a spreadsheet, and catch the errors.", output: "an assumptions table and sample data, checked" },
    { id: "m3", title: "Asking vs. delegating",              short: "Ask vs. Delegate",     track: "nocode", blurb: "Hand Claude a multi-step task and review the files it makes.", output: "an inputs file and a one-page brief" },
    { id: "m4", title: "Projects & artifacts",                short: "Projects & Artifacts", track: "nocode", blurb: "Keep your context in one place and build a clickable prototype.", output: "a clickable prototype of your tool" },
    { id: "m5", title: "Skills",                              short: "Skills",               track: "nocode", blurb: "Teach Claude a task once and reuse it whenever you need it.", output: "a spec-writer skill and your build spec" },
    { id: "m6", title: "Connectors & automation",             short: "Connectors",           track: "nocode", blurb: "Link your email, calendar or files and schedule a weekly task.", output: "one scheduled automation for your work" },
    { id: "m7", title: "Claude Code",                         short: "Claude Code",          track: "build",  blurb: "Turn your prototype into a real app on your computer.", output: "a real app in a folder on your computer" },
    { id: "m8", title: "Save & ship",                         short: "Save & Ship",          track: "build",  blurb: "Put your app on GitHub and share a live link.", output: "a GitHub repo and a live link" }
  ],

  // Not shown on the overview yet; kept for when the elective pages are written.
  electives: [
    { id: "capstone", title: "Capstone: demo day or adoption memo" }
  ],

  overview: {
    headline: "AI Basics: *learn it by building it.*",
    lede: "Eight self-paced modules of about 30 minutes each. You start with your first conversation with Claude and finish with a small tool of your own, saved on GitHub and live on the web. No technical background needed.",

    waysIn: [
      { label: "Learn", title: "On your own",  text: "About 30 minutes per module: breakdown, examples, exercises, check." },
      { label: "Join",  title: "Live session", text: "A walkthrough and guided build, then Q&A." },
      { label: "Ask",   title: "Office hours", text: "Bring questions about modules or setup problems." }
    ],

    friday: {
      title: "How a Friday works",
      blocks: [
        { time: "8:00", title: "Office hours", text: "Come with your question written down." },
        { time: "9:00", title: "Live session", text: "45 minutes of walkthrough and guided build for the weekly module, then 15 minutes of Q&A." },
        { time: "~30 min", title: "On your own", text: "Any time that week." }
      ]
    },


    setup: {
      title: "Setup, in two parts",
      text: "Setup is not module time. Part A comes before Module 1; Part B, the harder installs, comes later, when you need it.",
      parts: [
        { part: "Setup A", when: "Before Module 1 (the first office hours is a setup clinic)",
          what: "Sign in with your Claude Enterprise account · install the Claude desktop app · create a folder called **ai-basics** in Documents, where you'll save each module's work", neededFor: "Modules 1–6" },
        { part: "Setup B", when: "During the Module 5–6 office hours",
          what: "Open the **Code** tab in the Claude desktop app once (Claude Code is built in, nothing to install) and create an `ai-basics-app` folder next to your `ai-basics` folder · install Git for Module 8 (Mac: accept the developer-tools prompt; Windows: Git for Windows) · install the [GitHub CLI](https://cli.github.com/) (`gh`) · create a free GitHub account and, under Settings → Emails, turn on *Keep my email addresses private* and *Block command line pushes that expose my email* · optional: want a private repo? Verify with [GitHub Education](https://docs.github.com/en/education/about-github-education/github-education-for-students/about-github-education-for-students) using your MIT email; apply early, as approval can take days", neededFor: "Modules 7–8" }
      ]
    },

    how: {
      title: "How each module works",
      items: [
        { title: "Before you start", text: "What you need open, and what to do if you missed a module." },
        { title: "Breakdown and examples", text: "Four key ideas, and weak vs. strong examples." },
        { title: "Steps and exercise", text: "A ready-to-copy prompt, one clear deliverable, and what good looks like." },
        { title: "Responsible use and Stuck?", text: "One rule for this module's tool, and fixes for the most common problems." },
        { title: "Mastery check", text: "\"I can…\" checkmarks and three scenario questions. Time budgets differ by module." }
      ]
    }

  }
};
