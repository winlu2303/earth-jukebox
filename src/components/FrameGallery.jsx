import { useState } from 'react';
import { motion } from 'framer-motion';

export default function FrameGallery({ datasetKey, frames = [] }) {
  const [active, setActive] = useState(null);

  if (!frames.length) {
    return (
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center text-white/60 text-sm">
        Frame gallery not available for this dataset yet.
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <h2 className="text-2xl font-semibold mb-2 text-center">
        🖼️ Visual Frames
      </h2>
      <p className="text-white/60 text-center mb-6 text-sm">
        Key moments from the {datasetKey.toUpperCase()} sonification — each frame
        is a snapshot of the data that became music.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {frames.map((frame, i) => (
          <motion.button
            key={frame.src}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setActive(active === i ? null : i)}
            className={`rounded-lg overflow-hidden border transition-all text-left ${
              active === i
                ? 'border-cyan-400 scale-105 shadow-lg shadow-cyan-500/20'
                : 'border-white/10 hover:border-white/30'
            }`}
            aria-label={`Frame ${i + 1}: ${frame.caption}`}
          >
            <img
              src={frame.src}
              alt={frame.alt}
              className="w-full h-32 object-cover"
              loading="lazy"
            />
            <div className="p-2 bg-black/40">
              <p className="text-xs font-semibold text-white">
                {frame.caption}
              </p>
              <p className="text-xs text-cyan-300/80">
                ♪ {frame.dominantInstrument}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {active !== null && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-4 rounded-lg bg-cyan-500/10 border border-cyan-400/20"
        >
          <p className="text-sm text-white/90">
            <strong>{frames[active].caption}.</strong> {frames[active].description}
          </p>
        </motion.div>
      )}
    </div>
  );
}