import { useCallback, useEffect, useRef, useState } from 'react';

// 🎨 Палитра: ключ = цвет, value = { rgb, instrument }
export const COLOR_PALETTE = {
  red:    { rgb: [239, 68, 68],   instrument: 'Bass'    },
  orange: { rgb: [249, 115, 22],  instrument: 'Piano'   },
  yellow: { rgb: [234, 179, 8],   instrument: 'Strings' },
  green:  { rgb: [34, 197, 94],   instrument: 'Flute'   },
  blue:   { rgb: [59, 130, 246],  instrument: 'Cello'   },
  purple: { rgb: [168, 85, 247],  instrument: 'Synth'   },
  white:  { rgb: [229, 231, 235], instrument: 'Bells'   },
};

function nearestColor(r, g, b) {
  let best = null;
  let bestDist = Infinity;
  for (const [key, { rgb }] of Object.entries(COLOR_PALETTE)) {
    const dr = r - rgb[0];
    const dg = g - rgb[1];
    const db = b - rgb[2];
    const dist = dr * dr + dg * dg + db * db;
    if (dist < bestDist) {
      bestDist = dist;
      best = key;
    }
  }
  return best;
}

/**
 * Хук: analyzeFrame(source) → [{ color, instrument, percent }, ...]
 * source: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement
 */
export function useColorAnalysis() {
  const canvasRef = useRef(null);
  const [result, setResult] = useState([]);

  useEffect(() => {
    canvasRef.current = document.createElement('canvas');
  }, []);

  const analyzeFrame = useCallback((source, sampleStride = 4) => {
    const canvas = canvasRef.current;
    if (!canvas || !source) return [];

    const w = source.videoWidth || source.naturalWidth || source.width;
    const h = source.videoHeight || source.naturalHeight || source.height;
    if (!w || !h) return [];

    // Уменьшаем картинку, чтобы быстро считать
    const scale = 120 / Math.max(w, h);
    canvas.width = Math.round(w * scale);
    canvas.height = Math.round(h * scale);

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const counts = {};
    let total = 0;

    for (let i = 0; i < data.length; i += 4 * sampleStride) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a < 128) continue;                  // прозрачные
      if (r < 20 && g < 20 && b < 30) continue; // фон (тёмно-синий космос)
      const key = nearestColor(r, g, b);
      counts[key] = (counts[key] || 0) + 1;
      total++;
    }

    if (total === 0) {
      setResult([]);
      return [];
    }

    const out = Object.entries(COLOR_PALETTE)
      .map(([color, meta]) => ({
        color,
        instrument: meta.instrument,
        percent: +(((counts[color] || 0) / total) * 100).toFixed(1),
      }))
      .filter((x) => x.percent > 0)
      .sort((a, b) => b.percent - a.percent);

    setResult(out);
    return out;
  }, []);

  return { analyzeFrame, result, COLOR_PALETTE };
}