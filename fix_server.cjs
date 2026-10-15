const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const target = `    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });`;

const replacement = `    app.get("/", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    
    app.get("*", (req, res) => {
      res.status(404).sendFile(path.join(distPath, "not_found.html"));
    });`;

code = code.replace(target, replacement);
fs.writeFileSync('server.ts', code);
