# Giveaway.club

A Next.js application that powers the Giveaway.club marketing site and creator dashboard. The app uses Supabase for
authentication and Tailwind CSS for styling.

## Getting started

1. Install dependencies

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and add your Supabase project details:

   ```ini
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. Run the development server

   ```bash
   npm run dev
   ```

## Authentication routing

- `/login` offers passwordless email and OAuth (Twitch + Google) flows powered by Supabase Auth helpers.
- `/auth/callback` exchanges Supabase auth codes for a session and redirects to the dashboard.
- `/dashboard` is protected via middleware; unauthenticated users are redirected to `/login`.
- `/api/logout` signs users out server-side and sends them back to the marketing homepage.

## Styling

Tailwind CSS is configured in `tailwind.config.ts` with custom colors and typography. Global styles live in
`src/styles/globals.css`.
