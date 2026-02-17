/* ============================================
   Master DMT - UAB Barcelona
   Main JavaScript
   ============================================ */

(function () {
  'use strict';

  // --- Navigation ---
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  // Check if this is the homepage (navbar starts transparent)
  var isHomepage = navbar && !navbar.classList.contains('scrolled');

  // Scroll handling for navbar
  function handleScroll() {
    if (!navbar) return;
    if (isHomepage) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Mobile nav toggle
  function toggleNav() {
    if (navLinks) navLinks.classList.toggle('open');
    if (navOverlay) navOverlay.classList.toggle('open');
    document.body.style.overflow = navLinks && navLinks.classList.contains('open') ? 'hidden' : '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleNav);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', toggleNav);
  }

  // Close mobile nav on link click
  if (navLinks) {
    navLinks.querySelectorAll('a:not(.lang-switch a)').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navLinks.classList.contains('open')) {
          toggleNav();
        }
      });
    });
  }

  // --- Back to Top ---
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Scroll Reveal Animations ---
  function revealOnScroll() {
    var reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    var windowHeight = window.innerHeight;

    reveals.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      if (top < windowHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);

  // --- Testimonial Slider ---
  var testimonials = document.querySelectorAll('.testimonial');
  var dots = document.querySelectorAll('.testimonial-dot');
  var currentTestimonial = 0;

  function showTestimonial(index) {
    testimonials.forEach(function (t) { t.classList.remove('active'); });
    dots.forEach(function (d) { d.classList.remove('active'); });

    if (testimonials[index]) testimonials[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    currentTestimonial = index;
  }

  if (dots.length > 0) {
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var index = parseInt(this.getAttribute('data-index'), 10);
        showTestimonial(index);
      });
    });

    // Auto-rotate testimonials
    setInterval(function () {
      var next = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(next);
    }, 6000);
  }

  // --- Accordion ---
  var accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      var item = this.parentElement;
      var body = item.querySelector('.accordion-body');
      var isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(function (ai) {
        ai.classList.remove('active');
        var ab = ai.querySelector('.accordion-body');
        if (ab) ab.style.maxHeight = null;
      });

      // Open clicked if it wasn't active
      if (!isActive) {
        item.classList.add('active');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // --- Programme Tabs ---
  var programTabs = document.querySelectorAll('.program-tab');
  var programContents = document.querySelectorAll('.program-content');

  programTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = this.getAttribute('data-tab');

      programTabs.forEach(function (t) { t.classList.remove('active'); });
      programContents.forEach(function (c) { c.classList.remove('active'); });

      this.classList.add('active');
      var targetContent = document.getElementById(target);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // --- Contact Form ---
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = this.querySelector('button[type="submit"]');
      var originalText = btn.innerHTML;
      var lang = document.documentElement.lang || 'es';
      var successMsg = {
        es: '\u00a1Mensaje Enviado! \u2713',
        en: 'Message Sent! \u2713',
        ca: 'Missatge Enviat! \u2713'
      };
      btn.textContent = successMsg[lang] || successMsg.es;
      btn.style.background = 'var(--color-primary-dark)';
      setTimeout(function () {
        btn.innerHTML = originalText;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
