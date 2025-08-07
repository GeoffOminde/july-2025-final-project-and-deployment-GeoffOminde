/* ============================== */
/* 🌊 Dev Pulse JavaScript Magic */
/* ============================== */

// 🌟 Scroll-to-Top Button
const scrollBtn = document.createElement('button');
scrollBtn.textContent = '↑ Top';
scrollBtn.classList.add('scroll-top');
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ✅ Contact Form Validation
document.querySelector('form')?.addEventListener('submit', function (e) {
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const message = document.querySelector('#message');

  if (!name.value || !email.value || !message.value) {
    e.preventDefault();
    alert('Please fill in all fields before submitting.');
  }
});

// 🌀 Reveal Animations on Scroll
const revealElements = document.querySelectorAll('.project-card, .skills-list li');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

revealElements.forEach(el => observer.observe(el));