// lib/site.ts
// ─────────────────────────────────────────────────────────────────────────
// Single source of truth for Lumora Studio — a full-service digital studio
// across four pillars: Design & Build, Growth & Marketing, AI Agents &
// Automation, and Security & Protection.
// Edit copy, pricing, services, and contact details here — components read
// from this file so the whole site stays consistent.
// ─────────────────────────────────────────────────────────────────────────

export const SITE = {
  brand: 'Lumora Studio',
  brandShort: 'Lumora',
  domain: 'https://lumorastudio.com',
  // Short brand line used in the footer and meta strapline.
  tagline: 'One studio for web, AI, growth, and security.',

  // ── Primary conversion action ──────────────────────────────────────────
  bookingUrl: 'https://cal.com/lumora/intro-call',
  bookingLabel: 'Book a call',

  // ── Contact ────────────────────────────────────────────────────────────
  email: 'hello@lumorastudio.com',
  phone: '+1 (555) 010-2025',
  location: 'Remote — serving clients worldwide',

  social: {
    twitter: 'https://twitter.com/lumorastudio',
    instagram: 'https://instagram.com/lumorastudio',
    linkedin: 'https://linkedin.com/company/lumorastudio',
    dribbble: 'https://dribbble.com/lumorastudio',
  },

  // ── Navigation ─────────────────────────────────────────────────────────
  nav: [
    { label: 'Services', href: '/#services' },
    { label: 'Work', href: '/#work' },
    { label: 'Process', href: '/#process' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'FAQ', href: '/#faq' },
  ],
} as const;

// ── HERO ───────────────────────────────────────────────────────────────
export const HERO = {
  eyebrow: 'Digital Studio — Web · AI · Growth',
  headline:
    "We build your website, run the marketing behind it, and protect the brand you're growing.",
  body:
    'Lumora is one studio for design, development, AI automation, growth marketing, ' +
    'and digital security — so everything that powers your business online works ' +
    'together, not in silos.',
  // Trust line shown under the hero (qualitative, no fabricated logos).
  trust:
    'Trusted by founders and teams building across e-commerce, hospitality, and SaaS.',
};

// ── TRUST LINE / REAL PROJECTS ─────────────────────────────────────────
// Honest trust strip — only real, shipped projects.
export const TRUST_LINE =
  'Trusted by founders and teams building across e-commerce, hospitality, and SaaS.';
export const TRUST_PROJECTS = ['Savageon', 'AgentForge', 'Cala Nera', 'Cura', 'Cadence', 'VANTA', 'Meridian'];

// ── SERVICES — FOUR PILLARS ────────────────────────────────────────────
// Web/design is the front door; marketing, AI, and security are the deeper
// engine. Each pillar can link to a dedicated page for claim-heavy detail.
export type PillarService = {
  name: string;
  body: string;
  points: string[];
};

export type Pillar = {
  key: string;
  number: string;
  title: string;
  tagline: string;
  href?: string; // dedicated sub-page, when one exists
  services: PillarService[];
};

