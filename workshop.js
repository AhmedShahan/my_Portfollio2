// ===== WORKSHOP JS =====

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. SCROLL ANIMATION (Intersection Observer)
  const scrollElems = document.querySelectorAll('.scroll-anim');

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // Optional: unobserve if you only want it to animate once
        // scrollObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  });

  scrollElems.forEach(el => scrollObserver.observe(el));

  // 2. COUNTER ANIMATION
  function animateCounter(el, target, duration = 1600) {
    // Skip animation for the "2023" stat — it's a year, not a count
    if (target === 2023) {
      el.textContent = '2023';
      return;
    }

    let start = 0;
    const step = target / (duration / 16); // ~60fps

    const tick = () => {
      start = Math.min(start + step, target);
      el.textContent = Math.floor(start);
      if (start < target) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(tick);
  }

  // Trigger counters when stats row enters view
  const statsRow = document.querySelector('.ws-stats-row');
  const statNums = document.querySelectorAll('.ws-stat-num');
  let countersRun = false;

  if (statsRow) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersRun) {
          countersRun = true;
          statNums.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            if (!isNaN(target)) {
              animateCounter(el, target);
            }
          });
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterObserver.observe(statsRow);
  }

  // 3. MOBILE MENU (already in home.js, but adding here for standalone workshop.html compatibility)
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
      }
    });
  }

});
