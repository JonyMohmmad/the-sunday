'use client';

import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import StaggerGrid from '@/components/ui/StaggerGrid';
import TiltCard from '@/components/ui/TiltCard';
import { DualCTA } from '@/components/ui/DualCTA';
import { AuditModal } from '@/components/ui/AuditModal';
import { ROICalculator } from '@/components/ui/ROICalculator';
import { useAuditModal } from '@/lib/useAuditModal';
import { COPY } from '@/lib/copy';

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6l3 3 5-5" stroke="#CCFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function highlightDollarAmounts(text: string): ReactNode {
  const parts = text.split(/(\$[^\s,]+)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('$') ? (
          <strong key={i} style={{ color: '#CCFF00' }}>{part}</strong>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function Pricing() {
  const { isOpen, open, close } = useAuditModal();

  return (
    <section
      id="pricing"
      className="py-24 lg:py-32"
      style={{ background: '#F7F7F8', borderTop: '1px solid #E4E4E7' }}
      aria-labelledby="pricing-heading"
    >
      <Container>

        <div className="max-w-3xl mb-16">
          <RevealOnScroll>
            <p className="text-[11px] uppercase tracking-widest text-[#71717A] mb-4">
              {COPY.pricing.eyebrow}
            </p>
            <h2
              id="pricing-heading"
              className="font-display font-bold text-[#3F3F46] tracking-tight leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700 }}
            >
              {COPY.pricing.headline.split('\n').map((line, i) => (
                <span key={i} style={{ display: 'block' }}>{line}</span>
              ))}
            </h2>
            <p className="text-[#71717A] text-base leading-relaxed">{COPY.pricing.subhead}</p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll className="mb-16">
          <h3 className="font-display text-xl font-bold text-[#3F3F46] mb-2">
            Calculate your potential upside
          </h3>
          <p className="text-sm text-[#71717A] mb-8">
            Adjust the sliders to see what our typical 2.4× CVR lift means for your store.
          </p>
          <ROICalculator />
        </RevealOnScroll>

        <StaggerGrid className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {COPY.pricing.cards.map((card) => (
            <TiltCard
              key={card.tier}
              className="h-full"
              maxTilt={4}
            >
              <article
                className="relative flex flex-col overflow-hidden h-full"
                style={{
                  background: '#FFFFFF',
                  border: `1px solid ${card.badge ? '#CCFF00' : '#E4E4E7'}`,
                  borderRadius: 12,
                }}
              >
                {card.badge && (
                  <div className="absolute left-6" style={{ top: 0, transform: 'translateY(-50%)' }}>
                    <span style={{
                      background: '#CCFF00', color: '#FFFFFF',
                      fontSize: 11, fontWeight: 600,
                      padding: '3px 10px', borderRadius: 99,
                      display: 'inline-block',
                    }}>
                      {card.badge}
                    </span>
                  </div>
                )}

                <div className="p-8 pb-6 flex-1">
                  <h3 className="font-display text-lg font-bold text-[#3F3F46] mb-4">{card.tier}</h3>
                  <div className="mb-1">
                    <span
                      className="font-display text-[#3F3F46]"
                      style={{ fontSize: 48, fontWeight: 800 as const, lineHeight: 1 }}
                    >
                      {card.price}
                    </span>
                  </div>
                  <span className="block text-[13px] text-[#71717A] mb-6">{card.per}</span>
                  <p className="text-[14px] text-[#71717A] leading-[1.6] mb-6">{card.description}</p>

                  <ul className="flex flex-col gap-3 mb-6" role="list">
                    {card.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[14px] text-[#71717A]">
                        <span className="flex-shrink-0 mt-[3px]"><CheckIcon /></span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <DualCTA
                    source={`pricing_${card.tier.toLowerCase().replace(' ', '_')}`}
                    primaryLabel={card.cta}
                    onAuditClick={open}
                    size="md"
                  />
                </div>

                <div
                  className="px-8 py-3 text-[12px] text-[#71717A]"
                  style={{ borderTop: '1px solid #E4E4E7', background: '#FFFFFF' }}
                >
                  {highlightDollarAmounts(card.note)}
                </div>
              </article>
            </TiltCard>
          ))}
        </StaggerGrid>

      </Container>

      <AuditModal isOpen={isOpen} onClose={close} />
    </section>
  );
}
