/* ==========================================================================
   Module 1 · Briefing Claude
   Spec: AI_Basics_Lab_Revision_Plan.md, "Module 1 · Briefing Claude"
   Status: revised Nov 3, 2026 (frameworks section added, demo removed, no default project)
   ========================================================================== */
window.AIB_MODULES = window.AIB_MODULES || {};
window.AIB_MODULES["m1"] = {
  id: "m1",
  title: "Briefing Claude",
  level: "No experience needed",

  goal: "Learn to write a clear prompt, improve Claude's answers, check what it tells you, and pick the tool you'll build.",
  outcomes: ["Write a 4-part prompt", "Improve an answer with specific pushback", "Catch and verify a shaky claim", "Choose a project"],

  budget: { read: 8, do: 20, check: 2 },

  before: {
    needs: [
      { text: "Setup A done: signed in to Claude with your **Claude Enterprise** account. Check the organization name in the account menu. The web app and the desktop app both work.",
        ifNot: "Not yet? Follow [Setup A](m00-course-overview.html#setup) on the course overview, or bring it to office hours." }
    ]
  },

  breakdown: {
    // "prompt" = the message you send Claude (used across the course); "brief" is kept for Module 3's brief.docx
    key: "A **prompt** is the message you send Claude. A clear prompt in, a useful answer out. Then check it before you use it.",
    // text can be one paragraph or a list of short bullets
    concepts: [
      { title: "The four parts of a good prompt",
        text: ["**Context:** who you are and why", "**Task:** what you want done",
               "**Format:** length, structure, audience", "**Constraints:** what to include or avoid"] },
      { title: "Treat the first answer as a draft",
        text: ["Reply with the exact change you want", "✗ \"That's wrong\" gets an apology", "✓ \"Use 5% growth, not 20%\" gets a fix"] },
      { title: "Check before you trust",
        text: ["Claude can sound sure and still be wrong", "Ask: \"Which claim are you least confident about?\"", "Open the source before you use it"] },
      { title: "Keep sensitive data out",
        text: ["Use made-up or public information only", "Never paste passwords, ID numbers, health or financial data", "Full rules: **Responsible use**, below"] }
    ]
  },

  frameworks: {
    title: "Prompt frameworks",
    intro: "There are many prompt frameworks online, each with its own acronym. None is official, and they all cover the four parts above. Here are four common ones: pick the one that's easiest to remember.",
    // One card per framework: each letter on its own line with a short explanation
    cards: [
      { name: "CARE", goodFor: "Quick everyday prompts",
        parts: [["Context", "the situation"], ["Ask", "the specific request"],
                ["Rules", "limits and what to avoid"], ["Examples", "a sample of the output you want"]] },
      { name: "CO-STAR", goodFor: "Writing for a reader: emails, memos, posts",
        parts: [["Context", "the background Claude needs"], ["Objective", "what you want to achieve"],
                ["Style", "the kind of writing: memo, email, report"], ["Tone", "the attitude: formal, friendly, direct"],
                ["Audience", "who will read it"], ["Response", "the shape: bullets, table, length"]] },
      { name: "RISEN", goodFor: "Multi-step analysis",
        parts: [["Role", "who Claude should act as"], ["Instructions", "the main task"],
                ["Steps", "the order to work in"], ["End goal", "what the result is for"],
                ["Narrowing", "limits and what to leave out"]] },
      { name: "BRIEF", goodFor: "Business deliverables",
        parts: [["Background", "the situation or company"], ["Role", "who Claude should act as"],
                ["Instructions", "the core assignment"], ["Expectations", "the result you want it to achieve"],
                ["Format", "how to structure the output"]] }
    ],
    // note can be one sentence, or {label, points} for a highlighted tip box with bullets
    note: { label: "Tip · works with any framework",
            points: ["**Give Claude a role.** Start with \"You're a CFO reviewing a budget request.\" Claude answers with that person's priorities.",
                     "**Show an example.** Paste a past email or table you liked. Claude matches its length, tone and layout."] },
    // sample: the SAME output (a short note to the CFO) written 4 ways, so only the framework changes.
    // Every number Claude needs is in the task, so it has nothing to invent.
    sample: {
      title: "See one task written in each framework",
      task: "**Made-up example** · You run operations at a 200-person logistics company. Overtime cost $480K last year, up 30%. You want the CFO to fund a 4-week, $15K pilot to cut it.",
      tryIt: "Each prompt asks for the same short note. Copy two into Claude and compare the answers.",
      items: [
        { name: "CARE",
          prompt: "**Context:** I run operations at a 200-person logistics company. Overtime cost $480K last year, up 30%.\n**Ask:** Write a short note asking our CFO to fund a 4-week, $15K pilot to cut overtime.\n**Rules:** Under 150 words. No layoffs. Use only the numbers above. Name one risk.\n**Examples:** Match the style of this past note: \"Quick ask: $8K for a 2-week routing test. Risk: driver pushback, which we'll handle with a weekly check-in.\"" },
        { name: "CO-STAR",
          prompt: "**Context:** I run operations at a 200-person logistics company. Overtime cost $480K last year, up 30%. The pilot runs 4 weeks and costs $15K.\n**Objective:** Get the CFO to fund the pilot.\n**Style:** A short executive note.\n**Tone:** Confident, not salesy.\n**Audience:** A CFO who wants the numbers first.\n**Response:** Under 150 words: 3 bullets, then a one-line ask." },
        { name: "RISEN",
          prompt: "**Role:** You're an operations consultant who has run overtime-reduction projects.\n**Instructions:** Write a short note asking the CFO of my 200-person logistics company to fund a 4-week, $15K pilot to cut overtime.\n**Steps:** 1) State the problem: overtime cost $480K last year, up 30%. 2) Describe the pilot. 3) End with the ask.\n**End goal:** The CFO agrees to fund the pilot.\n**Narrowing:** Under 150 words. No layoffs. Use only the numbers above." },
        { name: "BRIEF",
          prompt: "**Background:** A 200-person logistics company. Overtime cost $480K last year, up 30%.\n**Role:** You're my chief of staff.\n**Instructions:** Write a short note asking the CFO to fund a 4-week, $15K pilot to cut overtime.\n**Expectations:** The CFO approves the pilot budget at Friday's meeting.\n**Format:** Under 150 words: a 3-row table (problem, pilot, cost), then a two-sentence ask." }
      ]
    }
  },

  examplesIntro: "Read each weak prompt and guess what's missing. Then open **What changed?** to check.",
  examplesGuess: true,
  // Order follows the key ideas: first message (1, 2), then follow-ups (3, 4).
  // [[Tag::words]] colors those words in the strong prompt and shows a matching tag.
  examples: [
    { title: "Explaining a concept", idea: "The four parts of a good prompt",
      weak: "explain WACC",
      strong: "[[Context::I'm an MBA student with an operations background.]] [[Task::Explain WACC]] [[Format::in under 150 words. Give a worked example with made-up numbers, then the most common mistake students make.]] [[Constraints::Skip the formula derivation.]]",
      gets: { weak: "A long textbook definition, full formula included.",
              strong: "About 150 words at your level, one worked example and one mistake to avoid." },
      why: "It says who is asking (Context), what to do (Task), how long and in what shape (Format), and what to leave out (Constraints)." },
    { title: "Showing what you want", idea: "Show an example (Tip)",
      weak: "write a status update for my team",
      strong: "[[Task::Write this week's status update for my team on the office move.]] [[Example::Use the same format as last week's:]]\n\n[[Example::Wins: Signed the lease for floor 3.\nRisks: Furniture delivery may slip a week.\nNext: Seating plan review on Thursday.]]\n\n[[Format::Keep it under 80 words.]]",
      gets: { weak: "A generic update in a layout your team hasn't seen.",
              strong: "A short update in last week's layout: Wins, Risks, Next." },
      why: "A short sample shows the format faster than describing it. This is the **E** in CARE." },
    { title: "Pushing back", idea: "Treat the first answer as a draft",
      weak: "that's wrong",
      strong: "[[Names the problem::Your second point assumes 20% annual growth.]] [[Asks where it came from::Where does that come from?]] [[Asks for a specific fix::Redo it with 5% and 10% and show both.]]",
      gets: { weak: "An apology and a new answer that may repeat the mistake.",
              strong: "Where the 20% came from, plus two corrected versions to compare." },
      why: "Naming the exact assumption gets you a correction instead of an apology." },
    { title: "Asking for a self-check", idea: "Check before you trust",
      weak: "are you sure?",
      strong: "[[Finds the weak spot::Which claim in your answer are you least confident about?]] [[Asks for a source::For that one, give me a source I can open]] [[Says what to check::and tell me what to look for.]]",
      gets: { weak: "\"Yes, I'm confident.\" Nothing to check.",
              strong: "The shakiest claim and a source you can open to check it." },
      why: "\"Are you sure?\" usually gets a yes. Asking for the weakest claim and a source tells you where to check." }
  ],

  // {group: "..."} = an unnumbered heading row; keep its minutes in line with the exercises below
  steps: [
    { group: "Exercise A · ~10 min" },
    { title: "Open a new chat", text: "At claude.ai or in the desktop app, signed in with your Enterprise account. Keep the default model." },
    { title: "Send the prompt", text: "Copy Exercise A's prompt and fill in the brackets." },
    { title: "Push back twice", text: "Each reply names one specific change." },
    { title: "Ask for a self-check", text: "\"Which claim in your answer are you least confident about? Give me a source I can open.\"" },
    { title: "Check one claim yourself", text: "Open the source and write down what you found." },
    { group: "Exercise B · ~8 min" },
    { title: "Choose your project", text: "Send Exercise B's prompt and answer Claude's 3 questions." },
    { title: "Save your idea", text: "Write it in 3 sentences and save it in your **ai-basics** folder as **project-idea**. Module 2 starts from it." }
  ],
  tip: "If the answer is off, fix your first message instead: hover over it, click **Edit** (the pencil), add what was missing and resend. That usually beats five follow-ups.",
  transfer: "The four parts, pushback and checking work the same way in ChatGPT, Microsoft Copilot and Google Gemini.",

  exercises: [
    {
      title: "A · Explain it three ways",
      where: "Claude chat",
      minutes: 10,
      // intro / deliverable: a sentence, a list of bullets, or {text, points}
      intro: { text: "Pick a concept you know well, so you can spot when Claude gets it wrong. Examples: WACC, the bullwhip effect, net promoter score.",
               points: ["Send the prompt below",
                        "Push back twice, one specific change each time",
                        "Ask for a self-check, then open the source and check one claim"] },
      // [[Tag::words]] colors the four parts, as in the Examples; Copy copies plain text
      prompt: "[[Context::I'm at MIT as [your program or role]. My background is [your industry and role].]]\n[[Task::Explain [the concept you picked] three ways: to a 10-year-old, to a classmate, and to an expert in my industry.]]\n[[Format::Under 60 words each, with one concrete example per audience.]]\n[[Constraints::Use plain language and avoid jargon, even for the expert.]]",
      deliverable: { text: "Save in your **ai-basics** folder:",
                     points: ["Your improved answer after two pushbacks",
                              "One claim you checked: what it said, where you checked it, and whether it held up"] },
      stretch: "Ask Claude: \"Argue against your expert explanation.\" Then decide which side is stronger, and why.",
      goodLooksLike: { text: "**Pushback on a claim:** *\"Your expert version says margins typically fall 20–30% after a price war. Typical for which industry? Give me a source I can open, or say you're estimating.\"*\n\n**Pushback on the format:** *\"Your 10-year-old version uses the word 'capital'. Replace it with a word a kid knows.\"*\n\n**A check, written down:** *Checked the 20–30% figure. Claude's source was a consulting blog post with no data behind it, so I won't use the number.*" }
    },
    {
      title: "B · Choose your project",
      where: "Claude chat",
      minutes: 8,
      intro: { text: "This idea runs through the whole course, and in Module 8 you publish it as a web page. Pick something small **you** would actually use. **A good project:**",
               points: ["Fits on one screen",
                        "Works with made-up numbers while you build it",
                        "Needs no login, database or AI inside it",
                        "Is something you'd use at work or in life"] },
      ideas: {
        title: "Need ideas? Examples for work and for life",
        intro: "Examples only. Your own idea is better, and it can be a variation of one of these.",
        groups: [
          { label: "Work & studies",
            items: ["**Decision matrix:** options vs. weighted criteria → score, and what would flip it",
                    "**Bottleneck finder:** process steps and times → the bottleneck and output per day",
                    "**Market-sizing worksheet:** top-down vs. bottom-up estimates, side by side",
                    "**Investment quick-check:** cash flows → NPV, IRR and payback",
                    "**Group project tracker:** tasks, owners and deadlines → who's behind"] },
          { label: "Side projects & small business",
            items: ["**Pricing calculator:** costs and target margin → price per unit",
                    "**Break-even calculator:** fixed and variable costs → units to break even",
                    "**Invoice tracker:** clients and invoices → what's overdue",
                    "**Inventory counter:** stock and sales → when to reorder",
                    "**Feedback tally:** comments by theme → the top 3 issues"] },
          { label: "Money",
            items: ["**Monthly budget tracker:** spending vs. plan by category",
                    "**Savings goal planner:** how many months to reach a goal",
                    "**Rent vs. buy calculator:** total cost of each over the years you'd stay",
                    "**Trip cost splitter:** who paid what → who owes whom",
                    "**Subscription audit:** every subscription → monthly and yearly total"] },
          { label: "Health & habits",
            items: ["**Habit tracker:** daily check-ins → streaks",
                    "**Workout log:** sets and weights → progress over time",
                    "**Meal planner:** the week's meals → a grocery list",
                    "**Sleep and water tracker:** daily entries → weekly averages",
                    "**Running pace calculator:** distance and time → pace and race-time estimates"] },
          { label: "Time & admin",
            items: ["**Weekly time-block planner:** priorities → a week laid out in blocks",
                    "**Trip planner:** itinerary plus a running budget",
                    "**Packing checklist:** trip type and length → what to pack",
                    "**Moving checklist:** move date → tasks by week",
                    "**Gift and birthday tracker:** people, dates, ideas and budget"] },
          { label: "Learning & career",
            items: ["**Reading list tracker:** books → progress and notes",
                    "**Vocabulary flashcards:** words → practice that repeats the ones you miss",
                    "**Job application tracker:** applications → pipeline by stage",
                    "**Networking follow-up tracker:** contacts → who to follow up with this week",
                    "**Study timer:** focus sessions → a log of time per subject"] }
        ]
      },
      prompt: "[[Context::I'm at MIT as [your program or role]. I'm interested in [work, money, health, time or learning].]]\n[[Task::Help me choose a small tool to build in this course.]]\n[[Constraints::It should fit on one screen, work with made-up data while I build it, and need no login, database or AI inside it.]]\n[[Format::Ask me 3 questions, one at a time, and wait for each answer. Then propose 3 options. For each, write one sentence on the problem, one on who it helps, and one on what the tool does. Finally, tell me which is easiest to build in a few hours, and why.]]",
      deliverable: { text: "Save in your **ai-basics** folder as **project-idea**, one sentence each. Module 2 starts from it.",
                     points: ["**Problem:** what's hard or slow today",
                              "**Who it helps:** you, or who exactly",
                              "**What the tool does:** what you enter and what it shows"] },
      stretch: "Ask Claude: \"What's the smallest version of this I could build in one hour?\" Keep that version in mind for Module 4.",
      goodLooksLike: { text: "**A work idea.** **Problem:** Our regional managers price multi-year service contracts by gut feel and often underprice the long ones. **Who it helps:** regional sales managers at a mid-size services company. **What it does:** they enter contract length, monthly fee and expected costs, and the tool shows margin per year and flags any contract below a 25% margin.\n\n**A personal idea.** **Problem:** I don't know what my subscriptions cost in total, and renewals catch me by surprise. **Who it helps:** me. **What it does:** I list each subscription with its price and renewal date, and it shows the monthly and yearly total and flags anything renewing in the next 7 days.\n\n**Too big:** *\"A CRM for my team.\"* It needs logins and a database. **Smaller:** a follow-up tracker for one person's contacts." }
    }
  ],

  responsibleUse: {
    title: "What's safe to paste",
    base: "only",                // shows the course rules from course.js (rulesBase) as this module's own; edit them there
    text: "These rules apply in every module of this course."
    // the source note and the staff TODO now live with the rules in course.js
  },

  // In the order students meet them: setup, Exercise A, then Exercise B
  stuck: [
    { problem: "Claude shows my personal account, not the Enterprise one",
      fix: "Check the organization in the account menu. Sign out, then sign in with your MIT email. Still wrong? Bring your laptop to office hours." },
    { problem: "The answer is long and generic",
      fix: "Add who it's for and the format: \"under 100 words, 3 bullets, for my CFO.\" Or edit your first message and resend." },
    { problem: "The self-check didn't give me anything I can open",
      fix: "Ask: \"For that claim, give me a source I can open and tell me what to look for.\" No source? Treat the claim as unverified." },
    { problem: "The link doesn't open, or doesn't say what Claude claimed",
      fix: "That happens. Treat the claim as unverified, ask for another source, or search for it yourself." },
    { problem: "Claude asked all three questions at once",
      fix: "Reply: \"Please ask one question at a time.\" Or answer them all in one message; that works too." },
    { problem: "I can't decide on a project",
      fix: "Pick two ideas from **Need ideas?** and ask Claude which is smaller and more useful to you. You can switch before Module 4, where you build the first version." }
  ],

  // Go deeper: source and type show above the title; group puts cards under a small heading
  resources: [
    { group: "Start here", source: "Anthropic Academy", type: "Free course",
      label: "AI Fluency: Framework & Foundations", url: "https://anthropic.skilljar.com/ai-fluency-framework-foundations" },
    { group: "Prompting guides", source: "Anthropic", type: "Tutorial",
      label: "Interactive prompt engineering tutorial", url: "https://github.com/anthropics/prompt-eng-interactive-tutorial" },
    { group: "Prompting guides", source: "Anthropic", type: "Guide",
      label: "Prompting best practices", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" },
    { group: "Prompting guides", source: "Anthropic", type: "Guide",
      label: "Prompt engineering overview", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview" },
    { group: "The frameworks", source: "Nielsen Norman Group", type: "Article",
      label: "CARE, a structure for crafting AI prompts", url: "https://www.nngroup.com/articles/careful-prompts/" },
    { group: "The frameworks", source: "Sheila Teo", type: "Article",
      label: "How I won Singapore's GPT-4 prompt engineering competition (CO-STAR)", url: "https://towardsdatascience.com/how-i-won-singapores-gpt-4-prompt-engineering-competition-34c195a93d41" },
    { group: "MIT guidance", source: "MIT IS&T", type: "Guidance",
      label: "Guidance for the use of generative AI", url: "https://ist.mit.edu/ai-guidance" },
    { group: "MIT guidance", source: "MIT Sloan TLT", type: "Resource hub",
      label: "Generative AI resource hub", url: "https://mitsloanedtech.mit.edu/ai/" }
  ]
};
