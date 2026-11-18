/* ==========================================================================
   Module 6 · Connectors & automation (+ the course's responsible-use wrap-up)
   Spec: AI_Basics_Lab_Revision_Plan.md, "Module 6 · Connectors & automation"
   Decisions (Nov 3, 2026): real app first; personal accounts allowed with cautions;
   fictional sandbox (assets/files/m6/work-week/, tools/make-m6-files.js) as fallback.
   Status: draft, awaiting timed test run (Nov 3, 2026)
   ========================================================================== */
window.AIB_MODULES = window.AIB_MODULES || {};
window.AIB_MODULES["m6"] = {
  id: "m6",
  title: "Connectors & Automation",
  level: "Builds on Modules 1, 3 and 5",

  goal: "Learn to connect Claude to your apps and automate a recurring task safely.",
  outcomes: ["Connect one app safely", "Run a task with its data", "Schedule it to repeat", "Set your data rules"],

  budget: { read: 5, do: 23, check: 2 },

  before: {
    needs: [
      "**Pick your path.** (1) An app your organization has approved (MIT or your employer). (2) A personal account, with care: a calendar or a Drive folder that holds only your own items, not a full inbox full of other people's messages, and disconnect it afterwards. (3) Nothing you can connect? Download the `work-week` sandbox (in Exercise A), a fictional week of calendar, emails and notes, and unzip it into your ai-basics folder. You'll share it with the desktop app.",
      "Find the connectors your account offers: in Claude's settings or customize menu, look for **Connectors**. Your organization decides which ones appear.",
      "Something you actually repeat each week (meeting prep, a digest, a Friday status note)."
    ]
  },

  breakdown: {
    key: "This is where an AI assistant pays off: Claude works with your real tools, not pasted text. It's also where the data risk is highest, so least access comes first.",
    concepts: [
      { title: "What a connector is",
        text: "Permission for Claude to read, and sometimes act, in one app, using your own account's access. Claude sees what you can see there, no more." },
      { title: "Least access",
        text: "Connect one app. Start with read-only tasks. Review anything before it's sent, created or changed." },
      { title: "Automation",
        text: "A clear prompt plus a schedule, e.g. every weekday at 7am. Scheduled tasks run in the cloud, so you review the output afterwards, starting with the first run." },
      { title: "Responsible use, wrapped up",
        text: "Verify before you rely on it, follow the data rules, disclose AI help where it's expected, and remember that people stay accountable. Details below." }
    ]
  },

  examples: [
    { title: "Working from your inbox",
      weak: "check my email",
      strong: "From my inbox since Friday, list messages that need a reply from me this week, grouped by sender, with one line of context each. Don't draft or send anything.",
      why: "A time window, a clear output, and an explicit limit on what Claude may do." },
    { title: "Meeting prep",
      weak: "prep me for meetings",
      strong: "For each meeting on my calendar tomorrow: attendees, the last related email or document, and 3 questions I should ask. One page. Read only.",
      why: "It names the sources, the shape of the output and its length, so you can check it in two minutes." }
  ],

  steps: [
    { title: "Connect one app", text: "In Connectors, connect one app and sign in. Or share the `work-week/` folder in the desktop app." },
    { title: "Run a read-only task and check one item", text: "Send Exercise A's prompt, then compare one line of the output with the email, invite or document it came from." },
    { title: "Turn it into a scheduled task", text: "Type **/schedule** in the task, or open **Scheduled** in the sidebar, and pick a frequency: hourly, daily, weekly or weekdays." },
    { title: "Review the first automatic run", text: "Open it on the Scheduled page. Check one item again before you rely on it." }
  ],
  tip: "End every connected prompt with \"Read only: don't send, create, change or delete anything. List what you looked at.\" It keeps the task safe and the output checkable.",
  transfer: "Microsoft Copilot and Google Gemini connect to Microsoft 365 and Google Workspace in the same way, and the same least-access habits apply.",

  exercises: [
    {
      title: "A · Connect one app and run a task once",
      where: "Claude, with one app connected (or the work-week folder)",
      minutes: 8,
      intro: "Pick one task you'd actually use: **meeting prep** for tomorrow, a **weekly digest** of a channel or folder, or a **Friday status summary** from documents in Drive. Fill in the brackets and send it. Then check one item against its source. **Using the sandbox?** Share the `work-week/` folder in the desktop app and start with \"Using the files in work-week/ as my calendar, inbox and notes:\".",
      files: [
        { label: "Sandbox: work-week (.zip)", url: "assets/files/m6/work-week.zip" }
      ],
      prompt: "Using my [calendar / email / Drive / Slack] connection: [your task, e.g. for each meeting tomorrow, list attendees, the last related email or document, and 3 questions I should ask].\nOne page.\nRead only: don't send, create, change or delete anything.\nAt the end, list what you looked at.",
      deliverable: "The output, plus one item you checked against its source: what it was, and whether it matched."
    },
    {
      title: "B · Schedule it",
      where: "The same task",
      minutes: 9,
      intro: "Turn your prompt into a scheduled task, and fix anything your check in Exercise A turned up first. Then write the **data check**: what can this automation see, and who receives its output?",
      prompt: "/schedule Run this [every weekday at 7am / weekly on Monday at 8am]: [your prompt from Exercise A, with any fixes].\nRead only: don't send, create, change or delete anything.",
      deliverable: "One scheduled task, plus three sentences: what it can see, who receives its output, and how much time it saves you each week.",
      stretch: "Combine it with your Module 5 skill, or ask for a fixed format, so every run looks the same and is quicker to check.",
      goodLooksLike: { text: "**Trail Club price test: kickoff** · Mon 2:00–3:00pm, Zoom\n**Attendees:** CFO, Head of Sales, Analytics Lead, you\n**Last related:** the CFO's email of Fri Nov 13 (test $49 in the Southeast and Midwest for three months); `notes/price-test-design.md`\n**Ask:** 1) Is three months long enough to see churn change? 2) What churn would make us stop the test early? 3) Who owns the regional baseline?\n**Looked at:** calendar.csv, emails/01, notes/price-test-design.md" },
      reveal: {
        title: "Before you leave it running (open it after you've scheduled yours)",
        text: "**What can it see?** Everything your account can see in that app, not just what you had in mind.\n\n**Who gets the output?** Only you, unless your prompt sends or shares it. Keep it that way until you've checked several runs.\n\n**Does the prompt say read-only?** If not, add it.\n\n**Using the sandbox?** Did your digest include the partner's email marked *\"Confidential: do not forward\"*? A digest that copies confidential terms into a summary has just forwarded them. Add to the prompt: \"Leave out anything marked confidential; just note that it exists.\"\n\n**To pause or delete it:** open **Scheduled** in the sidebar."
      }
    }
  ],

  responsibleUse: {
    title: "Responsible use: the course wrap-up",
    rules: [
      "**Verify before you rely on it.** AI output is a draft until you've checked it. The higher the stakes, the more you check.",
      "**Follow the data rules.** Work data only in apps and tools your organization has approved for it. With a personal account, remember that other people's emails, names and meeting details are their information: prefer a calendar or folder that holds only your own items, and disconnect when you're done.",
      "**Disclose AI help** where your course or workplace expects it. When in doubt, say how you used AI.",
      "**People stay accountable.** You sign off on the email, the decision and the summary, whoever drafted it.",
      "**Least access.** Start read-only. Approve any send, edit or delete yourself, every time."
    ],
    note: "More: [MIT IS&T guidance for the use of generative AI](https://ist.mit.edu/ai-guidance) · [Use Claude Cowork safely](https://support.claude.com/en/articles/13364135-use-claude-cowork-safely)."
  },

  stuck: [
    { problem: "The app I want isn't in the Connectors list",
      fix: "Your organization hasn't turned that connector on. Try another app, or use the `work-week/` sandbox." },
    { problem: "\"Access blocked\" or \"admin approval required\" when I sign in",
      fix: "The app's own administrator (MIT IS&T, or your employer's IT) has to approve Claude first. Use the sandbox for now and mention it at office hours so we can track it." },
    { problem: "Claude asks to send, edit or delete something",
      fix: "Deny it. Keep the task read-only, and review drafts yourself before anything goes out." },
    { problem: "My scheduled task didn't run",
      fix: "Tasks that use local files (like the sandbox folder) only run while the desktop app is open; tasks that only use connectors run in the cloud. Check its past runs on the **Scheduled** page, or use **run now**." },
    { problem: "The output included something confidential",
      fix: "Pause the task on the Scheduled page, narrow the prompt (\"leave out anything marked confidential\"), and delete that output. If it's someone else's information, mention it at office hours." }
  ],

  resources: [
    { label: "Claude Help Center: Use connectors to extend Claude's capabilities", url: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities" },
    { label: "Claude Help Center: Use Google Workspace connectors", url: "https://support.claude.com/en/articles/10166901-use-google-workspace-connectors" },
    { label: "Claude Help Center: Connect to Microsoft 365", url: "https://support.claude.com/en/articles/15183774-connect-to-microsoft-365" },
    { label: "Claude Help Center: Schedule recurring tasks in Claude Cowork", url: "https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork" },
    { label: "MIT IS&T: Guidance for the use of generative AI", url: "https://ist.mit.edu/ai-guidance" }
  ]
};
