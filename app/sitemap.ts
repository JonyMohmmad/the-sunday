// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SEO } from '@/lib/seo-config';

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Static routes â€” add blog post slugs here as you publish them.
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url:             SEO.siteUrl,
      lastModified:    now,
      changeFrequency: 'weekly',
      priority:        1.0,
    },
    {
      url:             `${SEO.siteUrl}/blog`,
      lastModified:    now,
      changeFrequency: 'weekly',
      priority:        0.8,
    },
  ];

  // TODO: when blog posts exist, dynamically import slugs here:
  // const posts = await getAllPosts(); // from lib/blog.ts
  // const blogRoutes = posts.map(post => ({
  //   url:             `${SEO.siteUrl}/blog/${post.slug}`,
  //   lastModified:    post.updatedAt ?? post.publishedAt,
  //   changeFrequency: "monthly" as const,
  //   priority:        0.6,
  // }));
  // return [...staticRoutes, ...blogRoutes];

  return staticRoutes;
}
