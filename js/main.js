// Simple feedback display for contact form
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('feedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      feedback.textContent = "🌊 Thanks for reaching out! I'll ride the wave back to you soon.";
      feedback.style.color = "#0072ff";
      form.reset();
    });
  }

  // Basic scroll reveal animation (fade-in)
  const revealElements = document.querySelectorAll('.skills li, .card');

  const revealOnScroll = () => {
    const windowBottom = window.scrollY + window.innerHeight;
    revealElements.forEach(el => {
      const elTop = el.offsetTop;
      if (windowBottom > elTop + 50) {
        el.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
});