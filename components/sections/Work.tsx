import { Container } from '@/components/ui/Container';
import { AnimatedReveal, StaggerReveal } from '@/components/ui/AnimatedReveal';

// REPLACE: Swap these placeholder spec projects with real case study data and screenshots
const projects = [
  {
    brand: 'VOID STREETWEAR',
    category: 'Streetwear · Shopify',
    challenge: 'Store converting at 0.9% despite 12K monthly visitors from Instagram.',
    result: '0.9% → 2.1% mobile conversion',
    metric: '+133%',
    metricLabel: 'conversion lift',
    palette: ['#1a1a1c', '#242428', '#2e2e34'],
    accentStripe: '#CCFF00',
  },
  {
    brand: 'AKIRA DROP',
    category: 'Anime · Lifestyle · Shopify',
    challenge: '5.8s mobile load time killing paid ad ROI. PDPs with no brand personality.',
    result: '5.8s → 1.6s mobile LCP',
    metric: '1.6s',
    metricLabel: 'mobile load time',
    palette: ['#12121a', '#1c1c2a', '#242434'],
    accentStripe: '#CCFF00',
  },
  {
    brand: 'CULTURE BLOC',
    category: 'Sneakers · Lifestyle · Shopify',
    challenge: 'High-traffic drops selling out in minutes on Instagram but <40% on-site conversion.',
    result: '38% → 71% drop sell-through rate',
    metric: '+87%',
    metricLabel: 'drop sell-through',
    palette: ['#141418', '#1e1e22', '#28282e'],
    accentStripe: '#CCFF00',
  },
];

function MockupCard({ project }: { project: typeof projects[0] }) {
  return (
    // REPLACE: Replace this mock device frame with a real Next/Image screenshot
    <div
      className="relative w-full rounded-lg overflow-hidden border border-[#232327]"
      style={{ aspectRatio: '4/3' }}
      aria-hidden="true"
    >
      {/* Mock store preview */}
      <div
        className="absolute inset-0"
        style={{ background: project.palette[0], fontFamily: "'Space Grotesk', Inter, sans-serif" }}
      >
        {/* Accent stripe */}
        <div style={{ height: '2px', background: project.accentStripe, width: '100%' }} />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: `1px solid ${project.palette[2]}` }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#FAFAFA', letterSpacing: '-0.02em' }}>{project.brand.split(' ')[0]}</span>
          <div style={{ display: 'flex', gap: '10px', fontSize: '9px', color: '#A1A1AA' }}>
            <span>Shop</span><span>Drops</span><span>About</span>
          </div>
        </div>

        {/* Hero */}
        <div style={{ padding: '16px', borderBottom: `1px solid ${project.palette[2]}` }}>
          <div style={{ fontSize: '7px', color: '#A1A1AA', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>New Collection</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#FAFAFA', lineHeight: '1.1', letterSpacing: '-0.03em', marginBottom: '10px' }}>
            {project.brand.split(' ')[0]}<br />{project.brand.split(' ').slice(1).join(' ')}
          </div>
          <button style={{ background: '#CCFF00', color: '#0A0A0B', border: 'none', padding: '6px 12px', fontSize: '9px', fontWeight: '700', borderRadius: '5px' }}>
            Shop Now
          </button>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', padding: '12px 16px' }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ background: project.palette[1 + (i % 2)], borderRadius: '6px', border: `1px solid ${project.palette[2]}`, padding: '6px' }}>
              <div style={{ background: project.palette[2], height: '44px', borderRadius: '4px', marginBottom: '6px' }} />
              <div style={{ fontSize: '7px', color: '#FAFAFA', fontWeight: '600', marginBottom: '2px' }}>ITEM {String(i + 1).padStart(3, '0')}</div>
              <div style={{ fontSize: '8px', color: '#CCFF00', fontWeight: '700' }}>${[49, 89, 34][i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Result badge */}
      <div
        className="absolute bottom-3 left-3 bg-[#0A0A0B]/90 backdrop-blur-sm border border-[#232327] rounded-lg px-3 py-2 text-xs"
        style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}
      >
        <div className="text-accent font-bold text-base leading-none">{project.metric}</div>
        <div className="text-muted mt-0.5">{project.metricLabel}</div>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-24 lg:py-32 border-t border-[#232327]" aria-labelledby="work-heading">
      <Container>
        {/* Heading */}
        <AnimatedReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-accent" />
              {/* REPLACE: Update label once real projects are in */}
              Recent Work — Concept Projects
            </p>
            <h2
              id="work-heading"
              className="font-display text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-none"
            >
              Built to convert.
              <br />
              <span className="text-muted">Numbers that prove it.</span>
            </h2>
          </div>
          <p className="text-xs text-muted max-w-[260px] sm:text-right leading-relaxed">
            {/* REPLACE: Remove this note once real spec projects are added */}
            Spec / concept projects shown. Real case studies added as clients launch.
          </p>
        </AnimatedReveal>

        {/* Project cards */}
        <StaggerReveal className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.brand}
              className="group bg-surface border border-[#232327] rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-200 hover:-translate-y-1"
            >
              <MockupCard project={project} />

              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-primary text-base tracking-tight">
                      {project.brand}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">{project.category}</p>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-3">{project.challenge}</p>
                <div className="flex items-center gap-2 text-xs font-semibold text-primary border-t border-[#232327] pt-3">
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
