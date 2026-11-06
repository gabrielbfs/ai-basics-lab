/* Trail Club unit economics: the calculations, and the code that connects them to the page.
   calculate() has no page code in it, so tests.html (and Node) can check it directly.
   Example app for AI Basics Lab, Module 7. Fictional company, made-up data. */
(function (root) {
  "use strict";

  // Inputs are as typed on the page: margin and churn in percent.
  function calculate(input) {
    const price = parseFloat(input.price);
    const margin = parseFloat(input.margin) / 100;
    const churn = parseFloat(input.churn) / 100;
    const cac = parseFloat(input.cac);

    const problems = [];
    if (!(price > 0)) problems.push("Price must be above 0.");
    if (!(margin > 0 && margin <= 1)) problems.push("Gross margin must be between 0 and 100%.");
    if (!(churn > 0 && churn <= 1)) problems.push("Churn must be above 0 to estimate lifetime value.");
    if (!(cac > 0)) problems.push("CAC must be above 0.");

    const grossProfit = price > 0 && margin > 0 ? price * margin : null;
    if (problems.length) return { ok: false, grossProfit, problems };

    const ltv = grossProfit / churn;
    const ratio = ltv / cac;
    return { ok: true, grossProfit, ltv, ratio, payback: cac / grossProfit, low: ratio < 3, problems };
  }

  const format = {
    cents: n => "$" + n.toFixed(2),
    dollars: n => "$" + Math.round(n).toLocaleString("en-US"),
    // Rounded DOWN, so a value just under 3 never shows as "3.0" next to the warning.
    ratio: r => (Math.floor(r * 10) / 10).toFixed(1),
    months: m => m.toFixed(1)
  };

  // Used by Node (for checks) or by the browser.
  if (typeof module !== "undefined" && module.exports) { module.exports = { calculate, format }; return; }
  root.TrailClub = { calculate, format };

  // ---------- page wiring (only when the calculator page is open) ----------
  const doc = root.document;
  if (!doc || !doc.getElementById("price")) return;
  const $ = id => doc.getElementById(id);

  function update() {
    const r = calculate({ price: $("price").value, margin: $("margin").value, churn: $("churn").value, cac: $("cac").value });
    $("gp").textContent = r.grossProfit === null ? "–" : format.cents(r.grossProfit);
    if (!r.ok) {
      ["ltv", "ratio", "payback"].forEach(id => { $(id).textContent = "–"; });
      $("ratioCard").classList.remove("bad");
      $("warn").classList.remove("show");
      $("err").textContent = r.problems.join(" ");
      $("err").classList.add("show");
      return;
    }
    $("err").classList.remove("show");
    $("ltv").textContent = format.dollars(r.ltv);
    $("ratio").textContent = format.ratio(r.ratio);
    $("payback").textContent = format.months(r.payback);
    $("ratioCard").classList.toggle("bad", r.low);
    $("warn").classList.toggle("show", r.low);
  }

  doc.querySelectorAll("input").forEach(i => i.addEventListener("input", update));
  update();
})(typeof window !== "undefined" ? window : globalThis);
