// --------- MENU MOBILE TOGGLE ---------
const menuToggle = document.getElementById('menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('menu-open');
});

// --------- MODE SOMBRE ---------
function applyDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

// Détecter l'heure locale
const hour = new Date().getHours();

// Détecter la préférence système (dark mode)
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Activer mode sombre si heure nuit (19h - 6h) ou préférence système détectée
let darkModeOn = (hour >= 19 || hour < 6) || prefersDark;
applyDarkMode(darkModeOn);

// Gestion du bouton toggle mode sombre
const darkToggle = document.getElementById('darkmode-toggle');
darkToggle.addEventListener('click', () => {
  darkModeOn = !darkModeOn;
  applyDarkMode(darkModeOn);
});
