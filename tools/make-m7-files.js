#!/usr/bin/env node
/* ==========================================================================
   Check and package the Module 7 example app

   Usage (from the site folder):   node tools/make-m7-files.js
   (No practice folder: these files are downloads on the module page.)

   Hand-written (edit these):  assets/files/m7/ai-basics-app-example/
                               index.html, style.css, app.js, tests.html, README.md, CLAUDE.md
   This script:
   1. copies docs/spec.md and docs/prototype.html (both from assets/files/m5/) into the
      example, so they never drift from the originals
   2. runs the spec's acceptance checks against app.js's calculate() in Node
      (the same checks tests.html runs in the browser); stops if any fails
   3. zips the folder as assets/files/m7/ai-basics-app-example.zip, with
      "ai-basics-app/" at the root, ready to use as the Module 7 folder or Module 8 repo
   ========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const { zip } = require("./zip-lite");

const FILES = path.resolve(__dirname, "..", "assets", "files");
const APP = path.join(FILES, "m7", "ai-basics-app-example");
const fail = msg => { throw new Error("make-m7-files: " + msg); };

/* 1. copy the docs */
fs.mkdirSync(path.join(APP, "docs"), { recursive: true });
fs.copyFileSync(path.join(FILES, "m5", "spec-example-unit-economics.md"), path.join(APP, "docs", "spec.md"));
fs.copyFileSync(path.join(FILES, "m5", "prototype-example-unit-economics.html"), path.join(APP, "docs", "prototype.html"));

/* 2. acceptance checks (keep in step with tests.html and docs/spec.md) */
delete require.cache[require.resolve(path.join(APP, "app.js"))];
const { calculate, format } = require(path.join(APP, "app.js"));
const base = { price: "49", margin: "72", churn: "3", cac: "239" };
const run = changes => calculate(Object.assign({}, base, changes));
const checks = [
  ["Defaults: gross profit", "$35.28", () => format.cents(run({}).grossProfit)],
  ["Defaults: LTV", "$1,176", () => format.dollars(run({}).ltv)],
  ["Defaults: LTV/CAC", "4.9", () => format.ratio(run({}).ratio)],
  ["Defaults: months to pay back", "6.8", () => format.months(run({}).payback)],
  ["Defaults: no warning", "false", () => String(run({}).low)],
  ["Churn 5%: LTV/CAC", "2.9", () => format.ratio(run({ churn: "5" }).ratio)],
  ["Churn 5%: warning shows", "true", () => String(run({ churn: "5" }).low)],
  ["Churn 0: message", "Churn must be above 0 to estimate lifetime value.", () => run({ churn: "0" }).problems.join(" ")],
  ["CAC 0: message", "CAC must be above 0.", () => run({ cac: "0" }).problems.join(" ")],
  ["Blank price: message", "Price must be above 0.", () => run({ price: "" }).problems.join(" ")]
];
for (const [name, want, fn] of checks) { const got = fn(); if (got !== want) fail(name + ": expected " + want + ", got " + got); }
const testsHtml = fs.readFileSync(path.join(APP, "tests.html"), "utf8");
for (const [name, want] of checks) if (!testsHtml.includes(JSON.stringify(name)) || !testsHtml.includes(JSON.stringify(want))) fail("tests.html is missing the check '" + name + "'");
console.log("  acceptance checks pass in Node (" + checks.length + "), and tests.html has the same " + checks.length);

/* 3. zip, folders first and sorted so the bytes are stable */
const walk = (dir, rel) => fs.readdirSync(dir, { withFileTypes: true })
  .sort((a, b) => (b.isDirectory() - a.isDirectory()) || a.name.localeCompare(b.name))
  .flatMap(d => d.isDirectory()
    ? [["ai-basics-app/" + rel + d.name + "/", ""], ...walk(path.join(dir, d.name), rel + d.name + "/")]
    : [["ai-basics-app/" + rel + d.name, fs.readFileSync(path.join(dir, d.name))]]);
const entries = [["ai-basics-app/", ""], ...walk(APP, "")];
fs.writeFileSync(path.join(FILES, "m7", "ai-basics-app-example.zip"), zip(entries));
console.log("  wrote assets/files/m7/ai-basics-app-example.zip (" + entries.filter(e => !e[0].endsWith("/")).length + " files, ai-basics-app/ at the root)");
