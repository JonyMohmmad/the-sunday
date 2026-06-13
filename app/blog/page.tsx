// app/blog/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { SEO } from '@/lib/seo-config';

export const metadata: Metadata = {
  title:       'Blog â€” Shopify CRO Insights for Streetwear & Anime Brands',
  description: 'Conversion rate optimisation guides, case studies, and drop-day '
             + 'performance tips for DTC streetwear and anime fashion brands.',
  alternates: { canonical: `${SEO.siteUrl}/blog` },
  openGraph: {
    title:       'Blog | ' + SEO.siteName,
    description: 'CRO insights for streetwear & anime Shopify brands.',
    url:         `${SEO.siteUrl}/blog`,
    type:        'website',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main style={{ backgroundColor: '#0A0A0B', minHeight: '100vh', padding: '120px 24px 80px' }}>

      {/* Page header */}
      <div style={{ maxWidth: 800, margin: '0 auto 64px' }}>
        <p style={{
          fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: '#A1A1AA', marginBottom: 16,
        }}>
          Insights
        </p>
        <h1 style={{
          fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
          fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800,
          color: '#FAFAFA', lineHeight: 1.0, marginBottom: 16,
        }}>
          Shopify CRO for<br />
          <em style={{ color: '#CCFF00', fontStyle: 'italic' }}>streetwear &amp; anime.</em>
        </h1>
        <p style={{ fontSize: 16, color: '#A1A1AA', lineHeight: 1.6 }}>
          Conversion guides, performance tips, and drop-day playbooks
          for DTC fashion brands.
        </p>
      </div>

      {/* Post grid */}
      <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gap: 24 }}>
        {posts.length === 0 ? (
          <p style={{ color: '#A1A1AA', fontSize: 14 }}>
            {/* TODO: remove this message once posts are published */}
            No posts published yet. Check back soon.
          </p>
        ) : (
          posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <article style={{
                backgroundColor: '#141416', border: '1px solid #232327',
                borderRadius: 12, padding: '1.5rem',
                transition: 'border-color 0.2s ease',
              }}>
                {/* Tags */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} style={{
                      fontSize: 11, letterSpacing: '0.08em',
                      textTransform: 'uppercase', color: '#A1A1AA',
                      backgroundColor: '#0A0A0B', border: '1px solid #232327',
                      borderRadius: 4, padding: '2px 8px',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 style={{
                  fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
                  fontSize: 20, fontWeight: 600, color: '#FAFAFA',
                  marginBottom: 8, lineHeight: 1.3,
                }}>
                  {post.title}
                </h2>

                {/* Description */}
                <p style={{ fontSize: 14, color: '#A1A1AA', lineHeight: 1.6, marginBottom: 16 }}>
                  {post.description}
                </p>

                {/* Meta row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#A1A1AA' }}>
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </span>
                  <span>{post.readTime}</span>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
