'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useMotionVariants } from '@/lib/animations';
import { FAQ, SITE } from '@/lib/site';

function FaqItem({
  q, a, index, parentInView,
}: {
  q: string; a: string; index: number; parentInView: boolean;
}) {
  const [open, setOpen] = useState(false);
  const v = useMotionVariants();

  return (
    <motion.div
      variants={v.fadeUp}
      initial="hidden"
      animate={parentInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.07 }}
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between py-5 text-left transition-colors duration-150"
        aria-expanded={open}
        style={{ color: open ? 'var(--primary)' : 'var(--text)' }}
      >
        <span className="text-[16px] font-semibold pr-8">{q}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
          width="18" height="18" viewBox="0 0 18 18" fill="none"
          className="flex-shrink-0"
          aria-hidden="true"
        >
          <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="text-[15px] leading-[1.7] pb-5" style={{ color: 'var(--text-2)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const v = useMotionVariants();

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-20 relative z-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={v.fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <h2
            id="faq-heading"
            className="font-bold tracking-tight"
            style={{ fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '-0.02em', color: 'var(--text)' }}
          >
            Frequently asked questions.
          </h2>
        </motion.div>

        <div>
          {FAQ.map((faq, i) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} parentInView={inView} />
          ))}
        </div>

        <motion.p
          variants={v.fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.3 }}
          className="text-center text-sm mt-10"
          style={{ color: 'var(--text-2)' }}
        >
          Still have questions?{' '}
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
            style={{ color: '#93c5fd' }}
          >
            Book a free call →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
