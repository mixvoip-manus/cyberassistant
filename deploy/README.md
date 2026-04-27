# CyberAssistance — Deployment Guide

## Overview

The CyberAssistance web application is a React SPA served by a minimal Node.js/Express server. It runs under the path `/go/cyber/` and supports multi-language routing (EN/DE/FR).

## URLs

| Page | Path |
|------|------|
| CyberAssistance | `/go/cyber/{lang}/assistance` |
| CyberAdvisory | `/go/cyber/{lang}/advisor` |
| SOC as a Service | `/go/cyber/{lang}/socaas` |

Where `{lang}` is one of: `en`, `de`, `fr`

Root (`/go/cyber/`) redirects to `/go/cyber/en/assistance`.

---

## Prerequisites

- Node.js 18+ (tested with 22.x)
- pnpm (or npm)
- Nginx (reverse proxy)

---

## Build & Install

```bash
# Clone the repository
git clone git@github.com:mixvoip-manus/cyberassistant.git /opt/cyber-assistance
cd /opt/cyber-assistance

# Install dependencies
pnpm install

# Build for production
pnpm build
```

This produces:
- `dist/public/` — static frontend assets (HTML, CSS, JS, images)
- `dist/index.js` — Node.js server entry point

---

## Configuration

### Port (Environment Variable)

Set the `PORT` environment variable to configure which port the Node.js server listens on. Default is `3000`.

```bash
# Option 1: Inline
PORT=4200 node dist/index.js

# Option 2: In systemd service file (see deploy/cyber-assistance.service)
Environment=PORT=4200

# Option 3: Export before running
export PORT=4200
node dist/index.js
```

---

## Systemd Service

Copy the service file and enable it:

```bash
sudo cp deploy/cyber-assistance.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable cyber-assistance
sudo systemctl start cyber-assistance
```

Check status:
```bash
sudo systemctl status cyber-assistance
sudo journalctl -u cyber-assistance -f
```

The service runs as `www-data` user. Adjust `User`, `Group`, and `WorkingDirectory` in the service file if your setup differs.

---

## Nginx Configuration

Add the location block to your existing Nginx server configuration:

```bash
sudo cp deploy/nginx-cyber.conf /etc/nginx/snippets/cyber.conf
```

Then include it in your server block:

```nginx
server {
    server_name mixvoip.com;
    # ... existing config ...

    include snippets/cyber.conf;
}
```

Or copy the relevant `location /go/cyber/` block directly into your existing config.

Then reload:
```bash
sudo nginx -t && sudo systemctl reload nginx
```

### Two deployment modes available:

1. **Proxy mode** (default): Nginx proxies to Node.js → Node.js serves static files + handles SPA routing
2. **Static mode** (faster): Nginx serves static files directly from `dist/public/`, with `try_files` fallback to `index.html`

See `deploy/nginx-cyber.conf` for both configurations (static mode is commented out).

---

## Update Procedure

```bash
cd /opt/cyber-assistance
git pull
pnpm install
pnpm build
sudo systemctl restart cyber-assistance
```

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| 404 on direct URL access | Nginx not forwarding to Node.js | Check `location /go/cyber/` block |
| Blank page | Assets loading from wrong path | Verify `base: '/go/cyber/'` in vite.config.ts |
| Port conflict | Another service on same port | Change `PORT` env variable |
| CSS/JS not loading | Cached old assets | Hard refresh (Ctrl+Shift+R) or clear browser cache |
