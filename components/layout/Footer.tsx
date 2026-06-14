'use client';

import Link from 'next/link';
import { SITE } from '@/lib/site';

const footerLinks = {
  Services: [
    { label: 'Business Websites', href: '/#services' },
    { label: 'E-commerce Stores', href: '/#services' },
    { label: 'Web Apps & SaaS', href: '/#services' },
    { label: 'SEO & Care Plans', href: '/#services' },
  ],
  Studio: [
    { label: 'Work', href: '/work' },
    { label: 'Process', href: '/process' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
  ],
  Company: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Book a call', href: SITE.bookingUrl },
    { label: 'Contact', href: `mailto:${SITE.email}` },
  ],
};

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative z-10"
      style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 mb-12">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="flex items-center justify-center w-7 h-7 rounded-lg text-white font-bold text-sm"
                style={{ background: 'var(--primary)' }}
                aria-hidden="true"
              >
                L
              </span>
              <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--text)' }}>
                {SITE.brand}
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>
              {SITE.tagline} {SITE.location}.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="text-sm font-medium transition-colors duration-150 hover:text-[var(--text)]"
              style={{ color: 'var(--text-2)' }}
            >
              {SITE.email}
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: 'var(--text-3)' }}
                >
                  {category}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors duration-150 hover:text-[var(--text)]"
                        style={{ color: 'var(--text-2)' }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>
            © {new Date().getFullYear()} {SITE.brand}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: <XIcon />, label: 'X / Twitter', href: SITE.social.twitter },
              { icon: <InstagramIcon />, label: 'Instagram', href: SITE.social.instagram },
              { icon: <LinkedinIcon />, label: 'LinkedIn', href: SITE.social.linkedin },
            ].map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-colors duration-150 hover:text-[var(--text-2)]"
                style={{ color: 'var(--text-3)' }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
