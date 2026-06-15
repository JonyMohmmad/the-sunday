'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Zap } from 'lucide-react';
import { INDUSTRIES, type WorkProject } from '@/lib/site';
import { useMounted } from '@/lib/use-mounted';

const industryLabel = (key: string) =>
  INDUSTRIES.find((i) => i.key === key)?.label ?? key;

interface WorkCardProps {
  project: WorkProject;
  index?: number;
  /** 'inView' reveals on scroll (homepage); 'mount' reveals on render (filter grid). */
  reveal?: 'inView' | 'mount';
}

export default function WorkCard({ project, index = 0, reveal = 'inView' }: WorkCardProps) {
  const lhGood = project.lighthouse >= 90;

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const mounted = useMounted();

  // 'inView' (homepage) gates the reveal behind a mounted flag so the card is
  // visible-by-default in SSR/pre-hydration — it never gets stuck at opacity:0
  // if JS is slow or fails. 'mount' (filter grid) only runs after a user
  // interaction, so JS is guaranteed and it animates in on render as before.
  const revealProps =
    reveal === 'mount'
      ? { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } }
      : {
          initial: false as const,
          animate: !mounted || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
        };

  return (
    <motion.article
      ref={ref}
      layout
      {...revealProps}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl overflow-hidden h-full"
      style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
    >
      <Link href={`/work/${project.slug}`} className="block h-full focus:outline-none">
        {/* ── Living-portfolio browser-frame preview ── */}
        <div style={{ borderBottom: '1px solid var(--border)' }}>
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: 'var(--surface)' }}>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ef4444', opacity: 0.7 }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#f59e0b', opacity: 0.7 }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#22c55e', opacity: 0.7 }} />
            </div>
            <div
              className="ml-2 flex-1 truncate text-[11px] px-2.5 py-1 rounded-md"
              style={{
                background: 'var(--surface-2)',
                color: 'var(--text-3)',
                fontFamily: 'var(--font-geist-mono)',
              }}
            >
              {project.url}
            </div>
          </div>

          {/* Mock viewport */}
          <div data-cursor="view" className="relative h-40 overflow-hidden" style={{ background: project.accent }}>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.32)), radial-gradient(circle at 30% 25%, rgba(255,255,255,0.22), transparent 60%)',
              }}
            />
            <div className="absolute inset-0 p-5 flex flex-col justify-end gap-2">
              <div className="h-2.5 rounded-full" style={{ width: '55%', background: 'rgba(255,255,255,0.85)' }} />
              <div className="h-2 rounded-full" style={{ width: '38%', background: 'rgba(255,255,255,0.55)' }} />
            </div>

            {/* Industry label */}
            <span
              className="absolute top-3 left-3 text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(0,0,0,0.4)', color: '#fff', backdropFilter: 'blur(4px)' }}
            >
              {industryLabel(project.industry)}
            </span>

            {/* Lighthouse performance badge */}
            <span
              className="absolute top-3 right-3 inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full"
              title={`Lighthouse performance: ${project.lighthouse}/100`}
              style={{
                background: 'rgba(0,0,0,0.45)',
                color: lhGood ? '#4ade80' : '#fcd34d',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Zap size={11} fill="currentColor" /> {project.lighthouse}
            </span>

            {/* Hover affordance */}
            <span
              className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
              style={{ background: 'rgba(255,255,255,0.92)', color: '#0b1220' }}
            >
              View case study <ArrowUpRight size={11} />
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>
                {project.client}
              </h3>
              <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-3)' }}>
                {project.category}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-lg font-bold" style={{ color: '#22c55e' }}>
                {project.result}
              </p>
              <p className="text-[11px]" style={{ color: 'var(--text-3)' }}>
                {project.metric}
              </p>
            </div>
          </div>

          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>
            {project.summary}
          </p>

          {/* Tech-stack transparency chips */}
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-[11px] px-2 py-0.5 rounded-md"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-2)',
                  fontFamily: 'var(--font-geist-mono)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
