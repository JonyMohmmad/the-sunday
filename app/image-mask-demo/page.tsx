import type { Metadata } from 'next';
import ImageMaskText from '@/components/ImageMaskText/ImageMaskText';
import ImageMaskTextExamples from '@/components/ImageMaskText/Example';

export const metadata: Metadata = {
  title: 'ImageMaskText demo',
  robots: { index: false, follow: false },
};

/**
 * Next.js App Router example.
 * The page is a Server Component; ImageMaskText is a Client Component and is
 * imported directly — no extra wiring needed.
 */
export default function ImageMaskDemoPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
      {/* Hero usage */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6">
        <ImageMaskText
          text="LUMORA"
          image="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=2400"
          fontSize="clamp(4rem, 20vw, 18rem)"
          fontWeight={900}
          letterSpacing="-0.04em"
          imageFit="cover"
          animated
          animationType="zoom"
          aria-label="Lumora"
        />
      </section>

      <ImageMaskTextExamples />
    </main>
  );
}
