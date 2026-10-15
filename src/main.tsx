import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Redirect for 404 pages
try {
  if (
    typeof window !== 'undefined' &&
    window.location &&
    window.location.protocol.startsWith('http') &&
    window.location.pathname !== '/' &&
    window.location.pathname !== '/index.html' &&
    window.location.pathname !== '/not_found.html'
  ) {
    window.location.href = '/not_found.html';
  }
} catch (e) {
  // Ignore in sandboxed or restricted contexts
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
