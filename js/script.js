// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

  // =================================================================
  // == GLOBAL VARIABLES & ELEMENT SELECTORS
  // =================================================================
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');


  // =================================================================
  // == SINGLE-PAGE APPLICATION (SPA) ROUTING
  // =================================================================

  /**
   * Shows a specific page by ID and updates navigation links.
   * @param {string} pageId The ID of the page element to display.
   */
  function showPage(pageId) {
    // Update the URL hash for deep linking and browser history
    window.location.hash = pageId;

    // Hide all pages, then show the target page
    pages.forEach(page => {
      page.classList.toggle('active', page.id === pageId);
    });

    // Update the 'active' class on navigation links
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageId);
    });
    
    // Close the mobile menu if it's open after navigation
    if (siteNav?.classList.contains('open')) {
        siteNav.classList.remove('open');
        menuToggle?.setAttribute('aria-expanded', 'false');
    }
  }
  
  /**
   * Handles page navigation based on the current URL hash.
   * Falls back to the 'home' page if the hash is invalid or empty.
   */
  function handleNavigation() {
    const pageId = window.location.hash.substring(1) || 'home';
    const targetPage = document.getElementById(pageId);
    if(targetPage) {
        showPage(pageId);
    } else {
        // Fallback to home page if the hash doesn't match any page ID
        showPage('home');
    }
  }

  // Add click event listeners to all navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default anchor link behavior
      const pageId = e.target.dataset.page;
      if (pageId) {
        showPage(pageId);
      }
    });
  });

  // Listen for hash changes (e.g., browser back/forward buttons)
  window.addEventListener('hashchange', handleNavigation);
  
  // Handle the initial page load
  handleNavigation();


  // =================================================================
  // == RESPONSIVE HAMBURGER MENU
  // =================================================================
  if (menuToggle && siteNav) {
      menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        // Toggle ARIA attribute for accessibility
        menuToggle.setAttribute('aria-expanded', String(!isExpanded));
        // Toggle class to show/hide the navigation menu
        siteNav.classList.toggle('open');
      });
  }


  // =================================================================
  // == HOME PAGE IMAGE SLIDER
  // =================================================================
  const slider = document.querySelector('.slider');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  
  // Array of image URLs for the slider
  const images = [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2231&auto=format&fit=crop'
  ];
  let currentIndex = 0;

  /**
   * Creates and injects the slide elements into the DOM.
   */
  function createSlides() {
      if (!slider) return;
      slider.innerHTML = ''; // Clear existing slides
      images.forEach(imgUrl => {
          const slide = document.createElement('div');
          slide.className = 'slide';
          slide.style.backgroundImage = `url(${imgUrl})`;
          slider.appendChild(slide);
      });
  }

  /**
   * Updates the slider's position to show the current slide.
   */
  function updateSlider() {
      if (!slider) return;
      // Use CSS transform for smooth transitions
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  /**
   * Moves to the next slide in the sequence.
   */
  function nextSlide() {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlider();
  }

  /**
   * Moves to the previous slide in the sequence.
   */
  function prevSlide() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateSlider();
  }

  // Initialize the slider if all elements are present
  if(slider && prevBtn && nextBtn) {
    createSlides();
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    // Set an interval for auto-sliding
    setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
  }


  // =================================================================
  // == CONTACT FORM VALIDATION
  // =================================================================
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (form && formStatus) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent form from submitting the traditional way
      const isFormValid = validateForm();
      if (isFormValid) {
        // On successful validation
        formStatus.textContent = 'Thank you! Your message has been sent.';
        formStatus.style.color = 'var(--primary-color)';
        form.reset();
        // Clear all invalid states from fields
        form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
        setTimeout(() => { if (formStatus) formStatus.textContent = '' }, 5000);
      } else {
        // On failed validation
        formStatus.textContent = 'Please correct the errors above.';
        formStatus.style.color = 'var(--error-color)';
      }
    });
  }

  /**
   * Validates all fields in the contact form.
   * @returns {boolean} True if all fields are valid, otherwise false.
   */
  function validateForm() {
    // Validate each field and combine the results
    const isNameValid = validateField('name', 'Name is required.');
    const isEmailValid = validateField('email', 'A valid email is required.', (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    const isMessageValid = validateField('message', 'Message is required.');
    return isNameValid && isEmailValid && isMessageValid;
  }

  /**
   * Validates a single form field.
   * @param {string} id The ID of the input/textarea element.
   * @param {string} requiredMsg The error message to display if validation fails.
   * @param {function} validationFn A function that returns true if the field's value is valid.
   * @returns {boolean} True if the field is valid, otherwise false.
   */
  function validateField(id, requiredMsg, validationFn = (value) => value.trim() !== '') {
    const field = document.getElementById(id);
    if (!field) return false;
    
    const errorEl = field.nextElementSibling;
    const value = field.value;

    // Check for emptiness first
    if (value.trim() === '') {
        if (errorEl) {
            errorEl.textContent = requiredMsg.includes('required') ? requiredMsg : 'This field is required.';
        }
        field.classList.add('invalid');
        return false;
    } 
    // Then check against the specific validation function (e.g., regex for email)
    else if (!validationFn(value)) {
        if (errorEl) {
            errorEl.textContent = requiredMsg;
        }
        field.classList.add('invalid');
        return false;
    } 
    // If valid, clear error message and styling
    else {
        if (errorEl) {
            errorEl.textContent = '';
        }
        field.classList.remove('invalid');
        return true;
    }
  }


  // =================================================================
  // == LIGHTBOX IMAGE GALLERY
  // =================================================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevLightboxBtn = document.querySelector('.lightbox-prev');
  const nextLightboxBtn = document.querySelector('.lightbox-next');

  let currentImageIndex = 0;
  // Create an array from the NodeList of gallery items for easier manipulation
  const imagesArray = Array.from(galleryItems);

  /**
   * Opens the lightbox and displays the selected image.
   * @param {number} index The index of the clicked image in the imagesArray.
   */
  function openLightbox(index) {
      if (!lightbox || !lightboxImg) return;
      currentImageIndex = index;
      lightbox.style.display = 'block';
      lightboxImg.src = imagesArray[currentImageIndex].src;
      lightboxImg.alt = imagesArray[currentImageIndex].alt;
      // Prevent scrolling of the background content
      document.body.classList.add('lightbox-open');
  }

  /**
   * Closes the lightbox view.
   */
  function closeLightbox() {
      if (!lightbox) return;
      lightbox.style.display = 'none';
      // Re-enable scrolling of the background content
      document.body.classList.remove('lightbox-open');
  }

  /**
   * Displays the next image in the gallery.
   */
  function showNextImage() {
      currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
      if (lightboxImg) {
          lightboxImg.src = imagesArray[currentImageIndex].src;
          lightboxImg.alt = imagesArray[currentImageIndex].alt;
      }
  }
  
  /**
   * Displays the previous image in the gallery.
   */
  function showPrevImage() {
      currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
      if (lightboxImg) {
          lightboxImg.src = imagesArray[currentImageIndex].src;
          lightboxImg.alt = imagesArray[currentImageIndex].alt;
      }
  }

  // Initialize lightbox functionality if all elements exist
  if (galleryItems.length > 0 && lightbox && lightboxImg && closeBtn && prevLightboxBtn && nextLightboxBtn) {
      
      // Add click listener to each gallery item to open the lightbox
      imagesArray.forEach((item, index) => {
          item.addEventListener('click', () => {
              openLightbox(index);
          });
      });

      // Add listeners for closing and navigation
      closeBtn.addEventListener('click', closeLightbox);
      nextLightboxBtn.addEventListener('click', showNextImage);
      prevLightboxBtn.addEventListener('click', showPrevImage);
      
      // Close lightbox by clicking on the background overlay
      lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox) {
              closeLightbox();
          }
      });
      
      // Add keyboard navigation for accessibility
      document.addEventListener('keydown', (e) => {
         if (lightbox.style.display === 'block') {
             if (e.key === 'ArrowRight') showNextImage();
             if (e.key === 'ArrowLeft') showPrevImage();
             if (e.key === 'Escape') closeLightbox();
         }
      });
  }
});