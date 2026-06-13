import Nav    from '@/components/layout/Nav';
import Faq    from '@/components/sections/Faq';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — Forge',
  description: 'Common questions about Forge — pricing, billing, security, and support.',
};

export default function FAQPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '80px' }}>
        <Faq />
      </main>
      <Footer />
    </>
  );
}
