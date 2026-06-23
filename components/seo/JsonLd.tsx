// components/seo/JsonLd.tsx
// Renders JSON-LD structured data: Organization, WebSite, ProfessionalService, FAQPage.
import { SEO } from '@/lib/seo-config';
import { FAQ, PILLARS } from '@/lib/site';

function organizationSchema() {
  return {
    '@context':   'https://schema.org',
    '@type':      'Organization',
    name:         SEO.organization.name,
    url:          SEO.organization.url,
    logo:         SEO.organization.logo,
    foundingDate: SEO.organization.foundingYear,
    sameAs:       SEO.organization.sameAs,
    contactPoint: {
      '@type':     'ContactPoint',
      email:       SEO.organization.contactPoint.email,
      contactType: SEO.organization.contactPoint.contactType,
    },
  };
}

function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    name:       SEO.siteName,
    url:        SEO.siteUrl,
    potentialAction: {
      '@type':       'SearchAction',
      target:        `${SEO.siteUrl}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

function professionalServiceSchema() {
  // Flatten the four pillars into a single offer catalog.
  const offers = PILLARS.flatMap((pillar) =>
    pillar.services.map((s) => ({
      '@type': 'Offer',
      name: s.name,
      category: pillar.title,
      description: s.body,
    })),
  );

  return {
    '@context':  'https://schema.org',
    '@type':     'ProfessionalService',
    name:        SEO.organization.name,
    url:         SEO.organization.url,
    logo:        SEO.organization.logo,
    image:       SEO.organization.logo,
    description: SEO.defaultDescription,
    provider: {
      '@type': 'Organization',
      name:    SEO.organization.name,
      url:     SEO.organization.url,
    },
    areaServed:  'Worldwide',
    serviceType: [
      'Web Design & Development',
      'Growth & Digital Marketing',
      'AI Agents & Automation',
      'Digital Security & Protection',
    ],
    sameAs: SEO.organization.sameAs,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name:    'Services',
      itemListElement: offers.map((offer, i) => ({ ...offer, position: i + 1 })),
    },
  };
}

function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name:    item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text:    item.a,
      },
    })),
  };
}

export default function JsonLd() {
  const schemas = [
    organizationSchema(),
    websiteSchema(),
    professionalServiceSchema(),
    faqSchema(),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
