import { Container } from '@/components/ui/Container';
import { AnimatedReveal, StaggerReveal } from '@/components/ui/AnimatedReveal';
import { Button } from '@/components/ui/Button';

const plans = [
  {
    name: 'Conversion Redesign',
    price: 'from $2,500',
    frequency: 'one-time · fixed scope',
    description: 'A full Shopify store redesign built to convert. Fixed price, fixed timeline, no surprises.',
    highlighted: false,
    features: [
      'Full store audit & conversion analysis',
      'Complete Figma prototype (all screens)',
      'Shopify theme build — clean, no bloat',
      'Mobile-first, Lighthouse 90+ target',
      'Homepage, PDPs, collection, cart & checkout',
      '30-day post-launch monitoring',
      'Weekly Loom video updates throughout',
    ],
    cta: 'Get a free store teardown',
    ctaHref: '#',
  },
  {
    name: 'Growth Retainer',
    price: 'from $800/mo',
    frequency: 'ongoing · cancel anytime',
    description: 'Continuous CRO, landing pages, drop pages, and speed optimisation. Your store keeps improving every month.',
    highlighted: true,
    features: [
      'Monthly conversion experiments',
      'New landing & drop pages as needed',
      'A/B test design and analysis',
      'Ongoing speed & Core Web Vitals tuning',
      'Email → store landing page builds',
      'Priority response & Slack access',
      'Monthly performance report',
    ],
    cta: 'Talk to us about retainer',
    ctaHref: '#',
  },
];

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32 border-t border-[#232327]" aria-labelledby="pricing-heading">
      <Container>
        <AnimatedReveal className="max-w-2xl mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-accent" />
            Pricing
          </p>
          <h2
            id="pricing-heading"
            className="font-display text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-none mb-4"
          >
            Straightforward pricing.
            <br />
            <span className="text-muted">No discovery-call games.</span>
          </h2>
        </AnimatedReveal>

        <StaggerReveal className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-xl p-8 flex flex-col gap-6 transition-colors duration-200 ${
                plan.highlighted
                  ? 'bg-surface border-2 border-accent/40 hover:border-accent/70'
                  : 'bg-surface border border-[#232327] hover:border-[#3a3a3e]'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-8">
                  <span className="bg-accent text-[#0A0A0B] text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                    Popular
                  </span>
                </div>
              )}

              <div>
                <h3 className="font-display text-xl font-bold text-primary tracking-tight mb-1">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-3 mb-1">
                  <span className="font-display text-3xl font-bold text-primary">{plan.price}</span>
                </div>
                <span className="text-xs text-muted">{plan.frequency}</span>
              </div>

              <p className="text-muted text-sm leading-relaxed">{plan.description}</p>

              <ul className="flex flex-col gap-3" role="list">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-primary/90">
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-2">
                {/* TODO: Replace # with real Cal.com / Calendly link */}
                <Button
                  href={plan.ctaHref}
                  variant={plan.highlighted ? 'primary' : 'ghost'}
                  className="w-full justify-center"
                >
                  {plan.cta}
                </Button>
              </div>
            </article>
          ))}
        </StaggerReveal>

        <AnimatedReveal delay={0.15} className="text-center">
          <p className="text-sm text-muted">
            <span className="text-accent font-semibold">Founder's pricing</span> for our first cohort of brands.
            Rates go up once we have 3 case studies published.
          </p>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
