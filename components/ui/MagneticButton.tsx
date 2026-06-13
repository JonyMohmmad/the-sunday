'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '@/lib/use-magnetic';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticButton({ children, className, strength = 0.35 }: Props) {
  const reduced = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const { ref, pos, onMouseMove, onMouseLeave } = useMagnetic(strength);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  if (reduced || isTouch) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 20, mass: 0.5 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
}
