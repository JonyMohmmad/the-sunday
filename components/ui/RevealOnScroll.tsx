'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { fadeUp, fadeIn, scaleIn, slideLeft, reducedVariants } from '@/lib/animation-variants';
import type { Variants } from 'framer-motion';

interface RevealOnScrollProps {
  children:   React.ReactNode;
  variant?:   'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideLeft';
  delay?:     number;
  className?: string;
  once?:      boolean;
}

const variantMap: Record<NonNullable<RevealOnScrollProps['variant']>, Variants> = {
  fadeUp,
  fadeIn,
  scaleIn,
  slideLeft,
};

export default function RevealOnScroll({
  children,
  variant  = 'fadeUp',
  delay    = 0,
  className,
  once     = true,
}: RevealOnScrollProps) {
  const reduced = useReducedMotion();
  const selected = reduced ? reducedVariants : variantMap[variant];

  return (
    <motion.div
      variants={selected}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
