'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Check, Layers, TrendingUp, Bot, ShieldCheck, ArrowRight } from 'lucide-react';
import { useMotionVariants } from '@/lib/animations';
import { useMounted } from '@/lib/use-mounted';
import MagneticGrid from '@/components/MagneticGrid';
import { PILLARS, SITE } from '@/lib/site';

const pillarIcons: Record<string, React.ReactNode> = {
  'design-build': <Layers size={20} />,
  growth: <TrendingUp size={20} />,
  ai: <Bot size={20} />,
  security: <ShieldCheck size={20} />,
};

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const mounted = useMounted();
  const v = useMotionVariants();

  return (
    <section id="services" aria-labelledby="services-heading" className="py-24 relative z-10 overflow-hidden">
      <MagneticGrid
        dotColor="rgba(99,102,241,VALUE)"
        baseOpacity={0.22}
        dotRadius={1.8}
        maxDisplacement={48}
        influence={2400}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={v.fadeUp}
          initial={false}
          animate={!mounted || inView ? 'visible' : 'hidden'}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#93c5fd' }}>
            What we do
          </p>
          <h2
            id="services-heading"
            className="font-bold tracking-tight mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 50px)', letterSpacing: '-0.02em', color: 'var(--text)' }}
          >
            One studio. Everything your business needs to grow and stay protected online.
          </h2>
          <p className="text-[17px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
            From the first pixel to ongoing growth and security — design, build, market,
            and protect under one roof.
          </p>
        </motion.div>

        <div className="flex flex-col gap-16">
          {PILLARS.map((pillar, pi) => (
            <motion.div
              key={pillar.key}
              variants={v.fadeUp}
              initial={false}
              animate={!mounted || inView ? 'visible' : 'hidden'}
              transition={{ delay: pi * 0.08 }}
            >
              {/* Pillar header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
                <div className="flex items-start gap-4">
                  <span
                    className="flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0"
                    style={{ background: 'rgba(59,130,246,0.1)', color: '#93c5fd' }}
                    aria-hidden="true"
                  >
                    {pillarIcons[pillar.key]}
                  </span>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span
                        className="text-[12px] font-bold tabular-nums"
                        style={{ color: 'var(--text-3)', fontFamily: 'var(--font-geist-mono)' }}
                      >
                        {pillar.number}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text)' }}>
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-[15px] mt-1" style={{ color: 'var(--text-2)' }}>
                      {pillar.tagline}
                    </p>
                  </div>
                </div>

                {pillar.href && (
                  <Link
                    href={pillar.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold flex-shrink-0 transition-colors duration-150 hover:text-[var(--text)]"
                    style={{ color: '#93c5fd' }}
                  >
                    Explore {pillar.title} <ArrowRight size={15} />
                  </Link>
                )}
              </div>

              {/* Services in this pillar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {pillar.services.map((s) => (
                  <div
                    key={s.name}
                    className="rounded-2xl p-6 flex flex-col"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <h4 className="text-[17px] font-bold mb-1.5" style={{ color: 'var(--text)' }}>
                      {s.name}
                    </h4>
                    <p className="text-[14px] leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>
                      {s.body}
                    </p>
                    <ul className="flex flex-wrap gap-x-4 gap-y-2 mt-auto">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-center gap-1.5 text-[13px]" style={{ color: 'var(--text-2)' }}>
                          <Check size={13} className="flex-shrink-0" style={{ color: '#22c55e' }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={v.fadeUp}
          initial={false}
          animate={!mounted || inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5"
            style={{ background: 'var(--cta)' }}
          >
            {SITE.bookingLabel} — tell us what you need →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
