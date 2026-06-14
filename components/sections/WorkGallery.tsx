'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { INDUSTRIES, WORK, type IndustryKey } from '@/lib/site';
import WorkCard from './WorkCard';

export default function WorkGallery() {
  const [active, setActive] = useState<IndustryKey>('all');

  // Only surface filters that actually have projects behind them.
  const available = INDUSTRIES.filter(
    (i) => i.key === 'all' || WORK.some((w) => w.industry === i.key),
  );

  const filtered = active === 'all' ? WORK : WORK.filter((w) => w.industry === active);

  return (
    <section aria-label="Project gallery" className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Industry filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {available.map((ind) => {
            const isActive = ind.key === active;
            return (
              <button
                key={ind.key}
                onClick={() => setActive(ind.key)}
                aria-pressed={isActive}
                className="relative overflow-hidden px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150"
                style={{
                  color: isActive ? '#fff' : 'var(--text-2)',
                  border: `1px solid ${isActive ? 'transparent' : 'var(--border)'}`,
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="work-filter-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'var(--primary)', zIndex: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative" style={{ zIndex: 1 }}>
                  {ind.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <WorkCard key={p.slug} project={p} index={i} reveal="mount" />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
