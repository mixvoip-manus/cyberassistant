import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Serve static assets (JS, CSS, images) under /cyber/
  app.use("/cyber", express.static(staticPath));

  // Handle client-side routing - serve index.html for all /cyber/* routes
  app.get("/cyber/*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // Redirect root to /cyber/
  app.get("/", (_req, res) => {
    res.redirect("/cyber/en/assistance");
  });

  // Configurable port and host via environment variables
  const port = parseInt(process.env.PORT || "3000", 10);
  const host = process.env.HOST || "127.0.0.1";

  server.listen(port, host, () => {
    console.log(`CyberAssistance server running on http://${host}:${port}/cyber/`);
  });
}

startServer().catch(console.error);
