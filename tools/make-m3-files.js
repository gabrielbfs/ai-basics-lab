#!/usr/bin/env node
/* ==========================================================================
   Make the Module 3 downloads in assets/files/m3/

   Usage (from the site folder):   node tools/make-m3-files.js

     article-buy.docx    reading 1 (fictional): "Stop renting. Buy as soon as you can."
     article-rent.docx   reading 2 (fictional): "Renting isn't throwing money away."

   Exercise A attaches both and asks where they disagree. Each article has one
   caveat that summaries tend to drop (Exercise A's "Check your answer" box):
     buy:  the 5% growth is one city's last ten years, "not a promise"
     rent: the case depends on investing the difference; only 38 of 120 readers do
   Two more weak spots for the answer box:
     buy:  "$350 more builds equity", but in year 1 only ~$335/month of the payment is equity
     buy:  the column is sponsored by a home lender (a conflict of interest)
   Article 2 states all its assumptions (fund 4%/yr, homes 3%/yr), and the script checks
   that they really give "about five years".
   The numbers in the text are computed here and checked.
   ========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const { docxBuffer } = require("./docx-lite");

const OUT = path.resolve(__dirname, "..", "assets", "files", "m3");
fs.mkdirSync(OUT, { recursive: true });

/* ---------- the numbers behind both articles ---------- */
const PRICE = 400000, DOWN = 0.10, RATE = 0.065, YEARS = 30, TAX = 0.011, INSURANCE = 100, RENT = 2400;
const loan = PRICE * (1 - DOWN), r = RATE / 12, n = YEARS * 12;
const mortgage = loan * r / (1 - Math.pow(1 + r, -n));
const monthly = mortgage + PRICE * TAX / 12 + INSURANCE;
const in5 = PRICE * Math.pow(1.05, 5);
const shown = { monthly: Math.round(monthly / 50) * 50, gap: Math.round(monthly / 50) * 50 - RENT, in5: Math.round(in5 / 10000) * 10000, down: PRICE * DOWN };
const expect = { monthly: 2750, gap: 350, in5: 510000, down: 40000 };
for (const k in expect) if (shown[k] !== expect[k]) throw new Error("article number " + k + " is " + shown[k] + ", text says " + expect[k]);
const money = x => "$" + x.toLocaleString("en-US");

// Article 1's "$350 more builds equity" is the weak spot students should catch: in year 1 most of the payment is interest.
let bal = loan, principalY1 = 0;
for (let i = 0; i < 12; i++) { const p = mortgage - bal * r; principalY1 += p; bal -= p; }
const equityPerMonth = Math.round(principalY1 / 12 / 5) * 5;                          // shown in the module's answer box
if (equityPerMonth !== 335) throw new Error("year-1 equity per month is " + equityPerMonth + ", the answer box says $335");

// Article 2's "renting comes out ahead if you move within about five years", on its own stated assumptions:
// homes +3%/yr (rent too), fund 4%/yr after fees, 1%/yr repairs, buying 3% + selling 6% (inside its 8-10%).
const FUND = 0.04, GROWTH = 0.03, BUY_COST = 0.03, SELL_COST = 0.06;
let b2 = loan, invested = PRICE * DOWN + PRICE * BUY_COST, breakEven = null;
for (let mo = 1; mo <= 240 && breakEven === null; mo++) {
  const yr = Math.floor((mo - 1) / 12), lvl = Math.pow(1 + GROWTH, yr);
  const own = mortgage + PRICE * lvl * (TAX + 0.01) / 12 + INSURANCE;
  invested = invested * (1 + FUND / 12) + (own - RENT * lvl);
  b2 -= mortgage - b2 * r;
  if (PRICE * Math.pow(1 + GROWTH, mo / 12) * (1 - SELL_COST) - b2 > invested) breakEven = mo / 12;
}
if (breakEven < 4.5 || breakEven > 5.5) throw new Error("rent article says about five years; the model gives " + breakEven.toFixed(1));

