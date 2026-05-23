import Nav from '@/components/sections/Nav';
import Hero from '@/components/sections/Hero';
import ProofStrip from '@/components/sections/ProofStrip';
import Problem from '@/components/sections/Problem';
import Offer from '@/components/sections/Offer';
import Process from '@/components/sections/Process';
import Work from '@/components/sections/Work';
import Pricing from '@/components/sections/Pricing';
import Team from '@/components/sections/Team';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProofStrip />
        <Problem />
        <Offer />
        <Process />
        <Work />
        <Pricing />
        <Team />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
