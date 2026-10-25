import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pickLine } from '../data/spiritLines';
import { useA11y } from './AccessibilityProvider';

export default function SpiritOfEarth({ datasetId }) {
  const { enabled, speak } = useA11y();
  const [line, setLine] = useState('');
  const [direction, setDirection] = useState('north'); // По умолчанию смотрит на нас
  const spiritRef = useRef(null);

  // 1. Логика реплик при смене датасета
  useEffect(() => {
    if (!datasetId) return;
    const text = pickLine(datasetId);
    setLine(text);
    if (enabled) speak(text);
  }, [datasetId, enabled, speak]);

  // 2. Логика слежения за мышкой
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!spiritRef.current) return;

      // Получаем координаты Духа на экране
      const rect = spiritRef.current.getBoundingClientRect();
      const spiritX = rect.left + rect.width / 2;
      const spiritY = rect.top + rect.height / 2;

      // Вычисляем угол от Духа к мышке
      const dx = e.clientX - spiritX;
      const dy = e.clientY - spiritY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI); // Угол от -180 до 180

      // Определяем направление (8 сторон). 
      // В файлах north - это фронт (смотрит на нас), south - спина.
      let newDirection = 'north';
      if (angle >= -22.5 && angle < 22.5) newDirection = 'east';        // Мышка справа
      else if (angle >= 22.5 && angle < 67.5) newDirection = 'south-east'; // Справа-снизу
      else if (angle >= 67.5 && angle < 112.5) newDirection = 'south';   // Снизу (спина)
      else if (angle >= 112.5 && angle < 157.5) newDirection = 'south-west'; // Слева-снизу
      else if (angle >= 157.5 || angle < -157.5) newDirection = 'west';  // Слева
      else if (angle >= -157.5 && angle < -112.5) newDirection = 'north-west'; // Слева-сверху
      else if (angle >= -112.5 && angle < -67.5) newDirection = 'north'; // Сверху (фронт)
      else if (angle >= -67.5 && angle < -22.5) newDirection = 'north-east'; // Справа-сверху

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
      
      {/* Спрайт Духа Земли */}
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
            e.target.src = '/images/north.png'; // Если файла нет, показываем фронт
          }}
        />
      </motion.div>
    </div>
  );
}