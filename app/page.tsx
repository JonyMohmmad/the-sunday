import Nav            from '@/components/layout/Nav';
import Footer         from '@/components/layout/Footer';
import Hero           from '@/components/sections/Hero';
import LogoWall       from '@/components/sections/LogoWall';
import Features       from '@/components/sections/Features';
import Metrics        from '@/components/sections/Metrics';
import Testimonials   from '@/components/sections/Testimonials';
import PricingSection from '@/components/sections/PricingSection';
import Faq            from '@/components/sections/Faq';
import CtaSection     from '@/components/sections/CtaSection';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LogoWall />
        <Features />
        <Metrics />
        <Testimonials />
        <PricingSection />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
