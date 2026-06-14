// lib/seo-config.ts
// ─────────────────────────────────────────────────────────────────────────
// Single source of truth for SEO metadata. Brand/contact come from site.ts.
// TODO before launch: replace the domain and social handles with real ones.
// ─────────────────────────────────────────────────────────────────────────
import { SITE } from '@/lib/site';

export const SEO = {
  siteUrl: SITE.domain,
  siteName: SITE.brand,

  defaultTitle: `${SITE.brand} — Web Design & Development for Growing Businesses`,
  defaultDescription:
    'Lumora Studio designs and builds fast, high-converting websites, online '
    + 'stores, and web apps for businesses worldwide. Custom design, modern tech, '
    + 'and a focus on turning visitors into customers.',
  defaultKeywords: [
    'web design agency',
    'web development agency',
    'custom website design',
    'ecommerce website development',
    'Shopify development agency',
    'business website design',
    'web app development',
    'SaaS website design',
    'Next.js development agency',
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
