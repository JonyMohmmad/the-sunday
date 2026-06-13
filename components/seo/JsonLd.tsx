// components/seo/JsonLd.tsx
// Renders JSON-LD structured data: Organization, WebSite, Service, FAQPage.
import { SEO } from '@/lib/seo-config';
import { COPY } from '@/lib/copy';

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
    name:        'Shopify CRO Redesign',
    provider: {
      '@type': 'Organization',
      name:    SEO.organization.name,
      url:     SEO.organization.url,
    },
    description:
      'Conversion rate optimisation and full Shopify store redesign for '
      + 'DTC streetwear and anime fashion brands.',
    areaServed:  ['US', 'GB', 'AU', 'CA'],
    serviceType: 'Ecommerce CRO Agency',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name:    'CRO Redesign Packages',
      itemListElement: COPY.pricing.cards.map((card, i) => ({
        '@type':       'Offer',
        position:      i + 1,
        name:          card.tier,
        price:         card.price.replace(/[^0-9]/g, ''),
        priceCurrency: 'USD',
        description:   card.description,
      })),
    },
  };
}

function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: COPY.faq.items.map((item) => ({
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
