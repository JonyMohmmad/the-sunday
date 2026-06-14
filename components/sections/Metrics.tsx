'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useMotionVariants } from '@/lib/animations';
import AnimatedNumber from '@/components/ui/AnimatedNumber';
import { METRICS } from '@/lib/site';

export default function Metrics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const v = useMotionVariants();

  return (
    <section
      aria-labelledby="metrics-heading"
      className="py-24 relative z-10"
      style={{ background: 'var(--surface)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={v.fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <h2
            id="metrics-heading"
            className="font-bold tracking-tight"
            style={{ fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '-0.02em', color: 'var(--text)' }}
          >
            Results that speak for themselves.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4">
          {METRICS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={v.fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center px-8 py-8"
              style={{
                borderRight: i < METRICS.length - 1 ? '1px solid var(--border)' : 'none',
                borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
              }}
            >
              <p
                className="font-bold tabular-nums mb-3"
                style={{ fontSize: '56px', lineHeight: 1, color: 'var(--text)' }}
              >
                <AnimatedNumber
                  target={stat.target}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <p className="text-[15px] font-semibold mb-1" style={{ color: 'var(--text)' }}>
                {stat.label}
              </p>
              <p className="text-sm" style={{ color: 'var(--text-2)' }}>{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
