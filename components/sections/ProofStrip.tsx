'use client';

import { useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { AnimatedReveal, StaggerReveal } from '@/components/ui/AnimatedReveal';

const metrics = [
  { value: '40+', label: 'products shipped' },
  { value: '4 wks', label: 'average MVP delivery' },
  { value: '99.9%', label: 'uptime delivered' },
];

const tags = [
  'SaaS', 'Web App', 'Dashboard', 'API', 'Auth', 'Billing',
  'Analytics', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Stripe',
  'AI Integration', 'Mobile', 'Real-time', 'Enterprise',
];

function Marquee() {
  const prefersReducedMotion = useReducedMotion();
  const doubled = [...tags, ...tags];

  return (
    <div className="overflow-hidden py-4" aria-hidden="true">
      <div
        className={`flex gap-4 whitespace-nowrap ${prefersReducedMotion ? '' : 'marquee-track'}`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted border border-[#E4E4E7] rounded-full px-4 py-1.5 flex-shrink-0 bg-white"
          >
            <span className="w-1 h-1 rounded-full bg-[#3B3FE4] flex-shrink-0" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ProofStrip() {
  return (
    <section id="proof" className="py-20 bg-[#F7F7F8] border-y border-[#E4E4E7]" aria-labelledby="proof-heading">
      <Container>
        {/* Metrics */}
        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#E4E4E7] rounded-2xl overflow-hidden mb-16">
          {metrics.map((m) => (
            <div
              key={m.value}
              className="bg-white px-8 py-10 flex flex-col gap-2 sm:items-center sm:text-center"
            >
              <span className="font-display text-5xl lg:text-6xl font-bold tracking-tight leading-none text-[#3B3FE4]">
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
            Built for startups and businesses that take their software seriously.
          </p>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
