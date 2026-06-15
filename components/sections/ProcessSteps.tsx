'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useMotionVariants } from '@/lib/animations';
import { useMounted } from '@/lib/use-mounted';
import { PROCESS } from '@/lib/site';

export default function ProcessSteps() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const mounted = useMounted();
  const v = useMotionVariants();

  return (
    <section id="process" aria-labelledby="process-heading" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={v.fadeUp}
          initial={false}
          animate={!mounted || inView ? 'visible' : 'hidden'}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#93c5fd' }}>
            How we work
          </p>
          <h2
            id="process-heading"
            className="font-bold tracking-tight mb-4"
            style={{ fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '-0.02em', color: 'var(--text)' }}
          >
            A clear process. No surprises.
          </h2>
          <p className="text-[17px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
            From first call to launch day, you always know what is happening,
            what is next, and exactly what it costs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS.map((step, i) => (
            <motion.div
              key={step.number}
              variants={v.fadeUp}
              initial={false}
              animate={!mounted || inView ? 'visible' : 'hidden'}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl p-7"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
            >
              <span
                className="block text-5xl font-bold mb-4"
                style={{ color: 'var(--primary)', opacity: 0.25, fontFamily: 'var(--font-geist-mono)' }}
              >
                {step.number}
              </span>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
