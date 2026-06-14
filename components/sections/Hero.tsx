'use client';

import { motion } from 'framer-motion';
import { useMotionVariants } from '@/lib/animations';
import GradientText from '@/components/ui/GradientText';
import { SITE, HERO } from '@/lib/site';

const avatarGradients = [
  'linear-gradient(135deg,#667eea,#764ba2)',
  'linear-gradient(135deg,#f093fb,#f5576c)',
  'linear-gradient(135deg,#4facfe,#00f2fe)',
  'linear-gradient(135deg,#43e97b,#38f9d7)',
  'linear-gradient(135deg,#fa709a,#fee140)',
];

const heroStats = [
  { label: 'Conversion', value: '+162%', up: true },
  { label: 'Load time', value: '0.9s', up: true },
  { label: 'Bounce rate', value: '−38%', up: true },
];

export default function Hero() {
  const v = useMotionVariants();

  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-24 text-center px-4"
      style={{ zIndex: 1 }}
    >
      {/* Eyebrow */}
      <motion.div variants={v.fadeIn} initial="hidden" animate="visible" className="mb-8 inline-flex">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
          style={{
            background: 'rgba(59,130,246,0.06)',
            border: '1px solid rgba(59,130,246,0.3)',
            color: '#93c5fd',
          }}
        >
          <span>✦</span>
          <span>{HERO.eyebrow}</span>
        </div>
      </motion.div>

      {/* H1 */}
      <motion.h1
        variants={v.fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="font-bold tracking-tight leading-none mb-6"
        style={{
          fontSize: 'clamp(48px, 6vw, 80px)',
          letterSpacing: '-0.03em',
          color: 'var(--text)',
          maxWidth: '16ch',
        }}
      >
        {HERO.headline1}
        <br />
        <GradientText>{HERO.headline2}</GradientText>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        variants={v.fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="text-[19px] leading-[1.7] mb-10"
        style={{ color: 'var(--text-2)', maxWidth: '600px' }}
      >
        {HERO.body}
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
          href={SITE.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2, scale: 1.03, boxShadow: '0 0 32px var(--cta-glow)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold text-white"
          style={{ background: 'var(--cta)' }}
        >
          {SITE.bookingLabel} →
        </motion.a>
        <motion.a
          href="#work"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-colors duration-150 hover:text-[var(--text)]"
          style={{ border: '1px solid var(--border)', color: 'var(--text-2)' }}
        >
          See our work
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
              style={{ background: grad, borderColor: 'var(--bg)', marginLeft: i === 0 ? 0 : -8 }}
            />
          ))}
        </div>
        <p className="text-sm" style={{ color: 'var(--text-2)' }}>
          <strong className="font-semibold" style={{ color: 'var(--text)' }}>150+</strong>{' '}
          businesses worldwide trust {SITE.brand}
        </p>
      </motion.div>

      {/* Hero browser mockup */}
      <motion.div
        variants={v.fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
        className="float-animation w-full"
        style={{ maxWidth: '720px', zIndex: 2 }}
      >
        <div
          className="glass glow-blue rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 0 60px rgba(59,130,246,0.15), 0 32px 64px rgba(0,0,0,0.4)' }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-2 px-5 py-3.5"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div
              className="ml-3 flex-1 max-w-xs mx-auto text-xs px-3 py-1.5 rounded-md text-center"
              style={{ background: 'var(--surface-2)', color: 'var(--text-3)', fontFamily: 'var(--font-geist-mono)' }}
            >
              yourbusiness.com
            </div>
          </div>

          {/* Mock site body */}
          <div className="px-6 py-7 text-left">
            <div className="flex items-center justify-between mb-6">
              <div className="h-3 w-24 rounded-full" style={{ background: 'var(--surface-2)' }} />
              <div className="h-7 w-20 rounded-md" style={{ background: 'var(--primary)' }} />
            </div>
            <div className="h-5 w-3/4 rounded-md mb-3" style={{ background: 'rgba(255,255,255,0.12)' }} />
            <div className="h-3 w-2/3 rounded-full mb-2" style={{ background: 'var(--surface-2)' }} />
            <div className="h-3 w-1/2 rounded-full mb-6" style={{ background: 'var(--surface-2)' }} />

            <div className="grid grid-cols-3 gap-3">
              {heroStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.12, duration: 0.4 }}
                  className="rounded-xl p-3.5"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}
                >
                  <p className="text-[11px] mb-1" style={{ color: 'var(--text-3)' }}>{s.label}</p>
                  <p className="text-lg font-bold" style={{ color: '#22c55e' }}>{s.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
