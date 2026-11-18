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
  title: "Research & Analysis",
  level: "Builds on Module 1",

  goal: "Learn to research with sources and analyze a spreadsheet, then check Claude's work.",
  outcomes: ["Get a sourced answer", "Turn data into a chart", "Spot a weak assumption", "List your tool's numbers"],

  budget: { read: 5, do: 23, check: 2 },

  before: {
    needs: [
      { text: "Your 3-sentence project idea from Module 1.",
        ifNot: "No idea yet? Do [Module 1, Exercise B](m01-briefing-claude.html#s-exercise) first (8 min)." },
      { text: "The practice file, downloaded (CSV or Excel): a fictional household's 2025 card spending, one row per transaction, with date, month, quarter, card, merchant, category, amount and transaction ID.",
        files: [
          { label: "Practice file (.csv)", url: "assets/files/m2/household-spending-2025.csv" },
          { label: "Practice file (.xlsx)", url: "assets/files/m2/household-spending-2025.xlsx" }
        ] },
      "Claude open in a new chat. If the Excel file won't upload, use the CSV.",
      "Excel, Google Sheets or Numbers open, to recompute one number yourself."
    ]
  },

  breakdown: {
    key: "Garbage in, garbage out: check the sources and the rows before you trust the answer.",
    figure: { top: true, image: "assets/img/m2-analysis-flow.svg",
              alt: "Diagram of four steps in a row: 1 Sources (check them yourself), 2 Method (before the math), 3 Chart (fits the question), 4 Recompute (one number yourself)." },
    // text can be one paragraph or a list of short bullets (same style as Module 1)
    concepts: [
      { title: "Check the sources",
        text: ["Ask for sources you can open", "Open them yourself", "Same year, place and definition?"] },
      { title: "Method before math",
        text: ["Upload the file", "Ask Claude to describe its method first", "A wrong approach is easier to catch before it runs"] },
      { title: "Ask for the chart you need",
        text: ["Name the comparison", "✗ \"Make a chart\"", "✓ \"Spending by category, Q2 vs. Q3\""] },
      { title: "Recompute one number",
        text: ["Redo one figure in Excel or Sheets", "Count the rows too", "Ask what the data *can't* tell you"] }
    ]
  },

  // Student tools, same card format as Module 1's prompt frameworks. SIFT and CRAAP check sources;
  // the other four shape the analysis and how it's presented. The data-quality list is in Exercise A's
  // "Check your answer" instead, because it names the planted problem (duplicates).
  frameworks: {
    title: "Research & analysis frameworks",
    intro: "There are many frameworks for checking sources and structuring an analysis. None is required. **SIFT** and **CRAAP** help you check sources; the other four help you ask for an analysis and present it. Pick the ones you'll remember.",
    cards: [
      { name: "SIFT", goodFor: "A number or claim Claude cites",
        parts: [["Stop", "don't use it yet"], ["Investigate the source", "who published it, and why"],
                ["Find better coverage", "do other sources agree?"], ["Trace to the original", "the first study or table: its year, place and definition"]] },
      { name: "CRAAP", goodFor: "Judging a whole page or report",
        parts: [["Currency", "how recent is it?"], ["Relevance", "does it fit your case?"], ["Authority", "who wrote it?"],
                ["Accuracy", "does it show its data and method?"], ["Purpose", "informing or selling?"]] },
      { name: "Chart chooser", goodFor: "Asking for the chart you need",
        parts: [["Comparison", "bar chart", "bar"], ["Change over time", "line chart", "line"], ["Parts of a whole", "stacked bar", "stacked"],
                ["Distribution", "histogram", "hist"], ["Relationship", "scatter plot", "scatter"]] },
      { name: "Issue tree (MECE)", goodFor: "Breaking down an analysis",
        parts: [["Question", "the one thing you want to know"], ["Branches", "split it into parts"],
                ["No overlaps", "each item fits one branch only"], ["No gaps", "together, the branches cover everything"]] },
      { name: "Pyramid Principle", goodFor: "Presenting results",
        parts: [["Answer", "first, in one sentence"], ["Supporting points", "about 3 reasons"], ["Detail", "data and caveats last"]] },
      { name: "5 Whys", goodFor: "Following up a surprising result",
        parts: [["Ask why", "why did this happen?"], ["Ask again", "why did that happen?"], ["Repeat", "up to 5 times"],
                ["Stop", "at a cause you can check or fix"]] }
    ],
    sample: {
      title: "See one case in each framework",
      task: "**Made-up example** · Your tool needs a gross-margin assumption. Claude says a typical SaaS gross margin is about 75%, citing a software vendor's blog. Another source you found says about 63%.",
      tryIt: "Each prompt applies one framework to the same case. Copy one into Claude and compare what you get.",
      items: [
        { name: "SIFT",
          prompt: "**Stop:** Don't treat the 75% as settled yet.\n**Investigate:** Who published the source you cited, and what do they sell?\n**Find:** Give me two other sources I can open that report SaaS gross margins.\n**Trace:** For each, link the original study or table, and say which companies and which year it covers." },
        { name: "CRAAP",
          prompt: "Rate the source you cited for the 75% gross margin:\n**Currency:** When was it published or last updated?\n**Relevance:** Does it cover companies like mine (size, stage, region)?\n**Authority:** Who wrote it, and what's their expertise?\n**Accuracy:** Does it show its data or method?\n**Purpose:** Is it informing, or selling something?" },
        { name: "Chart chooser",
          prompt: "**Question:** How does my margin assumption compare with what the sources report?\n**Type:** That's a comparison, so use a bar chart.\n**Ask:** Make a bar chart with one bar per source (75% and 63%) and one for my assumption. Label each bar with its source and year." },
        { name: "Issue tree (MECE)",
          prompt: "Break down \"Why do the sources disagree: 75% vs. 63%?\" into branches with no overlaps and no gaps:\n**Who:** which kinds of companies each source covers\n**When:** which year each figure is from\n**How:** how each source defines gross margin\nOne line per branch, then say which branch explains most of the gap." },
        { name: "Pyramid Principle",
          prompt: "Recommend the gross-margin assumption for my tool.\n**Answer first:** the value to use, in one sentence.\n**Supporting points:** up to 3 reasons, one per source.\n**Detail last:** a table with each source, its year, what it covers, and one caveat." },
        { name: "5 Whys",
          prompt: "The sources disagree: 75% vs. 63%. Ask \"why?\" up to 5 times to find the root cause, one line per answer. Stop when you reach something I can check myself, and tell me how to check it." }
      ]
    }
  },

  // Same format as Module 1: one example per key idea, in the same order.
  // [[Tag::words]] colors those words in the strong prompt and shows a matching tag.
  examplesIntro: "Read each weak prompt and guess what's missing. Then open **What changed?** to check.",
  examplesGuess: true,
  examples: [
    { title: "Researching a number", idea: "Check the sources",
      weak: "what's the market size for X",
      strong: "[[Task::Estimate the US market size for X]] [[Method::top-down and bottom-up.]] [[Sources::List every assumption with a source I can open,]] [[Self-check::and flag the shakiest one.]]",
      gets: { weak: "One confident number, with no way to check it.",
              strong: "Two estimates that should roughly agree, sources to open, and the weakest link." },
      why: "Two methods that should roughly agree, sources you can check, and a pointer to the weakest link." },
    { title: "Analyzing a file", idea: "Method before math",
      weak: "analyze this data",
      strong: "[[Context::This is a year of my team's expense reports, one row per expense.]] [[Question::Which category grew most in Q3?]] [[Method first::Show me your method first,]] [[Format::then one chart and one caveat.]]",
      gets: { weak: "A long summary of everything in the file.",
              strong: "The method to approve, then one answer, one chart and one caveat." },
      why: "A specific question, the method before the answer, and a limit on what comes back." },
    { title: "Asking for a chart", idea: "Ask for the chart you need",
      weak: "make a chart",
      strong: "[[Chart type::Make a bar chart]] [[Comparison::of spending by category, Q2 next to Q3,]] [[Order::sorted by the change.]] [[Labels::Label each bar with its dollar amount.]]",
      gets: { weak: "Whatever chart Claude picks, often a pie of the whole year.",
              strong: "One chart that answers the question at a glance." },
      why: "It names the comparison, so Claude picks the right chart type (see the **Chart chooser** above), and it says how to sort and label it." },
    { title: "Checking the result", idea: "Recompute one number",
      weak: "are these numbers right?",
      strong: "[[One number::For Travel in Q3, give me the total and the number of rows,]] [[Method::and the exact filter you used,]] [[Purpose::so I can recompute it myself.]]",
      gets: { weak: "\"Yes, the numbers are correct.\"",
              strong: "A total, a row count and a filter you can repeat in Excel or Sheets." },
      why: "\"Are these right?\" usually gets a yes. Asking for the total, the row count and the filter gives you something to check." }
  ],

  // {group: "..."} = an unnumbered heading row; keep its minutes in line with the exercises below
  steps: [
    { group: "Exercise A · ~10 min" },
    { title: "Upload the practice file", text: "Attach it from **Before you start** to a new chat.",
      shot: { image: "assets/img/m2-attach-file.svg", caption: "Illustration. Your screen may look slightly different. You can also drag the file into the chat box.",
              alt: "Illustration of the Claude chat box. Step 1: the + button at the bottom left is highlighted. Step 2: its menu is open, and Add files or photos is highlighted." } },
    { title: "Send the prompt, approve the method", text: "Copy Exercise A's prompt. Say OK to the method before Claude calculates." },
    { title: "Recompute one number", text: "Dining out in Q3: add it up in Excel or Sheets, and count the rows." },
    { title: "Compare", text: "Do your numbers match Claude's? If not, find out why." },
    { group: "Exercise B · ~13 min" },
    { title: "List your assumptions", text: "Send Exercise B's prompt with your project idea." },
    { title: "Check the sources", text: "Open each one and fill in the `checked` column." },
    { title: "Save two files", text: "**assumptions** and **sample-data** in your **ai-basics** folder. Module 3 reads them." }
  ],
  tip: "Numbers don't match? Ask Claude to list the exact rows it added up. The difference is usually which rows were included, not the math.",
  transfer: "The same checks apply to Copilot in Excel, Gemini in Google Sheets and ChatGPT's file analysis.",

  exercises: [
    {
      title: "A · Check Claude's analysis",
      where: "Claude chat + file upload",
      minutes: 10,
      intro: {"text":"The practice file is a year of card spending for a **made-up household**, one row per transaction. Test one claim and catch what's wrong.","points":["Attach the file (from **Before you start**) to a new chat and send the prompt","Approve Claude's method","Recompute **Dining out in Q3** (July–September) yourself, with its row count","Compare with Claude's numbers"]},
      help: { title: "How to recompute one number (filter or formula)",
        shot: { image: "assets/img/m2-recompute-sheet.svg",
                caption: "Illustration, using **Groceries in Q2** as the example. Do the same for Dining out in Q3. Google Sheets shows the sum at the bottom right.",
                alt: "Illustration of a spreadsheet filtered to quarter Q2 and category Groceries. The amount cells are selected, and the status bar at the bottom shows Average $108.65, Count 15 and Sum $1,629.72, with Count and Sum highlighted." },
        text: "**Option 1: filter.** In the Excel file, the filter arrows are already on. In the CSV or Google Sheets, click the header row and turn them on (Excel: **Data → Filter**; Google Sheets: **Data → Create a filter**). Set `category` to *Dining out* and `quarter` to *Q3*. Select the `amount_usd` cells: Excel shows the sum and count in the status bar at the bottom; Google Sheets shows the sum in the bottom-right corner (click it to see the count).\n\n**Option 2: formula.** In an empty cell, type:\n`=SUMIFS(G:G, F:F, \"Dining out\", C:C, \"Q3\")`\nand to count the rows:\n`=COUNTIFS(F:F, \"Dining out\", C:C, \"Q3\")`\n(Column C is `quarter`, F is `category`, G is `amount_usd`.)" },
      promptLabel: "Copy this prompt",
      prompt: "[[Context::This file is a year of our household's card spending (made up): one row per transaction.]]\n[[Question::My partner says our spending jumped this summer (July–September, compared with April–June) because we ate out more. Is that right?]]\n[[Method first::First describe your method and wait for my OK.]]\n[[Format::Then give the answer, one chart that fits the question, one caveat, and what this data can't tell me.]]",
      deliverable: {"text":"Save in your **ai-basics** folder:","points":["Claude's answer and chart","Your Dining out Q3 total and row count","One sentence: did they agree? If not, why not?"]},
      stretch: ["Ask Claude to redo the analysis without the problem you found, and compare the two charts.","**Have your own file?** Run the same steps on any made-up or public spreadsheet."],
      reveal: { shot: { image: "assets/img/m2-before-after.svg",
                alt: "Two bar charts of the change in spending from Q2 to Q3. With the duplicates: Dining out +$867, Travel +$533, Groceries +$73, Utilities +$54, so Dining out looks like the driver. Without them: Travel +$533, Groceries +$73, Utilities +$54, Dining out +$29, so Travel is the real driver." },
      text: "**What's wrong:** 17 rows appear twice. The Amex transactions for August and September (15 Dining out, 2 Entertainment) were added again at the bottom of the file, as if those two statements had been imported twice. Each copy has the same `transaction_id` as the original, which proves it is a duplicate, not a second purchase. Dining out in Q3 should have 21 rows; the file has 36.\n\n**With the duplicates:** Dining out in Q3 is $2,106.90, up $867.34 from Q2 ($1,239.56). Eating out looks like the cause, and total spending looks up $1,330.14.\n\n**Without them:** Dining out in Q3 is $1,268.75, up only $29.19. The real driver is **Travel**: $186.00 in Q2 vs. $718.50 in Q3 (flights and a hotel in July), up $532.50. Total spending rose $346.47, not $1,330.14.\n\nSo the claim was wrong twice: spending rose much less than it looked, and eating out wasn't the reason.\n\nIf Claude caught the duplicates on its own, good. The habit still holds: recompute one number before you rely on an answer.\n\n**What this data can't tell you:** whether the trip was a one-off, or what next quarter will look like. And it covers only two cards: cash, bank transfers and other cards aren't in it.\n\n**Next time, check the data for:** blanks · duplicates (the same `transaction_id` twice) · wrong types (numbers stored as text) · inconsistent labels (\"Dining\" vs. \"Dining out\") · rows outside the period you're asking about." }
    },
    {
      title: "B · The assumptions your tool needs",
      where: "Claude chat",
      minutes: 13,
      intro: {"text":"Your tool will need numbers: prices, rates, times. Collect them now and check where they come from.","points":["Send the prompt with your project idea","Open each source and fill in the `checked` column: *yes* (the page says it), *partly* (close, but a different year, place or definition) or *no*","No outside numbers (a habit tracker, say)? Use your own estimates, with *my estimate* as the source","Save both tables (.xlsx or .csv)"]},
      files: [
        { label: "Template (.xlsx)", url: "assets/files/m2/assumptions-template.xlsx" },
        { label: "Template (.csv)", url: "assets/files/m2/assumptions-template.csv" }
      ],
      prompt: "[[Context::My project: [paste your 3-sentence idea from Module 1].]]\n[[Assumptions::1) List the 3–5 inputs and assumptions this tool needs. For each, give a typical value and a range, with a source I can open. If a value is my own choice or estimate, say so instead of citing a source.]] [[Format::Use a table with these columns: input, unit, typical_value, range, source, checked, note. Leave 'checked' empty; I'll fill it in.]]\n[[Self-check::2) Tell me which assumption you're least sure of, and why.]]\n[[Sample data::3) Make a small sample dataset (10–20 rows) for the tool, with clearly made-up values, as a table I can paste into a spreadsheet.]]",
      deliverable: {"text":"Save in your **ai-basics** folder (Module 3 reads both):","points":["**assumptions**: every source checked, or marked *my estimate*","**sample-data**: 10–20 made-up rows"]},
      stretch: "Ask Claude: \"Argue against your top assumption.\" Did the range change? If so, update your table.",
      goodLooksLike: { text: "**A work project (pricing tool)**\n**Input:** Gross margin · **Unit:** % of revenue · **Typical:** 72 · **Range:** 63–72\n**Source:** Damodaran, NYU Stern (Jan 2026) · **Checked:** yes\n**Note:** System and application software averages 71.7%, internet software 62.6%. These are large public companies, not startups.\n\n**A personal project (savings goal planner)**\n**Input:** Amount I can save each month · **Unit:** USD · **Typical:** 400 · **Range:** 250–600\n**Source:** my estimate, from my last 3 months of spending · **Checked:** n/a\n**Note:** My own number, not research. I'll update it as my budget changes." }
    }
  ],

  responsibleUse: {
    title: "What you upload, Claude reads",
    // "made-up or public data only" is in the course rules box shown right below, so it isn't repeated here
    text: "**Uploading a file shares all of it.** Before you upload, check for:",
    points: ["Hidden columns and rows", "Other sheets", "Comments and notes",
             "File properties (author, company)", "Real names or account numbers in the data"],
    after: ["**A cited source is a lead, not proof.** Open it before a number goes into your tool."],
    tip: "Copy only the columns you need into a new file, and upload that."
  },

  // In the order students meet them: setup, Exercise A, then Exercise B
  stuck: [
    { problem: "Claude says it can't search the web",
      fix: "Web search may be off for your account. An Owner turns it on; then **Web search** appears in the chat's **+** menu. Meanwhile, ask for sources by name and look them up yourself." },
    { problem: "The Excel file won't upload, or Claude can't read it",
      fix: "Use the CSV version. Excel uploads need code execution and file creation turned on for your account." },
    { problem: "Claude calculated before I approved the method",
      fix: "Stop it, and reply: \"Describe your method first and wait for my OK.\"" },
    { problem: "My number doesn't match Claude's",
      fix: "Check that your filter has both category and quarter set. Then ask Claude to list the rows it added up." },
    { problem: "Claude can't give me a file to download",
      fix: "Ask for the table in the chat, then paste it into the template." },
    { problem: "The source is paywalled, or the link is broken",
      fix: "Ask for a free source you can open. No luck? Mark it *partly* or *no*." },
    { problem: "I can't find a source for an assumption",
      fix: "Write *my estimate* as the source and explain it in the note. An honest estimate beats an invented source." }
  ],

  // Go deeper: source and type show in their own columns; group adds a divider row (same table as Module 1)
  resources: [
    { group: "Start here", source: "Claude Help Center", type: "Help article",
      label: "Use research on Claude", url: "https://support.claude.com/en/articles/11088861-using-research-on-claude-ai" },
    { group: "Claude how-to", source: "Claude Help Center", type: "Help article",
      label: "Enable and use web search", url: "https://support.claude.com/en/articles/10684626-enable-and-use-web-search" },
    { group: "Claude how-to", source: "Claude Help Center", type: "Help article",
      label: "Upload files to Claude", url: "https://support.claude.com/en/articles/8241126-upload-files-to-claude" },
    { group: "Claude how-to", source: "Claude Help Center", type: "Help article",
      label: "Create and edit files with Claude", url: "https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" },
    { group: "The frameworks", source: "Mike Caulfield", type: "Article",
      label: "SIFT (the four moves)", url: "https://hapgood.us/2019/06/19/sift-the-four-moves/" },
    { group: "The frameworks", source: "Meriam Library, CSU Chico", type: "Checklist (PDF)",
      label: "The CRAAP test", url: "https://library.csuchico.edu/sites/default/files/craap-test.pdf" },
    { group: "The frameworks", source: "Financial Times", type: "Chart guide",
      label: "Visual Vocabulary: which chart to use", url: "https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary" },
    { group: "Public data", source: "US government", type: "Data portal",
      label: "Data.gov", url: "https://data.gov/" },
    { group: "Public data", source: "US Census Bureau", type: "Data portal",
      label: "Census data", url: "https://www.census.gov/data.html" },
    { group: "Public data", source: "Our World in Data", type: "Data portal",
      label: "Our World in Data", url: "https://ourworldindata.org/" },
    { group: "Public data", source: "NYU Stern (Damodaran)", type: "Dataset",
      label: "Industry data: margins, multiples, cost of capital", url: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datacurrent.html" }
  ]
};
