import Navbar from '@/components/mentality/Navbar';
import Hero from '@/components/mentality/Hero';
import LogoWall from '@/components/sections/LogoWall';
import Services from '@/components/sections/Services';
import AgenticSolutions from '@/components/sections/AgenticSolutions';
import Work from '@/components/sections/Work';
import Metrics from '@/components/sections/Metrics';
import ProcessSteps from '@/components/sections/ProcessSteps';
import Testimonials from '@/components/sections/Testimonials';
import PricingSection from '@/components/sections/PricingSection';
import Faq from '@/components/sections/Faq';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      {/* Light Mentality-style hero block — `relative z-10` + opaque bg-base
          paints over the global teal body layers, scoping the light theme
          to just the navbar + hero. */}
      <div
        className="relative z-10 bg-bg-base antialiased selection:bg-brand-green selection:text-black"
        style={{ fontFamily: 'var(--font-inter)', color: 'var(--text)' }}
      >
        <Navbar />
        <Hero />
      </div>

      {/* Restored Lumora sections — original dark/teal theme. */}
      <main>
        <LogoWall />
        <Services />
        <AgenticSolutions />
        <Work />
        <Metrics />
        <ProcessSteps />
        <Testimonials />
        <PricingSection />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
