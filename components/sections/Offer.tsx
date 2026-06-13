'use client';

import { Container } from '@/components/ui/Container';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import StaggerGrid from '@/components/ui/StaggerGrid';
import TextReveal from '@/components/ui/TextReveal';
import { DualCTA } from '@/components/ui/DualCTA';
import { AuditModal } from '@/components/ui/AuditModal';
import { useAuditModal } from '@/lib/useAuditModal';
import { COPY } from '@/lib/copy';

export default function Offer() {
  const { isOpen, open, close } = useAuditModal();
  const stages = COPY.offer.timeline_note.split(' → ');

  return (
    <section
      id="work"
      className="py-24 lg:py-32"
      style={{ background: '#FFFFFF', borderTop: '1px solid #E4E4E7' }}
      aria-labelledby="offer-heading"
    >
      <Container>

        <div className="max-w-3xl mb-16">
          <RevealOnScroll>
            <p className="text-[11px] uppercase tracking-widest text-[#71717A] mb-4">
              {COPY.offer.eyebrow}
            </p>
            <TextReveal
              id="offer-heading"
              as="h2"
              text={COPY.offer.headline}
              className="font-display font-bold text-[#3F3F46] tracking-tight leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700 }}
            />
            <p className="text-[#71717A] text-base leading-relaxed">{COPY.offer.subhead}</p>
          </RevealOnScroll>
        </div>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {COPY.offer.pillars.map((pillar) => (
            <article
              key={pillar.number}
              className="relative p-6"
              style={{ background: '#F7F7F8', border: '1px solid #E4E4E7', borderRadius: 12 }}
            >
              <span
                className="font-display font-black leading-none select-none pointer-events-none absolute top-4 right-4"
                style={{ fontSize: 48, color: '#E4E4E7', fontWeight: 800 as const }}
                aria-hidden="true"
              >
                {pillar.number}
              </span>
              <h3 className="font-display text-[18px] font-semibold text-[#3F3F46] leading-snug mb-3 pr-12">
                {pillar.title}
              </h3>
              <p className="text-[14px] text-[#71717A] leading-[1.6]">{pillar.body}</p>
            </article>
          ))}
        </StaggerGrid>

        <RevealOnScroll delay={0.15} className="mb-14">
          <div
            className="p-6 rounded-xl"
            style={{ background: '#F7F7F8', border: '1px solid #E4E4E7' }}
          >
            <p className="font-display font-bold text-[#3F3F46] text-xl mb-1">
              {COPY.offer.timeline_label}
            </p>
            <p className="text-[12px] text-[#71717A] mb-6 sm:hidden">
              {COPY.offer.timeline_note}
            </p>

            <div className="relative hidden sm:block">
              <div
                className="absolute top-[3px] left-3 right-3"
                style={{ borderTop: '1px dashed #E4E4E7' }}
                aria-hidden="true"
              />
              <div className="relative flex justify-between">
                {stages.map((stage, i) => (
                  <div key={stage} className="flex flex-col items-center gap-2">
                    <div
                      style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: i === stages.length - 1 ? '#CCFF00' : '#E4E4E7',
                        border: `1.5px solid ${i === stages.length - 1 ? '#CCFF00' : '#D4D4D8'}`,
                        flexShrink: 0,
                      }}
                    />
                    <span className="text-[10px] text-[#71717A] text-center whitespace-nowrap">
                      {stage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <DualCTA source="offer" onAuditClick={open} size="md" />
        </RevealOnScroll>

      </Container>

      <AuditModal isOpen={isOpen} onClose={close} />
    </section>
  );
}
