import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import Nav from '@/components/layout/Nav';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/layout/Footer';
import { SECURITY_AREAS } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Security & Protection',
  description:
    'Digital security for your brand: identity protection, social media security management, and '
    + 'intellectual property management — account hardening, threat monitoring, incident response, '
    + 'and takedown support. Defensible claims, no false guarantees.',
};

export default function SecurityPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 120 }}>
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#93c5fd' }}>
              Security &amp; Protection
            </p>
            <h1
              className="font-bold tracking-tight mb-5"
              style={{ fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.05 }}
            >
              Protect the brand and identity you’re growing.
            </h1>
            <p className="text-[18px] leading-relaxed mx-auto" style={{ color: 'var(--text-2)', maxWidth: 620 }}>
              As your business grows online, so does your attack surface. We help you harden what
              matters, watch for threats, and respond calmly when something goes wrong — without
              ever promising to make you “unhackable.”
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto flex flex-col gap-6">
            {SECURITY_AREAS.map((area) => (
              <div
                key={area.key}
                className="rounded-2xl p-8"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
                  {area.title}
                </h2>
                <p className="text-[15px] leading-relaxed mb-5" style={{ color: 'var(--text-2)', maxWidth: 760 }}>
                  {area.intro}
                </p>
                <ul className="flex flex-col gap-3">
                  {area.covers.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-[14px]" style={{ color: 'var(--text)' }}>
                      <Check size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                      <span style={{ color: 'var(--text-2)' }}>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <p className="text-[13px] text-center mt-2" style={{ color: 'var(--text-3)' }}>
              Security work is scoped to your specific risk and stack. We’ll be clear about what we
              can and can’t guarantee on a free call.
            </p>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
