'use client';

import { motion } from 'framer-motion';
import { CTA } from '@/lib/cta-config';
import { Events } from '@/lib/analytics-events';
import MagneticButton from '@/components/ui/MagneticButton';

interface DualCTAProps {
  source:         string;
  primaryLabel?:  string;
  secondaryLabel?: string;
  size?:          'lg' | 'md' | 'sm';
  onAuditClick?:  () => void;
  className?:     string;
  isLoading?:     boolean;
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

function Spinner() {
  return (
    <span style={{
      display: 'inline-block',
      width: 16, height: 16,
      border: '2px solid rgba(0,0,0,0.3)',
      borderTopColor: '#FFFFFF',
      borderRadius: '50%',
      animation: 'spin 0.7s linear infinite',
    }} />
  );
}

export function DualCTA({
  source,
  primaryLabel,
  secondaryLabel,
  size = 'md',
  onAuditClick,
  className,
  isLoading = false,
}: DualCTAProps) {
  const hClass = heights[size];

  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div className={`flex flex-col md:flex-row gap-3 md:items-start ${className ?? ''}`}>

        {/* Primary CTA */}
        <div className="flex flex-col items-center gap-1.5 w-full md:w-auto">
          <MagneticButton strength={0.3}>
            <motion.a
              href={CTA.utmLink(source)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => Events.bookCallClicked(source)}
              className={`cursor-cta inline-flex items-center justify-center gap-2 font-display font-semibold rounded-[6px] w-full md:w-auto transition-[background-color] duration-150 ${hClass}`}
              style={{
                background: '#CCFF00',
                color: '#FFFFFF',
                pointerEvents: isLoading ? 'none' : 'auto',
              }}
              whileHover="iconHover"
              whileTap={{ transform: 'scale(0.97)' }}
              transition={{ type: 'spring', duration: 0.15, bounce: 0 }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#d4ff33')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#CCFF00')}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <motion.span
                    variants={{ iconHover: { x: 2, y: -1 } }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'inline-flex' }}
                  >
                    <CalIcon />
                  </motion.span>
                  {primaryLabel ?? CTA.PRIMARY_LABEL}
                </>
              )}
            </motion.a>
          </MagneticButton>
          <span className="text-[11px] text-[#71717A] text-center">{CTA.PRIMARY_SUBLABEL}</span>
        </div>

        {/* Secondary CTA */}
        <div className="flex flex-col items-center gap-1.5 w-full md:w-auto">
          <MagneticButton strength={0.2}>
            <motion.button
              type="button"
              onClick={() => { Events.auditFormSubmitted(source); onAuditClick?.(); }}
              className={`inline-flex items-center justify-center gap-2 font-display font-medium rounded-[6px] w-full md:w-auto ${hClass} transition-[background-color,border-color] duration-150`}
              style={{ background: 'transparent', border: '1px solid #E4E4E7', color: '#3F3F46' }}
              whileTap={{ transform: 'scale(0.97)' }}
              transition={{ type: 'spring', duration: 0.15, bounce: 0 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F7F7F8';
                e.currentTarget.style.borderColor = '#71717A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = '#E4E4E7';
              }}
            >
              <motion.span
                variants={{ iconHover: { x: -1 } }}
                transition={{ duration: 0.2 }}
                style={{ display: 'inline-flex' }}
              >
                <AuditIcon />
              </motion.span>
              {secondaryLabel ?? CTA.SECONDARY_LABEL}
            </motion.button>
          </MagneticButton>
          <span className="text-[11px] text-[#71717A] text-center">{CTA.SECONDARY_SUBLABEL}</span>
        </div>

      </div>
    </>
  );
}
