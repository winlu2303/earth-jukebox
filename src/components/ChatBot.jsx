import { useState } from 'react';
import { useA11y } from './AccessibilityProvider';

export default function ChatBot() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const { speak } = useA11y();

  const askEarth = async (e) => {
    e.preventDefault();
    if (!query) return;
    
    setLoading(true);
    setAnswer('');
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });
      const data = await res.json();
      
      if (data.reply) {
        setAnswer(data.reply);
        speak(data.reply); // Дух Земли озвучивает ответ!
      } else {
        setAnswer('I am sorry, I cannot to answer right now.');
      }
    } catch (err) {
      setAnswer('Network Error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4">
      <h3 className="text-cyan-300 font-semibold mb-2">Ask the Earth</h3>
      <form onSubmit={askEarth} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="How does the Amazon sound?"
          className="flex-1 bg-black/50 border border-white/20 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/40 rounded text-sm"
        >
          {loading ? '...' : 'Ask'}
        </button>
      </form>
      
      {answer && (
        <div className="mt-3 p-3 bg-black/40 border border-cyan-500/30 rounded text-sm text-cyan-100">
          🌍 {answer}
        </div>
      )}
    </div>
  );
}