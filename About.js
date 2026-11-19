document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const footerYear = document.getElementById("footerYear");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // Shared header, theme, direction and navigation controls are managed by index.js.
});
