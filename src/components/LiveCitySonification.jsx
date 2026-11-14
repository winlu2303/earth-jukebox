import { useState, useRef } from 'react';
import { useA11y } from './AccessibilityProvider';

export function sonifyCity({ temperature, precipitation = 0, wind = 0 }) {
  const instruments = [];
  const description = [];

  // Температура
  if (temperature < 0) {
    instruments.push('Cello');
    description.push('freezing cold');
  } else if (temperature < 15) {
    instruments.push('Strings');
    description.push('cool');
  } else if (temperature < 25) {
    instruments.push('Piano');
    description.push('mild');
  } else if (temperature < 35) {
    instruments.push('Bass');
    description.push('warm');
  } else {
    instruments.push('Bass', 'Synth');
    description.push('scorching heat');
  }

  // Осадки
  if (precipitation > 20) {
    instruments.push('Piano');
    description.push('heavy rain');
  } else if (precipitation > 5) {
    instruments.push('Piano');
    description.push('light rain');
  }

  // Ветер
  if (wind > 15) {
    instruments.push('Flute');
    description.push('strong wind');
  } else if (wind > 7) {
    instruments.push('Flute');
    description.push('breeze');
  }

  const unique = [...new Set(instruments)];
  return {
    instruments: unique,
    description: description.join(', '),
    summary: unique.join(' + '),
  };
}

const TREND = {
  rising: { symbol: '📈', text: 'rising' },
  falling: { symbol: '📉', text: 'decreasing' },
  steady: { symbol: '➖', text: 'steady' },
};

function computeTrend(prev, curr) {
  if (prev === null || prev === undefined) return TREND.steady;
  if (curr > prev + 0.1) return TREND.rising;
  if (curr < prev - 0.1) return TREND.falling;
  return TREND.steady;
}

export default function LiveCitySound() {
  const [city, setCity] = useState('Moscow');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [prevData, setPrevData] = useState(null);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);
  const { speak } = useA11y();

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // Геокодинг через Open-Meteo (стабильнее Nominatim судя по тестам прошлым)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found');
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Погода: текущая температура + часовые осадки/ветер
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
          `&current=temperature_2m,precipitation,wind_speed_10m` +
          `&timezone=auto`
      );
      const weatherData = await weatherRes.json();

      const current = weatherData.current ?? {};
      const temp = current.temperature_2m ?? 20;
      const precip = current.precipitation ?? 0;
      const wind = current.wind_speed_10m ?? 0;

      const sonification = sonifyCity({
        temperature: temp,
        precipitation: precip,
        wind,
      });

      const text =
        `${name}, ${country}. Temperature ${temp.toFixed(1)} degrees Celsius. ` +
        `Precipitation ${precip.toFixed(1)} millimeters. ` +
        `Wind ${wind.toFixed(1)} meters per second. ` +
        `It sounds like ${sonification.summary} — ${sonification.description}.`;

      setResult({
        name,
        country,
        temp,
        precip,
        wind,
        sonification,
        text,
      });
      speak(text);

      // Проигрываем первый инструмент из маппинга
      const firstInstrument = sonification.instruments[0]?.toLowerCase();
      if (audioRef.current && firstInstrument) {
        audioRef.current.src = `/sounds/${firstInstrument}.mp3`;
        audioRef.current.play().catch(() => {
          // .mp3 может отсутствовать — тихо игнорируем
        });
      }

      setPrevData({ temp, precip, wind });
    } catch (err) {
      // Fallback: оценка по широте, чтобы демо не падало при блокировке API
      const fallbackTemp = 25 - Math.abs(55) * 0.4; // ~3°C для Москвы
      const sonification = sonifyCity({
        temperature: fallbackTemp,
        precipitation: 0,
        wind: 3,
      });
      const fallbackText =
        `Could not reach weather data for ${city}. ` +
        `Using estimated values: ~${fallbackTemp.toFixed(0)}°C, sounds like ${sonification.summary}.`;
      setResult({
        name: city,
        country: '',
        temp: fallbackTemp,
        precip: 0,
        wind: 3,
        sonification,
        text: fallbackText,
        isFallback: true,
      });
      setError('Weather API unreachable — showing estimated values.');
      speak(fallbackText);
    } finally {
      setLoading(false);
    }
  };

  const tempTrend = result && prevData
    ? computeTrend(prevData.temp, result.temp)
    : TREND.steady;
  const precipTrend = result && prevData
    ? computeTrend(prevData.precip, result.precip)
    : TREND.steady;
  const windTrend = result && prevData
    ? computeTrend(prevData.wind, result.wind)
    : TREND.steady;

  return (
    <div
      className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4"
      role="region"
      aria-label="City Sonification"
    >
      <h3 className="text-cyan-300 font-semibold mb-2">🌍 City Sonification</h3>
      <p className="text-white/60 text-xs mb-3">
        Real weather → real music. Temperature, rain, and wind as instruments.
      </p>

      <form onSubmit={fetchWeather} className="flex gap-2">
        <label htmlFor="lcs-city-input" className="sr-only">
          City name
        </label>
        <input
          id="lcs-city-input"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city (e.g., Tokyo, Moscow)"
          className="flex-1 bg-black/50 border border-white/20 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
          aria-label="City name"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/40 rounded text-sm hover:bg-cyan-500/30 disabled:opacity-40"
          aria-label="Fetch weather and play sonification"
        >
          {loading ? '…' : 'Hear it'}
        </button>
      </form>

      {error && (
        <p className="mt-2 text-xs text-yellow-400" role="status">
          ⚠️ {error}
        </p>
      )}

      {result && (
        <div
          className="mt-3 p-3 bg-black/40 border border-cyan-500/30 rounded text-sm text-cyan-100"
          aria-live="polite"
        >
          <p className="font-semibold mb-1">
            📍 {result.name}
            {result.country ? `, ${result.country}` : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs mb-2">
            <div>
              🌡️ {result.temp.toFixed(1)} °C{' '}
              <span aria-label={tempTrend.text}>{tempTrend.symbol}</span>
            </div>
            <div>
              💧 {result.precip.toFixed(1)} mm{' '}
              <span aria-label={precipTrend.text}>{precipTrend.symbol}</span>
            </div>
            <div>
              💨 {result.wind.toFixed(1)} m/s{' '}
              <span aria-label={windTrend.text}>{windTrend.symbol}</span>
            </div>
          </div>
          <p className="text-cyan-300">
            ♪ Sounds like: <strong>{result.sonification.summary}</strong>
            {' — '}
            {result.sonification.description}
          </p>
        </div>
      )}

      <audio ref={audioRef} hidden />
    </div>
  );
}