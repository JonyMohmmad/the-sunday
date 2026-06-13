'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useMotionVariants } from '@/lib/animations';

const faqs = [
  {
    q: 'Is there a free plan?',
    a: 'Yes. The Hobby tier is free forever with 100k API calls per month, 1 deployment, and community support. No credit card required.',
  },
  {
    q: 'How does billing work for overages?',
    a: "We bill usage-based for calls above your tier. You set a monthly cap — we'll never charge beyond it without your approval.",
  },
  {
    q: 'Can I bring my own domain?',
    a: "Custom domains are available on Pro and Enterprise plans. HTTPS is provisioned automatically via Let's Encrypt with no additional configuration.",
  },
  {
    q: 'What happens when I exceed my API call limit?',
    a: "You'll get an email warning at 80% and 95% usage. We never take your API offline without prior notice — you stay live while we discuss options.",
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. Forge is SOC 2 Type II certified. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We do not train on your data or share it with third parties.',
  },
  {
    q: 'Do you offer startup discounts?',
    a: "Yes — 90% off for pre-seed startups for 12 months. Email startups@forge.dev with your company info and we'll get you set up within 24 hours.",
  },
];

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
        onMouseEnter={(e) => { if (!open) (e.currentTarget as HTMLElement).style.color = 'var(--primary)'; }}
        onMouseLeave={(e) => { if (!open) (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
      >
        <span className="text-[16px] font-semibold pr-8">{q}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
          width="18" height="18" viewBox="0 0 18 18" fill="none"
          className="flex-shrink-0"
          aria-hidden="true"
        >
          <path
            d="M4.5 6.75L9 11.25L13.5 6.75"
            stroke="currentColor" strokeWidth="1.75"
            strokeLinecap="round" strokeLinejoin="round"
          />
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
            <p className="text-[15px] leading-[1.7] pb-5" style={{ color: 'var(--text-2)' }}>
              {a}
            </p>
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
            style={{
              fontSize: 'clamp(36px, 4vw, 52px)',
              letterSpacing: '-0.02em',
              color: 'var(--text)',
            }}
          >
            Frequently asked questions.
          </h2>
        </motion.div>

        <div>
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} parentInView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
