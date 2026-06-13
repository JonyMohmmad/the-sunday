'use client';

import { Container } from '@/components/ui/Container';
import { DualCTA } from '@/components/ui/DualCTA';
import { AuditModal } from '@/components/ui/AuditModal';
import { useAuditModal } from '@/lib/useAuditModal';
import { DropCultureBadge } from '@/components/ui/DropCultureBadge';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import TextReveal from '@/components/ui/TextReveal';
import { COPY } from '@/lib/copy';

export default function FinalCTA() {
  const { isOpen, open, close } = useAuditModal();

  return (
    <section
      id="contact"
      className="relative py-32 lg:py-40 overflow-hidden"
      style={{ background: '#FFFFFF', borderTop: '1px solid #E4E4E7' }}
      aria-labelledby="cta-heading"
    >
      {/* The ONLY gradient in the site — subtle lime climax glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(204,255,0,0.04), transparent)',
          zIndex: 0,
        }}
      />

      {/* DropCultureBadge — top-right, desktop only */}
      <div
        className="hidden lg:block absolute top-12 right-12 pointer-events-none"
        style={{ opacity: 0.4, zIndex: 0 }}
        aria-hidden="true"
      >
        <DropCultureBadge />
      </div>

      <Container className="relative text-center">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <RevealOnScroll>
            <p className="text-[11px] uppercase tracking-widest text-[#71717A] mb-6">
              {COPY.final_cta.eyebrow}
            </p>

            <TextReveal
              id="cta-heading"
              as="h2"
              text={COPY.final_cta.headline}
              className="font-display text-[#3F3F46] tracking-tight mx-auto mb-6"
              style={{
                fontSize: 'clamp(40px, 6vw, 72px)',
                fontWeight: 800 as const,
                lineHeight: 1.0,
                maxWidth: 800,
              }}
            />

            <p className="text-[#71717A] text-lg leading-relaxed max-w-xl mx-auto mb-10">
              {COPY.final_cta.subhead}
            </p>

            <div className="flex justify-center">
              <DualCTA source="final_cta" onAuditClick={open} size="lg" />
            </div>

            <p className="text-[13px] text-[#71717A] italic mt-8">
              {COPY.final_cta.proof}
            </p>
          </RevealOnScroll>
        </div>
      </Container>

      <AuditModal isOpen={isOpen} onClose={close} />
    </section>
  );
}
