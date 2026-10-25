import { useRef, useEffect, useState } from 'react';
import { useColorAnalysis } from '../hooks/useColorAnalysis';
import ColorChart from './ColorChart';

export default function VideoPlayer({ src, title, onPlay, onPause }) {
  const videoRef = useRef();
  const { analyzeFrame } = useColorAnalysis();
  const [liveColors, setLiveColors] = useState([]);

  useEffect(() => {
    let animationFrame;
    const tick = () => {
      if (videoRef.current && !videoRef.current.paused) {
        const colors = analyzeFrame(videoRef.current, 10);
        if (colors.length) setLiveColors(colors);
      }
      animationFrame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(animationFrame);
  }, [analyzeFrame]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      // Автоплей может быть заблокирован браузером, это нормально
      videoRef.current.play().catch(() => {});
    }
  }, [src]);

  return (
    <div className="space-y-4 fade-in">
      <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
        <video
          ref={videoRef}
          controls
          loop
          autoPlay
          muted // <--- ВАЖНО: видео играет без звука!
          playsInline
          onPlay={onPlay}
          onPause={onPause}
          className="w-full block"
          aria-label={`Sonified video: ${title}`}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <ColorChart data={liveColors} />
    </div>
  );
}