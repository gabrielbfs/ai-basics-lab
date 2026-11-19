#!/usr/bin/env node
/* ==========================================================================
   Check and package the Module 5 files

   Usage (from the site folder):   node tools/make-m5-files.js
   (No practice folder: these files are downloads on the module page.)

   Hand-written inputs (edit these):
     assets/files/m5/build-spec-writer/SKILL.md          reference skill
     assets/files/m5/spec-example-unit-economics.md      example spec for the worked example prototype
     assets/files/m5/prototype-example-unit-economics.html  the worked example prototype (Trail Club calculator)
   Output:
     assets/files/m5/build-spec-writer.zip               ready to upload (Customize > Skills > + > Create skill > Upload a skill)

   Checks (stops on failure):
   - SKILL.md frontmatter: name <= 64 characters, description <= 200 characters
     (Claude Help Center limits), folder name = skill name, description says "Use when"
   - the example spec quotes the example prototype's real numbers and messages
   ========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const { zip } = require("./zip-lite");

const FILES = path.resolve(__dirname, "..", "assets", "files");
const SKILL_DIR = path.join(FILES, "m5", "build-spec-writer");
const fail = msg => { throw new Error("make-m5-files: " + msg); };

/* ---------- 1. the skill ---------- */
const skill = fs.readFileSync(path.join(SKILL_DIR, "SKILL.md"), "utf8");
const fm = skill.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!fm) fail("SKILL.md must start with --- frontmatter ---");
const field = k => { const m = fm[1].match(new RegExp("^" + k + ":\\s*(.+)$", "m")); return m ? m[1].trim() : ""; };
const name = field("name"), description = field("description");
if (!name) fail("missing name");
if (name.length > 64) fail("name is " + name.length + " characters (max 64)");
if (!description) fail("missing description");
if (description.length > 200) fail("description is " + description.length + " characters (max 200)");
if (!/use when/i.test(description)) fail("description should say when to use the skill ('Use when ...')");
if (path.basename(SKILL_DIR) !== name) fail("folder name '" + path.basename(SKILL_DIR) + "' must match skill name '" + name + "'");
console.log("  SKILL.md ok: name '" + name + "' (" + name.length + "/64), description " + description.length + "/200 characters");

/* ---------- 1b. the page shows the same skill, and the gallery's descriptions follow the same rules ---------- */
{
  const vm = require("vm");
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.resolve(__dirname, "..", "content", "modules", "m5.js"), "utf8"), sandbox);
  const fw = sandbox.window.AIB_MODULES.m5.frameworks;
  if (fw.reference.text !== skill.replace(/\r\n/g, "\n").trimEnd()) fail("the SKILL.md shown in m5.js (M5_SKILL) doesn't match the file: copy the file's text into M5_SKILL");
  fw.cards.forEach(c => {
    const d = c.parts[0][1].replace(/^"|"$/g, "");
    if (d.length > 200) fail("gallery skill '" + c.name + "': description is " + d.length + " characters (max 200)");
    if (!/use when/i.test(d)) fail("gallery skill '" + c.name + "': description should say 'Use when ...'");
  });
  console.log("  page ok: reference SKILL.md matches; " + fw.cards.length + " gallery descriptions under 200 characters");
}

/* ---------- 2. the example spec matches the example prototype ---------- */
const spec = fs.readFileSync(path.join(FILES, "m5", "spec-example-unit-economics.md"), "utf8");
const proto = fs.readFileSync(path.join(FILES, "m5", "prototype-example-unit-economics.html"), "utf8");
const mustQuote = ["$35.28", "$1,176", "4.9", "6.8", "2.9", "Churn must be above 0 to estimate lifetime value.",
  "LTV/CAC is below 3: each new member doesn't earn back enough of what it cost to win them.",
  "Price × gross margin.", "Gross profit per month ÷ monthly churn.", "CAC ÷ gross profit per month.",
  "How many times a member pays back what it cost to win them. 3 or more is a common target.",
  "Before writing code:"];
for (const s of mustQuote) if (!spec.includes(s)) fail("example spec is missing: " + s);
for (const s of mustQuote.slice(5, 11)) if (!proto.includes(s)) fail("example prototype no longer shows: " + s + " (update the spec)");
// recompute the numbers the spec promises, from the prototype's defaults
const gp = 49 * 0.72, ltv = gp / 0.03, ratio = Math.floor(ltv / 239 * 10) / 10, pay = 239 / gp, ratio5 = Math.floor(gp / 0.05 / 239 * 10) / 10;
const got = ["$" + gp.toFixed(2), "$" + Math.round(ltv).toLocaleString("en-US"), ratio.toFixed(1), pay.toFixed(1), ratio5.toFixed(1)];
const want = ["$35.28", "$1,176", "4.9", "6.8", "2.9"];
got.forEach((g, i) => { if (g !== want[i]) fail("recomputed " + want[i] + " but got " + g); });
console.log("  example spec ok: numbers match the prototype (" + want.join(", ") + ")");

/* ---------- 3. package the skill for upload ---------- */
const entries = [[name + "/", ""]];
for (const f of fs.readdirSync(SKILL_DIR).sort()) entries.push([name + "/" + f, fs.readFileSync(path.join(SKILL_DIR, f))]);
fs.writeFileSync(path.join(FILES, "m5", name + ".zip"), zip(entries));
console.log("  wrote assets/files/m5/" + name + ".zip (" + (entries.length - 1) + " file, folder at the root)");
