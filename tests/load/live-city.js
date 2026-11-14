import { useCallback, useEffect, useRef, useState } from 'react';

export function useSpeech() {
  const [supported, setSupported] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const utteranceRef = useRef(null);
  const synthRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      setSupported(true);
    }
  }, []);

  const speak = useCallback((text, opts = {}) => {
    if (!text) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!enabled) return;

    const synth = window.speechSynthesis;
    synth.cancel();

    const u = new SpeechSynthesisUtterance(text);
    u.lang = opts.lang || 'en-US';
    u.rate = opts.rate ?? 0.95;
    u.pitch = opts.pitch ?? 1;
    u.volume = opts.volume ?? 0.9;

    if (opts.onEnd) u.onend = opts.onEnd;
    if (opts.onError) u.onerror = opts.onError;
    if (opts.onBoundary) u.onboundary = opts.onBoundary;

    utteranceRef.current = u;

    try {
      synth.speak(u);
    } catch (err) {
      console.warn('[useSpeech] speak() failed:', err);
    }
  }, [enabled]); // зависимость только от enabled, supported проверяем в момент вызова

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return { speak, stop, supported, enabled, setEnabled };
}