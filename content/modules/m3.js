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
      "The **Claude desktop app**, installed and signed in with your Enterprise account (Setup A). Folder access only works there.",
      { text: "Your **ai-basics** folder (Setup A), with your Module 2 **assumptions** and **sample-data** files in it.",
        ifNot: "Missing them? Do [Module 2, Exercise B](m02-research-analysis.html#s-exercise) first (11 min) and save both files in the folder." },
      { text: "The two practice articles, downloaded: short, fictional opinion pieces on renting vs. buying a home.",
        files: [
          { label: "Article 1: Buy (.docx)", url: "assets/files/m3/article-buy.docx" },
          { label: "Article 2: Rent (.docx)", url: "assets/files/m3/article-rent.docx" }
        ] }
    ],
    note: { title: "Claude has changed: Chat and Cowork are now one.",
      text: "Claude used to have two modes: **Chat** to talk things through, and **Cowork** to hand off work on your files. Anthropic has merged them into one conversation: you describe what you want, and Claude decides whether to answer or to do the work and hand back files. The change is rolling out in stages (on Enterprise accounts, your admins switch it on), so you may still have the old version. **If your message box shows Chat and Cowork,** use Chat for Exercise A and Cowork for Exercise B. **If it doesn't,** do both in an ordinary conversation in the desktop app." }
  },

  breakdown: {
    key: "The same Claude can answer you or do the work for you. What changes is your prompt: ask for an answer, or describe a finished result.",
    concepts: [
      { title: "Ask: think and draft",
        text: "For brainstorming, explaining and quick drafts. The answer stays in the conversation and you take it from there." },
      { title: "Delegate: describe the outcome",
        text: "Say what done looks like: which files, what's in them, where to save them. Claude plans the steps and does them." },
      { title: "Scope: one narrow folder",
        text: "Claude can read everything in a folder you share. Share your ai-basics folder, never all of Documents." },
      { title: "Stay in control",
        text: "Ask for the plan first. On Enterprise accounts Claude asks before each action by default (**Manual** mode). Then open the files and check them." }
    ],
    compare: { head: ["", "Ask", "Delegate"], rows: [
      ["Use it when", "You want to think, learn or draft", "The work has several steps and ends in files"],
      ["You start with", "A question: \"Explain…\", \"Compare…\", \"Draft…\"", "An outcome: \"Create [file] in [folder]… Show me your plan first.\""],
      ["Claude uses", "What you type or attach", "A folder you share (desktop app)"],
      ["You get", "An answer in the chat", "Files saved where you said"],
      ["You check", "The reasoning", "The plan first, then the files"]
    ]}
  },

  examples: [
    { title: "Same goal, two ways",
      weak: "Ask: \"Summarize the two articles I attached into a short brief.\"",
      strong: "Delegate: \"Read the two articles in this folder. Create brief.docx: one page with each article's argument, where they disagree, and 2 open questions. Show me your plan first.\"",
      why: "Neither is wrong. Asking gives you text to work with; delegating gives you a finished file built from the sources." },
    { title: "Delegating well",
      weak: "\"Organize my stuff\" (with your whole Documents folder shared)",
      strong: "\"In the receipts folder, read every receipt and create expenses.xlsx with date, vendor, amount and category. Flag any you can't read. Show me your plan and wait for my OK.\"",
      why: "A named folder, a named file, what goes in it, what to do when stuck, and a plan before anything happens." }
  ],

  steps: [
    { title: "Ask first", text: "Do Exercise A in an ordinary conversation, so you can compare it with delegating." },
    { title: "Give Claude one folder", text: "In the desktop app, share your **ai-basics** folder, not Documents or Desktop." },
    { title: "Delegate the outcome, review the plan", text: "Name the files and where they go, ask for the plan first, then approve or change it." },
    { title: "Open the files and check one claim", text: "Compare one sentence or number in the output with the source it came from." }
  ],
  tip: "End every delegated task with \"Show me your plan and the file list first, and wait for my OK.\" It costs one message and prevents most surprises.",
  transfer: "Agent features in Microsoft Copilot and ChatGPT work the same way: describe the outcome, scope what they can see, and review before you approve.",

  exercises: [
    {
      title: "A · Ask",
      where: "Claude conversation",
      minutes: 5,
      intro: "Attach the two articles (download them in **Before you start**). They disagree about whether to rent or buy a home. Send the prompt and read the answer. Keep it open for comparison with Exercise B.",
      prompt: "Answer here in the chat and don't create any files.\nFor the two articles I attached: give each one's main argument in 2 sentences, then tell me where they disagree.",
      deliverable: "Claude's answer in the conversation, to compare with Exercise B.",
      reveal: { text: "**Where they disagree:** whether rent is \"money you'll never see again\"; how fast prices grow (5% vs. 3% a year); how long you need to stay before buying pays off (3 vs. 5 years); and whether the costs of owning are small or large (8–10% to buy and sell, plus about 1% a year in repairs).\n\n**Did the answer keep the caveats?** Article 1's 5% growth is **one city's last ten years**, and the author admits it isn't a promise. Article 2's case only works if you **invest the difference every month**, and its own survey found that **only 38 of 120** readers who rent do. Summaries often drop details like these and keep just the numbers, which makes weak evidence look solid.\n\nIf yours dropped them, ask: \"Add the evidence behind each article's key number.\"" }
    },
    {
      title: "B · Delegate",
      where: "Claude desktop app, with your ai-basics folder shared",
      minutes: 13,
      intro: "Share your **ai-basics** folder with Claude in the desktop app (if you see **Chat** and **Cowork**, choose **Cowork**). Send the prompt, **read the plan before you approve it**, and allow each action as Claude asks. When it's done, open both files and check one number in `inputs.xlsx` against your assumptions file.",
      prompt: "Use my Module 2 assumptions and sample-data files in this folder.\n1) Create inputs.xlsx: one row per input my tool needs, with columns name, default_value, low, high, unit, source. Use typical_value as the default, and split the range into low and high.\n2) Create brief.docx: one page for someone who will help me build the tool. Say what it does and who it's for, list its inputs with their default values, name the assumption I'm least sure of and why, and end with 2 open questions.\nShow me your plan and the file list first, and wait for my OK. Don't change or delete any existing files.",
      deliverable: "`inputs.xlsx` and `brief.docx` in your ai-basics folder, plus one sentence: at work, when would you ask, and when would you delegate?",
      stretch: "Ask Claude to turn the brief into a 3-slide summary deck in the same folder.",
      goodLooksLike: { text: "**inputs.xlsx** (a savings goal planner): monthly_saving · 400 · 250 · 600 · USD per month · my estimate, from my last 3 months of spending.\n\n**brief.docx** says where each number comes from, for example: *\"Least sure: the 4% interest rate. Savings rates change, and this is one bank's rate today.\"*" },
      reveal: { text: "**Does every default match your assumptions?** Each `default_value` should be the `typical_value` from your Module 2 file, and `low` and `high` should come from its range. A range like 250–600 is easy to split the wrong way round, and values sometimes get rounded.\n\n**Did your own estimates stay estimates?** A row you marked *my estimate* or `checked: no` shouldn't come back with a source that sounds official.\n\nIf something's off, tell Claude exactly what you saw: \"monthly_saving should default to 400, as in my assumptions file.\"" }
    }
  ],

  responsibleUse: {
    title: "Share only what Claude needs",
    rules: [
      "**Share one narrow folder.** Claude can read everything in a folder you share, including files you forgot were there. Use your ai-basics folder, never all of Documents or Desktop.",
      "**Read each permission request** before you allow it. Claude always asks before permanently deleting files."
    ],
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

  resources: [
    { label: "Claude Academy: Choosing between Claude Cowork or Chat", url: "https://claude.com/resources/tutorials/choosing-between-claude-cowork-or-chat" },
    { label: "Claude Help Center: Claude Cowork and chat are one Claude", url: "https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude" },
    { label: "Claude Help Center: Get started with Claude Cowork", url: "https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork" },
    { label: "Claude Help Center: Use Claude Cowork safely", url: "https://support.claude.com/en/articles/13364135-use-claude-cowork-safely" },
    { label: "Claude Help Center: Use Claude Cowork on Team and Enterprise plans", url: "https://support.claude.com/en/articles/13455879-use-claude-cowork-on-team-and-enterprise-plans" },
    { label: "Anthropic Academy: Introduction to Claude Cowork (free course)", url: "https://anthropic.skilljar.com/introduction-to-claude-cowork" },
    { label: "Ethan Mollick, One Useful Thing: Management as AI superpower", url: "https://www.oneusefulthing.org/p/management-as-ai-superpower" },
    { label: "Anthropic Engineering: Building effective agents (for developers)", url: "https://www.anthropic.com/engineering/building-effective-agents" }
  ]
};
