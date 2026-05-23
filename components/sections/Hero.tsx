'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

/* ─── Before / After Store Mockups ──────────────────────────────────────────── */

function BeforeMockup() {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ background: '#f0eded', fontFamily: 'Arial, sans-serif' }}
      aria-hidden="true"
    >
      {/* Header */}
      <div style={{ background: '#e4e0e0', padding: '8px 12px', borderBottom: '2px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>STORE NAME</span>
        <div style={{ display: 'flex', gap: '10px', fontSize: '10px', color: '#666' }}>
          <span>Home</span><span>Shop</span><span>Sale</span><span>About</span>
        </div>
      </div>
      {/* Sale banner */}
      <div style={{ background: '#cc0000', color: 'white', textAlign: 'center', padding: '5px', fontSize: '10px', fontWeight: 'bold' }}>
        🔥 SUMMER SALE — 30% OFF EVERYTHING!! LIMITED TIME 🔥
      </div>
      {/* Hero area */}
      <div style={{ background: '#d8d5d5', padding: '16px', textAlign: 'center', borderBottom: '1px solid #ccc' }}>
        <div style={{ background: '#c0bcbc', height: '50px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '9px', color: '#888' }}>BANNER IMAGE</span>
        </div>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#222', marginBottom: '4px' }}>Welcome to Our Store!</div>
        <div style={{ fontSize: '10px', color: '#666', marginBottom: '10px' }}>Check out our amazing collection today!</div>
        <button style={{ background: '#cc0000', color: 'white', border: 'none', padding: '6px 14px', fontSize: '11px', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}>SHOP NOW</button>
      </div>
      {/* Product grid */}
      <div style={{ padding: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
        {[
          { name: 'Cool Tee v2', price: '$29.99', orig: '$39.99', color: '#b8b4b4' },
          { name: 'Hoodie (Black)', price: '$59.99', orig: '$79.99', color: '#a8a4a4' },
          { name: 'Cap - New!', price: '$24.99', orig: '$34.99', color: '#bfbbbb' },
        ].map((p, i) => (
          <div key={i} style={{ background: 'white', border: '1px solid #ddd', padding: '6px', borderRadius: '2px' }}>
            <div style={{ background: p.color, height: '48px', marginBottom: '5px' }} />
            <div style={{ fontSize: '9px', color: '#333', fontWeight: 'bold', marginBottom: '2px', lineHeight: 1.2 }}>{p.name}</div>
            <div style={{ fontSize: '9px', color: '#cc0000', fontWeight: 'bold' }}>{p.price}</div>
            <div style={{ fontSize: '8px', color: '#999', textDecoration: 'line-through' }}>{p.orig}</div>
            <button style={{ width: '100%', marginTop: '5px', background: '#555', color: 'white', border: 'none', padding: '3px', fontSize: '8px', cursor: 'pointer' }}>Add to Cart</button>
          </div>
        ))}
      </div>
      {/* Slow badge */}
      <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: '#cc0000', color: 'white', fontSize: '8px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
        ⚠ 6.2s load · 1.1% CVR
      </div>
      {/* Label */}
      <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '9px', padding: '2px 8px', borderRadius: '4px', fontWeight: '700', letterSpacing: '0.1em' }}>
        BEFORE
      </div>
    </div>
  );
}

function AfterMockup() {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ background: '#0A0A0B', fontFamily: "'Space Grotesk', Inter, sans-serif" }}
      aria-hidden="true"
    >
      {/* Clean header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid #232327' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: '#FAFAFA', letterSpacing: '-0.02em' }}>VOID</span>
        <div style={{ display: 'flex', gap: '12px', fontSize: '10px', color: '#A1A1AA' }}>
          <span>Shop</span><span>Lookbook</span><span>Drops</span>
        </div>
        <span style={{ fontSize: '11px', color: '#A1A1AA' }}>⊞</span>
      </div>
      {/* Hero */}
      <div style={{ padding: '14px', borderBottom: '1px solid #232327' }}>
        <div style={{ fontSize: '8px', color: '#A1A1AA', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>New Drop — SS26</div>
        <div style={{ fontSize: '20px', fontWeight: '700', color: '#FAFAFA', lineHeight: '1.1', letterSpacing: '-0.03em', marginBottom: '10px' }}>
          Wear what<br />you believe in.
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button style={{ background: '#CCFF00', color: '#0A0A0B', border: 'none', padding: '6px 12px', fontSize: '10px', fontWeight: '700', borderRadius: '6px', cursor: 'pointer', letterSpacing: '-0.01em' }}>
            Shop the Drop
          </button>
          <span style={{ fontSize: '10px', color: '#A1A1AA' }}>View lookbook →</span>
        </div>
      </div>
      {/* Product grid */}
      <div style={{ padding: '10px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '7px' }}>
        {[
          { name: 'VOID TEE 001', price: '$42', color: '#1a1a1c', label: 'DROP 01' },
          { name: 'CORE HOODIE', price: '$89', color: '#141416', label: 'DROP 02' },
          { name: 'SNAP BACK', price: '$36', color: '#1c1c1e', label: 'NEW' },
        ].map((p, i) => (
          <div key={i} style={{ background: '#141416', border: '1px solid #232327', padding: '7px', borderRadius: '8px' }}>
            <div style={{ background: p.color, height: '50px', marginBottom: '7px', borderRadius: '5px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', padding: '4px' }}>
              <span style={{ fontSize: '6px', color: '#CCFF00', background: 'rgba(204,255,0,0.1)', border: '1px solid rgba(204,255,0,0.3)', borderRadius: '3px', padding: '1px 4px', fontWeight: '700', letterSpacing: '0.05em' }}>{p.label}</span>
            </div>
            <div style={{ fontSize: '8px', color: '#FAFAFA', fontWeight: '600', marginBottom: '3px', letterSpacing: '-0.01em' }}>{p.name}</div>
            <div style={{ fontSize: '10px', color: '#CCFF00', fontWeight: '700' }}>{p.price}</div>
          </div>
        ))}
      </div>
      {/* Fast badge */}
      <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(204,255,0,0.12)', border: '1px solid rgba(204,255,0,0.35)', color: '#CCFF00', fontSize: '8px', padding: '2px 7px', borderRadius: '4px', fontWeight: '700' }}>
        ⚡ 1.4s load · 2.4% CVR
      </div>
      {/* Label — positioned left so it stays visible when clipped from the right */}
      <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(204,255,0,0.12)', border: '1px solid rgba(204,255,0,0.4)', color: '#CCFF00', fontSize: '9px', padding: '2px 8px', borderRadius: '4px', fontWeight: '700', letterSpacing: '0.1em' }}>
        AFTER
      </div>
    </div>
  );
}

/* ─── Before / After Slider ──────────────────────────────────────────────────── */

function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(3, Math.min(97, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    e.preventDefault();
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging.current) updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const stopDrag = useCallback(() => {
    isDragging.current = false;
  }, []);

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  useEffect(() => {
    const onUp = () => { isDragging.current = false; };
    window.addEventListener('mouseup', onUp);
    return () => window.removeEventListener('mouseup', onUp);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden rounded-xl border border-[#232327] cursor-col-resize"
      style={{ aspectRatio: '16/10' }}
      onMouseMove={onMouseMove}
      onMouseLeave={stopDrag}
      onTouchMove={onTouchMove}
      role="img"
      aria-label="Before and after comparison: drag the handle to compare a generic Shopify store versus our redesigned version"
    >
      {/* BEFORE — full width base */}
      <div className="absolute inset-0">
        <BeforeMockup />
      </div>

      {/* AFTER — clipped to show left portion */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <AfterMockup />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white/80 pointer-events-none"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      />

      {/* Drag handle */}
      <button
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-xl cursor-col-resize z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        style={{ left: `${position}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={() => { isDragging.current = true; }}
        aria-label="Drag to compare stores"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M6 9l-3 3-3-3" stroke="#0A0A0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 6 9)" />
          <path d="M12 9l3 3 3-3" stroke="#0A0A0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 12 9)" />
          <line x1="9" y1="3" x2="9" y2="15" stroke="#0A0A0B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

/* ─── Hero Section ───────────────────────────────────────────────────────────── */

const headline = "We turn streetwear & anime brands' Instagram traffic into Shopify sales.";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const words = headline.split(' ');

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.04 },
    },
  };

  const wordVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      aria-label="Hero"
    >
      {/* Accent glow behind headline */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '15%',
          left: '-10%',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(204,255,0,0.07) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">

          {/* ── Left: Text ── */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Eyebrow */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-muted"
            >
              <span className="w-4 h-px bg-accent" aria-hidden="true" />
              Shopify Conversion Agency
            </motion.div>

            {/* Headline — word stagger */}
            <h1 className="font-display font-bold text-primary leading-none tracking-tight text-[clamp(2.5rem,5.5vw,4.5rem)]">
              <motion.span
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="block"
                aria-label={headline}
              >
                {words.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordVariants}
                    className="inline-block mr-[0.22em] last:mr-0"
                    aria-hidden="true"
                  >
                    {/* Highlight "Instagram" with accent */}
                    {word === 'Instagram' ? (
                      <span className="text-accent">{word}</span>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
              </motion.span>
            </h1>

            {/* Subhead */}
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-muted text-lg leading-relaxed max-w-[520px]"
            >
              Conversion-focused store redesigns. Faster, bolder, built to sell —
              shipped in{' '}
              <span className="text-primary font-semibold">3 weeks.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              {/* TODO: Replace # with real Cal.com / Calendly link */}
              <Button href="#" size="lg">
                Get a free redesign of one section
              </Button>
              <a
                href="#work"
                className="text-sm text-muted hover:text-primary transition-colors duration-150 flex items-center gap-1.5"
              >
                See our work
                <span aria-hidden="true">↓</span>
              </a>
            </motion.div>

            {/* Trust micro-signals */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.9 }}
              className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted pt-2 border-t border-[#232327]"
            >
              {['No discovery-call games', 'Fixed pricing', '3-week delivery'].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Before/After Slider ── */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {/* Instruction hint */}
            <p className="text-xs text-muted mb-3 flex items-center gap-2" aria-hidden="true">
              <span className="inline-block w-3 h-3 border border-muted rounded-full flex-shrink-0" />
              Drag to compare
            </p>
            <BeforeAfterSlider />
            {/* Caption — clearly marks as placeholder */}
            <p className="mt-3 text-xs text-muted text-center">
              {/* REPLACE: Swap these mockups with real spec project screenshots */}
              Concept redesign — real spec projects coming soon
            </p>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
