// icons.js — Set de iconos vintage line-art (grabado de diario), sin emojis.
// Todos comparten trazo fino y estilo coherente. Uso: icon('quill', 26).

const P = {
  quill: '<path d="M4 20c6-2 8-6 12-10 2-2 4-3 4-6 0 0-4 0-7 3S6 13 4 20zM4 20l3-1"/>',
  compass: '<circle cx="12" cy="12" r="9"/><polygon points="12,7 14,14 12,13 10,14"/><circle cx="12" cy="12" r="1"/>',
  gears: '<circle cx="12" cy="12" r="3.2"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2M6 6l1.5 1.5M16.5 16.5L18 18M18 6l-1.5 1.5M7.5 16.5L6 18"/>',
  shield: '<path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6"/>',
  bolt: '<polygon points="13,2 4,14 11,14 10,22 19,9 12,9"/>',
  sliders: '<path d="M4 8h10M18 8h2M4 16h4M12 16h8"/><circle cx="16" cy="8" r="2"/><circle cx="10" cy="16" r="2"/>',
  plane: '<path d="M21 4L3 11l6 2 2 6z"/><path d="M21 4L11 19"/>',
  book: '<path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v13c-3-1-6-1-8 1-2-2-5-2-8-1z"/><path d="M12 6v13"/>',
  coin: '<ellipse cx="12" cy="7" rx="8" ry="3.2"/><path d="M4 7v6c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2V7"/>',
  typewriter: '<path d="M6 7h12l2 5v5H4v-5z"/><path d="M8 12h8M9 17v2h6v-2"/><rect x="9" y="4" width="6" height="3"/>',
  chat: '<path d="M4 5h16v10H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  lock: '<rect x="5" y="10" width="14" height="10" rx="1.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15" r="1.4"/>',
  scroll: '<path d="M7 4h10v13a3 3 0 0 1-3 3H6a3 3 0 0 0 3-3V4z"/><path d="M17 4a2 2 0 0 1 2 2v1h-2M9 8h5M9 11h5"/>',
  star: '<polygon points="12,3 14.5,9 21,9.5 16,13.5 17.5,20 12,16.5 6.5,20 8,13.5 3,9.5 9.5,9"/>',
  send: '<path d="M4 12l16-7-7 16-2-7z"/>',
  speaker: '<path d="M3 9v6h4l5 5V4L7 9z"/><path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>',
};

export function icon(name, size = 24, extraClass = '') {
  const body = P[name] || '';
  return `<svg class="ic ${extraClass}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

export function injectIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach((el) => {
    const name = el.getAttribute('data-icon');
    const size = parseInt(el.getAttribute('data-size') || '24', 10);
    el.innerHTML = icon(name, size);
  });
}
