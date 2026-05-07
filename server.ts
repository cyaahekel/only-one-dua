import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Global Stats (In-memory for this applet)
  let stats = {
    totalDownloads: 0,
    activeSessions: 0,
    lastUpdate: new Date().toISOString()
  };

  // Spotify Integration
  let spotifyToken = "";
  let tokenExpiry = 0;

  const getSpotifyToken = async () => {
    if (Date.now() < tokenExpiry) return spotifyToken;
    
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!client_id || !client_secret) return null;

    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');

      const response = await axios.post('https://accounts.spotify.com/api/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
        }
      });

      spotifyToken = response.data.access_token;
      tokenExpiry = Date.now() + (response.data.expires_in * 1000);
      return spotifyToken;
    } catch (error) {
      console.error('Spotify Auth Error');
      return null;
    }
  };

  // API Routes
  app.get("/api/stats", (req, res) => {
    res.json(stats);
  });

  app.get("/api/spotify/search", async (req, res) => {
    const query = req.query.q || 'Viral Hits';
    const token = await getSpotifyToken();

    if (!token) {
      return res.status(500).json({ error: 'Spotify credentials missing' });
    }

    try {
      const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search Spotify' });
    }
  });

  app.post("/api/track", (req, res) => {
    stats.totalDownloads += 1;
    stats.lastUpdate = new Date().toISOString();
    res.json({ success: true });
  });

  app.post("/api/admin/login", (req, res) => {
    const { passcode } = req.body;
    // Simple admin passcode for demo
    if (passcode === "admin123") {
      res.json({ success: true, token: "admin-token-mock-2026" });
    } else {
      res.status(401).json({ success: false, message: "Invalid passcode" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
