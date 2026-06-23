import type { Metadata } from 'next';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/sections/ContactForm';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Lumora Studio. Send us a message or book a free 30-minute call to '
    + 'talk through your website, growth, AI, or security project.',
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 120 }}>
        <section className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#93c5fd' }}>
                Contact
              </p>
              <h1
                className="font-bold tracking-tight mb-4"
                style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.05 }}
              >
                Let’s talk about your project.
              </h1>
              <p className="text-[18px] leading-relaxed mx-auto" style={{ color: 'var(--text-2)', maxWidth: 520 }}>
                Tell us what you’re working on and we’ll get back to you. Prefer a call?{' '}
                <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="font-semibold" style={{ color: '#93c5fd' }}>
                  Book a free 30-minute call
                </a>
                .
              </p>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
