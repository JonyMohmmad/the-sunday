'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CTA } from '@/lib/cta-config';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="#CCFF00" fillOpacity={0.12} />
      <path d="M5 8l2.5 2.5L11 5.5" stroke="#CCFF00" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AuditModal({ isOpen, onClose }: AuditModalProps) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: POST form data to CTA.AUDIT_FORM_ACTION when configured
    setSubmitted(true);
  }

  const inputClass =
    'w-full h-[44px] px-3 rounded-[6px] text-sm text-[#FAFAFA] placeholder-[#A1A1AA] outline-none transition-shadow duration-150 focus:ring-1 focus:ring-[#CCFF00]';
  const inputStyle = { background: '#0A0A0B', border: '1px solid #232327' };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-labelledby="audit-modal-heading"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-[480px] rounded-2xl p-10"
            style={{ background: '#141416', border: '1px solid #232327' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-md text-[#A1A1AA] transition-colors duration-150"
              style={{ background: 'transparent' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#232327')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Ã—
            </button>

            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <span className="text-[#CCFF00] text-5xl">âœ“</span>
                <p className="font-display text-xl font-bold text-[#FAFAFA]">
                  We&apos;ve got your store!
                </p>
                <p className="text-sm text-[#A1A1AA]">Check your inbox within 48 hours.</p>
              </div>
            ) : (
              <>
                {/* Header */}
                <h2
                  id="audit-modal-heading"
                  className="font-display text-2xl font-bold text-[#FAFAFA] mb-2"
                >
                  Get your free store audit
                </h2>
                <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                  We&apos;ll review your Shopify store&apos;s CRO, speed, and mobile UX â€” then send you
                  a loom walkthrough within 48 hours. No strings attached.
                </p>

                {/* What you get */}
                <ul className="flex flex-col gap-2.5 mb-6">
                  {[
                    'Full CRO audit of your homepage, PDP, and checkout',
                    'Lighthouse performance score + top 3 speed fixes',
                    'Personalised Loom walkthrough (10â€“15 min)',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#FAFAFA]">
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  action={CTA.AUDIT_FORM_ACTION}
                  method="POST"
                  className="flex flex-col gap-3"
                >
                  <input
                    name="store_url"
                    type="url"
                    required
                    placeholder="Your Shopify store URL"
                    className={inputClass}
                    style={inputStyle}
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Your email address"
                    className={inputClass}
                    style={inputStyle}
                  />
                  <select
                    name="monthly_revenue"
                    className={`${inputClass} cursor-pointer`}
                    style={{ ...inputStyle, appearance: 'none' }}
                    defaultValue=""
                  >
                    <option value="" disabled>Monthly revenue (optional)</option>
                    <option value="under_10k">Under $10K / month</option>
                    <option value="10k_50k">$10K â€“ $50K / month</option>
                    <option value="50k_200k">$50K â€“ $200K / month</option>
                    <option value="200k_plus">$200K+ / month</option>
                  </select>

                  <button
                    type="submit"
                    className="w-full h-12 font-display font-semibold text-[#0A0A0B] rounded-[6px] mt-1 transition-[transform,background-color] duration-150 ease-out active:scale-[0.97]"
                    style={{ background: '#CCFF00' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#d4ff33')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#CCFF00')}
                  >
                    Send my store for review â†’
                  </button>
                </form>

                <p className="text-[11px] text-[#A1A1AA] text-center mt-4">
                  We never share your data. Unsubscribe anytime.
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
