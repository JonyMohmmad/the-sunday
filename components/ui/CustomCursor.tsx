'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';

type CursorState = 'default' | 'cta' | 'link' | 'drag' | 'text';

export default function CustomCursor() {
  const reduced = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<CursorState>('default');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    if (reduced || isTouch) return;

    document.body.style.cursor = 'none';
    return () => { document.body.style.cursor = 'auto'; };
  }, [reduced, isTouch]);

  useEffect(() => {
    if (reduced || isTouch) return;

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('.cursor-drag')) {
        setCursorState('drag');
      } else if (target.closest('.cursor-cta')) {
        setCursorState('cta');
      } else if (target.closest('a') || target.closest('button')) {
        setCursorState('link');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [reduced, isTouch]);

  if (reduced || isTouch) return null;

  const isDrag = cursorState === 'drag';
  const isCta  = cursorState === 'cta';
  const isLink = cursorState === 'link';

  // Dot size
  const dotSize  = isCta ? 0 : isLink ? 4 : 8;
  // Ring size
  const ringSize = isCta ? 64 : isLink ? 24 : 36;

  return (
    <>
      {/* Outer ring â€” spring lag */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          display: isDrag ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          opacity: cursorState === 'text' ? 0 : 1,
          transition: 'opacity 0.2s ease, width 0.15s ease, height 0.15s ease, background 0.15s ease, border-color 0.15s ease, border-width 0.15s ease',
          width: ringSize,
          height: ringSize,
          border: isCta ? '1.5px solid #CCFF00' : '1px solid rgba(204,255,0,0.4)',
          background: isCta ? 'rgba(204,255,0,0.08)' : 'transparent',
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
        }}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      >
        {isCta && (
          <span style={{ fontSize: 9, textTransform: 'uppercase', color: '#CCFF00', letterSpacing: '0.08em', userSelect: 'none' }}>
            click
          </span>
        )}
      </motion.div>

      {/* Inner dot â€” no lag */}
      {isDrag ? (
        // Drag cursor: â†â†’ arrows
        <motion.div
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            zIndex: 9999,
            color: '#CCFF00',
            fontSize: 20,
            userSelect: 'none',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ x: pos.x, y: pos.y }}
          transition={{ duration: 0 }}
        >
          â†â†’
        </motion.div>
      ) : (
        <motion.div
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            zIndex: 9999,
            borderRadius: '50%',
            background: '#CCFF00',
            transition: 'width 0.1s ease, height 0.1s ease',
            width: dotSize,
            height: dotSize,
            marginLeft: -dotSize / 2,
            marginTop: -dotSize / 2,
          }}
          animate={{ x: pos.x, y: pos.y }}
          transition={{ duration: 0 }}
        />
      )}
    </>
  );
}
