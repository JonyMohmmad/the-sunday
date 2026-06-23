import type { Metadata } from 'next';
import Nav from '@/components/layout/Nav';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/layout/Footer';
import { ABOUT, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Lumora is a full-service digital studio — web, growth, AI, and security under one roof. '
    + 'Remote, serving clients worldwide, with honest pricing and real shipped work.',
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 120 }}>
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#93c5fd' }}>
              About Lumora
            </p>
            <h1
              className="font-bold tracking-tight mb-5"
              style={{ fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.05 }}
            >
              {ABOUT.heading}
            </h1>
            <p className="text-[18px] leading-relaxed mx-auto" style={{ color: 'var(--text-2)', maxWidth: 640 }}>
              {ABOUT.intro}
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto">
            <div
              className="rounded-2xl p-8 sm:p-10"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-3)' }}>
                Why we started Lumora
              </p>
              <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-2)' }}>
                {ABOUT.founderNote}
              </p>
              <p className="text-sm mt-6" style={{ color: 'var(--text-3)' }}>
                {SITE.location}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
              {ABOUT.values.map((val) => (
                <div
                  key={val.title}
                  className="rounded-2xl p-6"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
                >
                  <h2 className="text-[16px] font-bold mb-1.5" style={{ color: 'var(--text)' }}>
                    {val.title}
                  </h2>
                  <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
                    {val.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
