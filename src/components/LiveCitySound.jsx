import { useState, useRef } from 'react';
import { useA11y } from './AccessibilityProvider';

export default function LiveCitySound() {
  const [city, setCity] = useState('Moscow');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const audioRef = useRef(null);
  const { speak } = useA11y();

  const fetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      // 1. Получаем координаты города (Open-Meteo Geocoding)
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
      const geoData = await geoRes.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found');
      }
      
      const { latitude, longitude, name } = geoData.results[0];

      // 2. Получаем погоду (Open-Meteo Forecast)
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      const weatherData = await weatherRes.json();
      const temp = weatherData.current_weather.temperature;

      // 3. Определяем звук на основе температуры
      let instrument = '';
      let soundFile = '';
      if (temp > 20) {
        instrument = 'Bass (Hot)';
        soundFile = '/sounds/bass.wav';
      } else if (temp > 0) {
        instrument = 'Piano (Mild)';
        soundFile = '/sounds/piano.wav';
      } else {
        instrument = 'Cello (Cold)';
        soundFile = '/sounds/cello.wav';
      }

      const text = `${name} is ${temp}°C today. It sounds like ${instrument}.`;
      setResult({ name, temp, text });
      speak(text);
      
      if (audioRef.current) {
        audioRef.current.src = soundFile;
        audioRef.current.play();
      }
    } catch (err) {
      setResult({ text: 'Could not fetch weather data. Try another city.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4">
      <h3 className="text-cyan-300 font-semibold mb-2">City Sonification</h3>
      <form onSubmit={fetchWeather} className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city (e.g., Tokyo)"
          className="flex-1 bg-black/50 border border-white/20 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
        />
        <button type="submit" disabled={loading} className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/40 rounded text-sm hover:bg-cyan-500/30">
          {loading ? '...' : 'Hear it'}
        </button>
      </form>
      {result && (
        <div className="mt-3 p-3 bg-black/40 border border-cyan-500/30 rounded text-sm text-cyan-100">
          {result.text}
        </div>
      )}
      <audio ref={audioRef} hidden />
    </div>
  );
}