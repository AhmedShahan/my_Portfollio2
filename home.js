// ===== TYPED.JS — rotating roles =====
var typed = new Typed('.multiple-text', {
  strings: [
    'Artificial Neural Networks',
    'Machine Learning',
    'Deep Learning',
    'AI Engineering',
    'Teaching & Education',
  ],
  typeSpeed: 60,
  backSpeed: 40,
  backDelay: 1800,
  loop: true,
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});
