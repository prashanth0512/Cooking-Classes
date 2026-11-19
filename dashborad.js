const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.style.display = 'block';
  setTimeout(() => toast.style.display = 'none', 2500);
}

/* Load saved student details */
function loadProfile() {
  const name = localStorage.getItem('studentName') || 'Student';
  $('#welcomeName').textContent = name;
  $('#topName').textContent = name;
  $('#avatarLetter').textContent = name.charAt(0).toUpperCase();
  $('#profileName').value = name;
  $('#profileEmail').value = localStorage.getItem('studentEmail') || '';
  $('#profilePhone').value = localStorage.getItem('studentPhone') || '';
  $('#profileCuisine').value = localStorage.getItem('studentCuisine') || '';
}
loadProfile();

/* Dashboard navigation */
const pageInfo = {
  dashboardPage:['My Dashboard','Your cooking journey, all in one place.'],
  bookingsPage:['My Bookings','Manage your cooking class reservations.'],
  sessionsPage:['Upcoming Sessions','Get ready for your next kitchen experience.'],
  recipesPage:['My Recipes','Your collection of recipes learned in class.'],
  paymentsPage:['Payments','Review your payment summary.'],
  profilePage:['My Profile','Manage your student details.']
};

function openPage(id) {
  if (!pageInfo[id]) return;

  $$('.section-page').forEach(page => {
    page.classList.toggle('active', page.id === id);
  });

  $$('.nav-link[data-page]').forEach(link => {
    link.classList.toggle('active', link.dataset.page === id);
  });

  $('#pageTitle').textContent = pageInfo[id][0];
  $('#pageSubtitle').textContent = pageInfo[id][1];
  $('#sidebar').classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
}

$$('[data-page]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    openPage(link.dataset.page);
  });
});

$$('[data-goto]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    openPage(link.dataset.goto);
  });
});

/* Mobile menu */
$('#menuToggle').addEventListener('click', () => {
  $('#sidebar').classList.toggle('open');
});

/* Dark / Light theme */
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;

  const icon = $('#themeToggle i');
  if (icon) {
    icon.className = theme === 'dark'
      ? 'fa-solid fa-sun'
      : 'fa-solid fa-moon';
  }

  localStorage.setItem('culinary-theme', theme);
}

applyTheme(localStorage.getItem('culinary-theme') || 'dark');

$('#themeToggle').addEventListener('click', () => {
  const current = document.documentElement.dataset.theme;
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* LTR / RTL direction */
const directionToggle = $('#directionToggle');

function applyDirection(direction) {
  document.documentElement.setAttribute('dir', direction);

  if (directionToggle) {
    directionToggle.title = direction === 'ltr' ? 'Switch to RTL' : 'Switch to LTR';
    directionToggle.setAttribute(
      'aria-label',
      direction === 'ltr' ? 'Switch to RTL' : 'Switch to LTR'
    );
  }

  localStorage.setItem('culinary-direction', direction);
}

applyDirection(localStorage.getItem('culinary-direction') || 'ltr');

directionToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('dir') || 'ltr';
  applyDirection(current === 'ltr' ? 'rtl' : 'ltr');
  showToast(current === 'ltr' ? 'RTL layout enabled' : 'LTR layout enabled');
});

/* Notifications dropdown */
const notificationToggle = $('#notificationToggle');
const notificationPanel = $('#notificationPanel');

notificationToggle.addEventListener('click', event => {
  event.stopPropagation();
  notificationPanel.hidden = !notificationPanel.hidden;
  notificationToggle.setAttribute('aria-expanded', String(!notificationPanel.hidden));
});

notificationPanel.addEventListener('click', event => {
  event.stopPropagation();
});

document.addEventListener('click', () => {
  notificationPanel.hidden = true;
  notificationToggle.setAttribute('aria-expanded', 'false');
});

/* Clear notifications */
$('#clearNotifications').addEventListener('click', () => {
  $$('.notification-item').forEach(item => item.remove());

  $('.notification-dot').hidden = true;
  $('#notificationEmpty').hidden = false;

  showToast('Notifications cleared');
});

/* Save profile */
$('#profileForm').addEventListener('submit', event => {
  event.preventDefault();

  const name = $('#profileName').value.trim();
  localStorage.setItem('studentName', name);
  localStorage.setItem('studentEmail', $('#profileEmail').value.trim());
  localStorage.setItem('studentPhone', $('#profilePhone').value.trim());
  localStorage.setItem('studentCuisine', $('#profileCuisine').value.trim());

  $('#welcomeName').textContent = name || 'Student';
  $('#topName').textContent = name || 'Student';
  $('#avatarLetter').textContent = (name || 'S').charAt(0).toUpperCase();

  showToast('Profile saved successfully!');
});

/* Logout — registered only once */
$('#logoutBtn').addEventListener('click', () => {
  if (!confirm('Are you sure you want to log out?')) return;

  [
    'studentLoggedIn',
    'studentName',
    'studentEmail',
    'studentPhone',
    'studentCuisine'
  ].forEach(key => localStorage.removeItem(key));

  window.location.href = 'index.html';
});

document.addEventListener("DOMContentLoaded", () => {
  const profileToggle = document.getElementById("profileMenuToggle");
  const profileDropdown = document.getElementById("profileDropdown");

  // Read the student's saved name, if available.
  function getSavedStudentName() {
    const keys = ["culinaryProfile", "culinaryStudent"];

    for (const storage of [sessionStorage, localStorage]) {
      for (const key of keys) {
        const raw = storage.getItem(key);
        if (!raw) continue;

        try {
          const data = JSON.parse(raw);

          if (typeof data === "string" && data.trim()) {
            return data.trim();
          }

          if (data && typeof data === "object") {
            const name =
              data.fullName || data.studentName || data.name;

            if (typeof name === "string" && name.trim()) {
              return name.trim();
            }
          }
        } catch {
          if (!raw.includes("{") && !raw.includes("[") && raw.trim()) {
            return raw.trim();
          }
        }
      }
    }

    return "";
  }

  const studentName = getSavedStudentName();

  if (studentName) {
    const topName = document.getElementById("topName");
    const avatar = document.getElementById("avatarLetter");
    const welcomeName = document.getElementById("dashboardWelcomeName");

    if (topName) topName.textContent = studentName;
    if (avatar) avatar.textContent = studentName.charAt(0).toUpperCase();
    if (welcomeName) welcomeName.textContent = studentName;
  }

  // Open and close the profile popup.
  if (profileToggle && profileDropdown) {
    profileToggle.addEventListener("click", () => {
      const isOpening = profileDropdown.hidden;
      profileDropdown.hidden = !isOpening;
      profileToggle.setAttribute("aria-expanded", String(isOpening));
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".profile-menu-wrap")) {
        profileDropdown.hidden = true;
        profileToggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        profileDropdown.hidden = true;
        profileToggle.setAttribute("aria-expanded", "false");
      }
    });

    profileDropdown.querySelectorAll("[data-profile-page]").forEach((button) => {
      button.addEventListener("click", () => {
        const pageId = button.dataset.profilePage;
        const existingNavLink = document.querySelector(
          `.nav-link[data-page="${pageId}"]`
        );

        if (existingNavLink) existingNavLink.click();

        profileDropdown.hidden = true;
        profileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
});
