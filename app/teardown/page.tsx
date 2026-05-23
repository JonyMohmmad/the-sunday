'use client';

import { useState } from 'react';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function TeardownPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 min-h-screen">
        <Container>
          <div className="max-w-xl mx-auto">
            {/* Eyebrow */}
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-accent" />
              Free · No commitment
            </p>

            <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-none mb-4">
              Get a free<br />
              <span className="text-accent">store teardown.</span>
            </h1>
            <p className="text-muted text-lg leading-relaxed mb-10">
              Share your store URL and we'll send you a loom walkthrough of exactly what's killing your conversion — for free, within 48 hours.
            </p>

            {submitted ? (
              <div className="border border-accent/30 bg-accent/5 rounded-xl p-8 text-center">
                <div className="text-accent text-3xl mb-3">✓</div>
                <h2 className="font-display text-xl font-bold text-primary mb-2">Got it — we'll be in touch.</h2>
                <p className="text-muted text-sm">Expect your teardown loom within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-semibold text-muted uppercase tracking-widest">
                      Your name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Alex Chen"
                      className="bg-surface border border-[#232327] rounded-lg px-4 py-3 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors duration-150"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-semibold text-muted uppercase tracking-widest">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="alex@yourbrand.com"
                      className="bg-surface border border-[#232327] rounded-lg px-4 py-3 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors duration-150"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="store" className="text-xs font-semibold text-muted uppercase tracking-widest">
                    Shopify store URL
                  </label>
                  <input
                    id="store"
                    name="store"
                    type="url"
                    required
                    placeholder="https://yourbrand.myshopify.com"
                    className="bg-surface border border-[#232327] rounded-lg px-4 py-3 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors duration-150"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="revenue" className="text-xs font-semibold text-muted uppercase tracking-widest">
                    Monthly revenue range
                  </label>
                  <select
                    id="revenue"
                    name="revenue"
                    required
                    className="bg-surface border border-[#232327] rounded-lg px-4 py-3 text-sm text-primary focus:outline-none focus:border-accent/60 transition-colors duration-150 appearance-none"
                  >
                    <option value="" disabled selected>Select range</option>
                    <option value="under-5k">Under $5k / mo</option>
                    <option value="5k-20k">$5k – $20k / mo</option>
                    <option value="20k-50k">$20k – $50k / mo</option>
                    <option value="50k-plus">$50k+ / mo</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-semibold text-muted uppercase tracking-widest">
                    What's your biggest conversion problem? (optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="e.g. High add-to-cart but terrible checkout rate, slow mobile load..."
                    className="bg-surface border border-[#232327] rounded-lg px-4 py-3 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors duration-150 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" size="lg">
                    Send my store for a teardown →
                  </Button>
                </div>

                <p className="text-xs text-muted">
                  No spam. No sales call required. Just a honest Loom breakdown of your store.
                </p>
              </form>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
