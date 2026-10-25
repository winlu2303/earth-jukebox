import { useA11y } from './AccessibilityProvider';

export default function DatasetInfoPanel({ dataset }) {
  const { speak } = useA11y();
  if (!dataset) return null;

  const text =
    dataset.description ||
    `You are listening to ${dataset.label}.`;

  return (
    <aside
      aria-labelledby="ds-info-title"
      className="bg-white/5 border border-white/10 rounded-xl p-4"
    >
      <h3
        id="ds-info-title"
        className="text-cyan-300 font-semibold mb-1"
      >
        {dataset.label} — how it sounds
      </h3>
      <p className="text-sm text-white/80 leading-relaxed">{text}</p>
      <button
        onClick={() => speak(text)}
        className="mt-3 text-xs px-3 py-1 rounded bg-cyan-500/20 border border-cyan-400/40 hover:bg-cyan-500/30"
        aria-label="Read description aloud"
      >
        🔊 Read aloud
      </button>
    </aside>
  );
}