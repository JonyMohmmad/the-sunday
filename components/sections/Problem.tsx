import { Container } from '@/components/ui/Container';
import { AnimatedReveal, StaggerReveal } from '@/components/ui/AnimatedReveal';

const painPoints = [
  {
    number: '01',
    title: 'Agencies take months to ship anything',
    body: 'You get a 12-week timeline, a project manager you never meet, and a demo three months later that doesn\'t match what you asked for.',
  },
  {
    number: '02',
    title: 'Freelancers ship fast — and badly',
    body: 'Speed without architecture. You launch, hit scale, and the whole thing collapses. Rewrites cost more than building it right the first time.',
  },
  {
    number: '03',
    title: 'Design is treated as an afterthought',
    body: 'Most dev shops wire up the backend then throw a template on top. Users feel the difference — and they churn because of it.',
  },
  {
    number: '04',
    title: 'No one thinks in terms of your product',
    body: 'You\'re given what you asked for, not what you needed. Engineers who only write tickets don\'t ship products. Product thinkers do.',
  },
];

export default function Problem() {
  return (
    <section id="problem" className="py-24 lg:py-32 bg-white" aria-labelledby="problem-heading">
      <Container>
        <div className="max-w-3xl mb-16">
          <AnimatedReveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#3B3FE4] mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-[#3B3FE4]" />
              The Problem
            </p>
            <h2
              id="problem-heading"
              className="font-display text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-none mb-6"
            >
              Good ideas deserve
              <br />
              <span className="text-muted">better software shops.</span>
            </h2>
          </AnimatedReveal>
          <AnimatedReveal delay={0.1}>
            <p className="text-muted text-lg leading-relaxed">
              The space between a great product idea and a great product is filled with slow agencies,
              fragile freelancer code, and zero product thinking. We built The Sunday to close that gap.
            </p>
          </AnimatedReveal>
        </div>

        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {painPoints.map((p) => (
            <article
              key={p.title}
              className="group bg-[#F7F7F8] border border-[#E4E4E7] rounded-2xl p-6 lg:p-8 hover:border-[#3B3FE4]/30 hover:shadow-sm transition-all duration-200"
            >
              <div className="font-display text-xs font-bold text-[#3B3FE4] tracking-widest mb-5">
                {p.number}
              </div>
              <h3 className="font-display text-lg font-bold text-primary mb-3 tracking-tight">
                {p.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{p.body}</p>
            </article>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
