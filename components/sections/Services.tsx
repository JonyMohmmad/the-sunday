'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Globe, ShoppingBag, LayoutDashboard, TrendingUp } from 'lucide-react';
import { useMotionVariants } from '@/lib/animations';
import { useMounted } from '@/lib/use-mounted';
import { SERVICES, SITE } from '@/lib/site';
import ConicGradient from '@/components/ui/ConicGradient';

const icons: Record<string, React.ReactNode> = {
  business: <Globe size={22} />,
  ecommerce: <ShoppingBag size={22} />,
  webapps: <LayoutDashboard size={22} />,
  growth: <TrendingUp size={22} />,
};

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const mounted = useMounted();
  const v = useMotionVariants();

  return (
    <section id="services" aria-labelledby="services-heading" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={v.fadeUp}
          initial={false}
          animate={!mounted || inView ? 'visible' : 'hidden'}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#93c5fd' }}>
            What we do
          </p>
          <h2
            id="services-heading"
            className="font-bold tracking-tight mb-4"
            style={{ fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '-0.02em', color: 'var(--text)' }}
          >
            Everything your business needs to win online.
          </h2>
          <p className="text-[17px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
            One studio for design, development, and growth — so your website actually
            drives revenue, not just looks good.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.key}
              variants={v.fadeUp}
              initial={false}
              animate={!mounted || inView ? 'visible' : 'hidden'}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, borderColor: 'rgba(59,130,246,0.3)' }}
              className="group relative overflow-hidden rounded-2xl p-8 flex flex-col"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border)',
                transition: 'border-color 0.2s ease',
              }}
            >
              {/* Premium animated conic-gradient ambient glow (black → electric
                  blue → white). Subtle by default, brighter on hover. */}
              <div className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-70">
                <ConicGradient
                  radius={16}
                  blur={48}
                  glow={0.5}
                  speed={9}
                  size={170}
                  colors={['#05070d', '#3b82f6', '#60a5fa', '#ffffff', '#1e3a8a', '#05070d']}
                />
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl mb-5"
                  style={{ background: 'rgba(59,130,246,0.1)', color: '#93c5fd' }}
                  aria-hidden="true"
                >
                  {icons[s.key]}
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>{s.title}</h3>
                <p className="text-[15px] leading-relaxed mb-5" style={{ color: 'var(--text-2)' }}>
                  {s.body}
                </p>
                <ul className="grid grid-cols-2 gap-2.5 mt-auto">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                      <Check size={14} className="flex-shrink-0" style={{ color: '#22c55e' }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={v.fadeUp}
          initial={false}
          animate={!mounted || inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
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
