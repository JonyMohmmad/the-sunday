'use client';

import { Container } from '@/components/ui/Container';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import StaggerGrid from '@/components/ui/StaggerGrid';
import TiltCard from '@/components/ui/TiltCard';
import TextReveal from '@/components/ui/TextReveal';
import { COPY } from '@/lib/copy';
import type { ReactNode } from 'react';

function CrashIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#71717A" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="8" width="24" height="16" rx="2" />
      <path d="M14 14l-4 4 4 4" />
      <path d="M18 14l4 4-4 4" />
      <path d="M12 4h8" />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#71717A" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="2" width="14" height="28" rx="3" />
      <path d="M13 10l6 6M19 10l-6 6" />
      <circle cx="16" cy="26" r="1" fill="#71717A" stroke="none" />
    </svg>
  );
}

function GenericIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#71717A" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="10" width="18" height="18" rx="2" />
      <path d="M10 10V8a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2h-2" />
    </svg>
  );
}

function CheckoutIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#71717A" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 6h4l3 14h10l3-8H11" />
      <circle cx="15" cy="26" r="1.5" />
      <circle cx="24" cy="26" r="1.5" />
      <path d="M20 18v5M17 21h6" />
    </svg>
  );
}

const icons: Record<string, ReactNode> = {
  crash:    <CrashIcon />,
  mobile:   <MobileIcon />,
  generic:  <GenericIcon />,
  checkout: <CheckoutIcon />,
};

function highlightFirstNumber(text: string): ReactNode {
  const parts = text.split(/(\d+\.?\d*[×%]?)/);
  let found = false;
  return (
    <>
      {parts.map((part, i) => {
        if (!found && /^\d+\.?\d*[×%]?$/.test(part) && part.length > 0) {
          found = true;
          return <strong key={i} style={{ color: '#CCFF00' }}>{part}</strong>;
        }
        return part;
      })}
    </>
  );
}

export default function Problem() {
  const cards = COPY.problem.cards;

  return (
    <section
      id="problem"
      className="py-24 lg:py-32"
      style={{ background: '#FFFFFF' }}
      aria-labelledby="problem-heading"
    >
      <Container>
        <div className="max-w-3xl mb-16">
          <RevealOnScroll>
            <p className="text-[11px] uppercase tracking-widest text-[#71717A] mb-4">
              {COPY.problem.eyebrow}
            </p>
            <TextReveal
              id="problem-heading"
              as="h2"
              text={COPY.problem.headline}
              className="font-display font-bold text-[#3F3F46] tracking-tight leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700 }}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="text-[#71717A] text-base leading-relaxed">
              {COPY.problem.subhead}
            </p>
          </RevealOnScroll>
        </div>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((card) => (
            <TiltCard
              key={card.title}
              className="h-full"
            >
              <article
                className="pain-card flex flex-col gap-4 p-6 relative h-full"
                style={{
                  background: '#F7F7F8',
                  border: '1px solid #E4E4E7',
                  borderRadius: 12,
                  transition: 'border-color 0.2s ease',
                }}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 48, height: 48,
                    background: '#FFFFFF',
                    border: '1px solid #E4E4E7',
                    borderRadius: 8,
                  }}
                >
                  {icons[card.icon]}
                </div>
                <h3 className="font-display text-[18px] font-semibold text-[#3F3F46] leading-snug">
                  {card.title}
                </h3>
                <p className="text-[14px] text-[#71717A] leading-[1.6] flex-1">
                  {card.body}
                </p>
                <div
                  className="text-[12px] text-[#71717A] px-3 py-2 rounded-[6px]"
                  style={{ background: '#FFFFFF', border: '1px solid #E4E4E7' }}
                >
                  {highlightFirstNumber(card.stat)}
                </div>
              </article>
            </TiltCard>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
