'use client';

import { Container } from '@/components/ui/Container';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import StaggerGrid from '@/components/ui/StaggerGrid';
import { COPY } from '@/lib/copy';

export default function Process() {
  const steps = COPY.process.steps;

  return (
    <section
      id="process"
      className="py-24 lg:py-32"
      style={{ background: '#FFFFFF', borderTop: '1px solid #E4E4E7' }}
      aria-labelledby="process-heading"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">

          <RevealOnScroll>
            <p className="text-[11px] uppercase tracking-widest text-[#71717A] mb-4">
              {COPY.process.eyebrow}
            </p>
            <h2
              id="process-heading"
              className="font-display font-bold text-[#3F3F46] tracking-tight leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700 }}
            >
              {COPY.process.headline.split('\n').map((line, i) => (
                <span key={i} style={{ display: 'block' }}>{line}</span>
              ))}
            </h2>
          </RevealOnScroll>

          <StaggerGrid className="flex flex-col relative">
            {/* Vertical connector line (desktop only) */}
            <div
              className="hidden lg:block absolute left-0 top-8 bottom-8 pointer-events-none"
              style={{ borderLeft: '1px dashed #E4E4E7', marginLeft: -24 }}
              aria-hidden="true"
            />

            {steps.map((step, i) => (
              <div
                key={step.number}
                className="relative flex gap-8 py-8"
                style={{
                  // TODO: make this interactive (highlight step on scroll-into-view)
                  borderLeft: i === 0 ? '2px solid #CCFF00' : '2px solid transparent',
                  paddingLeft: 20,
                  borderBottom: i < steps.length - 1 ? '1px solid #E4E4E7' : 'none',
                }}
              >
                <span
                  className="font-display font-black leading-none flex-shrink-0 w-12 pt-1 select-none pointer-events-none absolute top-6 right-0"
                  style={{ fontSize: 48, color: '#E4E4E7', fontWeight: 800 }}
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#3F3F46] tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#71717A] text-base leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </StaggerGrid>

        </div>
      </Container>
    </section>
  );
}
