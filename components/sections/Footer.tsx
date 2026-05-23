import { Container } from '@/components/ui/Container';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#E4E4E7] py-10 bg-[#F7F7F8]" role="contentinfo">
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          {/* Wordmark + tagline */}
          <div>
            <Link
              href="/"
              className="font-display text-base font-bold text-primary hover:text-[#3B3FE4] transition-colors duration-150"
              aria-label="The Sunday — Home"
            >
              The Sunday
            </Link>
            <p className="text-xs text-muted mt-1">
              SaaS & web app studio for startups and growing businesses.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-6" role="list">
              <li>
                <a
                  href="mailto:hello@thesunday.studio"
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
                  aria-label="Twitter / X (opens in new tab)"
                >
                  X
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted hover:text-primary transition-colors duration-150"
                  aria-label="LinkedIn (opens in new tab)"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted hover:text-primary transition-colors duration-150"
                  aria-label="GitHub (opens in new tab)"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>

        </div>

        <div className="mt-8 pt-6 border-t border-[#E4E4E7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} The Sunday. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Engineering and design. Both. Under one roof.
          </p>
        </div>
      </Container>
    </footer>
  );
}
