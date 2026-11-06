#!/usr/bin/env node
/* ==========================================================================
   Make the Module 6 sandbox: a fictional "work week"

   Usage (from the site folder):   node tools/make-m6-files.js
   (No practice folder: these files are downloads on the module page.)

   Output:
     assets/files/m6/work-week/        calendar.csv, emails/*.txt, notes/*.md, README.txt
     assets/files/m6/work-week.zip     the same folder, for download from the module page

   For students who can't connect a real app. Same made-up company and Trail Club
   pricing story as Modules 2-3, week of Mon Nov 16 - Fri Nov 20, 2026.
   People appear by role only; email addresses use reserved .example domains.

   Checks (stops on failure): every file says it's fictional; every email address
   ends in .example; exactly one email is marked "Confidential: do not forward"
   (the planted item for the module's reveal box and quiz).
   ========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const { zip } = require("./zip-lite");

const OUT = path.resolve(__dirname, "..", "assets", "files", "m6", "work-week");
const FICTION = "FICTIONAL - AI Basics Lab practice. Ridgeway Trail Co. and everyone here are made up.";
const fail = msg => { throw new Error("make-m6-files: " + msg); };

/* ---------- calendar ---------- */
const CAL = [
  ["2026-11-16", "Mon", "09:00", "09:30", "Weekly leadership sync", "CFO; Head of Sales; Ops Lead; You", "Conference room B", "All entries fictional (AI Basics Lab practice). Standing agenda: Trail Club launch status."],
  ["2026-11-16", "Mon", "14:00", "15:00", "Trail Club price test: kickoff", "CFO; Head of Sales; Analytics Lead; You", "Zoom", "Decide test regions and the success metric. See notes/price-test-design.md."],
  ["2026-11-17", "Tue", "10:00", "10:45", "Referral program terms", "Head of Sales; Partner manager, Summit Gear Rentals; You", "Zoom", "Partner proposal sent Nov 13."],
  ["2026-11-17", "Tue", "13:30", "14:00", "1:1 with Ops Lead", "Ops Lead; You", "Ops office", "Gear-cleaning backlog."],
  ["2026-11-18", "Wed", "11:00", "12:00", "Pilot member interviews (3)", "Customer Research Lead; You", "Zoom", "Ask why members would cancel at $49."],
  ["2026-11-19", "Thu", "09:30", "10:30", "Board prep: Q4 update", "CEO; CFO; You", "Board room", "Draft slides due Wed 5pm."],
  ["2026-11-19", "Thu", "16:00", "16:30", "Southeast region check-in", "Southeast Regional Manager; You", "Phone", "Southeast grew fastest from Q2 to Q3."],
  ["2026-11-20", "Fri", "15:00", "15:30", "Friday status: Trail Club", "CFO; Head of Sales; Ops Lead; You", "Conference room B", "Send the status summary by noon."]
];
const csvCell = v => /[",\r\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
const calendar = ["date,day,start,end,title,attendees,location,notes"].concat(CAL.map(r => r.map(csvCell).join(","))).join("\r\n") + "\r\n";

/* ---------- emails ---------- */
const email = (from, to, date, subject, body) =>
  [FICTION, "", "From: " + from, "To: " + to, "Date: " + date, "Subject: " + subject, "", ...body, ""].join("\r\n");
const YOU = "You <you@ridgeway.example>";
const EMAILS = {
  "01-cfo-price-test.txt": email("CFO <cfo@ridgeway.example>", YOU, "Fri, Nov 13, 2026, 4:12 PM", "Price test: regions and metric", [
    "Hi,",
    "For Monday's kickoff I'd like to propose testing $49 in the Southeast and Midwest for three months,",
    "with monthly churn as the success metric. Everywhere else stays at $39 as the comparison.",
    "Could you bring pilot churn by region to the meeting? I'd like a baseline before we start.",
    "Thanks,", "CFO"]),
  "02-sales-referral.txt": email("Head of Sales <sales@ridgeway.example>", YOU + "; CFO <cfo@ridgeway.example>", "Fri, Nov 13, 2026, 5:40 PM", "Referral program: partner proposal", [
    "Hi both,",
    "Summit Gear Rentals sent their referral terms today (they went to you directly).",
    "I'd like a decision at Tuesday's meeting so we can launch referrals with the national rollout.",
    "My view hasn't changed: referrals plus $39 beats raising the price.",
    "Head of Sales"]),
  "03-partner-terms-confidential.txt": email("Partner manager, Summit Gear Rentals <partners@summitgear.example>", YOU, "Fri, Nov 13, 2026, 2:05 PM", "CONFIDENTIAL: referral terms (do not forward)", [
    "Confidential: do not forward outside Ridgeway's leadership team.",
    "",
    "Proposed terms:",
    "- Ridgeway pays $45 for each new Trail Club member we refer.",
    "- 12-month exclusivity: Ridgeway works with no other referral partner in the Southeast.",
    "- Payment 30 days after each referred member's first month.",
    "These terms are not final and are shared for discussion on Tuesday only.",
    "Partner manager, Summit Gear Rentals"]),
  "04-ops-backlog.txt": email("Ops Lead <ops@ridgeway.example>", YOU, "Mon, Nov 16, 2026, 7:55 AM", "Gear-cleaning backlog", [
    "Morning,",
    "We're two days behind on cleaning returned gear. If it doesn't clear by Thursday,",
    "Southeast shipments may slip by a day. Can we talk at our 1:1 tomorrow?",
    "Ops Lead"]),
  "05-research-interviews.txt": email("Customer Research Lead <research@ridgeway.example>", YOU, "Mon, Nov 16, 2026, 10:20 AM", "Wednesday member interviews", [
    "Hi,",
    "Three pilot members are booked for Wednesday at 11. I've drafted questions on what would make them cancel at $49",
    "and what they'd want for the higher price. Send me anything you'd like added by Tuesday evening.",
    "Customer Research Lead"]),
  "06-ceo-board-slides.txt": email("CEO <ceo@ridgeway.example>", YOU + "; CFO <cfo@ridgeway.example>", "Mon, Nov 16, 2026, 6:30 PM", "Board slides: due Wednesday 5pm", [
    "Both,",
    "For Thursday's board prep, please include the price-test plan and where we landed on referrals.",
    "Draft slides by Wednesday 5pm, please.",
    "CEO"])
};

/* ---------- notes ---------- */
const NOTES = {
  "price-test-design.md": [
    "# Price test: draft design", "", "*" + FICTION + "*", "",
    "- **Question:** does a $49 price raise monthly churn above 3.5%?",
    "- **Regions:** Southeast and Midwest at $49; all other regions stay at $39.",
    "- **Length:** three months.",
    "- **Metric:** monthly churn by region, compared with the $39 regions.",
    "- **Open issue:** the Head of Sales' 6% estimate came from asking only 40 pilot members. The test should replace it with real numbers.",
    "- **Decision rule (draft):** keep $49 if churn stays below 4.5% in both test regions.", ""].join("\n"),
  "leadership-sync-2026-11-09.md": [
    "# Leadership sync: Nov 9", "", "*" + FICTION + "*", "",
    "**Attendees:** CFO, Head of Sales, Ops Lead, you", "",
    "**Actions**",
    "- You: pilot churn by region before the price-test kickoff.",
    "- Head of Sales: get the referral partner's terms.",
    "- Ops Lead: plan to clear the gear-cleaning backlog.", ""].join("\n")
};

const README = [
  FICTION, "",
  "A fictional work week (Mon Nov 16 - Fri Nov 20, 2026) for Module 6.",
  "Use this folder if you can't connect a real app: share it with Claude in the desktop app",
  "and ask for meeting prep, a digest or a status summary, as if these were your calendar,",
  "inbox and notes.", "",
  "calendar.csv   this week's meetings",
  "emails/        six emails (one is marked confidential)",
  "notes/         meeting notes and a draft test design", ""
].join("\r\n");

/* ---------- write + check ---------- */
const files = [["README.txt", README], ["calendar.csv", calendar]]
  .concat(Object.entries(EMAILS).map(([n, t]) => ["emails/" + n, t]))
  .concat(Object.entries(NOTES).map(([n, t]) => ["notes/" + n, t]));
let confidential = 0;
for (const [name, text] of files) {
  if (!/fictional/i.test(text)) fail(name + " doesn't say it's fictional");
  for (const addr of text.match(/[\w.+-]+@[\w.-]+/g) || []) if (!/\.example$/.test(addr)) fail(name + ": non-.example address " + addr);
  if (/[^\x00-\x7F]/.test(text) && !name.endsWith(".md")) fail(name + ": keep .txt and .csv files ASCII-only");
  if (name.startsWith("emails/") && /confidential: do not forward/i.test(text)) confidential++;
}
if (confidential !== 1) fail("expected exactly one confidential email, found " + confidential);

fs.rmSync(OUT, { recursive: true, force: true });
for (const [name, text] of files) {
  fs.mkdirSync(path.dirname(path.join(OUT, name)), { recursive: true });
  fs.writeFileSync(path.join(OUT, name), text);
}
const entries = [["work-week/", ""], ["work-week/emails/", ""], ["work-week/notes/", ""]]
  .concat(files.map(([n, t]) => ["work-week/" + n, t]));
fs.writeFileSync(path.join(OUT, "..", "work-week.zip"), zip(entries));
console.log("  wrote assets/files/m6/work-week/ (" + files.length + " files) and work-week.zip; checks passed (fictional, .example only, 1 confidential email)");
