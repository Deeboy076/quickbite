/* Quickbite — Shared interactions */

(function () {
  const header = document.querySelector('header');
  const hamburger = document.getElementById('hamburger');
  const sidePanel = document.getElementById('side-panel');
  const overlay = document.getElementById('overlay');

  /* Header scroll effect */
  function onScroll() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile navigation */
  if (hamburger && sidePanel && overlay) {
    const links = sidePanel.querySelectorAll('a');

    function setMenu(open) {
      sidePanel.classList.toggle('active', open);
      overlay.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', String(open));
      hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      hamburger.textContent = open ? '×' : '☰';
      document.body.style.overflow = open ? 'hidden' : '';
    }

    hamburger.addEventListener('click', () => {
      setMenu(!sidePanel.classList.contains('active'));
    });

    overlay.addEventListener('click', () => setMenu(false));

    links.forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenu(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) setMenu(false);
    });
  }

  /* Improve media loading without affecting the hero */
  document.querySelectorAll('img').forEach((image) => {
    if (!image.hasAttribute('loading')) image.setAttribute('loading', 'lazy');
  });

  /* Scroll reveal animations */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* Active nav link highlighting */
  const navLinks = document.querySelectorAll('header .nav-link[href^="#"]');
  if (navLinks.length) {
    const sections = Array.from(navLinks)
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    if (sections.length) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
              });
            }
          });
        },
        { rootMargin: '-45% 0px -50% 0px' }
      );

      sections.forEach((section) => sectionObserver.observe(section));
    }
  }
})();
