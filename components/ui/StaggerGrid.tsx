'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { fadeUp, reducedVariants } from '@/lib/animation-variants';

interface StaggerGridProps {
  children:   React.ReactNode;
  className?: string;
  stagger?:   number;
  delay?:     number;
}

export default function StaggerGrid({
  children,
  className,
  stagger = 0.1,
  delay   = 0,
}: StaggerGridProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden:  {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div key={i} variants={reduced ? reducedVariants : fadeUp}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
