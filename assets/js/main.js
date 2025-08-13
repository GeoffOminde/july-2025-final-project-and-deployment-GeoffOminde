// assets/js/main.js
// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("navlinks");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

// Basic contact form UX (no backend; feel free to wire to a service)
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      if (statusEl) statusEl.textContent = "Please fill in all required fields.";
      return;
    }
    // Open mail client as a fallback submission method
    const subject = encodeURIComponent(`Website inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:geoffominde8@gmail.com?subject=${subject}&body=${body}`;
    if (statusEl) statusEl.textContent = "Opening your email app...";
  });
}

// Mark active link based on current page
const current = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach(a => {
  if (a.getAttribute("href") === current) a.classList.add("active");
});
