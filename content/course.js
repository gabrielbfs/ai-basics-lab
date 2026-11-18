/* ==========================================================================
   AI Basics Lab: course settings and overview page text

   Edit the words here. Layout lives in assets/ and does not need to change.
   Text formatting you can use: **bold**, *italic*, `code`, [link text](https://...)
   ========================================================================== */
window.AIB_COURSE = {
  title: "AI Basics Lab",
  program: "MIT Sloan",
  overviewPage: "m00-course-overview.html",          // the course overview page file
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

  // Order here = order in the menu and on the overview. Each id needs a page file (page:, named mKK-name.html) and,
  // once written, a content file (content/modules/m1.js). Until then the page says "being written".
  // blurb = the few-word description on the overview card; output = what the student leaves with;
  // setup = which setup part (A or B) the module needs, shown on the card as "Setup A" / "Setup B".
  modules: [
    { id: "m1", page: "m01-briefing-claude.html", title: "Briefing Claude",                     short: "Briefing Claude",      track: "nocode", blurb: "Write clear briefs and check what Claude gives back.", output: "a 3-sentence project idea", setup: "A" },
    { id: "m2", page: "m02-research-analysis.html", title: "Research & Analysis",                 short: "Research & Analysis",  track: "nocode", blurb: "Find sources, analyze a spreadsheet, and catch the errors.", output: "an assumptions table and sample data, checked", setup: "A" },
    { id: "m3", page: "m03-asking-vs-delegating.html", title: "Asking vs. Delegating",              short: "Ask vs. Delegate",     track: "nocode", blurb: "Hand Claude a multi-step task and review the files it makes.", output: "an inputs file and a one-page brief", setup: "A" },
    { id: "m4", page: "m04-projects-artifacts.html", title: "Projects & Artifacts",                short: "Projects & Artifacts", track: "nocode", blurb: "Keep your context in one place and build a clickable prototype.", output: "a clickable prototype of your tool", setup: "A" },
    { id: "m5", page: "m05-skills.html", title: "Skills",                              short: "Skills",               track: "nocode", blurb: "Teach Claude a task once and reuse it whenever you need it.", output: "a spec-writer skill and your build spec", setup: "A" },
    { id: "m6", page: "m06-connectors-automation.html", title: "Connectors & Automation",             short: "Connectors",           track: "nocode", blurb: "Link your email, calendar or files and schedule a weekly task.", output: "one scheduled automation for your work", setup: "A" },
    { id: "m7", page: "m07-claude-code.html", title: "Claude Code",                         short: "Claude Code",          track: "build",  blurb: "Turn your prototype into a real app on your computer.", output: "a real app in a folder on your computer", setup: "B" },
    { id: "m8", page: "m08-save-ship.html", title: "Save & Ship",                         short: "Save & Ship",          track: "build",  blurb: "Put your app on GitHub and share a live link.", output: "a GitHub repo and a live link", setup: "B" }
  ],

  // Not shown on the overview yet; kept for when the elective pages are written.
  electives: [
    { id: "capstone", title: "Capstone: demo day or adoption memo" }
  ],

  overview: {
    headline: "AI Basics: *learn it by building it.*",
    lede: "Self-paced modules of about 30 minutes each. Start with your first conversation with Claude and finish with a tool of your own, live on the web. No technical background needed.",


    // One section, three boxes. when = the red line on each box.
    ways: {
      title: "Three ways to learn",
      items: [
        { label: "Learn", when: "Anytime",          title: "On your own",  text: "About 30 minutes per module, at your own pace." },
        { label: "Ask",   when: "Fri 8:00–9:00am",  title: "Office hours", text: "Bring questions about the modules or setup problems. Come with your question written down." },
        { label: "Join",  when: "Fri 9:00–10:00am", title: "Live session", text: "45 minutes of walkthrough and guided build for the weekly module, then 15 minutes of Q&A." }
      ]
    },


    // what = one bullet per step, shown as a list in the table.
    // A step can be plain text, or {text, shot} to show a screenshot under it:
    //   shot: {image: (path in assets/img), alt: (description), highlight: [{x, y, w, h, label}]}  (x, y, w, h in % of the image)
    //   shot: {todo: "what the screenshot should show"}  shows a dashed "Screenshot to add" box until the image exists
    // screensAsOf: shown under the table once real screenshots are in, e.g. "Nov 2026".
    setup: {
      title: "Setup",
      screensAsOf: "",
      parts: [
        { part: "Setup A", neededFor: "Modules 1–6", what: [
          "Sign in to Claude with your MIT Claude Enterprise account.",
          "[Install the Claude desktop app](https://claude.ai/download).",
          "Create a folder called **ai-basics**. You'll save each module's work there."
        ] },
        { part: "Setup B", neededFor: "Modules 7–8", what: [
          { text: "In the Claude desktop app, open the **Code** tab once. Claude Code is built in, so there's nothing to install.",
            shot: { image: "assets/img/setup-code-tab.svg", caption: "Illustration. Your screen may look slightly different.",
                    alt: "Illustration of the top-left corner of the Claude desktop app. Next to the back and forward arrows is a two-part switch: a chat icon and a </> icon. The </> icon is highlighted and labeled Code." } },
          "Next to your **ai-basics** folder, create a folder called **ai-basics-app**.",
          { text: "Install Git. **Mac:** accept the developer-tools prompt. **Windows:** [download Git for Windows](https://git-scm.com/downloads/win), run the installer, and click **Next** on every screen. The default choices are fine.",
            shot: { image: "assets/img/setup-mac-git.svg", caption: "Illustration. Your screen may look slightly different.",
                    alt: "Illustration of the macOS pop-up: The git command requires the command line developer tools. Would you like to install the tools now? Three buttons: Get Xcode, Not Now and Install. Install is highlighted." } },
          "Install the [GitHub CLI](https://cli.github.com/) (`gh`).",
          { text: "Create a free GitHub account. In **Settings → Emails**, turn on *Keep my email addresses private* and *Block command line pushes that expose my email*.",
            shot: { image: "assets/img/setup-github-emails.svg", caption: "Illustration. Your screen may look slightly different.",
                    alt: "Illustration of GitHub Settings, Emails page. Two checkboxes are ticked and highlighted: Keep my email addresses private, and Block command line pushes that expose my email." } },
          "**Optional,** for a private repo: verify with [GitHub Education](https://docs.github.com/en/education/about-github-education/github-education-for-students/about-github-education-for-students) using your MIT email. Apply early; approval can take days."
        ] }
      ]
    },

    how: {
      title: "How each module works",
      items: [
        // text can be one sentence or a list of short bullets
        { title: "Learn · ~5 min", text: ["Check you have what you need", "Read 4 key ideas", "Compare weak and strong examples"] },
        { title: "Do · ~23 min", text: ["Follow the steps (prompts ready to copy)", "Do Exercises A and B", "Exercise B adds to your project"] },
        { title: "Check · ~2 min", text: ["Read the rule for safe use", "Fix common problems", "Mark the module as done"] }
      ]
    }

  }
};
