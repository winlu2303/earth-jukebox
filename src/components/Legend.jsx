import { useState } from 'react';

const FALLBACK_LEGEND = [
  { hex: '#ef4444', instrument: 'Bass',    meaning: 'High values',   sound: '/sounds/bass.wav' },
  { hex: '#f97316', instrument: 'Piano',   meaning: 'Medium values', sound: '/sounds/piano.wav' },
  { hex: '#eab308', instrument: 'Strings', meaning: 'Background',    sound: '/sounds/strings.wav' },
  { hex: '#22c55e', instrument: 'Flute',   meaning: 'Low values',    sound: '/sounds/flute.wav' },
  { hex: '#3b82f6', instrument: 'Cello',   meaning: 'Minimum',       sound: '/sounds/cello.wav' },
  { hex: '#a855f7', instrument: 'Synth',   meaning: 'Anomaly',       sound: '/sounds/synth.wav' },
  { hex: '#ffffff', instrument: 'Bells',   meaning: 'Peak',          sound: '/sounds/bells.wav' },
];

export default function Legend({ dataset = null }) {
  const [playing, setPlaying] = useState(null);

  const items = dataset?.legend ?? FALLBACK_LEGEND;
  const datasetLabel = dataset?.label ?? 'Earth';

  const playSound = (item) => {
    const audio = new Audio(item.sound);
    audio.volume = 0.7;
    audio.play().catch(() => {
      // На Netlify .wav могут отсутствовать — молча игнорируем 404
    });
    setPlaying(item.instrument);

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(null);
    }, 3000);
  };

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        🎵 How to Read the Music
      </h2>
      <p className="text-white/60 text-center mb-6 text-sm">
        {datasetLabel} · Click on an instrument to hear it
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <button
            key={item.instrument}
            onClick={() => playSound(item)}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
              playing === item.instrument
                ? 'bg-white/20 scale-105 shadow-lg'
                : 'bg-white/5 hover:bg-white/10'
            }`}
            aria-label={`${item.instrument}: ${item.meaning}`}
          >
            <div
              className={`w-6 h-6 rounded-full flex-shrink-0 transition-transform ${
                playing === item.instrument ? 'scale-125 animate-pulse' : ''
              }`}
              style={{ backgroundColor: item.hex }}
            />
            <div className="text-sm">
              <p className="font-semibold">{item.instrument}</p>
              <p className="text-white/50 text-xs">{item.meaning}</p>
            </div>
            {playing === item.instrument && (
              <span className="ml-auto text-xs text-cyan-400">▶</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}