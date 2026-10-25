import { useState, useRef } from 'react';
import { useA11y } from './AccessibilityProvider';

export default function WorldMap() {
  const { speak } = useA11y();
  const audioRef = useRef(null);
  const [activeRegion, setActiveRegion] = useState(null);

  // Привязываем регионы к твоим существующим звукам
  const regions = [
    { id: 'amazon', name: 'Amazon', sound: 'Bass and Piano', file: 'bass.wav', x: '30%', y: '60%', color: '#22c55e' },
    { id: 'sahara', name: 'Sahara', sound: 'Synth', file: 'synth.wav', x: '45%', y: '45%', color: '#f97316' },
    { id: 'siberia', name: 'Siberia', sound: 'Cello', file: 'cello.wav', x: '65%', y: '30%', color: '#3b82f6' },
    { id: 'arctic', name: 'Arctic', sound: 'Flute and Bells', file: 'flute.wav', x: '50%', y: '15%', color: '#e5e7eb' },
  ];

  const handleClick = (region) => {
    // 1. Озвучиваем текст (Screen reader + TTS)
    speak(`You selected the ${region.name}. It sounds like ${region.sound}.`);
    setActiveRegion(region.id);

    // 2. Играем реальный звук
    if (audioRef.current) {
      audioRef.current.src = `/sounds/${region.file}`;
      audioRef.current.play().catch(e => console.log("Autoplay blocked"));
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4 relative overflow-hidden h-64">
      <h3 className="text-cyan-300 font-semibold mb-2 z-10 relative">Interactive Earth</h3>
      
      {/* Фон карты */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center" />
      
      {/* Кликабельные регионы */}
      {regions.map((r) => (
        <button
          key={r.id}
          onClick={() => handleClick(r)}
          className={`absolute w-8 h-8 rounded-full border-2 border-white/50 hover:scale-125 transition-transform z-10 ${
            activeRegion === r.id ? 'animate-pulse ring-4 ring-white/50' : ''
          }`}
          style={{ left: r.x, top: r.y, backgroundColor: r.color, transform: 'translate(-50%, -50%)' }}
          aria-label={`Region: ${r.name}`}
          title={r.name}
        />
      ))}

      {/* Активный регион текст */}
      {activeRegion && (
        <div className="absolute bottom-4 left-4 z-10 bg-black/70 px-3 py-1 rounded text-sm text-cyan-100">
          Playing: {regions.find(r => r.id === activeRegion).name}
        </div>
      )}

      {/* Скрытый аудиоплеер для карты */}
      <audio ref={audioRef} hidden onEnded={() => setActiveRegion(null)} />
    </div>
  );
}