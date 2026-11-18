/* ==========================================================================
   MODULE TEMPLATE: copy this file to start a module (e.g. m1.js), change the id,
   and replace the text. Preview it at sample.html.

   - Any section you leave out (or leave empty) simply doesn't appear.
   - Text formatting: **bold**, *italic*, `code`, [link text](https://...)
   - Prompts and weak/strong examples are shown exactly as typed
     (line breaks kept, no formatting).
   - Section order on the page is fixed by the template, not by this file.
   ========================================================================== */
window.AIB_MODULES = window.AIB_MODULES || {};
window.AIB_MODULES["_template"] = {
  id: "_template",                       // must match the file name and the page's data-module
  label: "Template preview",             // only used when the module isn't in course.js
  title: "Module title",
  level: "Who it's for, e.g. No experience needed",

  goal: "One sentence: what a student can do by the end of this module.",
  outcomes: ["Outcome one", "Outcome two", "Outcome three", "Outcome four"],

  // Minutes for each part, set after a timed test run (series change #6). Total shows in the header.
  budget: { read: 5, do: 23, check: 2 },

  // Series change #15 + #5: what students need open, and what to do if they missed a module.
  // Each need is a checkbox (saved in the browser). Use {text, ifNot} to show a hint while it's unticked,
  // and files: [{ label, url }] for download buttons under that item.
  before: {
    needs: [
      "Your **Module N** output open (e.g. *inputs.xlsx*)",
      { text: "The Claude desktop app (Setup A)", ifNot: "Not yet? Follow [Setup A](m00-course-overview.html#setup) on the course overview." }
    ],
    // optional: a short box under the list, e.g. a recent change to Claude that affects this module
    note: { title: "Claude has changed:", text: "What's different, and what to do about it." },
    // Other optional fields used by Modules 3-4: breakdown.figure {svg, caption} (an inline SVG drawing using the .dg-* classes
    // in site.css) and, in an exercise, steps: ["...", "..."] with stepsLabel, a numbered list shown under the prompt.
    catchUp: { text: "Use the sample version so you can still do this module.", label: "Get the catch-up kit", url: "#" }
  },

  breakdown: {
    key: "The one idea to remember from this module, in a sentence or two.",
    concepts: [
      { title: "Concept one", text: "Two or three plain-language sentences." },
      { title: "Concept two", text: "Two or three plain-language sentences." },
      { title: "Concept three", text: "Two or three plain-language sentences." },
      { title: "Concept four", text: "Two or three plain-language sentences." }
    ],
    // Optional table under the concepts. First column is bold.
    // For more than one table, use a list: compare: [{ caption: "…", head: […], rows: […] }, { … }]
    compare: { head: ["", "Option A", "Option B"], rows: [["Best for", "…", "…"], ["Your role", "…", "…"]] }
  },

  // Optional section after Key ideas, e.g. Module 1's prompt frameworks. sample is a collapsed box.
  // frameworks: { title: "Prompt frameworks", intro: "…",
  //               cards: [{ name: "CARE", goodFor: "…", parts: [["Context", "the situation"], ["Ask", "…"]] }],
  //               table: { head: […], rows: […] }, note: "…",
  //               sample: { title: "…", task: "…", items: [{ name: "CARE", prompt: "…" }] } },

  // examplesIntro: "Optional line above the examples",
  // examplesGuess: true,   // hide each "why" behind a "What changed?" button
  examples: [
    { title: "What the example shows", weak: "a vague request", strong: "A specific request with context, task, format and constraints.",
      tags: ["Context", "Format"],   // optional chips under the strong version
      why: "One sentence on what makes the strong version better." }
  ],

  // demo: { title, video: { embed, planned }, turns: [{ who: "you" | "claude", text, note }] }
  // Optional click-through walkthrough. The course no longer uses demos (removed Nov 3, 2026); the renderer still supports them.

  steps: [   // exactly as many as the page promises (series change #11)
    { title: "Step one", text: "One line on how." },
    { title: "Step two", text: "One line on how." },
    { title: "Step three", text: "One line on how." },
    { title: "Step four", text: "One line on how." }
  ],
  tip: "One tip that saves the most time.",
  transfer: "One line on how this habit works in Copilot or ChatGPT too (series change #9).",

  // One or more exercises. With more than one, each shows its own minutes.
  exercises: [
    {
      title: "Exercise title",
      where: "Claude chat",
      minutes: 18,
      intro: "",                                   // optional sentence before the prompt
      // Optional download buttons (files live in assets/files/<module>/)
      files: [ /* { label: "Practice data (.csv)", url: "assets/files/m2/example.csv" } */ ],
      // Optional collapsed list of ideas: { title, intro, groups: [{ label, items: ["**Name:** what it does"] }] }
      // ideas: { title: "Need ideas?", groups: [{ label: "For your work", items: ["…"] }] },
      // Optional collapsed how-to box, shown before the answer box
      // help: { title: "How to recompute one number", text: "…" },
      // Optional collapsed answer box, shown after the exercise ("Check your answer")
      // reveal: { text: "The answer, and how to find it." },
      prompt: "The ready-to-copy prompt.\nUse [brackets] for what students fill in.",
      // promptLabel: "Copy these instructions and fill in the brackets",   // optional label for the copy box
      deliverable: "Exactly what the student ends up with.",
      stretch: "An optional extra for fast finishers.",
      // Series change #14: a screenshot (with alt text) or a short sample of a finished deliverable.
      goodLooksLike: { text: "A short sample of a finished deliverable, or use image + alt + caption instead." }
      // goodLooksLike: { image: "assets/img/m1-good.png", alt: "Describe the screenshot", caption: "Optional caption" }
    }
  ],

  // Series change #4: one data or verification rule tied to this module's tool.
  // Use text for one rule, rules for a numbered list, note for a small footnote (all optional).
  // The course rules (course.js rulesBase) are shown underneath automatically; base: false hides them,
  // base: "only" shows just the course rules (Module 1).
  responsibleUse: {
    title: "The rule for this module",
    text: "One concrete rule, e.g. what not to paste and why.",
    rules: [],
    note: ""
  },

  // Series change #13: the 3–5 most likely problems. Update weekly from the office-hours log.
  stuck: [
    { problem: "I don't see the button / option", fix: "What to click, or what account setting to check." },
    { problem: "Claude's answer is too long or off-topic", fix: "What to change in the prompt." },
    { problem: "It worked in class but not at home", fix: "The usual cause and the fix." }
  ],

  resources: [
    { label: "A resource worth reading", url: "https://example.com" }
  ]
};
