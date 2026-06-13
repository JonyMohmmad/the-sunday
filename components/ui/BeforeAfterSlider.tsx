'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface BeforeAfterSliderProps {
  beforeLabel?: string;
  afterLabel?:  string;
  beforeBg?:    string;
  afterBg?:     string;
  className?:   string;
  // TODO: when real screenshots exist, replace these with:
  // beforeImage: string;  // next/image src
  // afterImage:  string;  // next/image src
}

function FakeGrid({ isAfter }: { isAfter: boolean }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: 6,
        padding: '8px 10px',
        flex: 1,
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          style={{
            background: isAfter ? '#141416' : '#232327',
            border: isAfter ? '1px solid #232327' : 'none',
            borderRadius: 4,
            minHeight: 40,
          }}
        />
      ))}
    </div>
  );
}

export default function BeforeAfterSlider({
  beforeLabel = 'Before',
  afterLabel  = 'After',
  beforeBg    = '#1a1a1c',
  afterBg     = '#0f1a00',
  className,
}: BeforeAfterSliderProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos]   = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Hint animation on mount
  useEffect(() => {
    if (reduced) return;
    let rafId: number;
    const duration = 1200;
    const start    = performance.now();

    function tick(now: number) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // 50 â†’ 35 â†’ 50 with ease-in-out via sine
      const t   = Math.sin(progress * Math.PI);
      const pos = 50 - t * 15;
      setSliderPos(pos);
      if (progress < 1) rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reduced]);

  const clamp = (v: number) => Math.min(95, Math.max(5, v));

  const calcPos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSliderPos(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  // Mouse drag
  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => calcPos(e.clientX);
    const onUp   = ()              => setIsDragging(false);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseup',   onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
    };
  }, [isDragging, calcPos]);

  const handleTouchMove  = (e: React.TouchEvent) => calcPos(e.touches[0].clientX);

  return (
    <div
      ref={containerRef}
      className={`cursor-drag ${className ?? ''}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 8,
        aspectRatio: '16/10',
        cursor: 'none',
        userSelect: 'none',
      }}
    >
      {/* BEFORE panel â€” full width behind */}
      {/* TODO: replace with <Image src={beforeImage} ... /> when screenshots exist */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: beforeBg,
          display: 'flex', flexDirection: 'column',
        }}
      >
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span style={{
            position: 'absolute', top: 8, left: 8,
            fontSize: 11, background: 'rgba(239,68,68,0.15)',
            border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444',
            borderRadius: 4, padding: '2px 8px', textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>
            CVR: 1.2%
          </span>
          <div style={{ textAlign: 'center', paddingTop: 32, fontSize: 11, color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            [Before]
          </div>
          <FakeGrid isAfter={false} />
        </div>
      </div>

      {/* AFTER panel â€” clipped */}
      {/* TODO: replace with <Image src={afterImage} ... /> when screenshots exist */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: afterBg,
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
          display: 'flex', flexDirection: 'column',
        }}
      >
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span style={{
            position: 'absolute', top: 8, left: 8,
            fontSize: 11, background: 'rgba(204,255,0,0.1)',
            border: '1px solid rgba(204,255,0,0.3)', color: '#CCFF00',
            borderRadius: 4, padding: '2px 8px', textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>
            CVR: 3.8%
          </span>
          <div style={{ textAlign: 'center', paddingTop: 32, fontSize: 11, color: '#CCFF00', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            [After]
          </div>
          <FakeGrid isAfter={true} />
        </div>
      </div>

      {/* Drag handle */}
      <div
        style={{
          position: 'absolute', top: 0, bottom: 0,
          left: `calc(${sliderPos}% - 1px)`,
          width: 2, background: '#CCFF00',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDragging(false)}
      >
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: isDragging ? '#CCFF00' : '#141416',
          border: '2px solid #CCFF00',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'ew-resize',
          flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M5 8H11M3 8L6 5M3 8L6 11M13 8L10 5M13 8L10 11"
              stroke={isDragging ? '#0A0A0B' : '#CCFF00'}
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span style={{
        position: 'absolute', top: 10, left: 10,
        fontSize: 11, background: 'rgba(0,0,0,0.6)', color: '#A1A1AA',
        padding: '4px 8px', borderRadius: 4,
        opacity: isDragging ? 0 : 1, transition: 'opacity 0.2s ease',
        pointerEvents: 'none',
      }}>
        {beforeLabel}
      </span>
      <span style={{
        position: 'absolute', top: 10, right: 10,
        fontSize: 11, background: 'rgba(0,0,0,0.6)', color: '#CCFF00',
        padding: '4px 8px', borderRadius: 4,
        opacity: isDragging ? 0 : 1, transition: 'opacity 0.2s ease',
        pointerEvents: 'none',
      }}>
        {afterLabel}
      </span>
    </div>
  );
}
