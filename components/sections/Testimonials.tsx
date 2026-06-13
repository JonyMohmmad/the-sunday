'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useMotionVariants } from '@/lib/animations';

const testimonials = [
  {
    quote:
      "Forge cut our deployment time from 12 minutes to under 3 seconds. We've shipped more in the past month than the previous quarter.",
    name: 'Sarah Kim',
    role: 'Staff Engineer',
    company: 'Notion',
    initials: 'SK',
    gradient: 'linear-gradient(135deg,#667eea,#764ba2)',
  },
  {
    quote:
      'The observability alone is worth it. We cancelled three separate monitoring tools after switching. The distributed tracing is genuinely better than Datadog.',
    name: 'Marcus Chen',
    role: 'VP Engineering',
    company: 'Linear',
    initials: 'MC',
    gradient: 'linear-gradient(135deg,#f093fb,#f5576c)',
  },
  {
    quote:
      "We were on AWS Lambda with a pile of glue infrastructure. Forge replaced all of it. Our on-call rotations are boring now — that's a compliment.",
    name: 'Priya Nair',
    role: 'CTO',
    company: 'Loom',
    initials: 'PN',
    gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)',
  },
];

function StarRating() {
  return (
    <div className="flex items-center gap-0.5 mb-4" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#f59e0b" aria-hidden="true">
          <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.43L7 8.885l-3.09 1.615L4.5 7.07 2 4.635l3.455-.505L7 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const v = useMotionVariants();

  return (
    <section aria-labelledby="testimonials-heading" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          ref={ref}
          variants={v.fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <h2
            id="testimonials-heading"
            className="font-bold tracking-tight"
            style={{
              fontSize: 'clamp(36px, 4vw, 52px)',
              letterSpacing: '-0.02em',
              color: 'var(--text)',
            }}
          >
            Loved by engineering teams worldwide.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              variants={v.fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, borderColor: 'rgba(59,130,246,0.2)' }}
              className="relative rounded-2xl p-7 flex flex-col"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border)',
                transition: 'border-color 0.2s ease',
              }}
            >
              <span
                className="absolute top-5 right-6 text-7xl leading-none pointer-events-none select-none"
                style={{ color: 'var(--primary)', opacity: 0.12 }}
                aria-hidden="true"
              >
                "
              </span>
              <StarRating />
              <blockquote className="text-[15px] leading-[1.75] flex-1 mb-6" style={{ color: 'var(--text)' }}>
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: t.gradient }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-2)' }}>
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
