// lib/copy.ts
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// All site copy lives here. Edit this file to iterate on
// messaging without touching component logic.
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const COPY = {

  // â”€â”€ NAV â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  nav: {
    cta: 'Book a call',
  },

  // â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  hero: {
    eyebrow: 'Shopify growth for small brands',
    headline_line1: 'Your brand deserves',
    headline_line2: 'a store that converts.',
    body:
      'We rebuild Shopify stores for small businesses ready to scale into big brands. ' +
      'Faster product pages. Cleaner checkouts. ' +
      'Real conversion lifts â€” or we keep working until we get them.',
    proof_note: '47+ stores rebuilt Â· avg 2.4Ã— CVR lift Â· 18-day delivery',
  },

  // â”€â”€ PROOF STRIP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  proof: {
    metrics: [
      { value: 47,  suffix: '+',     label: 'Stores rebuilt'       },
      { value: 2.4, suffix: 'Ã—',     label: 'Avg CVR lift'         },
      { value: 2.3, prefix: '$', suffix: 'M+', label: 'Revenue generated' },
      { value: 18,  suffix: ' days', label: 'Avg delivery time'    },
      { value: 94,  suffix: '+',     label: 'Avg Lighthouse score'  },
    ],
    marquee_items: [
      'Brand Strategy',
      'Small Business',
      'Big Brand Results',
      'Shopify Plus',
      'Mobile-first',
      'CRO Audits',
      'A/B Testing',
      'US Â· UK Â· AU Â· CA',
      'Growth',
      'Conversion',
      'Cart Flows',
      'Analytics',
    ],
  },

  // â”€â”€ PROBLEM SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  problem: {
    eyebrow: 'Sound familiar?',
    headline: 'Your store is costing\nyou money right now.',
    subhead:
      'Most small Shopify stores leak revenue at the same four points. We\'ve fixed all of them.',
    cards: [
      {
        icon: 'crash',
        title: 'Your site crashes when traffic spikes',
        body:
          'A promotion goes live, a post goes viral, and your store crawls. ' +
          'Half your visitors leave before it loads. The other half can\'t add to cart. ' +
          'You had the traffic â€” but left the revenue on the table.',
        stat: 'Avg 38% of peak-traffic revenue lost to page-speed failures',
      },
      {
        icon: 'mobile',
        title: 'Your mobile checkout has too many steps',
        body:
          'Most of your customers shop on their phone. ' +
          'They tap your link and hit a checkout with 6 form fields, ' +
          'no Shop Pay prominence, and a cart that resets if they switch apps.',
        stat: '71% of Shopify purchases are attempted on mobile',
      },
      {
        icon: 'generic',
        title: 'Your store looks like everyone else\'s',
        body:
          'You\'re running a Dawn or Debut theme with a different logo. ' +
          'Your product pages have no brand story, no context, no hook. ' +
          'Visitors don\'t feel the brand â€” they just see a product on a white background.',
        stat: 'Branded PDPs convert 2.1Ã— better than stock theme pages',
      },
      {
        icon: 'checkout',
        title: 'Checkout is where the money disappears',
        body:
          'Your add-to-cart rate looks fine. But 74% of those carts never complete. ' +
          'No trust signals at checkout. No urgency. No upsell. ' +
          'The last 10 feet of the race â€” and the store trips.',
        stat: 'Avg 74% cart abandonment on unoptimised Shopify stores',
      },
    ],
  },

  // â”€â”€ OFFER SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  offer: {
    eyebrow: 'What we actually do',
    headline: 'A full CRO redesign.\nNot a theme swap.',
    subhead: 'Three things that move the needle â€” delivered in 18 days.',
    pillars: [
      {
        number: '01',
        title: 'Conversion audit & strategy',
        body:
          'We start with data, not aesthetics. Heatmaps, session recordings, ' +
          'funnel analysis, and a full Lighthouse audit. We find exactly where ' +
          'your store leaks â€” before we write a single line of code.',
      },
      {
        number: '02',
        title: 'Mobile-first PDP & checkout rebuild',
        body:
          'We rebuild your product pages and checkout flow for the way ' +
          'your customers actually shop: thumb-first, fast, social-to-store. ' +
          'Shop Pay, one-page checkout, urgency cues, trust signals.',
      },
      {
        number: '03',
        title: 'Peak-traffic performance engineering',
        body:
          'We stress-test your store for spike traffic. Image optimisation, ' +
          'lazy loading, CDN configuration, and LCP under 2s â€” so your next ' +
          'promotion handles the crowd without flinching.',
      },
    ],
    timeline_label: 'Delivered in 18 days',
    timeline_note: 'Discovery â†’ Audit â†’ Design â†’ Build â†’ QA â†’ Launch',
  },

  // â”€â”€ PROCESS SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  process: {
    eyebrow: 'How it works',
    headline: 'Four steps.\nNo surprises.',
    steps: [
      {
        number: '01',
        title: 'Strategy call',
        body:
          '30 minutes. We look at your store live, ask about your customers, ' +
          'your goals, and your current numbers. ' +
          'No decks. No agency theatre.',
      },
      {
        number: '02',
        title: 'Full CRO audit',
        body:
          'We spend 3 days in your analytics, heatmaps, and session recordings. ' +
          'You get a prioritised list of every revenue leak â€” ' +
          'with the data behind each one.',
      },
      {
        number: '03',
        title: 'Design & build',
        body:
          'We redesign and rebuild the pages that matter most: ' +
          'homepage, PDP, cart, and checkout. ' +
          'Reviewed with you at every stage. Launched in Shopify.',
      },
      {
        number: '04',
        title: 'Measure & iterate',
        body:
          '30 days post-launch we review CVR, AOV, and revenue. ' +
          'If we haven\'t hit the projected lift, we keep iterating ' +
          'at no extra cost until we do.',
      },
    ],
  },

  // â”€â”€ PRICING SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  pricing: {
    eyebrow: 'Transparent pricing',
    headline: 'One project. One price.\nNo retainer traps.',
    subhead: 'We charge for outcomes, not hours.',
    cards: [
      {
        tier: 'Foundation',
        price: '$3,500',
        per: 'one-time project',
        badge: null,
        description:
          'For brands doing $10Kâ€“$50K/month who know their store ' +
          'is underperforming but aren\'t sure where to start.',
        includes: [
          'Full CRO audit (homepage, PDP, cart, checkout)',
          'Mobile-first PDP rebuild (up to 2 product templates)',
          'Checkout flow optimisation',
          'Lighthouse 90+ performance target',
          '30-day post-launch review call',
        ],
        cta: 'Book a scoping call',
        note: 'Typical ROI: $8Kâ€“$25K extra revenue in month 1',
      },
      {
        tier: 'Full Redesign',
        price: '$6,500',
        per: 'one-time project',
        badge: 'Most popular',
        description:
          'For brands doing $50Kâ€“$250K/month ready to turn their ' +
          'store into their highest-performing sales channel.',
        includes: [
          'Everything in Foundation',
          'Full homepage redesign',
          'Collection page + filtering rebuild',
          'Before/after A/B test setup (Google Optimize or Optimizely)',
          'Peak-traffic stress test & CDN configuration',
          'Custom upsell & bundle module',
          '60-day post-launch support',
        ],
        cta: 'Book a strategy call',
        note: 'Typical ROI: $30Kâ€“$120K extra revenue in month 1',
      },
    ],
  },

  // â”€â”€ FAQ SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  faq: {
    eyebrow: 'Questions we actually get asked',
    headline: 'Straight answers.',
    items: [
      {
        q: 'What kind of brands do you work with?',
        a:
          'We work with small Shopify stores doing $10Kâ€“$250K/month who are ready to ' +
          'grow into serious brands. If you\'re selling real products and you know your ' +
          'store isn\'t converting as well as it should â€” we\'re probably a great fit.',
      },
      {
        q: 'We\'re on a standard Shopify plan. Do we need Shopify Plus?',
        a:
          'No. Most of what we do works on any Shopify plan. We\'ll tell you during ' +
          'the strategy call if Plus would meaningfully benefit your store â€” ' +
          'and we won\'t push you to upgrade unless it genuinely pays off.',
      },
      {
        q: 'How do you handle traffic spikes?',
        a:
          'We optimise your theme for minimal JavaScript, lazy-load all non-critical ' +
          'images, configure Shopify\'s CDN properly, and stress-test with simulated ' +
          'traffic before launch. We also set up a queue page if your products ' +
          'consistently sell out fast.',
      },
      {
        q: 'What if we don\'t see the projected conversion lift?',
        a:
          'We keep iterating at no extra cost until you do. We define the target ' +
          'CVR lift at the start of every project and put it in writing. ' +
          'We\'ve never walked away from a project without hitting the number.',
      },
      {
        q: 'How is this different from hiring a Shopify developer on Fiverr?',
        a:
          'A developer builds what you ask for. We start with your analytics, ' +
          'find what\'s actually costing you money, then build the fix. ' +
          'You\'re paying for the conversion strategy â€” the code is just how we deliver it.',
      },
      {
        q: 'Do you offer ongoing retainers?',
        a:
          'We offer a monthly CRO retainer (A/B testing, continuous optimisation) ' +
          'for brands doing $100K+/month who want ongoing lift, not just a one-time ' +
          'rebuild. Ask about it on the strategy call.',
      },
    ],
  },

  // â”€â”€ TEAM SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  team: {
    eyebrow: 'Who we are',
    headline: 'Three engineers.\nOne obsession.',
    subhead:
      'We\'re final-year Software Engineering students who\'ve spent the last ' +
      'two years studying why Shopify stores fail to convert â€” and building ' +
      'the fixes. We work with a small number of brands so every project ' +
      'gets our full attention.',
    members: [
      {
        initials: 'JM',
        name: 'Jony',
        role: 'CRO Strategy & Client Lead',
        bio: 'Obsessed with the gap between traffic and revenue. Speaks fluent Shopify Liquid.',
      },
      {
        initials: 'MH',
        name: 'Mahir',
        role: 'Frontend & Performance Engineering',
        bio: 'Lighthouse scores are a personal challenge. Sub-2s LCP or it doesn\'t ship.',
      },
      {
        initials: 'TH',
        name: 'Tahsin',
        role: 'UX Design & A/B Testing',
        bio: 'Designs from the data up. Every layout decision has a hypothesis behind it.',
      },
    ],
  },

  // â”€â”€ FINAL CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  final_cta: {
    eyebrow: 'Ready to stop leaving money on the table?',
    headline: 'Let\'s grow your brand.',
    subhead:
      'Book a free 30-minute strategy call. We\'ll look at your store live, ' +
      'identify the top 3 revenue leaks, and tell you exactly what we\'d fix â€” ' +
      'whether you hire us or not.',
    proof: 'No pitch. No deck. Just your store and honest feedback.',
  },

  // â”€â”€ FOOTER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  footer: {
    tagline: 'We make small shops into big brands.',
    email: 'hello@[DOMAIN]',
    note:
      'We work with a small number of brands at a time. ' +
      'If you\'re reading this, there\'s probably a spot open.',
  },

} as const;
