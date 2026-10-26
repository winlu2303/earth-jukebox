import { useRef, useEffect, useState } from 'react';
import { useColorAnalysis } from '../hooks/useColorAnalysis';
import ColorChart from './ColorChart';

export default function VideoPlayer({ src, title, onPlay, onPause }) {
  const videoRef = useRef();
  const { analyzeFrame } = useColorAnalysis();
  const [liveColors, setLiveColors] = useState([]);
  
  const isYouTube = src.includes('youtu.be') || src.includes('youtube.com');

  useEffect(() => {
    if (isYouTube) return;
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
  }, [analyzeFrame, isYouTube]);

  useEffect(() => {
    if (isYouTube) return;
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [src, isYouTube]);

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split('/').pop().split('?')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&loop=1&playlist=${videoId}`;
  };

  if (isYouTube) {
    return (
      <div className="space-y-4 fade-in">
        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 aspect-video">
          <iframe
            src={getYouTubeEmbedUrl(src)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            aria-label={`Sonified video: ${title}`}
          />
        </div>
        <p className="text-center text-xs text-white/40">
          YouTube streams are not analyzed live. Static color chart below.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 fade-in">
      <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
        <video
          ref={videoRef}
          controls
          loop
          autoPlay
          muted
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