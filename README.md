# Mixvoip Cyber Suite

A multilingual (EN/DE/FR) React single-page application for Mixvoip's cybersecurity product suite. The app presents three interconnected services — **CyberAssistance**, **CyberAdvisory**, and **SOC as a Service** — as a unified ecosystem of protection for SMEs.

## Live URLs

The application is deployed under `mixvoip.com/go/cyber/` with language-prefixed routes:

| Page | URL Pattern |
|------|-------------|
| CyberAssistance | `/go/cyber/{lang}/assistance` |
| CyberAdvisory | `/go/cyber/{lang}/advisor` |
| SOC as a Service | `/go/cyber/{lang}/socaas` |

Where `{lang}` is `en`, `de`, or `fr`. Root `/go/cyber/` redirects to `/go/cyber/en/assistance`.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Routing**: Wouter (client-side SPA routing with base path support)
- **Server**: Node.js / Express (static file serving + SPA fallback)
- **Animations**: Framer Motion

## Features

- **Three dedicated pages** with unique content, pricing tables, and partner branding (Le Foyer, Luxgap, RSecure)
- **Ecosystem circle** — interactive visual showing how the four pillars (Assistance, Advisory, Assurance, SOC) work together; clickable nodes navigate between pages
- **Multilingual** — full EN/DE/FR translations with language switcher in the header; language persisted in URL path
- **Fit4Cyber assessment** — interactive self-assessment calculator
- **Cross-navigation** — bottom section on each page linking to the other two services with `#pricing` anchor scroll
- **Responsive design** — mobile-first layout with Tailwind breakpoints

## Project Structure

```
cyber-assistance/
├── client/
│   ├── public/              # Static assets (images, fonts, favicon)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ui/          # shadcn/ui primitives
│   │   │   ├── CyberSuite.tsx       # Ecosystem circle
│   │   │   ├── CrossNavigation.tsx  # Inter-page navigation
│   │   │   ├── PricingSection.tsx   # CyberAssistance pricing
│   │   │   ├── AdvisoryPricing.tsx  # CyberAdvisory pricing
│   │   │   ├── SocPricing.tsx       # SOC pricing
│   │   │   ├── Header.tsx           # Site header + language switcher
│   │   │   ├── Footer.tsx           # Site footer
│   │   │   └── ...
│   │   ├── contexts/
│   │   │   └── LanguageContext.tsx   # i18n context + all translations
│   │   ├── hooks/
│   │   │   └── useHashScroll.ts     # Hash fragment scroll on page load
│   │   ├── pages/
│   │   │   ├── Home.tsx             # CyberAssistance page
│   │   │   ├── AdvisorPage.tsx      # CyberAdvisory page
│   │   │   └── SocaasPage.tsx       # SOC as a Service page
│   │   ├── App.tsx                  # Routes, base path, language helpers
│   │   ├── main.tsx                 # React entry point
│   │   └── index.css                # Global styles + Tailwind config
│   └── index.html
├── server/
│   └── index.ts             # Express server (static files + SPA fallback)
├── deploy/
│   ├── README.md            # Detailed deployment instructions
│   ├── nginx-cyber.conf     # Nginx reverse proxy configuration
│   └── cyber-assistance.service  # Systemd service file
├── vite.config.ts           # Vite config (base: '/go/cyber/')
├── tsconfig.json
└── package.json
```

## Development

### Prerequisites

- Node.js 18+ (tested with 22.x)
- pnpm

### Setup

```bash
git clone https://github.com/mixvoip-manus/cyberassistant.git
cd cyberassistant
pnpm install
```

### Run dev server

```bash
pnpm dev
```

The dev server starts at `http://localhost:3000`. Note: in development, the app runs at the root path; the `/go/cyber/` base path applies only to production builds.

### Type checking

```bash
pnpm check
```

### Build for production

```bash
pnpm build
```

Output:
- `dist/public/` — static frontend assets (HTML, CSS, JS, images)
- `dist/index.js` — Node.js server entry point

### Run production build locally

```bash
pnpm start
# or with custom port:
PORT=4200 pnpm start
```

Then visit `http://localhost:3000/go/cyber/en/assistance` (or your custom port).

## Deployment

The `deploy/` folder contains everything needed for production deployment:

| File | Purpose |
|------|---------|
| `deploy/README.md` | Step-by-step deployment guide |
| `deploy/nginx-cyber.conf` | Nginx location block for reverse proxy (+ static mode alternative) |
| `deploy/cyber-assistance.service` | Systemd service file (runs as www-data, PORT=4200) |

### Quick deploy

```bash
# On the server:
git clone https://github.com/mixvoip-manus/cyberassistant.git /opt/cyber-assistance
cd /opt/cyber-assistance
pnpm install
pnpm build

# Copy and enable systemd service
sudo cp deploy/cyber-assistance.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now cyber-assistance

# Add nginx config and reload
sudo cp deploy/nginx-cyber.conf /etc/nginx/snippets/cyber.conf
# Include in your server block: include snippets/cyber.conf;
sudo nginx -t && sudo systemctl reload nginx
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Port the Node.js server listens on |
| `NODE_ENV` | — | Set to `production` for production builds |

## Routing Architecture

The app uses Wouter with a base path of `/go/cyber`. All internal navigation via `<Link>` components uses paths relative to the base (e.g., `/en/assistance`). Only `<a href>` tags (used in CrossNavigation for hash fragment support) include the full base path.

Language switching preserves the current page and hash fragment:
- `/go/cyber/en/advisor#pricing` → switch to FR → `/go/cyber/fr/advisor#pricing`

## Partners

| Partner | Service | Logo |
|---------|---------|------|
| **Le Foyer** | CyberAssurance (insurance) | Highlighted on CyberAssistance page |
| **Luxgap** | CyberAdvisory (compliance) | Highlighted on CyberAdvisory page |
| **RSecure** | SOC as a Service (monitoring) | Highlighted on SOC page |

## License

Proprietary — Mixvoip S.A.
