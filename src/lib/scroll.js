// scroll.js — El ÚNICO efecto de scroll está en la figura central: sus 4 videos
// se cruzan a medida que la foto pasa por la pantalla. El resto es un diario
// estático de scroll nativo (nada de "landing page").

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CAPS = [
  'Atlos escanea más de 35 fuentes globales cada hora, sin descanso.',
  'La inteligencia descarta el clickbait: solo pasa lo relevante.',
  'El Quant analiza el impacto y el Editor redacta, claro y en español.',
  'Tu diario personal llega a Telegram. Decides mejor, en menos tiempo.',
];

export function initScroll() {
  const fig = document.querySelector('[data-scrollytelling]');
  if (!fig) return;

  const vids = Array.from(fig.querySelectorAll('.figure__v'));
  const bar = fig.querySelector('.figure__bar i');
  const cap = document.getElementById('fig-cap');
  const label = document.getElementById('fig-label');
  if (!vids.length) return;

  let current = -1;
  const setActive = (idx) => {
    if (idx === current) return;
    current = idx;
    vids.forEach((v, i) => {
      const on = i === idx;
      v.classList.toggle('is-active', on);
      if (on) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
      else v.pause();
    });
    if (cap) cap.textContent = CAPS[idx] || CAPS[0];
    if (label) label.textContent = 'Fotografía N.º 0' + (idx + 1);
  };
  setActive(0);

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return; // deja la primera foto fija

  ScrollTrigger.create({
    trigger: fig,
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress;
      const idx = Math.min(vids.length - 1, Math.floor(p * vids.length));
      setActive(idx);
      if (bar) bar.style.transform = `scaleX(${p})`;
    },
  });
}
