# The Wild Oasis — Hotel Management App

A full-stack hotel management application for internal staff to manage cabins, bookings, and guests.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** JavaScript (React 19)
- **Database & Storage:** Supabase (PostgreSQL + file storage)
- **Styling:** Tailwind CSS v4
- **State Management:** TanStack React Query v5
- **Forms:** React Hook Form + Zod validation
- **Animations:** Motion (Framer Motion)
- **UI:** Headless UI, Heroicons
- **Notifications:** React Hot Toast

## Features

- **Cabin Management** — Create, edit, and delete cabins with image upload, pricing, capacity, and discount configuration
- **Bookings Overview** — View all bookings with guest details, cabin info, status, and stay duration
- **Dashboard** — At-a-glance summary of hotel activity
- **Image Uploads** — Upload cabin photos directly to Supabase Storage (up to 5MB)
- **Filtering** — Filter cabins by discount status
- **Dynamic Metadata** — SEO-friendly page titles per cabin
- **Optimistic UI** — React Query caching with instant feedback on mutations
- **Toast Notifications** — Real-time feedback for all user actions
- **Dark Mode** — Automatic based on system preference

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project with the following tables: `cabins`, `bookings`, `guests`, and a storage bucket named `cabin-images`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/management-app-hotel.git
   cd management-app-hotel
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
app/
├── _components/     # Shared UI components (buttons, sidebar, navbar)
├── _features/       # Feature modules (cabins, bookings, dashboard)
│   ├── _cabins/     # Cabin CRUD, forms, validation, server actions
│   └── _bookings/   # Bookings list and data fetching
├── _lib/            # Supabase client, helpers, Zod utilities
├── _style/          # Global CSS
└── dashboard/       # App routes (cabins, bookings, dashboard)
```

## Database Schema

| Table | Description |
|---|---|
| `cabins` | Cabin details (name, capacity, price, discount, image) |
| `bookings` | Reservations linked to cabins and guests |
| `guests` | Guest profiles |
| `cabins_with_status` | View combining cabin and booking availability |
