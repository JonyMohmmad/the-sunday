'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useMotionVariants } from '@/lib/animations';
import { useMounted } from '@/lib/use-mounted';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import MagneticGrid from '@/components/MagneticGrid';
import { PRICING, PRICING_FEATURES, PRICING_NOTE, SITE } from '@/lib/site';

/* Animated price counter — re-runs every time the target value changes
   (i.e. on plan switch), easing from the previously shown number. */
function AnimatedPrice({ value, label, duration = 650 }: { value: number | null; label: string; duration?: number }) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value ?? 0);
  const fromRef = useRef(value ?? 0);

  useEffect(() => {
    if (value === null) return;            // custom-quote plan shows its label
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(value);
      fromRef.current = value;
      return;
    }

    const from = fromRef.current;
    const delta = value - from;
    let raf: number;
    let start: number | null = null;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    function tick(ts: number) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setDisplay(from + delta * easeOutCubic(p));
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = value as number;
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, reduced]);

  if (value === null) {
    return <span style={{ fontSize: 'clamp(40px, 5vw, 56px)', lineHeight: 1, color: 'var(--text)' }} className="font-bold">{label}</span>;
  }

  return (
    <span className="font-bold tabular-nums" style={{ fontSize: 'clamp(40px, 5vw, 56px)', lineHeight: 1, color: 'var(--text)' }}>
      ${Math.round(display).toLocaleString('en-US')}
    </span>
  );
}

