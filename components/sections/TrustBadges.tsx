import { Container } from '@/components/ui/Container';

// TODO: replace icon with official partner badge SVG once Shopify Partner status is confirmed
function ShopifyIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

// TODO: replace icon with official partner badge SVG once Shopify Partner status is confirmed
function VercelIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3L22 20H2L12 3z" />
    </svg>
  );
}

// TODO: replace icon with official partner badge SVG once Shopify Partner status is confirmed
function NextjsIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="4" />
      <text
        x="7"
        y="16.5"
        fontSize="10"
        fill="currentColor"
        stroke="none"
        fontWeight="700"
        fontFamily="sans-serif"
      >
        N
      </text>
    </svg>
  );
}

// TODO: replace icon with official partner badge SVG once Shopify Partner status is confirmed
function TypeScriptIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="4" />
      <text
        x="4.5"
        y="16.5"
        fontSize="8"
        fill="currentColor"
        stroke="none"
        fontWeight="700"
        fontFamily="sans-serif"
      >
        TS
      </text>
    </svg>
  );
}

// TODO: replace icon with official partner badge SVG once Shopify Partner status is confirmed
function LighthouseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2v2" />
      <path d="M9 5h6l-1 12H10L9 5z" />
      <path d="M7 21h10" />
      <path d="M12 9v4" />
    </svg>
  );
}

const badges = [
  { label: 'Shopify Partner', Icon: ShopifyIcon },
  { label: 'Vercel Deployed', Icon: VercelIcon },
  { label: 'Next.js 15', Icon: NextjsIcon },
  { label: 'TypeScript', Icon: TypeScriptIcon },
  { label: 'Lighthouse 90+', Icon: LighthouseIcon },
];

export default function TrustBadges() {
  return (
    <section
      className="py-8 border-y"
      style={{ background: '#0A0A0B', borderColor: '#232327' }}
      aria-label="Technology partnerships and trust signals"
    >
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* Left label */}
          <p className="text-[11px] uppercase tracking-widest text-[#A1A1AA] flex-shrink-0">
            Trusted infrastructure &amp; partnerships
          </p>

          {/* Badge row */}
          <div className="flex items-center gap-6 flex-wrap">
            {badges.map(({ label, Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 text-[#A1A1AA]"
              >
                <Icon />
                <span className="text-[11px] text-[#A1A1AA] whitespace-nowrap">{label}</span>
              </div>
            ))}
          </div>

          {/* Clutch rating placeholder */}
          {/* TODO: embed real Clutch widget */}
          <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
            <span className="text-[13px] text-[#FAFAFA]">
              5.0 <span className="text-[#CCFF00]">★★★★★</span> on Clutch
            </span>
            <span className="text-[11px] text-[#A1A1AA]">Verified client reviews</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
