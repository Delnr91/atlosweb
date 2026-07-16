// main.js — Punto de entrada. Orquesta los módulos (patrón: cada uno con init).
import './styles/reset.css';
import './styles/background.css';
import './styles/newspaper.css';
import './styles/chat.css';

import { injectIcons } from './lib/icons.js';
import { initScroll } from './lib/scroll.js';
import { initChat } from './lib/chat/index.js';

function boot() {
  injectIcons();        // reemplaza [data-icon] por SVG vintage de diario
  initChat();           // sala de preguntas entrenadas + Groq opcional
  initScroll();         // solo el video central reacciona al scroll

  // Fecha de edición + reloj
  const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const now = new Date();
  const ed = document.getElementById('edition-date');
  if (ed) ed.textContent = '12 de Enero de 2050';

  const clock = document.getElementById('clock');
  if (clock) {
    const p = (n) => String(n).padStart(2, '0');
    const tick = () => {
      const d = new Date();
      clock.textContent = `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())} UTC`;
    };
    setInterval(tick, 1000); tick();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
