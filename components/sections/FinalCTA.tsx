import { Container } from '@/components/ui/Container';
import { AnimatedReveal } from '@/components/ui/AnimatedReveal';
import { Button } from '@/components/ui/Button';

export default function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative py-32 lg:py-40 overflow-hidden border-t border-[#232327]"
      aria-labelledby="cta-heading"
    >
      {/* Accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(204,255,0,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Top border with glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(204,255,0,0.5), transparent)',
        }}
      />

      <Container className="relative text-center">
        <AnimatedReveal>
          <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-6 flex items-center justify-center gap-2">
            <span className="w-4 h-px bg-accent" />
            Free, no-strings teardown
            <span className="w-4 h-px bg-accent" />
          </p>

          <h2
            id="cta-heading"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary tracking-tight leading-none mb-6 max-w-3xl mx-auto"
          >
            Want to see what we'd change
            <br />
            <span className="text-accent">about your store?</span>
          </h2>

          <p className="text-muted text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Free, no-strings teardown of one section of your Shopify store.
            We'll show you exactly what's costing you sales — whether you hire us or not.
          </p>

          {/* TODO: Replace # with real Cal.com / Calendly link */}
          <Button href="#" size="lg" className="text-base px-10 py-5">
            Get your free teardown
          </Button>

          <p className="text-xs text-muted mt-6">
            No pitch, no pressure. Just a specific, honest look at your store.
          </p>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