export const PILLARS: Pillar[] = [
  {
    key: 'design-build',
    number: '01',
    title: 'Design & Build',
    tagline: 'The front door — websites, stores, web apps, and brand.',
    services: [
      {
        name: 'Business & Marketing Websites',
        body: 'Conversion-focused sites that book more leads.',
        points: ['Custom design', 'Copy that converts', 'Editable CMS', 'SEO-ready'],
      },
      {
        name: 'E-commerce & Online Stores',
        body: 'Shopify and custom storefronts built to sell.',
        points: ['Shopify & headless', 'Optimised checkout', 'Payments & shipping', 'Multi-seller ready'],
      },
      {
        name: 'Web Apps & SaaS Platforms',
        body: 'Dashboards, portals, and products built to scale.',
        points: ['Product UX/UI', 'Dashboards & portals', 'API integrations', 'Auth & billing'],
      },
      {
        name: 'Graphics Design',
        body: 'Brand identity, social creative, and visual assets that make you look world-class.',
        points: ['Logos & brand systems', 'Ad creative', 'Social graphics'],
      },
    ],
  },
  {
    key: 'growth',
    number: '02',
    title: 'Growth & Marketing',
    tagline: 'Turn the traffic your site earns into customers.',
    services: [
      {
        name: 'Full-Stack Digital Marketing',
        body: 'End-to-end campaigns that turn traffic into customers.',
        points: ['Paid ads', 'Funnels', 'Email', 'Analytics'],
      },
      {
        name: 'Social Media Solutions',
        body: 'Content, scheduling, and management that keeps your brand active and growing.',
        points: ['Content planning', 'Community management', 'Performance tracking'],
      },
    ],
  },
  {
    key: 'ai',
    number: '03',
    title: 'AI Agents & Automation',
    tagline: 'Take real work off your team with custom agents.',
    href: '/ai-agents',
    services: [
      {
        name: 'Custom AI Agents',
        body:
          'Agents that take real work off your team — support, lead gen, and document ' +
          'processing wired into your existing tools.',
        points: ['Voice & chat agents', 'Lead generation', 'Document automation', 'CRM integrations'],
      },
    ],
  },
  {
    key: 'security',
    number: '04',
    title: 'Security & Protection',
    tagline: 'Protect the brand and identity you are growing.',
    href: '/security',
    services: [
      {
        name: 'Identity Protection',
        body: 'Safeguarding your accounts and digital identity from takeover and impersonation.',
        points: ['Account hardening', 'Monitoring', 'Recovery'],
      },
      {
        name: 'Social Media Security Management',
        body: "Protecting your brand's social presence from hacks, fraud, and reputation attacks.",
        points: ['Account security', 'Threat monitoring', 'Incident response'],
      },
      {
        name: 'Intellectual Property Management',
        body: 'Protecting your brand assets, trademarks, and original work.',
        points: ['IP audits', 'Trademark guidance', 'Takedown support'],
      },
    ],
  },
];

// ── AI AGENTS (illustrative capabilities) ──────────────────────────────
// Detail for the dedicated /ai-agents page. Metrics here are framed as
// ILLUSTRATIVE capability ranges — what's possible — not claimed client
// outcomes. Do not present these as achieved results.
export type AgentSolution = {
  key: string;
  title: string;
  tagline: string;
  body: string;
  span: 1 | 2 | 3 | 6; // bento column span (lg, of 6)
  metrics: string[]; // illustrative capability badges
  stack: string[];
};

