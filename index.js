document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;

  const themeToggle = document.getElementById("themeToggle");
  const directionToggle = document.getElementById("directionToggle");
  const directionLabel = document.getElementById("directionLabel");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const homeDropdown = document.getElementById("homeDropdown");
  const footerYear = document.getElementById("footerYear");

  // Footer year
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // Restore saved theme
  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem("culinary-theme") || "dark";
  } catch (error) {
    savedTheme = "dark";
  }

  function applyTheme(theme) {
    html.dataset.theme = theme;

    if (themeToggle) {
      themeToggle.innerHTML =
        theme === "dark"
          ? '<i class="fa-solid fa-sun"></i>'
          : '<i class="fa-solid fa-moon"></i>';

      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );

      themeToggle.title =
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
    }

    try {
      localStorage.setItem("culinary-theme", theme);
    } catch (error) {
      // Theme still works for the current page if storage is unavailable.
    }
  }

  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme =
        html.dataset.theme === "dark" ? "light" : "dark";

      applyTheme(nextTheme);
    });
  }

  // Restore text direction
  let savedDirection = "ltr";

  try {
    savedDirection = localStorage.getItem("culinary-direction") || "ltr";
  } catch (error) {
    savedDirection = "ltr";
  }

  function applyDirection(direction) {
    html.dir = direction;

    if (directionLabel) {
      directionLabel.textContent = direction.toUpperCase();
    }

    if (directionToggle) {
      directionToggle.setAttribute(
        "aria-label",
        direction === "ltr"
          ? "Switch to right-to-left layout"
          : "Switch to left-to-right layout"
      );
    }

    try {
      localStorage.setItem("culinary-direction", direction);
    } catch (error) {
      // Direction still works for the current page.
    }
  }

  applyDirection(savedDirection);

  if (directionToggle) {
    directionToggle.addEventListener("click", () => {
      const nextDirection = html.dir === "ltr" ? "rtl" : "ltr";
      applyDirection(nextDirection);
    });
  }

  // Mobile navigation
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("active");

      menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 1080) {
          mainNav.classList.remove("active");
          menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.setAttribute("aria-label", "Open navigation");
        }
      });
    });

    document.addEventListener("click", (event) => {
      if (
        window.innerWidth <= 1080 &&
        mainNav.classList.contains("active") &&
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        mainNav.classList.remove("active");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mainNav.classList.contains("active")) {
        mainNav.classList.remove("active");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.focus();
      }
    });
  }

  // Home 1 / Home 2 dropdown
  const dropdown = homeDropdown
    ? homeDropdown.closest(".nav-dropdown")
    : null;

  if (homeDropdown && dropdown) {
    homeDropdown.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = dropdown.classList.toggle("open");
      homeDropdown.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("open");
        homeDropdown.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        dropdown.classList.remove("open");
        homeDropdown.setAttribute("aria-expanded", "false");
        homeDropdown.focus();
      }
    });
  }
  // Student Login popup (scoped inside DOMContentLoaded to avoid global redeclaration)
  const openLoginButton = document.getElementById("openLogin");
  const loginOverlay = document.getElementById("loginOverlay");
  const closeLoginButton = document.getElementById("closeLogin");
  const loginForm = document.getElementById("loginForm");

  if (openLoginButton && loginOverlay) {
    openLoginButton.addEventListener("click", () => {
      loginOverlay.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  }

  function closeStudentLogin() {
    if (loginOverlay) {
      loginOverlay.classList.remove("show");
      document.body.style.overflow = "";
    }
  }

  if (closeLoginButton) {
    closeLoginButton.addEventListener("click", closeStudentLogin);
  }

  if (loginOverlay) {
    loginOverlay.addEventListener("click", (event) => {
      if (event.target === loginOverlay) {
        closeStudentLogin();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeStudentLogin();
    }
  });

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Demo only; real authentication needs a backend.
      window.location.href = "dashboard.html";
    });
  }
});