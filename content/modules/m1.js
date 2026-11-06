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

  goal: "Give Claude a clear brief, push back on specifics, check its claims, and choose the tool you'll build.",
  outcomes: ["Write a 4-part prompt", "Improve an answer with specific pushback", "Catch and verify a shaky claim", "Choose a project"],

  budget: { read: 8, do: 18, check: 4 },

  before: {
    needs: [
      { text: "Setup A done: signed in to Claude with your **Claude Enterprise** account. Check the organization name in the account menu; a personal account is the wrong one. The web app and the desktop app both work.",
        ifNot: "Not yet? Follow [Setup A](index.html#setup) on the course overview, or bring it to office hours." }
    ]
  },

  breakdown: {
    key: "Better input, better output: tell Claude who you are, what you need and how you'll use it, then check what comes back.",
    concepts: [
      { title: "The four parts of a good brief",
        text: "**Context**: who you are and what it's for. **Task**: what you want done. **Format**: length, structure, audience. **Constraints**: what to include or avoid. A first message with all four usually saves a round of edits." },
      { title: "Treat the first answer as a draft",
        text: "Reply with the exact change you want. \"That's wrong\" gets an apology; \"Use 5% growth, not 20%\" gets a fix." },
      { title: "Trust, then verify",
        text: "Claude can sound sure and still be wrong, even when it names a source. Ask what it's least sure of to know where to look, then open the source yourself." },
      { title: "Keep sensitive data out",
        text: "In this course, use made-up or public information only. The full rules are under **Responsible use** below." }
    ]
  },

  frameworks: {
    title: "Prompt frameworks",
    intro: "You'll see many prompt acronyms online. They're memory aids for the same ideas as the four parts above, and none of them is official. You don't need to memorize any of them: use the one that sticks.",
    // One card per framework: each letter on its own line with a short explanation
    cards: [
      { name: "This course", goodFor: "Any first message",
        parts: [["Context", "who you are and what it's for"], ["Task", "what you want done"],
                ["Format", "length, structure, audience"], ["Constraints", "what to include or avoid"]] },
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
    note: "Two ideas worth borrowing: give Claude a **role** (RISEN, BRIEF), and **show an example** of what you want (CARE).",
    sample: {
      title: "See one task written in each framework",
      task: "**The task:** you run operations at a 200-person logistics company (made-up), and you want your CFO to fund a 4-week pilot to cut overtime.",
      items: [
        { name: "CARE",
          prompt: "**Context:** I run operations at a 200-person logistics company. Overtime costs are up 30% this year.\n**Ask:** Draft a short email asking our CFO to fund a 4-week pilot to cut overtime.\n**Rules:** Under 150 words. No layoffs. Include the pilot's cost and one risk.\n**Examples:** Match this past email: \"Quick ask: $8K for a 2-week routing test. Expected payback: 3 months. Risk: driver pushback, which we'll handle with a weekly check-in.\"" },
        { name: "CO-STAR",
          prompt: "**Context:** I run operations at a 200-person logistics company. Overtime costs are up 30% this year.\n**Objective:** Get the CFO to approve a 4-week pilot to cut overtime.\n**Style:** Executive memo.\n**Tone:** Confident, not salesy.\n**Audience:** A CFO who wants the numbers first.\n**Response:** 5 bullets, then a one-line ask." },
        { name: "RISEN",
          prompt: "**Role:** You're an operations consultant who has run overtime-reduction projects.\n**Instructions:** Plan a 4-week pilot to cut overtime at my 200-person logistics company.\n**Steps:** 1) List the likely causes of overtime. 2) Pick the two easiest to test. 3) Define one measure of success for each.\n**End goal:** A one-page plan I can show my CFO on Monday.\n**Narrowing:** No layoffs, no new software, under 300 words." },
        { name: "BRIEF",
          prompt: "**Background:** A 200-person logistics company whose overtime costs rose 30% this year.\n**Role:** You're my chief of staff.\n**Instructions:** Write the case for a 4-week pilot to cut overtime.\n**Expectations:** The CFO approves the pilot budget at Friday's meeting.\n**Format:** A table with 3 rows (problem, pilot, cost and payback), then a two-sentence ask." }
      ]
    }
  },

  examplesIntro: "For each pair, guess what the strong version adds, then open **What changed?** The tags show what each strong version uses.",
  examplesGuess: true,
  examples: [
    { title: "Explaining a concept",
      weak: "explain WACC",
      strong: "I'm an MBA student with an operations background. Explain WACC in under 150 words, then give a worked example with made-up numbers. End with the most common mistake students make.",
      tags: ["Context", "Task", "Format", "Constraints"],
      why: "It says who is asking, how long the answer should be, what shape it should take, and that the numbers are made up." },
    { title: "Pushing back",
      weak: "that's wrong",
      strong: "Your second point assumes 20% annual growth. Where does that come from? Redo it with 5% and 10% and show both.",
      tags: ["Names the problem", "Asks for a specific fix"],
      why: "Naming the exact assumption gets you a correction instead of an apology." },
    { title: "Asking for a self-check",
      weak: "are you sure?",
      strong: "Which claim in your answer are you least confident about? For that one, give me a source I can open and tell me what to look for.",
      tags: ["Finds the weak spot", "Asks for a source to open"],
      why: "\"Are you sure?\" usually gets a yes. Asking for the weakest claim and a source tells you where to check." },
    { title: "Showing what you want",
      weak: "write a status update for my team",
      strong: "Write this week's status update for my team on the office move. Use the same format as last week's:\n\nWins: Signed the lease for floor 3.\nRisks: Furniture delivery may slip a week.\nNext: Seating plan review on Thursday.\n\nKeep it under 80 words.",
      tags: ["Task", "Example", "Format"],
      why: "A short sample shows the format faster than describing it. This is the **E** in CARE." }
  ],

  steps: [
    { title: "Open a new chat", text: "At claude.ai or in the desktop app, signed in with your Enterprise account. Keep the default model." },
    { title: "Send a 4-part prompt", text: "Use Exercise A's prompt below and fill in the brackets." },
    { title: "Push back twice", text: "Each reply names one specific thing to change." },
    { title: "Ask for a self-check, then verify", text: "Ask \"What in your answer is most likely wrong, and how would I verify it?\" Then open a source yourself and check one claim." }
  ],
  tip: "If an answer is off, edit your first message to add the missing context and resend it. That usually beats five follow-ups.",
  transfer: "The four parts, pushback and checking work the same way in ChatGPT, Microsoft Copilot and Google Gemini, which MIT licenses for students.",

  exercises: [
    {
      title: "A · Three audiences, two pushbacks, one check",
      where: "Claude chat",
      minutes: 10,
      intro: "Pick a concept you know well, so you can tell when Claude gets it wrong. Send the prompt. Then reply twice, each time naming one specific thing to change. Finally, ask **\"What in your answer is most likely wrong, and how would I verify it?\"** and check one claim in a source you open yourself.",
      prompt: "I'm at MIT as [your program or role]. My background is [your industry and role].\nExplain [the concept you picked] three ways: to a 10-year-old, to a classmate, and to an expert in my industry. Under 60 words each. Use plain language and one concrete example per audience.",
      deliverable: "Your improved answer after two rounds of pushback, plus one claim you checked: what it was and where you checked it.",
      stretch: "Ask Claude to argue against its own expert explanation, then decide which side is stronger.",
      goodLooksLike: { text: "**Pushback that works:** *\"Your expert version says margins typically fall 20–30% after a price war. Typical for which industry? Give me a source I can open, or say you're estimating.\"*\n\n**A check, written down:** *Checked the 20–30% figure. Claude's source was a consulting blog post with no data behind it, so I won't use the number.*" }
    },
    {
      title: "B · Choose your project",
      where: "Claude chat",
      minutes: 8,
      intro: "This idea runs through the whole course, so pick something small that **you** would actually use, for your work or your personal life. It should fit on one screen, work with made-up numbers while you build it, and need no login, database or AI inside it (in Module 8 you publish it as a simple web page). Open **Need ideas?** below if you're stuck.",
      ideas: {
        title: "Need ideas? Examples for work and for life",
        intro: "Examples only. Your own idea is better, and it can be a variation of one of these.",
        groups: [
          { label: "For your work · studies",
            items: ["**Decision matrix:** options vs. weighted criteria → score, and what would flip it",
                    "**Bottleneck finder:** process steps and times → the bottleneck and output per day",
                    "**Market-sizing worksheet:** top-down vs. bottom-up estimates, side by side",
                    "**Investment quick-check:** cash flows → NPV, IRR and payback",
                    "**Group project tracker:** tasks, owners and deadlines → who's behind"] },
          { label: "For your life · Money",
            items: ["**Monthly budget tracker:** spending vs. plan by category",
                    "**Savings goal planner:** how many months to reach a goal",
                    "**Rent vs. buy calculator:** total cost of each over the years you'd stay",
                    "**Trip cost splitter:** who paid what → who owes whom",
                    "**Subscription audit:** every subscription → monthly and yearly total"] },
          { label: "For your life · Health & habits",
            items: ["**Habit tracker:** daily check-ins → streaks",
                    "**Workout log:** sets and weights → progress over time",
                    "**Meal planner:** the week's meals → a grocery list",
                    "**Sleep and water tracker:** daily entries → weekly averages",
                    "**Running pace calculator:** distance and time → pace and race-time estimates"] },
          { label: "For your life · Time & life admin",
            items: ["**Weekly time-block planner:** priorities → a week laid out in blocks",
                    "**Trip planner:** itinerary plus a running budget",
                    "**Packing checklist:** trip type and length → what to pack",
                    "**Moving checklist:** move date → tasks by week",
                    "**Gift and birthday tracker:** people, dates, ideas and budget"] },
          { label: "For your life · Learning & career",
            items: ["**Reading list tracker:** books → progress and notes",
                    "**Vocabulary flashcards:** words → practice that repeats the ones you miss",
                    "**Job application tracker:** applications → pipeline by stage",
                    "**Networking follow-up tracker:** contacts → who to follow up with this week",
                    "**Study timer:** focus sessions → a log of time per subject"] }
        ]
      },
      prompt: "Help me choose a small tool to build in this course, for my work or my personal life. It should fit on one screen, work with made-up data while I build it, and need no login, database or AI inside it.\nAsk me 3 questions, one at a time, and wait for each answer. Then propose 3 options. For each, give one sentence each on: the problem, who it helps, and what the tool does. Finally, tell me which option is easiest to build in a few hours, and why.",
      deliverable: "Your project idea in 3 sentences: the problem, who it helps, what the tool does. Save it; Module 2 starts from it.",
      stretch: "Ask Claude: \"What's the smallest version of this I could build in one hour?\"",
      goodLooksLike: { text: "**A work idea.** **Problem:** Our regional managers price multi-year service contracts by gut feel and often underprice the long ones. **Who it helps:** regional sales managers at a mid-size services company. **What it does:** they enter contract length, monthly fee and expected costs, and the tool shows margin per year and flags any contract below a 25% margin.\n\n**A personal idea.** **Problem:** I don't know what my subscriptions cost in total, and renewals catch me by surprise. **Who it helps:** me. **What it does:** I list each subscription with its price and renewal date, and it shows the monthly and yearly total and flags anything renewing in the next 7 days." }
    }
  ],

  responsibleUse: {
    title: "What not to paste",
    base: false,                 // these ARE the course rules (repeated from course.js rulesBase in other modules)
    text: "These rules apply in every module of this course.",
    rules: [
      "**In this course, use made-up or public information only.** Every exercise is designed to work that way.",
      "**Never paste high-risk information into any AI tool:** Social Security numbers, financial account or credit card numbers, health records, passwords. MIT's guidance says this applies even to MIT-licensed tools.",
      "**No one else's personal information,** and no non-public MIT information such as unpublished research, student records or hiring materials.",
      "**For work, your employer's AI policy comes first.** If you're not sure something is allowed, don't paste it. Ask your employer, or for MIT information, ai-guidance@mit.edu."
    ],
    note: "Based on [MIT IS&T guidance for the use of generative AI](https://ist.mit.edu/ai-guidance). Your Claude Enterprise account doesn't change these rules. We'll update this section once Sloan confirms which MIT data levels the account is approved for."
  },

  stuck: [
    { problem: "Claude shows my personal account, not the Enterprise one",
      fix: "Open the account menu (your name or initials) and check the organization shown. Sign out, then sign in with the email address the program gave you. Still wrong? Bring it to office hours; the first one is a setup clinic." },
    { problem: "The answer is long and generic",
      fix: "Add the missing parts: who it's for and the format, e.g. \"under 100 words, 3 bullets, for my CFO.\" Or edit your first message and resend it." },
    { problem: "Claude asked all three questions at once",
      fix: "Reply: \"Please ask one question at a time and wait for my answer.\" Or answer them all in one message; that works too." },
    { problem: "The self-check didn't give me anything I can open",
      fix: "Ask: \"For that claim, give me a source I can open and tell me what to look for.\" If there's no source you can find, treat the claim as unverified and don't rely on it." },
    { problem: "I can't decide on a project",
      fix: "Pick two ideas from **Need ideas?** in Exercise B and ask Claude which one is smaller and more useful to you. You can switch ideas any time before Module 4, where you build the first version." }
  ],

  checks: [
    { text: "I can write a prompt with context, task, format and constraints", evidence: "Point to the four parts in your Exercise A prompt." },
    { text: "I improved an answer with two rounds of specific pushback", evidence: "Your chat shows two replies that each name one change." },
    { text: "I checked one of Claude's claims against a source I opened myself", evidence: "Name the claim and where you checked it." },
    { text: "I have a 3-sentence project idea", evidence: "Saved where you'll find it for Module 2." }
  ],
  quiz: [
    { q: "Claude's answer includes a precise statistic and names where it comes from. You want to use it in a memo to your CEO. What do you do?",
      options: [
        "Use it: Claude named the source",
        "Open the source and check that it says what Claude claims, and how it was measured",
        "Ask Claude \"Are you sure?\" and use it if Claude says yes"
      ],
      answer: 1,
      explain: "A named source can be misquoted, outdated or weaker than it sounds, and \"Are you sure?\" usually gets a yes. Only opening the source checks it." },
    { q: "Which addition improves \"Summarize this article\" the most?",
      options: [
        "\"Be accurate and thorough\"",
        "\"For a 2-minute update to my CFO: 5 bullets, focused on cost\"",
        "\"Please, this is important\""
      ],
      answer: 1,
      explain: "Audience, format and focus change the output far more than asking for accuracy or adding urgency." },
    { q: "A colleague wants to paste a client's confidential financials into Claude to build a model. Your company has a Claude Enterprise account. What's the right first step?",
      options: [
        "Go ahead: enterprise accounts are meant for business data",
        "Remove the client's name first, then paste it",
        "Check how sensitive the data is, whether your company has approved this tool for it, and what the client agreement allows"
      ],
      answer: 2,
      explain: "An enterprise account isn't automatically approved for every kind of data, and removing a name often doesn't hide whose numbers they are. Policy and approval come first." }
  ],

  resources: [
    { label: "Anthropic Academy: AI Fluency: Framework & Foundations (free course)", url: "https://anthropic.skilljar.com/ai-fluency-framework-foundations" },
    { label: "Anthropic: Interactive prompt engineering tutorial", url: "https://github.com/anthropics/prompt-eng-interactive-tutorial" },
    { label: "Anthropic: Prompting best practices", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" },
    { label: "Anthropic: Prompt engineering overview", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview" },
    { label: "Nielsen Norman Group: CARE, a structure for crafting AI prompts", url: "https://www.nngroup.com/articles/careful-prompts/" },
    { label: "Sheila Teo: How I won Singapore's GPT-4 prompt engineering competition (CO-STAR)", url: "https://towardsdatascience.com/how-i-won-singapores-gpt-4-prompt-engineering-competition-34c195a93d41" },
    { label: "MIT IS&T: Guidance for the use of generative AI", url: "https://ist.mit.edu/ai-guidance" },
    { label: "MIT Sloan Teaching & Learning Technologies: Generative AI resource hub", url: "https://mitsloanedtech.mit.edu/ai/" }
  ]
};
