import Nav    from '@/components/layout/Nav';
import Faq    from '@/components/sections/Faq';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers to common questions about working with Lumora Studio — pricing, timelines, technology, and ongoing support for businesses worldwide.',
};

export default function FAQPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '120px' }}>
        <Faq />
      </main>
      <Footer />
    </>
  );
}
