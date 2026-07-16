// faq.js — Base de conocimiento "entrenada" sobre Atlos.
// El chat local responde con esto (gratis, sin API). También alimenta el
// system prompt del proxy de Grok para que las respuestas sean coherentes.

export const ATLOS_CONTEXT = `
Atlos es un bot de noticias inteligente en Telegram (@SoyAtlos_bot) con
arquitectura multi-agente de IA. Escanea más de 35 fuentes globales, filtra el
ruido y entrega solo lo relevante, redactado en español. Tiene voz IA, un
oráculo ambiental de precisión (clima, UV, calidad del aire) y alertas de crisis
en tiempo real. Modelo freemium: gratis con cadencia controlada; VIP a 0,10 USD
al día (se cobra 3 USD al mes) con voz, radar personalizado y análisis del Quant.
Pago con Telegram Stars o USDT (CryptoPay). El VIP se activa manualmente tras
verificar el pago. No hay devoluciones; puedes cancelar cuando quieras. Privacidad:
solo se almacena nombre y ciudad, para personalizar la experiencia; nada más.
No es asesoría financiera: la información de mercados es referencial.
`.trim();

// Preguntas entrenadas. keywords = disparadores; a = respuesta en voz de Atlos.
export const FAQ = [
  {
    id: 'que-es',
    q: '¿Qué es Atlos?',
    keywords: ['que es', 'qué es', 'quien eres', 'quién eres', 'de que trata', 'sobre atlos', 'que hace'],
    a: 'Soy Atlos, tu diario inteligente en Telegram. Un enjambre de agentes de IA escanea más de 35 fuentes del mundo, descarta el clickbait y te entrega solo lo que importa, ya redactado y analizado para que decidas mejor.',
  },
  {
    id: 'precio',
    q: '¿Cuánto cuesta?',
    keywords: ['cuesta', 'precio', 'vale', 'cuanto', 'cuánto', 'tarifa', 'pagar', 'suscripcion', 'suscripción'],
    a: 'La membresía Premium cuesta solo 0,10 USD al día. Se activa con un pago de 3 USD al mes y puedes cancelar cuando quieras. También hay un plan gratuito con noticias esenciales.',
  },
  {
    id: 'pago',
    q: '¿Cómo puedo pagar?',
    keywords: ['como pago', 'cómo pago', 'metodo de pago', 'método', 'stars', 'usdt', 'cripto', 'crypto', 'tarjeta'],
    a: 'Puedes pagar con Telegram Stars (nativo de Telegram) o con USDT vía CryptoPay. Al confirmar el pago, tu acceso VIP se activa tras una verificación breve.',
  },
  {
    id: 'vip',
    q: '¿Qué incluye el VIP?',
    keywords: ['vip', 'premium', 'beneficios', 'incluye', 'que gano', 'ventajas'],
    a: 'El VIP desbloquea: voz IA (le hablas y te responde con datos reales), radar personalizado por categorías, análisis predictivo del Quant sobre cada noticia, alertas en tiempo real y el oráculo ambiental de precisión para tu ciudad.',
  },
  {
    id: 'privacidad',
    q: '¿Guardan mis datos?',
    keywords: ['datos', 'privacidad', 'guardan', 'informacion', 'información', 'seguridad', 'almacenan'],
    a: 'Tu privacidad es sagrada. Solo almaceno tu nombre y tu ciudad, y únicamente para personalizar tu experiencia. No pido correo, teléfono, contraseñas ni datos bancarios. No rastreo tu actividad ni vendo información a nadie.',
  },
  {
    id: 'devoluciones',
    q: '¿Aceptan devoluciones?',
    keywords: ['devolucion', 'devolución', 'reembolso', 'refund', 'cancelar', 'cancelacion'],
    a: 'No hay devoluciones sobre los pagos de membresía. Pero puedes cancelar cuando quieras y conservas el acceso hasta que termine el ciclo que ya pagaste.',
  },
  {
    id: 'voz',
    q: '¿Cómo funciona la voz?',
    keywords: ['voz', 'audio', 'hablar', 'microfono', 'micrófono', 'nota de voz'],
    a: 'Siendo VIP, mantienes presionado el micrófono de Telegram y me hablas con una frase corta: el clima de tu ciudad, el precio del Bitcoin o qué pasa en el mundo. Te respondo con datos reales, en texto y en audio.',
  },
  {
    id: 'empezar',
    q: '¿Cómo empiezo?',
    keywords: ['empezar', 'empiezo', 'comenzar', 'registrar', 'registro', 'iniciar', 'como entro'],
    a: 'Muy fácil: abre @SoyAtlos_bot en Telegram y pulsa Iniciar. Te pregunto tu ciudad para calibrar tu clima y listo, empiezas a recibir tu diario inteligente.',
  },
  {
    id: 'categorias',
    q: '¿Qué temas cubre?',
    keywords: ['categorias', 'categorías', 'temas', 'noticias de que', 'secciones', 'deportes', 'cripto', 'tecnologia'],
    a: 'Cubro 13 categorías: finanzas, criptomonedas, geopolítica, tecnología e IA, deportes, ciencia, salud, videojuegos, cultura, clima, negocios, motor y más. Siendo VIP eliges cuáles quieres y cuáles ignorar.',
  },
  {
    id: 'asesoria',
    q: '¿Es asesoría financiera?',
    keywords: ['asesoria', 'asesoría', 'inversion', 'inversión', 'consejo financiero', 'recomienda invertir'],
    a: 'No. La información de mercados y cripto es referencial e informativa, para darte contexto. No es asesoría financiera: las decisiones siempre son tuyas.',
  },
];

// Saludo inicial del chat
export const CHAT_GREETING =
  'Soy el redactor de Atlos. Pregúntame lo que quieras sobre el bot: qué es, cuánto cuesta, cómo pago, la privacidad de tus datos. Escribe abajo o toca una pregunta.';

// Respuesta cuando no hay coincidencia y no hay Grok disponible
export const CHAT_FALLBACK =
  'Buena pregunta. Para eso te atiende mejor Atlos directamente en Telegram: abre @SoyAtlos_bot y escríbeme ahí. Mientras, puedo contarte del precio, el VIP o la privacidad.';
