// lib/seo-config.ts
// ─────────────────────────────────────────────────────────────────────────
// Single source of truth for SEO metadata. Brand/contact come from site.ts.
// TODO before launch: replace the domain and social handles with real ones.
// ─────────────────────────────────────────────────────────────────────────
import { SITE } from '@/lib/site';

export const SEO = {
  siteUrl: SITE.domain,
  siteName: SITE.brand,

  defaultTitle: `${SITE.brand} — Web, AI & Growth for Modern Businesses`,
  defaultDescription:
    'Lumora is a full-service digital studio: high-converting websites and stores, '
    + 'AI automation, growth marketing, and digital security — one team for everything '
    + 'that powers your business online.',
  defaultKeywords: [
    'web design agency',
    'web development',
    'ecommerce development',
    'Next.js development',
    'AI automation agency',
    'AI agents',
    'digital marketing agency',
    'social media management',
    'brand & graphic design',
    'digital security',
    'conversion-focused web design',
  ],

  ogImage: '/opengraph-image',
  ogType: 'website',
  locale: 'en_US',

  twitterCard: 'summary_large_image',
  twitterHandle: '@lumorastudio',

  organization: {
    name: SITE.brand,
    url: SITE.domain,
    logo: `${SITE.domain}/logo.png`,
    foundingYear: '2024',
    sameAs: [
      SITE.social.twitter,
      SITE.social.instagram,
      SITE.social.linkedin,
      SITE.social.dribbble,
    ],
    contactPoint: {
      email: SITE.email,
      contactType: 'Customer Service',
    },
  },

  hreflang: [
    { lang: 'en', href: SITE.domain },
    { lang: 'x-default', href: SITE.domain },
  ],
} as const;
