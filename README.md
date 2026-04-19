# OceanGuard

OceanGuard is a hackathon MVP for tracking where animal migration paths intersect with ocean contamination zones.

## Stack

- React + Vite
- Tailwind CSS
- ArcGIS Maps SDK for JavaScript
- Node.js + Express
- Prisma ORM
- Neon PostgreSQL

## Local Setup

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run dev
```

The frontend runs at `http://localhost:5173`.
The Express API runs at `http://localhost:4000`.

The backend serves mock Movebank/NOAA-style data if the database is unavailable, so the dashboard can be previewed before connecting Neon.
