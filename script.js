document.addEventListener("DOMContentLoaded", function () {

  // --------- MENU MOBILE TOGGLE ---------
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.querySelector('.menu');
  if (menu && localStorage.getItem("menu-open") === "true") {
    menu.classList.add("menu-open");
  }
  if(menuToggle){
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('menu-open');
      localStorage.setItem("menu-open", menu.classList.contains("menu-open"));
    });
  }

  // --------- MODE SOMBRE ---------
  const darkToggle = document.getElementById('darkmode-toggle');
  function applyDarkMode(enabled) {
    if (enabled) {
      document.body.classList.add('dark-mode');
      localStorage.setItem("dark-mode", "enabled");
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem("dark-mode", "disabled");
    }
  }

  const hour = new Date().getHours();
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedMode = localStorage.getItem("dark-mode");
  let darkModeOn = savedMode === "enabled" || (!savedMode && (hour >= 19 || hour < 6 || prefersDark));
  applyDarkMode(darkModeOn);

  function updateDarkIcon() {
    const icon = document.getElementById('darkmode-icon');
    if(icon) icon.textContent = document.body.classList.contains('dark-mode') ? '🌙' : '☀';
  }
  updateDarkIcon();

  if(darkToggle){
    darkToggle.addEventListener('click', () => {
      darkModeOn = !darkModeOn;
      applyDarkMode(darkModeOn);
      updateDarkIcon();
      darkToggle.animate([
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(20deg)' },
        { transform: 'rotate(-20deg)' },
        { transform: 'rotate(0deg)' }
      ], { duration: 300 });
    });
  }

  // --------- HORLOGE ---------
  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('fr-FR');
    const date = now.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const clockEl = document.getElementById('clock');
    if(clockEl) clockEl.innerHTML = `${time}<br><small>${date}</small>`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // --------- CITATION ---------
  const quotes = [
    "Le courage n'est pas l'absence de peur, mais la capacité de la vaincre.",
    "Agis comme s'il était impossible d'échouer.",
    "Le changement commence par toi.",
    "Un petit pas chaque jour mène à de grandes victoires.",
    "Ta voix peut être une révolution."
  ];
  const quoteElement = document.getElementById('quote');
  if(quoteElement) quoteElement.textContent = quotes[Math.floor(Math.random() * quotes.length)];

  // --------- COMPTE À REBOURS (optionnel) ---------
  const countdownEl = document.getElementById('countdown');
  if(countdownEl){
    function updateCountdown() {
      const now = new Date();
      const target = new Date();
      target.setHours(20,0,0,0); // Heure cible 20h
      if(now > target) target.setDate(target.getDate()+1);
      const diff = target - now;
      const h = String(Math.floor(diff/(1000*60*60))).padStart(2,'0');
      const m = String(Math.floor((diff%(1000*60*60))/(1000*60))).padStart(2,'0');
      const s = String(Math.floor((diff%(1000*60))/1000)).padStart(2,'0');
      countdownEl.textContent = `${h}:${m}:${s}`;
    }
    updateCountdown();
    setInterval(updateCountdown,1000);
  }

});
