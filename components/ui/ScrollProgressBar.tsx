'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

export default function ScrollProgressBar() {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      setProgress((window.scrollY / scrollable) * 100);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 60,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    >
      <div
        style={{
          height: '100%',
          background: '#CCFF00',
          transformOrigin: 'left',
          transform: `scaleX(${progress / 100})`,
          transition: 'transform 80ms linear',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
