'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useMotionVariants } from '@/lib/animations';
import { useMounted } from '@/lib/use-mounted';
import { WORK, SITE } from '@/lib/site';
import WorkCard from './WorkCard';

// Projects featured on the homepage grid, in display order.
// The full catalogue still lives on /work — edit slugs here to re-feature.
const FEATURED_SLUGS = ['cala-nera', 'agentforge', 'savageon'];

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const mounted = useMounted();
  const v = useMotionVariants();

  const featured = FEATURED_SLUGS
    .map((slug) => WORK.find((w) => w.slug === slug))
    .filter((w): w is (typeof WORK)[number] => Boolean(w));

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="py-24 relative z-10"
      style={{ background: 'var(--surface)' }}
    >
      <div className="w-[95%] mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={v.fadeUp}
          initial={false}
          animate={!mounted || inView ? 'visible' : 'hidden'}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14"
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#93c5fd' }}>
              Selected work
            </p>
            <h2
              id="work-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '-0.02em', color: 'var(--text)' }}
            >
              Real projects. Real growth.
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-150 hover:text-[var(--text)]"
            style={{ color: 'var(--text-2)' }}
          >
            View all work <ArrowUpRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((w, i) => (
            <WorkCard key={w.slug} project={w} index={i} />
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
            Start your project →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
