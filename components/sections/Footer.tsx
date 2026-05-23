import { Container } from '@/components/ui/Container';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#232327] py-10 relative z-10" role="contentinfo">
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          {/* Wordmark + tagline */}
          <div>
            <Link
              href="/"
              className="font-display text-base font-bold text-primary hover:text-accent transition-colors duration-150"
              aria-label="[COMPANY_NAME] — Home"
            >
              [COMPANY_NAME]
            </Link>
            <p className="text-xs text-muted mt-1">
              Shopify conversion redesigns for fashion DTC brands.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-6" role="list">
              {/* TODO: Replace # with real social profile links */}
              <li>
                <a
                  href="mailto:hello@[DOMAIN]"
                  className="text-xs text-muted hover:text-primary transition-colors duration-150"
                  aria-label="Email us"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted hover:text-primary transition-colors duration-150"
                  aria-label="Instagram (opens in new tab)"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted hover:text-primary transition-colors duration-150"
                  aria-label="X / Twitter (opens in new tab)"
                >
                  X
                </a>
              </li>
            </ul>
          </nav>

        </div>

        <div className="mt-8 pt-6 border-t border-[#232327] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} [COMPANY_NAME]. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Built by engineers, for brands that move fast.
          </p>
        </div>
      </Container>
    </footer>
  );
}
