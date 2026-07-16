// localAdapter.js — Motor de chat local (gratis, offline, sin API).
// Coincidencia por palabras clave sobre la base entrenada (FAQ).

import { FAQ, CHAT_FALLBACK } from '../../data/faq.js';

function normalize(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // quita acentos para comparar
    .trim();
}

export function localAnswer(message) {
  const m = normalize(message);
  let best = null;
  let bestScore = 0;

  for (const item of FAQ) {
    let score = 0;
    for (const kw of item.keywords) {
      if (m.includes(normalize(kw))) score += kw.length; // frases largas pesan más
    }
    if (score > bestScore) { bestScore = score; best = item; }
  }

  if (best && bestScore > 0) {
    return { text: best.a, matched: true };
  }
  return { text: CHAT_FALLBACK, matched: false };
}
