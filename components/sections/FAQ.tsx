'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { AnimatedReveal } from '@/components/ui/AnimatedReveal';

const faqs = [
  {
    q: 'What tech stack do you build with?',
    a: 'Our default stack is Next.js (React), TypeScript, PostgreSQL, Prisma, and Tailwind — deployed on Vercel or AWS. We also work with Node.js APIs, Stripe billing, Auth.js, and standard third-party integrations. We pick the right tool for the job, not the trendy one.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'MVPs take 4 weeks. Full SaaS builds run 6–10 weeks depending on scope. We start every project with a clear spec and a timeline that doesn\'t change unless you change the scope. We have never missed a committed delivery date.',
  },
  {
    q: 'Do you work with early-stage startups or established businesses?',
    a: 'Both. Early-stage founders come to us for MVPs and first products. Established businesses hire us to build internal tools, replace expensive SaaS subscriptions, or extend their engineering team. The approach adapts; the quality doesn\'t.',
  },
  {
    q: 'Can you work with our existing codebase?',
    a: 'Yes. We do code audits before taking on existing projects. If the architecture is salvageable, we build on it. If it\'s fundamentally broken, we\'ll tell you honestly and explain why — before you sign anything.',
  },
  {
    q: 'What happens after the project launches?',
    a: 'Every project includes 30–60 days of post-launch support. After that, you can move to our Scale Retainer for ongoing development, or take the codebase in-house. We write clean, documented code specifically so you\'re never locked in.',
  },
  {
    q: 'Do you handle both design and development?',
    a: 'Yes — that\'s the whole point. Most studios either do design or dev. We do both in-house, which means fewer handoffs, faster decisions, and a product where the design actually works in the browser. Jony leads design; Tahsin leads architecture.',
  },
];

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="border-b border-[#E4E4E7]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group"
      >
        <span className="font-display font-bold text-primary text-base leading-snug group-hover:text-[#3B3FE4] transition-colors duration-150">
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-muted group-hover:text-[#3B3FE4] transition-colors duration-150 mt-0.5"
          aria-hidden="true"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-muted text-base leading-relaxed pb-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-white border-t border-[#E4E4E7]" aria-labelledby="faq-heading">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-12 lg:gap-20">

          <AnimatedReveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#3B3FE4] mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-[#3B3FE4]" />
              FAQ
            </p>
            <h2
              id="faq-heading"
              className="font-display text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-none"
            >
              Honest
              <br />
              answers.
            </h2>
          </AnimatedReveal>

          <AnimatedReveal delay={0.1}>
            <div role="list" aria-label="Frequently asked questions">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  isOpen={openIndex === i}
                  onToggle={() => toggle(i)}
                />
              ))}
            </div>
          </AnimatedReveal>

        </div>
      </Container>
    </section>
  );
}
