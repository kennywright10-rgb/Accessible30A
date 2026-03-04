# Accessible 30A

The definitive guide to wheelchair-accessible vacation rentals, beach access, and dining on Florida's Highway 30A. Built by a wheelchair-using family.

**Live:** [accessible30a.com](https://accessible30a.com)

---

## Tech Stack

- **Frontend:** Next.js 14 (App Router) + Tailwind CSS
- **Database:** Supabase (PostgreSQL + PostGIS)
- **Hosting:** Vercel
- **Payments:** Stripe Connect (Phase 2)
- **Analytics:** PostHog + Vercel Analytics
- **Affiliate:** CJ Affiliate (VRBO)

## Quick Start

```bash
# 1. Clone
git clone https://github.com/kenwright/accessible30a.git
cd accessible30a

# 2. Install
npm install

# 3. Environment
cp .env.example .env.local
# Fill in your Supabase + Stripe keys

# 4. Database setup
# In Supabase SQL Editor, run:
#   scripts/seed/001_schema.sql
#   scripts/seed/002_seed_30a.sql

# 5. Run
npm run dev
```

## Project Structure

```
accessible30a/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Root layout + metadata
│   │   ├── globals.css         # Tailwind + custom styles
│   │   ├── accessible-rentals/ # Property listings
│   │   ├── beach-access/       # Beach access guide
│   │   ├── accessible-dining/  # Restaurant guide
│   │   ├── towns/              # Town pages (15 communities)
│   │   ├── api/                # API routes (→ B2B in Phase 3)
│   │   └── admin/              # Admin panel
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── property/           # Property cards, ARS display
│   │   ├── beach/              # Beach access cards
│   │   └── ui/                 # Shared UI components
│   ├── lib/
│   │   ├── supabase/           # Supabase client (server + browser)
│   │   ├── data.ts             # Data fetching utilities
│   │   └── affiliate.ts       # VRBO/CJ affiliate link generation
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── scripts/
│   ├── seed/                   # Database schema + seed data
│   └── scrapers/               # VRBO/Airbnb/etc scrapers (Phase 2)
└── public/                     # Static assets
```

## Database Schema

Multi-destination from day one. Key tables:

- `destinations` — Markets (30A, Gulf Shores, etc.)
- `towns` — Communities within destinations
- `properties` — Rental listings with ARS scores
- `property_accessibility` — Granular accessibility data (50+ attributes)
- `beach_accesses` — Wheelchair-accessible beach access points
- `restaurants` — Accessible dining with detailed ratings
- `reviews` — Community reviews from wheelchair users
- `bookings` — Direct bookings via Stripe (Phase 2)
- `api_keys` — B2B API licensing (Phase 3)

## Revenue Model

1. **VRBO Affiliate** (CJ Affiliate) — Live now
2. **Featured Listings** — $99-199/mo for premium placement
3. **ARS Verification** — $250-500/property
4. **Direct Bookings** — 8-12% service fee (Stripe Connect)
5. **API Licensing** — Per-property or subscription for OTAs
6. **Destination Partnerships** — DMO contracts
7. **Sponsored Content** — Equipment, vehicles, insurance

## Deployment

```bash
# Vercel (connected to GitHub)
vercel --prod

# Or via Vercel CLI
npx vercel
```

## Key Commands

```bash
npm run dev              # Local development
npm run build            # Production build
npm run db:seed          # Seed 30A data
npm run scrape:vrbo      # Run VRBO scraper
npm run scrape:airbnb    # Run Airbnb scraper
```

---

Built with ♿ by Ken & Stephanie Wright
