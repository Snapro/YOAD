/* =============================================================
   YOAD Advertising & Digital Printing — main.js
   ============================================================= */

'use strict';

/* ---- 1. NAVBAR: scroll class + hamburger ---- */
(function () {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile');

  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Mark active nav link
  const links = document.querySelectorAll('.navbar__nav a');
  const path = window.location.pathname;
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && path.endsWith(href.replace('./', ''))) {
      link.classList.add('active');
    }
  });
})();

/* ---- 2. MODAL: quote request ---- */
(function () {
  const openBtns = document.querySelectorAll('[data-modal-open]');
  const closeBtn = document.querySelector('[data-modal-close]');
  const overlay = document.querySelector('.modal-overlay');
  const modal = document.querySelector('.modal');
  let previouslyFocused;

  function openModal() {
    previouslyFocused = document.activeElement;
    overlay.classList.add('open');
    overlay.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    const firstField = modal && modal.querySelector('input, select, textarea, button');
    if (firstField) setTimeout(() => firstField.focus(), 100);
  }

  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (previouslyFocused) previouslyFocused.focus();
  }

  if (overlay) {
    openBtns.forEach(btn => btn.addEventListener('click', openModal));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close on overlay click (not modal itself)
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
    });

    // Trap focus inside modal
    if (modal) {
      modal.addEventListener('keydown', e => {
        if (e.key !== 'Tab') return;
        const focusable = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { last.focus(); e.preventDefault(); }
        } else {
          if (document.activeElement === last) { first.focus(); e.preventDefault(); }
        }
      });
    }
  }
})();

/* ---- 3. SCROLL REVEAL (IntersectionObserver) ---- */
(function () {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();

/* ---- 4. FORM HANDLING ---- */
(function () {
  // Handle Netlify Forms with JS fallback
  const forms = document.querySelectorAll('[data-netlify-form]');
  forms.forEach(form => {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const successEl = form.nextElementSibling;

      // Honeypot check (JS-only extra layer)
      const honeypot = form.querySelector('[name="bot-field"]');
      if (honeypot && honeypot.value) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      try {
        const data = new FormData(form);
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(data).toString(),
        });

        if (response.ok) {
          form.style.display = 'none';
          if (successEl && successEl.classList.contains('form-success')) {
            successEl.style.display = 'block';
          }
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Try Again';
        }
        alert('Sorry, something went wrong. Please try emailing us directly at yoadprints@gmail.com');
      }
    });
  });
})();

/* ---- 5. COUNTER ANIMATION (hero stats) ---- */
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1500;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current) + (el.dataset.suffix || '');
        if (current >= target) clearInterval(timer);
      }, 16);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

/* ---- 6. ACTIVE SECTION HIGHLIGHT in nav ---- */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__nav a[href*="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href').includes(entry.target.id));
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();
