import { createContext, useContext, useState } from 'react';
import { useSpeech } from '../hooks/useSpeech';

const A11yContext = createContext(null);

export function AccessibilityProvider({ children }) {
  const speech = useSpeech();
  const [announcement, setAnnouncement] = useState('');

  const announce = (text) => {
    setAnnouncement(text);
    speech.speak(text);
  };

  return (
    <A11yContext.Provider value={{ ...speech, announce }}>
      <div aria-live="polite" aria-atomic="true" className="sr-only" role="status">
        {announcement}
      </div>
      {children}
    </A11yContext.Provider>
  );
}

export const useA11y = () => {
  const ctx = useContext(A11yContext);
  if (!ctx) {
    throw new Error('useA11y must be used inside <AccessibilityProvider>');
  }
  return ctx;
};