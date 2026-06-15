import { SITE } from '@/lib/site';

/** Inline pill-shaped "eye" element sitting between words in the headline. */
function EyePill() {
  return (
    <span className="inline-flex align-middle mx-1 md:mx-2 w-[16px] md:w-[42px] lg:w-[62px] h-[16px] md:h-[26px] lg:h-[34px] border-[2px] rounded-full items-center justify-center" style={{ borderColor: 'var(--text)' }}>
      <span className="w-2 h-2 rounded-full" style={{ background: 'var(--text)' }} />
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center justify-start overflow-hidden bg-bg-base">
      {/* Hero content */}
      <div className="max-w-7xl w-full mx-auto px-8 md:px-16 lg:px-20 relative z-10 grid grid-cols-12 gap-x-4 md:gap-x-8 pt-36 md:pt-44 pb-28 md:pb-36">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <h1 className="font-display font-medium tracking-tight leading-[1.05] text-[clamp(34px,6vw,84px)]">
            <span style={{ color: 'var(--text)' }}>Websites that</span>{' '}
            <span style={{ color: 'var(--text-3)' }}>win</span>
            <EyePill />
            <span style={{ color: 'var(--text-3)' }}>you</span>
            <br />
            <span style={{ color: 'var(--text-3)' }}>more customers, built by</span>
            <br />
            <span style={{ color: 'var(--text)' }}>{SITE.brand}.</span>
          </h1>

          {/* Tagline */}
          <p className="mt-6 max-w-xl text-base md:text-lg" style={{ color: 'var(--text-2)' }}>
            {SITE.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
