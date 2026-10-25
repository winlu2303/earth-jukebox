import { useEffect } from 'react';

export default function AboutModal({ open, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0a0e27] border border-cyan-400/30 rounded-2xl p-6 max-w-xl w-full max-h-[85vh] overflow-y-auto"
      >
        <h2 id="about-title" className="text-xl font-bold text-cyan-300 mb-3">
          About Earth Jukebox
        </h2>
        <p className="text-sm text-white/80 mb-3">
          Earth Jukebox turns NASA Earth observation data into music. Each color
          becomes a musical instrument, so blind, visually impaired, and auditory
          learners can "hear" climate data.
        </p>
        <h3 className="font-semibold text-white mb-1">Team MindWave</h3>
        <p className="text-sm text-white/70 mb-3">NASA Space Apps Challenge 2026</p>
        <h3 className="font-semibold text-white mb-1">Tech stack</h3>
        <p className="text-sm text-white/70 mb-3">
          React 18 · Vite · Tailwind 4 · Leaflet · Python (OpenCV, music21,
          FluidSynth) · FFmpeg
        </p>
        <h3 className="font-semibold text-white mb-1">Scalability</h3>
        <p className="text-sm text-white/70 mb-3">
          Any NASA GMAO visualization can be sonified with the same pipeline —
          just drop a new video and the analyzer handles the rest.
        </p>
        <h3 className="font-semibold text-white mb-1">Links</h3>
        <ul className="text-sm text-cyan-300 space-y-1">
          <li><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a href="https://svs.gsfc.nasa.gov/" target="_blank" rel="noreferrer">NASA SVS</a></li>
          <li><a href="https://gmao.gsfc.nasa.gov/" target="_blank" rel="noreferrer">NASA GMAO</a></li>
        </ul>
        <button
          onClick={onClose}
          className="mt-5 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40 hover:bg-cyan-500/30"
        >
          Close
        </button>
      </div>
    </div>
  );
}