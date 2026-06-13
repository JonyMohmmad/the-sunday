'use client';

import { useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import StaggerGrid from '@/components/ui/StaggerGrid';
import NumberTicker from '@/components/ui/NumberTicker';

interface MetricItem {
  value:    number;
  suffix:   string;
  label:    string;
  decimals: number;
  prefix?:  string;
}

const metrics: MetricItem[] = [
  { value: 47,  suffix: '+',   label: 'stores optimised',   decimals: 0 },
  { value: 2.3, prefix: '$', suffix: 'M+', label: 'revenue generated', decimals: 1 },
  { value: 3.1, suffix: '×',   label: 'average CVR lift',   decimals: 1 },
  { value: 18,  suffix: ' days', label: 'average delivery', decimals: 0 },
];

const tags = [
  'Shopify Plus', 'CRO', 'Mobile UX', 'Checkout', 'Product Pages', 'Landing Pages',
  'A/B Testing', 'Speed', 'Conversion', 'Brand Building', 'Small Business', 'Growth',
  'Big Brand Results', 'AOV', 'Cart Flows', 'Analytics',
];

function Marquee() {
  const prefersReducedMotion = useReducedMotion();
  const doubled = [...tags, ...tags];

  return (
    <div className="marquee-wrapper overflow-hidden py-4" aria-hidden="true">
      <div
        className={`flex gap-4 whitespace-nowrap ${prefersReducedMotion ? '' : 'marquee-track'}`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#71717A] rounded-full px-4 py-1.5 flex-shrink-0"
            style={{ border: '1px solid #E4E4E7', background: '#F7F7F8' }}
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
      style={{ background: '#FFFFFF', borderColor: '#E4E4E7' }}
      aria-labelledby="proof-heading"
    >
      <Container>
        <StaggerGrid className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#E4E4E7] rounded-2xl overflow-hidden mb-16">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="px-8 py-10 flex flex-col gap-2 items-center text-center"
              style={{ background: '#F7F7F8' }}
            >
              <span className="font-display text-5xl lg:text-6xl font-bold tracking-tight leading-none text-[#CCFF00]">
                <NumberTicker
                  value={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals}
                />
              </span>
              <span className="text-sm text-[#71717A]">{m.label}</span>
            </div>
          ))}
        </StaggerGrid>

        <RevealOnScroll delay={0.1}>
          <Marquee />
        </RevealOnScroll>

        <RevealOnScroll delay={0.2} className="mt-8 text-center">
          <p id="proof-heading" className="text-[#71717A] text-sm tracking-wide">
            Built for Shopify brands that take their conversion rate seriously.
          </p>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
