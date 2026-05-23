'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const links = [
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/process' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
];

const SCALLOP_PATH =
  'M0,0 H1440 V10 Q1422,20 1404,10 Q1386,0 1368,10 Q1350,20 1332,10 Q1314,0 1296,10 Q1278,20 1260,10 Q1242,0 1224,10 Q1206,20 1188,10 Q1170,0 1152,10 Q1134,20 1116,10 Q1098,0 1080,10 Q1062,20 1044,10 Q1026,0 1008,10 Q990,20 972,10 Q954,0 936,10 Q918,20 900,10 Q882,0 864,10 Q846,20 828,10 Q810,0 792,10 Q774,20 756,10 Q738,0 720,10 Q702,20 684,10 Q666,0 648,10 Q630,20 612,10 Q594,0 576,10 Q558,20 540,10 Q522,0 504,10 Q486,20 468,10 Q450,0 432,10 Q414,20 396,10 Q378,0 360,10 Q342,20 324,10 Q306,0 288,10 Q270,20 252,10 Q234,0 216,10 Q198,20 180,10 Q162,0 144,10 Q126,20 108,10 Q90,0 72,10 Q54,20 36,10 Q18,0 0,10 L0,0 Z';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#111113]">
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
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-sm transition-colors duration-150 ${
                        active ? 'text-accent font-semibold' : 'text-muted hover:text-primary'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button href="/teardown" size="sm">
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

        {/* Scalloped bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full pointer-events-none" style={{ height: 20 }}>
          <svg
            viewBox="0 0 1440 20"
            preserveAspectRatio="none"
            className="w-full h-full"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={SCALLOP_PATH} fill="#111113" />
          </svg>
        </div>
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
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="font-display text-4xl font-bold text-primary hover:text-accent transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: links.length * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4"
                >
                  <Button href="/teardown" size="lg" onClick={closeMenu}>
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
