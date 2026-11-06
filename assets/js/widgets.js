/* ==========================================================================
   AI Basics Lab: small shared pieces (no page layout here)
   - AIBW.esc / AIBW.md   text helpers
   - AIBW.demo            click-through walkthrough
   - AIBW.copy            "Copy" button for prompts
   - AIBW.checklist       "I can..." checkboxes
   - AIBW.quiz            scenario questions with feedback
   Each widget takes a container element and plain data, so it works the same
   on the multi-page site and in the single-file version.
   ========================================================================== */
window.AIBW = (function () {
  "use strict";

  const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ESC[c]);

  /* Tiny formatter for content text: **bold**, *italic*, `code`, [text](link).
     Everything else is shown as plain text. */
  function md(s) {
    return String(s == null ? "" : s).split(/(`[^`]+`)/g).map(part => {
      if (/^`[^`]+`$/.test(part)) return "<code>" + esc(part.slice(1, -1)) + "</code>";
      let h = esc(part);
      h = h.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, text, url) => {
        const ext = /^(https?:\/\/|mailto:)/i.test(url);
        if (!ext && url.includes(":")) return text;            // block odd schemes
        return '<a href="' + url + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + text +
          (ext ? '<span class="vh"> (opens in a new tab)</span>' : "") + "</a>";
      });
      h = h.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
      h = h.replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\w)/g, "$1<em>$2</em>");
      return h;
    }).join("");
  }

  /* Click-through demo. turns: [{who:"you"|"claude", text, note}] */
  function demo(root, turns) {
    if (!root || !turns || !turns.length) return;
    let n = 1;
    root.innerHTML =
      '<div class="turns" aria-live="polite"></div>' +
      '<div class="ctrl"><button type="button" class="btn" data-a="prev">Back</button>' +
      '<button type="button" class="btn primary" data-a="next">Next step</button>' +
      '<button type="button" class="btn" data-a="all">Show all</button>' +
      '<span class="count"></span></div>';
    const list = root.querySelector(".turns");
    const count = root.querySelector(".count");
    const btn = a => root.querySelector('[data-a="' + a + '"]');
    const draw = () => {
      list.innerHTML = turns.slice(0, n).map(t => {
        const who = t.who === "claude" ? "claude" : "you";
        return '<div class="turn"><div class="bubble ' + who + '"><span class="who">' +
          (who === "claude" ? "Claude" : "You") + '</span><span class="body">' + esc(t.text) +
          "</span></div>" + (t.note ? '<p class="note">' + md(t.note) + "</p>" : "<span></span>") + "</div>";
      }).join("");
      count.textContent = n + " of " + turns.length;
      btn("prev").disabled = n <= 1;
      btn("next").disabled = btn("all").disabled = n >= turns.length;
    };
    root.addEventListener("click", e => {
      const b = e.target.closest("[data-a]");
      if (!b) return;
      const a = b.dataset.a;
      n = a === "prev" ? Math.max(1, n - 1) : a === "next" ? Math.min(turns.length, n + 1) : turns.length;
      draw();
    });
    draw();
  }

  /* Copy button. Falls back to selecting the text if the clipboard is blocked. */
  function copy(btn, text, selectEl) {
    if (!btn) return;
    const label = btn.textContent;
    const done = msg => { btn.textContent = msg; setTimeout(() => { btn.textContent = label; }, 1800); };
    const fallback = () => {
      if (selectEl) {
        const r = document.createRange();
        r.selectNodeContents(selectEl);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
      }
      done("Selected. Press Ctrl/Cmd+C");
    };
    btn.addEventListener("click", () => {
      try { navigator.clipboard.writeText(text).then(() => done("Copied"), fallback); }
      catch (e) { fallback(); }
    });
  }

  /* "I can..." checklist. items: [{text, evidence}], state: {k: true}, onChange() */
  function checklist(root, items, state, onChange) {
    if (!root || !items || !items.length) return;
    const uid = "c" + Math.random().toString(36).slice(2, 7);
    root.innerHTML = '<ul class="checks">' + items.map((c, k) =>
      '<li><label for="' + uid + k + '"><input type="checkbox" id="' + uid + k + '" data-k="' + k + '"' +
      (state[k] ? " checked" : "") + "><span>" + md(c.text) +
      (c.evidence ? '<span class="ev">Evidence: ' + md(c.evidence) + "</span>" : "") +
      "</span></label></li>").join("") + "</ul>";
    root.addEventListener("change", e => {
      const i = e.target.closest("input[data-k]");
      if (!i) return;
      state[+i.dataset.k] = i.checked;
      onChange && onChange();
    });
  }

  /* Quiz. items: [{q, options:[], answer:index, explain}], picks: {k: index}, onChange() */
  function quiz(root, items, picks, onChange) {
    if (!root || !items || !items.length) return;
    root.innerHTML = items.map((q, k) =>
      '<div class="qq" data-q="' + k + '"><p class="qtext"><b>' + (k + 1) + ". " + md(q.q) + "</b></p>" +
      '<div class="opts" role="group" aria-label="Answers to question ' + (k + 1) + '">' +
      q.options.map((o, j) => '<button type="button" class="opt" data-j="' + j + '" aria-pressed="false">' + md(o) + "</button>").join("") +
      '</div><p class="fb" aria-live="polite"></p></div>').join("");
    root.querySelectorAll(".qq").forEach(div => {
      const k = +div.dataset.q, q = items[k];
      const paint = () => {
        const pick = picks[k];
        div.querySelectorAll(".opt").forEach(b => {
          const j = +b.dataset.j;
          b.classList.toggle("right", pick === q.answer && j === q.answer);
          b.classList.toggle("wrong", pick === j && j !== q.answer);
          b.setAttribute("aria-pressed", String(pick === j));
        });
        const fb = div.querySelector(".fb");
        if (pick === undefined) { fb.textContent = ""; fb.className = "fb"; }
        else if (pick === q.answer) { fb.innerHTML = "Correct. " + md(q.explain); fb.className = "fb ok"; }
        else { fb.textContent = "Not quite. Try another answer."; fb.className = "fb"; }
      };
      div.addEventListener("click", e => {
        const b = e.target.closest(".opt");
        if (!b) return;
        picks[k] = +b.dataset.j;
        paint();
        onChange && onChange();
      });
      paint();
    });
  }

  return { esc, md, demo, copy, checklist, quiz };
})();
