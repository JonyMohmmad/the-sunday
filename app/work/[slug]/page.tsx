// app/work/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check } from 'lucide-react';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import CtaSection from '@/components/sections/CtaSection';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { SEO } from '@/lib/seo-config';
import { SITE, WORK, getWorkBySlug, INDUSTRIES, CASE_PROCESS, type WorkProject } from '@/lib/site';

interface Props {
  params: Promise<{ slug: string }>;
}

const industryLabel = (key: string) => INDUSTRIES.find((i) => i.key === key)?.label ?? key;

export async function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) return {};

  const title = `${project.client} — ${project.result} | Case Study`;
  const description = `${project.overview} See how ${SITE.brand} delivered ${project.result} ${project.metric}.`;

  return {
    title,
    description,
    alternates: { canonical: `${SEO.siteUrl}/work/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SEO.siteUrl}/work/${slug}`,
      type: 'article',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

function CaseStudyJsonLd({ project }: { project: WorkProject }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${project.client} case study — ${project.result}`,
    description: project.overview,
    about: project.category,
    author: { '@type': 'Organization', name: SEO.organization.name, url: SEO.organization.url },
    publisher: { '@type': 'Organization', name: SEO.organization.name, logo: SEO.organization.logo },
    keywords: project.stack.join(', '),
    url: `${SEO.siteUrl}/work/${project.slug}`,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

const eyebrow = { fontSize: 12, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#93c5fd' };

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) notFound();

  const others = WORK.filter((w) => w.slug !== project.slug).slice(0, 3);

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 120 }}>
        <CaseStudyJsonLd project={project} />

        {/* ── Header ── */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors duration-150 hover:text-[var(--text)]"
              style={{ color: 'var(--text-2)' }}
            >
              ← All work
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span
                className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', color: '#93c5fd' }}
              >
                {industryLabel(project.industry)}
              </span>
              <span className="text-[12px]" style={{ color: 'var(--text-3)' }}>
                {project.year} · {project.duration}
              </span>
            </div>

            <h1
              className="font-bold tracking-tight mb-4"
              style={{ fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.05 }}
            >
              {project.client}
            </h1>
            <p className="text-[13px] mb-6" style={{ color: 'var(--text-3)' }}>
              {project.category}
            </p>
            <p className="text-[18px] leading-relaxed mb-8" style={{ color: 'var(--text-2)', maxWidth: 640 }}>
              {project.overview}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-14">
              <a
                href={SITE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5"
                style={{ background: 'var(--cta)' }}
              >
                Start a project like this →
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl text-sm font-medium transition-colors duration-150 hover:text-[var(--text)]"
                style={{ border: '1px solid var(--border)', color: 'var(--text-2)' }}
              >
                View live site <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Living-portfolio hero preview ── */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <RevealOnScroll variant="scaleIn">
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 px-5 py-3" style={{ background: 'var(--surface)' }}>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full" style={{ background: '#ef4444', opacity: 0.7 }} />
                    <span className="w-3 h-3 rounded-full" style={{ background: '#f59e0b', opacity: 0.7 }} />
                    <span className="w-3 h-3 rounded-full" style={{ background: '#22c55e', opacity: 0.7 }} />
                  </div>
                  <div
                    className="ml-3 flex-1 max-w-sm mx-auto text-center text-xs px-3 py-1.5 rounded-md"
                    style={{ background: 'var(--surface-2)', color: 'var(--text-3)', fontFamily: 'var(--font-geist-mono)' }}
                  >
                    {project.url}
                  </div>
                </div>
                <div className="relative" style={{ height: 'clamp(260px, 38vw, 460px)', background: project.accent }}>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.client} homepage`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      priority
                      unoptimized
                      className="object-cover object-top"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.3)), radial-gradient(circle at 28% 22%, rgba(255,255,255,0.22), transparent 60%)',
                      }}
                    />
                  )}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* ── Measurable outcomes (before → after → result) ── */}
        <section className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto">
            <RevealOnScroll>
              <p style={eyebrow} className="mb-3">The results</p>
              <h2 className="font-bold tracking-tight mb-10" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-0.02em', color: 'var(--text)' }}>
                What the rebuild delivered.
              </h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.results.map((r, i) => (
                <RevealOnScroll key={r.label} delay={i * 0.08}>
                  <div className="rounded-2xl p-7 h-full" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <p className="font-bold mb-2" style={{ fontSize: 44, lineHeight: 1, color: '#22c55e', letterSpacing: '-0.02em' }}>
                      {r.value}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-2)' }}>{r.label}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── Challenge + approach ── */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <RevealOnScroll>
              <p style={eyebrow} className="mb-3">The challenge</p>
              <h2 className="font-bold tracking-tight mb-4" style={{ fontSize: 'clamp(24px, 3vw, 32px)', letterSpacing: '-0.02em', color: 'var(--text)' }}>
                Where they started.
              </h2>
              <p className="text-[16px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
                {project.challenge}
              </p>
            </RevealOnScroll>
            <RevealOnScroll variant="slideLeft">
              <p style={eyebrow} className="mb-3">Our approach</p>
              <h2 className="font-bold tracking-tight mb-5" style={{ fontSize: 'clamp(24px, 3vw, 32px)', letterSpacing: '-0.02em', color: 'var(--text)' }}>
                What we did.
              </h2>
              <ul className="flex flex-col gap-3.5">
                {project.approach.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full"
                      style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}
                    >
                      <Check size={13} />
                    </span>
                    <span className="text-[15px] leading-relaxed" style={{ color: 'var(--text-2)' }}>{a}</span>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </section>

        {/* ── Tech-stack transparency card ── */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-5xl mx-auto">
            <RevealOnScroll>
              <div
                className="rounded-2xl p-8"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div>
                  <p style={eyebrow} className="mb-3">Built with</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((t) => (
                      <span
                        key={t}
                        className="text-[13px] px-3 py-1.5 rounded-lg"
                        style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-geist-mono)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* ── Design process walkthrough ── */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-5xl mx-auto">
            <RevealOnScroll>
              <p style={eyebrow} className="mb-3">How it came together</p>
              <h2 className="font-bold tracking-tight mb-12" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-0.02em', color: 'var(--text)' }}>
                From wireframes to launch.
              </h2>
            </RevealOnScroll>
            <div className="relative">
              {/* connecting line */}
              <div className="hidden md:block absolute top-5 left-0 right-0 h-px" style={{ background: 'var(--border)' }} />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
                {CASE_PROCESS.map((p, i) => (
                  <RevealOnScroll key={p.step} delay={i * 0.1}>
                    <div className="relative">
                      <div
                        className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-4"
                        style={{ background: 'var(--primary)', color: '#fff' }}
                      >
                        {i + 1}
                      </div>
                      <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text)' }}>{p.step}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{p.body}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── More work ── */}
        <section className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-bold tracking-tight" style={{ fontSize: 'clamp(22px, 2.5vw, 28px)', letterSpacing: '-0.02em', color: 'var(--text)' }}>
                More work
              </h2>
              <Link href="/work" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-[var(--text)]" style={{ color: 'var(--text-2)' }}>
                View all <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/work/${o.slug}`}
                  className="group rounded-xl p-5 transition-transform duration-150 hover:-translate-y-1"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <div className="h-1.5 w-12 rounded-full mb-4" style={{ background: o.accent }} />
                  <p className="text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>{o.client}</p>
                  <p className="text-[12px] mb-3" style={{ color: 'var(--text-3)' }}>{industryLabel(o.industry)}</p>
                  <p className="text-sm font-semibold" style={{ color: '#22c55e' }}>{o.result}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
