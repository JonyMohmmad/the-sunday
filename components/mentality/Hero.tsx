'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SITE } from '@/lib/site';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4';

/** Seconds of overlap used to crossfade the loop seam. */
const FADE = 0.6;

/**
 * Plays {@link VIDEO_SRC} on a seamless loop by crossfading between two stacked
 * video elements. As the active clip nears its end, the other restarts from 0
 * and fades in, so the restart never hard-cuts back to frame one.
 */
function LoopingHeadVideo() {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<0 | 1>(0);

  const handleTime = (which: 0 | 1) => () => {
    if (which !== active) return;
    const el = which === 0 ? aRef.current : bRef.current;
    const other = which === 0 ? bRef.current : aRef.current;
    if (!el || !other || !el.duration) return;
    if (el.currentTime >= el.duration - FADE) {
      other.currentTime = 0;
      void other.play().catch(() => {});
      setActive(which === 0 ? 1 : 0);
    }
  };

  const base =
    'absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out';

  return (
    <>
      <video
        ref={aRef}
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTime(0)}
        className={base}
        style={{ opacity: active === 0 ? 1 : 0, transitionDuration: `${FADE * 1000}ms` }}
        src={VIDEO_SRC}
      />
      <video
        ref={bRef}
        muted
        playsInline
        onTimeUpdate={handleTime(1)}
        className={base}
        style={{ opacity: active === 1 ? 1 : 0, transitionDuration: `${FADE * 1000}ms` }}
        src={VIDEO_SRC}
      />
    </>
  );
}

/** Inline pill-shaped "eye" element sitting between words in the headline. */
function EyePill() {
  return (
    <span className="inline-flex align-middle mx-1 md:mx-2 w-[16px] md:w-[42px] lg:w-[62px] h-[16px] md:h-[26px] lg:h-[34px] border-[2px] border-[#1a1a1a] rounded-full items-center justify-center">
      <span className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[110vh] sm:min-h-[140vh] w-full flex flex-col items-center justify-start overflow-hidden bg-bg-base">
      {/* Background video */}
      <div className="absolute top-[6vh] sm:top-[10vh] left-0 w-full h-[95vh] sm:h-[120vh] z-0 pointer-events-none">
        <LoopingHeadVideo />
        {/* Gradient mask blends the top of the video into the #EDEEF5 base */}
        <div className="absolute top-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-b from-bg-base to-transparent" />
      </div>

      {/* Hero content */}
      <div className="max-w-7xl w-full mx-auto px-8 md:px-16 lg:px-20 relative z-10 grid grid-cols-12 gap-x-4 md:gap-x-8 pt-36 md:pt-44">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display font-medium tracking-tight leading-[1.05] text-[clamp(34px,6vw,84px)]"
          >
            <span className="text-[#1a1a1a]">Websites that</span>{' '}
            <span className="text-[#8e8e8e]">win</span>
            <EyePill />
            <span className="text-[#8e8e8e]">you</span>
            <br />
            <span className="text-[#8e8e8e]">more customers, built by</span>
            <br />
            <span className="text-[#1a1a1a]">{SITE.brand}.</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-xl text-base md:text-lg text-[#5a5a5a]"
          >
            {SITE.tagline}
          </motion.p>
        </div>
      </div>

      {/* Bottom gradient: melts the bottom of the head video into the
          light base so it blends seamlessly into the section below. */}
      <div className="absolute bottom-0 left-0 w-full h-[45vh] z-[1] pointer-events-none bg-gradient-to-b from-transparent to-bg-base" />
    </section>
  );
}