export const AGENT_SOLUTIONS: AgentSolution[] = [
  {
    key: 'voice',
    title: 'AI Voice Agents',
    tagline: 'Conversations that sound human — at machine scale.',
    body:
      'Real-time, low-latency voice agents that handle inbound and outbound calls ' +
      'end to end — qualifying leads, booking appointments, and resolving requests ' +
      'with natural turn-taking, interruptions, and memory.',
    span: 3,
    metrics: ['Sub-700ms latency', '24/7 availability', 'High automation rate'],
    stack: ['Vapi', 'Twilio', 'ElevenLabs', 'Whisper', 'OpenAI'],
  },
  {
    key: 'research',
    title: 'AI Research Agents',
    tagline: 'Deep-dive intelligence, synthesised in minutes.',
    body:
      'Autonomous researchers that crawl, read, and reconcile hundreds of sources — ' +
      'then deliver cited, decision-ready briefings on markets, competitors, and ' +
      'prospects while your team sleeps.',
    span: 3,
    metrics: ['10× faster research', '500+ sources/run', 'Fully cited output'],
    stack: ['LangGraph', 'CrewAI', 'Tavily', 'Pinecone', 'Anthropic'],
  },
  {
    key: 'care',
    title: 'Human-like Customer Care',
    tagline: 'Support that remembers, empathises, and resolves.',
    body:
      'Context-aware chatbots wired into your knowledge base, CRM, and order systems — ' +
      'so they answer with your tone of voice, take real actions, and escalate ' +
      'gracefully when a human truly adds value.',
    span: 2,
    metrics: ['<2s first response', 'High deflection', 'Strong CSAT'],
    stack: ['LangChain', 'OpenAI', 'Pinecone', 'Zendesk', 'Python'],
  },
  {
    key: 'sales',
    title: 'Lead Generation & Sales Agents',
    tagline: 'A tireless SDR working your whole pipeline.',
    body:
      'Autonomous prospecting, enrichment, and personalised multi-channel outreach — ' +
      'agents that research each account, book qualified meetings, and keep your CRM ' +
      'pristine without manual data entry.',
    span: 2,
    metrics: ['More meetings booked', '24/7 prospecting', 'Lower cost per lead'],
    stack: ['CrewAI', 'LangChain', 'Apollo', 'HubSpot', 'OpenAI'],
  },
  {
    key: 'docs',
    title: 'File Documentation & AI Automation',
    tagline: 'Complex documents in, structured action out.',
    body:
      'Agents that ingest contracts, invoices, and forms — extracting, validating, and ' +
      'routing data into your systems with compliance checks and an audit trail, ' +
      'eliminating manual data entry.',
    span: 2,
    metrics: ['High extraction accuracy', 'Faster processing', 'Full audit trail'],
    stack: ['LangChain', 'Unstructured', 'OpenAI', 'Python', 'Postgres'],
  },
  {
    key: 'enterprise',
    title: 'Custom Enterprise Agents',
    tagline: 'High-level professionals that own a whole role.',
    body:
      'Bespoke, multi-agent systems engineered to take over complex operational ' +
      'functions — orchestrating tools, data, and human approvals across departments, ' +
      'with the guardrails, observability, and security an enterprise demands.',
    span: 6,
    metrics: ['Owns end-to-end workflows', 'Guardrails & observability', 'Enterprise-grade security'],
    stack: ['LangGraph', 'CrewAI', 'Anthropic', 'OpenAI', 'Python', 'Kubernetes'],
  },
];

// ── SECURITY & PROTECTION (dedicated /security page) ───────────────────
export type SecurityArea = {
  key: string;
  title: string;
  intro: string;
  covers: string[];
};

export const SECURITY_AREAS: SecurityArea[] = [
  {
    key: 'identity',
    title: 'Identity Protection',
    intro:
      'We harden the accounts and digital identity your business runs on, then keep ' +
      'watch so a takeover or impersonation attempt is caught early — not after the damage.',
    covers: [
      'Account hardening: strong MFA, passkeys, and recovery-path review across critical logins.',
      'Monitoring for exposed credentials, impersonation domains, and look-alike profiles.',
      'A documented recovery process so a compromised account can be regained quickly.',
    ],
  },
  {
    key: 'social',
    title: 'Social Media Security Management',
    intro:
      "Your brand's social presence is a real asset — and a target. We secure the accounts, " +
      'watch for threats, and give you a calm, rehearsed response when something goes wrong.',
    covers: [
      'Account security: access reviews, role separation, and removal of stale admins.',
      'Threat monitoring for phishing, fake pages, and coordinated reputation attacks.',
      'An incident-response workflow so a hack or fraud event is contained, not chaotic.',
    ],
  },
  {
    key: 'ip',
    title: 'Intellectual Property Management',
    intro:
      'We help you understand what brand assets you own, where they are exposed, and how ' +
      'to act when someone copies your work — without overpromising legal outcomes.',
    covers: [
      'IP audits: an inventory of logos, content, and original work worth protecting.',
      'Trademark guidance and pointers to qualified counsel where formal filings are needed.',
      'Takedown support for copied content, counterfeit listings, and infringing pages.',
    ],
  },
];

// ── METRICS (real / verifiable — Option A from the brief) ──────────────
export const METRICS = [
  { prefix: '', target: 7, suffix: '', decimals: 0, label: 'Products shipped', sub: 'web & AI, live in production' },
  { prefix: '', target: 3, suffix: '', decimals: 0, label: 'Countries served', sub: 'clients across 3 continents' },
  { prefix: '', target: 247, suffix: '', decimals: 0, label: 'Waitlist signups', sub: 'driven for AgentForge pre-launch' },
  { prefix: '', target: 9, suffix: '', decimals: 0, label: 'Seller stalls', sub: 'on the Savageon marketplace' },
];

