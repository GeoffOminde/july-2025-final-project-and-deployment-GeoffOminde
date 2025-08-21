// Set current year in footer
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Set active nav link based on current filename
  const path = location.pathname.split('/').pop() || 'index.html';
  const map = {
    'index.html':'home',
    'about.html':'about',
    'services.html':'services',
    'portfolio.html':'portfolio',
    'blog.html':'blog',
    'contact.html':'contact'
  };
  const key = map[path];
  if (key) {
    const active = document.querySelector(`[data-nav="${key}"]`);
    if (active) {
      // Accessibility: mark current page
      active.classList.add('active');
      active.setAttribute('aria-current','page');
    }
  }

  // Contact form client-side validation demo (no backend)
  const form = document.getElementById('contact-form');
  if (form) {
    const status = document.getElementById('form-status');
    const validators = {
      name: v => v.trim().length >= 2 || 'Please enter your full name.',
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email.',
      message: v => v.trim().length >= 10 || 'Message should be at least 10 characters.'
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      ['name','email','message'].forEach(id => {
        const input = form.querySelector('#'+id);
        const error = input.nextElementSibling;
        const res = validators[id](input.value);
        if (res !== true) { ok = false; error.textContent = res; }
        else { error.textContent = ''; }
      });

      if (!ok) {
        status.textContent = 'Please fix the highlighted fields.';
        status.style.color = '#ff6b6b';
        return;
      }

      // Demo success state
      status.textContent = 'Thanks! Your message has been queued.';
      status.style.color = '#7ef0c5';
      form.reset();
    });
  }
});
