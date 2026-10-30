import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HowItWorksModal({ open, onClose }) {
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
      aria-labelledby="hiw-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0a0e27] border border-cyan-400/30 rounded-2xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
      >
        <h2 id="hiw-title" className="text-xl font-bold text-cyan-300 mb-4">
          How it works
        </h2>

        <section className="mb-4">
          <h3 className="font-semibold text-white mb-1">Mode 1 — From frames (PNG)</h3>
          <ol className="list-decimal list-inside text-sm text-white/80 space-y-1">
            <li>Extract PNG frames from the source.</li>
            <li>Analyze color content per frame (OpenCV).</li>
            <li>Map colors → instruments → MIDI tracks.</li>
            <li>Render MIDI → WAV (FluidSynth + SoundFont).</li>
            <li>Sync audio + video (FFmpeg).</li>
          </ol>
        </section>

        <section className="mb-4">
          <h3 className="font-semibold text-white mb-1">Mode 2 — From video (MP4)</h3>
          <ol className="list-decimal list-inside text-sm text-white/80 space-y-1">
            <li>Extract frames from video (12 fps).</li>
            <li>Analyze color content per frame.</li>
            <li>Generate MIDI with 7 tracks.</li>
            <li>Render and sync.</li>
          </ol>
        </section>

        <section>
          <h3 className="font-semibold text-white mb-1">Color → Instrument</h3>
          <ul className="grid grid-cols-2 gap-1 text-sm text-white/80">
            <li>🔴 Red — Bass</li>
            <li>🟠 Orange — Piano</li>
            <li>🟡 Yellow — Strings</li>
            <li>🟢 Green — Flute</li>
            <li>🔵 Blue — Cello</li>
            <li>🟣 Purple — Synth</li>
            <li>⚪ White — Bells</li>
          </ul>
        </section>

        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40 hover:bg-cyan-500/30"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}