'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { AnimatedReveal, StaggerReveal } from '@/components/ui/AnimatedReveal';

const faqs = [
  {
    q: "You're not US-based — can you really deliver?",
    a: "Yes. We're trained software engineers and we work in your timezone overlap with weekly Loom video updates. Every deliverable is reviewed, documented, and handed over cleanly. The work speaks for itself — which is why we offer a free teardown before you spend a dollar.",
  },
  {
    q: 'Why only Shopify?',
    a: "Focus. One platform, mastered, beats five done halfway. We know Shopify's rendering pipeline, its theme API, its checkout extension points, and its Core Web Vitals edge cases. That depth is what gets you sub-2s load times and 40% conversion lifts — not generalism.",
  },
  {
    q: "What if it doesn't lift conversion?",
    a: 'We monitor for 30 days post-launch. If a key metric — conversion rate, add-to-cart rate, checkout completion — moves the wrong way, we diagnose it and fix it on us. We don\'t declare victory on launch day and disappear.',
  },
  {
    q: 'How fast, really?',
    a: 'Three weeks from signed contract to launch. Week 1: audit and strategy. Week 2: Figma prototype, reviewed and approved. Week 3: Shopify build, QA on real devices, and go live. We have never missed this window.',
  },
  {
    q: 'Do you do logos, ads, SEO, or social too?',
    a: "No, on purpose. We do one thing exceptionally: conversion-focused Shopify redesigns. We'll refer you to trusted partners for branding, paid ads, and SEO. Trying to be everything to everyone is exactly what makes agencies average.",
  },
];

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="border-b border-[#232327]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group"
      >
        <span className="font-display font-bold text-primary text-base leading-snug group-hover:text-accent transition-colors duration-150">
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-muted group-hover:text-accent transition-colors duration-150 mt-0.5"
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
    <section id="faq" className="py-24 lg:py-32 border-t border-[#232327]" aria-labelledby="faq-heading">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-12 lg:gap-20">

          <AnimatedReveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-accent" />
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
