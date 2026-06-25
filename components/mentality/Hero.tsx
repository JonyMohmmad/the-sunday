import { SITE, HERO } from '@/lib/site';
import AuroraDrift from '@/components/AuroraDrift';

export default function Hero() {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-start overflow-hidden"
      style={{ background: '#130a22' }}
    >
      {/* Luminous aurora backdrop — brand dark-mode palette (--bg #130a22,
          accent --primary #a78bfa) so it reads as the site's own dark color. */}
      <AuroraDrift
        baseColor="#130a22"
        intensity={0.38}
        blobs={[
          { x: 0.3, y: 0.34, color: '167,139,250' }, // brand violet (--primary)
          { x: 0.7, y: 0.4, color: '139,92,246' }, // violet-600
          { x: 0.5, y: 0.72, color: '99,102,241' }, // indigo
          { x: 0.22, y: 0.74, color: '168,85,247' }, // purple-500
        ]}
      />

      {/* Hero content */}
      <div className="max-w-7xl w-full mx-auto px-8 md:px-16 lg:px-20 relative z-10 grid grid-cols-12 gap-x-4 md:gap-x-8 pt-36 md:pt-44 pb-28 md:pb-36">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          {/* Eyebrow */}
          <p
            className="mb-6 text-xs md:text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            {HERO.eyebrow}
          </p>

          <h1 className="font-display font-medium tracking-tight leading-[1.06] text-[clamp(30px,5vw,68px)] max-w-5xl">
            <span style={{ color: '#ffffff' }}>We build your website, </span>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>run the marketing behind it, </span>
            <span style={{ color: '#ffffff' }}>and protect the brand you’re growing.</span>
          </h1>

          {/* Subhead */}
          <p className="mt-7 max-w-2xl text-base md:text-lg" style={{ color: 'rgba(255,255,255,0.72)' }}>
            {HERO.body}
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm md:text-base rounded-full px-5 py-2.5 hover:opacity-90 transition-opacity duration-200"
              style={{ background: '#ffffff', color: '#0a0a0c' }}
            >
              Book a free call <span aria-hidden="true">→</span>
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-1.5 text-sm md:text-base rounded-full px-5 py-2.5 transition-colors duration-200 hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.4)', color: '#ffffff' }}
            >
              See our work
            </a>
          </div>

          {/* Trust line (qualitative — no fabricated logos) */}
          <p className="mt-8 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {HERO.trust}
          </p>
        </div>
      </div>
    </section>
  );
}
