import { useState } from 'react';

const COLORS = [
  { color: '#ef4444', label: 'Red',    instrument: 'Bass',    meaning: 'High values',  sound: '/sounds/bass.wav' },
  { color: '#f97316', label: 'Orange', instrument: 'Piano',   meaning: 'Medium values', sound: '/sounds/piano.wav' },
  { color: '#eab308', label: 'Yellow', instrument: 'Strings', meaning: 'Background',   sound: '/sounds/strings.wav' },
  { color: '#22c55e', label: 'Green',  instrument: 'Flute',   meaning: 'Low values',   sound: '/sounds/flute.wav' },
  { color: '#3b82f6', label: 'Blue',   instrument: 'Cello',   meaning: 'Minimum',      sound: '/sounds/cello.wav' },
  { color: '#a855f7', label: 'Purple', instrument: 'Synth',   meaning: 'Anomaly',      sound: '/sounds/synth.wav' },
  { color: '#ffffff', label: 'White',  instrument: 'Bells',   meaning: 'Peak',         sound: '/sounds/bells.wav' },
];

export default function Legend() {
  const [playing, setPlaying] = useState(null);

  const playSound = (color) => {
    const audio = new Audio(color.sound);
    audio.volume = 0.7;
    audio.play();
    setPlaying(color.instrument);

    // Стоп через 3 секунды
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
        Click on an instrument to hear it · Each color in the NASA visualization becomes a musical instrument
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {COLORS.map((c) => (
          <button
            key={c.label}
            onClick={() => playSound(c)}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
              playing === c.instrument
                ? 'bg-white/20 scale-105 shadow-lg'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex-shrink-0 transition-transform ${
                playing === c.instrument ? 'scale-125 animate-pulse' : ''
              }`}
              style={{ backgroundColor: c.color }}
            />
            <div className="text-sm">
              <p className="font-semibold">{c.instrument}</p>
              <p className="text-white/50 text-xs">{c.meaning}</p>
            </div>
            {playing === c.instrument && (
              <span className="ml-auto text-xs text-cyan-400">▶</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}