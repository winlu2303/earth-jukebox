import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AccessibilityProvider } from './components/AccessibilityProvider';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AccessibilityProvider>
      <App />
    </AccessibilityProvider>
  </StrictMode>
);