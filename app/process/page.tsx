import Nav from '@/components/layout/Nav';
import ProcessSteps from '@/components/sections/ProcessSteps';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Process',
  description:
    'How Lumora Studio takes your project from first call to launch — discovery, design, build, and launch. A clear process with fixed pricing and no surprises.',
};

export default function ProcessPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '80px' }}>
        <ProcessSteps />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
