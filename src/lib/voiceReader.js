// voiceReader.js — Lectura en voz alta del manifiesto usando SpeechSynthesis API.
// Simula un locutor de radio antiguo leyendo la noticia principal.

import { icon } from './icons.js';

export function initVoiceReader() {
  const btn = document.getElementById('btn-read-aloud');
  const prose = document.querySelector('#manifiesto .prose');
  if (!btn || !prose || !('speechSynthesis' in window)) {
    if (btn) btn.style.display = 'none'; // ocultar si no hay soporte
    return;
  }

  const label = btn.querySelector('.read-label');
  let utterance = null;
  let playing = false;

  function getText() {
    return Array.from(prose.querySelectorAll('p'))
      .map(p => p.textContent.trim())
      .join('. ');
  }

  function pickSpanishVoice() {
    const voices = speechSynthesis.getVoices();
    // Priorizar voces naturales en español
    return voices.find(v => v.lang.startsWith('es') && v.name.toLowerCase().includes('natural'))
        || voices.find(v => v.lang.startsWith('es') && !v.name.toLowerCase().includes('compact'))
        || voices.find(v => v.lang.startsWith('es'))
        || null;
  }

  function stop() {
    speechSynthesis.cancel();
    playing = false;
    btn.classList.remove('is-playing');
    if (label) label.textContent = 'Escuchar';
  }

  function play() {
    const text = getText();
    if (!text) return;

    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.92;   // ritmo pausado, como locutor de radio
    utterance.pitch = 0.95;  // tono grave, serio

    const voice = pickSpanishVoice();
    if (voice) utterance.voice = voice;

    utterance.onend = () => stop();
    utterance.onerror = () => stop();

    speechSynthesis.speak(utterance);
    playing = true;
    btn.classList.add('is-playing');
    if (label) label.textContent = 'Detener';
  }

  btn.addEventListener('click', () => {
    if (playing) {
      stop();
    } else {
      play();
    }
  });

  // Cargar voces (algunos navegadores las cargan de forma asíncrona)
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => {};
  }
}
