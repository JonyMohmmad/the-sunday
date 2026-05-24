'use client';

import { Container } from '@/components/ui/Container';
import { AnimatedReveal, StaggerReveal } from '@/components/ui/AnimatedReveal';
import { DualCTA } from '@/components/ui/DualCTA';
import { AuditModal } from '@/components/ui/AuditModal';
import { ROICalculator } from '@/components/ui/ROICalculator';
import { useAuditModal } from '@/lib/useAuditModal';

const plans = [
  {
    name: 'MVP Studio',
    price: 'from $8,500',
    frequency: 'one-time · fixed scope',
    description: 'Go from idea to live product in 4 weeks. Core features only — no bloat, no scope creep. The fastest path to real user feedback.',
    highlighted: false,
    features: [
      'Product discovery workshop',
      'Full Figma prototype (all screens)',
      'Full-stack web app build',
      'Auth, basic user management',
      'Deploy to production (Vercel / AWS)',
      '30-day post-launch support',
      'Handover docs & recorded walkthroughs',
    ],
    ctaSource: 'pricing_starter',
    ctaLabel: undefined as string | undefined,
  },
  {
    name: 'SaaS Build',
    price: 'from $18,000',
    frequency: 'one-time · full product',
    description: 'A complete, production-ready SaaS. Multi-tenant architecture, billing, dashboards, admin panel — the full stack your business needs.',
    highlighted: true,
    features: [
      'Everything in MVP Studio',
      'Multi-tenant SaaS architecture',
      'Stripe billing & subscription management',
      'Role-based access control',
      'Admin dashboard & analytics',
      'API documentation',
      '60-day post-launch support',
    ],
    ctaSource: 'pricing_pro',
    ctaLabel: "Book a call — let's scope it",
  },
  {
    name: 'Scale Retainer',
    price: 'from $4,000/mo',
    frequency: 'ongoing · cancel anytime',
    description: 'Continuous product development. New features every sprint, performance monitoring, and a dedicated engineering team — on demand.',
    highlighted: false,
    features: [
      'Dedicated sprint capacity (2-week cycles)',
      'New features shipped every sprint',
      'Performance & uptime monitoring',
      'Priority Slack & video support',
      'Monthly product strategy session',
      'Architecture review & refactoring',
      'Unlimited bug fixes',
    ],
    ctaSource: 'pricing_retainer',
    ctaLabel: undefined as string | undefined,
  },
];

export default function Pricing() {
  const { isOpen, open, close } = useAuditModal();

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-[#F7F7F8] border-t border-[#E4E4E7]" aria-labelledby="pricing-heading">
      <Container>
        <AnimatedReveal className="max-w-2xl mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#3B3FE4] mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-[#3B3FE4]" />
            Pricing
          </p>
          <h2
            id="pricing-heading"
            className="font-display text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-none mb-4"
          >
            Clear pricing.
            <br />
            <span className="text-muted">No hidden fees, ever.</span>
          </h2>
        </AnimatedReveal>

        {/* ROI Calculator */}
        <AnimatedReveal className="mb-14">
          <h3 className="font-display text-xl font-bold text-primary mb-2">
            Calculate your potential upside
          </h3>
          <p className="text-sm text-muted mb-8">
            Adjust the sliders to see what our typical 2.4× CVR lift means for your store.
          </p>
          <ROICalculator />
        </AnimatedReveal>

        <StaggerReveal className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col gap-6 transition-all duration-200 ${
                plan.highlighted
                  ? 'bg-[#09090B] border-2 border-[#09090B] shadow-xl'
                  : 'bg-white border border-[#E4E4E7] hover:border-[#3B3FE4]/30 hover:shadow-md'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-8">
                  <span className="bg-accent text-[#09090B] text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                <h3 className={`font-display text-xl font-bold tracking-tight mb-1 ${plan.highlighted ? 'text-white' : 'text-primary'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-3 mb-1">
                  <span className={`font-display text-3xl font-bold ${plan.highlighted ? 'text-white' : 'text-primary'}`}>
                    {plan.price}
                  </span>
                </div>
                <span className={`text-xs ${plan.highlighted ? 'text-white/50' : 'text-muted'}`}>{plan.frequency}</span>
              </div>

              <p className={`text-sm leading-relaxed ${plan.highlighted ? 'text-white/70' : 'text-muted'}`}>
                {plan.description}
              </p>

              <ul className="flex flex-col gap-3 flex-1" role="list">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-start gap-3 text-sm ${plan.highlighted ? 'text-white/85' : 'text-primary/90'}`}>
                    <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-accent' : 'text-[#3B3FE4]'}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-2">
                <DualCTA
                  source={plan.ctaSource}
                  primaryLabel={plan.ctaLabel}
                  onAuditClick={open}
                  size="md"
                />
              </div>
            </article>
          ))}
        </StaggerReveal>

        <AnimatedReveal delay={0.15} className="text-center">
          <p className="text-sm text-muted">
            <span className="text-[#3B3FE4] font-semibold">Founder pricing</span> for our first cohort of clients.
            Rates increase once we publish 5 case studies.
          </p>
        </AnimatedReveal>
      </Container>

      <AuditModal isOpen={isOpen} onClose={close} />
    </section>
  );
}
