import type { Metadata } from 'next';
import Nav            from '@/components/layout/Nav';
import Footer         from '@/components/layout/Footer';
import PricingSection from '@/components/sections/PricingSection';
import Faq            from '@/components/sections/Faq';
import CtaSection     from '@/components/sections/CtaSection';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing. Start free with Hobby, scale with Pro at $49/mo, or get custom Enterprise pricing. No hidden fees.',
};

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '80px' }}>
        <div className="text-center pt-16 pb-4 px-4">
          <h1
            className="font-bold tracking-tight mb-4"
            style={{
              fontSize: 'clamp(40px, 5vw, 64px)',
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              lineHeight: 1.05,
            }}
          >
            Pricing that scales with you.
          </h1>
          <p
            className="text-[18px] leading-relaxed mx-auto"
            style={{ color: 'var(--text-2)', maxWidth: '520px' }}
          >
            Start free. No credit card needed. Upgrade when your team is ready.
          </p>
        </div>
        <PricingSection />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
