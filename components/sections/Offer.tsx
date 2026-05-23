import { Container } from '@/components/ui/Container';
import { AnimatedReveal, StaggerReveal } from '@/components/ui/AnimatedReveal';
import { Button } from '@/components/ui/Button';

const pillars = [
  {
    number: '01',
    title: 'Conversion lift',
    target: '20–40% target',
    body: 'Every design decision is a hypothesis. We track it, test it, and iterate based on data — not aesthetics alone.',
  },
  {
    number: '02',
    title: 'Sub-2s mobile',
    target: 'Speed guarantee',
    body: 'Optimized images, minimal JS, correct asset loading order. We build like your Core Web Vitals depend on it — because they do.',
  },
  {
    number: '03',
    title: 'Brand presentation',
    target: 'Instagram-level quality',
    body: 'A store as bold and intentional as your best post. Typography, hierarchy, and detail that makes your product feel premium.',
  },
];

const timeline = [
  { week: 'Week 1', title: 'Audit & Strategy', body: 'Deep store analysis, competitor teardown, conversion opportunity map.' },
  { week: 'Week 2', title: 'Design', body: 'Full Figma prototype. You see every screen before a line of code is written.' },
  { week: 'Week 3', title: 'Build & Launch', body: 'Clean Shopify implementation. QA on real devices, then go live.' },
  { week: '+30 days', title: 'Monitor', body: 'We watch your analytics and fix any metric that moves the wrong way — on us.' },
];

export default function Offer() {
  return (
    <section id="offer" className="py-24 lg:py-32 border-t border-[#232327]" aria-labelledby="offer-heading">
      <Container>
        {/* Heading */}
        <AnimatedReveal className="max-w-2xl mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-accent" />
            The Service
          </p>
          <h2
            id="offer-heading"
            className="font-display text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-none"
          >
            The Conversion Redesign
          </h2>
        </AnimatedReveal>

        {/* Pillars */}
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {pillars.map((p) => (
            <article
              key={p.number}
              className="bg-surface border border-[#232327] rounded-xl p-6 lg:p-8 hover:border-accent/30 transition-colors duration-200"
            >
              <div className="font-display text-xs font-bold text-accent tracking-widest mb-6">
                {p.number}
              </div>
              <h3 className="font-display text-xl font-bold text-primary tracking-tight mb-1">
                {p.title}
              </h3>
              <div className="text-xs text-accent font-semibold mb-4">{p.target}</div>
              <p className="text-muted text-sm leading-relaxed">{p.body}</p>
            </article>
          ))}
        </StaggerReveal>

        {/* Timeline */}
        <AnimatedReveal>
          <div className="border border-[#232327] rounded-xl overflow-hidden mb-10">
            <div className="px-6 py-4 border-b border-[#232327] bg-surface">
              <span className="text-xs font-semibold tracking-widest uppercase text-muted">
                Timeline — 3 weeks start to launch
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#232327]">
              {timeline.map((t) => (
                <div key={t.week} className="p-6">
                  <div className="text-xs font-bold text-accent tracking-widest uppercase mb-3">
                    {t.week}
                  </div>
                  <div className="font-display font-bold text-primary text-base mb-2">
                    {t.title}
                  </div>
                  <p className="text-muted text-xs leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={0.1} className="text-center">
          {/* TODO: Replace # with real Cal.com / Calendly link */}
          <Button href="#" size="lg">
            See if your store qualifies
          </Button>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
