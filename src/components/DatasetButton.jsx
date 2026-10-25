export default function DatasetButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label={`Select dataset: ${label}`}
      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
        active
          ? 'bg-cyan-500/20 border-cyan-400/60 shadow-lg shadow-cyan-500/20 text-white'
          : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/80'
      }`}
    >
      {label}
    </button>
  );
}