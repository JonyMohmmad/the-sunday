import type { Metadata } from 'next';
import Nav from '@/components/layout/Nav';
import AgentShowcase from '@/components/sections/AgentShowcase';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'AI Agents & Automation',
  description:
    'Custom AI agents that take real work off your team — voice, customer care, research, '
    + 'lead generation, and document automation, wired into your existing tools. Honest about '
    + 'scope; figures shown are illustrative capability ranges.',
};

export default function AiAgentsPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 120 }}>
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#93c5fd' }}>
              AI Agents &amp; Automation
            </p>
            <h1
              className="font-bold tracking-tight mb-5"
              style={{ fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.05 }}
            >
              Agents that take real work off your team.
            </h1>
            <p className="text-[18px] leading-relaxed mx-auto" style={{ color: 'var(--text-2)', maxWidth: 620 }}>
              We design, build, and deploy custom AI agents wired into the tools you already use —
              for support, lead generation, research, and document processing — with the guardrails
              and observability serious work demands.
            </p>
          </div>
        </section>

        <AgentShowcase />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
