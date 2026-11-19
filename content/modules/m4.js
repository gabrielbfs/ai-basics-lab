/* ==========================================================================
   Module 4 · Projects & artifacts (the prototype)
   Spec: AI_Basics_Lab_Revision_Plan.md, "Module 4 · Projects & artifacts"
   Example prototype: assets/files/m4/prototype-example.html, a savings goal planner
   (hand-written; screenshot in assets/img/m4-prototype-example.png).
   Status: revised Nov 5, 2026 (personal example, artifact explained, build-break-improve)
   ========================================================================== */
window.AIB_MODULES = window.AIB_MODULES || {};

/* A simplified drawing of the Claude window: chat on the left, artifact panel on the right.
   Colors come from site.css (.dg-*), so it follows light and dark mode. */
const M4_SCREEN = '<svg viewBox="0 0 972 292" role="img" aria-labelledby="m4-dg-t m4-dg-d" xmlns="http://www.w3.org/2000/svg">' +
  '<title id="m4-dg-t">A project, and where an artifact appears</title>' +
  '<desc id="m4-dg-d">On the far left, a project called Savings planner holds three things: instructions (I am an MBA student building a planner), files (inputs.xlsx and brief.docx) and chats (Build the planner, Add a chart). An arrow leads from the project to a simplified Claude window. On the left, the chat: you ask for a savings planner as an artifact, Claude replies, and a card links to the artifact. On the right, the artifact opens in its own panel: a working savings planner with inputs and results, and controls at the top to view the code, copy, download or share it.</desc>' +
  // project panel (left): what a project holds
  '<rect class="dg-frame" x="1" y="1" width="220" height="290" rx="12"/>' +
  '<text class="dg-h" x="16" y="26">Project</text><text class="dg-s" x="16" y="43">Savings planner</text>' +
  '<text class="dg-a" x="16" y="70">Instructions</text>' +
  '<rect class="dg-card" x="12" y="78" width="196" height="44" rx="8"/>' +
  '<text class="dg-s" x="22" y="96">I\'m an MBA student building</text><text class="dg-s" x="22" y="112">a savings goal planner…</text>' +
  '<text class="dg-a" x="16" y="146">Files</text>' +
  '<rect class="dg-btn" x="12" y="154" width="196" height="24" rx="6"/><text class="dg-s" x="22" y="170">inputs.xlsx</text>' +
  '<rect class="dg-btn" x="12" y="182" width="196" height="24" rx="6"/><text class="dg-s" x="22" y="198">brief.docx</text>' +
  '<text class="dg-a" x="16" y="230">Chats</text>' +
  '<rect class="dg-you" x="12" y="238" width="196" height="22" rx="6"/><text class="dg-s" x="22" y="253">Build the planner</text>' +
  '<rect class="dg-btn" x="12" y="264" width="196" height="22" rx="6"/><text class="dg-s" x="22" y="279">Add a chart</text>' +
  '<path d="M208 249h26" style="stroke:var(--navy);stroke-width:2;fill:none"/>' +
  '<path d="M228 243l7 6-7 6" style="stroke:var(--navy);stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round"/>' +
  // the Claude window (right), shifted to make room for the project panel
  '<g transform="translate(252 0)">' +
  '<rect class="dg-frame" x="1" y="1" width="718" height="290" rx="12"/>' +
  '<circle class="dg-btn" cx="20" cy="16" r="5"/><circle class="dg-btn" cx="36" cy="16" r="5"/><circle class="dg-btn" cx="52" cy="16" r="5"/>' +
  // chat pane
  '<rect class="dg-pane" x="16" y="34" width="270" height="244" rx="8"/>' +
  '<text class="dg-h" x="30" y="56">Chat</text>' +
  '<circle class="dg-dot" cx="268" cy="51" r="10"/><text class="dg-n" x="268" y="55" text-anchor="middle">1</text>' +
  '<rect class="dg-you" x="96" y="68" width="178" height="44" rx="10"/>' +
  '<text class="dg-t" x="108" y="86">Build a savings planner</text><text class="dg-t" x="108" y="103">as an artifact.</text>' +
  '<rect class="dg-bubble" x="28" y="122" width="214" height="44" rx="10"/>' +
  '<text class="dg-t" x="40" y="140">Here it is. Try the inputs</text><text class="dg-t" x="40" y="157">and tell me what to change.</text>' +
  '<rect class="dg-card" x="28" y="176" width="214" height="44" rx="8"/>' +
  '<text class="dg-t" x="40" y="194">Savings goal planner</text><text class="dg-s" x="40" y="210">Artifact · click to open</text>' +
  '<rect class="dg-btn" x="28" y="238" width="246" height="28" rx="14"/><text class="dg-s" x="44" y="256">Reply…</text>' +
  // artifact pane
  '<rect class="dg-art" x="300" y="34" width="404" height="244" rx="8"/>' +
  '<text class="dg-h" x="314" y="58">Savings goal planner</text>' +
  '<circle class="dg-dot" cx="472" cy="53" r="10"/><text class="dg-n" x="472" y="57" text-anchor="middle">3</text>' +
  '<rect class="dg-btn" x="490" y="42" width="44" height="22" rx="5"/><text class="dg-s" x="512" y="57" text-anchor="middle">Code</text>' +
  '<rect class="dg-btn" x="538" y="42" width="44" height="22" rx="5"/><text class="dg-s" x="560" y="57" text-anchor="middle">Copy</text>' +
  '<rect class="dg-btn" x="586" y="42" width="62" height="22" rx="5"/><text class="dg-s" x="617" y="57" text-anchor="middle">Download</text>' +
  '<rect class="dg-btn" x="652" y="42" width="44" height="22" rx="5"/><text class="dg-s" x="674" y="57" text-anchor="middle">Share</text>' +
  '<line class="dg-line" x1="300" y1="72" x2="704" y2="72" style="stroke:var(--line);stroke-width:1"/>' +
  '<circle class="dg-dot" cx="688" cy="90" r="10"/><text class="dg-n" x="688" y="94" text-anchor="middle">2</text>' +
  '<rect class="dg-btn" x="314" y="102" width="180" height="28" rx="6"/><text class="dg-s" x="324" y="120">Savings goal   $8,000</text>' +
  '<rect class="dg-btn" x="506" y="102" width="180" height="28" rx="6"/><text class="dg-s" x="516" y="120">Already saved   $1,000</text>' +
  '<rect class="dg-btn" x="314" y="138" width="180" height="28" rx="6"/><text class="dg-s" x="324" y="156">Monthly saving   $400</text>' +
  '<rect class="dg-btn" x="506" y="138" width="180" height="28" rx="6"/><text class="dg-s" x="516" y="156">Interest rate   4%</text>' +
  '<rect class="dg-card" x="314" y="180" width="86" height="82" rx="8"/><text class="dg-s" x="324" y="200">To goal</text><text class="dg-h" x="324" y="226">17 mo</text>' +
  '<rect class="dg-card" x="408" y="180" width="86" height="82" rx="8"/><text class="dg-s" x="418" y="200">You put in</text><text class="dg-h" x="418" y="226">$7,800</text>' +
  '<rect class="dg-card" x="502" y="180" width="86" height="82" rx="8"/><text class="dg-s" x="512" y="200">Interest</text><text class="dg-h" x="512" y="226">$243</text>' +
  '<rect class="dg-card" x="596" y="180" width="90" height="82" rx="8"/><text class="dg-s" x="606" y="200">+$100/month</text><text class="dg-h" x="606" y="226">3 mo</text>' +
  '<text class="dg-s" x="324" y="248">months</text><text class="dg-s" x="418" y="248">total</text><text class="dg-s" x="512" y="248">earned</text><text class="dg-s" x="606" y="248">sooner</text>' +
  "</g></svg>";

