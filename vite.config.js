import { defineConfig } from 'vite';

// Arquitectura: build estático (SPA de una sola vista). La carpeta /api queda
// fuera del bundle: es para funciones serverless (proxy seguro de Grok) que
// despliega Vercel/Netlify, no el frontend.
export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
  },
  server: {
    port: 5173,
    open: true,
  },
});
