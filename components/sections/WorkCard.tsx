'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search } from 'lucide-react';
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
      className="group h-full"
    >
      <Link
        href={`/work/${project.slug}`}
        data-cursor="view"
        className="relative flex aspect-[4/3] h-full flex-col rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        style={{ background: project.accent, border: '1px solid var(--border)' }}
      >
        {/* ── MacBook window title bar ── */}
        <div
          className="flex flex-shrink-0 items-center gap-3 px-4 py-2.5"
          style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
        >
          {/* Traffic lights — close / minimize / fullscreen */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
          </div>
          {/* Address pill */}
          <div
            className="flex-1 truncate text-center text-[11px] px-3 py-1 rounded-md"
            style={{
              background: 'var(--surface-2)',
              color: 'var(--text-3)',
              fontFamily: 'var(--font-geist-mono)',
            }}
          >
            {project.url}
          </div>
        </div>

        {/* ── Full-width website preview ── */}
        <div className="relative flex-1 overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.client} homepage`}
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              unoptimized
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.4)), radial-gradient(circle at 30% 25%, rgba(255,255,255,0.22), transparent 60%)',
              }}
            />
          )}

          {/* Bottom legibility scrim under the glass panel */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
            style={{ background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.45))' }}
          />

          {/* ── Floating glass info panel ── */}
          <div
          className="absolute inset-x-3 bottom-3 rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
          }}
        >
          {/* Top tier — client + industry */}
          <div
            className="flex items-center justify-center gap-2 px-4 py-2 text-center"
            style={{ background: 'rgba(8,10,14,0.78)' }}
          >
            <span className="text-[13px] font-bold text-white">{project.client}</span>
            <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {industryLabel(project.industry)}
            </span>
          </div>

          {/* Bottom tier — category + meta + Explore */}
          <div
            className="flex items-center justify-between gap-3 px-4 py-3"
            style={{ background: 'rgba(8,10,14,0.55)' }}
          >
            <div className="min-w-0">
              <p className="text-[14px] font-bold text-white truncate">{project.category}</p>
              <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {project.year} · {project.duration}
              </p>
            </div>
            <span
              className="inline-flex flex-shrink-0 items-center gap-1.5 text-[12px] font-semibold text-white px-3 py-1.5 rounded-full transition-colors duration-150 group-hover:bg-white group-hover:text-[#0b1220]"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}
            >
              <Search size={12} /> Explore
            </span>
          </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
