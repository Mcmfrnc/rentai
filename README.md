# RentAI

Portfolio project — smart vehicle rental with AI-assisted booking.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Local mock data only (not yet implemented)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/vehicles` | Vehicles |
| `/vehicles/[id]` | Vehicle Details |
| `/booking` | Booking |
| `/checkout` | Checkout |
| `/confirmation` | Booking Confirmation |
| `/assistant` | AI Assistant |
| `/admin` | Admin Dashboard |

## Project Structure

```
app/                  # Next.js App Router pages
components/
  layout/             # Header, footer, navigation
  shared/             # Reusable layout primitives
  ui/                 # Shadcn UI components
config/               # Site config and nav items
lib/                  # Utilities
types/                # Shared TypeScript types
```
