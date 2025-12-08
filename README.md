# SSO Demo — Vite + React + Tailwind

A lightweight, presentation‑ready website to showcase Single Sign‑On (SSO) concepts with interactive login, diagrams, and overview content.

## Features
- React + TypeScript + Vite
- Tailwind CSS for styling and theming (with scroll‑in animations via framer‑motion)
- React Router for multi‑page navigation
- Axios API layer with a simple token interceptor
- Interactive mock login flow that simulates an Authorization Code + PKCE journey

## Getting Started

1. Install dependencies
```
npm install
```

2. (Optional) Set API base URL for axios
Create a `.env` file (or set an environment variable) if you want to point at a real API:
```
VITE_API_BASE_URL=https://your-api.example.com
```
The demo login/profile are mocked; if you point to a real API, adjust `src/lib/api/auth.ts` accordingly.

3. Start dev server
```
npm run dev
```

4. Build for production
```
npm run build
npm run preview
```

## Project Structure (key parts)
- `src/App.tsx` — App shell, nav, and routing
- `src/pages/*` — Pages for Home, Overview, Diagrams, Login Demo
- `src/components/AnimatedSection.tsx` — Scroll‑in animation wrapper
- `src/lib/api/client.ts` — Axios instance and token handling
- `src/lib/api/auth.ts` — Mock login/profile calls (easily replace with real endpoints)
- `tailwind.config.js` + `postcss.config.js` — Tailwind/PostCSS config (bridged to provided custom files)

## Notes
- Dark mode uses the OS preference by default (Tailwind `dark:` variants). Add a class toggler if desired.
- The “Login Demo” simulates steps; no real credentials are sent anywhere by default.

## Presentation Tips
- Start at Home → Overview → Diagrams → Login Demo.
- Use the Login Demo to narrate redirect, callback, code exchange, and token storage.
