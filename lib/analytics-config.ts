// lib/analytics-config.ts
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Analytics IDs â€” replace all TODOs before launch.
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const ANALYTICS = {
  // TODO: replace with real GA4 Measurement ID (format: G-XXXXXXXXXX)
  // Get it from: https://analytics.google.com â†’ Admin â†’ Data Streams
  GA4_ID: process.env.NEXT_PUBLIC_GA4_ID ?? 'G-PLACEHOLDER',

  // TODO: replace with real Meta Pixel ID (format: numeric string)
  // Get it from: https://business.facebook.com â†’ Events Manager
  META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '0000000000000',

  // TODO: replace with real Hotjar Site ID (format: numeric string)
  // Get it from: https://insights.hotjar.com â†’ Settings â†’ Tracking Code
  HOTJAR_ID: process.env.NEXT_PUBLIC_HOTJAR_ID ?? '0000000',
  HOTJAR_SV: '6', // Hotjar snippet version â€” leave as "6"
} as const;
