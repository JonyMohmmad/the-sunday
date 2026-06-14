// app/blog/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import { getAllPosts } from '@/lib/blog';
import { SEO } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Blog — Web Design, Development & Growth Insights',
  description:
    'Practical guides on web design, development, performance, SEO, and conversion '
    + 'from the team at Lumora Studio.',
  alternates: { canonical: `${SEO.siteUrl}/blog` },
  openGraph: {
    title: `Blog | ${SEO.siteName}`,
    description: 'Web design, development, and growth insights from Lumora Studio.',
    url: `${SEO.siteUrl}/blog`,
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main style={{ minHeight: '100vh', padding: '140px 24px 80px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto 56px' }}>
          <p
            style={{
              fontSize: 12,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#93c5fd',
              marginBottom: 16,
            }}
          >
            Insights
          </p>
          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              lineHeight: 1.05,
              marginBottom: 16,
            }}
          >
            Ideas that help your business grow online.
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.6 }}>
            Guides on web design, development, performance, SEO, and conversion — written
            for founders and teams, not engineers.
          </p>
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gap: 24 }}>
          {posts.length === 0 ? (
            <p style={{ color: 'var(--text-2)', fontSize: 14 }}>No posts published yet. Check back soon.</p>
          ) : (
            posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <article
                  className="hover:border-[rgba(59,130,246,0.4)]"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    padding: '1.75rem',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 11,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: 'var(--text-2)',
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          borderRadius: 6,
                          padding: '2px 8px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 8, lineHeight: 1.3 }}>
                    {post.title}
                  </h2>

                  <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 16 }}>
                    {post.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-3)' }}>
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
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
      <Footer />
    </>
  );
}
