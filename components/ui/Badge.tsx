import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'blue' | 'green' | 'amber';
  className?: string;
}

const variantStyles: Record<NonNullable<BadgeProps['variant']>, React.CSSProperties> = {
  default: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'var(--text-2)',
  },
  blue: {
    background: 'rgba(59,130,246,0.12)',
    border: '1px solid rgba(59,130,246,0.25)',
    color: '#93c5fd',
  },
  green: {
    background: 'rgba(34,197,94,0.12)',
    border: '1px solid rgba(34,197,94,0.25)',
    color: '#86efac',
  },
  amber: {
    background: 'rgba(245,158,11,0.12)',
    border: '1px solid rgba(245,158,11,0.25)',
    color: '#fcd34d',
  },
};

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${className}`}
      style={variantStyles[variant]}
    >
      {children}
    </span>
  );
}
