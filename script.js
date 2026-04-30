// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingBar = document.getElementById('loadingBar');
  const loadingText = document.getElementById('loadingText');

  const messages = [
    'Loading your portfolio...',
    'Preparing something special...',
    'Almost ready...',
    'Welcome! 🎓'
  ];

  let progress = 0;
  let msgIndex = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 12 + 5;
    if (progress > 100) progress = 100;

    loadingBar.style.width = progress + '%';

    // Cycle through messages based on progress
    const newIndex = Math.floor((progress / 100) * messages.length);
    if (newIndex !== msgIndex && newIndex < messages.length) {
      msgIndex = newIndex;
      loadingText.textContent = messages[msgIndex];
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
      }, 600);
    }
  }, 150);
});