// ── WORK / CASE STUDIES (real, shipped projects only) ──────────────────
// Industry tags drive the portfolio filter. Keep `key` in sync with each
// project's `industry` field below.
export const INDUSTRIES = [
  { key: 'all',       label: 'All work' },
  { key: 'ecommerce', label: 'E-commerce' },
  { key: 'saas',      label: 'SaaS' },
  { key: 'brand',     label: 'Brand & Web' },
] as const;

export type IndustryKey = (typeof INDUSTRIES)[number]['key'];

// The design-process story shown on every case study (wireframes → launch).
export const CASE_PROCESS = [
  { step: 'Wireframes',      body: 'Low-fidelity layouts that map the journey and prove the structure before any pixels are pushed.' },
  { step: 'Design mockups',  body: 'High-fidelity, on-brand screens for every breakpoint — reviewed and signed off before code.' },
  { step: 'Development',     body: 'A fast, accessible, SEO-ready build with the latest web tech, tested across real devices.' },
  { step: 'Launch & growth', body: 'We ship, measure, and tune conversion, speed, and SEO so the site keeps paying for itself.' },
] as const;

export type WorkProject = {
  slug: string;
  client: string;
  industry: Exclude<IndustryKey, 'all'>;
  category: string;
  url: string;            // display URL (no protocol)
  liveUrl: string;        // full URL for the "view live" link
  year: string;
  duration: string;
  summary: string;        // one-line teaser for cards
  overview: string;       // intro paragraph on the case study
  challenge: string;
  approach: string[];
  result: string;         // headline metric for cards
  metric: string;         // sub-label for the headline metric
  results: { value: string; label: string }[]; // measurable outcomes grid
  stack: string[];        // tech transparency card
  accent: string;         // gradient used in the browser-frame preview
  image?: string;         // real homepage screenshot (in /public); falls back to accent mock
};

export const getWorkBySlug = (slug: string): WorkProject | undefined =>
  WORK.find((w) => w.slug === slug);

