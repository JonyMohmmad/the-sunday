import { Container } from '@/components/ui/Container';
import { AnimatedReveal, StaggerReveal } from '@/components/ui/AnimatedReveal';

const steps = [
  {
    number: '01',
    title: 'Discover',
    body: 'We map your users, goals, and constraints in a focused workshop. Out comes a product spec, architecture plan, and realistic roadmap — before a line of code is written.',
  },
  {
    number: '02',
    title: 'Design',
    body: 'Full Figma prototype with every screen, state, and user flow. You see the entire product before we build it. No surprises, no mid-build pivots.',
  },
  {
    number: '03',
    title: 'Build',
    body: 'Iterative sprints with weekly demos. Clean, documented code. We ship incrementally so you can give feedback on real working software, not static mocks.',
  },
  {
    number: '04',
    title: 'Launch & Scale',
    body: 'We deploy, monitor, and stay on-call for 30 days post-launch. When you\'re ready to grow, we have retainer options to keep building alongside you.',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 lg:py-32 bg-white border-t border-[#E4E4E7]" aria-labelledby="process-heading">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">

          {/* Left label */}
          <AnimatedReveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#3B3FE4] mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-[#3B3FE4]" />
              How We Work
            </p>
            <h2
              id="process-heading"
              className="font-display text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-none mb-6"
            >
              Four steps.
              <br />
              <span className="text-muted">Zero ambiguity.</span>
            </h2>
            <p className="text-muted text-base leading-relaxed">
              Every project follows the same proven process. You always know where we are, what comes next, and when you'll have something to show your users.
            </p>
          </AnimatedReveal>

          {/* Steps */}
          <StaggerReveal className="flex flex-col">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`flex gap-8 py-8 ${i < steps.length - 1 ? 'border-b border-[#E4E4E7]' : ''}`}
              >
                <span className="font-display text-4xl font-bold text-[#3B3FE4] leading-none flex-shrink-0 w-12 pt-1 opacity-40">
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
