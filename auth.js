/* =========================================================
   Savor & Sage - Student Login / Sign Up (shared script)
   - Dark / light theme toggle
   - LTR / RTL toggle
   - Social sign-in configuration check
   - Fit-to-screen: scales the card down if the viewport is
     too short, so the page never scrolls.
   - Demo account storage helpers (browser localStorage only)
   ========================================================= */

/* ---------- Demo account storage ---------- */
const SAVOR_USERS_KEY = "savorSageStudents";

function getStudentAccounts() {
  try {
    return JSON.parse(localStorage.getItem(SAVOR_USERS_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveStudentAccounts(accounts) {
  localStorage.setItem(SAVOR_USERS_KEY, JSON.stringify(accounts));
}

function findStudentAccount(email) {
  const target = email.trim().toLowerCase();
  return getStudentAccounts().find((account) => account.email === target);
}

function setFormMessage(element, text, type) {
  element.textContent = text;
  element.classList.toggle("success", type === "success");
  fitAuthCard();
}

/* ---------- Fit card to viewport (no scroll) ---------- */
function fitAuthCard() {
  const card = document.querySelector(".auth-card");
  if (!card) return;

  card.style.transform = "none";

  const styles = getComputedStyle(document.body);
  const availableHeight =
    document.body.clientHeight -
    parseFloat(styles.paddingTop) -
    parseFloat(styles.paddingBottom);
  const availableWidth =
    document.body.clientWidth -
    parseFloat(styles.paddingLeft) -
    parseFloat(styles.paddingRight);

  const scale = Math.min(
    1,
    availableHeight / card.offsetHeight,
    availableWidth / card.offsetWidth
  );

  card.style.transform = scale < 1 ? `scale(${scale})` : "none";
}

window.addEventListener("resize", fitAuthCard);
window.addEventListener("load", fitAuthCard);
document.fonts && document.fonts.ready.then(fitAuthCard);
fitAuthCard();

/* ---------- Theme toggle ---------- */
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  themeToggle.innerHTML = theme === "light"
    ? '<i class="fa-solid fa-moon"></i>'
    : '<i class="fa-solid fa-sun"></i>';

  themeToggle.title = theme === "light" ? "Switch to dark theme" : "Switch to light theme";
  localStorage.setItem("culinary-theme", theme);
}

applyTheme(localStorage.getItem("culinary-theme") || "dark");

themeToggle.addEventListener("click", () => {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  applyTheme(isLight ? "dark" : "light");
});

/* ---------- Direction toggle ---------- */
const directionToggle = document.getElementById("directionToggle");

function applyDirection(direction) {
  document.documentElement.dir = direction;
  directionToggle.title = direction === "ltr" ? "Switch to RTL" : "Switch to LTR";
  localStorage.setItem("culinary-direction", direction);
}

applyDirection(localStorage.getItem("culinary-direction") || "ltr");

directionToggle.addEventListener("click", () => {
  const current = document.documentElement.dir || "ltr";
  applyDirection(current === "ltr" ? "rtl" : "ltr");
});

/* ---------- Social sign-in (does not fake authentication) ---------- */
const SAVOR_SAGE_AUTH_CONFIG = window.SAVOR_SAGE_AUTH_CONFIG || {
  googleAuthEndpoint: "",
  googleClientId: "",
  appleAuthEndpoint: "",
  appleClientId: ""
};

const socialStatus = document.getElementById("socialAuthStatus");

document.querySelectorAll(".social-auth-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const provider = button.dataset.socialProvider;
    const cfg = SAVOR_SAGE_AUTH_CONFIG;

    if (provider === "google" && cfg.googleAuthEndpoint && cfg.googleClientId) {
      const params = new URLSearchParams({
        client_id: cfg.googleClientId,
        redirect_uri: window.location.origin + "/dashboard.html",
        response_type: "code",
        scope: "openid email profile"
      });
      window.location.href = `${cfg.googleAuthEndpoint}?${params.toString()}`;
      return;
    }

    if (provider === "apple" && cfg.appleAuthEndpoint && cfg.appleClientId) {
      const params = new URLSearchParams({
        client_id: cfg.appleClientId,
        redirect_uri: window.location.origin + "/dashboard.html",
        response_type: "code",
        scope: "name email",
        response_mode: "form_post"
      });
      window.location.href = `${cfg.appleAuthEndpoint}?${params.toString()}`;
      return;
    }

    if (socialStatus) {
      socialStatus.textContent = provider === "google"
        ? "Google Sign-In is not configured yet."
        : "Apple Sign-In is not configured yet.";
      fitAuthCard();
    }
  });
});
