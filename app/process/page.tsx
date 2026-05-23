import Nav from '@/components/sections/Nav';
import Process from '@/components/sections/Process';
import Footer from '@/components/sections/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Process — The Sunday',
  description: 'How we redesign your Shopify store in 3 weeks — audit, design, build, launch.',
};

export default function ProcessPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        <Process />
      </main>
      <Footer />
    </>
  );
}
