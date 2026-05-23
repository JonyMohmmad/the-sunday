import { Container } from '@/components/ui/Container';
import { AnimatedReveal, StaggerReveal } from '@/components/ui/AnimatedReveal';
import { Button } from '@/components/ui/Button';

const services = [
  {
    number: '01',
    title: 'SaaS Development',
    tag: 'Full product',
    body: 'We design and build your entire SaaS product — auth, billing, user management, dashboards, APIs. Everything from database schema to deploy.',
    highlights: ['Multi-tenant architecture', 'Stripe billing integration', 'Role-based access control', 'Admin dashboard'],
  },
  {
    number: '02',
    title: 'Web Application',
    tag: 'Custom tools',
    body: 'Internal tools, client portals, workflow automation, and business-critical web apps. Built for reliability and speed, not just for looks.',
    highlights: ['Real-time data sync', 'API integrations', 'Responsive UI', 'Performance-first build'],
  },
  {
    number: '03',
    title: 'MVP Studio',
    tag: '4-week delivery',
    body: 'Validate your idea before you over-invest. A focused, shippable MVP with the core loop working — in 4 weeks, at a fixed price.',
    highlights: ['Core feature set only', 'Figma prototype first', 'Launch-ready in 4 weeks', '30-day post-launch support'],
  },
  {
    number: '04',
    title: 'Product Design',
    tag: 'UI/UX',
    body: 'Design systems, user flows, and interface design that make complex software feel simple. We design and hand off Figma-ready for any dev team.',
    highlights: ['Design system creation', 'User flow mapping', 'Component library', 'Dev-ready Figma files'],
  },
];

export default function Offer() {
  return (
    <section id="offer" className="py-24 lg:py-32 bg-[#F7F7F8] border-t border-[#E4E4E7]" aria-labelledby="offer-heading">
      <Container>
        <AnimatedReveal className="max-w-2xl mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#3B3FE4] mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-[#3B3FE4]" />
            What We Build
          </p>
          <h2
            id="offer-heading"
            className="font-display text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-none mb-4"
          >
            Software that ships.
            <br />
            <span className="text-muted">Designed to scale.</span>
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            Engineering and design under one roof means fewer handoffs, faster decisions, and a product
            that actually works the way you imagined it.
          </p>
        </AnimatedReveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {services.map((s) => (
            <article
              key={s.number}
              className="bg-white border border-[#E4E4E7] rounded-2xl p-7 hover:border-[#3B3FE4]/25 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-xs font-bold text-[#3B3FE4] tracking-widest">{s.number}</span>
                <span className="text-xs font-semibold text-[#3B3FE4] bg-[#3B3FE4]/8 px-3 py-1 rounded-full">
                  {s.tag}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-primary tracking-tight mb-3">{s.title}</h3>
              <p className="text-muted text-sm leading-relaxed mb-5">{s.body}</p>
              <ul className="flex flex-col gap-2">
                {s.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-xs text-muted">
                    <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </StaggerReveal>

        <AnimatedReveal delay={0.1} className="text-center">
          <Button href="/teardown" size="lg">
            Tell us what you're building
          </Button>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
