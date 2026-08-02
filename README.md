 # AuraDental — Dentist Landing Page

A modern, animated landing page for a dental practice, built with Next.js and Sanity CMS. Content (hero section, services) is fully editable through a built-in Sanity Studio, so copy and images can be updated without touching code.

**Live demo:** [dentiste-landingpage.vercel.app](https://dentiste-landingpage.vercel.app)

## Features

- **Marketing landing page** — hero, before/after results gallery, services grid, "why choose us" section with stats, FAQ, and contact/footer
- **CMS-driven content** — hero copy/image and services are managed in Sanity Studio, not hardcoded
- **Appointment page** — dedicated `/rendez-vous` booking page
- **Scroll animations** — powered by GSAP (`useGsapScrollAnimations` hook) and Framer Motion
- **Embedded Sanity Studio** — content editors log in at `/studio` to manage the site
- **Responsive, French-language UI** styled with Tailwind CSS

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| CMS | [Sanity](https://www.sanity.io) (embedded Studio + `next-sanity`) |
| Styling | Tailwind CSS, styled-components |
| Animation | GSAP, Framer Motion |
| Icons | Phosphor Icons, Lucide, React Icons |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 20+
- A free [Sanity](https://www.sanity.io) account and project

### 1. Clone and install

```bash
git clone https://github.com/abdelhamid11111111/dentiste-landingpage.git
cd dentiste-landingpage
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="your-sanity-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-07-28"
```

> Find your project ID and dataset name in [manage.sanity.io](https://manage.sanity.io), or run `npx sanity init` inside the project to create a new one.

### 3. Run the dev server

```bash
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Sanity Studio (content editing): [http://localhost:3000/studio](http://localhost:3000/studio)

### 4. Add content

In the Studio, create:
- A **Hero Section** document (title, word, subtitle, hero image)
- One or more **Service** documents (title, description, icon)

The landing page pulls this content automatically.

## Project Structure

```
app/
  components/
    AuraDentalLanding.tsx   # Main landing page sections
    Navbar.tsx
    Footer.tsx
  hooks/
    useGsapScrollAnimations.ts  # Scroll-triggered animation hook
  rendez-vous/
    page.tsx                # Appointment booking page
  studio/                   # Embedded Sanity Studio route
  page.tsx                  # Home page
  layout.tsx
sanity/
  schemaTypes/
    hero.ts                 # Hero section schema
    service.ts               # Service schema
    index.ts
  lib/                       # Sanity client helpers
  structure.ts               # Studio content structure
  env.ts                      # Reads Sanity env vars
sanity.config.ts              # Sanity Studio configuration
```

## Content Model

| Document | Fields |
|---|---|
| **Hero Section** | `title`, `word`, `subtitle`, `img` |
| **Service** | `title`, `description`, `icon` |

See [`sanity/schemaTypes`](./sanity/schemaTypes) for the full schema definitions.

## Deployment

Deployed on [Vercel](https://vercel.com):

1. Push the repo to GitHub and import it into Vercel.
2. Add `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `NEXT_PUBLIC_SANITY_API_VERSION` in the Vercel project's environment variables.
3. Deploy — Vercel runs `npm run build`.
4. In your Sanity project's CORS settings, add your production domain so the deployed Studio and frontend can talk to the Sanity API.

## Screenshots
<img width="1887" height="821" alt="image" src="https://github.com/user-attachments/assets/97ef223e-14eb-4a89-8bb6-d5df923d1ea3" />



|  |  |
|---|---|
| ![Hero](./screenshots/hero.png) | ![Services](./screenshots/services.png) |
| ![FAQ](./screenshots/faq.png) | ![Sanity Studio](./screenshots/studio.png) |

## License

No license specified yet. Add one (e.g. MIT) if you intend for others to reuse this code.
