document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Logic
  const hamburger = document.querySelector('.hamburger');
  const offcanvas = document.querySelector('.offcanvas');
  const offcanvasClose = document.querySelector('.offcanvas-close');
  const overlay = document.querySelector('.overlay');

  if(hamburger && offcanvas && overlay) {
    hamburger.addEventListener('click', () => {
      offcanvas.classList.add('open');
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
      offcanvas.classList.remove('open');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    };

    if(offcanvasClose) {
      offcanvasClose.addEventListener('click', closeMenu);
    }
    overlay.addEventListener('click', closeMenu);
  }

  // Theme Toggle Logic
  const themeToggles = document.querySelectorAll('.theme-toggle');
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
  });
  
  // Check local storage for theme
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  // RTL Toggle Logic
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const dir = document.documentElement.getAttribute('dir');
      if(dir === 'rtl') {
        document.documentElement.removeAttribute('dir');
        localStorage.setItem('dir', 'ltr');
      } else {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('dir', 'rtl');
      }
    });
  });

  // Check local storage for RTL preference
  const savedDir = localStorage.getItem('dir');
  if(savedDir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
  }

  // Dynamic Nav Active State
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.classList.remove('active'); // clear any hardcoded active classes
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });
  
  // Highlight parent Home link if a dropdown child is active
  const activeDropdownChild = document.querySelector('.nav-dropdown-content a.active');
  if (activeDropdownChild) {
      const parentLink = activeDropdownChild.closest('.nav-dropdown').querySelector('a');
      if (parentLink) parentLink.classList.add('active');
  }

  // Mobile offcanvas active state — highlight current page link
  const mobileLinks = document.querySelectorAll('.offcanvas-links a');
  mobileLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.style.color = 'var(--accent-color)';
      link.style.fontWeight = '600';
    }
  });

  // Back to Top Button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Challenge Card — tap to expand on mobile (click shows sub-text; hover still works on desktop)
  const challengeCards = document.querySelectorAll('.challenge-card');
  if (challengeCards.length) {
    challengeCards.forEach(card => {
      card.addEventListener('click', () => {
        // Only activate tap-toggle on mobile widths
        if (window.innerWidth <= 768) {
          const isActive = card.classList.contains('active');
          // Close all other open cards first
          challengeCards.forEach(c => c.classList.remove('active'));
          // Toggle this card
          if (!isActive) card.classList.add('active');
        }
      });
    });
  }

});
