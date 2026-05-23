import { Container } from '@/components/ui/Container';
import { AnimatedReveal, StaggerReveal } from '@/components/ui/AnimatedReveal';

// REPLACE: Swap placeholder avatars with real founder photos
const founders = [
  {
    name: 'Mahir',
    role: 'Sales & Strategy',
    detail: 'Talks to brands, identifies conversion opportunities, runs client relationships.',
    initials: 'M',
  },
  {
    name: 'Tahsin',
    role: 'Research & CRO',
    detail: 'Digs into analytics, designs experiments, and finds the data story behind every decision.',
    initials: 'T',
  },
  {
    name: 'Jony',
    role: 'Design & Build',
    detail: 'Translates strategy into pixel-perfect Shopify stores that load fast and look editorial.',
    initials: 'J',
  },
];

const trustSignals = [
  'Trained software engineers',
  'US / EU hours overlap',
  'Weekly Loom updates',
  'Fixed pricing — no invoicing surprises',
];

export default function Team() {
  return (
    <section id="team" className="py-24 lg:py-32 border-t border-[#232327]" aria-labelledby="team-heading">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">

          {/* Left */}
          <AnimatedReveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-accent" />
              The Team
            </p>
            <h2
              id="team-heading"
              className="font-display text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-none mb-6"
            >
              Three engineers obsessed with conversion
              <br />
              <span className="text-muted">and culture.</span>
            </h2>
            <p className="text-muted text-base leading-relaxed mb-8">
              We're Mahir, Tahsin, and Jony — software engineers who'd rather make streetwear brands more money
              than write enterprise Java. You work directly with the people building your store.
              No account managers, no juniors, no 12-week timelines.
            </p>

            {/* Trust signals */}
            <ul className="flex flex-col gap-3" role="list">
              {trustSignals.map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-primary/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </AnimatedReveal>

          {/* Founder cards */}
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {founders.map((f) => (
              <article
                key={f.name}
                className="bg-surface border border-[#232327] rounded-xl p-6 hover:border-accent/30 transition-colors duration-200"
              >
                {/* Avatar placeholder — REPLACE with real photo via next/image */}
                <div className="w-12 h-12 rounded-full bg-[#232327] flex items-center justify-center mb-4">
                  <span className="font-display font-bold text-lg text-accent" aria-label={`${f.name}'s avatar`}>
                    {f.initials}
                  </span>
                </div>
                <h3 className="font-display font-bold text-primary text-base tracking-tight">
                  {f.name}
                </h3>
                <p className="text-xs text-accent font-semibold mt-0.5 mb-3">{f.role}</p>
                <p className="text-xs text-muted leading-relaxed">{f.detail}</p>
              </article>
            ))}
          </StaggerReveal>

        </div>
      </Container>
    </section>
  );
}
