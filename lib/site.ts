// lib/site.ts
// ─────────────────────────────────────────────────────────────────────────
// Single source of truth for Lumora Studio.
// Edit copy, pricing, services, and contact details here — components read
// from this file so the whole site stays consistent.
// ─────────────────────────────────────────────────────────────────────────

export const SITE = {
  brand: 'Lumora Studio',
  brandShort: 'Lumora',
  domain: 'https://lumorastudio.com',
  tagline: 'We design & build websites that grow your business.',

  // ── Primary conversion action ──────────────────────────────────────────
  // TODO: replace with your real Cal.com / Calendly scheduler link.
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
  eyebrow: 'Web design & development studio',
  headline1: 'Websites that win you',
  headline2: 'more customers.',
  body:
    'Lumora Studio designs and builds fast, beautiful websites, online stores, ' +
    'and web apps for ambitious businesses worldwide — engineered to turn ' +
    'visitors into paying customers.',
  proof: '150+ projects shipped · 40+ countries · 4.9/5 average rating',
};

// ── TRUST / LOGO WALL ──────────────────────────────────────────────────
export const CLIENTS = [
  'Aurora', 'Northbeam', 'Maison', 'Vertex', 'Lumen Health',
  'Caldera', 'Beacon', 'Orbit Labs', 'Saffron', 'Driftwood',
  'Helix', 'Monarch',
];

// ── SERVICES ───────────────────────────────────────────────────────────
export const SERVICES = [
  {
    key: 'business',
    title: 'Business & Marketing Websites',
    body:
      'Conversion-focused company sites, landing pages, and brand sites that ' +
      'make your business look world-class and book more leads.',
    points: ['Custom design', 'Copy that converts', 'CMS you can edit', 'SEO-ready'],
  },
  {
    key: 'ecommerce',
    title: 'E-commerce & Online Stores',
    body:
      'Shopify and custom storefronts built to sell — fast product pages, ' +
      'frictionless checkout, and an experience customers trust.',
    points: ['Shopify & headless', 'Optimised checkout', 'Payments & shipping', 'Conversion tuning'],
  },
  {
    key: 'webapps',
    title: 'Web Apps & SaaS Platforms',
    body:
      'Custom dashboards, customer portals, and full SaaS products — designed ' +
      'for clarity and built to scale with your users.',
    points: ['Product UX/UI', 'Dashboards & portals', 'API integrations', 'Auth & billing'],
  },
  {
    key: 'growth',
    title: 'Branding, SEO & Ongoing Care',
    body:
      'Design systems, technical SEO, performance, and a care plan that keeps ' +
      'your site fast, secure, and growing long after launch.',
    points: ['Brand & design systems', 'Technical SEO', 'Speed & Core Web Vitals', 'Maintenance plans'],
  },
];

// ── METRICS ────────────────────────────────────────────────────────────
export const METRICS = [
  { prefix: '', target: 150, suffix: '+', decimals: 0, label: 'Projects shipped', sub: 'across every industry' },
  { prefix: '', target: 40, suffix: '+', decimals: 0, label: 'Countries served', sub: 'clients on 5 continents' },
  { prefix: '', target: 2.7, suffix: '×', decimals: 1, label: 'Avg conversion lift', sub: 'after a Lumora rebuild' },
  { prefix: '', target: 4.9, suffix: '/5', decimals: 1, label: 'Average client rating', sub: 'from 120+ reviews' },
];

// ── WORK / CASE STUDIES ────────────────────────────────────────────────
// Industry tags drive the portfolio filter. Keep `key` in sync with each
// project's `industry` field below.
export const INDUSTRIES = [
  { key: 'all',       label: 'All work' },
  { key: 'ecommerce', label: 'E-commerce' },
  { key: 'saas',      label: 'SaaS' },
  { key: 'brand',      label: 'Brand & Web' },
  { key: 'webapp',     label: 'Web apps' },
  { key: 'health',     label: 'Healthcare' },
  { key: 'realestate', label: 'Real estate' },
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
  lighthouse: number;     // performance score badge (0–100)
  accent: string;         // gradient used in the browser-frame preview
};

export const getWorkBySlug = (slug: string): WorkProject | undefined =>
  WORK.find((w) => w.slug === slug);

