import { useState } from 'react';
import DatasetButton from './components/DatasetButton';
import VideoPlayer from './components/VideoPlayer';
import LiveMap from './components/LiveMap';
import Legend from './components/Legend';
import ColorChart from './components/ColorChart';
import InstrumentMixer from './components/InstrumentMixer';
import DatasetInfoPanel from './components/DatasetInfoPanel';
import HowItWorksModal from './components/HowItWorksModal';
import AboutModal from './components/AboutModal';
import SpiritOfEarth from './components/SpiritOfEarth';
import ChatBot from './components/ChatBot';
import GuessGame from './components/GuessGame';
import WorldMap from './components/WorldMap';
import LiveCitySound from './components/LiveCitySound';
import StoryMode from './components/StoryMode';
import { useA11y } from './components/AccessibilityProvider';
import { datasets } from './data/datasets';
import { vibrate } from './utils/haptics';

export default function App() {
  const [dsKey, setDsKey] = useState('co');
  const [muted, setMuted] = useState({});
  const [showHiw, setShowHiw] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mode, setMode] = useState('video');

  const { announce, enabled, setEnabled } = useA11y();
  const dataset = datasets[dsKey];

  const onSelect = (key) => {
    vibrate([30, 50, 30]); 
    setDsKey(key);
    announce(`Now playing: ${datasets[key].label}. You will hear ${datasets[key].instruments.join(', ')}.`);
  };

  return (
    <main className="min-h-screen bg-[#0a0e27] text-white relative">
      <div className="stars" />
      
      <div className="relative z-10">
        <header className="pt-12 pb-8 text-center fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Earth Jukebox
          </h1>
          <p className="text-xl text-white/60">Turn NASA Data into Music</p>
          <p className="text-sm text-white/40 mt-2">by MindWave · NASA Space Apps Challenge 2026</p>

          <nav className="flex flex-wrap justify-center gap-2 mt-6">
            <button onClick={() => setShowStory(true)} className="px-4 py-2 rounded bg-purple-500/20 border border-purple-400/40 hover:bg-purple-500/30 text-sm font-medium">
              🌍 Story Mode
            </button>
            <button onClick={() => setShowHiw(true)} className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-sm">
              How it works
            </button>
            <button onClick={() => setShowAbout(true)} className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-sm">
              About
            </button>
            <button
              onClick={() => announce("Welcome to Earth Jukebox. This site turns NASA climate data into music. Use the buttons below to select a dataset. Press play on the video. You can toggle voice guide here.")}
              className="px-4 py-2 rounded bg-cyan-500/20 border border-cyan-400/40 hover:bg-cyan-500/30 text-sm"
            >
              🔊 Audio Guide
            </button>
          </nav>
        </header>

        <section className="max-w-6xl mx-auto px-6 mb-4">
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(datasets).map(([key, ds]) => (
              <DatasetButton key={key} active={key === dsKey} label={ds.label} onClick={() => onSelect(key)} />
            ))}
            <button
              onClick={() => setEnabled(!enabled)}
              aria-label={enabled ? 'Disable voice guide' : 'Enable voice guide'}
              aria-pressed={enabled}
              className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
            >
              🔊 {enabled ? 'Voice ON' : 'Voice OFF'}
            </button>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 mb-6">
          <div className="flex justify-center gap-3">
            <button onClick={() => setMode('video')} className={`px-6 py-2.5 rounded-xl border text-sm font-medium ${mode === 'video' ? 'bg-white/10 border-white/40 shadow-lg' : 'bg-white/5 border-white/10'}`}>
              🎬 Sonified Video
            </button>
            <button onClick={() => setMode('live')} className={`px-6 py-2.5 rounded-xl border text-sm font-medium ${mode === 'live' ? 'bg-white/10 border-white/40 shadow-lg' : 'bg-white/5 border-white/10'}`}>
              🛰️ Live NASA Data
            </button>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 mb-12">
          <div className="lg:col-span-2 space-y-4">
            {mode === 'video' ? (
              <VideoPlayer
                key={dsKey}
                src={dataset.video}
                title={dataset.label}
                mutedMap={muted}
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              />
            ) : (
              <LiveMap datasetId={dsKey} />
            )}
            <InstrumentMixer muted={muted} setMuted={setMuted} isPlaying={isVideoPlaying} />
            
            {/* Ссылки на NASA */}
            <div className="flex flex-wrap gap-3 mt-4">
              <a href={dataset.live} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10">🛰️ NASA SVS</a>
              <a href={dataset.api} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10">📊 API Data</a>
            </div>
          </div>

          <div className="space-y-4">
            <DatasetInfoPanel dataset={dataset} />
            <ColorChart data={dataset.colorPercent} />
            
            {/* Новые компоненты */}
            <GuessGame />
            <WorldMap />
            <LiveCitySound />
            <ChatBot />
            <Legend />
          </div>
        </section>

        <footer className="text-center py-8 text-white/40 text-sm border-t border-white/10">
          <p>Data: NASA GMAO · Sonification: MindWave</p>
          <p className="mt-1">© 2026 MindWave</p>
        </footer>
      </div>

      <SpiritOfEarth datasetId={dsKey} />
      <HowItWorksModal open={showHiw} onClose={() => setShowHiw(false)} />
      <AboutModal open={showAbout} onClose={() => setShowAbout(false)} />
      
      {/* Story Mode overlay */}
      {showStory && <StoryMode onClose={() => setShowStory(false)} />}
    </main>
  );
}