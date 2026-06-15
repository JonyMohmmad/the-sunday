'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useMotionVariants } from '@/lib/animations';
import { useMounted } from '@/lib/use-mounted';
import { SITE, FINAL_CTA } from '@/lib/site';

export default function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const mounted = useMounted();
  const v = useMotionVariants();

  return (
    <section id="contact" aria-label="Book a call" className="py-28 relative z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'var(--surface)',
          backgroundImage: `
            radial-gradient(ellipse 60% 80% at 50% 50%, rgba(59,130,246,0.10) 0%, transparent 65%),
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '100%, 48px 48px, 48px 48px',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.p
          ref={ref}
          variants={v.fadeUp}
          initial={false}
          animate={!mounted || inView ? 'visible' : 'hidden'}
          className="text-xs font-semibold uppercase tracking-[0.2em] mb-6"
          style={{ color: 'var(--text-3)' }}
        >
          {FINAL_CTA.eyebrow}
        </motion.p>

        <motion.h2
          variants={v.fadeUp}
          initial={false}
          animate={!mounted || inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.08 }}
          className="font-bold tracking-tight mb-5"
          style={{ fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: '-0.02em', color: 'var(--text)', lineHeight: 1.05 }}
        >
          {FINAL_CTA.headline}
        </motion.h2>

        <motion.p
          variants={v.fadeUp}
          initial={false}
          animate={!mounted || inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.15 }}
          className="text-[18px] leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: 'var(--text-2)' }}
        >
          {FINAL_CTA.body}
        </motion.p>

        <motion.div
          variants={v.fadeUp}
          initial={false}
          animate={!mounted || inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.22 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, scale: 1.03, boxShadow: '0 0 40px rgba(223,2,3,0.4)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white"
            style={{ background: 'var(--cta)', boxShadow: '0 0 24px rgba(223,2,3,0.2)' }}
          >
            {SITE.bookingLabel} →
          </motion.a>

          <motion.a
            href={`mailto:${SITE.email}`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium transition-colors duration-150 hover:text-[var(--text)]"
            style={{ border: '1px solid var(--border)', color: 'var(--text-2)' }}
          >
            <Mail size={16} /> Email us
          </motion.a>
        </motion.div>

        <motion.p
          variants={v.fadeUp}
          initial={false}
          animate={!mounted || inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.3 }}
          className="text-sm mt-6"
          style={{ color: 'var(--text-3)' }}
        >
          {FINAL_CTA.note}
        </motion.p>
      </div>
    </section>
  );
}
