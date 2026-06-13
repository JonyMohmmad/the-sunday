// app/robots.ts
import type { MetadataRoute } from 'next';
import { SEO } from '@/lib/seo-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/api/', '/_next/', '/studio/'],
      },
    ],
    sitemap: `${SEO.siteUrl}/sitemap.xml`,
    host:    SEO.siteUrl,
  };
}
