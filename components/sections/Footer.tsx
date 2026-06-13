import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { COPY } from '@/lib/copy';

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="py-10"
      style={{ background: '#FFFFFF', borderTop: '1px solid #E4E4E7' }}
    >
      <Container>
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-8">

          {/* Wordmark + tagline + scarcity note */}
          <div className="max-w-xs">
            <Link
              href="/"
              className="font-display text-base font-bold text-[#3F3F46] hover:text-white/80 transition-colors duration-150"
              aria-label="The Sunday — Home"
              style={{ fontWeight: 700 }}
            >
              The Sunda<span style={{ color: '#CCFF00' }}>y</span>
            </Link>
            <p className="text-[14px] text-[#71717A] mt-1">{COPY.footer.tagline}</p>
            <p className="text-[12px] text-[#71717A] italic mt-3 leading-relaxed">
              {COPY.footer.note}
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-6" role="list">
              <li>
                {/* TODO: replace with real email before launch */}
                <a
                  href={`mailto:${COPY.footer.email}`}
                  className="text-xs text-[#71717A] hover:text-[#3F3F46] transition-colors duration-150"
                  aria-label="Email us"
                >
                  Email
                </a>
              </li>
              <li>
                {/* TODO: replace with real Instagram URL */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#71717A] hover:text-[#3F3F46] transition-colors duration-150"
                  aria-label="Instagram (opens in new tab)"
                >
                  Instagram
                </a>
              </li>
              <li>
                {/* TODO: replace with real X/Twitter URL */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#71717A] hover:text-[#3F3F46] transition-colors duration-150"
                  aria-label="X / Twitter (opens in new tab)"
                >
                  X
                </a>
              </li>
            </ul>
          </nav>

        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
          style={{ borderTop: '1px solid #E4E4E7' }}
        >
          <p className="text-xs text-[#71717A]">
            © {new Date().getFullYear()} The Sunday. All rights reserved.
          </p>
          <p className="text-xs text-[#71717A]">
            Shopify CRO · DTC fashion brands · US · UK · AU · CA
          </p>
        </div>
      </Container>
    </footer>
  );
}
