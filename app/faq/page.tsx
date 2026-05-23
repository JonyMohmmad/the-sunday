import Nav from '@/components/sections/Nav';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — The Sunday',
  description: 'Common questions about working with The Sunday — timeline, pricing, and process.',
};

export default function FAQPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
