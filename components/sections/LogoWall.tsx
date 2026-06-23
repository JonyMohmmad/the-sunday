import { TRUST_PROJECTS } from '@/lib/site';

export default function LogoWall() {
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

      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 px-6">
        {TRUST_PROJECTS.map((name, i) => (
          <div key={name} className="flex items-center gap-x-10">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="hidden sm:block h-4"
                style={{ width: '1px', background: 'var(--border)' }}
              />
            )}
            <span
              className="text-[18px] font-semibold transition-colors duration-150 cursor-default select-none hover:text-[var(--text)]"
              style={{ color: 'var(--text-2)' }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
