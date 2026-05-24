import { Container } from '@/components/ui/Container';
import { AnimatedReveal, StaggerReveal } from '@/components/ui/AnimatedReveal';

const founders = [
  {
    name: 'Mahir',
    role: 'Product Strategy',
    detail: 'Bridges business goals and engineering reality. Runs discovery workshops, defines product scope, and manages client relationships from start to launch.',
    initials: 'M',
    color: '#3B3FE4',
  },
  {
    name: 'Tahsin',
    role: 'Architecture & Backend',
    detail: 'Designs systems that scale. Full-stack engineer specialising in APIs, databases, infrastructure, and the architectural decisions that keep products fast under load.',
    initials: 'T',
    color: '#7C3AED',
  },
  {
    name: 'Jony',
    role: 'Design & Frontend',
    detail: 'Creates interfaces people love using. From Figma design system to production-ready React — Jony makes sure the engineering works the way it looks.',
    initials: 'J',
    color: '#09090B',
  },
];

const trustSignals = [
  'Senior engineers only — no outsourcing, no juniors',
  'You work directly with the people building it',
  'US / EU timezone overlap — responsive and available',
  'Fixed pricing — no invoice surprises, ever',
];

export default function Team() {
  return (
    <section id="team" className="py-24 lg:py-32 bg-[#F7F7F8] border-t border-[#E4E4E7]" aria-labelledby="team-heading">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">

          {/* Left */}
          <AnimatedReveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#3B3FE4] mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-[#3B3FE4]" />
              The Team
            </p>
            <h2
              id="team-heading"
              className="font-display text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-none mb-6"
            >
              Engineers who think
              <br />
              <span className="text-muted">like founders.</span>
            </h2>
            <p className="text-muted text-base leading-relaxed mb-8">
              We&apos;re Mahir, Tahsin, and Jony — software engineers who&apos;d rather build real products than
              write enterprise tickets. You work directly with the people building your software.
              No account managers, no juniors, no 12-week timelines.
            </p>

            <ul className="flex flex-col gap-3" role="list">
              {trustSignals.map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-primary/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </AnimatedReveal>

          {/* Founder cards */}
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {founders.map((f) => (
              <article
                key={f.name}
                className="bg-white border border-[#E4E4E7] rounded-2xl p-6 hover:border-[#3B3FE4]/30 hover:shadow-sm transition-all duration-200"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ background: f.color }}
                >
                  <span className="font-display font-bold text-lg text-white" aria-label={`${f.name}'s avatar`}>
                    {f.initials}
                  </span>
                </div>
                <h3 className="font-display font-bold text-primary text-base tracking-tight">
                  {f.name}
                </h3>
                <p className="text-xs font-semibold mt-0.5 mb-3" style={{ color: f.color }}>{f.role}</p>
                <p className="text-xs text-muted leading-relaxed">{f.detail}</p>
              </article>
            ))}
          </StaggerReveal>

        </div>
      </Container>
    </section>
  );
}
