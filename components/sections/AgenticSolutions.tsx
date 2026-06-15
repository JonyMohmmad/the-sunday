'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  AudioLines,
  Telescope,
  MessageSquareHeart,
  Target,
  FileCog,
  Cpu,
  Play,
  ArrowRight,
  Check,
} from 'lucide-react';
import { useMotionVariants } from '@/lib/animations';
import { useMounted } from '@/lib/use-mounted';
import { AGENT_SOLUTIONS, SITE, type AgentSolution } from '@/lib/site';
import ConicGradient from '@/components/ui/ConicGradient';

const icons: Record<string, React.ReactNode> = {
  voice: <AudioLines size={22} />,
  research: <Telescope size={22} />,
  care: <MessageSquareHeart size={22} />,
  sales: <Target size={22} />,
  docs: <FileCog size={22} />,
  enterprise: <Cpu size={22} />,
};

// lg column-span (of 6) → Tailwind class, kept static so the JIT compiler
// emits them (dynamic `col-span-${n}` strings would be purged).
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

function DemoButton({ agent }: { agent: AgentSolution }) {
  return (
    <a
      href={agent.demoUrl}
      className="group/btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5"
      style={{ background: 'var(--cta)' }}
    >
      <span
        className="flex items-center justify-center w-5 h-5 rounded-full"
        style={{ background: 'rgba(255,255,255,0.2)' }}
        aria-hidden="true"
      >
        <Play size={10} fill="currentColor" className="ml-0.5" />
      </span>
      {agent.demoLabel}
    </a>
  );
}

