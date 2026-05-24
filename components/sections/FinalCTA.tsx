'use client';

import { Container } from '@/components/ui/Container';
import { AnimatedReveal } from '@/components/ui/AnimatedReveal';
import { DualCTA } from '@/components/ui/DualCTA';
import { AuditModal } from '@/components/ui/AuditModal';
import { useAuditModal } from '@/lib/useAuditModal';

export default function FinalCTA() {
  const { isOpen, open, close } = useAuditModal();

  return (
    <section
      id="contact"
      className="relative py-32 lg:py-40 overflow-hidden border-t border-[#E4E4E7]"
      aria-labelledby="cta-heading"
      style={{
        background: 'linear-gradient(135deg, #3B3FE4 0%, #7C3AED 100%)',
      }}
    >
      {/* Subtle lime glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(204,255,0,0.15) 0%, transparent 60%)',
        }}
      />

      <Container className="relative text-center">
        <AnimatedReveal>
          <p className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-6 flex items-center justify-center gap-2">
            <span className="w-4 h-px bg-white/40" />
            Free strategy call · No commitment
            <span className="w-4 h-px bg-white/40" />
          </p>

          <h2
            id="cta-heading"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none mb-6 max-w-3xl mx-auto"
          >
            Ready to ship
            <br />
            <span className="text-accent">your product?</span>
          </h2>

          <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Book a free 30-minute strategy call. We&apos;ll map out your product, identify the core feature set,
            and tell you exactly what it will take to build it — whether you hire us or not.
          </p>

          <div className="flex justify-center">
            <DualCTA source="final_cta" onAuditClick={open} size="lg" />
          </div>

          <p className="text-xs text-white/50 mt-8">
            No pitch. No pressure. Just an honest conversation about your product.
          </p>
        </AnimatedReveal>
      </Container>

      <AuditModal isOpen={isOpen} onClose={close} />
    </section>
  );
}
