// typewriter.js — Efecto de tecleo tipo máquina de escribir (async, cancelable).
// Da la sensación de que Atlos "escribe" la respuesta en vivo.

export function typeInto(el, text, { speed = 18, jitter = 40 } = {}) {
  let cancelled = false;
  el.textContent = '';
  el.classList.add('is-typing');

  const promise = new Promise((resolve) => {
    let i = 0;
    function step() {
      if (cancelled) return resolve();
      if (i >= text.length) {
        el.classList.remove('is-typing');
        return resolve();
      }
      el.textContent += text[i];
      i += 1;
      // Ritmo humano: pausa un poco más en signos de puntuación
      const ch = text[i - 1];
      const extra = /[.,;:!?]/.test(ch) ? 220 : 0;
      const delay = speed + Math.random() * jitter + extra;
      setTimeout(step, delay);
    }
    step();
  });

  return {
    done: promise,
    cancel: () => { cancelled = true; el.classList.remove('is-typing'); },
  };
}