export const WORK: WorkProject[] = [
  {
    slug: 'aurora-skincare',
    client: 'Aurora Skincare',
    industry: 'ecommerce',
    category: 'E-commerce · Shopify',
    url: 'aurora-skincare.com',
    liveUrl: 'https://aurora-skincare.com',
    year: '2025',
    duration: '4 weeks',
    summary: 'Rebuilt a slow DTC store into a fast, branded storefront.',
    overview:
      'Aurora is a fast-growing DTC skincare brand whose Shopify store had outgrown its theme — ' +
      'beautiful product, but a sluggish, generic storefront that leaked revenue on mobile.',
    challenge:
      'A 4.2-second mobile load time and a cluttered product page were quietly costing Aurora sales. ' +
      'Bounce rates were high, the brand looked like every other template store, and checkout drop-off was steep.',
    approach: [
      'Rebuilt the storefront on Shopify Hydrogen for near-instant page loads.',
      'Designed a bespoke, editorial product page with social proof and sticky add-to-cart.',
      'Streamlined checkout and wired up Klaviyo flows for abandoned carts.',
    ],
    result: '+63% revenue',
    metric: 'in the first 90 days',
    results: [
      { value: '+63%',  label: 'Revenue in first 90 days' },
      { value: '0.9s',  label: 'Mobile load (was 4.2s)' },
      { value: '+41%',  label: 'Mobile conversion rate' },
    ],
    stack: ['Shopify Hydrogen', 'React', 'Tailwind CSS', 'Klaviyo'],
    lighthouse: 99,
    accent: 'linear-gradient(135deg,#f093fb,#f5576c)',
  },
  {
    slug: 'northbeam',
    client: 'Northbeam',
    industry: 'saas',
    category: 'SaaS · Marketing site',
    url: 'northbeam.io',
    liveUrl: 'https://northbeam.io',
    year: '2025',
    duration: '5 weeks',
    summary: 'New positioning and a high-converting marketing site.',
    overview:
      'Northbeam is a B2B analytics platform with a strong product but a marketing site that ' +
      'undersold it — vague messaging and a homepage that did not explain who it was for.',
    challenge:
      'Trial signups had plateaued. The old site led with features instead of outcomes, and the ' +
      'signup path was buried three clicks deep behind a generic hero.',
    approach: [
      'Reworked positioning around a single, sharp value proposition.',
      'Designed a conversion-first homepage with a one-click trial path.',
      'Built reusable section components so the team can ship new pages fast.',
    ],
    result: '2.1× signups',
    metric: 'month-over-month',
    results: [
      { value: '2.1×',  label: 'Trial signups MoM' },
      { value: '−34%',  label: 'Bounce on homepage' },
      { value: '+28%',  label: 'Demo requests' },
    ],
    stack: ['Next.js', 'TypeScript', 'Sanity CMS', 'Vercel'],
    lighthouse: 100,
    accent: 'linear-gradient(135deg,#4facfe,#00f2fe)',
  },
  {
    slug: 'maison-atelier',
    client: 'Maison Atelier',
    industry: 'brand',
    category: 'Brand & Web · Custom',
    url: 'maisonatelier.studio',
    liveUrl: 'https://maisonatelier.studio',
    year: '2024',
    duration: '6 weeks',
    summary: 'Full rebrand and bespoke website for a design house.',
    overview:
      'Maison Atelier is a high-end interior design house that needed a digital presence as ' +
      'considered as its work — a site that felt like a gallery, not a brochure.',
    challenge:
      'Their existing site looked dated and generic, attracting low-budget enquiries and failing to ' +
      'convey the studio’s craft. They needed organic leads that matched their premium positioning.',
    approach: [
      'Developed a new visual identity, type system, and art direction.',
      'Built an immersive, image-led portfolio with buttery scroll interactions.',
      'Implemented technical SEO and a structured enquiry flow to qualify leads.',
    ],
    result: '+48% leads',
    metric: 'from organic traffic',
    results: [
      { value: '+48%',  label: 'Qualified leads (organic)' },
      { value: '3.4×',  label: 'Avg. session duration' },
      { value: '#1',    label: 'Ranking for key local terms' },
    ],
    stack: ['Next.js', 'Framer Motion', 'Sanity CMS', 'Vercel'],
    lighthouse: 98,
    accent: 'linear-gradient(135deg,#667eea,#764ba2)',
  },
  {
    slug: 'vertex-analytics',
    client: 'Vertex Analytics',
    industry: 'webapp',
    category: 'Web app · Dashboard',
    url: 'app.vertexanalytics.io',
    liveUrl: 'https://app.vertexanalytics.io',
    year: '2025',
    duration: '9 weeks',
    summary: 'Designed and built an analytics dashboard from scratch.',
    overview:
      'Vertex needed a customer-facing analytics dashboard that turned dense data into decisions — ' +
      'fast, legible, and good enough to demo on a sales call.',
    challenge:
      'Customers churned because the old reporting was slow and confusing. Vertex needed a product ' +
      'UX that surfaced the right numbers instantly and felt effortless to navigate.',
    approach: [
      'Mapped the core jobs-to-be-done and designed a focused dashboard IA.',
      'Built fast, virtualized data views and clear, glanceable charts.',
      'Shipped a design system so new features stay consistent and quick to build.',
    ],
    result: '−40% churn',
    metric: 'after the redesign',
    results: [
      { value: '−40%',  label: 'Monthly churn' },
      { value: '+55%',  label: 'Daily active users' },
      { value: '120ms', label: 'Median view render' },
    ],
    stack: ['Next.js', 'TypeScript', 'TanStack', 'Postgres'],
    lighthouse: 97,
    accent: 'linear-gradient(135deg,#43e97b,#38f9d7)',
  },
  {
    slug: 'lumen-health',
    client: 'Lumen Health',
    industry: 'health',
    category: 'Healthcare · Marketing + booking',
    url: 'lumenhealth.care',
    liveUrl: 'https://lumenhealth.care',
    year: '2025',
    duration: '5 weeks',
    summary: 'A trustworthy clinic site with online appointment booking.',
    overview:
      'Lumen Health is a multi-location clinic that relied on phone bookings. They wanted a ' +
      'reassuring, accessible site that let patients book online without friction.',
    challenge:
      'Phone lines were overwhelmed and the old site was not accessible or mobile-friendly. ' +
      'Patients struggled to find services and book, so appointments were being lost.',
    approach: [
      'Designed a calm, WCAG-compliant interface that builds trust.',
      'Integrated real-time online booking across all clinic locations.',
      'Optimised local SEO so each location ranks in its own area.',
    ],
    result: '+72% bookings',
    metric: 'within two months',
    results: [
      { value: '+72%',  label: 'Online bookings' },
      { value: '−45%',  label: 'Booking phone calls' },
      { value: 'AA',    label: 'WCAG accessibility' },
    ],
    stack: ['Next.js', 'TypeScript', 'Cal.com', 'Vercel'],
    lighthouse: 100,
    accent: 'linear-gradient(135deg,#0ba360,#3cba92)',
  },
  {
    slug: 'driftwood-estates',
    client: 'Driftwood Estates',
    industry: 'realestate',
    category: 'Real estate · Listings site',
    url: 'driftwoodestates.com',
    liveUrl: 'https://driftwoodestates.com',
    year: '2024',
    duration: '6 weeks',
    summary: 'A premium listings site for a boutique property firm.',
    overview:
      'Driftwood is a boutique real-estate firm selling coastal properties. They needed a site that ' +
      'made every listing feel aspirational and captured high-intent enquiries.',
    challenge:
      'Listings lived on a clunky third-party portal with no brand and poor imagery. High-value ' +
      'buyers bounced, and the firm had no way to capture or nurture leads.',
    approach: [
      'Built a bespoke, filterable listings experience with cinematic galleries.',
      'Designed a brand and site that signals trust to high-net-worth buyers.',
      'Added saved-search and enquiry capture wired to the firm’s CRM.',
    ],
    result: '+2.4× enquiries',
    metric: 'on featured listings',
    results: [
      { value: '2.4×',  label: 'Enquiries on featured homes' },
      { value: '+58%',  label: 'Time on listing pages' },
      { value: '1.1s',  label: 'Gallery load time' },
    ],
    stack: ['Next.js', 'Mapbox', 'Sanity CMS', 'HubSpot'],
    lighthouse: 98,
    accent: 'linear-gradient(135deg,#fa709a,#fee140)',
  },
];

