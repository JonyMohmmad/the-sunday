'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SESSION_KEY = 'audit_banner_dismissed';

export function ScrollDepthBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    function onScroll() {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled >= 0.6) setVisible(true);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function dismiss() {
    sessionStorage.setItem(SESSION_KEY, '1');
    setVisible(false);
  }

  function claimAudit() {
    dismiss();
    window.dispatchEvent(new Event('openAuditModal'));
  }

  return (
    <div className="hidden md:block">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.08 }}
            className="fixed top-0 left-0 right-0 z-45 flex items-center justify-center gap-4 h-12"
            style={{
              background: '#0f1a00',
              borderBottom: '1px solid rgba(204,255,0,0.3)',
              zIndex: 45,
            }}
          >
            <div className="flex items-center gap-2 text-[13px] text-[#FAFAFA]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="4.5" stroke="#CCFF00" strokeWidth="1.5" />
                <path d="M10.5 10.5L14 14" stroke="#CCFF00" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Want us to review your store for free?
            </div>

            <button
              type="button"
              onClick={claimAudit}
              className="text-[12px] text-[#CCFF00] h-7 px-3 rounded-[4px] transition-colors duration-150"
              style={{ background: 'transparent', border: '1px solid #CCFF00' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(204,255,0,0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Claim your free audit â†’
            </button>

            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss banner"
              className="absolute right-4 text-[#A1A1AA] text-lg leading-none hover:text-[#FAFAFA] transition-colors"
            >
              Ã—
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
