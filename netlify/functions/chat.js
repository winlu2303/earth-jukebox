// netlify/functions/chat.js
export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key is missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Список моделей: если одна не работает, пробуем следующую
    const models = ['gemini-3.8-flash', 'gemini-2.5-flash', 'gemini-3.1-flash-lite-preview'];
    let lastError = null;

    for (const model of models) {
      try {
        console.log(`Пробуем модель: ${model}`);
        
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `Ты - Дух Земли. Отвечай кратко (1-2 предложения) на вопрос: ${message}` }] }]
            })
          }
        );

        const data = await response.json();

        // Если модель вернула ошибку (например, 503), кидаем исключение, чтобы перейти к следующей
        if (data.error) {
          console.warn(`Модель ${model} выдала ошибку:`, data.error.message);
          lastError = data.error;
          continue; // Идем к следующей модели
        }

        // Если всё ок — возвращаем ответ
        return new Response(JSON.stringify({ reply: data.candidates[0].content.parts[0].text }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
        
      } catch (err) {
        console.warn(`Сетевая ошибка с моделью ${model}:`, err.message);
        lastError = { message: err.message };
      }
    }

    // Если все модели упали
    return new Response(JSON.stringify({ error: lastError?.message || 'All models failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};