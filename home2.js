
 // Savor & Sage — Home 2

document.addEventListener("DOMContentLoaded", () => {
  // Footer copyright year
  const footerYear = document.getElementById("footerYear");

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // Premium section reveal animations
  const revealItems = document.querySelectorAll(
    ".premium-intro, .premium-class-card, .premium-chef-card, " +
    ".premium-workshop-content, .premium-gallery-grid figure, " +
    ".premium-booking-banner"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("premium-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => {
      item.classList.add("premium-reveal");
      observer.observe(item);
    });
  }

  // Student Login popup
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
    loginOverlay.addEventListener("click", event => {
      if (event.target === loginOverlay) {
        closeStudentLogin();
      }
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeStudentLogin();
    }
  });

  // Student login form
  if (loginForm) {
    loginForm.addEventListener("submit", event => {
      event.preventDefault();

      const name = document.getElementById("studentName")?.value.trim();
      const email = document.getElementById("studentEmail")?.value.trim();
      const password = document.getElementById("studentPassword")?.value;
      const message = document.getElementById("loginMessage");

      if (!name || !email || !password) {
        if (message) {
          message.textContent = "Please fill in all fields.";
        }
        return;
      }

      // Demo login only; no real password verification
      localStorage.setItem("studentLoggedIn", "true");
      localStorage.setItem("studentName", name);
      localStorage.setItem("studentEmail", email);

      window.location.href = "dashboard.html";
    });
  }
});
