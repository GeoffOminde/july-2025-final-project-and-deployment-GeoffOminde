document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  // --- SPA Routing ---
  function showPage(pageId) {
    // Update URL hash
    window.location.hash = pageId;

    // Toggle active class on pages
    pages.forEach(page => {
      page.classList.toggle('active', page.id === pageId);
    });

    // Toggle active class on nav links
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageId);
    });
    
    // Close mobile menu if open
    if (siteNav?.classList.contains('open')) {
        siteNav.classList.remove('open');
        menuToggle?.setAttribute('aria-expanded', 'false');
    }
  }
  
  function handleNavigation() {
    const pageId = window.location.hash.substring(1) || 'home';
    const targetPage = document.getElementById(pageId);
    if(targetPage) {
        showPage(pageId);
    } else {
        // Fallback to home if hash is invalid
        showPage('home');
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = e.target.dataset.page;
      if (pageId) {
        showPage(pageId);
      }
    });
  });

  // Handle back/forward browser buttons
  window.addEventListener('hashchange', handleNavigation);
  
  // Handle initial page load
  handleNavigation();


  // --- Hamburger Menu ---
  if (menuToggle && siteNav) {
      menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!isExpanded));
        siteNav.classList.toggle('open');
      });
  }


  // --- Image Slider ---
  const slider = document.querySelector('.slider');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  
  const images = [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2231&auto=format&fit=crop'
  ];
  let currentIndex = 0;

  function createSlides() {
      if (!slider) return;
      slider.innerHTML = '';
      images.forEach(imgUrl => {
          const slide = document.createElement('div');
          slide.className = 'slide';
          slide.style.backgroundImage = `url(${imgUrl})`;
          slider.appendChild(slide);
      });
  }

  function updateSlider() {
      if (!slider) return;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function nextSlide() {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlider();
  }

  function prevSlide() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateSlider();
  }

  if(slider && prevBtn && nextBtn) {
    createSlides();
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
  }

  // --- Contact Form Validation ---
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (form && formStatus) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm()) {
        formStatus.textContent = 'Thank you! Your message has been sent.';
        formStatus.style.color = 'var(--primary-color)';
        form.reset();
        // Clear all invalid states
        form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
        setTimeout(() => { if (formStatus) formStatus.textContent = '' }, 5000);
      } else {
        formStatus.textContent = 'Please correct the errors above.';
        formStatus.style.color = 'var(--error-color)';
      }
    });
  }

  function validateForm() {
    const isNameValid = validateField('name', 'Name is required.');
    const isEmailValid = validateField('email', 'A valid email is required.', (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    const isMessageValid = validateField('message', 'Message is required.');
    return isNameValid && isEmailValid && isMessageValid;
  }

  function validateField(id, requiredMsg, validationFn = (value) => value.trim() !== '') {
    const field = document.getElementById(id);
    if (!field) {
        return false;
    }
    const errorEl = field.nextElementSibling;
    const value = field.value;

    if (value.trim() === '') {
        if (errorEl) {
            errorEl.textContent = requiredMsg.includes('required') ? requiredMsg : 'This field is required.';
        }
        field.classList.add('invalid');
        return false;
    } else if (!validationFn(value)) {
        if (errorEl) {
            errorEl.textContent = requiredMsg;
        }
        field.classList.add('invalid');
        return false;
    } else {
        if (errorEl) {
            errorEl.textContent = '';
        }
        field.classList.remove('invalid');
        return true;
    }
  }

  // --- Lightbox Gallery ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevLightboxBtn = document.querySelector('.lightbox-prev');
  const nextLightboxBtn = document.querySelector('.lightbox-next');

  let currentImageIndex = 0;
  const imagesArray = Array.from(galleryItems);

  function openLightbox(index) {
      if (!lightbox || !lightboxImg) return;
      currentImageIndex = index;
      lightbox.style.display = 'block';
      lightboxImg.src = imagesArray[currentImageIndex].src;
      lightboxImg.alt = imagesArray[currentImageIndex].alt;
      document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
      if (!lightbox) return;
      lightbox.style.display = 'none';
      document.body.classList.remove('lightbox-open');
  }

  function showNextImage() {
      currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
      if (lightboxImg) {
          lightboxImg.src = imagesArray[currentImageIndex].src;
          lightboxImg.alt = imagesArray[currentImageIndex].alt;
      }
  }
  
  function showPrevImage() {
      currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
      if (lightboxImg) {
          lightboxImg.src = imagesArray[currentImageIndex].src;
          lightboxImg.alt = imagesArray[currentImageIndex].alt;
      }
  }

  if (galleryItems.length > 0 && lightbox && lightboxImg && closeBtn && prevLightboxBtn && nextLightboxBtn) {
      imagesArray.forEach((item, index) => {
          item.addEventListener('click', () => {
              openLightbox(index);
          });
      });

      closeBtn.addEventListener('click', closeLightbox);
      
      lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox) {
              closeLightbox();
          }
      });

      nextLightboxBtn.addEventListener('click', showNextImage);
      prevLightboxBtn.addEventListener('click', showPrevImage);
      
      document.addEventListener('keydown', (e) => {
         if (lightbox.style.display === 'block') {
             if (e.key === 'ArrowRight') {
                 showNextImage();
             } else if (e.key === 'ArrowLeft') {
                 showPrevImage();
             } else if (e.key === 'Escape') {
                 closeLightbox();
             }
         }
      });
  }
});