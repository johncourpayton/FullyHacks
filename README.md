# OceanGuard

OceanGuard is a hackathon MVP shell for building ocean-risk visualizations on a daytime 3D globe.

## Stack

- React + Vite
- Tailwind CSS
- ArcGIS Maps SDK for JavaScript
- Node.js + Express

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```

The frontend runs at `http://localhost:5173`.
The Express API runs at `http://localhost:4000`.

In GitHub Codespaces or github.dev forwarded ports, open the URL ending in `-5173.app.github.dev` for the dashboard. A URL ending in `-4000.app.github.dev` is only the backend API.
