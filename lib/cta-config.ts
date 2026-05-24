// lib/cta-config.ts
// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for all CTA links and copy.
// Before launch: replace CAL_LINK with your real Cal.com URL.
// ─────────────────────────────────────────────────────────────────────────────

export const CTA = {
  // TODO: replace with your real Cal.com or Calendly booking URL
  // Example: "https://cal.com/youragency/30min"
  CAL_LINK: 'https://cal.com/placeholder/30min',

  // TODO: replace with your Mailchimp / ConvertKit / Loops embed action URL
  // Example: "https://app.loops.so/api/newsletter-form/xxxx"
  AUDIT_FORM_ACTION: '#',

  PRIMARY_LABEL: 'Book a strategy call',
  PRIMARY_SUBLABEL: 'Free · 30 min · No pitch',

  SECONDARY_LABEL: 'Get a free store audit',
  SECONDARY_SUBLABEL: 'We review your Shopify store in 48 hrs',

  // UTM params to append to CAL_LINK per placement
  utmLink: (source: string) =>
    `${CTA.CAL_LINK}?utm_source=website&utm_medium=cta&utm_campaign=${source}`,
} as const;

// Convenience: open Cal.com in new tab with UTM params
export function bookCall(source: string) {
  if (typeof window !== 'undefined') {
    window.open(CTA.utmLink(source), '_blank', 'noopener,noreferrer');
  }
}
