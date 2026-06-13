// lib/analytics-events.ts
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Fire these events from CTA components to track conversions.
// Usage: import { trackEvent } from "@/lib/analytics-events"
//        trackEvent("book_call_clicked", { source: "hero" })
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?:  (...args: unknown[]) => void;
    hj?:   (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean>;

export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window === 'undefined') return;
  // GA4
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
  // Meta Pixel â€” map to standard events where possible
  if (window.fbq) {
    const metaEventMap: Record<string, string> = {
      book_call_clicked:    'InitiateCheckout',
      audit_form_submitted: 'Lead',
      pricing_viewed:       'ViewContent',
    };
    const metaEvent = metaEventMap[eventName] ?? 'CustomEvent';
    window.fbq('track', metaEvent, params);
  }
}

export const Events = {
  bookCallClicked:    (source: string) =>
    trackEvent('book_call_clicked',    { source }),
  auditFormSubmitted: (source: string) =>
    trackEvent('audit_form_submitted', { source }),
  roiCalculatorUsed:  (revenue: number) =>
    trackEvent('roi_calculator_used',  { monthly_revenue: revenue }),
  caseStudyViewed:    (brand: string) =>
    trackEvent('case_study_viewed',    { brand }),
  faqExpanded:        (question: string) =>
    trackEvent('faq_expanded',         { question }),
} as const;
