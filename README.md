# RentAI

**A modern vehicle rental platform built as a portfolio-grade SaaS demo.**

RentAI is a full-stack-style web application that simulates a smart vehicle rental experience — from browsing and filtering a fleet to admin fleet management and AI-powered recommendations. Built with Next.js 15 and TypeScript, it demonstrates production-minded patterns without requiring a backend, database, or external APIs.

---

## Project Overview

RentAI was designed to showcase how a real SaaS rental product could be structured: clear separation of concerns, reusable UI components, typed domain models, client-side persistence, and thoughtful UX for both customers and administrators.

The app runs entirely in the browser using mock data and `localStorage`, making it easy to deploy, demo, and extend. Currency is localized for the Philippine market (PHP), and the interface supports light and dark themes with system preference detection.

**Live demo:** _Add your deployed URL here_

---

## Features

| Area | Highlights |
|------|------------|
| **Customer experience** | Vehicle catalog, search, multi-criteria filters, sorting, vehicle details |
| **Admin experience** | Full CRUD fleet management, image upload, reset to defaults |
| **Intelligence** | Rule-based recommendation engine (no external AI APIs) |
| **Localization** | Philippine peso (₱) formatting across pricing UI |
| **Persistence** | Fleet data stored in `localStorage` with mock data fallbacks |
| **Theming** | Light / dark mode with `localStorage` + system preference |
| **Architecture** | App Router, typed models, composable components, client-safe storage helpers |

---

## Customer Features

- **Vehicle catalog** — Browse cars and motorcycles with rich cards showing rate, rating, specs, and availability
- **Search** — Find vehicles by name, brand, model, location, description, and features
- **Advanced filtering** — Filter by type, price range, fuel type, transmission, and seat count
- **Sorting** — Price (low → high, high → low) and rating
- **Vehicle details** — Dedicated detail pages with booking summary placeholders
- **AI Assistant** — Rule-based recommendation engine that scores vehicles against trip preferences and returns a best match plus top alternatives with explanations and estimated rental cost
- **Booking flow scaffold** — Booking, checkout, and confirmation pages (UI placeholders for future workflow)
- **Dark mode** — Toggle in navigation; respects system preference on first visit
- **PHP pricing** — All rates and totals displayed as Philippine pesos (e.g. `₱2,800/day`)

---

## Admin Features

- **Simulated admin dashboard** — Portfolio-safe admin access (no real authentication)
- **Vehicle management** — View entire fleet in a management table
- **Add vehicles** — Full form with validation for all vehicle fields
- **Edit vehicles** — Update existing fleet entries in place
- **Delete vehicles** — Remove vehicles with confirmation
- **Reset fleet** — Restore default mock vehicles with one action
- **Image upload** — Upload JPG, PNG, or WebP (max 2MB), preview before save, stored as base64 in `localStorage`
- **URL fallback** — Still supports external image URLs and public asset paths
- **Live sync** — Changes on the Admin page reflect immediately on the public Vehicles page

> Admin access is simulated for portfolio purposes. Real authentication and database storage are planned as future improvements.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Components | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| State / data | Mock data modules + `localStorage` |
| Tooling | ESLint, PostCSS |

**Intentionally not included (portfolio scope):**
- No backend or API routes
- No database
- No real authentication
- No external AI / payment APIs

---

## Screenshots

_Add screenshots to `docs/screenshots/` and uncomment the examples below._

<!-- 
### Home
![Home page](docs/screenshots/home.png)

### Vehicle catalog
![Vehicle catalog with filters](docs/screenshots/vehicles.png)

### AI recommendations
![AI Assistant recommendations](docs/screenshots/assistant.png)

### Admin dashboard
![Admin vehicle management](docs/screenshots/admin.png)

### Dark mode
![Dark mode vehicle catalog](docs/screenshots/dark-mode.png)
-->

| Page | Description |
|------|-------------|
| `/` | Landing page with hero and feature highlights |
| `/vehicles` | Catalog with search, filters, and sorting |
| `/assistant` | Rule-based recommendation results |
| `/admin` | Fleet management and image upload |

