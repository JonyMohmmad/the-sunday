// components/seo/JsonLd.tsx
// Renders JSON-LD structured data: Organization, WebSite, Service, FAQPage.
import { SEO } from '@/lib/seo-config';
import { PRICING, FAQ, SERVICES } from '@/lib/site';

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

function serviceSchema() {
  return {
    '@context':  'https://schema.org',
    '@type':     'Service',
    name:        'Web Design & Development',
    provider: {
      '@type': 'Organization',
      name:    SEO.organization.name,
      url:     SEO.organization.url,
    },
    description:
      'Custom web design and development — marketing websites, e-commerce '
      + 'stores, and web apps for businesses worldwide.',
    areaServed:  'Worldwide',
    serviceType: 'Web Design & Development Agency',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name:    'Services',
      itemListElement: SERVICES.map((s, i) => ({
        '@type':    'Offer',
        position:   i + 1,
        name:       s.title,
        description: s.body,
      })),
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
    serviceSchema(),
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
