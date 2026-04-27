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

  // Serve static assets (JS, CSS, images) under /go/cyber/
  app.use("/go/cyber", express.static(staticPath));

  // Handle client-side routing - serve index.html for all /go/cyber/* routes
  app.get("/go/cyber/*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // Redirect root to /go/cyber/
  app.get("/", (_req, res) => {
    res.redirect("/go/cyber/en/assistance");
  });

  // Configurable port via environment variable
  const port = parseInt(process.env.PORT || "3000", 10);

  server.listen(port, () => {
    console.log(`CyberAssistance server running on http://localhost:${port}/go/cyber/`);
  });
}

startServer().catch(console.error);
