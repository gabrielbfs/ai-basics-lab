/* ==========================================================================
   Module 5 · Skills (build-spec writer, Option A)
   Spec: AI_Basics_Lab_Revision_Plan.md, "Module 5 · Skills" (Option A, decided Nov 3, 2026)
   Files: assets/files/m5/ (reference skill, upload zip, example spec), checked and
   packaged by tools/make-m5-files.js.
   Status: draft, awaiting timed test run (Nov 3, 2026)
   ========================================================================== */
window.AIB_MODULES = window.AIB_MODULES || {};

// The reference skill, shown in full on the page (folded). Must match assets/files/m5/build-spec-writer/SKILL.md;
// tools/make-m5-files.js checks that.
const M5_SKILL = `---
name: build-spec-writer
description: Turns a prototype or tool idea into a one-page build spec for Claude Code. Use when asked for a build spec or spec.md, or to get a prototype ready to build as a real app.
---

# Build-spec writer

Turn a prototype (an HTML file, an artifact, or a description of a tool) into a one-page build spec that Claude Code can follow to build the tool as a small real app.

## Steps

1. Read the prototype and any files the user shares (for example inputs.xlsx or brief.docx). Work out the inputs, the outputs and how each output is calculated.
2. If something you need is missing, ask the user at most 3 questions, one at a time, and wait for each answer:
   - Who will use the tool, and for what decision?
   - What must stay exactly as it is in the prototype?
   - What should be better in the real app?
3. Write the spec in the format below. Keep it to one page. Use the prototype's real numbers in the acceptance checks.
4. Save it as spec.md where the user asks. If you can't save files, show the whole spec in one block so the user can copy it.

## Output format

# Build spec: [tool name]

**Who it's for:** one sentence.

**What it does:** one sentence.

**Inputs:** a table with name, unit, default value and valid range for each input.

**Outputs:** a table with name, how it's calculated, and the one-line explanation shown under it.

**Edge cases and rules:** what happens with zero, blank or out-of-range inputs (show a clear message, never "Infinity" or "NaN"), plus any warnings or thresholds.

**Constraints:**
- Plain HTML, CSS and JavaScript, with no outside libraries.
- One screen that works on a phone.
- Example data pre-filled and labeled as examples.
- No real company data, no passwords and no API keys anywhere in the files.

**Files:** index.html (page), style.css (look), app.js (calculations), README.md (what it is and how to open it).

**Acceptance checks:** 3 to 5 checks, each with inputs and an expected result someone can test by hand, for example: "With the default inputs, LTV shows $1,176."

**Before writing code:** show a plan and file list and wait for my OK.

## Rules

- Don't invent features the user didn't ask for. List ideas under "Later" at the end instead.
- Don't include client names, real data or anything confidential in the spec.`;

