# EnergyTrack frontend

React 19 single page application built with Vite. It calls the Express API in the sibling `../backend` folder; Supabase is not used at runtime.

## Pages

- `/` — landing page
- `/login`, `/register`, `/forgot-password`, `/reset-password` — authentication and recovery
- `/dashboard`, `/appliances`, `/forecast`, `/bill-forecast`, `/anomalies`, `/calendar`, `/challenges`, `/recommendations`, `/reports`, `/simulator`, `/upgrade-planner`, `/profile`, `/settings` — signed-in energy tools and account pages

## Local development

Install frontend dependencies with `npm install` and API dependencies with `npm --prefix ../backend install`. Set `VITE_API_URL=http://localhost:5000` in this folder's `.env`. Set MongoDB and JWT values in `../backend/.env`, then start MongoDB. Run both apps with `npm run dev:full`, or run `npm run dev` here and `npm run dev` inside `../backend`.

## Vercel

Create a Vercel project with this `frontend/` folder as its root. The build command is `npm run build` and the output directory is `dist`. Set `VITE_API_URL` in the Vercel project environment variables to the deployed backend origin, without a trailing slash. Deploy `backend/` as a separate Vercel project and configure its MongoDB, JWT, frontend origin, and optional SMTP environment variables there.
