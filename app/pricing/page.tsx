import Nav from '@/components/sections/Nav';
import Pricing from '@/components/sections/Pricing';
import Footer from '@/components/sections/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — The Sunday',
  description: 'Fixed-price Shopify redesign packages. No surprises, no hourly billing.',
};

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
