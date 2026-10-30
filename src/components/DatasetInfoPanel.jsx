import { useState } from 'react';
import { useA11y } from './AccessibilityProvider';
import { vibrate } from '../utils/haptics';

export default function DatasetInfoPanel({ dataset }) {
  const { speak } = useA11y();
  const [showLong, setShowLong] = useState(false);
  
  if (!dataset) return null;

  const text = showLong ? dataset.longDescription : dataset.description;

  return (
    <aside className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="text-cyan-300 font-semibold mb-1">{dataset.label} — how it sounds</h3>
      <p className="text-sm text-white/80 leading-relaxed">{text}</p>
      
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => {
            vibrate(20);
            speak(text);
          }}
          className="text-xs px-3 py-1 rounded bg-cyan-500/20 border border-cyan-400/40 hover:bg-cyan-500/30"
        >
          🔊 Read aloud
        </button>
        <button
          onClick={() => {
            vibrate(20);
            setShowLong(!showLong);
          }}
          className="text-xs px-3 py-1 rounded bg-white/10 border border-white/20 hover:bg-white/20"
        >
          {showLong ? 'Show less' : 'Read more'}
        </button>
      </div>
    </aside>
  );
}