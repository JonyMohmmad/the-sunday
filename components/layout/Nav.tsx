'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { SITE } from '@/lib/site';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group" aria-label={`${SITE.brand} home`}>
      <span
        className="flex items-center justify-center w-7 h-7 rounded-lg text-white font-bold text-sm transition-transform duration-200 group-hover:scale-110"
        style={{ background: 'var(--primary)' }}
        aria-hidden="true"
      >
        L
      </span>
      <span
        className="text-lg font-bold tracking-tight"
        style={{ color: 'var(--text)', fontFamily: 'var(--font-sans)' }}
      >
        {SITE.brand}
      </span>
    </Link>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60);
  });

  return (
    <>
      <motion.header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 0.2s ease, border-color 0.2s ease, backdrop-filter 0.2s ease',
          background: scrolled ? 'rgba(8,11,20,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Logo />

            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {SITE.nav.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm transition-colors duration-150 hover:text-[var(--text)] focus-visible:text-[var(--text)] outline-none"
                  style={{ color: 'var(--text-2)' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a
                href={SITE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors duration-150 px-3 py-1.5 hover:text-[var(--text)] outline-none"
                style={{ color: 'var(--text-2)' }}
              >
                Contact
              </a>
              <motion.a
                href={SITE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-shadow duration-150"
                style={{ background: 'var(--cta)' }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 24px rgba(223,2,3,0.4)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
              >
                {SITE.bookingLabel} →
              </motion.a>
            </div>

            <button
              className="md:hidden p-2 rounded-lg transition-colors duration-150"
              style={{ color: 'var(--text-2)' }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed left-0 right-0 z-40 md:hidden overflow-hidden"
            style={{
              top: 64,
              background: 'rgba(8,11,20,0.97)',
              borderBottom: '1px solid var(--border)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <nav className="flex flex-col px-4 py-6 gap-1" aria-label="Mobile navigation">
              {SITE.nav.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="py-3 px-3 text-base rounded-lg transition-colors duration-150"
                  style={{ color: 'var(--text-2)' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href={SITE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 mt-4 text-sm font-semibold text-center rounded-xl text-white"
                style={{ background: 'var(--cta)' }}
                onClick={() => setMenuOpen(false)}
              >
                {SITE.bookingLabel} →
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
