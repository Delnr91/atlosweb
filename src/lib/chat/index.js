// chat/index.js — Controlador del chat (patrón adaptador).
// Estrategia: intenta responder con la base local (instantáneo, gratis). Si la
// pregunta no matchea Y hay backend de Grok, consulta a Grok. Render con typewriter.

import { FAQ, CHAT_GREETING } from '../../data/faq.js';
import { localAnswer } from './localAdapter.js';
import { grokAnswer } from './grokAdapter.js';
import { typeInto } from '../typewriter.js';
import { icon } from '../icons.js';

export function initChat() {
  const log = document.getElementById('chat-log');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const chips = document.getElementById('chat-chips');
  if (!log || !form) return;

  const history = [];
  let activeType = null;

  // Chips de preguntas entrenadas
  FAQ.slice(0, 6).forEach((item) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.textContent = item.q;
    b.addEventListener('click', () => handle(item.q));
    chips.appendChild(b);
  });

  function bubble(role) {
    const wrap = document.createElement('div');
    wrap.className = `msg msg--${role}`;
    const who = document.createElement('span');
    who.className = 'msg__who';
    who.innerHTML = role === 'bot'
      ? `${icon('typewriter', 16)} Atlos`
      : `${icon('quill', 16)} Tú`;
    const body = document.createElement('div');
    body.className = 'msg__body';
    wrap.append(who, body);
    log.appendChild(wrap);
    log.scrollTop = log.scrollHeight;
    return body;
  }

  async function respond(text) {
    const body = bubble('bot');
    if (activeType) activeType.cancel();
    activeType = typeInto(body, text, { speed: 16 });
    await activeType.done;
    log.scrollTop = log.scrollHeight;
  }

  let busy = false;

  // Validación/saneado de input en el cliente (primera línea de defensa)
  function sanitizeInput(raw) {
    if (typeof raw !== 'string') return '';
    let out = '';
    for (const ch of raw) {
      const code = ch.charCodeAt(0);
      out += (code < 32 || code === 127) ? ' ' : ch; // sin caracteres de control
    }
    return out.replace(/\s+/g, ' ').trim().slice(0, 200); // colapsa espacios, tope 200
  }

  async function handle(message) {
    if (busy) return;                    // evita envíos en ráfaga
    const clean = sanitizeInput(message);
    if (!clean) return;
    busy = true;
    bubble('user').textContent = clean;
    history.push({ role: 'user', content: clean });
    if (history.length > 12) history.splice(0, history.length - 12);
    log.scrollTop = log.scrollHeight;

    // 1) Base local
    const local = localAnswer(clean);
    if (local.matched) {
      await respond(local.text);
      history.push({ role: 'assistant', content: local.text });
      busy = false;
      return;
    }

    // 2) Sin match → intenta Grok (si hay backend); si no, usa el fallback local
    const thinking = bubble('bot');
    thinking.innerHTML = '<span class="dots"><i></i><i></i><i></i></span>';
    const grok = await grokAnswer(clean, history);
    thinking.closest('.msg').remove();

    const finalText = grok || local.text;
    await respond(finalText);
    history.push({ role: 'assistant', content: finalText });
    busy = false;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handle(input.value);
    input.value = '';
  });

  // Saludo inicial
  respond(CHAT_GREETING);
}
