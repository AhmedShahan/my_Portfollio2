// ===== WORKSHOP JS V3 =====

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. SCROLL ANIMATION
  const scrollElems = document.querySelectorAll('.scroll-anim');
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });
  scrollElems.forEach(el => scrollObserver.observe(el));

  // 2. COUNTER ANIMATION
  function animateCounter(el, target, duration = 1600) {
    if (target === 2023) { el.textContent = '2023'; return; }
    let start = 0;
    const step = target / (duration / 16);
    const tick = () => {
      start = Math.min(start + step, target);
      el.textContent = Math.floor(start);
      if (start < target) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  }

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
            if (!isNaN(target)) animateCounter(el, target);
          });
        }
      });
    }, { threshold: 0.5 });
    counterObserver.observe(statsRow);
  }

  // 3. CATEGORY FILTERING
  const filterBtns = document.querySelectorAll('.ws-filter-btn');
  const cards = document.querySelectorAll('.ws-card, .ws-leader-card');
  const wsFilterIndicator = document.getElementById('wsFilterIndicator');
  let filterInterval;
  let currentFilterIdx = 0;
  let inactivityTimeout;

  function updateFilterIndicator() {
    const activeBtn = document.querySelector('.ws-filter-btn.active');
    if (activeBtn && wsFilterIndicator) {
      const rect = activeBtn.getBoundingClientRect();
      const parentRect = activeBtn.parentElement.getBoundingClientRect();
      wsFilterIndicator.style.width = `${rect.width}px`;
      wsFilterIndicator.style.left = `${rect.left - parentRect.left}px`;
    }
  }

  function setActiveFilter(index) {
    const btn = filterBtns[index];
    if (!btn) return;

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateFilterIndicator();

    const filter = btn.getAttribute('data-filter');
    const leadershipSection = document.querySelector('.ws-leadership-section');

    cards.forEach(card => {
      const cat = card.getAttribute('data-cat');
      if (filter === 'all' || cat === filter) {
        card.style.display = 'flex';
        setTimeout(() => card.style.opacity = '1', 10);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });

    // Show leadership section only for 'all' or 'conference'
    if (leadershipSection) {
      if (filter === 'all' || filter === 'conference') {
        leadershipSection.style.display = 'block';
        setTimeout(() => leadershipSection.style.opacity = '1', 10);
      } else {
        leadershipSection.style.opacity = '0';
        setTimeout(() => leadershipSection.style.display = 'none', 300);
      }
    }

    currentFilterIdx = index;
  }

  function startFilterAutoPlay() {
    stopFilterAutoPlay();
    // Cycle every 5 seconds once started
    filterInterval = setInterval(() => {
      let nextIdx = (currentFilterIdx + 1) % filterBtns.length;
      setActiveFilter(nextIdx);
    }, 5000);
  }

  function stopFilterAutoPlay() {
    if (filterInterval) {
      clearInterval(filterInterval);
      filterInterval = null;
    }
  }

  function handleActivity() {
    stopFilterAutoPlay();
    clearTimeout(inactivityTimeout);
    // Wait for 5 seconds of no activity before starting auto-play
    inactivityTimeout = setTimeout(startFilterAutoPlay, 5000);
  }

  // Listen for various user activities
  ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'].forEach(name => {
    document.addEventListener(name, handleActivity, { passive: true });
  });

  filterBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      handleActivity(); // Reset the timer on manual click
      setActiveFilter(idx);
    });
  });

  window.addEventListener('resize', updateFilterIndicator);
  // Start the initial inactivity timer
  handleActivity();
  setTimeout(updateFilterIndicator, 500);

  // 4. TIMELINE INTERACTION
  const timelineDots = document.querySelectorAll('.timeline-dot');
  
  timelineDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetId = dot.getAttribute('data-id');
      const targetCard = document.getElementById(targetId);

      // Highlight dot
      timelineDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      if (targetCard) {
        // If card is filtered out, switch to 'All'
        const isHidden = window.getComputedStyle(targetCard).display === 'none';
        if (isHidden) {
          setActiveFilter(0); // Switch to 'All'
        }

        setTimeout(() => {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Subtle glow effect
          targetCard.classList.add('active-highlight');
          setTimeout(() => {
            targetCard.classList.remove('active-highlight');
          }, 2000);
        }, isHidden ? 350 : 0);
      }
    });
  });

  // 5. MOBILE MENU
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

});
