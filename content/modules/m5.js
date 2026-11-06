/* ==========================================================================
   Module 5 · Skills (build-spec writer, Option A)
   Spec: AI_Basics_Lab_Revision_Plan.md, "Module 5 · Skills" (Option A, decided Nov 3, 2026)
   Files: assets/files/m5/ (reference skill, upload zip, example spec), checked and
   packaged by tools/make-m5-files.js.
   Status: draft, awaiting timed test run (Nov 3, 2026)
   ========================================================================== */
window.AIB_MODULES = window.AIB_MODULES || {};
window.AIB_MODULES["m5"] = {
  id: "m5",
  title: "Skills",
  level: "Builds on Module 4",

  goal: "Turn a task you repeat into a skill Claude uses automatically, then use it to write the build spec for the real app you'll build in Module 7.",
  outcomes: ["Explain prompt vs. project vs. skill", "Write a description that triggers", "Build and test a skill", "Produce your build spec"],

  budget: { read: 5, do: 21, check: 4 },

  before: {
    needs: [
      "**prototype.html** from Module 4, in your **ai-basics** folder.",
      "**Skills** in Claude: look under **Customize → Skills** (some accounts show it under Settings → Capabilities). Not there? See *Stuck?* below.",
      "To save spec.md straight into your ai-basics folder, use the desktop app with that folder shared, as in Module 3."
    ],
    catchUp: { text: "Missed Module 4? Download the example prototype and save it in your ai-basics folder as `prototype.html`.", label: "Get the example prototype (.html)", url: "assets/files/m4/prototype-example.html" }
  },

  breakdown: {
    key: "A prompt helps once. A project helps one piece of work. A skill helps with one kind of task, everywhere.",
    concepts: [
      { title: "What a skill is",
        text: "A standard operating procedure for Claude: a short file called **SKILL.md** with a name, a description of when to use it, and the steps to follow." },
      { title: "The description is the trigger",
        text: "Claude reads only each skill's name and description (200 characters at most) until a task matches. Say what the skill does *and* when to use it." },
      { title: "Good candidates",
        text: "Tasks you repeat with a consistent format: build specs, case memos, weekly updates, meeting notes, feedback on decks." },
      { title: "Test it like a product",
        text: "Try it in a new chat without naming it. If the result misses, fix the skill's instructions, not just that one output." }
    ],
    compare: { head: ["", "Prompt", "Project", "Skill"], rows: [
      ["Helps with", "One request", "One piece of work", "One kind of task, everywhere"],
      ["Where it lives", "Your message", "The project's instructions and files", "Your skills library (Customize → Skills)"],
      ["When it applies", "Only that message", "Every chat in that project", "Whenever a task matches its description"]
    ]}
  },

  examples: [
    { title: "The description is the trigger",
      weak: "description: memo helper",
      strong: "description: Writes a one-page case memo (situation, issue, options, recommendation, risks). Use when asked for a case memo or case write-up.",
      why: "Claude decides whether to use a skill from its description alone, so it has to say what the skill does and when." },
    { title: "Your skill's description",
      weak: "description: spec writer",
      strong: "description: Turns a prototype or tool idea into a one-page build spec for Claude Code. Use when asked for a build spec or spec.md, or to get a prototype ready to build as a real app.",
      why: "It names the input (a prototype), the output (a build spec) and the words people actually use (\"build spec\", \"spec.md\", \"ready to build\") in 170 characters." }
  ],

  steps: [
    { title: "Draft the skill with Claude", text: "Send Exercise A's prompt and answer the questions, one at a time." },
    { title: "Save it", text: "Use Claude's offer to save it to your skills, or download the zip and upload it under **Customize → Skills → + → Create skill → Upload a skill**." },
    { title: "Test it without naming it", text: "In a new chat, ask for a build spec in your own words. Then ask \"Which skills did you use?\"" },
    { title: "Fix one line", text: "If it didn't trigger or missed something, change the description or the steps, save, and test again." }
  ],
  tip: "If a skill doesn't kick in, add the exact words people use for that task to its description (\"build spec\", \"spec.md\", \"ready to build\").",
  transfer: "Custom GPTs in ChatGPT and agents in Microsoft Copilot work the same way: written instructions, picked up when a request matches their description.",

  exercises: [
    {
      title: "A · Build your build-spec-writer skill",
      where: "Claude chat",
      minutes: 10,
      intro: "Send the prompt and answer Claude's questions. **Read every line** of the SKILL.md it writes, then save it to your skills. Short on time, or Skills won't let you create one? Upload the reference skill below as is (the .zip), and look at what's in it.",
      files: [
        { label: "Reference SKILL.md", url: "assets/files/m5/build-spec-writer/SKILL.md" },
        { label: "Reference skill (.zip, ready to upload)", url: "assets/files/m5/build-spec-writer.zip" }
      ],
      promptLabel: "Copy this prompt",
      prompt: "I want to create a skill called build-spec-writer. It turns a prototype (an HTML file or an artifact) into a one-page build spec for Claude Code.\nInterview me with up to 4 questions, one at a time, about who reads the spec and what it must include.\nThen write the complete SKILL.md:\n- a name, and a description under 200 characters that says what it does and when to use it (\"Use when…\")\n- numbered steps: read the prototype, ask at most 3 questions if something is missing, write the spec, save it as spec.md\n- this output format: Who it's for · What it does (one sentence) · Inputs (name, unit, default, valid range) · Outputs (how each is calculated) · Edge cases and rules · Constraints (plain HTML/CSS/JS, no outside libraries, works on a phone, example data labeled, no real data, passwords or keys) · Files (index.html, style.css, app.js, README.md) · Acceptance checks with expected numbers · and the last line \"Before writing code: show a plan and file list and wait for my OK.\"\nPackage it so I can save it to my skills.",
      deliverable: "Your build-spec-writer skill, saved and turned on in your skills."
    },
    {
      title: "B · Test it and write your spec",
      where: "A new Claude chat",
      minutes: 8,
      intro: "Start a **new chat** and attach `prototype.html` (or use the desktop app with your ai-basics folder shared). **Don't name the skill.** Send the prompt, then ask **\"Which skills did you use?\"** If it didn't trigger, fix the description, start another new chat, and try again.",
      promptLabel: "Copy this prompt",
      prompt: "Write a build spec for this prototype and save it as spec.md.",
      deliverable: "`spec.md` in your ai-basics folder, and a note of whether the skill triggered on the first try.",
      stretch: "Sketch a second skill for a task you repeat at work (a weekly update, a case memo, deck feedback). Just the name and a description under 200 characters.",
      files: [
        { label: "Example spec (.md)", url: "assets/files/m5/spec-example-unit-economics.md" }
      ],
      goodLooksLike: { text: "A good spec ends with checks anyone can test by hand, using the prototype's real numbers:\n*1. With the default inputs, gross profit shows $35.28, LTV shows $1,176, LTV/CAC shows 4.9 and payback shows 6.8 months.*\n*2. With churn at 5%, LTV/CAC shows 2.9 in red and the warning appears.*\n*3. With churn at 0, a clear message appears, and no result shows \"Infinity\" or \"NaN\".*" },
      reveal: {
        title: "Check your spec (open it after you've written yours)",
        text: "**Every acceptance check has a number or message you can test.** \"It works\" isn't a check; \"with the default inputs, LTV shows $1,176\" is.\n\n**The edge cases are there.** What happens with 0 or a blank input?\n\n**The constraints are there:** plain HTML/CSS/JS, works on a phone, example data labeled, no real data or keys.\n\n**It ends with \"show a plan and file list and wait for my OK.\"** That's how Module 7 starts.\n\n**The skill triggered without being named.** If you had to name it, the description needs the words you actually used."
      }
    }
  ],

  responsibleUse: {
    title: "A skill is shared instructions",
    rules: [
      "**Keep it general.** Don't bake client names, real data, prices from a real deal, or passwords into a skill. It's used again and again, and may be shared.",
      "**Skills you share, colleagues can read.** Custom skills stay private until you share them; after that, people you share with see every line.",
      "**Only add skills from sources you trust.** A skill can include scripts as well as instructions. Read it before you turn it on."
    ],
    note: "More from Anthropic: [Use skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude)."
  },

  stuck: [
    { problem: "I don't see Skills, or I can't create one",
      fix: "Skills, and creating your own, are switched on by your organization's admins. For now, paste the reference SKILL.md text (without the lines between the `---` markers) into your Module 4 project's instructions and ask for a build spec there. Mention it at office hours." },
    { problem: "My skill doesn't trigger",
      fix: "Add the exact words you used to its description, save, and start a **new chat** (a chat that's already open won't pick up the change). Then ask \"Which skills did you use?\"" },
    { problem: "Claude can't save the skill for me",
      fix: "Ask: \"Package the skill as a zip with the skill folder at the root.\" Download it, then upload it under **Customize → Skills → + → Create skill → Upload a skill**." },
    { problem: "The description is over 200 characters",
      fix: "Ask Claude to shorten it to under 200 characters and keep the \"Use when…\" part. What it does and when to use it matter more than how." },
    { problem: "My spec is vague",
      fix: "Ask: \"Rewrite the acceptance checks so each one has inputs and an expected number I can test by hand.\" If that keeps happening, add the rule to the skill's steps." }
  ],

  checks: [
    { text: "I can explain prompt vs. project vs. skill", evidence: "One sentence each." },
    { text: "My skill's description says what it does and when to use it", evidence: "Read it aloud: under 200 characters, with \"Use when…\"." },
    { text: "My skill triggered in a new chat without me naming it", evidence: "Claude said it used build-spec-writer." },
    { text: "spec.md is saved in my ai-basics folder", evidence: "Module 7 starts from it." }
  ],
  quiz: [
    { q: "Your skill never gets used, even when you ask for exactly that task. What do you check first?",
      options: [
        "Make the skill's instructions longer and more detailed",
        "The description: does it say what the skill does and use the words you used?",
        "Switch to a different model"
      ],
      answer: 1,
      explain: "Claude only reads the description until a task matches. Longer instructions don't help if the skill is never picked up." },
    { q: "Which task is the best candidate for a skill?",
      options: [
        "A one-off thank-you note to a mentor",
        "A weekly client update in a fixed format",
        "Brainstorming names for a new product"
      ],
      answer: 1,
      explain: "Skills pay off on tasks you repeat in a consistent format. One-offs and open brainstorming are better as a prompt." },
    { q: "You're writing a skill for weekly client updates. Which of these should stay OUT of the skill?",
      options: [
        "Your format and tone rules",
        "An example update with made-up content",
        "The current client's name and contract value"
      ],
      answer: 2,
      explain: "A skill is reused and may be shared. Rules and made-up examples belong in it; real client details don't." }
  ],

  resources: [
    { label: "Claude Help Center: Use skills in Claude", url: "https://support.claude.com/en/articles/12512180-use-skills-in-claude" },
    { label: "Claude Help Center: How to create custom skills", url: "https://support.claude.com/en/articles/12512198-how-to-create-custom-skills" },
    { label: "Claude Academy: How to create a skill with Claude through conversation", url: "https://academy.claude.com/tutorials/how-to-create-a-skill-with-claude-through-conversation" }
  ]
};
