import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import fs from "fs/promises";

// Database storage file
const DB_FILE = path.join(process.cwd(), 'database.json');
const TOKENS_FILE = path.join(process.cwd(), 'tokens.json');

// In-memory representation
let db = {
  users: [] as any[],
  projects: [] as any[]
};

let tokens = new Map<string, string>(); // token -> userId

async function setupDatabase() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    db = JSON.parse(data);
    
    // Load tokens
    try {
      const tokensData = await fs.readFile(TOKENS_FILE, 'utf-8');
      const tokensObj = JSON.parse(tokensData);
      tokens = new Map(Object.entries(tokensObj));
    } catch (err: any) {
      if (err.code !== 'ENOENT') {
        console.error("Errore lettura tokens:", err);
      }
    }
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      // Create empty db file
      await saveDatabase();
    } else {
      console.error("Errore lettura database:", err);
    }
  }
}

async function saveDatabase() {
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  // Save tokens
  await fs.writeFile(TOKENS_FILE, JSON.stringify(Object.fromEntries(tokens)), 'utf-8');
}

async function startServer() {
  await setupDatabase();
  
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: "50mb" }));

  // --- API Routes ---

  // Register Route
  app.post("/api/auth/register", async (req, res) => {
    const { username, email, password, birthDate, country } = req.body;
    
    if (!username || !email || !password || !birthDate || !country) {
      return res.status(400).json({ error: "Tutti i campi sono richiesti." });
    }

    try {
      const existingUser = db.users.find(u => u.username === username || u.email === email);
      if (existingUser) {
        return res.status(400).json({ error: "Username o email già in uso." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = uuidv4();
      
      const newUser = { 
        id: userId, 
        username, 
        email, 
        password: hashedPassword,
        birthDate,
        country,
        createdAt: Date.now()
      };
      db.users.push(newUser);
      await saveDatabase();

      const token = crypto.randomBytes(32).toString("hex");
      tokens.set(token, userId);

      res.json({ token, user: { id: userId, username, email } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Errore durante la registrazione." });
    }
  });

  // Sync Social Login Route
  app.post("/api/auth/sync", async (req, res) => {
    const { userId, username, email } = req.body;
    
    if (!userId || !username) {
      return res.status(400).json({ error: "Dati mancanti per la sincronizzazione." });
    }

    try {
      let user = db.users.find(u => u.id === userId);
      if (!user) {
        user = { 
          id: userId, 
          username, 
          email: email || "", 
          social: true,
          createdAt: Date.now() 
        };
        db.users.push(user);
        await saveDatabase();
      }

      // Register the userId as a valid token for this session
      tokens.set(userId, userId);

      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Errore durante la sincronizzazione." });
    }
  });

  // Login Route
  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Email e password richieste" });
    }

    try {
      const user = db.users.find(u => u.email === email);
      if (!user) {
        return res.status(401).json({ error: "Email o password errati." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Email o password errati." });
      }

      const token = crypto.randomBytes(32).toString("hex");
      tokens.set(token, user.id);
      await saveDatabase();

      res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Errore durante il login." });
    }
  });

  app.get("/api/auth/me", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || !tokens.has(token)) {
      return res.status(401).json({ error: "Non autorizzato" });
    }

    const userId = tokens.get(token)!;
    try {
      const user = db.users.find(u => u.id === userId);
      if (!user) return res.status(401).json({ error: "Utente non trovato" });
      res.json({ user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
      res.status(500).json({ error: "Errore server" });
    }
  });

  // Get User's Projects
  app.get("/api/my-projects", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || !tokens.has(token)) {
      return res.status(401).json({ error: "Non autorizzato" });
    }

    const userId = tokens.get(token)!;
    try {
      const userProjects = db.projects.filter(p => p.authorId === userId)
        .sort((a, b) => b.createdAt - a.createdAt);
      res.json({ projects: userProjects });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Errore durante il recupero dei tuoi progetti." });
    }
  });

  // Delete a Project
  app.delete("/api/projects/:id", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || !tokens.has(token)) {
      return res.status(401).json({ error: "Non autorizzato" });
    }

    const userId = tokens.get(token)!;
    const { id } = req.params;
    console.log(`Deleting project ${id} for user ${userId}`);

    try {
      const projectIndex = db.projects.findIndex(p => p.id === id && p.authorId === userId);
      if (projectIndex === -1) {
        console.log(`Delete failed: Project ${id} not found for user ${userId}`);
        const exists = db.projects.find(p => p.id === id);
        if (exists) {
          console.log(`Project ${id} exists but authorId is ${exists.authorId}, expected ${userId}`);
          return res.status(403).json({ error: "Non hai i permessi per eliminare questo progetto (non sei l'autore)." });
        }
        return res.status(404).json({ error: "Progetto non trovato." });
      }

      db.projects.splice(projectIndex, 1);
      await saveDatabase();
      console.log(`Successfully deleted project ${id}`);
      res.json({ success: true });
    } catch (err) {
      console.error("Delete error:", err);
      res.status(500).json({ error: "Errore durante l'eliminazione." });
    }
  });

  // Upload Project Thumbnail
  app.post("/api/projects/:id/thumbnail", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || !tokens.has(token)) {
      return res.status(401).json({ error: "Non autorizzato" });
    }

    const userId = tokens.get(token)!;
    const { id } = req.params;
    const { thumbnail } = req.body;

    try {
      const project = db.projects.find(p => p.id === id && p.authorId === userId);
      if (!project) {
        return res.status(404).json({ error: "Progetto non trovato." });
      }

      project.data.thumbnail = thumbnail;
      await saveDatabase();
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Errore durante il salvataggio della copertina." });
    }
  });

  // Duplicate a Project
  app.post("/api/projects/:id/duplicate", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || !tokens.has(token)) {
      return res.status(401).json({ error: "Non autorizzato" });
    }

    const userId = tokens.get(token)!;
    const { id } = req.params;

    try {
      const project = db.projects.find(p => p.id === id && p.authorId === userId);
      if (!project) {
        return res.status(404).json({ error: "Progetto non trovato o non autorizzato." });
      }

      const newProjectId = uuidv4();
      const newProject = {
        ...project,
        id: newProjectId,
        title: `${project.title} (Copia)`,
        createdAt: Date.now()
      };

      db.projects.push(newProject);
      await saveDatabase();
      res.json({ success: true, project: newProject });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Errore durante la duplicazione." });
    }
  });

  // Get Published Projects
  app.get("/api/projects", async (req, res) => {
    try {
      // Sort projects by createdAt desc
      const sortedProjects = [...db.projects].sort((a, b) => b.createdAt - a.createdAt);
      // Data is already an object in memory
      res.json({ projects: sortedProjects });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Errore durante il recupero dei progetti." });
    }
  });

  // Publish a Project
  app.post("/api/projects", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || !tokens.has(token)) {
      return res.status(401).json({ error: "Devi effettuare il login per pubblicare progetti." });
    }

    const userId = tokens.get(token)!;
    
    try {
      const user = db.users.find(u => u.id === userId);
      if (!user) return res.status(401).json({ error: "Utente non trovato." });

      const { title, data, description, credits, tags } = req.body;

      if (!title || !data) {
        return res.status(400).json({ error: "Titolo e dati del progetto sono richiesti" });
      }

      const projectId = uuidv4();
      const createdAt = Date.now();
      
      const newProject = {
        id: projectId,
        title,
        description: description || "",
        credits: credits || "",
        tags: tags || [],
        authorId: userId,
        authorName: user.username,
        data,
        createdAt
      };

      db.projects.push(newProject);
      await saveDatabase();

      res.json({ 
        success: true, 
        project: newProject
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Errore durante la pubblicazione del progetto." });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const project = db.projects.find(p => p.id === id);
      if (!project) {
        return res.status(404).json({ error: "Progetto non trovato" });
      }
      res.json({ project });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Errore server" });
    }
  });

  // Get available sounds
  app.get("/api/sounds", async (req, res) => {
    try {
      const soundsPath = path.join(process.cwd(), "public", "sounds");
      const files = await fs.readdir(soundsPath);
      // Filter just for sound files (mp3, wav)
      const soundFiles = files.filter(file => file.endsWith(".mp3") || file.endsWith(".wav"));
      res.json({ sounds: soundFiles });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Errore durante il recupero dei suoni." });
    }
  });

  // Serve public assets (sprites, icons, etc.)
  app.use(express.static(path.join(process.cwd(), "public")));

  // --- Vite / Static File Serving ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("/", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    
    app.get("*", (req, res) => {
      res.status(404).sendFile(path.join(distPath, "not_found.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MicioCode server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

