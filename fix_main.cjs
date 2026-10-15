const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

const redirectCode = `
// Redirect for 404 pages
if (window.location.pathname !== '/' && window.location.pathname !== '/index.html' && window.location.pathname !== '/not_found.html') {
  window.location.href = '/not_found.html';
}

createRoot`;

code = code.replace('createRoot', redirectCode);

fs.writeFileSync('src/main.tsx', code);
