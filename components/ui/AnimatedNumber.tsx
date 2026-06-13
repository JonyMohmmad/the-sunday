'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, useTransform, motion } from 'framer-motion';

interface AnimatedNumberProps {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedNumber({
  target,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 50, damping: 20 });

  const display = useTransform(spring, (val) => {
    if (decimals > 0) {
      return val.toFixed(decimals);
    }
    return Math.round(val).toLocaleString();
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
