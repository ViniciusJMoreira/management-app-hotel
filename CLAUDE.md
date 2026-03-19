# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test runner is configured.

## Environment

Requires a `.env.local` file with:
- `SUPABASE_URL`
- `SUPABASE_KEY`

## Architecture

This is a Next.js 16 hotel management app ("The Wild Oasis") using the App Router with a feature-based folder structure.

### Routing

```
/                          → Welcome page
/dashboard                 → Dashboard home
/dashboard/bookings        → Bookings list
/dashboard/cabins          → Cabins list (with discount filter)
/dashboard/cabins/new-cabin → Create cabin
/dashboard/cabins/[cabinId] → Edit cabin (static params + dynamic metadata)
```

### Folder conventions

- `app/_components/` — Shared UI components (buttons, spinner, sidebar, navbar)
- `app/_features/` — Feature modules, each containing: API functions, React Query hooks, Server Actions, Zod schemas, and feature-specific components
- `app/_lib/` — Supabase client (`supabase.js`), date/currency helpers (`helpers.js`), Zod error converter (`zod-errors.js`)
- `app/_style/` — Global CSS with Tailwind imports and CSS custom properties

### Data flow

- **Read:** Server functions in `api*.js` files (marked `"use server"`) → consumed by React Query hooks (`use*.js`) → rendered in Suspense-wrapped components
- **Write:** Server Actions in `actions.js` → called directly from React Hook Form's `handleSubmit` → return `{ ok, fieldErrors, error, redirectTo }`
- **Cache:** React Query keys `["cabins"]` and `["bookings"]`; invalidated after mutations

### Key patterns

- **Forms:** `react-hook-form` + `zod` validation; `issuesToErrors()` in `_lib/zod-errors.js` converts Zod issues to field errors; server actions set field errors via `setError()`
- **File upload:** Client preview with `URL.createObjectURL()`, 5MB limit (configured in `next.config.mjs`), uploads to Supabase Storage bucket `cabin-images`
- **Images:** Next.js `<Image>` with `remotePatterns` for `kcnhnlzcqjmhbpensobk.supabase.co`
- **Loading states:** `loading.js` files for route-level skeletons; `<Suspense>` with spinner fallback for async components; dynamic `key` on Suspense to reset on search param change
- **Toasts:** `react-hot-toast` via `ToasterContext` provider in root layout

### Database (Supabase)

Tables: `cabins`, `cabins_with_status` (view), `bookings`, `guests`
Bookings are queried with relations: `bookings.select("*, cabins(*), guests(*)")`

### Styling

Tailwind CSS v4 via PostCSS. CSS custom properties for brand colors defined in `globals.css`. Dark mode via `prefers-color-scheme`.

### React Compiler

`reactCompiler: true` is enabled in `next.config.mjs` — avoid manual `useMemo`/`useCallback` optimizations.
