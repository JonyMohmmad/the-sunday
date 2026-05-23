import Nav from '@/components/sections/Nav';
import Work from '@/components/sections/Work';
import Footer from '@/components/sections/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work — The Sunday',
  description: 'Conversion-focused Shopify redesigns for fashion DTC brands. See our results.',
};

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        <Work />
      </main>
      <Footer />
    </>
  );
}
