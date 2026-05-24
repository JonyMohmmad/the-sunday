'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { DualCTA } from '@/components/ui/DualCTA';
import { AuditModal } from '@/components/ui/AuditModal';
import { useAuditModal } from '@/lib/useAuditModal';

function AppMockup() {
  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-[#E4E4E7]"
      style={{ boxShadow: '0 24px 80px rgba(59,63,228,0.12), 0 4px 20px rgba(0,0,0,0.06)' }}
      aria-hidden="true"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E4E4E7] bg-[#F7F7F8]">
        <div className="flex gap-1.5">
          {['#FF5F57', '#FFBD2E', '#28C840'].map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: 5, background: c }} />
          ))}
        </div>
        <div className="flex-1 flex justify-center">
          <div className="h-5 rounded-md bg-[#E4E4E7]" style={{ width: 180 }} />
        </div>
        <div className="h-5 rounded-md bg-[#E4E4E7]" style={{ width: 60 }} />
      </div>

      <div className="flex bg-white" style={{ height: 360 }}>
        {/* Sidebar */}
        <div
          className="flex flex-col items-center gap-3 py-4 px-2 border-r border-[#E4E4E7] bg-[#F7F7F8]"
          style={{ width: 52 }}
        >
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#3B3FE4' }} />
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ width: 32, height: 32, borderRadius: 8, background: '#E4E4E7' }} />
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 p-5 overflow-hidden">
          {/* Metric cards */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'MRR', value: '$24,180', pct: '+12%' },
              { label: 'Active Users', value: '1,847', pct: '+8%' },
              { label: 'Churn Rate', value: '1.2%', pct: '-0.3%' },
            ].map((m) => (
              <div
                key={m.label}
                style={{ background: '#F7F7F8', border: '1px solid #E4E4E7', borderRadius: 12, padding: '12px 14px' }}
              >
                <div style={{ fontSize: 9, color: '#71717A', marginBottom: 4, fontWeight: 500 }}>{m.label}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#09090B', letterSpacing: '-0.5px' }}>
                  {m.value}
                </div>
                <span
                  style={{
                    fontSize: 9, fontWeight: 700, color: '#09090B',
                    background: '#CCFF00', padding: '1px 6px', borderRadius: 4,
                    display: 'inline-block', marginTop: 4,
                  }}
                >
                  {m.pct}
                </span>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div style={{ border: '1px solid #E4E4E7', borderRadius: 12, padding: '12px 14px', marginBottom: 12 }}>
            <div style={{ fontSize: 9, color: '#71717A', marginBottom: 8, fontWeight: 600 }}>
              Revenue · Last 12 months
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 56 }}>
              {[28, 42, 35, 55, 48, 68, 60, 76, 70, 85, 75, 95].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    borderRadius: '3px 3px 0 0',
                    background: i === 11 ? '#3B3FE4' : i === 9 ? '#CCFF00' : '#E4E4E7',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Table */}
          <div style={{ border: '1px solid #E4E4E7', borderRadius: 12, overflow: 'hidden' }}>
            {[
              { name: 'Acme Corp', plan: 'Scale', mrr: '$890', active: true },
              { name: 'Verve Studio', plan: 'Growth', mrr: '$290', active: true },
              { name: 'Bolt Labs', plan: 'Starter', mrr: '$49', active: false },
            ].map((r, i) => (
              <div
                key={r.name}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px',
                  borderTop: i > 0 ? '1px solid #E4E4E7' : 'none',
                  background: i % 2 === 0 ? '#fff' : '#FAFAFA',
                }}
              >
                <div
                  style={{
                    width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                    background: i === 0 ? '#3B3FE4' : i === 1 ? '#CCFF00' : '#E4E4E7',
                  }}
                />
                <div style={{ flex: 1, fontSize: 9, fontWeight: 600, color: '#09090B' }}>{r.name}</div>
                <div style={{ fontSize: 9, color: '#71717A' }}>{r.plan}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#09090B' }}>{r.mrr}</div>
                <span
                  style={{
                    fontSize: 8, fontWeight: 700,
                    color: r.active ? '#09090B' : '#71717A',
                    background: r.active ? '#CCFF00' : '#E4E4E7',
                    padding: '1px 6px', borderRadius: 4,
                  }}
                >
                  {r.active ? 'Active' : 'Trial'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { isOpen, open, close } = useAuditModal();

  // Task 9: listen for openAuditModal events dispatched by ScrollDepthBanner / MobileStickyBar
  useEffect(() => {
    const handler = () => open();
    window.addEventListener('openAuditModal', handler);
    return () => window.removeEventListener('openAuditModal', handler);
  }, [open]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-white"
      aria-label="Hero"
    >
      {/* Subtle blue glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        aria-hidden="true"
        style={{
          width: '900px',
          height: '500px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(59,63,228,0.07) 0%, transparent 70%)',
        }}
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-center">

          {/* ── Left: Text ── */}
          <div className="flex flex-col gap-6 lg:gap-8">

            {/* Eyebrow */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#3B3FE4]"
            >
              <span className="w-4 h-px bg-[#3B3FE4]" aria-hidden="true" />
              SaaS &amp; Web App Studio
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-primary leading-none tracking-tight text-[clamp(2.6rem,5.5vw,4.5rem)]"
            >
              We build the software
              <br />
              <span
                style={{
                  backgroundImage: 'linear-gradient(135deg, #3B3FE4 0%, #7C3AED 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                your market wants.
              </span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-muted text-lg leading-relaxed max-w-[500px]"
            >
              Premium engineering and product design in one studio. From{' '}
              <span className="text-primary font-semibold">validated MVP</span> to full-scale SaaS —
              shipped in weeks, built to last.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              <DualCTA source="hero" onAuditClick={open} size="lg" />
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.65 }}
              className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted pt-2 border-t border-[#E4E4E7]"
            >
              {['Fixed price · no surprises', 'Engineers only · no outsourcing', 'Weeks to ship · not months'].map(
                (t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                    {t}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* ── Right: App Mockup ── */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <AppMockup />
          </motion.div>

        </div>
      </Container>

      <AuditModal isOpen={isOpen} onClose={close} />
    </section>
  );
}
