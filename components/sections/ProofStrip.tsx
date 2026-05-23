'use client';

import { useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { AnimatedReveal, StaggerReveal } from '@/components/ui/AnimatedReveal';

const metrics = [
  { value: '+40%', label: 'avg conversion lift' },
  { value: '<2s', label: 'mobile load time' },
  { value: '3 wks', label: 'store to launch' },
];

const tags = [
  'Streetwear',
  'Anime',
  'Sneakers',
  'Lifestyle Apparel',
  'Drop Culture',
  'Fashion DTC',
  'Shopify',
  'Limited Drops',
  'Hypebeast',
  'Alt Fashion',
];

function Marquee() {
  const prefersReducedMotion = useReducedMotion();
  const doubled = [...tags, ...tags];

  return (
    <div className="overflow-hidden py-4" aria-hidden="true">
      <div
        className={`flex gap-6 whitespace-nowrap ${prefersReducedMotion ? '' : 'marquee-track'}`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted border border-[#232327] rounded-full px-4 py-1.5 flex-shrink-0"
          >
            <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ProofStrip() {
  return (
    <section id="proof" className="py-20 border-y border-[#232327]" aria-labelledby="proof-heading">
      <Container>
        {/* Metrics */}
        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#232327] rounded-xl overflow-hidden mb-16">
          {metrics.map((m) => (
            <div
              key={m.value}
              className="bg-background px-8 py-10 flex flex-col gap-2 sm:items-center sm:text-center"
            >
              <span className="font-display text-5xl lg:text-6xl font-bold text-accent tracking-tight leading-none">
                {m.value}
              </span>
              <span className="text-sm text-muted">{m.label}</span>
            </div>
          ))}
        </StaggerReveal>

        {/* Marquee */}
        <AnimatedReveal delay={0.1}>
          <Marquee />
        </AnimatedReveal>

        {/* Tagline */}
        <AnimatedReveal delay={0.2} className="mt-8 text-center">
          <p id="proof-heading" className="text-muted text-sm tracking-wide">
            Built for fashion brands that take their craft seriously.
          </p>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
