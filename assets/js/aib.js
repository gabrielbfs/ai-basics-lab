/* ==========================================================================
   AI Basics Lab: page renderer (the one template for every page)

   Text lives in content/course.js (course settings + overview) and
   content/modules/<id>.js (one file per module). This file only decides
   how that text is laid out. Section order follows the revision plan.

   Two modes, same code:
   - multi-page (default): index.html, m1.html ... each page loads its own content file
   - single file (<body data-mode="single">): everything bundled, pages switch by #hash
   ========================================================================== */
(function () {
  "use strict";
  const C = window.AIB_COURSE;
  const MODS = (window.AIB_MODULES = window.AIB_MODULES || {});
  const W = window.AIBW;
  const { esc, md } = W;
  const body = document.body;
  const SINGLE = body.dataset.mode === "single";
  const LIST = C.modules;

  /* ---------- progress (saved in this browser only) ---------- */
  const KEY = "aibasics.progress.v2";
  let S = {};
  try { S = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { S = {}; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked */ } };
  const st = id => S[id] || (S[id] = { c: {}, q: {} });

  function status(m) {
    const s = st(m.id);
    const checks = m.checks || [], quiz = m.quiz || [];
    const got = checks.filter((_, k) => s.c[k]).length + quiz.filter((x, k) => s.q[k] === x.answer).length;
    const total = checks.length + quiz.length;
    s.state = got === 0 ? "todo" : got === total ? "done" : "prog";   // cached so other pages can show it
    return { got, total, pct: total ? Math.round(got / total * 100) : 0, state: s.state };
  }
  const LABEL = { todo: "Not started", prog: "In progress", done: "Mastered" };
  const chip = state => "chip" + (state && state !== "todo" ? " " + state : "");
  const cached = id => (S[id] && S[id].state) || "todo";

  /* ---------- links ---------- */
  const href = id => SINGLE ? "#" + id : (id === "overview" ? "index.html" : id + ".html");
  const pad = n => String(n).padStart(2, "0");
  const mins = m => m.budget ? ["read", "demo", "do", "check"].reduce((a, k) => a + (m.budget[k] || 0), 0) : 0;
  const ext = url => /^https?:/i.test(url) ? ' target="_blank" rel="noopener"' : "";

  /* ---------- frame + rail ---------- */
  function frame() {
    body.insertAdjacentHTML("afterbegin",
      '<a class="skip" href="#main">Skip to content</a>' +
      '<div class="shell"><aside class="rail">' +
        '<a class="brand" href="' + href("overview") + '"><span class="eyebrow">' + esc(C.program) + "</span><b>" + esc(C.title) + "</b></a>" +
        '<div class="overall"><span id="overallTxt"></span><div class="bar"><i id="overallBar"></i></div></div>' +
        '<nav aria-label="Course pages"><ul class="nav" id="nav"></ul></nav>' +
        '<div class="theme" role="group" aria-label="Color theme"><span class="sub">Theme</span>' +
          '<button type="button" data-theme-set="auto">Auto</button>' +
          '<button type="button" data-theme-set="light">Light</button>' +
          '<button type="button" data-theme-set="dark">Dark</button></div>' +
        '<div class="railnote" id="railnote"></div>' +
      '</aside><main id="main" tabindex="-1"></main></div>');
    document.querySelector(".skip").addEventListener("click", e => {
      e.preventDefault(); document.getElementById("main").focus();
    });
    themeSwitch();
  }

  /* Auto follows the device; Light and Dark override it. Saved in this browser. */
  function themeSwitch() {
    const TKEY = "aibasics.theme";
    const root = document.documentElement;
    const btns = document.querySelectorAll("[data-theme-set]");
    const paint = () => {
      const cur = root.getAttribute("data-theme") || "auto";
      btns.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.themeSet === cur)));
    };
    btns.forEach(b => b.addEventListener("click", () => {
      const t = b.dataset.themeSet;
      if (t === "auto") root.removeAttribute("data-theme"); else root.setAttribute("data-theme", t);
      try { if (t === "auto") localStorage.removeItem(TKEY); else localStorage.setItem(TKEY, t); } catch (e) { /* storage blocked */ }
      paint();
    }));
    paint();
  }

  /* Sections of the module on screen, grouped for the sidebar (set by moduleView) */
  let SECS = [];
  const GROUP = { before: "Learn", breakdown: "Learn", frameworks: "Learn", examples: "Learn", demo: "Learn",
                  steps: "Do", exercise: "Do", responsible: "Check", stuck: "Check", mastery: "Check", deeper: "Check" };
  function secNav(cls) {
    let last = "";
    return '<ul class="' + cls + '">' + SECS.map(s => {
      const g = GROUP[s.id] || "";
      const head = g && g !== last ? '<li class="sg">' + esc(g) + "</li>" : "";
      last = g || last;
      return head + '<li><a href="#s-' + s.id + '" data-sec="s-' + s.id + '">' + esc(s.title) + "</a></li>";
    }).join("") + "</ul>";
  }

  function rail(cur) {
    const nav = document.getElementById("nav");
    nav.innerHTML =
      '<li><a href="' + href("overview") + '"' + (cur === "overview" ? ' aria-current="page"' : "") +
      '><span class="n">00</span><span>Course overview</span><span></span></a></li>' +
      LIST.map((m, i) => {
        const s = cached(m.id);
        return '<li><a href="' + href(m.id) + '"' + (cur === m.id ? ' aria-current="page"' : "") +
          '><span class="n">' + pad(i + 1) + "</span><span>" + esc(m.short || m.title) +
          '</span><span class="dot ' + (s === "todo" ? "" : s) + '" title="' + LABEL[s] + '"></span></a>' +
          (cur === m.id && SECS.length ? '<nav aria-label="Sections on this page">' + secNav("secs") + "</nav>" : "") + "</li>";
      }).join("");
    const done = LIST.filter(m => cached(m.id) === "done").length;
    document.getElementById("overallTxt").textContent = done + " of " + LIST.length + " modules mastered";
    document.getElementById("overallBar").style.width = (done / LIST.length * 100) + "%";
    document.getElementById("railnote").innerHTML =
      "<span>Checkmarks are saved in this browser only.</span>" +
      (C.status ? "<span>" + esc(C.status) + ".</span>" : "");
    markSection();
    const a = nav.querySelector('[aria-current="page"]');
    if (a && nav.scrollWidth > nav.clientWidth) nav.scrollLeft = a.offsetLeft - nav.offsetLeft - 8;
  }

  /* ---------- overview ---------- */
  function overviewView() {
    const o = C.overview;
    return '<section class="hero">' +
        (C.status ? '<span class="draft">' + esc(C.status) + "</span>" : "") +
        "<h1>" + md(o.headline) + "</h1>" +
        '<p class="lede">' + md(o.lede) + "</p>" +
        '<div class="flow">' + o.waysIn.map((w, i) =>
          '<div><span class="k">' + (i + 1) + " · " + esc(w.label) + "</span><b>" + esc(w.title) + "</b><p>" + md(w.text) + "</p></div>").join("") + "</div>" +
      "</section>" +

      '<section class="sect"><h2>' + esc(o.friday.title) + "</h2>" +
        '<div class="clock">' + o.friday.blocks.map(b =>
          '<div><span class="bigt">' + esc(b.time) + "</span><b>" + esc(b.title) + "</b><p>" + md(b.text) + "</p></div>").join("") + "</div></section>" +

      '<section class="sect"><h2>The modules</h2><div class="grid">' + LIST.map((m, i) => {
          const s = cached(m.id);
          return '<a class="mcard" href="' + href(m.id) + '"><span class="num">' + (i + 1) + "</span><div><b>" + esc(m.title) + "</b>" +
            (m.blurb ? '<span class="out">' + esc(m.blurb) + "</span>" : "") +
            '<div class="meta"><span class="' + chip(s) + '">' + LABEL[s] + '</span><span class="chip track">' +
            esc((C.tracks[m.track] || {}).label || "") + "</span></div></div></a>";
        }).join("") + "</div>" +
      "</section>" +

      '<section class="sect"><h2>Two tracks</h2><div class="tracks">' + Object.values(C.tracks).map(t =>
        "<div><b>" + esc(t.label) + "</b><p>" + md(t.text) + "</p></div>").join("") + "</div></section>" +

      '<section class="sect" id="setup"><h2>' + esc(o.setup.title) + '</h2><p class="prose">' + md(o.setup.text) + "</p>" +
        '<div class="tablewrap"><table class="cmp"><thead><tr><th>Part</th><th>When</th><th>What you do</th><th>Needed for</th></tr></thead><tbody>' +
        o.setup.parts.map(p => "<tr><td>" + esc(p.part) + "</td><td>" + md(p.when) + "</td><td>" + md(p.what) + "</td><td>" + esc(p.neededFor) + "</td></tr>").join("") +
        "</tbody></table></div></section>" +

      '<section class="sect"><h2>' + esc(o.how.title) + '</h2><ol class="steps">' + o.how.items.map(x =>
        "<li><div><b>" + esc(x.title) + "</b><span>" + md(x.text) + "</span></div></li>").join("") + "</ol></section>";
  }

  /* ---------- module sections ---------- */
  // needs: "text" or {text, ifNot, files}; ifNot shows while the box is unticked; files = download buttons
  function beforeHTML(b) {
    return '<div class="before">' +
      (b.needs && b.needs.length ? '<span class="sub">Tick each one when it\'s ready</span><ul class="checks ready">' + b.needs.map((x, k) => {
        const it = typeof x === "string" ? { text: x } : x;
        return '<li><label><input type="checkbox" data-b="' + k + '"><span>' + md(it.text) +
          (it.ifNot ? '<span class="ifnot">' + md(it.ifNot) + "</span>" : "") + "</span></label>" +
          (it.files && it.files.length ? '<div class="files">' + it.files.map(f =>
            '<a class="btn file" href="' + esc(f.url) + '" download>' + esc(f.label) + "</a>").join("") + "</div>" : "") + "</li>";
      }).join("") + "</ul>" : "") +
      (b.note ? '<p class="catch"><b>' + esc(b.note.title) + "</b> " + md(b.note.text) + "</p>" : "") +
      (b.catchUp ? '<p class="catch"><b>Missed a step?</b> ' + md(b.catchUp.text || "") +
        (b.catchUp.url ? ' <a href="' + esc(b.catchUp.url) + '"' + ext(b.catchUp.url) + ">" + esc(b.catchUp.label || "Get the catch-up kit") + "</a>" : "") + "</p>" : "") +
      "</div>";
  }

  // a table: {head, rows, caption?}
  const table = t => '<div class="tablewrap"><table class="cmp">' +
    (t.caption ? "<caption>" + esc(t.caption) + "</caption>" : "") + "<thead><tr>" +
    t.head.map(h => "<th>" + esc(h) + "</th>").join("") + "</tr></thead><tbody>" +
    t.rows.map(r => "<tr>" + r.map(c => "<td>" + md(c) + "</td>").join("") + "</tr>").join("") +
    "</tbody></table></div>";

  function breakdownHTML(bd) {
    // compare: one table or a list of them
    const cmp = bd.compare ? [].concat(bd.compare).map(table).join("") : "";
    return (bd.key ? '<p class="keyidea">' + md(bd.key) + "</p>" : "") +
      '<div class="concepts">' + (bd.concepts || []).map(c =>
        '<div class="concept"><b>' + esc(c.title) + "</b><p>" + md(c.text) + "</p></div>").join("") + "</div>" +
      (bd.figure ? '<figure class="diagram">' + bd.figure.svg + (bd.figure.caption ? "<figcaption>" + md(bd.figure.caption) + "</figcaption>" : "") + "</figure>" : "") + cmp;
  }

  // frameworks: {intro, cards:[{name, goodFor, parts:[[term, meaning]]}], table, note, sample:{title, task, items:[{name, prompt}]}}
  function frameworksHTML(f) {
    const s = f.sample;
    return (f.intro ? '<p class="para">' + md(f.intro) + "</p>" : "") +
      (f.cards ? '<div class="fw-cards">' + f.cards.map(c => '<div class="fw-card"><b class="fw-name">' + esc(c.name) + "</b>" +
        "<ul>" + c.parts.map(p => "<li><b>" + esc(p[0]) + "</b><span>" + md(p[1]) + "</span></li>").join("") + "</ul>" +
        (c.goodFor ? '<p class="fw-good"><span>Good for</span> ' + md(c.goodFor) + "</p>" : "") + "</div>").join("") + "</div>" : "") +
      (f.table ? table(f.table) : "") +
      (f.note ? '<p class="para">' + md(f.note) + "</p>" : "") +
      (s ? '<details class="reveal"><summary>' + esc(s.title || "See one task in each framework") + '</summary><div class="fw">' +
        (s.task ? '<p class="fw-task">' + md(s.task) + "</p>" : "") +
        s.items.map(x => '<div class="fw-item"><b>' + esc(x.name) + '</b><span class="q">' + md(x.prompt) + "</span></div>").join("") +
        "</div></details>" : "");
  }

  // examples: [{title, weak, strong, tags?, why}]; set guess:true to hide each "why" until opened
  function examplesHTML(list, intro, guess) {
    return '<p class="intro">' + md(intro || 'Compare each weak and strong version. The strong one usually adds context, specifics, or what "done" looks like.') + "</p>" +
      list.map(e => '<div class="ex"><div class="exh">' + esc(e.title) + '</div><div class="pair">' +
        '<div><span class="lbl weak">Weak</span><span class="q">' + esc(e.weak) + "</span></div>" +
        '<div><span class="lbl strong">Strong</span><span class="q">' + esc(e.strong) + "</span>" +
          (e.tags && e.tags.length ? '<span class="tags">' + e.tags.map(t => '<span class="tag">' + esc(t) + "</span>").join("") + "</span>" : "") +
        "</div></div>" +
        (e.why ? (guess ? '<details class="why"><summary>What changed?</summary><div>' + md(e.why) + "</div></details>"
                        : '<div class="why">' + md(e.why) + "</div>") : "") + "</div>").join("");
  }

  function demoHTML(d) {
    const v = d.video || {};
    const video = v.embed
      ? '<div class="video"><iframe src="' + esc(v.embed) + '" title="' + esc(v.title || d.title) +
        '" allow="fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>' +
        (v.note ? '<p class="note">' + md(v.note) + "</p>" : "")
      : (v.planned ? '<div class="video-soon">Screen-recorded demo (2–3 min, captioned) coming before launch. The walkthrough below covers the same steps.</div>' : "");
    return '<div class="demo"><div class="dh"><b>' + esc(d.title) + '</b><span class="chip">' +
      (v.embed ? "Video + text walkthrough" : "Text walkthrough") + "</span></div>" + video +
      (d.turns && d.turns.length ? '<div id="demo-mount"></div>' : "") + "</div>";
  }

  function stepsHTML(m) {
    return '<ol class="steps">' + m.steps.map(x => "<li><div><b>" + esc(x.title) + "</b><span>" + md(x.text) + "</span></div></li>").join("") + "</ol>" +
      (m.tip ? '<div class="tip"><b>Tip</b><span>' + md(m.tip) + "</span></div>" : "") +
      (m.transfer ? '<p class="transfer"><b>Works elsewhere too.</b> ' + md(m.transfer) + "</p>" : "");
  }

  function goodHTML(g) {
    if (!g) return "";
    if (g.image) {
      if (!g.alt) console.warn("[AI Basics Lab] 'What good looks like' image is missing alt text:", g.image);
      return '<figure class="good"><img src="' + esc(g.image) + '" alt="' + esc(g.alt || "") + '" loading="lazy">' +
        (g.caption ? "<figcaption>" + md(g.caption) + "</figcaption>" : "") + "</figure>";
    }
    return g.text ? '<div class="good"><p class="goodtext">' + md(g.text) + "</p></div>" : "";
  }

  function exercisesHTML(m) {
    const many = m.exercises.length > 1;
    return m.exercises.map((x, k) =>
      '<div class="task"><div class="th"><h3>' + esc(x.title) + "</h3>" +
        (many && x.minutes ? '<span class="mins">' + x.minutes + " min</span>" : "") +
        (x.where ? '<span class="where">Do it in: ' + esc(x.where) + "</span>" : "") + "</div>" +
        (x.intro ? "<p>" + md(x.intro) + "</p>" : "") +
        (x.ideas ? '<details class="reveal ideas"><summary>' + esc(x.ideas.title || "Need ideas?") + '</summary><div class="idea-groups">' +
          (x.ideas.intro ? '<p class="idea-intro">' + md(x.ideas.intro) + "</p>" : "") +
          x.ideas.groups.map(g => '<div class="idea-group"><span class="sub">' + esc(g.label) + "</span><ul>" +
            g.items.map(t => "<li>" + md(t) + "</li>").join("") + "</ul></div>").join("") + "</div></details>" : "") +
        (x.files && x.files.length ? '<div class="files"><span class="sub">Downloads</span>' + x.files.map(f =>
          '<a class="btn file" href="' + esc(f.url) + '" download>' + esc(f.label) + "</a>").join("") + "</div>" : "") +
        (x.prompt ? '<div class="prompt"><span class="pl">' + esc(x.promptLabel || "Copy this prompt and fill in the brackets") + "</span>" +
          '<button type="button" class="btn copy" data-copy="' + k + '">Copy</button><span class="ptext" id="ptext-' + k + '">' + esc(x.prompt) + "</span></div>" : "") +
        // numbered steps to do after sending the prompt
        (x.steps && x.steps.length ? (x.stepsLabel ? '<span class="sub">' + esc(x.stepsLabel) + "</span>" : "") +
          '<ol class="xsteps">' + x.steps.map(t => "<li>" + md(t) + "</li>").join("") + "</ol>" : "") +
        '<dl class="deliver">' +
          (x.deliverable ? "<dt>Deliverable</dt><dd>" + md(x.deliverable) + "</dd>" : "") +
          (x.stretch ? "<dt>Stretch</dt><dd>" + md(x.stretch) + "</dd>" : "") +
        "</dl>" +
        (x.goodLooksLike ? '<span class="sub">What good looks like</span>' + goodHTML(x.goodLooksLike) : "") +
        (x.help ? '<details class="reveal help"><summary>' + esc(x.help.title || "How to do it") +
          '</summary><div class="reveal-body">' + md(x.help.text) + "</div></details>" : "") +
        (x.reveal ? '<details class="reveal"><summary>' + esc(x.reveal.title || "Check your answer (open it after you've tried)") +
          '</summary><div class="reveal-body">' + md(x.reveal.text) + "</div></details>" : "") +
      "</div>").join("");
  }

  // The module's own rules, then the course rules from course.js (rulesBase) unless base: false
  function respHTML(r) {
    const box = (x, cls) => '<div class="resp' + (cls ? " " + cls : "") + '"><b>' + esc(x.title || "The rule for this module") + "</b>" +
      (x.text ? "<p>" + md(x.text) + "</p>" : "") +
      (x.rules && x.rules.length ? "<ol>" + x.rules.map(y => "<li>" + md(y) + "</li>").join("") + "</ol>" : "") +
      (x.note ? '<p class="resp-note">' + md(x.note) + "</p>" : "") + "</div>";
    return box(r) + (r.base !== false && C.rulesBase ? box(C.rulesBase, "base") : "");
  }

  function stuckHTML(list) {
    return '<div class="stuck">' + list.map(x =>
      "<details><summary>" + md(x.problem) + '</summary><div class="fix">' + md(x.fix) + "</div></details>").join("") +
      '<p class="stuck-foot">Still stuck? Write down the exact step and what you saw, and bring it to office hours' +
      (C.schedule && C.schedule.officeHours ? " (" + esc(C.schedule.officeHours) + ")" : "") + ".</p></div>";
  }

  function moduleView(m) {
    const i = LIST.findIndex(x => x.id === m.id);
    const entry = LIST[i] || {};
    const t = status(m);
    const b = m.budget || {};
    const secs = SECS = [];
    const add = (id, title, html, minsTxt) => { if (html) secs.push({ id, title, html, minsTxt }); };

    if (m.before) add("before", "Before you start", beforeHTML(m.before));
    if (m.breakdown) add("breakdown", "Breakdown", breakdownHTML(m.breakdown),
      b.read ? b.read + " min with " + (m.frameworks ? "frameworks and examples" : "examples") : "");
    if (m.frameworks) add("frameworks", m.frameworks.title || "Prompt frameworks", frameworksHTML(m.frameworks));
    if (m.examples && m.examples.length) add("examples", "Examples", examplesHTML(m.examples, m.examplesIntro, m.examplesGuess));
    if (m.demo) add("demo", "Demo", demoHTML(m.demo), b.demo ? b.demo + " min" : "");
    if (m.steps && m.steps.length) add("steps", "Step by step", stepsHTML(m));
    if (m.exercises && m.exercises.length) add("exercise", m.exercises.length > 1 ? "Your exercises" : "Your exercise", exercisesHTML(m), b.do ? b.do + " min with steps" : "");
    if (m.responsibleUse) add("responsible", "Responsible use", respHTML(m.responsibleUse));
    if (m.stuck && m.stuck.length) add("stuck", "Stuck?", stuckHTML(m.stuck));
    if (t.total) add("mastery", "Mastery check", '<div class="mastery"><div class="mstat"><span class="big" id="mbig"></span><span id="mchip2"></span></div>' +
      '<div class="bar"><i id="mbar"></i></div>' +
      (m.checks && m.checks.length ? '<span class="sub">I can…</span><div id="checks-mount"></div>' : "") +
      (m.quiz && m.quiz.length ? '<span class="sub">Scenario questions</span><div class="quiz" id="quiz-mount"></div>' : "") +
      '<button type="button" class="btn" id="resetM" style="align-self:flex-start">Reset this module</button></div>', b.check ? b.check + " min" : "");
    if (m.resources && m.resources.length) add("deeper", "Go deeper", '<div class="res">' + m.resources.map(r =>
      '<a href="' + esc(r.url) + '"' + ext(r.url) + ">" + esc(r.label) + (ext(r.url) ? ' ↗<span class="vh"> (opens in a new tab)</span>' : "") + "</a>").join("") + "</div>");

    const total = mins(m);
    const where = i >= 0 ? "Module " + (i + 1) + " of " + LIST.length : (m.label || "Template preview");
    const budget = m.budget ? '<div class="budget" aria-label="Time plan">' + [["Read", "read"], ["Demo", "demo"], ["Do", "do"], ["Check", "check"]]
      .filter(x => b[x[1]]).map(x => '<span class="b-' + x[1] + '" style="flex:' + b[x[1]] + '"><i></i><em><b>' + x[0] + "</b> " + b[x[1]] + " min</em></span>").join("") + "</div>" : "";

    return '<header class="mhead">' +
        '<div class="top"><span id="mchip"></span><span>' + esc(where) + "</span>" +
          (total ? "<span>·</span><span>~" + total + " min on your own</span>" : "") +
          (m.level ? "<span>·</span><span>" + esc(m.level) + "</span>" : "") +
          (entry.track && C.tracks[entry.track] ? '<span class="chip track">' + esc(C.tracks[entry.track].label) + "</span>" : "") +
"</div>" +
        "<h1>" + esc(m.title || entry.title) + "</h1>" +
        (m.goal ? '<p class="goal">' + md(m.goal) + "</p>" : "") +
        (m.outcomes && m.outcomes.length ? '<div class="outcomes">' + m.outcomes.map(o => "<span>" + esc(o) + "</span>").join("") + "</div>" : "") +
        budget +
      "</header>" +
      '<details class="otp"><summary>On this page</summary>' + secNav("secs") + "</details>" +
      secs.map((s, k) => '<section class="station" id="s-' + s.id + '" aria-labelledby="h-' + s.id + '"><header><span class="sn">' + pad(k + 1) +
        '</span><h2 id="h-' + s.id + '" tabindex="-1">' + esc(s.title) + "</h2>" + (s.minsTxt ? '<span class="mins">' + esc(s.minsTxt) + "</span>" : "") +
        "</header>" + s.html + "</section>").join("") +
      pager(i);
  }

  function soonView(entry, i) {
    return '<header class="mhead"><div class="top"><span>' + (i >= 0 ? "Module " + (i + 1) + " of " + LIST.length : "") + "</span>" +
        (entry.track && C.tracks[entry.track] ? '<span class="chip track">' + esc(C.tracks[entry.track].label) + "</span>" : "") + "</div>" +
        "<h1>" + esc(entry.title || "Page not found") + "</h1>" +
        (entry.output ? '<p class="goal">You leave with: ' + esc(entry.output) + "</p>" : "") + "</header>" +
      '<div class="soon"><b>This module is being written.</b><p>It will appear here once it has been drafted and test-run. ' +
        'Start with the course overview, or come to office hours with questions.</p></div>' + pager(i);
  }

  function pager(i) {
    const prev = i > 0 ? LIST[i - 1] : null, next = i >= 0 && i < LIST.length - 1 ? LIST[i + 1] : null;
    return '<nav class="pager" aria-label="Previous and next module">' +
      (prev ? '<a href="' + href(prev.id) + '"><small>Previous</small>' + esc(prev.title) + "</a>"
            : '<a href="' + href("overview") + '"><small>Back</small>Course overview</a>') +
      (next ? '<a class="next" href="' + href(next.id) + '"><small>Next</small>' + esc(next.title) + "</a>"
            : '<a class="next" href="' + href("overview") + '"><small>' + (i >= 0 ? "Finish" : "Back") + "</small>Course overview</a>") +
      "</nav>";
  }

  /* ---------- wire up the interactive parts ---------- */
  function mount(m) {
    const s = st(m.id);
    const refresh = () => {
      const t = status(m);
      save();
      const big = document.getElementById("mbig");
      if (big) {
        big.textContent = t.got + " / " + t.total;
        document.getElementById("mbar").style.width = t.pct + "%";
      }
      ["mchip", "mchip2"].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.className = chip(t.state); el.textContent = LABEL[t.state]; }
      });
      rail(m.id);
    };
    if (m.demo && m.demo.turns) W.demo(document.getElementById("demo-mount"), m.demo.turns);
    document.querySelectorAll("[data-copy]").forEach(btn => {
      const k = +btn.dataset.copy;
      W.copy(btn, m.exercises[k].prompt, document.getElementById("ptext-" + k));
    });
    W.checklist(document.getElementById("checks-mount"), m.checks, s.c, refresh);
    W.quiz(document.getElementById("quiz-mount"), m.quiz, s.q, refresh);
    const reset = document.getElementById("resetM");
    if (reset) reset.addEventListener("click", () => { S[m.id] = { c: {}, q: {} }; save(); show(m.id); });
    s.b = s.b || {};
    document.querySelectorAll("input[data-b]").forEach(i => {
      i.checked = !!s.b[i.dataset.b];
      i.addEventListener("change", () => { s.b[i.dataset.b] = i.checked; save(); });
    });
    refresh();
  }

  /* Section links (sidebar and phone menu): jump without changing the page address */
  document.addEventListener("click", e => {
    const a = e.target.closest("a[data-sec]");
    if (!a) return;
    const target = document.getElementById(a.dataset.sec);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
    const h = target.querySelector("h2");
    if (h) h.focus({ preventScroll: true });
    const otp = a.closest("details.otp");
    if (otp) otp.open = false;
  });

  /* Highlight the section being read */
  function markSection() {
    if (!SECS.length) return;
    let cur = SECS[0].id;
    SECS.forEach(s => { const el = document.getElementById("s-" + s.id); if (el && el.getBoundingClientRect().top < 140) cur = s.id; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = SECS[SECS.length - 1].id;
    document.querySelectorAll("a[data-sec]").forEach(a => {
      if (a.dataset.sec === "s-" + cur) a.setAttribute("aria-current", "location"); else a.removeAttribute("aria-current");
    });
  }
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; markSection(); });
  }, { passive: true });

  /* ---------- show a page ---------- */
  function show(id) {
    const main = document.getElementById("main");
    if (id === "overview") {
      SECS = [];
      main.innerHTML = overviewView();
      document.title = C.title + " · " + C.program;
      rail("overview");
      return;
    }
    const i = LIST.findIndex(x => x.id === id);
    const m = MODS[id];
    if (m) { main.innerHTML = moduleView(m); mount(m); }
    else { SECS = []; main.innerHTML = soonView(LIST[i] || { id }, i); rail(id); }
    if (SINGLE) main.querySelectorAll("a[href]").forEach(a => {   // "m1.html#..." -> "#m1" in the one-file version
      const k = a.getAttribute("href").match(/^(m\d+|index)\.html(#.*)?$/);
      if (k) a.setAttribute("href", "#" + (k[1] === "index" ? "overview" : k[1]));
    });
    document.title = ((m && m.title) || (LIST[i] && LIST[i].title) || "Page not found") + " · " + C.title;
  }

  function loadModule(id, done) {
    if (MODS[id]) return done();
    const s = document.createElement("script");
    s.src = "content/modules/" + id + ".js";
    s.onload = done;
    s.onerror = done;              // no file yet: the page shows "being written"
    document.head.appendChild(s);
  }

  /* ---------- start ---------- */
  frame();
  if (SINGLE) {
    const route = () => {
      const h = (location.hash || "#overview").slice(1);
      show(h === "overview" || MODS[h] || LIST.some(x => x.id === h) ? h : "overview");
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", route);
    route();
  } else if (body.dataset.page === "module") {
    const id = body.dataset.module;
    loadModule(id, () => {
      show(id);
      if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }
    });
  } else {
    show("overview");
  }
})();
