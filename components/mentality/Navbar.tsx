'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SITE } from '@/lib/site';
import ThemeToggle from '@/components/ui/ThemeToggle';

/** Geometric four-petal clover / flower mark. */
function CloverMark() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="currentColor" style={{ color: 'var(--text)' }} aria-hidden="true">
      <circle cx="12" cy="6.5" r="5" />
      <circle cx="12" cy="17.5" r="5" />
      <circle cx="6.5" cy="12" r="5" />
      <circle cx="17.5" cy="12" r="5" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 py-6 md:py-10 backdrop-blur-[2px]"
      style={{ background: 'linear-gradient(to bottom, var(--nav-fade), transparent)' }}
    >
      <nav className="grid grid-cols-12 items-center max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Left — brand (cols 1–3) */}
        <Link href="/" className="col-span-6 md:col-span-3 flex items-center gap-2" aria-label={`${SITE.brand} home`}>
          <CloverMark />
          <span className="font-display text-xl md:text-2xl font-semibold tracking-tight" style={{ color: 'var(--text)' }}>
            {SITE.brand}
          </span>
        </Link>

        {/* Center — desktop links (cols 4–9) */}
        <div className="hidden md:flex col-span-6 md:col-start-4 items-center justify-center gap-8">
          {SITE.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm lowercase opacity-70 hover:opacity-100 transition-opacity duration-200"
              style={{ color: 'var(--text)' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right — actions (cols 10–12) */}
        <div className="col-span-6 md:col-span-3 md:col-start-10 flex items-center justify-end gap-3 md:gap-4">
          <a
            href="#faq"
            className="hidden sm:inline text-sm lowercase opacity-70 hover:opacity-100 transition-opacity duration-200"
            style={{ color: 'var(--text)' }}
          >
            find help
          </a>

          <ThemeToggle />

          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm rounded-full px-4 py-2 hover:opacity-90 transition-opacity duration-200"
            style={{ background: 'var(--text)', color: 'var(--bg)' }}
          >
            get started <span aria-hidden="true">→</span>
          </a>

          {/* Animated hamburger (mobile) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
          >
            <motion.span
              className="block h-[2px] w-5 rounded-full"
              style={{ background: 'var(--text)' }}
              animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            />
            <motion.span
              className="block h-[2px] w-5 rounded-full"
              style={{ background: 'var(--text)' }}
              animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="md:hidden overflow-hidden mt-4"
          >
            <div className="max-w-7xl mx-auto px-6 flex flex-col gap-1 pb-2">
              {SITE.nav.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                  onClick={() => setOpen(false)}
                  className="text-base lowercase opacity-80 hover:opacity-100 py-2 border-b"
                  style={{ color: 'var(--text)', borderColor: 'var(--border)' }}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href={SITE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-1.5 text-sm rounded-full px-4 py-2.5"
                style={{ background: 'var(--text)', color: 'var(--bg)' }}
              >
                get started <span aria-hidden="true">→</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
