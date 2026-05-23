import { Container } from '@/components/ui/Container';
import { AnimatedReveal, StaggerReveal } from '@/components/ui/AnimatedReveal';

const painPoints = [
  {
    icon: '⏱',
    title: 'It loads in 6 seconds',
    body: "Mobile shoppers leave in 3. Every second costs you sales — and you're paying Meta to send them there.",
  },
  {
    icon: '📉',
    title: 'Your PDPs don\'t close',
    body: 'Weak product pages with amateur photos, no social proof structure, and a CTA that disappears on mobile.',
  },
  {
    icon: '🛒',
    title: 'Checkout is a graveyard',
    body: "Cluttered, trust-free, multiple friction points. 70% of carts abandoned and you're left wondering why.",
  },
  {
    icon: '😬',
    title: 'The store doesn\'t match the brand',
    body: 'Your Instagram is editorial. Your store looks like it was built by a Fiverr designer in 2019.',
  },
];

export default function Problem() {
  return (
    <section id="problem" className="py-24 lg:py-32" aria-labelledby="problem-heading">
      <Container>
        <div className="max-w-3xl mb-16">
          <AnimatedReveal>
            <h2
              id="problem-heading"
              className="font-display text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-none mb-6"
            >
              Your Instagram is fire.
              <br />
              <span className="text-muted">Your store isn't.</span>
            </h2>
          </AnimatedReveal>
          <AnimatedReveal delay={0.1}>
            <p className="text-muted text-lg leading-relaxed">
              Beautiful product photography. 80K followers. And a store that loads in 6 seconds,
              converts at 1%, and you're quietly embarrassed to link. Every day that store leaks
              money you spent real ad budget to earn.
            </p>
          </AnimatedReveal>
        </div>

        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {painPoints.map((p) => (
            <article
              key={p.title}
              className="group bg-surface border border-[#232327] rounded-xl p-6 lg:p-8 hover:border-accent/40 transition-colors duration-200"
            >
              <div className="text-2xl mb-4" aria-hidden="true">{p.icon}</div>
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
