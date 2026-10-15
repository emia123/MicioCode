const fs = require('fs');
let code = `import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Redirect for 404 pages
if (window.location.pathname !== '/' && window.location.pathname !== '/index.html' && window.location.pathname !== '/not_found.html') {
  window.location.href = '/not_found.html';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`;

fs.writeFileSync('src/main.tsx', code);
