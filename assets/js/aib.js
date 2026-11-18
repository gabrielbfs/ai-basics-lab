/* ==========================================================================
   AI Basics Lab: page renderer (the one template for every page)

   Text lives in content/course.js (course settings + overview) and
   content/modules/<id>.js (one file per module). This file only decides
   how that text is laid out. Section order follows the revision plan.

   Two modes, same code:
   - multi-page (default): m00-course-overview.html, m01-briefing-claude.html ... each page loads its own content file
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
  const KEY = "aibasics.progress.v3";            // v3: "Mark as done" replaced the mastery check
  let S = {};
  try { S = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { S = {}; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked */ } };
  const st = id => S[id] || (S[id] = { b: {} });

  // done = the student pressed "Mark as done"; in progress = any "Before you start" box ticked
  function status(m) {
    const s = st(m.id);
    s.state = s.done ? "done" : Object.values(s.b || {}).some(Boolean) ? "prog" : "todo";   // cached so other pages can show it
    return { state: s.state };
  }
  const LABEL = { todo: "Not started", prog: "In progress", done: "Done" };
  const chip = state => "chip" + (state && state !== "todo" ? " " + state : "");
  const cached = id => (S[id] && S[id].state) || "todo";

  /* ---------- links ---------- */
  // Page file names come from course.js (overviewPage, and page: on each module)
  const pageOf = id => id === "overview" ? C.overviewPage : ((LIST.find(m => m.id === id) || {}).page || id + ".html");
  // ?preview in the address shows unpublished modules (published: false in course.js); links keep it while you click around
  const PREVIEW = /[?&]preview\b/.test(location.search);
  const isPub = id => { const e = LIST.find(m => m.id === id); return !e || e.published !== false; };
  const shown = id => PREVIEW || isPub(id);
  const href = id => SINGLE ? "#" + id : pageOf(id) + (PREVIEW ? "?preview" : "");
  const PAGE_ID = { "index.html": "overview" };      // file name -> id, for the one-file version
  PAGE_ID[C.overviewPage] = "overview";
  LIST.forEach(m => { PAGE_ID[m.page] = m.id; PAGE_ID[m.id + ".html"] = m.id; });
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
        '<div class="railnote" id="railnote"></div>' +
      '</aside><main id="main" tabindex="-1"></main></div>');
    document.querySelector(".skip").addEventListener("click", e => {
      e.preventDefault(); document.getElementById("main").focus();
    });
  }

  /* Sections of the module on screen, grouped for the sidebar (set by moduleView) */
  let SECS = [];
  const GROUP = { before: "Learn", breakdown: "Learn", frameworks: "Learn", examples: "Learn", demo: "Learn",
                  steps: "Do", exercise: "Do", responsible: "Check", stuck: "Check", deeper: "Check", finish: "Check" };
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
      '><span class="n">00</span><span>Course Overview</span><span></span></a></li>' +
      LIST.map((m, i) => {
        const s = cached(m.id), soon = !isPub(m.id);
        return '<li><a href="' + href(m.id) + '"' + (cur === m.id ? ' aria-current="page"' : "") + (soon ? ' class="is-soon"' : "") +
          '><span class="n">' + pad(i + 1) + "</span><span>" + esc(m.short || m.title) + "</span>" +
          (soon ? '<span class="soontag">Soon</span>' : '<span class="dot ' + (s === "todo" ? "" : s) + '" title="' + LABEL[s] + '"></span>') + "</a>" +
          (cur === m.id && SECS.length ? '<nav aria-label="Sections on this page">' + secNav("secs") + "</nav>" : "") + "</li>";
      }).join("");
    const done = LIST.filter(m => cached(m.id) === "done").length;
    document.getElementById("overallTxt").textContent = done + " of " + LIST.length + " modules done";
    document.getElementById("overallBar").style.width = (done / LIST.length * 100) + "%";
    document.getElementById("railnote").innerHTML =
      "<span>Progress is saved in this browser only.</span>" +
      (C.status ? "<span>" + esc(C.status) + ".</span>" : "");
    markSection();
    const a = nav.querySelector('[aria-current="page"]');
    if (a && nav.scrollWidth > nav.clientWidth) nav.scrollLeft = a.offsetLeft - nav.offsetLeft - 8;
  }

  /* ---------- overview ---------- */
  // A screenshot with optional highlight boxes ({x, y, w, h, label} in % of the image),
  // or a dashed "Screenshot to add" box while only {todo} is set.
  function shotHTML(s) {
    if (!s) return "";
    if (!s.image) return s.todo ? '<div class="shot-todo"><b>Screenshot to add:</b> ' + esc(s.todo) + "</div>" : "";
    if (!s.alt) console.warn("[AI Basics Lab] screenshot is missing alt text:", s.image);
    return '<figure class="shot"><div class="shot-img"><img src="' + esc(s.image) + '" alt="' + esc(s.alt || "") + '" loading="lazy">' +
      (s.highlight || []).map(h => '<span class="hl" aria-hidden="true" style="left:' + h.x + "%;top:" + h.y + "%;width:" + h.w + "%;height:" + h.h + '%">' +
        (h.label ? "<em>" + esc(h.label) + "</em>" : "") + "</span>").join("") + "</div>" +
      (s.caption ? "<figcaption>" + md(s.caption) + "</figcaption>" : "") + "</figure>";
  }

  function overviewView() {
    const o = C.overview;
    return '<section class="hero">' +
        (C.status ? '<span class="draft">' + esc(C.status) + "</span>" : "") +
        "<h1>" + md(o.headline) + "</h1>" +
        '<p class="lede">' + md(o.lede) + "</p>" +
      "</section>" +

      '<section class="sect"><h2>' + esc(o.ways.title) + "</h2>" +
        '<div class="ways">' + o.ways.items.map(w =>
          '<div><span class="k">' + esc(w.label) + '</span><span class="when">' + esc(w.when) + "</span><b>" + esc(w.title) + "</b><p>" + md(w.text) + "</p></div>").join("") + "</div></section>" +

      '<section class="sect"><h2>The modules</h2><div class="grid">' + LIST.map((m, i) => {
          const s = cached(m.id), soon = !isPub(m.id);
          return '<a class="mcard' + (soon ? " is-soon" : "") + '" href="' + href(m.id) + '"><span class="num">' + (i + 1) + "</span><div><b>" + esc(m.title) + "</b>" +
            (m.blurb ? '<span class="out">' + esc(m.blurb) + "</span>" : "") +
            '<div class="meta">' +
              (soon ? '<span class="chip coming">Coming soon</span>'
                    : s !== "todo" ? '<span class="' + chip(s) + '">' + LABEL[s] + "</span>" : "") +     // no label until started
              '<span class="chip track">' + esc((C.tracks[m.track] || {}).label || "") + "</span>" +
              (m.setup ? '<span class="chip setup">Setup ' + esc(m.setup) + "</span>" : "") +
            "</div></div></a>";
        }).join("") + "</div>" +
      "</section>" +

      '<section class="sect" id="setup"><h2>' + esc(o.setup.title) + "</h2>" +
        (o.setup.text ? '<p class="prose">' + md(o.setup.text) + "</p>" : "") +
        '<div class="tablewrap"><table class="cmp setup"><thead><tr><th>Part</th><th>What to do</th><th>Needed for</th></tr></thead><tbody>' +
        o.setup.parts.map(p => "<tr><td>" + esc(p.part) + "</td><td>" +
          (Array.isArray(p.what) ? '<ul class="todo">' + p.what.map(w => typeof w === "string" ? "<li>" + md(w) + "</li>"
            : "<li>" + md(w.text) + shotHTML(w.shot) + "</li>").join("") + "</ul>" : md(p.what)) +
          "</td><td>" + esc(p.neededFor) + "</td></tr>").join("") +
        "</tbody></table></div>" +
        (o.setup.screensAsOf ? '<p class="asof">Screenshots as of ' + esc(o.setup.screensAsOf) + ". The apps may look slightly different now.</p>" : "") +
        "</section>" +

      '<section class="sect"><h2>' + esc(o.how.title) + '</h2><ol class="steps">' + o.how.items.map(x =>
        "<li><div><b>" + esc(x.title) + "</b>" +
          (Array.isArray(x.text) ? '<ul class="pts">' + x.text.map(t => "<li>" + md(t) + "</li>").join("") + "</ul>"
                                 : "<span>" + md(x.text) + "</span>") + "</div></li>").join("") + "</ol></section>";
  }

  /* ---------- module sections ---------- */
  // needs: "text" or {text, ifNot, files}; ifNot shows while the box is unticked; files = download buttons
  function beforeHTML(b) {
    return '<div class="before">' +
      (b.needs && b.needs.length ? '<span class="sub">Checklist</span><ul class="checks ready">' + b.needs.map((x, k) => {
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
    // figure: {svg} (inline) or {image, alt} (file in assets/img), optional caption; top: true puts it under the key line
    const f = bd.figure;
    const fig = f ? '<figure class="diagram">' + (f.image ? '<img src="' + esc(f.image) + '" alt="' + esc(f.alt || "") + '" loading="lazy">' : f.svg || "") +
      (f.caption ? "<figcaption>" + md(f.caption) + "</figcaption>" : "") + "</figure>" : "";
    return (bd.key ? '<p class="keyidea">' + md(bd.key) + "</p>" : "") + (f && f.top ? fig : "") +
      '<div class="concepts">' + (bd.concepts || []).map(c =>
        // text can be one paragraph or a list of short bullets
        '<div class="concept"><b>' + esc(c.title) + "</b>" + (Array.isArray(c.text)
          ? '<ul class="pts">' + c.text.map(x => "<li>" + md(x) + "</li>").join("") + "</ul>"
          : "<p>" + md(c.text) + "</p>") + "</div>").join("") + "</div>" +
      (f && !f.top ? fig : "") + cmp;
  }

  // Small chart icons for framework cards: parts: [term, meaning, icon] with icon = bar | line | stacked | hist | scatter
  const ICON = {
    bar: '<path d="M3 14V8M8 14V3M13 14V10" stroke-width="3"/>',
    line: '<path d="M2 12l4-5 4 2 4-6" stroke-width="2"/>',
    stacked: '<path d="M4 14V10M8 14V9M12 14V11" stroke-width="3" stroke-opacity=".45"/><path d="M4 10V5M8 9V2M12 11V7" stroke-width="3"/>',
    hist: '<path d="M2.5 14V11M5.5 14V6M8.5 14V3M11.5 14V7M14.5 14V12" stroke-width="2.6"/>',
    scatter: '<g fill="currentColor" stroke="none"><circle cx="3" cy="12" r="1.6"/><circle cx="6" cy="9" r="1.6"/><circle cx="8" cy="10.5" r="1.6"/><circle cx="10.5" cy="6" r="1.6"/><circle cx="13" cy="4" r="1.6"/></g>'
  };
  const icon = k => ICON[k] ? '<svg class="fw-ic" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round">' + ICON[k] + "</svg>" : "";

  // frameworks: {intro, cards:[{name, goodFor, parts:[[term, meaning, icon?]]}], table, note, sample:{title, task, items:[{name, prompt}]}}
  function frameworksHTML(f) {
    const s = f.sample;
    return (f.intro ? '<p class="para">' + md(f.intro) + "</p>" : "") +
      (f.cards ? '<div class="fw-cards">' + f.cards.map(c => '<div class="fw-card"><b class="fw-name">' + esc(c.name) + "</b>" +
        "<ul>" + c.parts.map(p => "<li><b>" + icon(p[2]) + esc(p[0]) + "</b><span>" + md(p[1]) + "</span></li>").join("") + "</ul>" +
        (c.goodFor ? '<p class="fw-good"><span>Good for</span> ' + md(c.goodFor) + "</p>" : "") + "</div>").join("") + "</div>" : "") +
      (f.table ? table(f.table) : "") +
      // note: one sentence, or {label, points} for a highlighted tip box with bullets
      (f.note ? (f.note.points
        ? '<div class="tip fw-tip"><b>' + esc(f.note.label || "Tip") + '</b><ul class="pts">' + f.note.points.map(x => "<li>" + md(x) + "</li>").join("") + "</ul></div>"
        : '<p class="para">' + md(f.note) + "</p>") : "") +
      // sample: the same task written in each framework, as cards with a Copy button (copies the text without ** marks)
      (s ? '<details class="reveal"><summary>' + esc(s.title || "See one task in each framework") + '</summary><div class="fw">' +
        (s.task ? '<p class="fw-task">' + md(s.task) + "</p>" : "") +
        (s.tryIt ? '<p class="fw-task">' + md(s.tryIt) + "</p>" : "") +
        '<div class="fw-grid">' + s.items.map((x, k) => '<div class="fw-item"><div class="fw-head"><b>' + esc(x.name) + "</b>" +
          '<button type="button" class="btn copy" data-fwcopy="' + k + '">Copy</button></div>' +
          '<span class="q" id="fwq-' + k + '">' + md(x.prompt) + "</span></div>").join("") + "</div>" +
        "</div></details>" : "");
  }

  // examples: [{title, weak, strong, tags?, why}]; set guess:true to hide each "why" until opened
  // examples: [{title, idea?, weak, strong, gets?: {weak, strong}, tags?, why}]
  // In strong, mark parts as [[Tag::words]] to color those words and show a matching colored tag.
  // Without marks, tags (if any) show as plain grey-blue chips.
  const HL = /\[\[([^:\]]+)::([\s\S]*?)\]\]/g;
  const plainStrong = s => s.replace(HL, "$2");
  // text with [[Tag::words]] marks -> {html with colored marks, matching tag chips}; also used for exercise prompts
  function hlHTML(text, plainTags) {
    const names = [];
    let html = "", last = 0, mt;
    HL.lastIndex = 0;
    while ((mt = HL.exec(text))) {
      if (names.indexOf(mt[1]) < 0) names.push(mt[1]);
      html += esc(text.slice(last, mt.index)) + '<mark class="hl hl-' + (names.indexOf(mt[1]) % 5) + '">' + esc(mt[2]) + "</mark>";
      last = HL.lastIndex;
    }
    html += esc(text.slice(last));
    const tags = names.length
      ? names.map((t, k) => '<span class="tag hl-' + (k % 5) + '">' + esc(t) + "</span>")
      : (plainTags || []).map(t => '<span class="tag">' + esc(t) + "</span>");
    return { html, tags: tags.length ? '<span class="tags">' + tags.join("") + "</span>" : "" };
  }
  const strongHTML = e => hlHTML(e.strong, e.tags);
  // a text field can be a sentence, a list of bullets, or {text, points} (a lead sentence plus bullets)
  function textBlock(v, tag) {
    const ul = a => '<ul class="pts">' + a.map(x => "<li>" + md(x) + "</li>").join("") + "</ul>";
    if (Array.isArray(v)) return ul(v);
    if (v && v.points) return (v.text ? "<" + tag + ">" + md(v.text) + "</" + tag + ">" : "") + ul(v.points);
    return "<" + tag + ">" + md(v) + "</" + tag + ">";
  }
  function examplesHTML(list, intro, guess) {
    return '<p class="intro">' + md(intro || 'Compare each weak and strong version. The strong one usually adds context, specifics, or what "done" looks like.') + "</p>" +
      list.map((e, k) => { const s = strongHTML(e); return '<div class="ex"><div class="exh">' + esc(e.title) +
          (e.idea ? '<span class="exidea">Key idea: ' + md(e.idea) + "</span>" : "") + '</div><div class="pair">' +
        '<div><span class="lbl weak">Weak</span><span class="q">' + esc(e.weak) + "</span>" +
          (e.gets && e.gets.weak ? '<span class="gets"><b>You get:</b> ' + md(e.gets.weak) + "</span>" : "") + "</div>" +
        '<div><span class="exrow"><span class="lbl strong">Strong</span><button type="button" class="btn copy" data-excopy="' + k + '">Copy</button></span>' +
          '<span class="q" id="exq-' + k + '">' + s.html + "</span>" + s.tags +
          (e.gets && e.gets.strong ? '<span class="gets"><b>You get:</b> ' + md(e.gets.strong) + "</span>" : "") +
        "</div></div>" +
        (e.why ? (guess ? '<details class="why"><summary>What changed?</summary><div>' + md(e.why) + "</div></details>"
                        : '<div class="why">' + md(e.why) + "</div>") : "") + "</div>"; }).join("");
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
    // a step can be {title, text}, or {group: "Exercise A · ~10 min"} for an unnumbered heading row; numbering continues across groups
    return '<ol class="steps">' + m.steps.map(x => x.group
      ? '<li class="grp">' + esc(x.group) + "</li>"
      : "<li><div><b>" + esc(x.title) + "</b><span>" + md(x.text) + "</span>" + (x.shot ? shotHTML(x.shot) : "") + "</div></li>").join("") + "</ol>" +   // shot: optional illustration under a step
      (m.tip ? '<div class="tip"><b>Tip</b><span>' + md(m.tip) + "</span></div>" : "") +
      // tipShot: an illustration under the tip, same format as setup shots ({image, alt, caption})
      (m.tipShot ? shotHTML(m.tipShot) : "") +
      (m.transfer ? '<p class="transfer"><b>Works elsewhere too.</b> ' + md(m.transfer) + "</p>" : "");
  }

  // What good looks like: text, an image, or both (image first, then the text)
  function goodHTML(g) {
    if (!g) return "";
    if (g.image && !g.alt) console.warn("[AI Basics Lab] 'What good looks like' image is missing alt text:", g.image);
    const img = g.image ? '<img src="' + esc(g.image) + '" alt="' + esc(g.alt || "") + '" loading="lazy">' +
      (g.caption ? "<figcaption>" + md(g.caption) + "</figcaption>" : "") : "";
    const txt = g.text ? '<p class="goodtext">' + md(g.text) + "</p>" : "";
    return img || txt ? '<figure class="good">' + img + txt + "</figure>" : "";
  }

  function exercisesHTML(m) {
    const many = m.exercises.length > 1;
    return m.exercises.map((x, k) =>
      '<div class="task"><div class="th"><h3>' + esc(x.title) + "</h3>" +
        (many && x.minutes ? '<span class="mins">' + x.minutes + " min</span>" : "") +
        (x.where ? '<span class="where">Do it in: ' + esc(x.where) + "</span>" : "") + "</div>" +
        (x.intro ? textBlock(x.intro, "p") : "") +
        (x.ideas ? '<details class="reveal ideas"><summary>' + esc(x.ideas.title || "Need ideas?") + '</summary><div class="idea-groups">' +
          (x.ideas.intro ? '<p class="idea-intro">' + md(x.ideas.intro) + "</p>" : "") +
          x.ideas.groups.map(g => '<div class="idea-group"><span class="sub">' + esc(g.label) + "</span><ul>" +
            g.items.map(t => "<li>" + md(t) + "</li>").join("") + "</ul></div>").join("") + "</div></details>" : "") +
        (x.files && x.files.length ? '<div class="files"><span class="sub">Downloads</span>' + x.files.map(f =>
          '<a class="btn file" href="' + esc(f.url) + '" download>' + esc(f.label) + "</a>").join("") + "</div>" : "") +
        (x.prompt ? '<div class="prompt"><span class="pl">' + esc(x.promptLabel || "Copy this prompt and fill in the brackets") + "</span>" +
          '<button type="button" class="btn copy" data-copy="' + k + '">Copy</button>' +
          (p => '<span class="ptext" id="ptext-' + k + '">' + p.html + "</span>" + p.tags)(hlHTML(x.prompt)) + "</div>" : "") +
        // numbered steps to do after sending the prompt
        (x.steps && x.steps.length ? (x.stepsLabel ? '<span class="sub">' + esc(x.stepsLabel) + "</span>" : "") +
          '<ol class="xsteps">' + x.steps.map(t => "<li>" + md(t) + "</li>").join("") + "</ol>" : "") +
        '<dl class="deliver">' +
          (x.deliverable ? "<dt>Deliverable</dt><dd>" + textBlock(x.deliverable, "span") + "</dd>" : "") +
          (x.stretch ? "<dt>Stretch</dt><dd>" + textBlock(x.stretch, "span") + "</dd>" : "") +
        "</dl>" +
        (x.goodLooksLike ? '<span class="sub">What good looks like</span>' + goodHTML(x.goodLooksLike) : "") +
        (x.help ? '<details class="reveal help"><summary>' + esc(x.help.title || "How to do it") +
          '</summary><div class="reveal-body">' + md(x.help.text) + "</div>" + (x.help.shot ? '<div class="reveal-shot">' + shotHTML(x.help.shot) + "</div>" : "") + "</details>" : "") +
        // help.shot / reveal.shot: an illustration inside the box, under the text ({image, alt, caption})
        (x.reveal ? '<details class="reveal"><summary>' + esc(x.reveal.title || "Check your answer (open it after you've tried)") +
          '</summary>' + (x.reveal.shot ? '<div class="reveal-shot">' + shotHTML(x.reveal.shot) + "</div>" : "") +
          '<div class="reveal-body">' + md(x.reveal.text) + "</div></details>" : "") +
      "</div>").join("");
  }

  // The module's own rules, then the course rules from course.js (rulesBase) unless base: false; base: "only" shows just the course rules
  function respHTML(r) {
    const li = a => a.map(y => "<li>" + md(y) + "</li>").join("");
    const box = (x, cls) => '<div class="resp' + (cls ? " " + cls : "") + '"><b>' + esc(x.title || "The rule for this module") + "</b>" +
      (x.text ? "<p>" + md(x.text) + "</p>" : "") +
      (x.rules && x.rules.length ? "<ol>" + li(x.rules) + "</ol>" : "") +
      (x.points && x.points.length ? '<ul class="pts">' + li(x.points) + "</ul>" : "") +     // points: a bulleted checklist
      // use / never: two columns (Use ✓ and Never paste ✗)
      (x.use || x.never ? '<div class="usenever">' +
        (x.use ? '<div class="use"><span class="sub">✓ Use</span><ul class="pts">' + li(x.use) + "</ul></div>" : "") +
        (x.never ? '<div class="never"><span class="sub">✗ Never paste</span><ul class="pts">' + li(x.never) + "</ul></div>" : "") + "</div>" : "") +
      (x.after ? x.after.map(y => "<p>" + md(y) + "</p>").join("") : "") +
      (x.tip ? '<p class="resp-tip"><b>Tip</b> ' + md(x.tip) + "</p>" : "") +
      (x.note ? '<p class="resp-note">' + md(x.note) + "</p>" : "") + "</div>";
    // base: "only" = show the course rules as this module's own (Module 1); base: false = hide them
    if (r.base === "only") return C.rulesBase ? box(Object.assign({}, C.rulesBase, { title: r.title || C.rulesBase.title, text: r.text })) : "";
    return box(r) + (r.base !== false && C.rulesBase ? box(C.rulesBase, "base") : "");
  }

  function stuckHTML(list) {
    return '<div class="stuck">' + list.map(x =>
      "<details><summary>" + md(x.problem) + '</summary><div class="fix">' + md(x.fix) + "</div></details>").join("") +
      '<p class="stuck-foot">Still stuck? Write down the exact step and what you saw, and bring it to office hours.</p></div>';
  }

  // Go deeper: [{label, url, source?, type?, group?}] -> one table (Resource | Source | Type), with a divider row per group.
  // Without source, a label like "Anthropic: Prompting best practices" is split at the first ": ".
  // The Source / Type columns only appear when at least one link has one.
  function resHTML(list) {
    const rows = list.map(r => {
      const cut = r.source ? -1 : r.label.indexOf(": ");
      return { r, source: r.source || (cut > 0 ? r.label.slice(0, cut) : ""), title: cut > 0 ? r.label.slice(cut + 2) : r.label };
    });
    const hasSrc = rows.some(x => x.source), hasType = rows.some(x => x.r.type);
    const cols = 1 + hasSrc + hasType;
    let last = null;
    const body = rows.map(x => {
      const g = x.r.group || "";
      const head = g && g !== last ? '<tr class="grp"><th colspan="' + cols + '" scope="colgroup">' + esc(g) + "</th></tr>" : "";
      last = g;
      return head + "<tr><td>" + '<a href="' + esc(x.r.url) + '"' + ext(x.r.url) + ">" + esc(x.title) +
        (ext(x.r.url) ? ' ↗<span class="vh"> (opens in a new tab)</span>' : "") + "</a></td>" +
        (hasSrc ? "<td>" + esc(x.source) + "</td>" : "") + (hasType ? "<td>" + esc(x.r.type || "") + "</td>" : "") + "</tr>";
    }).join("");
    return '<div class="tablewrap"><table class="cmp restable"><thead><tr><th scope="col">Resource</th>' +
      (hasSrc ? '<th scope="col">Source</th>' : "") + (hasType ? '<th scope="col">Type</th>' : "") + "</tr></thead><tbody>" + body + "</tbody></table></div>";
  }

  function moduleView(m) {
    const i = LIST.findIndex(x => x.id === m.id);
    const entry = LIST[i] || {};
    const t = status(m);
    const b = m.budget || {};
    const secs = SECS = [];
    const add = (id, title, html, minsTxt) => { if (html) secs.push({ id, title, html, minsTxt }); };

    if (m.before) add("before", "Before you start", beforeHTML(m.before));
    if (m.breakdown) add("breakdown", "Key ideas", breakdownHTML(m.breakdown),
      b.read ? "Learn · ~" + b.read + " min" : "");
    if (m.frameworks) add("frameworks", m.frameworks.title || "Prompt frameworks", frameworksHTML(m.frameworks));
    if (m.examples && m.examples.length) add("examples", "Examples", examplesHTML(m.examples, m.examplesIntro, m.examplesGuess));
    if (m.demo) add("demo", "Demo", demoHTML(m.demo), b.demo ? "Demo · ~" + b.demo + " min" : "");
    if (m.steps && m.steps.length) add("steps", "Step by step", stepsHTML(m));
    if (m.exercises && m.exercises.length) add("exercise", m.exercises.length > 1 ? "Your exercises" : "Your exercise", exercisesHTML(m), b.do ? "Do · ~" + b.do + " min" : "");
    if (m.responsibleUse) add("responsible", "Responsible use", respHTML(m.responsibleUse), b.check ? "Check · ~" + b.check + " min" : "");
    if (m.stuck && m.stuck.length) add("stuck", "Stuck?", stuckHTML(m.stuck));
    if (m.resources && m.resources.length) add("deeper", "Go deeper", resHTML(m.resources));
    // Last section on every module: recap, then mark as done (drives the sidebar progress, menu dots and card labels)
    add("finish", "Finish", '<div class="finish">' +
      (m.outcomes && m.outcomes.length ? '<span class="sub">You can now</span><ul class="did">' +
        m.outcomes.map(o => "<li>" + esc(o) + "</li>").join("") + "</ul>" : "") +
      '<div class="donerow"><button type="button" class="btn primary" id="doneBtn" aria-pressed="false">Mark as done</button>' +
      '<span class="donenote">Progress is saved in this browser only.</span></div>' +
      "</div>");

    const budget = m.budget ? '<div class="budget" aria-label="Time plan">' + [["Learn", "read"], ["Demo", "demo"], ["Do", "do"], ["Check", "check"]]
      .filter(x => b[x[1]]).map(x => '<span class="b-' + x[1] + '" style="flex:' + b[x[1]] + '"><i></i><em><b>' + x[0] + "</b> " + b[x[1]] + " min</em></span>").join("") + "</div>" : "";

    // No status/module-number/time/level/track line above the title (removed Nov 17, 2026)
    return '<header class="mhead">' +
        "<h1>" + esc(m.title || entry.title) + "</h1>" +
        // Headline structure for every module: "Learn to…" (goal in the module file), then "You leave with" (output in course.js)
        (m.goal ? '<p class="goal">' + md(m.goal) + "</p>" : "") +
        (entry.output ? '<p class="leave"><span class="sub">You leave with</span> ' + esc(entry.output) + "</p>" : "") +
        (m.outcomes && m.outcomes.length ? '<div class="outcomes">' + m.outcomes.map(o => "<span>" + esc(o) + "</span>").join("") + "</div>" : "") +
        budget +
      "</header>" +
      '<details class="otp"><summary>On this page</summary>' + secNav("secs") + "</details>" +
      secs.map((s, k) => '<section class="station" id="s-' + s.id + '" aria-labelledby="h-' + s.id + '"><header><span class="sn">' + pad(k + 1) +
        '</span><h2 id="h-' + s.id + '" tabindex="-1">' + esc(s.title) + "</h2>" + (s.minsTxt ? '<span class="mins">' + esc(s.minsTxt) + "</span>" : "") +
        "</header>" + s.html + "</section>").join("") +
      pager(i);
  }

  // Shown for modules with published: false (unless ?preview), and for modules with no content file yet
  function soonView(entry, i) {
    const first = LIST.find(m => isPub(m.id));
    return '<header class="mhead">' +
        "<h1>" + esc(entry.title || "Page not found") + "</h1>" +
        (entry.blurb ? '<p class="goal">' + esc(entry.blurb) + "</p>" : "") + "</header>" +
      '<div class="soon"><span class="chip coming">Coming soon</span><b>This module is being updated and will be published soon.</b>' +
        "<p>In the meantime, start with " + (first && first.id !== entry.id ? '<a href="' + href(first.id) + '">Module ' + (LIST.indexOf(first) + 1) + ": " + esc(first.title) + "</a>" : "the course overview") +
        " or come to office hours.</p></div>" + pager(i);
  }

  function pager(i) {
    const prev = i > 0 ? LIST[i - 1] : null, next = i >= 0 && i < LIST.length - 1 ? LIST[i + 1] : null;
    return '<nav class="pager" aria-label="Previous and next module">' +
      (prev ? '<a href="' + href(prev.id) + '"><small>Previous</small>' + esc(prev.title) + "</a>"
            : '<a href="' + href("overview") + '"><small>Back</small>Course Overview</a>') +
      (next ? '<a class="next" href="' + href(next.id) + '"><small>Next</small>' + esc(next.title) + "</a>"
            : '<a class="next" href="' + href("overview") + '"><small>' + (i >= 0 ? "Finish" : "Back") + "</small>Course Overview</a>") +
      "</nav>";
  }

  /* ---------- wire up the interactive parts ---------- */
  function mount(m) {
    const s = st(m.id);
    const refresh = () => {
      const t = status(m);
      save();
      const el = document.getElementById("mchip");
      if (el) { el.className = chip(t.state); el.textContent = LABEL[t.state]; }
      const btn = document.getElementById("doneBtn");
      if (btn) {
        btn.setAttribute("aria-pressed", String(!!s.done));
        btn.className = "btn" + (s.done ? " is-done" : " primary");
        btn.textContent = s.done ? "✓ Done (click to undo)" : "Mark as done";
      }
      rail(m.id);
    };
    if (m.demo && m.demo.turns) W.demo(document.getElementById("demo-mount"), m.demo.turns);
    document.querySelectorAll("[data-copy]").forEach(btn => {
      const k = +btn.dataset.copy;
      W.copy(btn, plainStrong(m.exercises[k].prompt), document.getElementById("ptext-" + k));
    });
    document.querySelectorAll("[data-excopy]").forEach(btn => {
      const k = +btn.dataset.excopy;
      W.copy(btn, plainStrong(m.examples[k].strong), document.getElementById("exq-" + k));
    });
    document.querySelectorAll("[data-fwcopy]").forEach(btn => {
      const k = +btn.dataset.fwcopy;
      W.copy(btn, m.frameworks.sample.items[k].prompt.replace(/\*\*/g, ""), document.getElementById("fwq-" + k));
    });
    const doneBtn = document.getElementById("doneBtn");
    if (doneBtn) doneBtn.addEventListener("click", () => { s.done = !s.done; refresh(); });
    s.b = s.b || {};
    document.querySelectorAll("input[data-b]").forEach(i => {
      i.checked = !!s.b[i.dataset.b];
      i.addEventListener("change", () => { s.b[i.dataset.b] = i.checked; refresh(); });
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
    const m = shown(id) ? MODS[id] : null;
    if (m) {
      main.innerHTML = (isPub(id) ? "" : '<div class="previewbar">Preview · not published. Students see "Coming soon" on this page.</div>') + moduleView(m);
      mount(m);
    }
    else { SECS = []; main.innerHTML = soonView(LIST[i] || { id }, i); rail(id); }
    if (SINGLE) main.querySelectorAll("a[href]").forEach(a => {   // "m01-briefing-claude.html#..." -> "#m1" in the one-file version
      const k = a.getAttribute("href").match(/^([\w-]+\.html)(#.*)?$/);
      if (k && PAGE_ID[k[1]]) a.setAttribute("href", "#" + PAGE_ID[k[1]]);
    });
    document.title = ((m && m.title) || (LIST[i] && LIST[i].title) || "Page not found") + " · " + C.title;
  }

  function loadModule(id, done) {
    if (MODS[id] || !shown(id)) return done();      // unpublished: don't even load the content file
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