window.AIB_MODULES["m4"] = {
  id: "m4",
  title: "Projects & Artifacts",
  level: "Builds on Modules 1–3",

  goal: "Learn to keep your context in a project and build a prototype.",
  outcomes: ["Set up a project", "Build a working prototype", "Test and improve it twice", "Know what sharing exposes"],

  budget: { read: 5, do: 23, check: 2 },

  before: {
    needs: [
      "Your 3-sentence project idea from Module 1.",
      { text: "**inputs.xlsx** and **brief.docx** from Module 3, in your **ai-basics** folder.",
        ifNot: "Missing them? Do [Module 3, Exercise B](m03-asking-vs-delegating.html#s-exercise) first (13 min)." },
      "Claude open in the browser or the desktop app."
    ]
  },

  breakdown: {
    key: "A project remembers your context. An artifact is something you can use outside the chat.",
    // Plain-language definitions, shown right under the key line
    defs: [
      { term: "A project", text: "is like a binder for one piece of work: your standing instructions, your files and every chat about it, in one place. Each new chat in it starts already knowing your context." },
      { term: "An artifact", text: "is something Claude builds that you can use on its own: a document, a chart or a small app. It opens beside the chat, and you can keep it, download it or share it." }
    ],
    // text can be one paragraph or a list of short bullets (same style as Modules 1-3)
    concepts: [
      { title: "Set up a project",
        text: ["A workspace with its own instructions and files", "Every new chat starts with that context", "You stop re-explaining"] },
      { title: "Write the instructions once",
        text: ["Who you are and what you're building", "How you want answers", "Claude keeps forgetting something? Put it here"] },
      { title: "Make an artifact",
        text: ["A document, chart or small tool", "Opens in a panel beside the chat", "Try it, then copy, download or share it"] },
      { title: "Change one thing at a time",
        text: ["\"Show a message when the monthly saving is 0.\"", "\"Make it fit on a phone.\"", "Test again after each change"] }
    ],
    // top: true puts the drawing under the key line (each module's "picture"); the table stays after the cards
    figure: { top: true, wide: true, svg: M4_SCREEN,
      caption: "**Left:** the project holds your instructions, files and chats. **1** The chat: you ask, and you say what to change. **2** The artifact, in its own panel: use it right there. **3** Controls to view the code, copy, download or share it. (A simplified drawing; the buttons in your version may look different.)" },
    // "Which one?" table: the four places work can live, including Module 3's shared folder
    compare: { caption: "Which one?", head: ["", "Chat", "Project", "Artifact", "Shared folder (Module 3)"], rows: [
      ["What it is", "One conversation", "A workspace for one piece of work", "Something Claude builds that works on its own", "A folder on your computer that Claude can work in"],
      ["It remembers", "That conversation only", "Its instructions, files and every chat in it", "Nothing: it's the result", "The files in that folder"],
      ["You get", "An answer to read", "New chats that start with your context", "A tool, document or chart to use, download or share", "Files Claude creates there"],
      ["Use it when", "You have a quick question", "You'll come back to the work", "You want something to click, keep or share", "The work ends in files on your computer"]
    ]}
  },

  // A working example on the page (between Key ideas and the tools), so students can use an artifact before building one
  tryIt: {
    title: "Try a finished prototype",
    text: "This is the kind of tool you'll build in Exercise B, with your own idea. Change the numbers and watch the results update. The data is made up.",
    url: "assets/files/m4/prototype-example.html",
    label: "Savings goal planner, an example prototype",
    height: 600
  },

  // Student tools, same card format as Modules 1-3: product-team tools for scoping, requesting and testing a prototype
  frameworks: {
    title: "Prototyping tools",
    intro: "Product teams use these to plan, request and test a prototype. None is required. Use the ones that help.",
    cards: [
      { name: "Project instructions", goodFor: "Writing your project's instructions (Exercise A)",
        parts: [["Who I am", "your role and background"], ["What I'm building", "the tool, in one sentence"],
                ["Who it's for", "the person who will use it"], ["How to answer", "length, format, tone"],
                ["Rules", "e.g. no login, no real data"]] },
      { name: "MoSCoW", goodFor: "Deciding what goes in your first version",
        parts: [["Must have", "without it, the tool doesn't work"], ["Should have", "important, but can wait a round"],
                ["Could have", "nice extras"], ["Won't have (yet)", "out of scope for now"]] },
      { name: "User stories", goodFor: "Asking for one clear change",
        parts: [["As a…", "who uses it"], ["I want…", "the feature or change"], ["So that…", "why it matters"]] },
      { name: "Prototype checklist", goodFor: "Testing your prototype (Exercise B)",
        parts: [["One screen", "and it works on a phone"], ["Clear inputs", "a label and a hint for each"],
                ["Explained results", "one line under each"], ["Empty or 0 inputs", "a clear message, not an error"],
                ["Nothing private", "no login, no real data"]] }
    ],
    sample: {
      title: "See each tool on one prototype",
      task: "**The example above** · A savings goal planner: enter a goal, what you've saved and what you save each month, and see how many months it takes.",
      tryIt: "Each prompt applies one tool to the same planner. Copy one into a project chat and compare what you get.",
      items: [
        { name: "Project instructions",
          prompt: "**Who I am:** an MBA student saving for a trip.\n**What I'm building:** a savings goal planner that fits on one screen.\n**Who it's for:** me, and friends saving for the same trip.\n**How to answer:** short. Make the change, then one line on what you did.\n**Rules:** no login and no real bank data." },
        { name: "MoSCoW",
          prompt: "Sort these features for the first version of my savings planner into **Must**, **Should**, **Could** and **Won't (yet)**: months to goal, total put in, interest earned, a chart over time, two currencies, email reminders.\nThen build only the Musts, as an artifact." },
        { name: "User stories",
          prompt: "**As a** saver checking my plan on the bus, **I want** the planner to fit on a phone screen, **so that** I can update it anywhere.\nMake only this change, then tell me what you changed." },
        { name: "Prototype checklist",
          prompt: "Check this prototype against the list, one line each, pass or fail:\n**One screen**, and it works on a phone · **Clear inputs**, each with a label and a hint · **One line under each result** · **A clear message** when an input is empty or 0 · **Nothing private**: no login, no real data.\nThen fix the first fail only." }
      ]
    }
  },

  // Same format as Modules 1-3: one example per key idea, in card order.
  // [[Tag::words]] colors those words in the strong prompt and shows a matching tag.
  examplesIntro: "Read each weak prompt and guess what's missing. Then open **What changed?** to check.",
  examplesGuess: true,
  examples: [
    { title: "Using your project", idea: "Set up a project",
      weak: "Here's my brief again: [pastes 2 pages into a new chat]",
      strong: "[[Uses the project::Using the brief and inputs in this project,]] [[One change::add a chart of savings over time.]]",
      gets: { weak: "The same context, pasted again, and a new chat that may not match the last one.",
              strong: "A change built on everything the project already knows." },
      why: "Inside a project, every new chat starts with your instructions and files. You only say what's new." },
    { title: "Project instructions", idea: "Write the instructions once",
      weak: "(left empty)",
      strong: "[[Who I am::I'm an MBA student]] [[What I'm building::building a savings goal planner]] [[Who it's for::for classmates who want an emergency fund.]] [[Defaults::Use the inputs in inputs.xlsx as defaults.]] [[Rules::Keep it to one screen and explain each result in one line.]]",
      gets: { weak: "You repeat who you are and what you want in every chat.",
              strong: "Every chat in the project starts from the same brief." },
      why: "Three lines of instructions save you from repeating them in every chat, and keep every change consistent. They follow the **Project instructions** card above." },
    { title: "Asking for an artifact", idea: "Make an artifact",
      weak: "make a savings calculator",
      strong: "[[Task::Build an interactive savings planner as an artifact.]] [[Inputs::Inputs: goal, already saved, monthly saving, interest rate.]] [[Results::Show months to the goal, total put in and interest earned,]] [[Explained::with a one-line explanation under each.]] [[Example numbers::Pre-fill example numbers.]]",
      gets: { weak: "A guess at what a savings calculator should do.",
              strong: "A planner you can use on the first try." },
      why: "Inputs, outputs, explanations and example numbers get you something useful on the first try." },
    { title: "Asking for a change", idea: "Change one thing at a time",
      weak: "make it better, fix the bugs, add a chart and dark mode",
      strong: "[[What broke::When the monthly saving is 0, the months show \"Infinity\".]] [[What you want::Show \"Add a monthly saving to see how long it takes.\" instead.]] [[Limit::Change nothing else.]]",
      gets: { weak: "Four changes at once, and no way to tell which one broke something.",
              strong: "One fix you can test in seconds." },
      why: "Say exactly what broke and what you want instead, then test before the next change. As a **user story**: as a saver with nothing to spare yet, I want a clear message, so that I'm not confused." }
  ],

  // {group: "..."} = an unnumbered heading row; keep its minutes in line with the exercises below
  steps: [
    { group: "Exercise A · ~5 min" },
    { title: "Create a project", text: "Open **Projects** in Claude's sidebar (or go to claude.ai/projects), click **New project** and name it after your tool." },
    { title: "Give it your context", text: "Paste Exercise A's instructions into the project's instructions, and add **inputs.xlsx** and **brief.docx** as project files.",
      shot: { image: "assets/img/m4-project-setup.svg", caption: "Illustration. Your screen may look slightly different. Add the files to the project, not to one chat.",
              alt: "Illustration of a Claude project page called Savings planner. On the right, 1: the Instructions box, where you paste your instructions. 2: the Files area with an Add button, holding inputs.xlsx and brief.docx." } },
    { title: "Check it worked", text: "Start a new chat in the project and ask: \"In 3 bullets, what do you know about my project?\"" },
    { group: "Exercise B · ~13 min" },
    { title: "Ask for the prototype", text: "Start a new chat in the project and send Exercise B's prompt. The prototype opens in a panel beside the chat." },
    { title: "Test it like a user", text: "Try normal numbers first. Then try to break it: 0, a blank box, a very large number." },
    { title: "Improve it twice", text: "One change at a time, testing after each (see **Watch a build** below)." },
    { title: "Save it", text: "Download it from the artifact panel as `prototype.html` into your **ai-basics** folder.",
      shot: { image: "assets/img/m4-download.svg", caption: "Illustration. Your screen may look slightly different.",
              alt: "Illustration of the top of the artifact panel: the title Savings goal planner and buttons Code, Copy, Download and Share. Download is highlighted, with the label Save as prototype.html." } }
  ],
  // A click-through build under the steps: three rounds on the same planner as "Try a finished prototype"
  stepsDemo: {
    title: "Watch a build: three rounds",
    turns: [
      { who: "you", text: "Build a savings goal planner as an artifact. Inputs: goal, already saved, monthly saving, interest rate. Show months to the goal, total put in and interest earned.",
        note: "**Round 1 · Ask.** Name the inputs and the results you want to see." },
      { who: "claude", text: "Here's the planner, in the panel beside this chat. Try the inputs and tell me what to change.",
        note: "The artifact opens beside the chat. Test it before you ask for more." },
      { who: "you", text: "When I set the monthly saving to 0, the months show \"Infinity\". Show a message instead: \"Add a monthly saving to see how long it takes.\"",
        note: "**Round 2 · One change.** Say exactly what broke and what you want instead." },
      { who: "claude", text: "Done. With a monthly saving of 0, the planner now shows that message instead of a number.",
        note: "Test the same case again: set the monthly saving to 0." },
      { who: "you", text: "It works. Now make it fit on a phone: put the inputs in one column on narrow screens.",
        note: "**Round 3 · One more change.** Still one thing at a time." },
      { who: "claude", text: "Updated. On narrow screens, the inputs and results now stack in one column.",
        note: "Check it in a narrow window, then download it as `prototype.html` (step 7)." }
    ]
  },
  tip: "A change made things worse? Ask \"Undo the last change\", or switch back to an earlier version in the artifact panel.",
  transfer: "ChatGPT Projects and Microsoft Copilot Notebooks work the same way: standing instructions and files that every chat starts with.",

  exercises: [
    {
      title: "A · Set up your project",
      where: "Claude Projects",
      minutes: 5,
      // intro / deliverable: a sentence, a list of bullets, or {text, points}
      intro: {"text":"Give Claude your project's context once, so every chat starts with it.","points":["Create the project, named after your tool","Paste the instructions below into the project's instructions, and fill in the brackets","Add **inputs.xlsx** and **brief.docx** as project files","Check: start a **new chat inside the project** and ask *\"In 3 bullets, what do you know about my project?\"* Fix the instructions if anything's missing or wrong"]},
      promptLabel: "Copy these instructions and fill in the brackets",
      // parts match the Project instructions card in Prototyping tools
      prompt: "[[Who I am::I'm [your role]]] [[What I'm building::building [your tool]]] [[Who it's for::for [who it helps].]]\n[[The idea::The idea: [your 3 sentences from Module 1].]]\n[[Defaults::Use the inputs in inputs.xlsx as defaults and brief.docx as background.]]\n[[How to answer::Keep answers short: make the change, then one line on what you did.]]\n[[Rules::Keep the tool to one screen and explain each result in one line.]]",
      deliverable: {"text":"In Claude Projects:","points":["A project with your instructions","**inputs.xlsx** and **brief.docx** as project files","Claude's 3 bullets match your idea"]},
      goodLooksLike: { text: "**Claude's 3 bullets, for the savings goal planner:**\n*\"You're building a savings goal planner for classmates who want an emergency fund.\"*\n*\"It shows how many months it takes to reach a goal, using the defaults in inputs.xlsx: a $400 monthly saving and a 4% interest rate.\"*\n*\"It should fit on one screen, with one line explaining each result.\"*\n\nEach bullet comes from your instructions or files. If one is missing or wrong, the instructions need a fix, not the chat." }
    },
    {
      title: "B · Build and test your prototype",
      where: "A new chat inside your project",
      minutes: 13,
      intro: {"text":"Build your tool as an artifact, then make it better twice.","points":["Send the prompt below. The prototype opens in a panel beside the chat","Work through the 4 steps under the prompt"]},
      promptLabel: "Copy this prompt",
      prompt: "[[Task::Build a prototype of my tool as an interactive artifact,]] [[Defaults::using the defaults in inputs.xlsx.]]\n[[Layout::One screen, a one-line 'How to use this' at the top, and it should work on a phone.]] [[Explained results::Explain each result in one line.]]",
      stepsLabel: "Then, in this order",
      steps: [
        "**Try it** with the example numbers. Does each result make sense?",
        { text: "**Round 1: break it.** Type 0, leave a box blank, try a very large number. See \"Infinity\", \"NaN\" or a blank? Ask for one fix, for example *\"When the monthly saving is 0, show a clear message instead of a result.\"* Then test again.",
          shot: { image: "assets/img/m4-break-fix.svg",
                  alt: "Two result cards. Before, with a monthly saving of 0: Months to reach your goal shows Infinity. After one fix: the card says Add a monthly saving to see how long it takes." } },
        "**Round 2: a fresh pair of eyes.** Check it against the **Prototype checklist** (in Prototyping tools), and have a classmate use it for 2 minutes, or ask Claude *\"Act as a first-time user of this tool and list everything that's unclear.\"* Pick one improvement and ask for it.",
        "**Save it.** Use the download control at the top of the artifact panel, and save the file as `prototype.html` in your ai-basics folder. Double-click it to check it opens."
      ],
      deliverable: {"text":"Save in your **ai-basics** folder (Modules 5 and 7 start from it):","points":["`prototype.html`, improved twice: one fix, one improvement","Optional: share it with a classmate (**Share** → your organization)"]},
      stretch: "Ask Claude: \"What would a user need to see to trust these results?\" Add the one change that matters most.",
      goodLooksLike: {
        image: "assets/img/m4-prototype-example.png",
        alt: "Example prototype 'Savings goal planner': a 'How to use this' line, four labeled inputs (savings goal $8,000, already saved $1,000, monthly saving $400, interest rate 4% a year) and four result cards (months to reach your goal 17, about 1 year 5 months; you'll put in $7,800; interest earned $243; save $100 more a month: 3 months sooner), each with a one-line explanation.",
        caption: "An example for a personal project, a savings goal planner. One screen, a \"How to use this\" line, and one line under each result. Try it live in **Try a finished prototype** above."
      },
      // same items as the Prototype checklist card, plus the saved file
      reveal: {
        title: "Check your prototype (open it after you've built yours)",
        text: "**One screen, and it works on a phone:** make the window narrow; nothing runs off the side.\n**Clear inputs:** each has a label and a hint, and there's a one-line \"How to use this\".\n**Explained results:** one line under each.\n**Empty or 0 inputs:** no \"Infinity\", \"NaN\" or blanks, just a clear message. The example says: \"Monthly saving must be above 0 to reach your goal.\"\n**Nothing private:** no login and no real data.\n**The saved file opens** when you double-click `prototype.html`."
      }
    }
  ],

  responsibleUse: {
    title: "What sharing a link exposes",
    text: "**Anyone who can open a shared artifact can try every input**, and also gets the files attached to that chat.",
    useLabel: "Share with", use: ["Your organization", "People you invite by name"],
    neverLabel: "Never share", never: ["An artifact with real data in it", "One from a chat with private files attached", "A public link, for this course"],
    after: ["**Before you share, check:**",
            ["The artifact uses example numbers only", "Nothing private is attached to the chat", "Who will be able to open the link"],
            "On Enterprise, artifacts stay inside your organization unless an Owner allows outside sharing."],
    shot: { image: "assets/img/m4-share-dialog.svg", caption: "Illustration. The real Share dialog depends on your plan and may look different.",
            alt: "Illustration of a Share dialog for an artifact. Your organization is selected; People you invite is also allowed; both are labeled For this course: either one. Anyone with the link, public outside your organization, is crossed out and labeled Not for this course." },
    tip: "Not sure what's in the chat? Download the artifact and share the file instead.",
    note: "More from Anthropic: [Share artifacts](https://support.claude.com/en/articles/9547008-share-artifacts)."
  },

  // In the order students meet them: Exercise A, Exercise B, then sharing
  stuck: [
    { problem: "Claude ignores my project instructions",
      fix: "Start a **new chat inside the project**. Instructions only apply to chats in that project." },
    { problem: "Claude doesn't see inputs.xlsx or brief.docx",
      fix: "Add them under the **project's files**, not to one chat. Then start a new chat in the project." },
    { problem: "Claude answered in text instead of making an artifact",
      fix: "Ask for \"an interactive artifact\" in so many words. Still nothing? **Code execution and file creation** may be off; on Enterprise, your admins control it. Mention it at office hours." },
    { problem: "My idea is too big for one screen",
      fix: "Sort its features with **MoSCoW** (Prototyping tools) and build only the Musts. The rest can wait." },
    { problem: "A change broke something that worked",
      fix: "Ask \"Undo the last change\", or switch back to an earlier version in the artifact panel. Next time, ask for the change as a **user story**, so Claude changes only that." },
    { problem: "I can't download the prototype",
      fix: "Ask: \"Give me the complete code as one HTML file in a single block.\" Paste it into a plain-text editor (Notepad, or TextEdit in plain-text mode) and save it as `prototype.html`." },
    { problem: "A classmate can't open my link",
      fix: "They must be signed in to your organization, and you must share with your organization or invite them by name. If the artifact is in a project, they also need access to that project." }
  ],

  // Go deeper: source and type show in their own columns; group adds a divider row (same table as Modules 1-3).
  // Links checked Nov 18, 2026; the sharing article moved to 9547008-share-artifacts.
  resources: [
    { group: "Start here", source: "Claude Help Center", type: "Help article",
      label: "What are artifacts and how do I use them?", url: "https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them" },
    { group: "Start here", source: "Claude Help Center", type: "Help article",
      label: "What are projects?", url: "https://support.claude.com/en/articles/9517075-what-are-projects" },
    { group: "Claude how-to", source: "Claude Help Center", type: "Help article",
      label: "How can I create and manage projects?", url: "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects" },
    { group: "Claude how-to", source: "Claude Help Center", type: "Help article",
      label: "Share artifacts", url: "https://support.claude.com/en/articles/9547008-share-artifacts" },
    { group: "Learn more", source: "Claude Academy", type: "Tutorial",
      label: "Intro to Projects", url: "https://academy.claude.com/tutorials/intro-to-projects" },
    { group: "Learn more", source: "Claude Academy", type: "Tutorial",
      label: "Build and share tools in Claude with custom artifacts", url: "https://academy.claude.com/tutorials/build-custom-artifacts-with-claude" },
    { group: "Learn more", source: "Anthropic Academy", type: "Free course",
      label: "Claude 101", url: "https://anthropic.skilljar.com/claude-101" },
    { group: "Prototyping and testing", source: "ProductPlan", type: "Glossary",
      label: "MoSCoW prioritization", url: "https://www.productplan.com/glossary/moscow-prioritization" },
    { group: "Prototyping and testing", source: "Atlassian", type: "Guide",
      label: "User stories, with examples and a template", url: "https://www.atlassian.com/agile/project-management/user-stories" },
    { group: "Prototyping and testing", source: "Nielsen Norman Group", type: "Article",
      label: "UX prototypes: low fidelity vs. high fidelity", url: "https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/" },
    { group: "Prototyping and testing", source: "Nielsen Norman Group", type: "Article",
      label: "Thinking aloud: the #1 usability tool", url: "https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/" }
  ]
};
