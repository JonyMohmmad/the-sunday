'use client';

import ImageMaskText from './ImageMaskText';
import ImageMaskTextTailwind from './ImageMaskTextTailwind';

/**
 * Example gallery for ImageMaskText — covers each major mode.
 * Drop <ImageMaskTextExamples /> anywhere to preview.
 */
export default function ImageMaskTextExamples() {
  return (
    <div className="flex flex-col gap-24 py-24">
      {/* 1 — cover, the classic hero use */}
      <section className="px-6 text-center">
        <ImageMaskText
          text="LUMORA"
          image="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=2000"
          fontSize="clamp(4rem, 16vw, 14rem)"
          fontWeight={900}
          letterSpacing="-0.03em"
          imageFit="cover"
          aria-label="Lumora"
        />
      </section>

      {/* 2 — animated Ken Burns zoom + stroke */}
      <section className="px-6 text-center">
        <ImageMaskText
          text="Design that moves"
          image="https://images.unsplash.com/photo-1493514789931-586cb221d7a7?q=80&w=2000"
          fontSize="clamp(2.5rem, 9vw, 8rem)"
          fontWeight={800}
          animated
          animationType="zoom"
          strokeColor="rgba(255,255,255,0.25)"
          strokeWidth={1}
        />
      </section>

      {/* 3 — percent fit + pan */}
      <section className="px-6 text-center">
        <ImageMaskText
          text="LUXURY LIVING"
          image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000"
          imageFit="percent"
          imageScale={140}
          animated
          animationType="pan"
        />
      </section>

      {/* 4 — video inside text (bonus) */}
      <section className="px-6 text-center">
        <ImageMaskText
          text="MOTION"
          video="https://cdn.coverr.co/videos/coverr-a-stream-in-the-forest-4779/1080p.mp4"
          fontSize="clamp(4rem, 18vw, 16rem)"
          fontWeight={900}
          aria-label="Motion"
        />
      </section>

      {/* 5 — fallback (bad URL → plain text, typography preserved) */}
      <section className="px-6 text-center">
        <ImageMaskText
          text="Always readable"
          image="https://example.invalid/not-a-real-image.jpg"
          textColor="#a78bfa"
          fontSize="clamp(2rem, 7vw, 6rem)"
        />
      </section>

      {/* 6 — Tailwind-only variant */}
      <section className="px-6 text-center">
        <ImageMaskTextTailwind
          text="TAILWIND"
          image="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000"
          fontSize="clamp(3rem, 12vw, 11rem)"
          fontWeight={900}
          animated
          animationType="zoom"
        />
      </section>
    </div>
  );
}
