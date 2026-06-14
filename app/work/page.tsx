import Nav from '@/components/layout/Nav';
import WorkGallery from '@/components/sections/WorkGallery';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Selected web design and development projects by Lumora Studio — e-commerce stores, marketing sites, and web apps that drove real growth for businesses worldwide.',
};

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '120px' }}>
        <div className="text-center pb-4 px-4">
          <h1
            className="font-bold tracking-tight mb-4"
            style={{
              fontSize: 'clamp(40px, 5vw, 64px)',
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              lineHeight: 1.05,
            }}
          >
            Work that drives growth.
          </h1>
          <p
            className="text-[18px] leading-relaxed mx-auto"
            style={{ color: 'var(--text-2)', maxWidth: '560px' }}
          >
            A look at recent projects and the measurable results they delivered.
            Filter by industry to see work like yours.
          </p>
        </div>
        <WorkGallery />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