export default function AgenticSolutions() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '-80px' });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-80px' });
  const mounted = useMounted();
  const v = useMotionVariants();

  const [active, setActive] = useState(0);
  const current = AGENT_SOLUTIONS[active];

  return (
    <section
      id="solutions"
      aria-labelledby="solutions-heading"
      className="py-24 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          ref={headRef}
          variants={v.fadeUp}
          initial={false}
          animate={!mounted || headInView ? 'visible' : 'hidden'}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#93c5fd' }}>
            Our agentic solutions
          </p>
          <h2
            id="solutions-heading"
            className="font-bold tracking-tight mb-4"
            style={{ fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '-0.02em', color: 'var(--text)' }}
          >
            Full-scale autonomous agents that run real corporate workflows.
          </h2>
          <p className="text-[17px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
            We design, build, and deploy high-level AI agents that don&apos;t just answer
            questions — they take over complex operational roles end to end, with the
            guardrails and reliability the enterprise demands.
          </p>
        </motion.div>

        {/* ── Bento grid of solutions ── */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {AGENT_SOLUTIONS.map((agent, i) => {
            const wide = agent.span === 6;
            return (
              <motion.div
                key={agent.key}
                variants={v.fadeUp}
                initial={false}
                animate={!mounted || gridInView ? 'visible' : 'hidden'}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, borderColor: 'rgba(59,130,246,0.3)' }}
                className={`group relative overflow-hidden rounded-2xl p-7 ${spanClass[agent.span]}`}
                style={{
                  background: 'color-mix(in srgb, var(--surface) 70%, transparent)',
                  border: '1px solid var(--border)',
                  transition: 'border-color 0.2s ease',
                }}
              >
                {/* Ambient conic glow — subtle, brighter on hover (matches Services). */}
                <div className="absolute inset-0 opacity-25 transition-opacity duration-500 group-hover:opacity-60">
                  <ConicGradient
                    radius={16}
                    blur={48}
                    glow={0.5}
                    speed={10}
                    size={170}
                    colors={['#05070d', '#3b82f6', '#60a5fa', '#ffffff', '#1e3a8a', '#05070d']}
                  />
                </div>

                <div
                  className={`relative z-10 flex h-full ${
                    wide ? 'flex-col lg:flex-row lg:items-center lg:gap-10' : 'flex-col'
                  }`}
                >
                  <div className={wide ? 'lg:flex-1' : ''}>
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

                  <div className={wide ? 'lg:w-px lg:self-stretch lg:my-2' : 'mt-5'} style={wide ? { background: 'var(--border)' } : undefined} />

                  <div className={wide ? 'lg:flex-1 mt-5 lg:mt-0' : ''}>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.metrics.map((m) => (
                        <MetricBadge key={m} label={m} />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {agent.stack.map((t) => (
                        <StackTag key={t} label={t} />
                      ))}
                    </div>
                    <DemoButton agent={agent} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Existing work / interactive case studies ── */}
        <div className="mt-24">
          <motion.div
            variants={v.fadeUp}
            initial={false}
            animate={!mounted || gridInView ? 'visible' : 'hidden'}
            className="text-center mb-10 max-w-2xl mx-auto"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#93c5fd' }}>
              Existing work
            </p>
            <h3
              className="font-bold tracking-tight"
              style={{ fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.02em', color: 'var(--text)' }}
            >
              See our agents in action.
            </h3>
          </motion.div>

          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Agent case studies"
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {AGENT_SOLUTIONS.map((agent, i) => {
              const selected = i === active;
              return (
                <button
                  key={agent.key}
                  role="tab"
                  id={`tab-${agent.key}`}
                  aria-selected={selected}
                  aria-controls={`panel-${agent.key}`}
                  onClick={() => setActive(i)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-150"
                  style={{
                    background: selected ? 'var(--text)' : 'var(--surface)',
                    color: selected ? '#fff' : 'var(--text-2)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <span aria-hidden="true" style={{ color: selected ? '#c4b5fd' : 'var(--primary)' }}>
                    {icons[agent.key]}
                  </span>
                  <span className="hidden sm:inline">{agent.title}</span>
                  <span className="sm:hidden">{agent.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active case study panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              role="tabpanel"
              id={`panel-${current.key}`}
              aria-labelledby={`tab-${current.key}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative overflow-hidden rounded-3xl"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div className="grid lg:grid-cols-2">
                {/* Left — narrative */}
                <div className="p-8 sm:p-10">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--primary)' }}>
                    {current.caseStudy.industry}
                  </p>
                  <h4 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>
                    {current.caseStudy.client}
                  </h4>
                  <p className="text-[15px] leading-relaxed mb-6" style={{ color: 'var(--text-2)' }}>
                    {current.caseStudy.summary}
                  </p>

                  <ul className="space-y-2.5 mb-7">
                    {current.metrics.map((m) => (
                      <li key={m} className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--text)' }}>
                        <Check size={15} className="flex-shrink-0" style={{ color: '#16a34a' }} />
                        {m}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-3">
                    <DemoButton agent={current} />
                    <a
                      href={SITE.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-150"
                      style={{ color: 'var(--text)', border: '1px solid var(--border)' }}
                    >
                      Build one for us <ArrowRight size={15} />
                    </a>
                  </div>
                </div>

                {/* Right — results + stack on a tinted panel */}
                <div
                  className="relative overflow-hidden p-8 sm:p-10 flex flex-col justify-center"
                  style={{ background: 'var(--bg)', borderLeft: '1px solid var(--border)' }}
                >
                  <div className="absolute inset-0 opacity-40 pointer-events-none">
                    <ConicGradient
                      radius={0}
                      blur={60}
                      glow={0.4}
                      speed={14}
                      size={150}
                      colors={['#05070d', '#3b82f6', '#60a5fa', '#ffffff', '#1e3a8a', '#05070d']}
                    />
                  </div>

                  <div className="relative z-10">
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {current.caseStudy.results.map((r) => (
                        <div key={r.label} className="text-center">
                          <p className="font-bold tabular-nums mb-1" style={{ fontSize: 'clamp(26px,3vw,38px)', lineHeight: 1, color: 'var(--text)' }}>
                            {r.value}
                          </p>
                          <p className="text-[12px] leading-snug" style={{ color: 'var(--text-2)' }}>
                            {r.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-2.5" style={{ color: 'var(--text-3)' }}>
                      Built with
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {current.stack.map((t) => (
                        <StackTag key={t} label={t} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Closing CTA ── */}
        <motion.div
          variants={v.fadeUp}
          initial={false}
          animate={!mounted || gridInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.2 }}
          className="text-center mt-14"
        >
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5"
            style={{ background: 'var(--cta)' }}
          >
            Scope your AI agent — book a call →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
