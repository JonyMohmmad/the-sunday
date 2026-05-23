import { Container } from '@/components/ui/Container';
import { AnimatedReveal, StaggerReveal } from '@/components/ui/AnimatedReveal';

const steps = [
  {
    number: '01',
    title: 'Audit',
    body: 'We tear apart your current store — heatmaps, session recordings, speed traces, checkout funnel. We find exactly what\'s leaking revenue.',
  },
  {
    number: '02',
    title: 'Design',
    body: 'A full Figma prototype built around your brand and conversion goals. Every screen reviewed and approved before we touch Shopify.',
  },
  {
    number: '03',
    title: 'Build',
    body: 'Clean, fast Shopify code. No bloated apps, no theme hacks. Built to Lighthouse 90+ standards on day one.',
  },
  {
    number: '04',
    title: 'Launch + Monitor',
    body: 'We go live, watch your analytics for 30 days, and fix anything that underperforms. Launch is not the finish line.',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 lg:py-32 border-t border-[#232327]" aria-labelledby="process-heading">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">

          {/* Left label */}
          <AnimatedReveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-accent" />
              How It Works
            </p>
            <h2
              id="process-heading"
              className="font-display text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-none"
            >
              Four steps.
              <br />
              <span className="text-muted">No ambiguity.</span>
            </h2>
          </AnimatedReveal>

          {/* Steps */}
          <StaggerReveal className="flex flex-col">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`flex gap-8 py-8 ${i < steps.length - 1 ? 'border-b border-[#232327]' : ''}`}
              >
                <span className="font-display text-4xl font-bold text-accent leading-none flex-shrink-0 w-12 pt-1">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-primary tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted text-base leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </StaggerReveal>

        </div>
      </Container>
    </section>
  );
}
