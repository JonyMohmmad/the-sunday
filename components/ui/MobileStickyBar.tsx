'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CTA } from '@/lib/cta-config';

interface MobileStickyBarProps {
  onAuditClick: () => void;
}

export function MobileStickyBar({ onAuditClick }: MobileStickyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      if (y > 400) setVisible(true);
      else if (y < 100) setVisible(false);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="md:hidden">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-40 flex gap-2 px-4 py-3"
            style={{ background: '#141416', borderTop: '1px solid #232327' }}
          >
            <a
              href={CTA.utmLink('mobile_sticky')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center h-11 rounded-[6px] font-display font-semibold text-sm text-[#0A0A0B]"
              style={{ background: '#CCFF00' }}
            >
              Book a call
            </a>
            <button
              type="button"
              onClick={onAuditClick}
              className="flex-1 flex items-center justify-center h-11 rounded-[6px] font-display font-medium text-sm text-[#FAFAFA]"
              style={{ background: '#232327' }}
            >
              Free audit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
