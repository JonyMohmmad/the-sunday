// lib/animation-variants.ts
import type { Variants } from "framer-motion";

// Strong ease-out — instant start, smooth settle
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.45, ease: EASE_OUT }
  },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1,
    transition: { duration: 0.35, ease: EASE_OUT }
  },
};

export const staggerContainer: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 }
  },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1,
    transition: { duration: 0.3, ease: [0.34, 1.2, 0.64, 1] }
  },
};

export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.4, ease: EASE_OUT }
  },
};

export const reducedVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

export function getVariants(
  preferredVariant: Variants,
  isReduced: boolean
): Variants {
  return isReduced ? reducedVariants : preferredVariant;
}
