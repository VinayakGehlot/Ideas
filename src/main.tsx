import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Register Monetag Service Worker exactly as supplied on website load
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Monetag ServiceWorker registered successfully with scope:', registration.scope);
      })
      .catch((error) => {
        console.warn('Monetag ServiceWorker registration failed:', error);
      });
  });
}

