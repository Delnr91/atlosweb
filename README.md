# ATLOS WEB — El Diario Inteligente

Home de una sola vista (diario vintage + acentos futuristas) para presentar el
bot **@SoyAtlos_bot**, su membresía, privacidad y términos, con una sala de
consultas tipo máquina de escribir.

## Arquitectura

Stack: **Vite** + JS modular (sin framework) + **GSAP/ScrollTrigger** + **Lenis**.

```
atlosweb/
├─ index.html              # estructura semántica (una sola vista)
├─ src/
│  ├─ main.js              # entry: orquesta los init de cada módulo
│  ├─ styles/              # reset · background · newspaper · chat
│  ├─ data/faq.js          # base de conocimiento "entrenada" sobre Atlos
│  └─ lib/
│     ├─ icons.js          # iconos vintage SVG (line-art, sin emojis)
│     ├─ typewriter.js     # efecto de tecleo (respuestas del chat)
│     ├─ background.js     # canvas "máquina de escribir IA mágica"
│     ├─ scroll.js         # Lenis + ScrollTrigger (scrollytelling central)
│     └─ chat/             # patrón adaptador
│        ├─ index.js       # controlador (local → Grok → typewriter)
│        ├─ localAdapter.js# respuestas por keywords (gratis, offline)
│        └─ grokAdapter.js # cliente del proxy seguro
└─ api/chat.js             # función serverless = proxy de Grok (key server-side)
```

**Patrones aplicados**
- *Separación de responsabilidades*: datos / lógica / estilos / componentes.
- *Módulo*: cada feature expone un `init()` y se ensambla en `main.js`.
- *Adaptador*: el chat responde con base local y, si hay backend, con Grok — misma interfaz.
- *Mejora progresiva*: el contenido es HTML puro; JS añade scroll y chat. Respeta `prefers-reduced-motion`.

## Seguridad de la API de Grok (IMPORTANTE)

La `GROK_API_KEY` **nunca** va en el frontend. El navegador solo llama a
`/api/chat` (función serverless), que es la única que conoce la clave. Sin clave,
la web funciona igual usando la base local. Nunca uses el prefijo `VITE_` para la
key: ese prefijo la publicaría en el navegador.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
```

## Despliegue

### Opción A — Vercel (recomendada: estático + chat con Grok)
1. Sube esta carpeta a un repo de GitHub.
2. En vercel.com → New Project → importa el repo.
3. En Settings → Environment Variables agrega `GROK_API_KEY` (y opcional `GROK_MODEL`).
4. Deploy. Vercel sirve el sitio y ejecuta `api/chat.js` como función.

### Opción B — Estático en cualquier host (sin Grok)
```bash
npm run build
```
Sube el contenido de `dist/` a Netlify, GitHub Pages, o tu VM. El chat funciona
con la base local (sin Grok, ya que no hay función serverless).

## Personalización
- Precio, textos y preguntas: `src/data/faq.js` e `index.html`.
- Video de fondo del scrollytelling: deja `public/atlos-loop.mp4` y se "rasca" con el scroll.
- Colores: variables CSS en `src/styles/reset.css`.
