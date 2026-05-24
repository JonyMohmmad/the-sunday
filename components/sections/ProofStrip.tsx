'use client';

import { useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { AnimatedReveal, StaggerReveal } from '@/components/ui/AnimatedReveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface MetricItem {
  end: number;
  suffix: string;
  label: string;
  decimals: number;
  prefix?: string;
}

const metrics: MetricItem[] = [
  { end: 47, suffix: '+', label: 'stores optimised', decimals: 0 },
  { end: 2.3, prefix: '$', suffix: 'M+', label: 'revenue generated', decimals: 1 },
  { end: 3.1, suffix: '×', label: 'average CVR lift', decimals: 1 },
  { end: 18, suffix: ' days', label: 'average delivery', decimals: 0 },
];

const tags = [
  'Shopify Plus', 'CRO', 'Mobile UX', 'Checkout', 'Product Pages', 'Landing Pages',
  'A/B Testing', 'Speed', 'Conversion', 'DTC', 'Fashion', 'Streetwear',
  'Drop Campaigns', 'AOV', 'Cart Flows', 'Analytics',
];

function Marquee() {
  const prefersReducedMotion = useReducedMotion();
  const doubled = [...tags, ...tags];

  return (
    /* Pause animation on hover via animation-play-state */
    <div className="marquee-wrapper overflow-hidden py-4" aria-hidden="true">
      <div
        className={`flex gap-4 whitespace-nowrap ${prefersReducedMotion ? '' : 'marquee-track'}`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#A1A1AA] rounded-full px-4 py-1.5 flex-shrink-0"
            style={{ border: '1px solid #232327', background: '#141416' }}
          >
            <span className="w-1 h-1 rounded-full bg-[#CCFF00] flex-shrink-0" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ProofStrip() {
  return (
    <section
      id="proof"
      className="py-20 border-y"
      style={{ background: '#0A0A0B', borderColor: '#232327' }}
      aria-labelledby="proof-heading"
    >
      <Container>
        {/* Animated counters */}
        <StaggerReveal className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#232327] rounded-2xl overflow-hidden mb-16">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="px-8 py-10 flex flex-col gap-2 items-center text-center"
              style={{ background: '#141416' }}
            >
              <span className="font-display text-5xl lg:text-6xl font-bold tracking-tight leading-none text-[#CCFF00]">
                <AnimatedCounter
                  end={m.end}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals}
                />
              </span>
              <span className="text-sm text-[#A1A1AA]">{m.label}</span>
            </div>
          ))}
        </StaggerReveal>

        {/* Marquee */}
        <AnimatedReveal delay={0.1}>
          <Marquee />
        </AnimatedReveal>

        {/* Tagline */}
        <AnimatedReveal delay={0.2} className="mt-8 text-center">
          <p id="proof-heading" className="text-[#A1A1AA] text-sm tracking-wide">
            Built for Shopify brands that take their conversion rate seriously.
          </p>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
