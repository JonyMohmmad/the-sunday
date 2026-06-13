import type { Variants } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
  },
};

const emptyVariants: Variants = {
  hidden: {},
  visible: {},
};

export function useMotionVariants() {
  const reduced = useReducedMotion();
  return {
    fadeUp: reduced ? emptyVariants : fadeUp,
    fadeIn: reduced ? emptyVariants : fadeIn,
    staggerContainer: reduced ? emptyVariants : staggerContainer,
    slideLeft: reduced ? emptyVariants : slideLeft,
    slideRight: reduced ? emptyVariants : slideRight,
  };
}
