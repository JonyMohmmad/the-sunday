import { TRUST_PROJECTS } from '@/lib/site';

export default function LogoWall() {
  // Duplicate the set so the -50% translate loops seamlessly.
  const items = [...TRUST_PROJECTS, ...TRUST_PROJECTS];

  return (
    <section
      aria-label="Recent work, live in production"
      style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
      className="py-14"
    >
      <p
        className="text-center text-[13px] uppercase tracking-widest mb-8"
        style={{ color: 'var(--text-3)' }}
      >
        Recent work — live in production
      </p>

      <div
        className="marquee-wrapper relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <div className="marquee-track flex w-max items-center">
          {items.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-x-10 pr-10"
              aria-hidden={i >= TRUST_PROJECTS.length ? true : undefined}
            >
              <span
                aria-hidden="true"
                className="h-4"
                style={{ width: '1px', background: 'var(--border)' }}
              />
              <span
                className="text-[18px] font-semibold whitespace-nowrap transition-colors duration-150 cursor-default select-none hover:text-[var(--text)]"
                style={{ color: 'var(--text-2)' }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
