import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pickLine } from '../data/spiritLines';
import { useA11y } from './AccessibilityProvider';

export default function SpiritOfEarth({ datasetId }) {
  const { enabled, speak } = useA11y();
  const [line, setLine] = useState('');
  const [direction, setDirection] = useState('south');
  const spiritRef = useRef(null);

  useEffect(() => {
    if (!datasetId) return;
    const text = pickLine(datasetId);
    setLine(text);
    if (enabled) speak(text);
  }, [datasetId, enabled, speak]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!spiritRef.current) return;

      const rect = spiritRef.current.getBoundingClientRect();
      const spiritX = rect.left + rect.width / 2;
      const spiritY = rect.top + rect.height / 2;

      const dx = e.clientX - spiritX;
      const dy = e.clientY - spiritY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      let newDirection = 'south';
      if (angle >= -22.5 && angle < 22.5) newDirection = 'east';
      else if (angle >= 22.5 && angle < 67.5) newDirection = 'south-east';
      else if (angle >= 67.5 && angle < 112.5) newDirection = 'south';
      else if (angle >= 112.5 && angle < 157.5) newDirection = 'south-west';
      else if (angle >= 157.5 || angle < -157.5) newDirection = 'west';
      else if (angle >= -157.5 && angle < -112.5) newDirection = 'north-west';
      else if (angle >= -112.5 && angle < -67.5) newDirection = 'north';
      else if (angle >= -67.5 && angle < -22.5) newDirection = 'north-east';

      setDirection(newDirection);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-end gap-3 max-w-sm">
      <AnimatePresence>
        {line && (
          <motion.div
            key={line}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-black/70 backdrop-blur border border-cyan-400/40 rounded-lg p-3 text-sm text-cyan-100 shadow-lg"
            role="note"
            aria-live="polite"
          >
            <span className="font-semibold text-cyan-300">Spirit of Earth: </span>
            {line}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={spiritRef}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
        className="w-24 h-24 flex-shrink-0 cursor-pointer"
      >
        <img
          key={direction}
          src={`/images/${direction}.png`}
          alt=""
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
          style={{ imageRendering: 'pixelated' }}
          onError={(e) => {
            e.target.src = '/images/south.png';
          }}
        />
      </motion.div>
    </div>
  );
}