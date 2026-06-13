'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const sizeMap = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

const variantMap = {
  primary:
    'bg-primary text-white font-semibold rounded-xl hover:brightness-110 transition-[filter,box-shadow] duration-150',
  ghost:
    'border text-sm font-medium rounded-xl transition-[border-color,color] duration-150',
};

export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  target,
  rel,
  type = 'button',
  disabled,
}: ButtonProps) {
  const ghostStyle =
    variant === 'ghost'
      ? { borderColor: 'var(--border)', color: 'var(--text-2)' }
      : {};

  const base = `inline-flex items-center gap-2 ${sizeMap[size]} ${variantMap[variant]} ${className}`;

  const motionProps = {
    whileHover: { y: -2, scale: 1.02 },
    whileTap:   { scale: 0.98 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link
          href={href}
          className={base}
          style={ghostStyle}
          target={target}
          rel={rel}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={base}
      style={ghostStyle}
      disabled={disabled}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
