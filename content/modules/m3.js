/* ==========================================================================
   Module 3 · Asking vs. delegating
   Spec: AI_Basics_Lab_Revision_Plan.md, "Module 3 · Chat vs. Cowork", reframed because
   Claude merged Chat and Cowork into one conversation (Help Center, Nov 2026).
   Downloads: assets/files/m3/ (two fictional articles), made by tools/make-m3-files.js.
   Status: revised Nov 4, 2026 (no practice folder; Exercise A on the articles,
   Exercise B on the student's own project)
   ========================================================================== */
window.AIB_MODULES = window.AIB_MODULES || {};
window.AIB_MODULES["m3"] = {
  id: "m3",
  title: "Asking vs. Delegating",
  level: "Needs the Claude desktop app (Setup A)",

  goal: "Learn when to ask Claude and when to delegate a multi-step task.",
  outcomes: ["Tell asking from delegating", "Delegate with a clear outcome", "Review the plan first", "Check files against sources"],

  budget: { read: 5, do: 23, check: 2 },

  before: {
    needs: [
      "The **Claude desktop app**, installed and signed in (Setup A). You need it for Exercise B: only the desktop app can work in your folders.",
      { text: "Your **ai-basics** folder, with **assumptions** and **sample-data** from Module 2.",
        ifNot: "Missing them? Do [Module 2, Exercise B](m02-research-analysis.html#s-exercise) first (~13 min)." },
      { text: "The two practice articles, downloaded: short, made-up opinion pieces on renting vs. buying a home. You attach them in Exercise A.",
        files: [
          { label: "Article 1: Buy (.docx)", url: "assets/files/m3/article-buy.docx" },
          { label: "Article 2: Rent (.docx)", url: "assets/files/m3/article-rent.docx" }
        ] }
    ],
    note: { title: "Claude has changed: Chat and Cowork are merging.",
      text: "Claude now decides whether to answer you or to work on your files. The change is rolling out in stages (on Enterprise accounts, your admins switch it on), so check which version you have:",
      table: { head: ["Your message box shows…", "Exercise A", "Exercise B"],
               rows: [["**Chat** and **Cowork**", "Chat", "Cowork"],
                      ["Neither", "A normal conversation", "A normal conversation, with your folder shared"]] },
      shot: { image: "assets/img/m3-chat-cowork.svg", caption: "Illustration. Your screen may look slightly different.",
              alt: "Illustration of two versions of the Claude message box. Left, older version: a Chat and Cowork switch under the box; use Chat for Exercise A and Cowork for Exercise B. Right, newer version: one box with no switch; use it for both exercises." } }
  },

  breakdown: {
    key: "Same Claude, two jobs: ask for an answer, or delegate a finished result. Your prompt decides which.",
    // text can be one paragraph or a list of short bullets (same style as Modules 1 and 2)
    concepts: [
      { title: "Ask to think",
        text: ["Brainstorm, explain, draft", "The answer stays in the chat", "You take it from there"] },
      { title: "Delegate the outcome",
        text: ["Say what done looks like", "Which files, what's in them, where to save them", "Claude plans the steps and does them"] },
      { title: "Share one narrow folder",
        text: ["Claude reads everything you share", "✓ Your **ai-basics** folder", "✗ Never all of Documents"] },
      { title: "Approve before it runs",
        text: ["Ask for the plan first", "Enterprise asks before each action (**Manual** mode)", "Then open the files and check them"] }
    ],
    compareTop: true,              // the Ask vs. Delegate table sits under the key line, as this module's "picture"
    compare: { head: ["", "Ask", "Delegate"], rows: [
      ["Use it when", "You want to think, learn or draft", "The work has several steps and ends in files"],
      ["You start with", "A question: \"Explain…\", \"Compare…\", \"Draft…\"", "An outcome: \"Create [file] in [folder]… Show me your plan first.\""],
      ["Claude uses", "What you type or attach", "A folder you share (desktop app)"],
      ["You get", "An answer in the chat", "Files saved where you said"],
      ["You check", "The reasoning", "The plan first, then the files"]
    ]}
  },

  // Student tools, same card format as Modules 1 and 2: management frameworks for delegating, applied to Claude.
  frameworks: {
    title: "Delegation frameworks",
    intro: "Delegating to Claude works a lot like delegating to a person, and management already has tools for it. None is required. Pick the ones you'll remember.",
    cards: [
      { name: "Commander's Intent", goodFor: "Handing off a multi-step task",
        parts: [["Purpose", "why the task matters"], ["Key tasks", "what must happen"], ["End state", "what done looks like"]] },
      { name: "Definition of Done", goodFor: "Saying when the work is finished",
        parts: [["Files", "names and formats"], ["Contents", "what each file must include"], ["Location", "where to save them"], ["Checks", "what you'll verify"]] },
      { name: "Levels of delegation", goodFor: "Choosing how much Claude decides alone",
        parts: [["Tell", "you give the steps; Claude follows them"], ["Consult", "Claude suggests options; you choose"],
                ["Agree", "Claude plans; you approve the plan before it runs"], ["Delegate", "Claude decides and acts; you check the result"]] },
      { name: "RACI (short)", goodFor: "Remembering you stay accountable",
        parts: [["Responsible", "Claude: does the work"], ["Accountable", "you: the result is yours"],
                ["Consulted", "the files and sources you point to"], ["Informed", "whoever gets the result"]] }
    ],
    sample: {
      title: "See one task in each framework",
      task: "**Exercise B's task** · Turn your Module 2 **assumptions** and **sample-data** files into `inputs.xlsx` and a one-page `brief.docx` in your ai-basics folder.",
      tryIt: "Each prompt hands off the same task with one framework, and each asks for the plan first. Copy one into Claude, with your ai-basics folder shared, and compare the plans you get.",
      items: [
        { name: "Commander's Intent",
          prompt: "**Purpose:** I'm building [your tool] and need its inputs in one place, plus a brief for someone who will help me build it.\n**Key tasks:** Read my Module 2 assumptions and sample-data files in this folder. Create inputs.xlsx and brief.docx.\n**End state:** Two files in this folder that someone new could use without asking me questions.\nShow me your plan first and wait for my OK." },
        { name: "Definition of Done",
          prompt: "Use my Module 2 assumptions and sample-data files in this folder. You're done when:\n**Files:** inputs.xlsx and brief.docx are in this folder.\n**Contents:** inputs.xlsx has one row per input (name, default_value, low, high, unit, source); brief.docx is one page.\n**Checks:** every default matches typical_value, and my estimates are still marked as estimates.\nShow me your plan first and wait for my OK." },
        { name: "Levels of delegation",
          prompt: "**Level: Agree.** Plan how to turn my Module 2 assumptions and sample-data files into inputs.xlsx and a one-page brief.docx in this folder. Show me the plan and the file list, then wait for my OK before you create anything. If you need to make a judgment call along the way, stop and ask me." },
        { name: "RACI (short)",
          prompt: "**Responsible:** you create inputs.xlsx and a one-page brief.docx from my Module 2 files in this folder.\n**Accountable:** I am, so flag anything you weren't sure about.\n**Consulted:** only those two files; don't use other sources.\n**Informed:** give me a 3-line summary of what you made.\nShow me your plan first and wait for my OK." }
      ]
    }
  },

  // Same format as Modules 1 and 2: one example per key idea, in the same order.
  // labels renames the two sides (example 1 is Ask vs. Delegate, not weak vs. strong).
  // [[Tag::words]] colors those words in the right-hand prompt and shows a matching tag.
  examplesIntro: "Read each weak prompt and guess what's missing. Then open **What changed?** to check. The first pair is different: neither side is wrong.",
  examplesGuess: true,
  examples: [
    { title: "Same goal, two ways", idea: "Ask to think", labels: ["Ask", "Delegate"],
      weak: "Summarize the two articles I attached into a short brief.",
      strong: "[[Sources::Read the two articles in this folder.]] [[File::Create brief.docx:]] [[Contents::one page with each article's argument, where they disagree, and 2 open questions.]] [[Plan first::Show me your plan first.]]",
      gets: { weak: "Text in the chat to think with and edit yourself.",
              strong: "A finished one-page file in your folder." },
      why: "Neither is wrong. Asking gives you text to work with; delegating gives you a finished file built from the sources." },
    { title: "Delegating well", idea: "Delegate the outcome",
      weak: "make me a brief from these",
      strong: "[[Sources::Use the two articles in this folder.]] [[File::Create brief.docx]] [[Contents::with each article's main argument, the 3 places they disagree, and one open question for each.]] [[Done when::Keep it to one page.]]",
      gets: { weak: "Claude guesses the format, the length and where to save it.",
              strong: "The file you pictured, saved where you expect it." },
      why: "It names the sources, the file, what goes in it and when it's done. That's a **Definition of Done** in one prompt." },
    { title: "Sharing a folder", idea: "Share one narrow folder",
      weak: "Organize my stuff (with your whole Documents folder shared)",
      strong: "[[Folder::In the receipts folder,]] [[Task::read every receipt]] [[File::and create expenses.xlsx with date, vendor, amount and category.]] [[If stuck::Flag any you can't read.]] [[Plan first::Show me your plan and wait for my OK.]]",
      gets: { weak: "Claude can read everything in Documents, and \"organize\" could mean moving files.",
              strong: "One new file, built only from the receipts folder." },
      why: "A narrow folder, a named file, what goes in it, what to do when stuck, and a plan before anything happens." },
    { title: "Reviewing the plan", idea: "Approve before it runs",
      weak: "OK, go ahead",
      strong: "[[Check the plan::Before you start: which files will you read, which will you create, and will you change or delete anything?]] [[Set a limit::Only create new files; don't edit my Module 2 files.]] [[Approve::Then go ahead.]]",
      gets: { weak: "Approval without reading. A file you need could be overwritten.",
              strong: "A plan you understand, and your original files left alone." },
      why: "Approving a plan you haven't read isn't really approving. Two questions and one limit keep you in control: that's the **Agree** level of delegation." }
  ],

  // {group: "..."} = an unnumbered heading row; keep its minutes in line with the exercises below
  steps: [
    { group: "Exercise A · ~5 min" },
    { title: "Attach the articles", text: "The two from **Before you start**, in a new chat." },
    { title: "Ask", text: "Send Exercise A's prompt. Keep the answer open." },
    { group: "Exercise B · ~13 min" },
    { title: "Share one folder", text: "In the desktop app, share **ai-basics** only (see **Chat** and **Cowork**? Choose Cowork).",
      shot: { image: "assets/img/m3-share-folder.svg", caption: "Illustration. This part of the app is changing, so the folder button may look different or sit elsewhere.",
              alt: "Illustration of the Claude desktop app message box. Step 1: a Folder button is highlighted. Step 2: a folder list where Documents/ai-basics is selected, and Documents and Desktop are crossed out." } },
    { title: "Send the prompt", text: "Exercise B's prompt names the files and where they go." },
    { title: "Review the plan", text: "Which files will it read, create or change? Approve it, or ask for changes.",
      shot: { image: "assets/img/m3-plan.svg", caption: "Illustration. Your screen may look slightly different. Claude's wording will differ.",
              alt: "Illustration of a plan from Claude: read assumptions.xlsx and sample-data.xlsx, create inputs.xlsx and brief.docx, change no files. Labels point to the files it will read (Only your files?) and to Files I will change: none (Nothing overwritten?)." } },
    { title: "Check the files", text: "Open `inputs.xlsx` and `brief.docx`. Compare one number with your assumptions file." },
    { title: "Compare A and B", text: "One sentence: when would you ask, and when would you delegate?" }
  ],
  tip: "End every delegated task with \"Show me your plan and the file list first, and wait for my OK.\" One extra message prevents most surprises.",
  transfer: "Agent features in Microsoft Copilot and ChatGPT work the same way: describe the outcome, scope what they can see, and review before you approve.",

  exercises: [
    {
      title: "A · Ask",
      where: "Claude conversation",
      minutes: 5,
      intro: {"text":"Two made-up articles disagree about renting vs. buying a home. Ask Claude to compare them.","points":["Attach both articles (from **Before you start**) to a new chat","Send the prompt","Keep the answer open for Exercise B"]},
      promptLabel: "Copy this prompt",
      prompt: "[[Mode::Answer here in the chat and don't create any files.]]\n[[Task::For the two articles I attached: give each one's main argument]] [[Format::in 2 sentences, then tell me where they disagree.]]",
      deliverable: "Claude's answer in the conversation, to compare with Exercise B.",
      stretch: "Ask Claude to apply the **CRAAP** test (Module 2) to Article 1. Did it spot the sponsor?",
      reveal: { text: "**Score it.** Did Claude catch: ☐ the 4 disagreements · ☐ the 2 caveats · ☐ the 2 weak spots in Article 1? The details are below.\n\n**Where they disagree:** whether rent is \"money you'll never see again\"; how fast prices grow (5% vs. 3% a year); how long you need to stay before buying pays off (3 vs. 5 years); and whether the costs of owning are small or large (8–10% to buy and sell, plus about 1% a year in repairs).\n\n**Did the answer keep the caveats?** Article 1's 5% growth is **one city's last ten years**, and the author admits it isn't a promise. Article 2's case only works if you **invest the difference every month**, and its own survey found that **only 38 of 120** readers who rent do. Summaries often drop details like these and keep just the numbers, which makes weak evidence look solid.\n\nIf yours dropped them, ask: \"Add the evidence behind each article's key number.\"\n\n**Two more things to catch in Article 1:** it says $350 more a month builds equity, but in year 1 only about **$335 a month** of the $2,750 payment is equity; the rest is interest, tax and insurance. And the column is **sponsored by a home lender**, a reason to read its advice with care (*Purpose* in Module 2's CRAAP test)." }
    },
    {
      title: "B · Delegate",
      where: "Claude desktop app, with your ai-basics folder shared",
      minutes: 13,
      intro: {"text":"Now hand Claude a task that ends in files.","points":["Share your **ai-basics** folder only, in the desktop app (see **Chat** and **Cowork**? Choose Cowork)","Send the prompt","**Read the plan before you approve it**, and allow each action as Claude asks","Open both files and check one number in `inputs.xlsx` against your assumptions file"]},
      promptLabel: "Copy this prompt",
      prompt: "[[Sources::Use my Module 2 assumptions and sample-data files in this folder.]]\n[[File 1::1) Create inputs.xlsx: one row per input my tool needs, with columns name, default_value, low, high, unit, source. Use typical_value as the default, and split the range into low and high.]]\n[[File 2::2) Create brief.docx: one page for someone who will help me build the tool. Say what it does and who it's for, list its inputs with their default values, name the assumption I'm least sure of and why, and end with 2 open questions.]]\n[[Plan first::Show me your plan and the file list first, and wait for my OK.]] [[Limit::Don't change or delete any existing files.]]",
      deliverable: {"text":"Save in your **ai-basics** folder (Module 4 reads both):","points":["`inputs.xlsx`","`brief.docx`","Plus one sentence: at work, when would you ask, and when would you delegate?"]},
      stretch: "Ask Claude to turn the brief into a 3-slide summary deck in the same folder.",
      goodLooksLike: { image: "assets/img/m3-folder-before-after.svg",
        alt: "The ai-basics folder before and after Exercise B. Before: project-idea, assumptions.xlsx, sample-data.xlsx. After: the same three files, unchanged, plus two new files, inputs.xlsx and brief.docx.",
        text: "**inputs.xlsx** (a savings goal planner)\n**name:** monthly_saving · **default_value:** 400 · **low:** 250 · **high:** 600\n**unit:** USD per month · **source:** my estimate, from my last 3 months of spending\n\n**brief.docx** says where each number comes from, for example:\n*\"Least sure: the 4% interest rate. Savings rates change, and this is one bank's rate today.\"*" },
      reveal: { text: "**Does every default match your assumptions?** Each `default_value` should be the `typical_value` from your Module 2 file, and `low` and `high` should come from its range. A range like 250–600 is easy to split the wrong way round, and values sometimes get rounded.\n\n**Did your own estimates stay estimates?** A row whose source is *my estimate* shouldn't come back with a source that sounds official.\n\n**Did Claude respect the limit?** No existing file should have changed. Check that your Module 2 files still open and look the same.\n\nIf something's off, tell Claude exactly what you saw: \"monthly_saving should default to 400, as in my assumptions file.\"" }
    }
  ],

  responsibleUse: {
    title: "Share only what Claude needs",
    text: "**Claude can read everything in a folder you share**, including files you forgot were there.",
    useLabel: "Share", use: ["Your **ai-basics** folder"],
    neverLabel: "Never share", never: ["All of Documents or Desktop", "Folders with other people's data", "Work folders, without your employer's OK"],
    after: ["**Before you allow an action, check:**",
            ["Which file it touches", "Whether it creates, changes or deletes", "That it stays inside your folder"],
            "Claude always asks before permanently deleting files."],
    shot: { image: "assets/img/m3-permission.svg", caption: "Illustration. Your screen may look slightly different.",
            alt: "Illustration of a permission request: Claude wants to create inputs.xlsx in ai-basics, with Deny and Allow buttons. Labels point to what to read: 1, create, change or delete, 2, which file, 3, inside your folder. All three as expected? Allow. Anything surprising? Deny and ask." },
    tip: "Keep a copy of anything you can't lose before you delegate.",
    note: "More from Anthropic: [Use Claude Cowork safely](https://support.claude.com/en/articles/13364135-use-claude-cowork-safely)."
  },

  stuck: [
    { problem: "I don't see Chat and Cowork options",
      fix: "You have the newer version, where they're one conversation: just describe the task. If Claude can't work with your folder at all, Cowork may be turned off for your organization. Pair up with a classmate and mention it at office hours." },
    { problem: "Claude can't reach my folder",
      fix: "Share the folder from the **desktop app**; the browser can't reach files on your computer. Your organization can limit which folders are allowed, so keep the folder inside your user folder (Documents/ai-basics)." },
    { problem: "It asks permission for every single step",
      fix: "That's **Manual** mode, the Enterprise default, and it's expected. Read each request and allow it. It's slower, but you see everything Claude does." },
    { problem: "It started working before showing me a plan",
      fix: "Stop it, and add to your prompt: \"Show me your plan and the file list first, and wait for my OK.\"" },
    { problem: "A file it made won't open",
      fix: "Ask Claude to save it again as .xlsx or .docx, or as .csv for the inputs table." }
  ],

  // Go deeper: source and type show in their own columns; group adds a divider row (same table as Modules 1 and 2).
  // Claude Academy (academy.claude.com, tutorials) and Anthropic Academy (anthropic.skilljar.com, courses) are different sites.
  resources: [
    { group: "Start here", source: "Claude Academy", type: "Tutorial",
      label: "Choosing between Claude Cowork or Chat", url: "https://academy.claude.com/tutorials/choosing-between-claude-cowork-or-chat" },
    { group: "Start here", source: "Claude Help Center", type: "Help article",
      label: "Claude Cowork and chat are one Claude", url: "https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude" },
    { group: "Claude how-to", source: "Claude Help Center", type: "Help article",
      label: "Get started with Claude Cowork", url: "https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork" },
    { group: "Claude how-to", source: "Claude Help Center", type: "Help article",
      label: "Use Claude Cowork safely", url: "https://support.claude.com/en/articles/13364135-use-claude-cowork-safely" },
    { group: "Claude how-to", source: "Claude Help Center", type: "Help article",
      label: "Use Claude Cowork on Team and Enterprise plans", url: "https://support.claude.com/en/articles/13455879-use-claude-cowork-on-team-and-enterprise-plans" },
    { group: "The frameworks", source: "Scrum Guide", type: "Guide",
      label: "Definition of Done (in the Scrum Guide)", url: "https://scrumguides.org/scrum-guide.html" },
    { group: "The frameworks", source: "Management 3.0", type: "Practice",
      label: "Delegation Poker: the 7 levels of delegation", url: "https://management30.com/practice/delegation-poker/" },
    { group: "The frameworks", source: "Atlassian", type: "Article",
      label: "RACI chart: what it is and how to use it", url: "https://www.atlassian.com/work-management/project-management/raci-chart" },
    { group: "Learn more", source: "Anthropic Academy", type: "Free course",
      label: "Introduction to Claude Cowork", url: "https://anthropic.skilljar.com/introduction-to-claude-cowork" },
    { group: "Learn more", source: "Ethan Mollick, One Useful Thing", type: "Article",
      label: "Management as AI superpower", url: "https://www.oneusefulthing.org/p/management-as-ai-superpower" }
  ]
};
