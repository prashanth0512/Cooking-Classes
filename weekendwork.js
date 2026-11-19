
document.addEventListener("DOMContentLoaded", () => {
  // Update copyright year
  const footerYear = document.getElementById("footerYear");

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // Smooth scrolling
  document.querySelectorAll('.workshops-page a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Student Login Popup
  const openLoginButton = document.getElementById("openLogin");
  const loginOverlay = document.getElementById("loginOverlay");
  const closeLoginButton = document.getElementById("closeLogin");
  const loginForm = document.getElementById("loginForm");

  if (openLoginButton && loginOverlay) {
    openLoginButton.addEventListener("click", (event) => {
      event.preventDefault();
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
      window.location.href = "dashboard.html";
    });
  }
});
