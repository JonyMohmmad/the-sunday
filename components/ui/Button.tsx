'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

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
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const variants = {
  primary:
    'bg-accent text-[#0A0A0B] font-semibold hover:bg-[#d4ff1a] active:scale-95',
  ghost:
    'border border-[#232327] text-primary font-medium hover:border-accent hover:text-accent',
};

export function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  target,
  rel,
  type = 'button',
}: ButtonProps) {
  const base = `inline-flex items-center gap-2 rounded-lg transition-all duration-150 ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('//');
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
        <Link
          href={href}
          className={base}
          target={target ?? (isExternal ? '_blank' : undefined)}
          rel={rel ?? (isExternal ? 'noopener noreferrer' : undefined)}
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
