import { useRef, useEffect } from 'react';

const INSTRUMENTS = [
  { id: 'bass',     label: 'Bass (Red)',      color: 'red',    src: '/sounds/bass.wav' },
  { id: 'piano',    label: 'Piano (Orange)',  color: 'orange', src: '/sounds/piano.wav' },
  { id: 'strings',  label: 'Strings (Yellow)',color: 'yellow', src: '/sounds/strings.wav' },
  { id: 'flute',    label: 'Flute (Green)',   color: 'green',  src: '/sounds/flute.wav' },
  { id: 'cello',    label: 'Cello (Blue)',    color: 'blue',   src: '/sounds/cello.wav' },
  { id: 'synth',    label: 'Synth (Purple)',  color: 'purple', src: '/sounds/synth.wav' },
  { id: 'bells',    label: 'Bells (White)',   color: 'white',  src: '/sounds/bells.wav' },
];

export default function InstrumentMixer({ muted, setMuted, isPlaying }) {
  const audioRefs = useRef({});

  // 1. Синхронизация Play/Pause с видео
  useEffect(() => {
    Object.values(audioRefs.current).forEach(audio => {
      if (!audio) return;
      if (isPlaying) {
        audio.play().catch(e => console.log("Autoplay blocked"));
      } else {
        audio.pause();
      }
    });
  }, [isPlaying]);

  // 2. Управление громкостью (Mute/Unmute)
  useEffect(() => {
    Object.entries(audioRefs.current).forEach(([id, audio]) => {
      if (audio) {
        audio.volume = muted[id] ? 0 : 0.5; // 0.5 — чтобы не орало слишком громко
      }
    });
  }, [muted]);

  const toggle = (id) => {
    setMuted(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section aria-labelledby="mixer-title" className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 id="mixer-title" className="text-sm uppercase tracking-wider text-cyan-300 mb-3">
        Instrument isolation
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {INSTRUMENTS.map((inst) => {
          const isMuted = !!muted[inst.id];
          return (
            <button
              key={inst.id}
              onClick={() => toggle(inst.id)}
              aria-pressed={!isMuted}
              aria-label={`${inst.label} — ${isMuted ? 'muted' : 'on'}`}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                isMuted
                  ? 'bg-black/30 border-white/10 text-white/40 line-through'
                  : 'bg-white/10 border-white/30 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]'
              }`}
            >
              {inst.label}
            </button>
          );
        })}
      </div>

      {/* Скрытые аудио-теги */}
      {INSTRUMENTS.map((inst) => (
        <audio
          key={inst.id}
          ref={(el) => (audioRefs.current[inst.id] = el)}
          src={inst.src}
          loop
          preload="auto"
        />
      ))}
    </section>
  );
}