export const WORK: WorkProject[] = [
  {
    slug: 'cala-nera',
    client: 'Cala Nera',
    industry: 'brand',
    category: 'Hospitality · Brand & Web',
    url: 'cala-nera.vercel.app',
    liveUrl: 'https://cala-nera.vercel.app/',
    year: '2025',
    duration: '5 weeks',
    summary: 'An immersive site for a clifftop luxury hotel on the Amalfi Coast.',
    overview:
      'Cala Nera is an ultra-premium hotel carved into the limestone cliffs of the Amalfi Coast. ' +
      'They needed a digital presence as restrained and considered as the property itself — one that ' +
      'sells silence, stone, and sea air to high-net-worth travellers.',
    challenge:
      'Luxury hospitality lives or dies on atmosphere. The brand needed a site that conveyed quiet ' +
      'exclusivity, showcased its rooms and dining, and turned browsing into direct reservations ' +
      'without feeling like a template booking engine.',
    approach: [
      'Designed a minimal, image-led experience built around restraint and negative space.',
      'Built cinematic suite, dining, spa, and experiences sections with buttery scroll interactions.',
      'Integrated a frictionless reservation flow and optimised imagery for instant loads.',
    ],
    result: 'Direct bookings',
    metric: 'a reservation-first experience',
    results: [
      { value: '24', label: 'Suites showcased end-to-end' },
      { value: '1★', label: 'Michelin dining featured' },
      { value: '<1s', label: 'Optimised image loads' },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    accent: 'linear-gradient(135deg,#0b486b,#2c7873)',
    image: '/work/cala-nera.webp',
  },
  {
    slug: 'agentforge',
    client: 'AgentForge',
    industry: 'saas',
    category: 'SaaS · AI automation',
    url: 'agent-forge-phi-puce.vercel.app',
    liveUrl: 'https://agent-forge-phi-puce.vercel.app/',
    year: '2026',
    duration: '3 weeks',
    summary: 'A launch site for an AI agency deploying custom agents into business workflows.',
    overview:
      'AgentForge is an AI automation agency that deploys custom AI agents into existing tools — ' +
      'Slack, Notion, HubSpot, Salesforce, and Gmail — to automate complex work in days, not months. ' +
      'They needed a sharp launch site to build a waitlist and convert founding clients.',
    challenge:
      'As an early-stage agency, AgentForge needed to explain a technical, abstract product clearly, ' +
      'establish credibility fast, and capture high-intent signups behind a founding-client offer ' +
      'before public launch.',
    approach: [
      'Built a conversion-first landing page around a single, sharp value proposition.',
      'Designed clear sections for sales, ops, support, research, and content agents.',
      'Wired up waitlist capture and a founding-client offer with live signup proof.',
    ],
    result: '247 signups',
    metric: 'on the pre-launch waitlist',
    results: [
      { value: '247', label: 'Waitlist signups pre-launch' },
      { value: '40%', label: 'Founding-client offer' },
      { value: 'Days', label: 'Agent deployment, not months' },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    accent: 'linear-gradient(135deg,#6a11cb,#2575fc)',
    image: '/work/agentforge.webp',
  },
  {
    slug: 'savageon',
    client: 'Savageon',
    industry: 'ecommerce',
    category: 'E-commerce · Marketplace',
    url: 'savageon.com',
    liveUrl: 'https://www.savageon.com/',
    year: '2025',
    duration: '7 weeks',
    summary: 'A bold streetwear store and multi-seller marketplace for Bangladesh.',
    overview:
      'Savageon is Bangladesh’s boldest anime and urban streetwear label — and a multi-seller ' +
      'marketplace. Beyond its own drops it hosts independent vendor stalls, aggregating their ' +
      'inventory into one fast, distinctive shopping experience.',
    challenge:
      'Savageon needed to be two things at once: a brand store with attitude and a marketplace for ' +
      'nine independent sellers. It had to handle eight product categories, limited drops, and local ' +
      'delivery while still loading fast and converting on mobile.',
    approach: [
      'Built a bold, anime-inspired storefront with limited-drop merchandising.',
      'Architected a multi-seller marketplace with individual vendor stalls.',
      'Added an AI support chatbot and localised 2–7 day delivery across Bangladesh.',
    ],
    result: '9 seller stalls',
    metric: 'on one marketplace',
    results: [
      { value: '8', label: 'Product categories live' },
      { value: '9', label: 'Independent vendor stalls' },
      { value: 'AI', label: '“Savage AI” support chat' },
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    accent: 'linear-gradient(135deg,#16161a,#e63946)',
    image: '/work/savageon.webp',
  },
  {
    slug: 'cura',
    client: 'Cura',
    industry: 'saas',
    category: 'Healthcare · SaaS platform',
    url: 'cura-nine-fawn.vercel.app',
    liveUrl: 'https://cura-nine-fawn.vercel.app/',
    year: '2026',
    duration: '6 weeks',
    summary: 'A marketing site for an AI-powered telemedicine and patient-management platform.',
    overview:
      'Cura is an AI-powered telemedicine and patient-management platform for modern healthcare ' +
      'providers — virtual consultations, automated scheduling, and AI triage in one HIPAA-ready ' +
      'ecosystem. They needed a marketing site that explained a complex clinical product clearly ' +
      'and earned the trust of hospitals, clinics, and telehealth teams.',
    challenge:
      'Healthcare software has to feel credible and secure before anything else. Cura needed to ' +
      'communicate a broad platform — patient, doctor, and admin dashboards plus an AI assistant — ' +
      'without overwhelming visitors, while making compliance and security obvious at a glance.',
    approach: [
      'Designed a calm, clinical brand with a live patient-monitoring hero to make the product tangible.',
      'Structured the platform around four dashboards and an eight-step patient care journey.',
      'Built clear solution, integration, and pricing sections aimed at providers of every size.',
    ],
    result: '4 dashboards',
    metric: 'patient, doctor, admin & AI',
    results: [
      { value: '4', label: 'Role-based dashboards' },
      { value: '8', label: 'Step patient care journey' },
      { value: 'HIPAA', label: 'Compliance-ready architecture' },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    accent: 'linear-gradient(135deg,#0ea5b7,#2563eb)',
    image: '/work/cura.webp',
  },
  {
    slug: 'cadence',
    client: 'Cadence',
    industry: 'saas',
    category: 'SaaS · Sales automation',
    url: 'cadence-nine-lyart.vercel.app',
    liveUrl: 'https://cadence-nine-lyart.vercel.app/',
    year: '2026',
    duration: '4 weeks',
    summary: 'A launch site for an AI revenue engine that qualifies leads and books meetings 24/7.',
    overview:
      'Cadence is an AI revenue engine that engages, qualifies, and nurtures leads, then books ' +
      'meetings straight into a sales rep’s calendar — working around the clock with no manual ' +
      'follow-up. They needed a sharp, high-contrast launch site to sell an abstract automation ' +
      'product to B2B sales teams.',
    challenge:
      'AI sales tooling is a crowded, sceptical market. Cadence needed a site that made a 24/7 ' +
      'automated funnel feel concrete and trustworthy, spoke to multiple industries, and pushed ' +
      'visitors toward a strategy call without sounding like hype.',
    approach: [
      'Built a bold, dark-mode landing page around a single promise: more qualified meetings, automatically.',
      'Mapped an eight-step funnel from first visit to closed deal so the automation is easy to grasp.',
      'Designed industry-specific solution sections and a tiered pricing path to a strategy call.',
    ],
    result: '8-step funnel',
    metric: 'visitor to closed deal',
    results: [
      { value: '8', label: 'Step automated funnel' },
      { value: '6', label: 'Industry solution tracks' },
      { value: '24/7', label: 'Always-on lead engagement' },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    accent: 'linear-gradient(135deg,#1e1b4b,#7c3aed)',
    image: '/work/cadence.webp',
  },
  {
    slug: 'vanta',
    client: 'VANTA',
    industry: 'ecommerce',
    category: 'E-commerce · Marketplace',
    url: 'vanta-marketplace.vercel.app',
    liveUrl: 'https://vanta-marketplace.vercel.app/',
    year: '2026',
    duration: '6 weeks',
    summary: 'A premium technology marketplace for curated, verified consumer electronics.',
    overview:
      'VANTA is a premium technology marketplace for high-end consumer electronics — smartphones, ' +
      'laptops, audio, gaming, cameras, and smart home — sold as genuine, verified products with ' +
      'warranty backing. They needed a storefront that felt as premium as the gear, with fast, ' +
      'confident browsing across a deep catalogue.',
    challenge:
      'Premium electronics buyers expect a flagship-grade experience and proof of authenticity. ' +
      'VANTA had to organise eight product categories and multiple brand partners into a fast, ' +
      'distinctive storefront that signalled trust and converted high-ticket purchases.',
    approach: [
      'Designed a high-end, image-led storefront with a floating-product hero and dark/light modes.',
      'Architected eight curated categories with featured, trending, and limited-edition collections.',
      'Built trust into the journey — authorized-retailer brand partners, warranty, and secure checkout.',
    ],
    result: '8 categories',
    metric: 'curated electronics catalogue',
    results: [
      { value: '8', label: 'Curated product categories' },
      { value: '8', label: 'Authorized brand partners' },
      { value: '30d', label: 'Returns & warranty backing' },
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    accent: 'linear-gradient(135deg,#6d28d9,#a78bfa)',
    image: '/work/vanta.webp',
  },
  {
    slug: 'meridian',
    client: 'Meridian',
    industry: 'brand',
    category: 'Agency · Brand & Web',
    url: 'meridian-studio-gamma.vercel.app',
    liveUrl: 'https://meridian-studio-gamma.vercel.app/',
    year: '2026',
    duration: '5 weeks',
    summary: 'A studio site for a design, engineering, and growth agency for ambitious brands.',
    overview:
      'Meridian is a digital studio that designs, engineers, and grows websites for ambitious ' +
      'brands — keeping strategy, design, engineering, and growth under one roof so nothing gets ' +
      'lost in the handoff. They needed a site that was, itself, proof of the work: fast, refined, ' +
      'and clearly structured around their disciplines.',
    challenge:
      'For an agency, the website is the portfolio. Meridian needed a site polished enough to win ' +
      'discerning clients, communicate six distinct service disciplines without clutter, and tell a ' +
      'clear end-to-end process story from discovery to ongoing growth.',
    approach: [
      'Designed a confident, typographic brand with a bold “Design, build and grow” hero and dark/light modes.',
      'Structured six service disciplines and a six-phase process so the studio’s offer is easy to grasp.',
      'Built a fast, refined, scroll-led experience that demonstrates the build quality it sells.',
    ],
    result: '6 disciplines',
    metric: 'design to growth, one roof',
    results: [
      { value: '6', label: 'Service disciplines' },
      { value: '6', label: 'Phase delivery process' },
      { value: 'Dark', label: '& light theming built in' },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    accent: 'linear-gradient(135deg,#2563eb,#22d3ee)',
    image: '/work/meridian.webp',
  },
];

// ── PROCESS ────────────────────────────────────────────────────────────
export const PROCESS = [
  {
    number: '01',
    title: 'Discovery & strategy',
    body:
      'We start with a call to understand your business, customers, and goals — ' +
      'then map the exact site or system that will move your numbers. No templates, no guesswork.',
  },
  {
    number: '02',
    title: 'Design',
    body:
      'We design a custom, on-brand experience around how your customers actually ' +
      'buy. You review every screen before a line of code is written.',
  },
  {
    number: '03',
    title: 'Build',
    body:
      'We engineer a fast, accessible, SEO-ready build with the latest web tech — ' +
      'tested across devices and built to load in under two seconds.',
  },
  {
    number: '04',
    title: 'Launch & grow',
    body:
      'We launch, measure, and optimise. With a care plan, we keep improving ' +
      'conversion, speed, and SEO so your project keeps paying for itself.',
  },
];

// The same process applies across web, marketing, AI, and security engagements.
export const PROCESS_NOTE =
  'The same process applies across every engagement — whether we’re building a site, ' +
  'running growth, shipping an AI agent, or hardening your security.';

// ── PRICING (web project packages) ─────────────────────────────────────
export const PRICING = [
  {
    tier: 'Launch',
    price: '$2,500',
    per: 'one-time project',
    description: 'A polished marketing site to get your business online and converting.',
    features: [
      'Up to 5 custom-designed pages',
      'Mobile-first, responsive build',
      'On-page SEO setup',
      'Contact form & analytics',
      'Launch in ~2 weeks',
    ],
    cta: 'Book a call',
    popular: false,
  },
  {
    tier: 'Growth',
    price: '$6,000',
    per: 'one-time project',
    description: 'A custom site or online store designed to scale your business.',
    features: [
      'Up to 12 pages or full store',
      'Bespoke design & brand system',
      'CMS or Shopify you can edit',
      'Integrations (payments, CRM, email)',
      'Performance & conversion tuning',
      '30 days post-launch support',
    ],
    cta: 'Book a call',
    popular: true,
  },
  {
    tier: 'Scale',
    price: "Let's talk",
    per: 'custom quote',
    description: 'Web apps, SaaS, and large e-commerce builds with an ongoing partnership.',
    features: [
      'Custom web app / SaaS build',
      'Dedicated design + dev team',
      'Advanced integrations & auth',
      'Ongoing care & growth retainer',
      'Priority support & SLA',
    ],
    cta: 'Request a quote',
    popular: false,
  },
];

// Marketing, AI, and security are scoped per engagement — no fixed list price.
export const PRICING_NOTE =
  'These are our web project packages. Growth marketing, AI agents, and security ' +
  'are priced per scope — custom quote, book a call.';

// ── FAQ ────────────────────────────────────────────────────────────────
export const FAQ = [
  {
    q: 'What kind of businesses do you work with?',
    a:
      'We work with businesses of every size, anywhere in the world — from founders launching ' +
      'their first site to established companies that need a serious upgrade. If you sell a ' +
      'product or service online, we can help.',
  },
  {
    q: 'How much does a website cost?',
    a:
      'Our web projects start at $2,500 for a marketing site and $6,000 for a custom site or online ' +
      'store. Web apps and larger builds are custom-quoted. You will always get a fixed price ' +
      'before we begin — no surprises.',
  },
  {
    q: 'How long does a project take?',
    a:
      'Most marketing sites launch in about two weeks. Custom sites and stores typically take ' +
      'three to six weeks, and web apps are scoped on the discovery call. We move fast without ' +
      'cutting corners.',
  },
  {
    q: 'Do you work with clients in my country / time zone?',
    a:
      'Yes. We are a fully remote studio working with clients worldwide. We schedule calls around ' +
      'your time zone and communicate clearly throughout the project.',
  },
  {
    q: 'Do you offer ongoing support after launch?',
    a:
      'Absolutely. Every project includes post-launch support, and we offer monthly care plans ' +
      'for updates, security, performance, and continuous SEO and conversion improvements.',
  },
  {
    q: 'What technology do you build with?',
    a:
      'We build modern, fast websites with Next.js and React, Shopify for e-commerce, and ' +
      'headless CMS options you can edit yourself. Everything is optimised for speed, SEO, ' +
      'and accessibility.',
  },
  {
    q: 'Do you only build websites, or do you also handle marketing and AI?',
    a:
      'We are a full-service digital studio across four pillars: Design & Build, Growth & Marketing, ' +
      'AI Agents & Automation, and Security & Protection. The website is usually the front door — ' +
      'we can also run the marketing behind it, build AI agents, and protect your brand.',
  },
  {
    q: 'What can your AI agents actually do?',
    a:
      'We build custom AI agents for voice, customer care, research, lead generation, and document ' +
      'automation — wired into your existing tools. See the /ai-agents page for capabilities. We are ' +
      'honest about scope and frame figures as what’s possible, not guaranteed outcomes.',
  },
  {
    q: 'What does “digital security” cover?',
    a:
      'Our security pillar covers identity protection, social media security management, and ' +
      'intellectual property management — account hardening, threat monitoring, incident response, ' +
      'and takedown support. See the /security page for detail. We keep claims defensible and never ' +
      'promise to make you “unhackable.”',
  },
  {
    q: 'How does pricing work for marketing, AI, or security?',
    a:
      'Our fixed web packages start at $2,500. Marketing, AI agents, and security are scoped per ' +
      'engagement and custom-quoted on a free call — you always get a clear price before any work begins.',
  },
];

// ── FINAL CTA ──────────────────────────────────────────────────────────
export const FINAL_CTA = {
  eyebrow: 'Ready when you are',
  headline: 'Let’s build something that grows your business.',
  body:
    'Book a free 30-minute call. We’ll talk through your goals, show you what’s possible, ' +
    'and give you a clear plan and price — whether you work with us or not.',
  note: 'No pressure. No jargon. Just honest advice from people who build for a living.',
};

// ── ABOUT ──────────────────────────────────────────────────────────────
export const ABOUT = {
  heading: 'A small studio that does serious work.',
  intro:
    'Lumora is a full-service digital studio. We design and build the website, run the growth ' +
    'behind it, ship the AI that takes work off your team, and protect the brand you’re growing — ' +
    'all under one roof, so the pieces actually work together.',
  founderNote:
    'We started Lumora because most businesses are forced to stitch together a web agency, a ' +
    'marketing agency, an AI shop, and a security consultant — none of whom talk to each other. ' +
    'We’d rather be the one team that owns the whole picture, ships fast, and tells you the honest ' +
    'truth about what will and won’t move your numbers.',
  values: [
    { title: 'Honest over impressive', body: 'Real, modest claims beat impressive, fabricated ones — every time.' },
    { title: 'One team, one picture', body: 'Web, growth, AI, and security that are designed to work together, not in silos.' },
    { title: 'Fixed quotes', body: 'Every project scoped and priced upfront on a free call. No surprise invoices.' },
    { title: 'Build for a living', body: 'We ship real products with modern tech — not slide decks and retainers.' },
  ],
};
