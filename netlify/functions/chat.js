// netlify/functions/chat.js
export default async (req, context) => {
  // Разрешаем только POST-запросы
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { message } = await req.json();
    
    // ВПИШИ СЮДА СВОЙ РАБОЧИЙ КЛЮЧ ВМЕСТО ТОГО, ЧТО В КАВЫЧКАХ
    const apiKey = 'AIzaSyC8R-EfvfAMKItpj7isfvgBUmRZFSeLu90'; 

    if (!apiKey || apiKey.length < 20) {
      return new Response(JSON.stringify({ error: 'API key is missing or invalid' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Запрос к Gemini
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Ты - Дух Земли. Отвечай кратко (1-2 предложения) на вопрос: ${message}` }] }]
        })
      }
    );

    const data = await response.json();
    console.log('Ответ от Google:', data); // Чтобы увидеть в логах, что пришло

    // Обработка ошибок от Google
    if (data.error) {
      console.error('Ошибка Gemini:', data.error);
      return new Response(JSON.stringify({ error: data.error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Успешный ответ
    return new Response(JSON.stringify({ reply: data.candidates[0].content.parts[0].text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Ошибка на сервере:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};