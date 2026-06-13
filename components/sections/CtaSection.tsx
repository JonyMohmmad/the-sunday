'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useMotionVariants } from '@/lib/animations';

export default function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const v = useMotionVariants();

  return (
    <section aria-label="Get started" className="py-28 relative z-10 overflow-hidden">
      {/* Background surface + glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'var(--surface)',
          backgroundImage: `
            radial-gradient(ellipse 60% 80% at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 65%),
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100%, 48px 48px, 48px 48px',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          ref={ref}
          variants={v.fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-6"
            style={{ color: 'var(--text-3)' }}
          >
            Get started free · No card required
          </p>
        </motion.div>

        <motion.h2
          variants={v.fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.08 }}
          className="font-bold tracking-tight mb-5"
          style={{
            fontSize: 'clamp(36px, 5vw, 60px)',
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            lineHeight: 1.05,
          }}
        >
          Ready to deploy your first API?
        </motion.h2>

        <motion.p
          variants={v.fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.15 }}
          className="text-[18px] leading-relaxed mb-10"
          style={{ color: 'var(--text-2)' }}
        >
          Join 4,200+ engineering teams. Free to start, scales with you.
        </motion.p>

        <motion.div
          variants={v.fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.22 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#"
            whileHover={{
              y: -2,
              scale: 1.03,
              boxShadow: '0 0 40px rgba(59,130,246,0.4)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white"
            style={{
              background: 'var(--primary)',
              boxShadow: '0 0 24px rgba(59,130,246,0.2)',
            }}
          >
            Deploy your first API →
          </motion.a>

          <motion.a
            href="#"
            whileHover={{ y: -2, borderColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium transition-colors duration-150"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text-2)',
            }}
          >
            Read the docs
            <ExternalLink size={15} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
