/* Apply the saved color theme before the page draws (avoids a flash of the wrong theme).
   Loaded in <head> on every page. The switch itself lives in aib.js. */
(function () {
  try {
    var t = localStorage.getItem("aibasics.theme");
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
  } catch (e) { /* storage blocked: follow the device setting */ }
})();
