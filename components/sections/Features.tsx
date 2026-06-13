'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useMotionVariants } from '@/lib/animations';
import Badge from '@/components/ui/Badge';

function FeatureCheck({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--text-2)' }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0">
        <circle cx="8" cy="8" r="7" fill="rgba(34,197,94,0.12)" />
        <path d="M5 8l2.5 2.5L11 5.5" stroke="#22c55e" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {text}
    </li>
  );
}

/* ─── Feature 1 Visual: Deploy terminal ─── */
function DeployVisual() {
  const lines = [
    { text: '$ forge deploy ./api --prod', color: '#93c5fd' },
    { text: '  Building image...', color: 'var(--text-3)' },
    { text: '✓ Image ready (1.2s)', color: '#22c55e' },
    { text: '  Deploying to 37 regions', color: 'var(--text-3)' },
    { text: '✓ us-east-1 — live', color: '#22c55e' },
    { text: '✓ eu-west-1 — live', color: '#22c55e' },
    { text: '✓ ap-southeast-1 — live', color: '#22c55e' },
    { text: '  + 34 more regions', color: 'var(--text-3)' },
    { text: '✓ All health checks passed', color: '#22c55e' },
  ];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="relative">
      <div
        className="absolute -inset-4 rounded-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.1) 0%, transparent 70%)' }}
      />
      <div
        className="glass rounded-2xl overflow-hidden relative"
        style={{ boxShadow: '0 24px 48px rgba(0,0,0,0.35)' }}
      >
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs ml-1" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-geist-mono)' }}>
            terminal
          </span>
        </div>
        <div className="p-5 space-y-1">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="text-[13px] leading-relaxed"
              style={{ fontFamily: 'var(--font-geist-mono)', color: line.color }}
            >
              {line.text}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Feature 2 Visual: Analytics dashboard ─── */
function AnalyticsVisual() {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-80px' });
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  const metrics = [
    { label: 'Requests', value: '2.4M', change: '+12%', up: true },
    { label: 'P95 Latency', value: '34ms', change: '-8%', up: false },
    { label: 'Error Rate', value: '0.02%', change: '-44%', up: false },
  ];

  return (
    <div ref={containerRef} className="relative">
      <div
        className="absolute -inset-4 rounded-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="glass rounded-2xl overflow-hidden relative"
        style={{ boxShadow: '0 24px 48px rgba(0,0,0,0.35)' }}
      >
        <div
          className="px-5 py-4"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
            API Analytics
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>
            Last 30 days
          </p>
        </div>

        {/* Metric tiles */}
        <div
          className="grid grid-cols-3"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="px-4 py-4"
              style={{ borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}
            >
              <p className="text-xs mb-1" style={{ color: 'var(--text-2)' }}>{m.label}</p>
              <p className="text-lg font-bold" style={{ color: 'var(--text)' }}>{m.value}</p>
              <p
                className="text-xs mt-0.5 font-medium"
                style={{ color: m.up ? '#22c55e' : '#22c55e' }}
              >
                {m.change}
              </p>
            </div>
          ))}
        </div>

        {/* SVG Line chart */}
        <div className="px-5 py-5">
          <svg
            viewBox="0 0 320 80"
            className="w-full"
            style={{ overflow: 'visible' }}
          >
            {/* Grid lines */}
            {[20, 40, 60].map((y) => (
              <line
                key={y}
                x1="0" y1={y} x2="320" y2={y}
                stroke="var(--border)"
                strokeWidth="1"
              />
            ))}
            {/* Area fill */}
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 65 C 25 60, 45 50, 60 48 C 75 46, 95 55, 110 52 C 125 49, 145 30, 160 26 C 175 22, 195 38, 215 34 C 235 30, 260 18, 280 15 L 320 12 L 320 80 L 0 80 Z"
              fill="url(#chartGrad)"
            />
            {/* Main line */}
            <path
              ref={pathRef}
              d="M 0 65 C 25 60, 45 50, 60 48 C 75 46, 95 55, 110 52 C 125 49, 145 30, 160 26 C 175 22, 195 38, 215 34 C 235 30, 260 18, 280 15 L 320 12"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                strokeDasharray: pathLength || 1000,
                strokeDashoffset: inView ? 0 : (pathLength || 1000),
                transition: 'stroke-dashoffset 1.6s cubic-bezier(0.2,0.8,0.2,1)',
              }}
            />
            {/* End dot */}
            <motion.circle
              cx="320" cy="12" r="4"
              fill="#3b82f6"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.4, duration: 0.3 }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Feature 3 Visual: Slack alert card ─── */
function AlertVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="relative">
      <div
        className="absolute -inset-4 rounded-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(239,68,68,0.07) 0%, transparent 70%)' }}
      />
      <div
        className="glass rounded-2xl overflow-hidden relative"
        style={{ boxShadow: '0 24px 48px rgba(0,0,0,0.35)', maxWidth: '400px', margin: '0 auto' }}
      >
        {/* Slack header */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#4A154B,#7B1FA2)' }}
          >
            f
          </div>
          <div>
            <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
              forge
            </span>
            <span className="text-xs ml-2" style={{ color: 'var(--text-2)' }}>
              APP
            </span>
          </div>
          <span className="text-xs ml-auto" style={{ color: 'var(--text-3)' }}>2 minutes ago</span>
        </div>

        {/* Message body */}
        <div className="px-4 py-4">
          <div
            className="rounded-lg p-4"
            style={{
              background: 'rgba(239,68,68,0.06)',
              borderLeft: '3px solid rgba(239,68,68,0.6)',
            }}
          >
            <p className="text-sm font-semibold mb-2" style={{ color: '#fca5a5' }}>
              🔴 [ALERT] Error rate spike on /api/v2/users
            </p>
            <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
              Affected: <strong className="text-white/80">3 deployments</strong> · P95 latency:{' '}
              <strong className="text-white/80">847ms</strong>
            </p>
            <div className="flex flex-wrap gap-2">
              {['View traces', 'Acknowledge'].map((label) => (
                <button
                  key={label}
                  className="text-xs px-3 py-1.5 rounded font-medium transition-colors duration-150"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-2)',
                  }}
                >
                  {label}
                </button>
              ))}
              <AnimatePresence>
                {inView && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                    className="text-xs px-3 py-1.5 rounded font-semibold"
                    style={{
                      background: 'rgba(34,197,94,0.12)',
                      border: '1px solid rgba(34,197,94,0.3)',
                      color: '#86efac',
                    }}
                  >
                    → RESOLVED ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Feature block ─── */
interface FeatureBlockProps {
  eyebrow: string;
  title: string;
  description: string;
  checks: string[];
  visual: React.ReactNode;
  flip?: boolean;
}

function FeatureBlock({ eyebrow, title, description, checks, visual, flip = false }: FeatureBlockProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const v = useMotionVariants();

  const textAnim = flip ? v.slideRight : v.slideLeft;
  const visualAnim = flip ? v.slideLeft : v.slideRight;

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20 ${
        flip ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''
      }`}
    >
      {/* Text */}
      <motion.div
        variants={textAnim}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <Badge variant="blue" className="mb-5">{eyebrow}</Badge>
        <h3
          className="font-bold tracking-tight mb-4"
          style={{
            fontSize: 'clamp(26px, 2.5vw, 34px)',
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            lineHeight: 1.1,
          }}
        >
          {title}
        </h3>
        <p className="text-base leading-[1.7] mb-8" style={{ color: 'var(--text-2)' }}>
          {description}
        </p>
        <ul className="space-y-3">
          {checks.map((c) => (
            <FeatureCheck key={c} text={c} />
          ))}
        </ul>
      </motion.div>

      {/* Visual */}
      <motion.div
        variants={visualAnim}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {visual}
      </motion.div>
    </div>
  );
}

/* ─── Section ─── */
export default function Features() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });
  const v = useMotionVariants();

  return (
    <section id="features" aria-labelledby="features-heading" className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <motion.div
          ref={headingRef}
          variants={v.fadeUp}
          initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
          className="text-center pt-24 pb-4"
        >
          <h2
            id="features-heading"
            className="font-bold tracking-tight mb-5"
            style={{
              fontSize: 'clamp(36px, 4vw, 52px)',
              letterSpacing: '-0.02em',
              color: 'var(--text)',
            }}
          >
            Everything your API needs —{' '}
            <br className="hidden lg:block" />
            from first deploy to 10 billion requests.
          </h2>
          <p
            className="text-[19px] leading-relaxed mx-auto"
            style={{ color: 'var(--text-2)', maxWidth: '540px' }}
          >
            One platform that handles deployment, observability, and incident response
            so your team can focus on shipping product.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="mt-8" style={{ borderTop: '1px solid var(--border)' }} />

        {/* Feature blocks */}
        <FeatureBlock
          eyebrow="Deploy"
          title="Ship in under 3 seconds"
          description="Push to git, Forge builds and deploys your API across 37 global edge regions. Zero config. Zero cold starts. Automatic rollback on error."
          checks={[
            '37 edge regions worldwide',
            'Git-connected deployments',
            'Instant rollback on any error',
            'Preview environments on every PR',
          ]}
          visual={<DeployVisual />}
        />

        <div style={{ borderTop: '1px solid var(--border)' }} />

        <FeatureBlock
          eyebrow="Monitor"
          title="See every request. Every error. Every anomaly."
          description="Real-time request logs, distributed tracing, P50/P95/P99 latency breakdowns, and intelligent error grouping. Know what's broken before your users do."
          checks={[
            'Real-time request logs',
            'Latency percentiles (P50/P95/P99)',
            'Distributed tracing',
            'Error grouping + fingerprinting',
          ]}
          visual={<AnalyticsVisual />}
          flip
        />

        <div style={{ borderTop: '1px solid var(--border)' }} />

        <FeatureBlock
          eyebrow="Alert"
          title="Get paged once, not a hundred times."
          description="ML-powered anomaly detection groups related alerts so you see what's actually wrong. Direct integrations with Slack, PagerDuty, and your incident workflow."
          checks={[
            'ML anomaly detection',
            'Slack, PagerDuty, email integrations',
            'Runbook links embedded in alerts',
            'Auto-resolve on recovery',
          ]}
          visual={<AlertVisual />}
        />

      </div>
    </section>
  );
}
