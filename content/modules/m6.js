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
      { text: "**Your path,** from the table below. Using the sandbox? Download it and unzip it into your **ai-basics** folder: a fictional week of calendar, emails and notes.",
        files: [{ label: "Sandbox: work-week (.zip)", url: "assets/files/m6/work-week.zip" }] },
      "**Your connectors:** open **Customize → Connectors**, or click **+** in the chat box → **Connectors → Manage connectors**. On a Team or Enterprise plan, an owner has to turn each connector on first.",
      { text: "**A paid plan, for Exercise B:** scheduled tasks need Pro or above, Team or Enterprise.",
        ifNot: "On a Free plan? Do Exercise A, then write your schedule as a plan in Exercise B: the task, when it would run, and the data check." },
      { text: "**A task you repeat every week,** in one sentence: meeting prep, a digest of a channel or folder, or a Friday status note.",
        ifNot: "No idea? Use **meeting prep for tomorrow**." }
    ],
    // the three paths, side by side (same note-box format as Module 3)
    note: { title: "Pick your path",
      text: "Three ways to do this module. Each one works for both exercises.",
      table: { head: ["Path", "What to connect", "Watch out"],
               rows: [["**An approved app**", "An app MIT or your employer has approved for Claude", "Their data rules apply"],
                      ["**A personal account**", "A calendar or Drive folder that holds only your own items", "Not a full inbox of other people's messages. Disconnect it afterwards"],
                      ["**The sandbox**", "The fictional `work-week` folder, shared in the desktop app", "A scheduled task on a local folder runs only while the desktop app is open"]] } }
  },

  breakdown: {
    key: "Connectors let Claude work with your real apps. Give it the least access the task needs, and check before you rely on it.",
    // Plain-language definitions, shown right under the key line (same as Modules 4-5)
    defs: [
      { term: "A connector", text: "is a link that lets Claude read, and sometimes act, in one app (calendar, email, Drive, Slack), using your own sign-in. It sees what you can see there, no more." },
      { term: "A scheduled task", text: "is a prompt that runs by itself on a schedule, like every weekday at 7am, and leaves the result for you to review." }
    ],
    // top: true puts the drawing under the key line (each module's "picture"); the table stays after the cards
    figure: { top: true, wide: true, image: "assets/img/m6-access-ladder.svg",
      alt: "Diagram: the access ladder. Step 1, Read, marked start here: Claude looks and summarizes. Step 2, Draft: Claude writes, you send. Step 3, Act: Claude sends, changes or deletes, and you approve each one. Each step up means more access and more to check.",
      caption: "**The access ladder.** Start every connected task on the bottom step. Climb only when the task needs it, and approve each action yourself." },
    // text can be one paragraph or a list of short bullets (same style as Modules 1-5)
    concepts: [
      { title: "What a connector sees",
        text: ["Everything your account can see in that app", "Not just what you had in mind", "Turn on only the connectors a chat needs"] },
      { title: "Least access",
        text: ["One app at a time", "Read-only first", "You approve every send, edit or delete"] },
      { title: "Automation",
        text: ["A clear prompt plus a schedule", "Runs in the cloud, even while your computer sleeps (not tasks on a local folder)", "Check the first runs before you rely on it"] },
      { title: "Responsible use, wrapped up",
        text: ["Verify before you rely on it", "Follow the data rules", "Disclose AI help: you stay accountable"] }
    ],
    // How Modules 5 and 6 fit together
    compare: { caption: "Three building blocks", head: ["", "Skill (Module 5)", "Connector", "Scheduled task"], rows: [
      ["It adds", "*How* to do a task", "*Which data* to use", "*When* to run it"],
      ["Example", "Your weekly-update format", "Your calendar and Drive", "Every Friday at 4pm"],
      ["Watch out", "No real data inside it", "It sees everything you can", "Check the first runs"]
    ]}
  },

  // Connectors you could use: how they work, six common connectors, and one read-only prompt for each.
  // What each connector can do comes from the Claude Help Center and claude.com/connectors (checked Nov 19, 2026).
  frameworks: {
    title: "Connectors you could use",
    intro: "Six connectors MBA students use most. Each card says what Claude can do there, which steps of the access ladder it reaches, and one read-only thing to ask.",
    noteTop: true,
    note: { label: "How connectors work", points: [
      "**You sign in with your own account,** so Claude sees what you can see in that app, no more.",
      "**You turn connectors on for each chat:** only the ones that task needs.",
      "**Your plan and your organization** decide which connectors you see.",
      "**Some only read; others can send, edit or delete,** usually after asking you. That's why every prompt here says \"read only\".",
      "They're built on an open standard (MCP), so there's a [directory of hundreds](https://claude.com/connectors)."
    ]},
    cards: [
      { name: "Google Calendar", goodFor: "Meeting prep, recruiting season",
        parts: [["Claude can", "See your events, find times when people are free, and create, change or delete events"],
                ["Reaches", "Read · Act"],
                ["Try asking", "\"What's on my calendar tomorrow, and which meetings need prep?\""],
                ["Watch out", "It can change events. Keep \"read only\" in your prompt."]] },
      { name: "Gmail", goodFor: "Inbox triage, follow-ups",
        parts: [["Claude can", "Search and read emails and attachments, write drafts, and send, reply or forward after asking you"],
                ["Reaches", "Read · Draft · Act"],
                ["Try asking", "\"Which emails since Friday need a reply from me this week?\""],
                ["Watch out", "It can send for you. Ask for drafts, and send them yourself."]] },
      { name: "Google Drive", goodFor: "Team projects, case prep",
        parts: [["Claude can", "Find and read Docs, Sheets, Slides and PDFs, upload files, and share, move or trash them after asking"],
                ["Reaches", "Read · Act"],
                ["Try asking", "\"Find the latest version of our team deck and summarize what changed.\""],
                ["Watch out", "Sharing a file is an action. Check who would get access."]] },
      { name: "Microsoft 365", goodFor: "Employers on Outlook and Teams",
        parts: [["Claude can", "Read Outlook email and calendar, OneDrive, SharePoint and Teams with a work or school account; Outlook and OneDrive with a personal one"],
                ["Reaches", "Read, plus Draft and Act if write tools are on"],
                ["Try asking", "\"Summarize this week's messages in our project's Teams channel.\""],
                ["Watch out", "Work accounts are read-only unless an admin turns on write tools. On a personal account, they're on by default."]] },
      { name: "Slack", goodFor: "Clubs, team projects",
        parts: [["Claude can", "Search and read channels, threads and files, send messages, and create or update canvases"],
                ["Reaches", "Read · Draft · Act"],
                ["Try asking", "\"Summarize the decisions in #project-team since Monday, and who made each one.\""],
                ["Watch out", "It can post as you, and channels hold other people's messages. Keep it read-only and summarize, don't forward."]] },
      { name: "Notion", goodFor: "Club wikis, project notes",
        parts: [["Claude can", "Search and read pages in your workspace, and update them"],
                ["Reaches", "Read · Act"],
                ["Try asking", "\"From our project notes, list the open action items with their owners.\""],
                ["Watch out", "It can edit shared pages. Ask for a list first, then make the edits yourself."]] }
    ],
    sample: {
      title: "Try one: copy a read-only prompt",
      task: "Pick the app you connected. Every prompt ends with the same two lines: what Claude may not do, and what it looked at.",
      items: [
        { name: "Google Calendar", prompt: "Using my Google Calendar connection: for each meeting tomorrow, list the time, the attendees and one thing I should prepare.\n**Read only: don't send, create, change or delete anything.**\nAt the end, list what you looked at." },
        { name: "Gmail", prompt: "Using my Gmail connection: list the emails since Friday that need a reply from me this week, grouped by sender, with one line of context each.\n**Read only: don't send, create, change or delete anything.**\nAt the end, list what you looked at." },
        { name: "Google Drive", prompt: "Using my Google Drive connection: find the most recent version of [document name] and summarize what changed since the last version, in 5 bullets.\n**Read only: don't send, create, change or delete anything.**\nAt the end, list what you looked at." },
        { name: "Microsoft 365", prompt: "Using my Microsoft 365 connection: summarize this week's messages in the [channel name] Teams channel: decisions, open questions and who owns each next step.\n**Read only: don't send, create, change or delete anything.**\nAt the end, list what you looked at." },
        { name: "Slack", prompt: "Using my Slack connection: summarize the decisions in #[channel] since Monday, with who made each one and a link to the message.\n**Read only: don't send, create, change or delete anything.**\nAt the end, list what you looked at." },
        { name: "Notion", prompt: "Using my Notion connection: from the [page name] page, list the open action items with their owners and due dates.\n**Read only: don't send, create, change or delete anything.**\nAt the end, list what you looked at." }
      ]
    }
  },

  // One example per key-ideas card, same format as Modules 4-5 (idea tag, coloured parts, "You get" lines, guess first)
  examplesIntro: "Read each weak version and guess what's missing. Then open **What changed?** to check.",
  examplesGuess: true,
  examples: [
    { title: "Working from your inbox", idea: "What a connector sees",
      weak: "check my email",
      strong: "[[Time window::From my inbox since Friday,]] [[Output::list messages that need a reply from me this week, grouped by sender, one line each.]] [[Limit::Read only: don't draft or send anything.]]",
      gets: { weak: "Claude reads your whole inbox and decides for itself what matters.",
              strong: "A short list you can check against your inbox in two minutes." },
      why: "A connector sees everything your account can. A time window, a clear output and an explicit limit keep the task small and checkable." },
    { title: "Asking for a reply", idea: "Least access",
      weak: "Reply to the CFO and say Monday works.",
      strong: "[[Draft only::Draft a reply to the CFO's email about the price-test kickoff, saying Monday 2pm works.]] [[You send::Show me the draft; don't send it.]]",
      gets: { weak: "An email sent in your name before you've read it.",
              strong: "A draft you check, fix and send yourself." },
      why: "Stay on the lowest step of the access ladder that gets the job done. Claude drafts; you send." },
    { title: "A scheduled digest", idea: "Automation",
      weak: "Every morning, summarize everything.",
      strong: "[[When::Every weekday at 7am,]] [[Sources::from my calendar and the #project-team channel,]] [[Output::list today's meetings and yesterday's decisions in under 10 lines.]] [[Limit::Read only. List what you looked at.]]",
      gets: { weak: "A long digest of everything, every day, too long to check.",
              strong: "Ten lines you can check over coffee, from two sources you chose." },
      why: "A scheduled task runs without you, so the prompt has to say when, from where, how much and what it may not do." },
    { title: "Confidential information", idea: "Responsible use, wrapped up",
      weak: "Summarize this week's emails for my team.",
      strong: "[[Audience::Summarize this week's project emails for me only.]] [[Confidential::Leave out anything marked confidential; just note that it exists.]] [[Check::Flag any figure I should check before I share it.]]",
      gets: { weak: "A summary that may pass a partner's confidential terms to your whole team.",
              strong: "A summary that's safe to share once you've checked it." },
      why: "A summary that copies confidential terms has just forwarded them. Keep the output for yourself, leave confidential items out, and check before you share. Exercise B's sandbox has exactly this trap." }
  ],

  // {group: "..."} = an unnumbered heading row; keep its minutes in line with the exercises below.
  // How to schedule follows the Claude Help Center ("Schedule recurring tasks", checked Nov 19, 2026); there is no /schedule command.
  steps: [
    { group: "Exercise A · ~8 min" },
    { title: "Connect one app", text: "In **Customize → Connectors**, connect one app and sign in with your own account. In the chat, turn on only that connector. Or share the `work-week/` folder in the desktop app.",
      shot: { image: "assets/img/m6-connect-steps.svg", wide: true, caption: "Illustration. Your screens may look slightly different.",
              alt: "Illustration in three panels. 1, Customize, Connectors: a list of apps, each with a Connect button; pick one app and click Connect. 2, sign in with your own account: the sign-in screen lists what Claude will be able to do, such as see your events and create, change or delete events; read it, then click Allow. 3, in a chat, the plus menu, Connectors: Google Calendar is switched on, Gmail and Slack are off; turn on only what this task needs." } },
    { title: "Send a read-only prompt", text: "Send Exercise A's prompt. It ends with the read-only line and asks Claude to list what it looked at." },
    { title: "Check one item", text: "Compare one line of the output with the email, invite or document it came from." },
    { group: "Exercise B · ~9 min (paid plans)" },
    { title: "Schedule it", text: "Either describe the task and how often it should run in a chat, answer Claude's questions, review the name, schedule and instructions, and click **Schedule**. Or open **Scheduled** in the sidebar → **New task** → **Create with Claude** or **Set up manually**. Frequency: hourly, daily, weekdays, weekly or manually.",
      shot: { image: "assets/img/m6-schedule-form.svg", caption: "Illustration of Set up manually. Your form may look different.",
              alt: "Illustration of the Create scheduled task form: a name (Morning digest), the prompt, a frequency menu set to Weekdays, an approval setting set to ask before any action, and Cancel and Save buttons. Labels: 1, how often. 2, keep it asking you first." } },
    { title: "Keep approvals on", text: "If you see an approval setting, keep Claude asking you before any action. Your prompt says read-only too." },
    { title: "Run it now and review", text: "On the **Scheduled** page, use **Run now** instead of waiting until tomorrow. Open the run and check one item again before you rely on it." },
    { title: "Know how to stop it", text: "**Scheduled** → the task: pause it, edit its instructions, or delete it." },
    { title: "Disconnect when you're done", text: "Used a personal account? Open **Customize → Connectors**, open the app's menu and choose **Disconnect**.",
      shot: { image: "assets/img/m6-disconnect.svg", caption: "Illustration. Your screen may look slightly different.",
              alt: "Illustration of Customize, Connectors. Google Calendar shows Connected, and its menu button is open with the option Disconnect highlighted. Label: done with the exercise? Disconnect." } }
  ],
  // A worked first run with the sandbox (same widget as Modules 4-5)
  stepsDemo: {
    title: "Watch a schedule: the first run",
    turns: [
      { who: "you", text: "Every weekday at 7am, using the files in work-week/: list today's meetings and the emails that need a reply, in under 10 lines. Read only: don't send, create, change or delete anything. List what you looked at.",
        note: "**Describe it.** The task, how often, and the read-only line." },
      { who: "claude", text: "I can set this up as a scheduled task: \"Morning digest\", weekdays at 7:00am, using the work-week folder. It uses a folder on your computer, so it runs only while the desktop app is open. Schedule it?",
        note: "**Review** the name, schedule and instructions, then click **Schedule**." },
      { who: "you", text: "Run now.",
        note: "**Run it now** from the Scheduled page, instead of waiting until tomorrow." },
      { who: "claude", text: "Morning digest, Tue Nov 17. 10:00 Referral program terms with Summit Gear Rentals: they propose $45 per referred member and 12-month exclusivity in the Southeast…",
        note: "**Check it.** Those terms come from the partner's email marked \"Confidential: do not forward\". A digest that copies them has just forwarded them." },
      { who: "you", text: "Edit the task: leave out anything marked confidential; just note that it exists.",
        note: "**Fix the prompt,** not just this run: Scheduled → the task → edit its instructions." },
      { who: "claude", text: "Updated. Morning digest, Tue Nov 17. 10:00 Referral program terms (one confidential email from the partner; details left out).",
        note: "Clean. Check one more run before you rely on it, and pause it when the exercise is over (step 7)." }
    ]
  },
  tip: "End every connected prompt with \"Read only: don't send, create, change or delete anything. List what you looked at.\" It keeps the task safe and the output checkable.",
  transfer: "Microsoft Copilot and Google Gemini connect to Microsoft 365 and Google Workspace in the same way, and ChatGPT (Tasks) and Gemini (scheduled actions) can run prompts on a schedule too. The same least-access habits apply.",

  exercises: [
    {
      title: "A · Connect one app and run a task once",
      where: "Claude, one app connected (or work-week)",
      minutes: 8,
      // intro / deliverable: a sentence, a list of bullets, or {text, points}
      intro: { text: "Run one real task once, read-only, and check it.", points: [
        "Pick one task you'd actually use: **meeting prep** for tomorrow, a **weekly digest** of a channel or folder, or a **Friday status note** from documents in Drive",
        "Fill in the brackets and send the prompt",
        "Check one item in the output against its source"
      ]},
      promptLabel: "Copy this prompt and fill in the brackets",
      prompt: "[[Connection::Using my [calendar / email / Drive / Slack] connection:]] [[Task::[your task, e.g. for each meeting tomorrow, list attendees, the last related email or document, and 3 questions I should ask].]]\n[[Length::One page.]]\n[[Read only::Read only: don't send, create, change or delete anything.]]\n[[What you looked at::At the end, list what you looked at.]]",
      help: { title: "Using the sandbox?",
        text: "Share the `work-week/` folder in the desktop app (download it in *Before you start*). Instead of naming a connection, start your prompt with: *\"Using the files in work-week/ as my calendar, inbox and notes:\"*" },
      deliverable: { text: "Keep:", points: [
        "The output",
        "One item you checked: what it was, and whether it matched its source"
      ]},
      goodLooksLike: { text: "**Meeting prep from the sandbox:**\n**Trail Club price test: kickoff** · Mon 2:00–3:00pm, Zoom\n**Attendees:** CFO, Head of Sales, Analytics Lead, you\n**Last related:** the CFO's email of Fri Nov 13 (test $49 in the Southeast and Midwest for three months); `notes/price-test-design.md`\n**Ask:** 1) Is three months long enough to see churn change? 2) What churn would make us stop the test early? 3) Who owns the regional baseline?\n**Looked at:** calendar.csv, emails/01, notes/price-test-design.md" },
      reveal: {
        title: "Check your output (open it after you've run yours)",
        text: "**Every line has a source:** an email, an invite or a document you can open.\n**You checked one item:** the date, number or name matches its source.\n**Nothing was sent or changed:** no drafts, replies, events or edits.\n**The \"looked at\" list makes sense:** nothing you didn't expect, like someone else's private messages."
      }
    },
    {
      title: "B · Schedule it",
      where: "Claude: Scheduled (paid plans)",
      minutes: 9,
      intro: { text: "Turn Exercise A's task into one that runs by itself.", points: [
        "Fix anything your check in Exercise A turned up",
        "Schedule it: send the prompt below in a chat and click **Schedule**, or use **Scheduled → New task** (steps 4–5)",
        "Use **Run now**, and check one item in the run",
        "Write the **data check**: what it can see, who gets the output, how much time it saves",
        "On a Free plan? Write the schedule as a plan instead: the task, when it would run, and the data check"
      ]},
      promptLabel: "Copy this prompt and fill in the brackets",
      prompt: "[[When::Schedule this to run [every weekday at 7am / every Monday at 8am]:]]\n[[Task::[your prompt from Exercise A, with any fixes].]]\n[[Read only::Read only: don't send, create, change or delete anything.]]\n[[Confidential::Leave out anything marked confidential; just note that it exists.]]",
      deliverable: { text: "Keep:", points: [
        "Your scheduled task (or, on a Free plan, your written plan)",
        "One run you checked with **Run now**",
        "Your data check, in three sentences"
      ]},
      stretch: "Combine it with your Module 5 skill, or ask for a fixed format, so every run looks the same and is quicker to check.",
      goodLooksLike: { text: "**A data check for a weekday digest of the sandbox:**\n*It can see:* the work-week folder only: this week's calendar, six emails and two notes. Not my real inbox.\n*Who gets the output:* only me, on the Scheduled page. Nothing is sent or shared.\n*Time saved:* about 15 minutes each weekday morning, a little over an hour a week." },
      reveal: {
        title: "Before you leave it running (open it after you've scheduled yours)",
        text: "**It can see everything your account sees in that app,** not just what you had in mind.\n**Only you get the output,** unless your prompt sends or shares it. Keep it that way until you've checked several runs.\n**The prompt says read-only,** and approvals are on.\n**Confidential items are left out.** Using the sandbox? Your digest shouldn't copy the partner's email marked \"Confidential: do not forward\".\n**You know how to stop it:** Scheduled → the task → pause or delete (step 7)."
      }
    }
  ],

  responsibleUse: {
    // Box 1: this module's rule (same layout as Modules 3-5)
    title: "Connected apps: what to check",
    text: "**A connector acts with your sign-in,** so anything Claude does there looks like you did it.",
    useLabel: "Connect", use: ["Apps your organization approved for Claude", "A calendar or folder with only your own items", "The work-week sandbox"],
    neverLabel: "Never connect", never: ["A shared inbox or team drive you don't own", "Work apps your employer hasn't approved", "Accounts that hold clients' or patients' data"],
    after: ["**Before you click Allow, check:**",
            ["What it will do", "To whom, or where", "That you asked for it"],
            "On Team and Enterprise plans, your organization decides whether Claude must ask before sending, sharing, moving or deleting."],
    shot: { image: "assets/img/m6-approval.svg", caption: "Illustration. The real request may look different. Read it before you click.",
            alt: "Illustration of an approval request in a chat. Claude wants to use Gmail to send an email to cfo@ridgeway.example with the subject Re: price test kickoff, with Deny and Allow buttons. Labels: 1, what it will do. 2, to whom. 3, not what you asked for? Deny." },
    tip: "Done with the exercises? Disconnect personal accounts (step 8).",
    note: "More from Anthropic: [Use connectors](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities) · [Use Claude Cowork safely](https://support.claude.com/en/articles/13364135-use-claude-cowork-safely).",
    // Box 2: the five habits from the whole course, each with the module that taught it
    wrapUp: {
      title: "The course wrap-up: five habits",
      rules: [
        "**Verify before you rely on it** *(Modules 1–2)*. AI output is a draft until you've checked it. The higher the stakes, the more you check.",
        "**Follow the data rules** *(Module 1)*. Work data only in apps and tools your organization has approved for it. Other people's emails, names and meeting details are their information.",
        "**Disclose AI help** *(every module)* where your course or workplace expects it. When in doubt, say how you used it, for example: *\"I used Claude to draft this summary and checked every figure against the source.\"*",
        "**People stay accountable** *(Module 3)*. You sign off on the email, the decision and the summary, whoever drafted it.",
        "**Least access** *(Modules 3 and 6)*. Start read-only. Approve any send, edit or delete yourself, every time."
      ],
      note: "More: [MIT IS&T guidance for the use of generative AI](https://ist.mit.edu/ai-guidance)."
    }
  },

  // Facts from the Claude Help Center (connectors, Microsoft 365, scheduled tasks), checked Nov 19, 2026
  stuck: [
    { problem: "The app I want isn't in the Connectors list",
      fix: "On a personal plan, search for it under **Customize → Connectors → +**. On a Team or Enterprise plan, an owner has to turn it on for your organization first. Otherwise, try another app or use the `work-week/` sandbox." },
    { problem: "\"Access blocked\" or \"admin approval required\" when I sign in",
      fix: "The app's own administrator has to approve Claude first. For **Microsoft 365 with a work or school account**, that's a one-time consent from your organization's Microsoft administrator (MIT IS&T, or your employer's IT). Use the sandbox for now and mention it at office hours so we can track it." },
    { problem: "Claude doesn't use my connector",
      fix: "It isn't on in this chat: click **+ → Connectors** and turn it on. Still nothing? Your sign-in may have expired: reconnect it under **Customize → Connectors**." },
    { problem: "I connected the wrong account",
      fix: "For example, your work account instead of a personal one. Disconnect it (step 8), then connect again and pick the right account when you sign in." },
    { problem: "Claude asks to send, edit or delete something",
      fix: "Deny it. Then check that your prompt says read-only and your approval setting is on. Review any draft yourself before anything goes out." },
    { problem: "I can't schedule anything",
      fix: "Scheduled tasks need a paid plan (Pro or above, Team or Enterprise). On a Free plan, write the schedule as a plan instead, as in Exercise B." },
    { problem: "My scheduled task didn't run",
      fix: "Tasks that use a folder on your computer (like the sandbox) run only while your computer is awake and the desktop app is open. Tasks that only use connectors run in the cloud. Check its past runs on the **Scheduled** page, or use **Run now**." },
    { problem: "The output included something confidential",
      fix: "Pause the task on the **Scheduled** page and edit its instructions (\"Leave out anything marked confidential; just note that it exists\"), so every future run changes, not just this one. Delete that run. If it's someone else's information, mention it at office hours." }
  ],

  // grouped like Modules 4-5; all links checked Nov 19, 2026
  resources: [
    { group: "Start here", source: "Claude Help Center", type: "Help article",
      label: "Use connectors to extend Claude's capabilities", url: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities" },
    { group: "Start here", source: "Claude Academy", type: "Tutorial",
      label: "Getting started with connectors", url: "https://academy.claude.com/tutorials/getting-started-with-connectors" },
    { group: "Claude how-to", source: "Claude Help Center", type: "Help article",
      label: "Use Google Workspace connectors", url: "https://support.claude.com/en/articles/10166901-use-google-workspace-connectors" },
    { group: "Claude how-to", source: "Claude Help Center", type: "Help article",
      label: "Connect to Microsoft 365", url: "https://support.claude.com/en/articles/15183774-connect-to-microsoft-365" },
    { group: "Claude how-to", source: "Claude Help Center", type: "Help article",
      label: "Schedule recurring tasks in Claude Cowork", url: "https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork" },
    { group: "Claude how-to", source: "Claude Help Center", type: "Help article",
      label: "Use Claude Cowork safely", url: "https://support.claude.com/en/articles/13364135-use-claude-cowork-safely" },
    { group: "Learn more", source: "Claude Academy", type: "Video tutorial",
      label: "Delegating and scheduling tasks in Claude Cowork", url: "https://academy.claude.com/tutorials/delegating-and-scheduling-tasks-in-claude-cowork" },
    { group: "Learn more", source: "claude.com", type: "Directory",
      label: "Claude connectors directory", url: "https://claude.com/connectors" },
    { group: "Learn more", source: "modelcontextprotocol.io", type: "Docs",
      label: "What is the Model Context Protocol (MCP)?", url: "https://modelcontextprotocol.io/docs/getting-started/intro" },
    { group: "The course wrap-up", source: "MIT IS&T", type: "Guidance",
      label: "Guidance for the use of generative AI", url: "https://ist.mit.edu/ai-guidance" },
    { group: "The course wrap-up", source: "Claude Academy", type: "Tutorial",
      label: "Writing an AI diligence statement", url: "https://academy.claude.com/tutorials/writing-an-ai-diligence-statement" },
    { group: "The course wrap-up", source: "Claude Academy", type: "Tutorial",
      label: "Can you trust what AI tells you?", url: "https://academy.claude.com/tutorials/can-you-trust-what-ai-tells-you" }
  ]
};
