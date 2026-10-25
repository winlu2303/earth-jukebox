import { useCallback, useEffect, useRef, useState } from 'react';

export function useSpeech() {
  const [supported, setSupported] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const utteranceRef = useRef(null);

  useEffect(() => {
    setSupported('speechSynthesis' in window);
    // Отключаем TTS, если пользователь prefers-reduced-motion (замена для аудиочувствительных)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) setEnabled(false);
  }, []);

  const speak = useCallback((text, opts = {}) => {
    if (!supported || !enabled || !text) return;
    window.speechSynthesis.cancel(); // не перебиваем сами себя
    const u = new SpeechSynthesisUtterance(text);
    u.lang = opts.lang || 'en-US';
    u.rate = opts.rate ?? 0.95;
    u.pitch = opts.pitch ?? 1;
    u.volume = opts.volume ?? 0.9;
    u.onend = opts.onEnd;
    utteranceRef.current = u;
    window.speechSynthesis.speak(u);
  }, [supported, enabled]);

  const stop = useCallback(() => window.speechSynthesis?.cancel(), []);

  return { speak, stop, supported, enabled, setEnabled };
}