export default function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const mounted = useMounted();
  const v = useMotionVariants();

  // Default to the popular plan if present, else the first.
  const defaultIndex = Math.max(0, PRICING.findIndex((p) => p.popular));
  const [selected, setSelected] = useState(defaultIndex);
  const plan = PRICING[selected];

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-24 relative z-10 overflow-hidden">
      <MagneticGrid />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={v.fadeUp}
          initial={false}
          animate={!mounted || inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--primary)' }}>
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
            Pick a package to see exactly what is included. Every project is scoped and
            priced upfront on a free call — no surprise invoices.
          </p>
        </motion.div>

        {/* Outer two-panel card */}
        <motion.div
          variants={v.fadeUp}
          initial={false}
          animate={!mounted || inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] rounded-3xl overflow-hidden"
          style={{
            background: 'color-mix(in srgb, var(--surface) 70%, transparent)',
            border: '1px solid var(--border)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 24px 60px -28px rgba(0,0,0,0.45)',
          }}
        >
          {/* ── Left: feature checklist ───────────────────────────── */}
          <div className="order-2 lg:order-1 p-8 sm:p-10" style={{ borderTop: '1px solid var(--border)' }}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] mb-1" style={{ color: 'var(--text-2)' }}>
              What&rsquo;s included
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-3)' }}>
              <span className="font-semibold" style={{ color: 'var(--primary)' }}>{plan.tier}</span> includes the rows below.
            </p>

            <ul className="flex flex-col gap-3">
              {PRICING_FEATURES.map((feature, i) => {
                const included = i < plan.includes;
                return (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <span
                      className="flex-shrink-0 grid place-items-center rounded-full transition-colors duration-300"
                      style={{
                        width: 20,
                        height: 20,
                        background: included ? 'color-mix(in srgb, var(--success) 18%, transparent)' : 'var(--surface-2)',
                        color: included ? 'var(--success)' : 'var(--text-3)',
                      }}
                    >
                      {included ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
                    </span>
                    <span
                      className="transition-all duration-300"
                      style={{
                        color: included ? 'var(--text)' : 'var(--text-3)',
                        textDecoration: included ? 'none' : 'line-through',
                        opacity: included ? 1 : 0.6,
                      }}
                    >
                      {feature}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Right: plan picker + animated price ───────────────── */}
          <div
            className="order-1 lg:order-2 p-8 sm:p-10 flex flex-col"
            style={{ background: 'color-mix(in srgb, var(--primary) 5%, transparent)' }}
          >
            {/* Animated price headline */}
            <div className="mb-6">
              <div className="flex items-end gap-2 mb-1">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={plan.tier}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <AnimatedPrice value={plan.priceValue} label={plan.priceLabel} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-2)' }}>{plan.per}</p>
            </div>

            {/* Radio plan cards */}
            <div className="flex flex-col gap-3 mb-7" role="radiogroup" aria-label="Pricing plans">
              {PRICING.map((p, i) => {
                const isSel = i === selected;
                return (
                  <button
                    key={p.tier}
                    role="radio"
                    aria-checked={isSel}
                    onClick={() => setSelected(i)}
                    className="relative text-left rounded-2xl p-4 pl-5 transition-all duration-200 overflow-hidden"
                    style={{
                      background: isSel ? 'color-mix(in srgb, var(--primary) 10%, var(--surface))' : 'var(--surface)',
                      border: `1px solid ${isSel ? 'var(--primary)' : 'var(--border)'}`,
                      boxShadow: isSel ? '0 0 0 1px var(--primary), 0 8px 24px -12px var(--primary-glow)' : 'none',
                    }}
                  >
                    {/* accent edge bar */}
                    <span
                      className="absolute left-0 top-0 bottom-0 transition-all duration-200"
                      style={{ width: 3, background: isSel ? 'var(--primary)' : 'transparent' }}
                    />

                    <div className="flex items-center gap-3">
                      {/* radio dot with glow ring */}
                      <span
                        className="flex-shrink-0 grid place-items-center rounded-full transition-all duration-200"
                        style={{
                          width: 18,
                          height: 18,
                          border: `2px solid ${isSel ? 'var(--primary)' : 'var(--text-3)'}`,
                          boxShadow: isSel ? '0 0 0 4px var(--primary-glow)' : 'none',
                        }}
                      >
                        <span
                          className="rounded-full transition-all duration-200"
                          style={{ width: 8, height: 8, background: isSel ? 'var(--primary)' : 'transparent' }}
                        />
                      </span>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[15px]" style={{ color: 'var(--text)' }}>{p.tier}</span>
                          {p.badge && (
                            <span
                              className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full"
                              style={{
                                background: 'color-mix(in srgb, var(--primary) 16%, transparent)',
                                color: 'var(--primary)',
                                border: '1px solid color-mix(in srgb, var(--primary) 35%, transparent)',
                                backdropFilter: 'blur(4px)',
                              }}
                            >
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs truncate" style={{ color: 'var(--text-2)' }}>{p.description}</p>
                      </div>

                      <span className="font-semibold text-sm flex-shrink-0" style={{ color: 'var(--text)' }}>
                        {p.priceLabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* CTA with shine sweep */}
            <motion.a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover="hover"
              whileTap={{ scale: 0.985 }}
              className="group relative mt-auto w-full py-3.5 px-5 rounded-xl text-sm font-semibold text-center text-white block overflow-hidden"
              style={{ background: 'var(--cta)', boxShadow: '0 10px 30px -12px var(--cta-glow)' }}
            >
              <span className="relative z-10">{plan.cta}</span>
              <motion.span
                aria-hidden
                className="absolute inset-y-0 -left-1/3 w-1/3 pointer-events-none"
                style={{ background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.35), transparent)' }}
                variants={{ hover: { left: '120%' } }}
                initial={{ left: '-33%' }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              />
            </motion.a>
          </div>
        </motion.div>

        <motion.p
          variants={v.fadeUp}
          initial={false}
          animate={!mounted || inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.4 }}
          className="text-center text-sm mt-10 max-w-2xl mx-auto"
          style={{ color: 'var(--text-2)' }}
        >
          {PRICING_NOTE.split('custom quote')[0]}
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
            style={{ color: 'var(--primary)' }}
          >
            custom quote, book a call
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
}
