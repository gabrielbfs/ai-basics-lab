#!/usr/bin/env node
/* ==========================================================================
   Make the Module 2 downloads (CSV + Excel) in assets/files/m2/

   Usage (from the site folder):   node tools/make-m2-files.js

   1. household-spending-2025   practice data for Exercise A (a fictional household,
                                one row per card transaction)
   2. assumptions-template      blank table for Exercise B

   The practice data has ONE planted problem: the Amex statements for August and
   September were imported twice, so those transactions appear again at the end
   of the file, with the same transaction_id as the originals. The script checks that this changes the answer to "did eating out
   drive the jump in spending from Q2 (Apr-Jun) to Q3 (Jul-Sep)?":
   with the duplicates, Dining out looks like the driver; without them, Dining out
   is about flat and Travel is the real driver. It stops if that's not true, and
   prints the numbers used in the module's "Check your answer" box.
   Amounts are handled in cents. Fixed random seed: re-running gives identical files.
   ========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const { writeXlsx } = require("./xlsx-lite");

const OUT = path.resolve(__dirname, "..", "assets", "files", "m2");
fs.mkdirSync(OUT, { recursive: true });

/* ---------- helpers ---------- */
function rng(seed) {                       // mulberry32: small, seeded, repeatable
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const csvCell = v => {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};
function writeBoth(name, columns, rows, sheet, filter) {
  const keys = columns.map(c => c.key);
  const csv = [keys.join(",")].concat(rows.map(r => keys.map(k => csvCell(r[k])).join(","))).join("\r\n") + "\r\n";
  if (/[^\x00-\x7F]/.test(csv)) throw new Error(name + ": keep CSV text ASCII-only (Excel reads it reliably)");
  fs.writeFileSync(path.join(OUT, name + ".csv"), csv);
  writeXlsx(path.join(OUT, name + ".xlsx"), { sheet, columns, rows, filter });   // CSV stays plain; formats and filter are Excel-only
  console.log("  wrote " + name + ".csv / .xlsx (" + rows.length + " rows)");
}
const usd = cents => "$" + (cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ---------- 1. practice data: a household's card spending ---------- */
const R = rng(20251113);
const between = (lo, hi) => Math.round((lo + R() * (hi - lo)) * 100);      // dollars in, cents out
const pick = arr => arr[Math.floor(R() * arr.length)];
const days = m => new Date(2025, m, 0).getDate();
const day = m => 1 + Math.floor(R() * days(m));

const tx = [];   // { date, card, merchant, category, cents }
const add = (m, d, card, merchant, category, cents) =>
  tx.push({ date: "2025-" + String(m).padStart(2, "0") + "-" + String(d).padStart(2, "0"), card, merchant, category, cents });

for (let m = 1; m <= 12; m++) {
  const summer = m >= 6 && m <= 8;
  // Visa: everyday spending
  for (let i = 0; i < 5; i++) add(m, day(m), "Visa", pick(["Green Basket Market", "FreshCo Grocery", "Corner Market"]), "Groceries", between(55, 150));
  add(m, 3, "Visa", "City Power & Light", "Utilities", between(summer ? 120 : 85, summer ? 160 : 125));
  add(m, 8, "Visa", "Metro Water", "Utilities", between(38, 58));
  add(m, 12, "Visa", "FastNet Internet", "Utilities", 7000);
  for (let i = 0; i < 3; i++) add(m, day(m), "Visa", "QuickFuel", "Transportation", between(38, 62));
  add(m, 2, "Visa", "Metro Transit", "Transportation", 5000);
  const shops = 2 + Math.floor(R() * 2);
  for (let i = 0; i < shops; i++) add(m, day(m), "Visa", pick(["Hometown Hardware", "Cityline Apparel", "ShopOnline"]), "Shopping", between(20, 140));
  add(m, day(m), "Visa", "Neighborhood Pharmacy", "Health", between(12, 45));
  add(m, 5, "Visa", "StreamFlix", "Subscriptions", 1549);
  add(m, 9, "Visa", "TuneBox", "Subscriptions", 1099);
  add(m, 1, "Visa", "Peak Fitness Gym", "Subscriptions", 4500);
  // Amex: eating out and going out
  const meals = 6 + Math.floor(R() * 3);
  for (let i = 0; i < meals; i++) add(m, day(m), "Amex", pick(["Bella Cucina", "Taqueria Sol", "Noodle Bar 88", "The Daily Grind Cafe", "Harbor Grill"]), "Dining out", between(18, 95));
  const outings = 1 + Math.floor(R() * 2);
  for (let i = 0; i < outings; i++) add(m, day(m), "Amex", pick(["Starlight Cinema", "City Concert Hall", "Bowl-O-Rama"]), "Entertainment", between(25, 110));
}
// Travel: a weekend train trip in May, flights and two hotel nights in July, holidays in December
add(5, 16, "Visa", "Coastline Rail", "Travel", 18600);
add(7, 11, "Visa", "SkyHop Airlines", "Travel", 48250);
add(7, 18, "Visa", "Lakeside Inn", "Travel", 23600);
add(12, 20, "Visa", "SkyHop Airlines", "Travel", 52900);

tx.sort((a, b) => a.date.localeCompare(b.date) || a.card.localeCompare(b.card) || a.merchant.localeCompare(b.merchant) || a.cents - b.cents);
// Statement reference, like a real export: card prefix, month+day, number within that card and day (e.g. AMX-0815-02).
// The duplicated rows below are copies, so they repeat the same ID: that's how students can prove they're duplicates.
const seen = {};
for (const t of tx) {
  const k = t.card + t.date;
  seen[k] = (seen[k] || 0) + 1;
  t.id = (t.card === "Amex" ? "AMX" : "VIS") + "-" + t.date.slice(5, 7) + t.date.slice(8, 10) + "-" + String(seen[k]).padStart(2, "0");
}
const dups =tx.filter(t => t.card === "Amex" && (t.date.startsWith("2025-08") || t.date.startsWith("2025-09"))).map(t => ({ ...t }));
const withDups = tx.concat(dups);   // appended at the end, like statements imported twice

/* check that the planted problem changes the answer */
const quarter = date => Math.ceil(+date.slice(5, 7) / 3);
function byCategory(rows) {
  const t = {};
  for (const r of rows) {
    const q = quarter(r.date);
    if (q !== 2 && q !== 3) continue;
    t[r.category] = t[r.category] || { q2: 0, q3: 0, n3: 0 };
    t[r.category]["q" + q] += r.cents;
    if (q === 3) t[r.category].n3++;
  }
  for (const k in t) t[k].diff = t[k].q3 - t[k].q2;
  const top = Object.keys(t).sort((a, b) => t[b].diff - t[a].diff)[0];
  const total = Object.values(t).reduce((s, x) => ({ q2: s.q2 + x.q2, q3: s.q3 + x.q3 }), { q2: 0, q3: 0 });
  return { t, top, total };
}
const withD = byCategory(withDups), clean = byCategory(tx);
if (withD.top !== "Dining out" || clean.top !== "Travel")
  throw new Error("planted problem doesn't flip the answer: with=" + withD.top + " clean=" + clean.top);
const gap = r => { const d = Object.values(r.t).map(x => x.diff).sort((a, b) => b - a); return d[0] - d[1]; };
if (gap(withD) < 25000 || gap(clean) < 25000) throw new Error("the driver must lead by $250+ in both versions: " + usd(gap(withD)) + " / " + usd(gap(clean)));
if (Math.abs(clean.t["Dining out"].diff) > 10000) throw new Error("clean Dining out change should be under $100: " + usd(clean.t["Dining out"].diff));

// Columns A-H: date, month, quarter, card, merchant, category, amount_usd, transaction_id
// (the module's SUMIFS hint uses these letters: C = quarter, F = category, G = amount_usd).
// month ("Jan") and quarter ("Q3") are text so spreadsheets don't turn them into dates.
// Excel only: date is a real date, amount_usd shows as $0.00, and the filter arrows are already on.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
if (new Set(tx.map(t => t.id)).size !== tx.length) throw new Error("transaction_id must be unique before the duplicates are added");
writeBoth("household-spending-2025", [
  { key: "date", width: 12, format: "date" }, { key: "month", width: 8 }, { key: "quarter", width: 9 }, { key: "card", width: 7 },
  { key: "merchant", width: 24 }, { key: "category", width: 16 }, { key: "amount_usd", width: 13, format: "usd" }, { key: "transaction_id", width: 15 }
], withDups.map(t => ({ date: t.date, month: MONTHS[+t.date.slice(5, 7) - 1], quarter: "Q" + quarter(t.date), card: t.card, merchant: t.merchant,
                        category: t.category, amount_usd: +(t.cents / 100).toFixed(2), transaction_id: t.id })), "Spending", true);

/* ---------- 2. assumptions template ---------- */
writeBoth("assumptions-template", [
  { key: "input", width: 30 }, { key: "unit", width: 18 }, { key: "typical_value", width: 14 }, { key: "range", width: 12 },
  { key: "source", width: 60 }, { key: "checked", width: 9 }, { key: "note", width: 80 }
], [{}, {}, {}, {}, {}], "Assumptions");

/* remove files from the earlier version of this module (Ridgeway sales, unit-economics examples) */
for (const old of ["ridgeway-sales-2025", "assumptions-example-unit-economics", "sample-data-example-unit-economics"])
  for (const ext of [".csv", ".xlsx"]) { const p = path.join(OUT, old + ext); if (fs.existsSync(p)) { fs.unlinkSync(p); console.log("  removed " + old + ext); } }

/* ---------- answer key for the module page ---------- */
console.log("\nAnswer key (Q2 -> Q3 spending by category):");
for (const c of Object.keys(clean.t).sort()) {
  const a = withD.t[c], b = clean.t[c];
  console.log("  " + c.padEnd(15) + " with duplicates: Q2 " + usd(a.q2).padStart(10) + "  Q3 " + usd(a.q3).padStart(10) + " (" + a.n3 + " rows)  change " + usd(a.diff).padStart(10) +
    "  |  clean: Q3 " + usd(b.q3).padStart(10) + " (" + b.n3 + " rows)  change " + usd(b.diff).padStart(10));
}
const dupTotal = dups.reduce((s, r) => s + r.cents, 0);
console.log("  rows: " + tx.length + " real + " + dups.length + " duplicated (Amex, Aug-Sep) = " + withDups.length + "; duplicates worth " + usd(dupTotal));
console.log("  total Q2 " + usd(withD.total.q2) + " -> Q3 with duplicates " + usd(withD.total.q3) + " (+" + usd(withD.total.q3 - withD.total.q2) +
  "), clean " + usd(clean.total.q3) + " (+" + usd(clean.total.q3 - clean.total.q2) + ")");
console.log("  driver with duplicates: " + withD.top + " | after removing them: " + clean.top);