/* ---------- the two articles (fictional) ---------- */
const FICTION = "Fictional article for MIT Sloan AI Basics Lab practice. The publications, authors, companies and figures are made up.";
// Date and author roles give students something to check with CRAAP (Module 2); the sponsor line is Article 1's conflict of interest.
const buy = [
  { type: "small", text: FICTION },
  { type: "title", text: "Stop renting. Buy as soon as you can." },
  { type: "p", text: "**The Weekly Ledger** · Personal finance column · October 2026" },
  { type: "p", text: "By Dana Whitfield, personal finance columnist" },
  { type: "small", text: "This column is sponsored by Harborview Home Loans." },
  { type: "p", text: "Every rent check is money you'll never see again. A mortgage payment, by contrast, builds something you own." },
  { type: "h2", text: "The math" },
  { type: "p", text: "Take a two-bedroom apartment in our city that rents for " + money(RENT) + " a month. A similar condo sells for " + money(PRICE) + ". With 10% down and a 6.5% mortgage, the monthly payment, including property tax and insurance, comes to about " + money(expect.monthly) + ". For " + money(expect.gap) + " more a month, you're building your own equity instead of your landlord's." },
  { type: "p", text: "And homes go up in value. Prices in our city have risen about 5% a year over the last ten years. At that rate, the " + money(PRICE) + " condo is worth about " + money(expect.in5) + " in five years." },
  { type: "h2", text: "The costs" },
  { type: "p", text: "Yes, there are closing costs, and you'll have repairs. But those are small next to " + money(expect.in5 - PRICE) + " of growth. Past growth isn't a promise, of course: ten years is one cycle, in one city." },
  { type: "h2", text: "My advice" },
  { type: "p", text: "If you expect to stay at least **three years**, buy." }
];
const rent = [
  { type: "small", text: FICTION },
  { type: "title", text: "Renting isn't throwing money away" },
  { type: "p", text: "**Main Street Money** (blog) · September 2026" },
  { type: "p", text: "By Marcus Lee, financial planner" },
  { type: "p", text: "Rent buys you something real: a place to live, no repair bills, and the freedom to move when your job or your life changes." },
  { type: "h2", text: "What buying really costs" },
  { type: "p", text: "Owners pay money they never get back too: mortgage interest, property tax, insurance and maintenance. Plan on about 1% of the home's value a year for repairs alone. Buying and later selling costs another 8-10% of the price in fees and commissions." },
  { type: "p", text: "Take the same " + money(PRICE) + " condo and " + money(RENT) + " rent. Instead of buying, invest the " + money(expect.down) + " down payment and the monthly difference in an index fund. I assume the fund earns a cautious 4% a year after fees, and that home prices rise 3% a year, closer to long-run inflation than the 5% you often hear. On those numbers, renting comes out ahead if you move within about **five years**. Stay longer and buying usually wins." },
  { type: "h2", text: "The catch" },
  { type: "p", text: "This only works if you actually invest the difference every month. When I asked readers of this blog, only 38 of the 120 renters who answered said they do." },
  { type: "h2", text: "My advice" },
  { type: "p", text: "Buy when you expect to stay **five years or more** and have savings beyond the down payment. Until then, rent and invest." }
];

/* ---------- write ---------- */
const files = { "article-buy.docx": docxBuffer(buy), "article-rent.docx": docxBuffer(rent) };
for (const [name, data] of Object.entries(files)) fs.writeFileSync(path.join(OUT, name), data);
console.log("  wrote assets/files/m3/: " + Object.keys(files).join(", "));

/* remove files from the earlier version of this module (Ridgeway memos, unit-economics examples) */
for (const old of ["memo-cfo-trail-club-price.docx", "memo-sales-trail-club-price.docx", "brief-example.docx",
                   "inputs-example-unit-economics.xlsx", "inputs-example-unit-economics.csv"]) {
  const p = path.join(OUT, old);
  if (fs.existsSync(p)) { fs.unlinkSync(p); console.log("  removed " + old); }
}

console.log("\nWeak spots (checked): year-1 equity ~" + money(equityPerMonth) + "/month of the " + money(expect.monthly) + " payment; " +
  "rent article break-even " + breakEven.toFixed(1) + " years with a 4% fund");
console.log("Article numbers (checked): payment ~" + money(expect.monthly) + " (exact " + money(Math.round(monthly)) + "), " +
  money(expect.gap) + " over rent, condo in 5 years at 5% ~" + money(expect.in5) + " (exact " + money(Math.round(in5)) + ")");
