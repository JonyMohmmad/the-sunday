'use client';

import { motion } from 'framer-motion';
import { CTA } from '@/lib/cta-config';

interface DualCTAProps {
  source: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  size?: 'lg' | 'md' | 'sm';
  onAuditClick?: () => void;
  className?: string;
}

const heights: Record<NonNullable<DualCTAProps['size']>, string> = {
  lg: 'h-[52px] px-6 text-base',
  md: 'h-[44px] px-5 text-sm',
  sm: 'h-[36px] px-4 text-xs',
};

function CalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AuditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DualCTA({
  source,
  primaryLabel,
  secondaryLabel,
  size = 'md',
  onAuditClick,
  className,
}: DualCTAProps) {
  const hClass = heights[size];

  return (
    <div
      className={`flex flex-col md:flex-row gap-3 md:items-start ${className ?? ''}`}
    >
      {/* Primary CTA */}
      <div className="flex flex-col items-center gap-1.5 w-full md:w-auto">
        <motion.a
          href={CTA.utmLink(source)}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400 }}
          className={`inline-flex items-center justify-center gap-2 font-display font-semibold rounded-[6px] w-full md:w-auto ${hClass}`}
          style={{ background: '#CCFF00', color: '#0A0A0B' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#d4ff33')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#CCFF00')}
        >
          <CalIcon />
          {primaryLabel ?? CTA.PRIMARY_LABEL}
        </motion.a>
        <span className="text-[11px] text-[#A1A1AA] text-center">{CTA.PRIMARY_SUBLABEL}</span>
      </div>

      {/* Secondary CTA */}
      <div className="flex flex-col items-center gap-1.5 w-full md:w-auto">
        <motion.button
          type="button"
          onClick={onAuditClick}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400 }}
          className={`inline-flex items-center justify-center gap-2 font-display font-medium rounded-[6px] w-full md:w-auto ${hClass} transition-colors duration-150`}
          style={{ background: 'transparent', border: '1px solid #232327', color: '#09090B' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#A1A1AA';
            e.currentTarget.style.background = '#141416';
            e.currentTarget.style.color = '#FAFAFA';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#232327';
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#09090B';
          }}
        >
          <AuditIcon />
          {secondaryLabel ?? CTA.SECONDARY_LABEL}
        </motion.button>
        <span className="text-[11px] text-[#A1A1AA] text-center">{CTA.SECONDARY_SUBLABEL}</span>
      </div>
    </div>
  );
}
