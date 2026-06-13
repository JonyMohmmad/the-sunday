'use client';

export function DropCultureBadge({ className }: { className?: string }) {
  const id = 'drop-badge-circle';
  const text = 'SHOPIFY Â· CRO Â· GROWTH Â· BRAND BUILDING Â· SMALL SHOPS Â· ';

  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      aria-hidden="true"
      className={className}
      style={{
        animation: 'badgeSpin 20s linear infinite',
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes badgeSpin {
            to { transform: rotate(360deg); }
          }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes badgeSpin {
            to { transform: rotate(0deg); }
          }
        }
      `}</style>
      <defs>
        <path
          id={id}
          d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
        />
      </defs>
      <text
        style={{
          fontSize: 9,
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 600,
          letterSpacing: '2px',
          fill: '#71717A',
          textTransform: 'uppercase',
        }}
      >
        <textPath href={`#${id}`}>{text}</textPath>
      </text>
    </svg>
  );
}