// ── PROCESS ────────────────────────────────────────────────────────────
export const PROCESS = [
  {
    number: '01',
    title: 'Discovery & strategy',
    body:
      'We start with a call to understand your business, customers, and goals — ' +
      'then map the exact site that will move your numbers. No templates, no guesswork.',
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
      'We engineer a fast, accessible, SEO-ready site with the latest web tech — ' +
      'tested across devices and built to load in under two seconds.',
  },
  {
    number: '04',
    title: 'Launch & grow',
    body:
      'We launch, measure, and optimise. With a care plan, we keep improving ' +
      'conversion, speed, and SEO so your site keeps paying for itself.',
  },
];

// ── PRICING ────────────────────────────────────────────────────────────
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

// ── TESTIMONIALS ───────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    quote:
      'Lumora rebuilt our store and the difference was immediate — it loads instantly, looks premium, and our sales jumped within weeks. Best money we have spent on the business.',
    name: 'Elena Rossi',
    role: 'Founder',
    company: 'Aurora Skincare',
    initials: 'ER',
    gradient: 'linear-gradient(135deg,#f093fb,#f5576c)',
  },
  {
    quote:
      'They understood our SaaS better than agencies we had paid 5× more. The new marketing site doubled our trial signups and the team was a genuine pleasure to work with.',
    name: 'David Chen',
    role: 'CEO',
    company: 'Northbeam',
    initials: 'DC',
    gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)',
  },
  {
    quote:
      'From branding to the final build, Lumora delivered something we are proud to show clients. Communication was clear, deadlines were met, and the quality is world-class.',
    name: 'Amara Okafor',
    role: 'Creative Director',
    company: 'Maison Atelier',
    initials: 'AO',
    gradient: 'linear-gradient(135deg,#667eea,#764ba2)',
  },
];

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
      'Our projects start at $2,500 for a marketing site and $6,000 for a custom site or online ' +
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
      'Yes. We are a fully remote studio and work with clients across more than 40 countries. ' +
      'We schedule calls around your time zone and communicate clearly throughout the project.',
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
];

// ── FINAL CTA ──────────────────────────────────────────────────────────
export const FINAL_CTA = {
  eyebrow: 'Ready when you are',
  headline: 'Let’s build a website that grows your business.',
  body:
    'Book a free 30-minute call. We’ll talk through your goals, show you what’s possible, ' +
    'and give you a clear plan and price — whether you work with us or not.',
  note: 'No pressure. No jargon. Just honest advice from people who build for a living.',
};
