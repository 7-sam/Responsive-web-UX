/* ═══════════════════════════════════════════════════════════════
   ShopSmart — Case Study Interactions
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Screen Tab Navigation ─── */
  const tabs = document.querySelectorAll('.screen-tab');
  const screens = document.querySelectorAll('.mobile-screen');
  const screenLabel = document.getElementById('screenLabel');
  
  const screenMeta = {
    splash:   { number: '01', name: 'Splash Screen' },
    login:    { number: '02', name: 'Login Screen' },
    home:     { number: '03', name: 'Home Screen' },
    listing:  { number: '04', name: 'Product Listing' },
    details:  { number: '05', name: 'Product Details' },
    cart:     { number: '06', name: 'Cart Screen' },
    checkout: { number: '07', name: 'Checkout Screen' },
    success:  { number: '08', name: 'Order Success' },
    profile:  { number: '09', name: 'Profile Screen' },
    settings: { number: '10', name: 'Settings Screen' },
  };

  function switchScreen(screenId) {
    // Update tabs
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.screen === screenId);
    });

    // Switch screens with animation
    screens.forEach(screen => {
      if (screen.dataset.id === screenId) {
        screen.classList.add('active');
      } else {
        screen.classList.remove('active');
      }
    });

    // Update label
    const meta = screenMeta[screenId];
    if (meta && screenLabel) {
      screenLabel.querySelector('.screen-label__number').textContent = meta.number;
      screenLabel.querySelector('.screen-label__name').textContent = meta.name;
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchScreen(tab.dataset.screen);
    });
  });

  /* ─── Keyboard navigation ─── */
  const screenIds = Object.keys(screenMeta);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const currentTab = document.querySelector('.screen-tab.active');
      const currentId = currentTab ? currentTab.dataset.screen : 'splash';
      const currentIndex = screenIds.indexOf(currentId);
      let nextIndex;
      if (e.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % screenIds.length;
      } else {
        nextIndex = (currentIndex - 1 + screenIds.length) % screenIds.length;
      }
      switchScreen(screenIds[nextIndex]);
      // Scroll tabs into view
      const nextTab = document.querySelector(`[data-screen="${screenIds[nextIndex]}"]`);
      if (nextTab) nextTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  });

  /* ─── Scroll-based entrance animations ─── */
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe design system cards and flow steps
  document.querySelectorAll('.ds-card, .flow-step').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
    observer.observe(el);
  });

  /* ─── Smooth scroll for nav links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ─── Interactive UI elements in phone screens ─── */
  
  // Quantity selectors
  document.querySelectorAll('.qty-selector').forEach(selector => {
    const minusBtn = selector.querySelector('.qty-btn:first-child');
    const plusBtn = selector.querySelector('.qty-btn:last-child');
    const valEl = selector.querySelector('.qty-val');

    if (minusBtn && plusBtn && valEl) {
      minusBtn.addEventListener('click', () => {
        let val = parseInt(valEl.textContent);
        if (val > 1) valEl.textContent = val - 1;
      });
      plusBtn.addEventListener('click', () => {
        let val = parseInt(valEl.textContent);
        valEl.textContent = val + 1;
      });
    }
  });

  // Color dot selection
  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      dot.parentElement.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });

  // Thumbnail selection
  document.querySelectorAll('.thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumb.parentElement.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  // Category chips
  document.querySelectorAll('.category-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.parentElement.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // Sort chips
  document.querySelectorAll('.sort-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.parentElement.querySelectorAll('.sort-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // Toggle switch animation
  document.querySelectorAll('.toggle input').forEach(toggle => {
    toggle.addEventListener('change', () => {
      toggle.closest('.toggle').classList.toggle('checked');
    });
  });

  // Wishlist heart toggle
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const icon = btn.querySelector('.material-symbols-rounded');
      if (icon) {
        icon.textContent = icon.textContent === 'favorite' ? 'favorite_border' : 'favorite';
        btn.style.transform = 'scale(1.3)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
      }
    });
  });

  // Bottom nav items (within phone screens)
  document.querySelectorAll('.mobile-screen .bottom-nav__item').forEach(item => {
    item.addEventListener('click', () => {
      const nav = item.closest('.bottom-nav');
      nav.querySelectorAll('.bottom-nav__item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Address card selection
  document.querySelectorAll('.address-card').forEach(card => {
    card.addEventListener('click', () => {
      card.parentElement.querySelectorAll('.address-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  // Payment card selection
  document.querySelectorAll('.payment-card').forEach(card => {
    card.addEventListener('click', () => {
      card.parentElement.querySelectorAll('.payment-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  /* ─── Auto-play: cycle through screens every 5 seconds (pauses on interaction) ─── */
  let autoplayTimer = null;
  let autoplayPaused = false;

  function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      if (autoplayPaused) return;
      const currentTab = document.querySelector('.screen-tab.active');
      const currentId = currentTab ? currentTab.dataset.screen : 'splash';
      const currentIndex = screenIds.indexOf(currentId);
      const nextIndex = (currentIndex + 1) % screenIds.length;
      switchScreen(screenIds[nextIndex]);
    }, 6000);
  }

  // Pause autoplay on user interaction with tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      autoplayPaused = true;
      // Resume after 30 seconds of no interaction
      clearTimeout(window._resumeTimer);
      window._resumeTimer = setTimeout(() => { autoplayPaused = false; }, 30000);
    });
  });

  startAutoplay();

  /* ─── Nav backdrop on scroll ─── */
  const nav = document.querySelector('.hero__nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        nav.style.background = 'rgba(15,15,26,0.8)';
        nav.style.backdropFilter = 'blur(12px)';
        nav.style.borderRadius = '16px';
        nav.style.padding = '12px 24px';
        nav.style.margin = '8px auto';
        nav.style.position = 'sticky';
        nav.style.top = '8px';
        nav.style.zIndex = '100';
      } else {
        nav.style.background = '';
        nav.style.backdropFilter = '';
        nav.style.borderRadius = '';
        nav.style.padding = '24px 0';
        nav.style.margin = '';
        nav.style.position = '';
        nav.style.top = '';
      }
    });
  }

});
