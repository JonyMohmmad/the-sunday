'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { COPY } from '@/lib/copy';
import { CTA } from '@/lib/cta-config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Work',    href: '#work',    sectionId: 'work'    },
  { label: 'Process', href: '#process', sectionId: 'process' },
  { label: 'Pricing', href: '#pricing', sectionId: 'pricing' },
  { label: 'Team',    href: '#team',    sectionId: 'team'    },
  { label: 'FAQ',     href: '#faq',     sectionId: 'faq'     },
  { label: 'Blog',    href: '/blog',    sectionId: ''        },
];

const SCALLOP_PATH =
  'M0,0 H1440 V10 Q1422,20 1404,10 Q1386,0 1368,10 Q1350,20 1332,10 Q1314,0 1296,10 Q1278,20 1260,10 Q1242,0 1224,10 Q1206,20 1188,10 Q1170,0 1152,10 Q1134,20 1116,10 Q1098,0 1080,10 Q1062,20 1044,10 Q1026,0 1008,10 Q990,20 972,10 Q954,0 936,10 Q918,20 900,10 Q882,0 864,10 Q846,20 828,10 Q810,0 792,10 Q774,20 756,10 Q738,0 720,10 Q702,20 684,10 Q666,0 648,10 Q630,20 612,10 Q594,0 576,10 Q558,20 540,10 Q522,0 504,10 Q486,20 468,10 Q450,0 432,10 Q414,20 396,10 Q378,0 360,10 Q342,20 324,10 Q306,0 288,10 Q270,20 252,10 Q234,0 216,10 Q198,20 180,10 Q162,0 144,10 Q126,20 108,10 Q90,0 72,10 Q54,20 36,10 Q18,0 0,10 L0,0 Z';

export default function Nav() {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isHidden, setIsHidden]         = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const reduced   = useReducedMotion();
  const lastScrollY = useRef(0);
  const pathname  = usePathname();

  // Body overflow lock when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Scroll-based section detection
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    links.forEach(({ sectionId }) => {
      if (!sectionId) return;
      const el = document.getElementById(sectionId);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(sectionId); },
        { threshold: 0.25, rootMargin: '-5% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Hide on scroll down / show on scroll up + blur background
  useEffect(() => {
    const handler = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);
      if (currentY > 80) {
        setIsHidden(currentY > lastScrollY.current);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        animate={{ y: isHidden && !menuOpen ? '-100%' : '0%' }}
        transition={reduced ? { duration: 0 } : { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          background: scrolled ? 'rgba(59,63,228,0.92)' : '#3B3FE4',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        <Container>
          <nav
            className="flex h-16 items-center justify-between"
            aria-label="Main navigation"
          >
            {/* Wordmark */}
            <Link
              href="/"
              className="font-display text-lg font-bold tracking-tight text-white hover:text-white/90 transition-colors duration-150"
              aria-label="The Sunday — Home"
              style={{ fontWeight: 700 }}
            >
              <>The Sunda<span style={{ color: '#CCFF00' }}>y</span></>
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-8" role="list">
              {links.map((link) => {
                const active = link.sectionId
                  ? activeSection === link.sectionId
                  : pathname === link.href;
                const isPage = !link.sectionId;
                const linkClass = `relative text-sm transition-colors duration-150 group ${
                  active ? 'text-white font-semibold' : 'text-white/75 hover:text-white'
                }`;
                const underline = (
                  <span
                    aria-hidden="true"
                    className="nav-underline"
                    data-active={active ? 'true' : undefined}
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: '#CCFF00',
                      clipPath: active ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                      transition: 'clip-path 200ms cubic-bezier(0.23,1,0.32,1)',
                    }}
                  />
                );
                return (
                  <li key={link.href}>
                    {isPage ? (
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                        {underline}
                      </Link>
                    ) : (
                      <a href={link.href} className={linkClass}>
                        {link.label}
                        {underline}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <a
                href={CTA.utmLink('nav')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-150 hover:brightness-105"
                style={{ background: '#CCFF00', color: '#FFFFFF' }}
              >
                {COPY.nav.cta}
              </a>
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
                transition={{ duration: reduced ? 0 : 0.2 }}
                className="block w-5 h-px bg-white origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
                className="block w-5 h-px bg-white"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
                className="block w-5 h-px bg-white origin-center"
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
            <path d={SCALLOP_PATH} fill="#3B3FE4" />
          </svg>
        </div>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center"
            style={{ background: '#FFFFFF' }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <nav>
              <ul className="flex flex-col items-center gap-8" role="list">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={reduced ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {link.sectionId ? (
                      <a
                        href={link.href}
                        onClick={closeMenu}
                        className="font-display text-4xl font-bold text-[#3F3F46] hover:text-[#CCFF00] transition-colors duration-150"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="font-display text-4xl font-bold text-[#3F3F46] hover:text-[#CCFF00] transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
                <motion.li
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: links.length * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4"
                >
                  <a
                    href={CTA.utmLink('nav_mobile')}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold"
                    style={{ background: '#CCFF00', color: '#FFFFFF' }}
                  >
                    {COPY.nav.cta}
                  </a>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
