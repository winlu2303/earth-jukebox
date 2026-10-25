import { useState, useRef } from 'react';

const INSTRUMENTS = [
  { id: 'bass', label: 'Bass', src: '/sounds/bass.wav' },
  { id: 'piano', label: 'Piano', src: '/sounds/piano.wav' },
  { id: 'strings', label: 'Strings', src: '/sounds/strings.wav' },
  { id: 'flute', label: 'Flute', src: '/sounds/flute.wav' },
  { id: 'cello', label: 'Cello', src: '/sounds/cello.wav' },
  { id: 'synth', label: 'Synth', src: '/sounds/synth.wav' },
  { id: 'bells', label: 'Bells', src: '/sounds/bells.wav' },
];

export default function GuessGame() {
  const [target, setTarget] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const audioRef = useRef(null);

  const playRandom = () => {
    const random = INSTRUMENTS[Math.floor(Math.random() * INSTRUMENTS.length)];
    setTarget(random);
    setFeedback('');
    if (audioRef.current) {
      audioRef.current.src = random.src;
      audioRef.current.play();
    }
  };

  const checkGuess = (id) => {
    if (!target) return;
    if (id === target.id) {
      setScore(score + 1);
      setFeedback('✅ Correct!');
      setTarget(null);
    } else {
      setFeedback(`❌ Wrong. It was ${target.label}.`);
      setTarget(null);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4">
      <h3 className="text-cyan-300 font-semibold mb-2">Guess the Instrument</h3>
      <div className="flex items-center justify-between mb-3">
        <button onClick={playRandom} className="px-4 py-2 bg-purple-500/20 border border-purple-400/40 rounded-lg hover:bg-purple-500/30">
          🎵 Play Sound
        </button>
        <span className="text-sm text-white/60">Score: {score}</span>
      </div>
      
      {target && (
        <div className="grid grid-cols-2 gap-2">
          {INSTRUMENTS.map((inst) => (
            <button
              key={inst.id}
              onClick={() => checkGuess(inst.id)}
              className="px-2 py-1 bg-white/10 border border-white/20 rounded hover:bg-white/20 text-xs"
            >
              {inst.label}
            </button>
          ))}
        </div>
      )}
      
      {feedback && <p className="mt-2 text-sm text-center">{feedback}</p>}
      <audio ref={audioRef} hidden />
    </div>
  );
}