'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

interface TestimonialData {
  quote: string;
  author: string;
  role: string;
  initials: string;
}

function TestimonialCard({ quote, author, role, initials }: TestimonialData) {
  return (
    <div
      className="flex flex-col gap-4 p-6 h-full"
      style={{ background: '#141416', border: '1px solid #232327', borderRadius: 12 }}
    >
      {/* Stars */}
      <div className="flex gap-0.5" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-[#CCFF00] text-sm" aria-hidden="true">
            ★
          </span>
        ))}
      </div>

      {/* Decorative opening quote mark */}
      <div
        className="text-[48px] leading-none font-display font-bold text-[#CCFF00] select-none -mb-3"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Quote body */}
      <p className="text-[15px] text-[#FAFAFA] leading-relaxed flex-1">{quote}</p>

      {/* Author info */}
      <div className="flex items-center gap-3 mt-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0"
          style={{ background: '#232327', color: '#CCFF00' }}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div>
          <p className="text-sm font-bold font-display text-[#FAFAFA]">{author}</p>
          <p className="text-[13px] text-[#A1A1AA]">{role}</p>
        </div>
      </div>
    </div>
  );
}

// TODO: replace with real client quotes
const testimonials: TestimonialData[] = [
  // TODO: replace with verbatim client approval
  {
    quote:
      'Working with [COMPANY_NAME] transformed our drop pages. Our last Nike collab sold out in 4 minutes — the redesigned PDP handled the traffic spike without a single glitch.',
    author: 'Jordan M.',
    role: 'Founder, Nocta Collective',
    initials: 'JM',
  },
  // TODO: replace with verbatim client approval
  {
    quote:
      'Our anime merch store was leaking money at checkout. After the CRO audit and rebuild, we cut abandonment by 28 points. Best investment we made this year.',
    author: 'Priya K.',
    role: 'Head of Ecom, Akira Drop',
    initials: 'PK',
  },
  // TODO: replace with verbatim client approval
  {
    quote:
      'They understand streetwear culture — not just code. The new mobile experience feels native to how our customers shop.',
    author: 'Damien R.',
    role: 'COO, Void Supply Co',
    initials: 'DR',
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32"
      style={{ background: '#0A0A0B' }}
      aria-labelledby="testimonials-heading"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2
            id="testimonials-heading"
            className="font-display text-4xl lg:text-5xl font-bold text-[#FAFAFA] tracking-tight leading-none"
          >
            What clients say
          </h2>
          <p className="text-[#A1A1AA] mt-3 text-base">
            From the brands we&apos;ve worked with.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <TestimonialCard {...t} />
            </motion.div>
          ))}

          {/* Video testimonial — spans all 3 columns as featured item */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="lg:col-span-3"
          >
            {/* TODO: replace href with real Loom or YouTube embed URL */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6"
              style={{ background: '#141416', border: '1px solid #232327', borderRadius: 12 }}
            >
              {/* 16:9 video placeholder */}
              <div
                className="relative w-full flex items-center justify-center mb-4"
                style={{
                  aspectRatio: '16/9',
                  background: '#1a1a1c',
                  border: '1px solid #232327',
                  borderRadius: 8,
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: '#CCFF00' }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M6 4L16 10L6 16V4Z" fill="#0A0A0B" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-[#A1A1AA]">
                Watch: [Client Name] on their results
              </p>
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
