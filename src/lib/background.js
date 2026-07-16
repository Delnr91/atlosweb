// background.js — Fondo ambiental "máquina de escribir IA mágica".
// Un canvas fijo detrás del contenido donde caracteres tenues se "teclean"
// en columnas, como si una redacción invisible escribiera el diario.
// Ligero: se pausa si el usuario prefiere menos movimiento o la pestaña oculta.

export function initBackground() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.createElement('canvas');
  canvas.id = 'tw-bg';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789·—:/.';
  let cols = [];
  let w, h, fontSize, running = true;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    fontSize = Math.max(14, Math.min(22, Math.floor(w / 70)));
    const count = Math.floor(w / (fontSize * 1.6));
    cols = Array.from({ length: count }, (_, i) => ({
      x: i * fontSize * 1.6 + fontSize,
      y: Math.random() * h,
      speed: 0.35 + Math.random() * 0.7,
      char: '',
      life: 0,
    }));
    ctx.font = `${fontSize}px 'Space Mono', monospace`;
  }

  let last = 0;
  function frame(t) {
    if (!running) return;
    if (t - last > 90) {          // ~11 fps: tecleo lento, no distrae ni pesa
      last = t;
      // Desvanecido del papel (deja rastro fantasma)
      ctx.fillStyle = 'rgba(242, 232, 206, 0.10)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(90, 58, 30, 0.10)';
      cols.forEach((c) => {
        c.char = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        ctx.fillText(c.char, c.x, c.y);
        c.y += fontSize * c.speed;
        if (c.y > h) c.y = -fontSize * (Math.random() * 6);
      });
    }
    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden && !prefersReduced;
    if (running) requestAnimationFrame(frame);
  });

  if (!prefersReduced) requestAnimationFrame(frame);
}
