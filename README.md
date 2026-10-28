# EnergyTrack frontend

Responsive TanStack Start + React frontend for household energy usage and optimization. It calls the Express API in the sibling `../backend` folder; Supabase is not used at runtime.

## Pages

- `/` — landing page
- `/login`, `/register`, `/forgot-password`, `/reset-password` — authentication and recovery
- `/dashboard`, `/appliances`, `/forecast`, `/bill-forecast`, `/anomalies`, `/calendar`, `/challenges`, `/recommendations`, `/reports`, `/simulator`, `/upgrade-planner`, `/profile`, `/settings` — signed-in energy tools and account pages

## Local development

From this folder, install frontend dependencies with `npm install` and API dependencies with `npm --prefix ../backend install`. Set `VITE_API_URL=http://localhost:5000` in this folder's `.env`. Set MongoDB and JWT values directly in `../backend/.env`, then start MongoDB. Run both apps with `npm run dev:full`. To run each service separately, use `npm run dev` here and `npm run dev` inside `../backend`.

## Vercel

Create a Vercel project with this `frontend/` folder as its root. Nitro's Vercel preset builds the TanStack Start app. Set `VITE_API_URL` to the deployed backend origin, without a trailing slash. All frontend API calls use this base URL through `src/lib/api.ts`. Deploy the `backend/` folder as a separate Vercel project and configure its MongoDB, JWT, frontend origin, and optional SMTP environment variables there.
