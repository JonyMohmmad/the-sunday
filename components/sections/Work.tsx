import { Container } from '@/components/ui/Container';
import { AnimatedReveal, StaggerReveal } from '@/components/ui/AnimatedReveal';

const projects = [
  {
    brand: 'ANALYTICSPRO',
    category: 'B2B SaaS · Analytics',
    challenge: 'Startup needed a multi-tenant analytics platform with real-time dashboards for 500+ enterprise clients.',
    result: 'Shipped MVP in 5 weeks, 500+ enterprise accounts in month 3',
    metric: '500+',
    metricLabel: 'enterprise clients',
    accent: '#3B3FE4',
  },
  {
    brand: 'FLOWDESK',
    category: 'Web App · Project Management',
    challenge: 'Internal tool needed to replace 4 disconnected spreadsheets and a $2,400/mo SaaS subscription.',
    result: 'Replaced legacy tools, saved $28,800/yr in SaaS spend',
    metric: '$28k',
    metricLabel: 'annual SaaS savings',
    accent: '#CCFF00',
  },
  {
    brand: 'PAYSTREAM',
    category: 'SaaS · Billing Platform',
    challenge: 'FinTech needed a white-label subscription billing engine with Stripe, dunning logic, and a reseller portal.',
    result: 'Processing $1.2M MRR across 12 reseller accounts',
    metric: '$1.2M',
    metricLabel: 'MRR processed',
    accent: '#7C3AED',
  },
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div
      className="relative w-full rounded-xl overflow-hidden border border-[#E4E4E7] bg-[#F7F7F8]"
      style={{ aspectRatio: '4/3' }}
      aria-hidden="true"
    >
      {/* App window chrome */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E4E4E7', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#FF5F57', '#FFBD2E', '#28C840'].map((c) => (
            <div key={c} style={{ width: 8, height: 8, borderRadius: 4, background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, height: 16, background: '#F7F7F8', borderRadius: 6, border: '1px solid #E4E4E7', margin: '0 20px' }} />
      </div>

      {/* App content */}
      <div style={{ display: 'flex', height: 'calc(100% - 38px)' }}>
        {/* Sidebar */}
        <div style={{ width: 40, background: '#FFFFFF', borderRight: '1px solid #E4E4E7', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: project.accent }} />
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ width: 24, height: 24, borderRadius: 6, background: '#E4E4E7' }} />
          ))}
        </div>

        {/* Main */}
        <div style={{ flex: 1, padding: '14px', overflow: 'hidden' }}>
          {/* Metrics row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
            {[['MRR', '+18%'], ['Users', '+32%'], ['Churn', '-0.4%']].map(([label, val]) => (
              <div key={label} style={{ background: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: 8, padding: '8px 10px' }}>
                <div style={{ fontSize: 7, color: '#71717A', marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#09090B' }}>{val}</div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: 8, padding: '10px', marginBottom: 10 }}>
            <div style={{ fontSize: 7, color: '#71717A', marginBottom: 6, fontWeight: 600 }}>Revenue trend</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 36 }}>
              {[30, 42, 38, 55, 48, 65, 60, 75, 70, 85].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1, height: `${h}%`, borderRadius: '2px 2px 0 0',
                    background: i === 9 ? project.accent : '#E4E4E7',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Rows */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: 8, overflow: 'hidden' }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderTop: i > 0 ? '1px solid #E4E4E7' : 'none' }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: i === 0 ? project.accent : '#E4E4E7', flexShrink: 0 }} />
                <div style={{ flex: 1, height: 6, background: '#F7F7F8', borderRadius: 3 }} />
                <div style={{ width: 24, height: 6, background: '#F7F7F8', borderRadius: 3 }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Result badge */}
      <div
        className="absolute bottom-3 left-3 bg-white border border-[#E4E4E7] shadow-sm rounded-lg px-3 py-2 text-xs"
      >
        <div className="font-bold text-base leading-none" style={{ color: project.accent }}>{project.metric}</div>
        <div className="text-muted mt-0.5">{project.metricLabel}</div>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-24 lg:py-32 bg-white border-t border-[#E4E4E7]" aria-labelledby="work-heading">
      <Container>
        <AnimatedReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#3B3FE4] mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-[#3B3FE4]" />
              Recent Work
            </p>
            <h2
              id="work-heading"
              className="font-display text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-none"
            >
              Built to perform.
              <br />
              <span className="text-muted">Numbers that prove it.</span>
            </h2>
          </div>
          <p className="text-xs text-muted max-w-[260px] sm:text-right leading-relaxed">
            Concept projects shown. Real case studies added as clients give the green light.
          </p>
        </AnimatedReveal>

        <StaggerReveal className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.brand}
              className="group bg-white border border-[#E4E4E7] rounded-2xl overflow-hidden hover:border-[#3B3FE4]/25 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <ProjectCard project={project} />
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="font-display font-bold text-primary text-base tracking-tight">
                    {project.brand}
                  </h3>
                  <p className="text-xs text-muted mt-0.5">{project.category}</p>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-3">{project.challenge}</p>
                <div className="flex items-center gap-2 text-xs font-semibold text-primary border-t border-[#E4E4E7] pt-3">
                  <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {project.result}
                </div>
              </div>
            </article>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
