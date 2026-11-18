#!/usr/bin/env node
/* ==========================================================================
   Bundle the whole site into ONE self-contained HTML file.

   Usage (from the site folder):   node tools/build-single.js
   Output:                         dist/ai-basics-lab.html

   What it does: inlines the stylesheet, the course file, every module content
   file listed in course.js that exists, the shared widgets and the renderer,
   and turns local images (assets/img/...) into embedded data. Pages switch by
   #hash instead of separate files. Videos and downloads stay as links.
   No installs needed: plain Node.js, no packages.
   ========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const read = p => fs.readFileSync(path.join(root, p), "utf8");
const exists = p => fs.existsSync(path.join(root, p));

// Read the module list from course.js
const courseSrc = read("content/course.js");
const sandbox = { window: {} };
vm.runInNewContext(courseSrc, sandbox);
const C = sandbox.window.AIB_COURSE;
if (!C || !Array.isArray(C.modules)) throw new Error("content/course.js did not define AIB_COURSE.modules");

const moduleFiles = C.modules.map(m => "content/modules/" + m.id + ".js").filter(exists);
const missing = C.modules.filter(m => !exists("content/modules/" + m.id + ".js")).map(m => m.id);

// Inline local images referenced from content as "assets/img/..."
const MIME = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", svg: "image/svg+xml", webp: "image/webp" };
const inlineImages = src => src.replace(/(["'])(assets\/img\/[^"']+\.(png|jpe?g|gif|svg|webp))\1/gi, (m, q, p, ext) => {
  if (!exists(p)) { console.warn("  ! image not found, left as a link:", p); return m; }
  const data = fs.readFileSync(path.join(root, p)).toString("base64");
  return q + "data:" + MIME[ext.toLowerCase()] + ";base64," + data + q;
});

const js = [courseSrc, ...moduleFiles.map(read), read("assets/js/widgets.js"), read("assets/js/aib.js")]
  .map(inlineImages).join("\n;\n")
  .replace(/<\/script/gi, "<\\/script");            // never close the script tag early
const css = read("assets/css/site.css").replace(/<\/style/gi, "<\\/style");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${C.title}</title>
<style>
${css}
</style>
</head>
<body data-mode="single">
<noscript><p style="padding:24px">This page needs JavaScript turned on.</p></noscript>
<script>
${js}
</script>
</body>
</html>
`;

fs.mkdirSync(path.join(root, "dist"), { recursive: true });
const out = path.join(root, "dist", "ai-basics-lab.html");
fs.writeFileSync(out, html);
console.log("Built " + path.relative(root, out) + " (" + Math.round(html.length / 1024) + " KB)");
console.log("  modules included: " + (moduleFiles.length ? moduleFiles.map(f => path.basename(f, ".js")).join(", ") : "none yet"));
if (missing.length) console.log("  not written yet (shown as 'being written'): " + missing.join(", "));
