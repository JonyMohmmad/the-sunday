'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import { useMotionVariants } from '@/lib/animations';
import { useMounted } from '@/lib/use-mounted';
import { PRICING, PRICING_NOTE, SITE } from '@/lib/site';

export default function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const mounted = useMounted();
  const v = useMotionVariants();

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={v.fadeUp}
          initial={false}
          animate={!mounted || inView ? 'visible' : 'hidden'}
          className="text-center mb-4"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#93c5fd' }}>
            Web project pricing
          </p>
          <h2
            id="pricing-heading"
            className="font-bold tracking-tight mb-4"
            style={{ fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '-0.02em', color: 'var(--text)' }}
          >
            Clear pricing. Fixed quotes.
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-2)' }}>
            These are our website packages. Every project is scoped and priced upfront on
            a free call — you will never get a surprise invoice. Prices in USD; we work
            with clients worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          {PRICING.map((plan, i) => (
            <motion.div
              key={plan.tier}
              variants={v.fadeUp}
              initial={false}
              animate={!mounted || inView ? 'visible' : 'hidden'}
              transition={{ delay: 0.15 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative flex flex-col rounded-2xl p-7"
              style={{
                background: plan.popular ? 'rgba(59,130,246,0.05)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${plan.popular ? 'rgba(59,130,246,0.4)' : 'var(--border)'}`,
                transform: plan.popular ? 'scale(1.02)' : undefined,
                zIndex: plan.popular ? 1 : 0,
              }}
            >
              {plan.popular && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: 'var(--primary)' }}
                >
                  Most popular
                </div>
              )}

              <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>{plan.tier}</h3>
              <p className="text-sm mb-5" style={{ color: 'var(--text-2)' }}>{plan.description}</p>

              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="font-bold" style={{ fontSize: '40px', lineHeight: 1, color: 'var(--text)' }}>
                  {plan.price}
                </span>
              </div>
              <p className="text-xs mb-6" style={{ color: 'var(--text-2)' }}>{plan.per}</p>

              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-2)' }}>
                    <Check size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                    {f}
                  </li>
                ))}
              </ul>

              <motion.a
                href={SITE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 px-5 rounded-xl text-sm font-semibold text-center transition-all duration-150 block"
                style={
                  plan.popular
                    ? { background: 'var(--cta)', color: '#fff' }
                    : { border: '1px solid var(--border)', color: 'var(--text-2)' }
                }
              >
                {plan.cta}
              </motion.a>
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={v.fadeUp}
          initial={false}
          animate={!mounted || inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.5 }}
          className="text-center text-sm mt-10 max-w-2xl mx-auto"
          style={{ color: 'var(--text-2)' }}
        >
          {PRICING_NOTE.split('custom quote')[0]}
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
            style={{ color: '#93c5fd' }}
          >
            custom quote, book a call
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
}
