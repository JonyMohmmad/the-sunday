'use client';

import { motion } from 'framer-motion';
import { useMotionVariants } from '@/lib/animations';
import GradientText from '@/components/ui/GradientText';

const logLines = [
  { text: '$ forge deploy ./api --prod',         color: '#93c5fd', delay: 0.3  },
  { text: '✓ Building... (1.2s)',                 color: '#22c55e', delay: 0.45 },
  { text: '✓ Pushing to 37 edge regions... (0.8s)', color: '#22c55e', delay: 0.6  },
  { text: '✓ Health checks passed (all regions)', color: '#22c55e', delay: 0.72 },
  { text: '✓ Deployed → https://api.forge.dev/v2',color: '#22c55e', delay: 0.84 },
  { text: 'Deploy time: 2.4s 🚀',                color: '#f1f5f9', delay: 0.96 },
];

const avatarGradients = [
  'linear-gradient(135deg,#667eea,#764ba2)',
  'linear-gradient(135deg,#f093fb,#f5576c)',
  'linear-gradient(135deg,#4facfe,#00f2fe)',
  'linear-gradient(135deg,#43e97b,#38f9d7)',
  'linear-gradient(135deg,#fa709a,#fee140)',
];

export default function Hero() {
  const v = useMotionVariants();

  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-24 text-center px-4"
      style={{ zIndex: 1 }}
    >

      {/* Animated badge */}
      <motion.div
        variants={v.fadeIn}
        initial="hidden"
        animate="visible"
        className="mb-8 inline-flex"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm cursor-pointer"
          style={{
            background: 'rgba(59,130,246,0.06)',
            border: '1px solid rgba(59,130,246,0.3)',
            color: '#93c5fd',
          }}
          whileHover={{
            boxShadow: '0 0 20px rgba(59,130,246,0.2)',
            borderColor: 'rgba(59,130,246,0.5)',
          }}
          transition={{ duration: 0.2 }}
        >
          <span>⚡</span>
          <span>New — Edge deployments now in 37 regions</span>
          <span style={{ color: 'rgba(147,197,253,0.6)' }}>→</span>
        </motion.div>
      </motion.div>

      {/* H1 */}
      <motion.h1
        variants={v.fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="font-bold tracking-tight leading-none mb-6"
        style={{
          fontSize: 'clamp(52px, 6vw, 80px)',
          letterSpacing: '-0.03em',
          color: 'var(--text)',
          maxWidth: '14ch',
        }}
      >
        Deploy APIs that
        <br />
        <GradientText>actually scale.</GradientText>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        variants={v.fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="text-[19px] leading-[1.7] mb-10"
        style={{ color: 'var(--text-2)', maxWidth: '560px' }}
      >
        Forge deploys your APIs globally in under 3 seconds, monitors every request
        in real-time, and scales to zero automatically. No infrastructure expertise required.
      </motion.p>

      {/* CTA row */}
      <motion.div
        variants={v.fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-10"
      >
        <motion.a
          href="#"
          whileHover={{ y: -2, scale: 1.03, boxShadow: '0 0 32px rgba(59,130,246,0.35)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold text-white"
          style={{ background: 'var(--primary)' }}
        >
          Start deploying free →
        </motion.a>
        <motion.a
          href="#"
          whileHover={{ y: -2, borderColor: 'var(--primary)', color: '#93c5fd' }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-colors duration-150"
          style={{
            border: '1px solid var(--border)',
            color: 'var(--text-2)',
          }}
        >
          ▶ Watch 2-min demo
        </motion.a>
      </motion.div>

      {/* Social proof */}
      <motion.div
        variants={v.fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="flex items-center gap-3 justify-center mb-16"
      >
        <div className="flex">
          {avatarGradients.map((grad, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border-2 flex-shrink-0"
              style={{
                background: grad,
                borderColor: 'var(--bg)',
                marginLeft: i === 0 ? 0 : -8,
              }}
            />
          ))}
        </div>
        <p className="text-sm" style={{ color: 'var(--text-2)' }}>
          <strong className="font-semibold" style={{ color: 'var(--text)' }}>
            4,200+
          </strong>{' '}
          engineering teams shipping with Forge
        </p>
      </motion.div>

      {/* Hero terminal card */}
      <motion.div
        variants={v.fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
        className="float-animation w-full"
        style={{ maxWidth: '640px', zIndex: 2 }}
      >
        <div
          className="glass glow-blue rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 0 60px rgba(59,130,246,0.15), 0 32px 64px rgba(0,0,0,0.4)' }}
        >
          {/* Card header */}
          <div
            className="flex items-center gap-2 px-5 py-3.5"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span
              className="ml-2 text-sm"
              style={{ color: 'var(--text-3)', fontFamily: 'var(--font-geist-mono)' }}
            >
              forge deploy
            </span>
          </div>

          {/* Log lines */}
          <div className="px-5 py-5 space-y-1.5">
            {logLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: line.delay, duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                className="text-[13px] leading-relaxed"
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  color: line.color,
                }}
              >
                {line.text}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div
            className="px-5 pb-5"
          >
            <div
              className="h-[2px] rounded-full overflow-hidden"
              style={{ background: 'var(--surface-2)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'var(--primary)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.1, duration: 1, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
