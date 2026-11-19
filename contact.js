/* Contact page
   Theme, direction, navigation and the footer year are handled by the shared
   index.js (single global implementation). */

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const contactFormStatus = document.getElementById("contactFormStatus");

  if (contactForm && contactFormStatus) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("contactName")?.value.trim();
      const email = document.getElementById("contactEmail")?.value.trim();
      const subject = document.getElementById("contactSubject")?.value;
      const message = document.getElementById("contactMessage")?.value.trim();

      if (!name || !email || !subject || !message) {
        contactFormStatus.textContent = "Please complete all required fields.";
        return;
      }

      contactFormStatus.textContent =
        "Thank you, " + name + "! Your enquiry has been received by Savor & Sage.";
      contactForm.reset();
    });
  }
});
