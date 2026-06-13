// lib/seo-config.ts
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Single source of truth for all SEO metadata.
// TODO: replace all [PLACEHOLDER] values before launch.
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const SEO = {
  // TODO: replace with your real domain (no trailing slash)
  siteUrl: 'https://[DOMAIN].com',

  // TODO: replace with your real agency name
  siteName: '[COMPANY_NAME]',

  // Default metadata
  defaultTitle: '[COMPANY_NAME] â€” Shopify CRO for Streetwear & Anime Brands',
  defaultDescription:
    'We rebuild Shopify stores for DTC streetwear and anime fashion '
    + 'brands in the US, UK, AU, and CA. Faster PDPs. Cleaner checkouts. '
    + 'Avg 2.4Ã— CVR lift â€” or we keep working until we get there.',
  defaultKeywords: [
    'Shopify CRO agency',
    'Shopify conversion rate optimisation',
    'streetwear ecommerce agency',
    'anime fashion Shopify',
    'DTC Shopify redesign',
    'Shopify PDP optimisation',
    'ecommerce CRO agency UK',
    'ecommerce CRO agency US',
    'Shopify checkout optimisation',
    'Shopify speed optimisation',
  ],

  // Open Graph defaults
  ogImage: '/og-image.png',
  ogType:  'website',
  locale:  'en_US',

  // Twitter/X card
  twitterCard: 'summary_large_image',
  // TODO: replace with your real X/Twitter handle
  twitterHandle: '@[HANDLE]',

  // Structured data â€” Agency info
  organization: {
    name: '[COMPANY_NAME]',
    url:  'https://[DOMAIN].com',
    // TODO: replace with real logo URL after deployment
    logo: 'https://[DOMAIN].com/logo.png',
    // TODO: replace with real founding year
    foundingYear: '2025',
    // TODO: replace with real social profiles
    sameAs: [
      'https://twitter.com/[HANDLE]',
      'https://instagram.com/[HANDLE]',
      'https://linkedin.com/company/[SLUG]',
    ],
    contactPoint: {
      email:       'hello@[DOMAIN].com',
      contactType: 'Customer Service',
    },
  },

  // Hreflang â€” all markets are English, x-default + en
  hreflang: [
    { lang: 'en',        href: 'https://[DOMAIN].com' },
    { lang: 'x-default', href: 'https://[DOMAIN].com' },
  ],
} as const;
