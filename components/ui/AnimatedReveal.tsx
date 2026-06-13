'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface AnimatedRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li';
}

export function AnimatedReveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: AnimatedRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();

  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/* Stagger container â€” wraps children and reveals them one by one */
interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  childClassName?: string;
}

export function StaggerReveal({
  children,
  className = '',
  staggerDelay = 0.08,
  childClassName = '',
}: StaggerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: staggerDelay },
    },
  };

  const item = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
      },
    },
  };

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={className}
    >
      {childrenArray.map((child, i) => (
        <motion.div key={i} variants={item} className={childClassName}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
