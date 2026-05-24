# [COMPANY_NAME] — Agency Marketing Website

Production-ready Next.js 16 marketing site for a Shopify conversion agency. Dark, bold, performance-first.

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Zero config required — the project is fully static and Vercel-ready.

---

## Content Swaps (do these before launch)

Search for `// TODO` and `// REPLACE` comments throughout the codebase. Key items:

| What | Where | How |
|------|-------|-----|
| Agency name | All files | Replace every `[COMPANY_NAME]` |
| Domain | `app/layout.tsx` | Replace `[DOMAIN]` in metadata + JSON-LD |
| Booking link | `Hero.tsx`, `Offer.tsx`, `Pricing.tsx`, `FinalCTA.tsx` | Replace `href="#"` on primary CTAs with Cal.com / Calendly URL |
| Founder photos | `Team.tsx` | Replace avatar initials blocks with `next/image` |
| Spec projects | `Work.tsx` | Replace `MockupCard` CSS mockups with real screenshots + real metrics |
| OG image | `public/og-image.png` | Add a 1200x630 Open Graph share image |
| Social links | `Footer.tsx` | Replace `href="#"` for Instagram and X |
| Email | `Footer.tsx`, `layout.tsx` | Replace `hello@[DOMAIN]` |
| Case study data | `Work.tsx` | Replace placeholder brand names + metrics with real client data |
| Testimonial quotes | `Testimonials.tsx` | Replace placeholder quotes with verbatim client approval |
| Video testimonial | `Testimonials.tsx` | Replace `href="#"` with real Loom/YouTube URL |
| Clutch rating | `TrustBadges.tsx` | Replace placeholder with live Clutch widget script |

---

## Project Structure

```
app/
  globals.css        # Design system tokens (Tailwind v4 @theme)
  layout.tsx         # Fonts, metadata, JSON-LD
  page.tsx           # Assembles all sections in order

components/
  ui/
    Button.tsx        # Primary (lime) + ghost variants
    Container.tsx     # Max-width wrapper (1200px)
    AnimatedReveal.tsx # Scroll-triggered fade-up + stagger

  sections/
    Nav.tsx           # Sticky nav, blur on scroll, mobile overlay
    Hero.tsx          # Headline stagger, before/after slider
    ProofStrip.tsx    # Metrics + infinite marquee
    Problem.tsx       # Pain point cards
    Offer.tsx         # 3 pillars + 3-week timeline
    Process.tsx       # 4-step numbered process
    Work.tsx          # Spec project gallery (replace with real work)
    Pricing.tsx       # Two pricing cards
    Team.tsx          # Founder cards (replace photos)
    FAQ.tsx           # Accordion (Framer Motion)
    FinalCTA.tsx      # Full-width accent CTA
    Footer.tsx        # Minimal footer
```

---

## Design System

Defined in `app/globals.css` via Tailwind v4 `@theme {}`.

| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `#0A0A0B` | Page background |
| `--color-surface` | `#141416` | Cards, panels |
| `--color-border` | `#232327` | Dividers, card borders |
| `--color-primary` | `#FAFAFA` | Headings, body text |
| `--color-muted` | `#A1A1AA` | Secondary text |
| `--color-accent` | `#CCFF00` | CTAs, key numbers, highlights only |
| `--font-display` | Space Grotesk | All headings (font-display class) |
| `--font-sans` | Inter | All body copy (font-sans class) |

Accent restraint rule: the lime #CCFF00 is used ONLY on primary CTAs, key metric numbers,
step numbers, and occasional hover states. Everything else is monochrome.

---

## Performance Notes

- All images use next/image with explicit width/height to prevent layout shift
- Framer Motion only runs in client components — server-rendered sections have zero JS overhead
- Fonts loaded via next/font/google with display:swap and subsetting
- Noise texture is an inline SVG data URI — no additional network request
- Target: Lighthouse 90+ mobile performance