// Skill gallery: example skills for MBA work. Each becomes a card and a starter prompt.
// Descriptions stay under 200 characters and say "Use when…" (tools/make-m5-files.js checks that).
const M5_GALLERY = [
  { name: "case-memo-writer", goodFor: "Core classes, case competitions",
    description: "Writes a one-page case memo: situation, issue, options, recommendation, risks. Use when asked for a case memo, case write-up or case prep.",
    steps: "Read the case and exhibits → ask which question the memo answers → write one page, using only the case's numbers" },
  { name: "deck-feedback", goodFor: "Team projects, pitch practice",
    description: "Reviews a slide deck for storyline, one message per slide and numbers that match. Use when asked for feedback on a deck, slides or a pitch.",
    steps: "Write each slide's message in one line → flag slides with no clear message or numbers that don't match → list the top 3 fixes" },
  { name: "weekly-update", goodFor: "Internships, club leadership",
    description: "Turns rough notes into a weekly update: wins, numbers, blockers, asks. Use when asked for a weekly update, status report or check-in note.",
    steps: "Sort the notes into wins, numbers, blockers and asks → ask for any missing number → keep it under 150 words, asks last" },
  { name: "meeting-notes", goodFor: "Team meetings, project check-ins",
    description: "Turns a transcript or rough notes into decisions, owners, due dates and open questions. Use when asked for meeting notes, minutes or action items.",
    steps: "Pull out every decision and action → give each action an owner and a date, or mark it missing → list open questions last" },
  { name: "coffee-chat-prep", goodFor: "Recruiting, networking",
    description: "Prepares a networking chat: the company, the person's public role, 5 questions, a thank-you note. Use when asked to prep for a coffee chat or informational interview.",
    steps: "Summarize the company and the person's public role → write 5 questions their website doesn't answer → draft a 3-line thank-you" },
  { name: "model-review", goodFor: "Finance classes, internships",
    description: "Checks a spreadsheet model for hard-coded numbers, broken formulas and mixed units. Use when asked to review, check or audit a model or spreadsheet.",
    steps: "List the inputs and where each is used → flag hard-coded numbers, errors and unit mix-ups → recompute one key output by hand" }
];
window.AIB_MODULES["m5"] = {
  id: "m5",
  title: "Skills",
  level: "Builds on Module 4",

  goal: "Learn to turn a task you repeat into a reusable skill.",
  outcomes: ["Compare prompt, project and skill", "Write a description that triggers", "Build and test a skill", "Write your build spec"],

  budget: { read: 5, do: 23, check: 2 },

  before: {
    needs: [
      "**prototype.html** from Module 4, in your **ai-basics** folder.",
      "**Skills** in Claude: look under **Customize → Skills** (some accounts show it under Settings → Capabilities). Not there? See *Stuck?* below.",
      "To save spec.md straight into your ai-basics folder, use the desktop app with that folder shared, as in Module 3."
    ],
    catchUp: { text: "Missed Module 4? Download the example prototype and save it in your ai-basics folder as `prototype.html`.", label: "Get the example prototype (.html)", url: "assets/files/m4/prototype-example.html" }
  },

  breakdown: {
    key: "A prompt helps once. A project helps with one piece of work. A skill helps with one kind of task, in any chat.",
    // Plain-language definitions, shown right under the key line (same as Module 4)
    defs: [
      { term: "A skill", text: "is a saved how-to for one kind of task. Think of a recipe box: Claude reads only the titles on the cards, and pulls out the full recipe when your request matches." },
      { term: "What's in it", text: "A folder with one required file, **SKILL.md**: a name, a short description of when to use it, and the steps. It can also hold templates, examples or scripts. You can read every line." },
      { term: "Not a saved prompt", text: "A saved prompt waits for you to paste it. A skill turns on by itself when a request matches, works in any chat or project, and can carry its own files." }
    ],
    // text can be one paragraph or a list of short bullets (same style as Modules 1-4)
    concepts: [
      { title: "The description is the trigger",
        text: ["Claude reads only names and descriptions until a task matches", "Say what it does *and* when: \"Use when…\"", "200 characters at most"] },
      { title: "Good candidates",
        text: ["Tasks you repeat in the same format", "Build specs, case memos, weekly updates", "Pasted the same instructions three times? Make it a skill"] },
      { title: "Steps, not essays",
        text: ["Numbered steps and an output format", "Say what to ask when something is missing", "Short enough to read in a minute"] },
      { title: "Test it like a product",
        text: ["Start a new chat and don't name the skill", "Ask \"Which skills did you use?\"", "It missed? Fix the skill, not just that answer"] }
    ],
    // top: true puts the drawing under the key line (each module's "picture"); the table stays after the cards
    figure: { top: true, wide: true, image: "assets/img/m5-skill-anatomy.svg",
      alt: "Diagram. Left: a SKILL.md file with a name (build-spec-writer), a description (Turns a prototype into a one-page build spec. Use when asked for a build spec.) and three steps. Right: 1, you ask for a build spec; 2, Claude reads only the names and descriptions of your skills; 3, when one matches, it opens SKILL.md and follows the steps.",
      caption: "**Left:** the skill you'll build in this module. **Right:** how Claude uses it. It reads only the name and description at first, so the description decides whether the skill is used at all." },
    // "Which one?" table, same format as Module 4
    compare: { caption: "Which one?", head: ["", "Prompt", "Project", "Skill"], rows: [
      ["Helps with", "One request", "One piece of work", "One kind of task, in any chat"],
      ["Where it lives", "Your message", "The project's instructions and files", "Your skills (Customize → Skills)"],
      ["When it applies", "Only that message", "Every chat in that project", "Whenever a request matches its description"],
      ["Use it when", "It's a one-off", "You'll come back to the same work", "You do the same kind of task again and again"]
    ]}
  },

  // Skills you could build: a gallery of examples, the full reference skill, and starter prompts
  frameworks: {
    title: "Skills you could build",
    intro: "Six skills for tasks MBA students repeat. Each one is just a name, a description and a few steps. Pick the one closest to your own work; Exercise A builds a seventh, the build-spec writer.",
    cards: M5_GALLERY.map(g => ({ name: g.name, goodFor: g.goodFor,
      parts: [["Description", "\"" + g.description + "\""], ["Steps", g.steps]] })),
    note: { label: "You've already used skills", points: [
      "When Claude creates a Word, Excel, PowerPoint or PDF file for you, it uses Anthropic's built-in skills for those formats.",
      "Your own skills work the same way, and sit next to those under **Customize → Skills**."
    ]},
    reference: { title: "See a whole skill: the reference SKILL.md", text: M5_SKILL,
      url: "assets/files/m5/build-spec-writer/SKILL.md", label: "Download SKILL.md" },
    sample: {
      title: "Build one of these: copy a starter prompt",
      task: "Optional, after Exercise A. Claude interviews you about your format, writes the SKILL.md and packages it so you can save it. Then test it in a new chat without naming it.",
      items: M5_GALLERY.map(g => ({ name: g.name,
        prompt: "I want to create a skill called **" + g.name + "**.\nDescription: " + g.description +
          "\nInterview me with up to 3 questions, one at a time, about the format I need.\nThen write the complete SKILL.md (name, description under 200 characters, numbered steps, output format) and package it so I can save it to my skills." }))
    }
  },

  // One example per key-ideas card, same format as Module 4 (idea tag, coloured parts, "You get" lines, guess first)
  examplesIntro: "Read each weak version and guess what's missing. Then open **What changed?** to check.",
  examplesGuess: true,
  examples: [
    { title: "Your skill's description", idea: "The description is the trigger",
      weak: "description: spec writer",
      strong: "description: [[What it does::Turns a prototype or tool idea into a one-page build spec for Claude Code.]] [[When::Use when asked for a build spec or spec.md,]] [[Words people use::or to get a prototype ready to build as a real app.]]",
      gets: { weak: "Claude can't tell when to use it, so it rarely does.",
              strong: "The skill kicks in whenever someone asks for a build spec, in their own words." },
      why: "Claude decides whether to use a skill from its description alone. This one names the input (a prototype), the output (a build spec) and the words people actually use, in 170 characters. It's the skill you'll build in Exercise A." },
    { title: "What to turn into a skill", idea: "Good candidates", labels: ["Weak candidate", "Strong candidate"], noCopy: true,
      weak: "A skill to plan my spring-break trip.",
      strong: "A skill for [[Repeats::every Friday:]] [[Same format::turn my notes into a weekly update with wins, numbers, blockers and asks.]]",
      gets: { weak: "A skill you use once. A good prompt would have done the job.",
              strong: "A skill that saves you time every week, in the same format each time." },
      why: "A skill pays off when the task comes back and the format stays the same. One-off tasks need a good prompt, not a skill." },
    { title: "The skill's instructions", idea: "Steps, not essays",
      weak: "You are an expert spec writer with years of experience. Write great, thorough, professional specs that impress readers.",
      strong: "[[Steps::1. Read the prototype. 2. If something is missing, ask at most 3 questions. 3. Write the spec in the format below.]] [[Format::Format: Who it's for · What it does · Inputs · Outputs · Acceptance checks.]] [[Done::End with \"Before writing code: show a plan and wait for my OK.\"]]",
      gets: { weak: "A different spec every time, as long or as short as Claude decides.",
              strong: "The same one-page spec every time, ready for Claude Code." },
      why: "Praise and adjectives don't tell Claude what to do. Numbered steps, an output format and a clear end point do, and they're short enough to read in a minute." },
    { title: "Testing your skill", idea: "Test it like a product", labels: ["Weak test", "Strong test"],
      weak: "Use build-spec-writer to write a spec for this prototype.",
      strong: "[[New chat::In a new chat:]] [[Your own words::\"Write a build spec for this prototype.\"]] [[Check::Then: \"Which skills did you use?\"]]",
      gets: { weak: "It works because you named the skill, so you learn nothing about the description.",
              strong: "You see whether the description triggers on its own, the way it will when you're busy." },
      why: "Test it the way you'll really use it: in a fresh chat, in your own words, without naming the skill. If it doesn't trigger, add the words you used to the description." }
  ],

  // {group: "..."} = an unnumbered heading row; keep its minutes in line with the exercises below
  steps: [
    { group: "Exercise A · ~10 min" },
    { title: "Check Skills is ready", text: "Open **Customize → Skills**. Skills also need **code execution** switched on, under **Settings → Capabilities**." },
    { title: "Draft it with Claude", text: "Send Exercise A's prompt and answer Claude's questions, one at a time." },
    { title: "Read every line", text: "Check the description is under 200 characters and says \"Use when…\", the steps are numbered, and the output format is there. Ask Claude to fix anything that's off." },
    { title: "Save it and turn it on", text: "Use Claude's offer to save it, or download the zip and upload it under **Customize → Skills → + → Create skill → Upload a skill**. Make sure its toggle is on: a skill that's off is never used.",
      shot: { image: "assets/img/m5-skills-page.svg", caption: "Illustration. Your screen may look slightly different.",
              alt: "Illustration of the Skills page under Customize. 1: the plus button opens Create skill, with Upload a skill highlighted. 2: the build-spec-writer skill in the list, with its toggle switched on." } },
    { group: "Exercise B · ~8 min" },
    { title: "Start a new chat", text: "Attach `prototype.html`, or use the desktop app with your **ai-basics** folder shared." },
    { title: "Ask in your own words", text: "Ask for a build spec the way you normally would. **Don't name the skill.**" },
    { title: "Check it triggered", text: "Ask **\"Which skills did you use?\"** Your skill's name in the answer means the description worked.",
      shot: { image: "assets/img/m5-which-skills.svg", caption: "Illustration. Claude's wording will differ.",
              alt: "Illustration of a chat. You ask: Which skills did you use? Claude answers: I used one skill, build-spec-writer. I read the prototype, asked who will read the spec, then wrote spec.md in the skill's format, ending with the acceptance checks." } },
    { title: "Fix one line", text: "It didn't trigger, or missed something? Change the description or one step, save, and test again in a **new chat**." },
    { title: "Save spec.md", text: "Save it in your **ai-basics** folder. Module 7 starts from it." }
  ],
  // A worked test run, step by step (same widget as Module 4's "Watch a build")
  stepsDemo: {
    title: "Watch a test: it misses, then triggers",
    turns: [
      { who: "you", text: "Turn this prototype into a doc a developer can build from.",
        note: "**Round 1 · Your own words.** A new chat, `prototype.html` attached, and the skill not named." },
      { who: "claude", text: "Here's a developer handoff document: an overview of the tool, its main features and some suggested next steps.",
        note: "A generic document, not your one-page spec format." },
      { who: "you", text: "Which skills did you use?",
        note: "**Check.** Ask every time, even when the answer looks fine." },
      { who: "claude", text: "I didn't use any skills for this one.",
        note: "**Fix one line.** Your words were \"a doc a developer can build from\". Add them to the skill's description, keep it under 200 characters, and save." },
      { who: "you", text: "Turn this prototype into a doc a developer can build from.",
        note: "**Round 2 · Test again in a new chat.** A chat that's already open won't pick up the change." },
      { who: "claude", text: "Here's spec.md, written with your build-spec-writer skill: who it's for, what it does, inputs, outputs, edge cases, constraints, files and acceptance checks.",
        note: "It triggered. Check every acceptance check has a number you can test, then save `spec.md` (step 9)." }
    ]
  },
  tip: "If a skill doesn't kick in, add the exact words you used to its description (\"build spec\", \"spec.md\", \"ready to build\"). Then start a **new chat**: one that's already open won't pick up the change.",
  transfer: "Skills are an open standard: the same SKILL.md also works in other AI tools, such as ChatGPT, GitHub Copilot and Cursor.",

  exercises: [
    {
      title: "A · Build your build-spec-writer skill",
      where: "Claude chat",
      minutes: 10,
      // intro / deliverable / stretch: a sentence, a list of bullets, or {text, points}
      intro: { text: "Build the skill with Claude, then read it before you trust it.", points: [
        "Send the prompt below and answer Claude's questions, one at a time",
        "**Read every line** of the SKILL.md it writes, and ask Claude to fix anything that's off",
        "Save it to your skills and check its toggle is on"
      ]},
      files: [
        { label: "Reference SKILL.md", url: "assets/files/m5/build-spec-writer/SKILL.md" },
        { label: "Reference skill (.zip, ready to upload)", url: "assets/files/m5/build-spec-writer.zip" }
      ],
      promptLabel: "Copy this prompt",
      // parts: what the skill is, how Claude should interview you, and each part of the SKILL.md
      prompt: "[[Name::I want to create a skill called build-spec-writer.]] [[What it does::It turns a prototype (an HTML file or an artifact) into a one-page build spec for Claude Code.]]\n[[Interview::Interview me with up to 4 questions, one at a time, about who reads the spec and what it must include.]]\nThen write the complete SKILL.md:\n[[Description::- a name, and a description under 200 characters that says what it does and when to use it (\"Use when…\")]]\n[[Steps::- numbered steps: read the prototype, ask at most 3 questions if something is missing, write the spec, save it as spec.md]]\n[[Format::- this output format, in this order:\nWho it's for · What it does (one sentence)\nInputs (name, unit, default, valid range) · Outputs (how each is calculated)\nEdge cases and rules\nConstraints (plain HTML/CSS/JS, no outside libraries, works on a phone, example data labeled, no real data, passwords or keys)\nFiles (index.html, style.css, app.js, README.md)\nAcceptance checks with expected numbers\nLast line: \"Before writing code: show a plan and file list and wait for my OK.\"]]\n[[Package::Package it so I can save it to my skills.]]",
      help: { title: "Can't create a skill, or short on time?",
        text: "Upload the reference skill as it is: download the **.zip** above and upload it under **Customize → Skills → + → Create skill → Upload a skill**. Then open the reference **SKILL.md** and read every line, so you know what it does.\n\nNo Skills at all? See *Stuck?* below." },
      deliverable: { text: "In **Customize → Skills**:", points: [
        "Your **build-spec-writer** skill, saved",
        "Its toggle is on",
        "A description under 200 characters that says \"Use when…\""
      ]},
      reveal: {
        title: "Check your skill (open it after you've saved yours)",
        text: "**The description says what and when:** under 200 characters, with \"Use when…\" and the words you'd actually type (\"build spec\", \"spec.md\").\n**The steps are numbered:** read the prototype, ask at most 3 questions, write the spec, save it.\n**The format is complete:** it ends with acceptance checks and the line \"show a plan and file list and wait for my OK.\"\n**It's general:** no client names, real data, passwords or keys.\n**It's on:** its toggle in Customize → Skills."
      }
    },
    {
      title: "B · Test it and write your spec",
      where: "A new Claude chat",
      minutes: 8,
      intro: { text: "Test the skill the way you'll really use it.", points: [
        "Start a **new chat** and attach `prototype.html` (or use the desktop app with your ai-basics folder shared)",
        "Send the prompt below. **Don't name the skill**",
        "Ask **\"Which skills did you use?\"**",
        "It didn't trigger? Add the words you used to its description, save, and try again in another new chat"
      ]},
      promptLabel: "Copy this prompt",
      prompt: "Write a build spec for this prototype and save it as spec.md.",
      deliverable: { text: "Save in your **ai-basics** folder (Module 7 starts from it):", points: [
        "`spec.md`",
        "A note: did the skill trigger on the first try?",
        "If you fixed it: the words you added to the description"
      ]},
      stretch: { text: "Pick one:", points: [
        "Test it with different wording, for example *\"Turn this into a doc a developer can build from.\"* Did it still trigger?",
        "Build a second skill for a task you repeat, from the starter prompts in **Skills you could build**"
      ]},
      // The example spec and its prototype are a unit-economics calculator (also used in Modules 7-8)
      files: [
        { label: "Example spec, unit-economics calculator (.md)", url: "assets/files/m5/spec-example-unit-economics.md" },
        { label: "Its prototype (.html)", url: "assets/files/m5/prototype-example-unit-economics.html" }
      ],
      goodLooksLike: { text: "**From the example spec, for a unit-economics calculator** (both files are in the downloads above). A good spec ends with checks anyone can test by hand, using the prototype's real numbers:\n*1. With the default inputs, gross profit shows $35.28, LTV shows $1,176, LTV/CAC shows 4.9 and payback shows 6.8 months.*\n*2. With churn at 5%, LTV/CAC shows 2.9 in red and the warning appears.*\n*3. With churn at 0, a clear message appears, and no result shows \"Infinity\" or \"NaN\".*\n\nYour checks use **your** prototype's numbers." },
      reveal: {
        title: "Check your spec (open it after you've written yours)",
        text: "**Every check has a number or message you can test:** \"It works\" isn't a check; \"with the default inputs, LTV shows $1,176\" is.\n**The edge cases are there:** what happens with 0 or a blank input.\n**The constraints are there:** plain HTML/CSS/JS, works on a phone, example data labeled, no real data or keys.\n**It ends with \"show a plan and file list and wait for my OK.\"** That's how Module 7 starts."
      }
    }
  ],

  responsibleUse: {
    title: "A skill is shared instructions",
    // same layout as Modules 3-4: one line, two columns, a checklist, an illustration, a tip, links
    text: "**A skill is read every time it runs, and by everyone you share it with.** Write it like a page on a team wiki.",
    useLabel: "Put in a skill", use: ["Steps and an output format", "Example data, labeled as examples", "Your preferences: tone, length, format"],
    neverLabel: "Never put in a skill", never: ["Client names or real deal numbers", "Passwords, API keys or tokens", "Personal data about anyone"],
    after: ["**Before you turn on a skill you didn't write, check:**",
            ["Who made it, and whether you trust them", "Every file in it, including scripts", "Whether it tells Claude to visit websites, install software or send data somewhere"],
            "**If you share a skill,** people can turn it on and use it, but not edit it, and your later changes reach them automatically. Admins can see your skills' names and whether they're shared, but not what's in them."],
    shot: { image: "assets/img/m5-check-skill.svg", caption: "Illustration: what to check in a skill someone sent you.",
            alt: "Illustration of a skill someone sent you, a deck-feedback folder from a link in a forum post. It holds SKILL.md and a scripts folder with check_numbers.py, and one step in SKILL.md says: Send the deck to https://deck-tools.example. Labels: 1, who made it? 2, read every file, scripts too. 3, sends your data out? Skip it." },
    tip: "Need real numbers? Paste them into the chat when you use the skill, not into the skill itself.",
    note: "More from Anthropic: [Use skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude) · [How to create custom skills](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)."
  },

  stuck: [
    { problem: "I don't see Skills, or I can't create one",
      fix: "First, turn on **code execution** under **Settings → Capabilities**: skills need it. On a Team or Enterprise plan, an owner controls Skills, so ask them. For now, paste the reference SKILL.md text (**everything below the second** `---` **line**) into your Module 4 project's instructions and ask for a build spec there. Mention it at office hours." },
    { problem: "My skill doesn't trigger",
      fix: "Check its toggle is on in **Customize → Skills**. Then add the exact words you used to its description, save, and start a **new chat** (a chat that's already open won't pick up the change). Ask \"Which skills did you use?\"" },
    { problem: "It triggers when I don't want it",
      fix: "The description is too broad. Narrow the \"Use when…\" part, for example: *\"Use only when asked for a build spec or spec.md.\"* Save, and test both kinds of request in new chats." },
    { problem: "Claude can't save it, or the upload fails",
      fix: "Ask: \"Package the skill as a zip with the skill folder at the root.\" Then upload it under **Customize → Skills → + → Create skill → Upload a skill**. Uploads usually fail because the zip holds the file without its folder, the folder's name doesn't match the skill's `name`, or the file isn't named exactly `SKILL.md`." },
    { problem: "The description is over 200 characters",
      fix: "Ask Claude to shorten it to under 200 characters and keep the \"Use when…\" part. What it does and when to use it matter more than how." },
    { problem: "Claude can't see my prototype",
      fix: "Attach the `.html` file itself, not a link, or use the desktop app with your **ai-basics** folder shared. No prototype? Download the example in *Before you start*." },
    { problem: "My spec is vague, or skips a step",
      fix: "Ask: \"Rewrite the acceptance checks so each one has inputs and an expected number I can test by hand.\" If that keeps happening, make the missing part a numbered step in the skill, save, and test again in a new chat." }
  ],

  resources: [
    // grouped like Module 4; all links checked Nov 19, 2026
    { group: "Start here", source: "Claude Help Center", type: "Help article",
      label: "What are skills?", url: "https://support.claude.com/en/articles/12512176-what-are-skills" },
    { group: "Start here", source: "Claude Help Center", type: "Help article",
      label: "Use skills in Claude", url: "https://support.claude.com/en/articles/12512180-use-skills-in-claude" },
    { group: "Claude how-to", source: "Claude Help Center", type: "Help article",
      label: "How to create custom skills", url: "https://support.claude.com/en/articles/12512198-how-to-create-custom-skills" },
    { group: "Claude how-to", source: "Claude Help Center", type: "Help article",
      label: "Provision and manage skills for your organization (Team and Enterprise)", url: "https://support.claude.com/en/articles/13119606-provisioning-and-managing-skills-for-your-organization" },
    { group: "Learn more", source: "Claude Academy", type: "Tutorial",
      label: "How to create a skill with Claude through conversation", url: "https://academy.claude.com/tutorials/how-to-create-a-skill-with-claude-through-conversation" },
    { group: "Learn more", source: "Claude Academy", type: "Tutorial",
      label: "Teach Claude your way of working using skills", url: "https://academy.claude.com/tutorials/teach-claude-your-way-of-working-using-skills" },
    { group: "Learn more", source: "Anthropic Academy", type: "Free course",
      label: "Introduction to agent skills (in Claude Code, a preview of Module 7)", url: "https://anthropic.skilljar.com/introduction-to-agent-skills" },
    { group: "Learn more", source: "Anthropic", type: "Announcement",
      label: "Introducing Agent Skills", url: "https://www.anthropic.com/news/skills" },
    { group: "Examples and the open standard", source: "GitHub: anthropics/skills", type: "Examples",
      label: "Example skills, including Word, Excel, PowerPoint and PDF", url: "https://github.com/anthropics/skills" },
    { group: "Examples and the open standard", source: "Anthropic Engineering", type: "Article",
      label: "Equipping agents for the real world with Agent Skills", url: "https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills" },
    { group: "Examples and the open standard", source: "agentskills.io", type: "Open standard",
      label: "Agent Skills specification", url: "https://agentskills.io" }
  ]
};
