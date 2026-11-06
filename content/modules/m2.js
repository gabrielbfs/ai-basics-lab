/* ==========================================================================
   Module 2 · Research & analysis
   Spec: AI_Basics_Lab_Revision_Plan.md, "Module 2 · Research & analysis with your data"
   Downloads: assets/files/m2/, made by tools/make-m2-files.js (the numbers in
   Exercise A's "Check your answer" come from that script's answer key).
   Status: revised Nov 3, 2026 (household practice data, no demo, templates only)
   ========================================================================== */
window.AIB_MODULES = window.AIB_MODULES || {};
window.AIB_MODULES["m2"] = {
  id: "m2",
  title: "Research & analysis",
  level: "Builds on Module 1",

  goal: "Research with sources, analyze a spreadsheet, check both yourself, and collect the numbers your tool needs.",
  outcomes: ["Get a sourced answer and verify one source", "Analyze a dataset and produce a chart", "Spot an error or weak assumption", "Collect the assumptions your tool needs"],

  budget: { read: 5, do: 21, check: 4 },

  before: {
    needs: [
      { text: "Your 3-sentence project idea from Module 1.",
        ifNot: "No idea yet? Do [Module 1, Exercise B](m1.html#s-exercise) first (8 min)." },
      { text: "The practice file, downloaded (CSV or Excel): a fictional household's 2025 card spending, one row per transaction.",
        files: [
          { label: "Practice file (.csv)", url: "assets/files/m2/household-spending-2025.csv" },
          { label: "Practice file (.xlsx)", url: "assets/files/m2/household-spending-2025.xlsx" }
        ] },
      "Claude open in a new chat. If the Excel file won't upload, use the CSV.",
      "Excel, Google Sheets or Numbers open, to recompute one number yourself."
    ]
  },

  breakdown: {
    key: "Garbage in, garbage out: an analysis is only as good as its sources and its rows. Check both before you trust the answer.",
    concepts: [
      { title: "Research with sources",
        text: "Ask for sources, then open them. Check that the page says what Claude claims, for the same year, place and definition." },
      { title: "Analysis: method first",
        text: "Upload the file and ask Claude to describe its method before it calculates. A wrong approach is easier to catch before it runs." },
      { title: "Charts that answer the question",
        text: "Ask for the chart that fits the question (\"spending by category, Q2 vs. Q3\"), not just \"a chart\"." },
      { title: "Verify the numbers",
        text: "Recompute one figure yourself in Excel or Sheets, and count the rows. Then ask what the data *can't* tell you." }
    ]
  },

  examples: [
    { title: "Researching a number",
      weak: "what's the market size for X",
      strong: "Estimate the US market size for X top-down and bottom-up. List every assumption with a source I can open, and flag the shakiest one.",
      why: "Two methods that should roughly agree, sources you can check, and a pointer to the weakest link." },
    { title: "Analyzing a file",
      weak: "analyze this data",
      strong: "This is a year of my team's expense reports, one row per expense. Which category grew most in Q3? Show me your method first, then one chart and one caveat.",
      why: "A specific question, the method before the answer, and a limit on what comes back." }
  ],

  steps: [
    { title: "Upload the practice file", text: "Attach the file from **Before you start** to a new chat." },
    { title: "Ask for the method, then the answer", text: "Approve the method before Claude calculates. Then ask for one chart and one caveat." },
    { title: "Recompute one number", text: "In Excel or Sheets, filter or use SUMIFS to add up one figure yourself, and count the rows." },
    { title: "Research your assumptions", text: "Ask for 3–5 assumptions with sources, and open at least one yourself." }
  ],
  tip: "If Claude's number and yours differ, ask Claude to list the exact rows it added up. The difference is usually in which rows were included, not in the arithmetic.",
  transfer: "The same checks apply to Copilot in Excel and to ChatGPT's file analysis.",

  exercises: [
    {
      title: "A · Find what's wrong in the practice data",
      where: "Claude chat + file upload",
      minutes: 10,
      intro: "The practice file is a year of card spending for a **fictional household**: one row per transaction, from two cards. Attach it to a new chat (download it in **Before you start**) and send the prompt. When Claude answers, recompute one number yourself: **Dining out in Q3** (July–September), with its row count.",
      help: { title: "How to recompute one number (filter or formula)",
        text: "**Option 1: filter.** Click the header row and turn on filters (Excel: **Data → Filter**; Google Sheets: **Data → Create a filter**). Set `category` to *Dining out* and `quarter` to *Q3*. Select the `amount_usd` cells: Excel shows the sum and count in the status bar at the bottom; Google Sheets shows the sum in the bottom-right corner (click it to see the count).\n\n**Option 2: formula.** In an empty cell, type:\n`=SUMIFS(F:F, E:E, \"Dining out\", B:B, \"Q3\")`\nand to count the rows:\n`=COUNTIFS(E:E, \"Dining out\", B:B, \"Q3\")`\n(Column B is `quarter`, E is `category`, F is `amount_usd`.)" },
      prompt: "This file is a year of our household's card spending (made up): one row per transaction.\nMy partner says our spending jumped this summer (July–September, compared with April–June) because we ate out more. Is that right?\nFirst describe your method and wait for my OK. Then give the answer, one chart that fits the question, one caveat, and what this data can't tell me.",
      deliverable: "Claude's answer, your own Dining out Q3 total and row count, and one sentence: did they agree, and if not, why not?",
      stretch: "Ask Claude to redo the analysis without the problem you found, and compare the two charts. **Have your own file?** Run the same steps on any made-up or public spreadsheet.",
      reveal: { text: "**What's wrong:** 17 rows appear twice. The Amex transactions for August and September (15 Dining out, 2 Entertainment) were added again at the bottom of the file, as if those two statements had been imported twice. Dining out in Q3 should have 21 rows; the file has 36.\n\n**With the duplicates:** Dining out in Q3 is $2,106.90, up $867.34 from Q2 ($1,239.56). Eating out looks like the cause, and total spending looks up $1,330.14.\n\n**Without them:** Dining out in Q3 is $1,268.75, up only $29.19. The real driver is **Travel**: $186.00 in Q2 vs. $718.50 in Q3 (flights and a hotel in July), up $532.50. Total spending rose $346.47, not $1,330.14.\n\nSo the claim was wrong twice: spending rose much less than it looked, and eating out wasn't the reason.\n\nIf Claude caught the duplicates on its own, good. The habit still holds: recompute one number before you rely on an answer.\n\n**What this data can't tell you:** whether the trip was a one-off, or what next quarter will look like. And it covers only two cards: cash, bank transfers and other cards aren't in it." }
    },
    {
      title: "B · The assumptions your tool needs",
      where: "Claude chat",
      minutes: 11,
      intro: "Send the prompt with your project idea. Then **open at least one source yourself** and fill in the `checked` column: *yes* (the page says it), *partly* (close, but a different year, place or definition) or *no*. **Your tool needs no outside numbers** (a habit tracker, say)? List its inputs with your own estimates and write *my estimate* as the source. Save both tables in your **ai-basics** folder (Setup A) as **assumptions** and **sample-data** (.xlsx or .csv); Module 3 reads them.",
      files: [
        { label: "Template (.xlsx)", url: "assets/files/m2/assumptions-template.xlsx" },
        { label: "Template (.csv)", url: "assets/files/m2/assumptions-template.csv" }
      ],
      prompt: "My project: [paste your 3-sentence idea from Module 1]\n1) List the 3–5 inputs and assumptions this tool needs. For each, give a typical value and a range, with a source I can open. If a value is my own choice or estimate, say so instead of citing a source. Use a table with these columns: input, unit, typical_value, range, source, checked, note. Leave 'checked' empty; I'll fill it in.\n2) Tell me which assumption you're least sure of, and why.\n3) Make a small sample dataset (10–20 rows) for the tool, with clearly made-up values, as a table I can paste into a spreadsheet.",
      deliverable: "Two files in your ai-basics folder: your assumptions table, with at least one row checked, and your sample data.",
      stretch: "Ask Claude to argue against its own top assumption. Did the range change?",
      goodLooksLike: { text: "**A work project (pricing tool).** Gross margin · % of revenue · typical 72 · range 63–72 · Damodaran, NYU Stern (Jan 2026) · checked: **yes** · System and application software averages 71.7%, internet software 62.6%. These are large public companies, not startups.\n\n**A personal project (savings goal planner).** Amount I can save each month · USD · typical 400 · range 250–600 · my estimate, from my last 3 months of spending · checked: **n/a** · My own number, not research. I'll update it as my budget changes." }
    }
  ],

  responsibleUse: {
    title: "What you upload, Claude reads",
    rules: [
      "**No confidential company data, even \"just to test.\"** Use the practice file, or a made-up or public one.",
      "**Uploading a file shares all of it,** including hidden columns, other sheets, comments and file properties. Check before you upload.",
      "**A source Claude cites is a lead, not proof.** Open it before a number goes into your tool."
    ]
  },

  stuck: [
    { problem: "Claude says it can't search the web",
      fix: "Web search may be switched off. On Enterprise accounts an Owner turns it on for everyone; after that you may see **Web search** in the chat's **+** menu. Meanwhile, ask Claude for sources by name, look them up yourself, and mention it at office hours." },
    { problem: "The Excel file won't upload, or Claude can't read it",
      fix: "Use the CSV version. Uploading .xlsx files needs code execution and file creation turned on for your account." },
    { problem: "Claude can't give me a file to download",
      fix: "Ask for the table in the chat, then paste it into the template." },
    { problem: "My number doesn't match Claude's",
      fix: "Ask Claude to list the rows it added up, and count yours. Differences are usually in which rows were included." },
    { problem: "I can't find a source for an assumption",
      fix: "Keep the row, mark it `checked: no`, and call it an estimate in the note. An honest estimate beats an invented source." }
  ],

  checks: [
    { text: "I opened one source and checked that it says what Claude claimed", evidence: "Name the source and what you found." },
    { text: "I recomputed one number myself", evidence: "Your Dining out Q3 total and row count, and whether they matched Claude's." },
    { text: "I can say what a dataset can't answer", evidence: "One example from the practice file." },
    { text: "My assumptions table and sample data are saved", evidence: "Both files in your ai-basics folder." }
  ],
  quiz: [
    { q: "Claude says the market for your product was $2.4B, citing an industry report. You open the report: it does say $2.4B, but for Europe in 2019, and you need the US today. What do you do?",
      options: [
        "Use it: the number matches the source",
        "Treat it as unverified for your question: find a current US figure, or adjust it and say how",
        "Ask Claude to confirm the number"
      ],
      answer: 1,
      explain: "A matching number isn't enough. It has to be for the same year, place and definition, or it isn't evidence for your question." },
    { q: "Claude analyzes your spending file and says eating out drove the increase. What's the best next step?",
      options: [
        "Ask Claude to double-check its math",
        "Recompute one number yourself and count the rows behind it",
        "Ask for a chart to confirm it"
      ],
      answer: 1,
      explain: "Claude re-checking itself and a chart of the same numbers both reuse the same inputs. Your own recompute catches problems in the rows." },
    { q: "Which question can a year of card transactions (date, merchant, category, amount) answer?",
      options: [
        "Why spending on travel went up",
        "How much the household spends in total, including cash",
        "Which category's card spending grew most from Q2 to Q3"
      ],
      answer: 2,
      explain: "The file shows what was charged to these cards, not why, and not spending in cash or on other cards." }
  ],

  resources: [
    { label: "Claude Help Center: Enable and use web search", url: "https://support.claude.com/en/articles/10684626-enable-and-use-web-search" },
    { label: "Claude Help Center: Use research on Claude", url: "https://support.claude.com/en/articles/11088861-using-research-on-claude-ai" },
    { label: "Claude Help Center: Upload files to Claude", url: "https://support.claude.com/en/articles/8241126-upload-files-to-claude" },
    { label: "Claude Help Center: Create and edit files with Claude", url: "https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" },
    { label: "Public data: Data.gov", url: "https://data.gov/" },
    { label: "Public data: US Census Bureau", url: "https://www.census.gov/data.html" },
    { label: "Public data: Our World in Data", url: "https://ourworldindata.org/" },
    { label: "Public data: Damodaran (NYU Stern) industry data", url: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datacurrent.html" }
  ]
};
