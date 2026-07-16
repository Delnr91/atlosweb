// grokAdapter.js — Cliente del proxy seguro de Grok (/api/chat).
// El frontend NUNCA ve la API key: solo llama a nuestra función serverless,
// que es la que habla con xAI usando la key guardada en el servidor.

export async function grokAnswer(message, history = []) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.reply) return data.reply;
    return null; // sin key configurada o sin respuesta → el controlador usa local
  } catch (_) {
    return null; // sin backend (host estático) → cae al motor local
  }
}
