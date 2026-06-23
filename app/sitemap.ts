// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SEO } from '@/lib/seo-config';
import { getAllPosts } from '@/lib/blog';
import { WORK } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SEO.siteUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SEO.siteUrl}/work`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SEO.siteUrl}/ai-agents`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SEO.siteUrl}/security`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SEO.siteUrl}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SEO.siteUrl}/process`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SEO.siteUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SEO.siteUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SEO.siteUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SEO.siteUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = WORK.map((w) => ({
    url: `${SEO.siteUrl}/work/${w.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SEO.siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.publishedAt,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes];
}
