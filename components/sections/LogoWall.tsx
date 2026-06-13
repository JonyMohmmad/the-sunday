'use client';

const logos = [
  'Stripe', 'Vercel', 'GitHub', 'Notion', 'Linear',
  'Loom', 'Figma', 'Raycast', 'PlanetScale', 'Railway',
  'Supabase', 'Resend',
];

const doubled = [...logos, ...logos];

export default function LogoWall() {
  return (
    <section
      aria-label="Trusted by"
      style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
      className="py-16 overflow-hidden"
    >
      {/* Label */}
      <p
        className="text-center text-[13px] uppercase tracking-widest mb-10"
        style={{ color: 'var(--text-3)' }}
      >
        Trusted by engineering teams at
      </p>

      {/* Marquee */}
      <div className="marquee-wrapper relative">
        {/* Fade edges */}
        <div
          className="absolute inset-y-0 left-0 z-10 w-32 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}
        />
        <div
          className="absolute inset-y-0 right-0 z-10 w-32 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}
        />

        <div className="marquee-track flex items-center">
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="flex items-center flex-shrink-0"
            >
              <span
                className="px-8 text-[17px] font-semibold transition-colors duration-150 cursor-default select-none"
                style={{ color: 'var(--text-3)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-2)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
              >
                {logo}
              </span>
              <span
                className="h-4 flex-shrink-0"
                style={{ width: '1px', background: 'var(--border)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