---

## Installation

### Prerequisites

- **Node.js** 18.18 or later
- **npm** (or yarn / pnpm)

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/rentai.git
cd rentai

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

---

## Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/vehicles` | Vehicle catalog |
| `/vehicles/[id]` | Vehicle details |
| `/booking` | Booking (scaffold) |
| `/checkout` | Checkout (scaffold) |
| `/confirmation` | Booking confirmation (scaffold) |
| `/assistant` | AI recommendations |
| `/admin` | Admin dashboard |

---

## Folder Structure

```
RentAI/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout, theme provider
│   ├── page.tsx                  # Home
│   ├── vehicles/                 # Catalog + detail pages
│   ├── booking/                  # Booking flow (scaffold)
│   ├── checkout/
│   ├── confirmation/
│   ├── assistant/                # Recommendation UI
│   └── admin/                    # Admin dashboard
│
├── components/
│   ├── admin/                    # Admin forms, fleet management, image upload
│   ├── layout/                   # Header, footer, navigation
│   ├── recommendations/          # AI assistant UI
│   ├── shared/                   # Container, page header, placeholders
│   ├── theme/                    # Theme provider + toggle
│   ├── ui/                       # shadcn/ui primitives
│   └── vehicles/                 # Cards, filters, grid, listing
│
├── config/
│   └── site.ts                   # Site metadata and nav config
│
├── data/                         # Mock seed data
│   ├── vehicles.ts
│   ├── bookings.ts
│   ├── users.ts
│   └── reports.ts
│
├── lib/
│   ├── currency.ts               # PHP formatting helpers
│   ├── recommendationEngine.ts # Rule-based scoring engine
│   ├── theme.ts                  # Theme utilities
│   ├── vehicle-filters.ts        # Search, filter, sort logic
│   ├── vehicleImage.ts           # Image validation and placeholders
│   ├── vehicleStorage.ts         # localStorage CRUD for fleet
│   └── utils.ts                  # cn() and shared utilities
│
├── types/                        # Domain TypeScript types
│   ├── vehicle.ts
│   ├── booking.ts
│   ├── user.ts
│   └── damage-report.ts
│
└── docs/
    └── screenshots/              # Add README screenshots here
```

---

## How It Works

### Data flow

1. **Seed data** — `data/` provides default vehicles, bookings, users, and damage reports
2. **Persistence** — `lib/vehicleStorage.ts` reads/writes the fleet to `localStorage`, falling back to seed data when empty
3. **Customer UI** — `VehicleListing` loads from storage, applies filters via `vehicle-filters.ts`, and renders results
4. **Recommendations** — `recommendationEngine.ts` scores vehicles against user inputs (budget, passengers, trip purpose, etc.) with no external API
5. **Admin UI** — CRUD operations update `localStorage` and broadcast a `rentai-vehicles-updated` event so the catalog stays in sync

### Image handling

Uploaded images are converted to base64 data URLs and stored in the `vehicle.image` field. The `VehicleImage` component renders base64, public paths, and external URLs with a safe placeholder fallback.

---

## Future Improvements

- [ ] **Authentication** — Real admin login (e.g. NextAuth, Clerk)
- [ ] **Database** — PostgreSQL + Prisma or Supabase for persistent fleet and bookings
- [ ] **Booking workflow** — Date picker, availability calendar, checkout forms, confirmation emails
- [ ] **Payment integration** — Stripe or local PH payment gateways
- [ ] **Cloud image storage** — S3 / Cloudinary instead of base64 in `localStorage`
- [ ] **Damage reports** — Admin UI wired to existing `DamageReport` types
- [ ] **Analytics dashboard** — Revenue, utilization, and booking trends from real data
- [ ] **E2E tests** — Playwright coverage for catalog, admin CRUD, and recommendations
- [ ] **Deployment** — Vercel production URL and CI pipeline
- [ ] **i18n** — Full Tagalog / English locale support beyond currency

---

## License

This project is intended for educational and portfolio purposes.

---

## Author

**Mark**  
[GitHub](https://github.com/Mcmfrnc)

---
