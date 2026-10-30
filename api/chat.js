export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;
  
  const apiKey = process.env.GEMINI_API_KEY; 

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ 
              text: `Ты - Дух Земли, заботливый анимированный персонаж. Отвечай кратко (1-2 предложения) и дружелюбно на вопрос пользователя о климате: ${message}` 
            }] 
          }]
        })
      }
    );
    
    const data = await response.json();
    
    // Если Google вернул ошибку
    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    res.status(200).json({ reply: data.candidates[0].content.parts[0].text });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при запросе к Gemini' });
  }
}