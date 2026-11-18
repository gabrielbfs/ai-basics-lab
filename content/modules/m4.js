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
const M4_SCREEN = '<svg viewBox="0 0 720 292" role="img" aria-labelledby="m4-dg-t m4-dg-d" xmlns="http://www.w3.org/2000/svg">' +
  '<title id="m4-dg-t">Where an artifact appears</title>' +
  '<desc id="m4-dg-d">A simplified Claude window. On the left, the chat: you ask for a savings planner as an artifact, Claude replies, and a card links to the artifact. On the right, the artifact opens in its own panel: a working savings planner with inputs and results, and controls at the top to view the code, copy, download or share it.</desc>' +
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
  '<text class="dg-s" x="314" y="92">EXAMPLE DATA · MADE UP</text>' +
  '<rect class="dg-btn" x="314" y="102" width="180" height="28" rx="6"/><text class="dg-s" x="324" y="120">Savings goal   $8,000</text>' +
  '<rect class="dg-btn" x="506" y="102" width="180" height="28" rx="6"/><text class="dg-s" x="516" y="120">Already saved   $1,000</text>' +
  '<rect class="dg-btn" x="314" y="138" width="180" height="28" rx="6"/><text class="dg-s" x="324" y="156">Monthly saving   $400</text>' +
  '<rect class="dg-btn" x="506" y="138" width="180" height="28" rx="6"/><text class="dg-s" x="516" y="156">Interest rate   4%</text>' +
  '<rect class="dg-card" x="314" y="180" width="86" height="82" rx="8"/><text class="dg-s" x="324" y="200">To goal</text><text class="dg-h" x="324" y="226">17 mo</text>' +
  '<rect class="dg-card" x="408" y="180" width="86" height="82" rx="8"/><text class="dg-s" x="418" y="200">You put in</text><text class="dg-h" x="418" y="226">$7,800</text>' +
  '<rect class="dg-card" x="502" y="180" width="86" height="82" rx="8"/><text class="dg-s" x="512" y="200">Interest</text><text class="dg-h" x="512" y="226">$243</text>' +
  '<rect class="dg-card" x="596" y="180" width="90" height="82" rx="8"/><text class="dg-s" x="606" y="200">+$100/month</text><text class="dg-h" x="606" y="226">3 mo</text>' +
  '<text class="dg-s" x="324" y="248">months</text><text class="dg-s" x="418" y="248">total</text><text class="dg-s" x="512" y="248">earned</text><text class="dg-s" x="606" y="248">sooner</text>' +
  "</svg>";

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
    key: "A project is Claude's memory for one piece of work. An artifact is something you make together that works on its own, outside the chat.",
    concepts: [
      { title: "Projects",
        text: "A workspace with its own instructions and files. Every new chat inside the project starts with that context, so you stop re-explaining." },
      { title: "Project instructions",
        text: "Standing guidance, written once: who you are, what you're building, and how you want answers. If Claude keeps forgetting something, it belongs here." },
      { title: "Artifacts",
        text: "Something Claude makes that works on its own, outside the chat: a document, a chart, or a small tool like a calculator. It opens in a panel beside the chat, where you can try it, view its code, copy, download or share it." },
      { title: "Iterate in plain English",
        text: "\"Show a message when the monthly saving is 0.\" \"Make it fit on a phone.\" One concrete change per round, then test again." }
    ],
    figure: { svg: M4_SCREEN,
      caption: "**1** The chat: you ask, and you say what to change. **2** The artifact, in its own panel: use it right there. **3** Controls to view the code, copy, download or share it. (A simplified drawing; the buttons in your version may look different.)" },
    compare: { head: ["", "Chat answer", "Artifact"], rows: [
      ["Shows up", "In the conversation", "In a panel beside the chat"],
      ["Good for", "Explaining, thinking, quick drafts", "Things you use, keep or share"],
      ["You can", "Read it and copy it", "Click it, change it, download it, share it"],
      ["Example", "\"How much should I save each month?\"", "A planner where you type your numbers and see the results"]
    ]}
  },

  examples: [
    { title: "Asking for an artifact",
      weak: "make a savings calculator",
      strong: "Build an interactive savings planner as an artifact. Inputs: goal, already saved, monthly saving, interest rate. Show months to the goal, total put in and interest earned, with a one-line explanation under each. Pre-fill example numbers and label them as examples.",
      why: "Inputs, outputs, explanations and labeled sample data get you something useful on the first try." },
    { title: "Project instructions",
      weak: "(left empty)",
      strong: "I'm an MBA student building a savings goal planner for classmates who want an emergency fund. Use the inputs in inputs.xlsx as defaults. Keep it to one screen, label example data, and explain each result in one line.",
      why: "Three lines of instructions save you from repeating them in every chat, and keep every change consistent." }
  ],

  steps: [
    { title: "Create a project", text: "Open **Projects** in Claude's sidebar (or go to claude.ai/projects), click **New project** and name it after your tool." },
    { title: "Give it your context", text: "Paste the instructions from Exercise A into the project's instructions, and add inputs.xlsx and brief.docx to its files." },
    { title: "Ask for the prototype", text: "Start a new chat inside the project and send Exercise B's prompt. The prototype opens in a panel beside the chat." },
    { title: "Test it like a user", text: "Try normal numbers first. Then try to break it: 0, a blank box, a very large number." },
    { title: "Improve it, then save it", text: "Ask for one change at a time, twice. Then download it from the artifact panel as `prototype.html`." }
  ],
  tip: "Ask for one change at a time and test after each. If a change breaks something, say exactly what broke (\"the months show Infinity when the monthly saving is 0\"), not just \"it doesn't work.\"",
  transfer: "ChatGPT Projects and Microsoft Copilot Notebooks work the same way: standing instructions and files that every chat starts with.",

  exercises: [
    {
      title: "A · Set up your project",
      where: "Claude Projects",
      minutes: 5,
      intro: "Create the project, paste these instructions into the project's instructions and fill in the brackets. Add **inputs.xlsx** and **brief.docx** as project files. Then check that it worked: start a **new chat inside the project** and ask *\"In 3 bullets, what do you know about my project?\"* If something's missing or wrong, fix the instructions.",
      promptLabel: "Copy these instructions and fill in the brackets",
      prompt: "I'm [your role] building [your tool] for [who it helps].\nThe idea: [your 3 sentences from Module 1].\nUse the inputs in inputs.xlsx as defaults and brief.docx as background.\nKeep the tool to one screen, label example data as examples, and explain each result in one line.",
      deliverable: "A project with instructions and two files, and Claude's 3 bullets matching your idea."
    },
    {
      title: "B · Build and test your prototype",
      where: "A new chat inside your project",
      minutes: 13,
      intro: "Send the prompt below. The prototype opens in a panel beside the chat. Then work through the four steps under the prompt.",
      stepsLabel: "Then, in this order",
      steps: [
        "**Try it** with the example data. Does each result make sense?",
        "**Round 1: break it.** Type 0, leave a box blank, try a very large number. See \"Infinity\", \"NaN\" or a blank? Ask for one fix, for example *\"When the monthly saving is 0, show a clear message instead of a result.\"* Then test again.",
        "**Round 2: a fresh pair of eyes.** Have a classmate use it for 2 minutes, or ask Claude *\"Act as a first-time user of this tool and list everything that's unclear.\"* Pick one improvement and ask for it.",
        "**Save it.** Use the download control at the top of the artifact panel, and save the file as `prototype.html` in your ai-basics folder. Double-click it to check it opens. Modules 5 and 7 start from this file."
      ],
      prompt: "Build a prototype of my tool as an interactive artifact, using the defaults in inputs.xlsx.\nOne screen, clearly labeled example data, a one-line 'How to use this' at the top, and it should work on a phone. Explain each result in one line.",
      deliverable: "A working prototype, improved twice (one fix, one improvement), saved as `prototype.html` in your ai-basics folder. Optional: share it with a classmate (**Share** → your organization).",
      stretch: "Ask Claude: \"What would a user need to see to trust these results?\" Add the one change that matters most.",
      files: [
        { label: "Example prototype (.html)", url: "assets/files/m4/prototype-example.html" }
      ],
      goodLooksLike: {
        image: "assets/img/m4-prototype-example.png",
        alt: "Example prototype 'Savings goal planner': a tag reading 'Example data, made up', a 'How to use this' line, four labeled inputs (savings goal $8,000, already saved $1,000, monthly saving $400, interest rate 4% a year) and four result cards (months to reach your goal 17, about 1 year 5 months; you'll put in $7,800; interest earned $243; save $100 more a month: 3 months sooner), each with a one-line explanation.",
        caption: "An example for a personal project, a savings goal planner. One screen, labeled example data, a \"How to use this\" line, and one line under each result. Download it above to try it."
      },
      reveal: {
        title: "Check your prototype (open it after you've built yours)",
        text: "**Example data is labeled** as made up.\n**One screen,** with a one-line \"How to use this\".\n**Every result has a one-line explanation.**\n**No \"Infinity\", \"NaN\" or blanks** when you type 0 or leave a box empty, just a clear message. The example says: \"Monthly saving must be above 0 to reach your goal.\"\n**It fits on a phone:** make the window narrow; nothing runs off the side.\n**The saved file opens** when you double-click `prototype.html`."
      }
    }
  ],

  responsibleUse: {
    title: "What sharing a link exposes",
    rules: [
      "**Example data only.** Anyone you share the artifact with can open it and try every input.",
      "**Check what's in the chat.** When you share an artifact made in a chat, people also get the files attached to that chat. Attach nothing you wouldn't hand them directly.",
      "**Inside the organization is enough.** On Enterprise, artifacts stay inside your organization unless an Owner allows outside sharing. For this course, share with your organization or invite people by name."
    ],
    note: "More from Anthropic: [Publishing and sharing artifacts](https://support.claude.com/en/articles/9547008-publishing-and-sharing-artifacts)."
  },

  stuck: [
    { problem: "Claude answered in text instead of making an artifact",
      fix: "Ask for \"an interactive artifact\" in so many words. Artifacts also need **Code execution and file creation** turned on in Settings; on Enterprise, your admins control it. Still nothing? Mention it at office hours." },
    { problem: "Claude ignores my project instructions",
      fix: "Start a **new chat inside the project**. Instructions and files only apply to chats in that project, not to chats you started elsewhere." },
    { problem: "A classmate can't open my link",
      fix: "They need to be signed in to the same organization, and you need to share with your organization or invite them by name under **Share**. An artifact made inside a project also needs them to have access to that project." },
    { problem: "I can't download the prototype",
      fix: "Ask: \"Give me the complete code as one HTML file in a single block.\" Copy it, paste it into a plain-text editor (Notepad, or TextEdit in plain-text mode) and save it as `prototype.html`. Double-click the file to check it opens." },
    { problem: "My idea is too big for one screen",
      fix: "Ask: \"What's the smallest version of this that fits on one screen and still helps [user]?\" Build that; the rest can wait for later modules." }
  ],

  resources: [
    { label: "Claude Help Center: What are artifacts and how do I use them?", url: "https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them" },
    { label: "Claude Help Center: Publishing and sharing artifacts", url: "https://support.claude.com/en/articles/9547008-publishing-and-sharing-artifacts" },
    { label: "Claude Help Center: What are projects?", url: "https://support.claude.com/en/articles/9517075-what-are-projects" },
    { label: "Claude Help Center: How can I create and manage projects?", url: "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects" },
    { label: "Claude Academy: Intro to Projects", url: "https://academy.claude.com/tutorials/intro-to-projects" },
    { label: "Claude Academy: Build and share tools in Claude with custom artifacts", url: "https://academy.claude.com/tutorials/build-custom-artifacts-with-claude" },
    { label: "Claude Academy use case: Build a custom bucket list", url: "https://academy.claude.com/use-cases/build-a-custom-bucket-list-app" },
    { label: "Anthropic Academy: Claude 101 (free course)", url: "https://anthropic.skilljar.com/claude-101" },
    { label: "Nielsen Norman Group: UX Prototypes: Low Fidelity vs. High Fidelity", url: "https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/" },
    { label: "Nielsen Norman Group: Why You Only Need to Test with 5 Users", url: "https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/" },
    { label: "Nielsen Norman Group: Thinking Aloud: The #1 Usability Tool", url: "https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/" }
  ]
};
