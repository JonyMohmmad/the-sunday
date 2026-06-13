'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface Props {
  value:      number;
  prefix?:    string;
  suffix?:    string;
  decimals?:  number;
  duration?:  number;
  className?: string;
}

export default function NumberTicker({
  value,
  prefix   = '',
  suffix   = '',
  decimals = 0,
  duration = 2000,
  className,
}: Props) {
  const ref      = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const reduced  = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(value);
      return;
    }

    let startTime: number | null = null;
    let rafId: number;

    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutCubic(progress);
      setDisplay(value * eased);
      if (progress < 1) rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, value, duration, reduced]);

  const withCommas = Number(display.toFixed(decimals)).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}{withCommas}{suffix}
    </span>
  );
}
