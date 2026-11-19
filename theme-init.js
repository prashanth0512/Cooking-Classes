/* Savor & Sage - pre-paint theme/direction restore.
   Runs in <head> so the saved theme is applied before the page renders (no flash).
   The click behaviour lives in index.js - this is the single global theme system. */
(function () {
  var root = document.documentElement;
  var theme = "dark";
  var dir = "ltr";

  try {
    theme = localStorage.getItem("culinary-theme") || "dark";
    dir = localStorage.getItem("culinary-direction") || "ltr";
  } catch (error) {
    /* storage unavailable - fall back to defaults */
  }

  root.setAttribute("data-theme", theme === "light" ? "light" : "dark");
  root.setAttribute("dir", dir === "rtl" ? "rtl" : "ltr");
})();
