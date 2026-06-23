'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  AudioLines,
  Telescope,
  MessageSquareHeart,
  Target,
  FileCog,
  Cpu,
} from 'lucide-react';
import { useMotionVariants } from '@/lib/animations';
import { useMounted } from '@/lib/use-mounted';
import { AGENT_SOLUTIONS, SITE, type AgentSolution } from '@/lib/site';

const icons: Record<string, React.ReactNode> = {
  voice: <AudioLines size={22} />,
  research: <Telescope size={22} />,
  care: <MessageSquareHeart size={22} />,
  sales: <Target size={22} />,
  docs: <FileCog size={22} />,
  enterprise: <Cpu size={22} />,
};

// lg column-span (of 6) → static Tailwind classes so the JIT keeps them.
const spanClass: Record<AgentSolution['span'], string> = {
  1: 'lg:col-span-2',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  6: 'lg:col-span-6',
};

function MetricBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full"
      style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary)' }} aria-hidden="true" />
      {label}
    </span>
  );
}

function StackTag({ label }: { label: string }) {
  return (
    <span
      className="text-[11px] px-2 py-0.5 rounded-md"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        color: 'var(--text-2)',
        fontFamily: 'var(--font-geist-mono)',
      }}
    >
      {label}
    </span>
  );
}

export default function AgentShowcase() {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-80px' });
  const mounted = useMounted();
  const v = useMotionVariants();

  return (
    <section aria-labelledby="agents-heading" className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Illustrative-figures disclaimer — honesty first. */}
        <p
          className="text-center text-[13px] leading-relaxed max-w-2xl mx-auto mb-10 rounded-xl px-4 py-3"
          style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
        >
          The figures below are <strong style={{ color: 'var(--text)' }}>illustrative capability ranges</strong> —
          what a well-built agent can do — not guaranteed outcomes from a specific client engagement.
        </p>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {AGENT_SOLUTIONS.map((agent, i) => (
            <motion.div
              key={agent.key}
              variants={v.fadeUp}
              initial={false}
              animate={!mounted || gridInView ? 'visible' : 'hidden'}
              transition={{ delay: i * 0.08 }}
              className={`relative overflow-hidden rounded-2xl p-7 ${spanClass[agent.span]}`}
              style={{
                background: 'color-mix(in srgb, var(--surface) 70%, transparent)',
                border: '1px solid var(--border)',
              }}
            >
              <div className={`flex h-full ${agent.span === 6 ? 'flex-col lg:flex-row lg:items-center lg:gap-10' : 'flex-col'}`}>
                <div className={agent.span === 6 ? 'lg:flex-1' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0"
                      style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}
                      aria-hidden="true"
                    >
                      {icons[agent.key]}
                    </div>
                    <h3 className="text-lg font-bold leading-tight" style={{ color: 'var(--text)' }}>
                      {agent.title}
                    </h3>
                  </div>
                  <p className="text-[15px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>
                    {agent.tagline}
                  </p>
                  <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
                    {agent.body}
                  </p>
                </div>

                <div
                  className={agent.span === 6 ? 'lg:w-px lg:self-stretch lg:my-2' : 'mt-5'}
                  style={agent.span === 6 ? { background: 'var(--border)' } : undefined}
                />

                <div className={agent.span === 6 ? 'lg:flex-1 mt-5 lg:mt-0' : ''}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--text-3)' }}>
                    Illustrative
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.metrics.map((m) => (
                      <MetricBadge key={m} label={m} />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.stack.map((t) => (
                      <StackTag key={t} label={t} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5"
            style={{ background: 'var(--cta)' }}
          >
            Book an architecture demo →
          </a>
        </div>
      </div>
    </section>
  );
}
