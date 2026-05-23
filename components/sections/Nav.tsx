'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'border-b border-[#232327] bg-[#0A0A0B]/85 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <Container>
          <nav
            className="flex h-16 items-center justify-between"
            aria-label="Main navigation"
          >
            {/* Wordmark */}
            <Link
              href="/"
              className="font-display text-lg font-bold tracking-tight text-primary hover:text-accent transition-colors duration-150"
              aria-label="The Sunday — Home"
            >
              The Sunday
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-8" role="list">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button href="#contact" size="sm">
                Get a free teardown
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-[5px] z-50"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                className="block w-5 h-px bg-primary origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                className="block w-5 h-px bg-primary"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                className="block w-5 h-px bg-primary origin-center"
              />
            </button>
          </nav>
        </Container>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-[#0A0A0B] flex flex-col items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <nav>
              <ul className="flex flex-col items-center gap-8" role="list">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="font-display text-4xl font-bold text-primary hover:text-accent transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: links.length * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4"
                >
                  <Button href="#contact" size="lg" onClick={closeMenu}>
                    Get a free teardown
                  </Button>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
