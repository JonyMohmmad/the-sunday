// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import Link             from 'next/link';
import { notFound }     from 'next/navigation';
import { MDXRemote }    from 'next-mdx-remote/rsc';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { SEO } from '@/lib/seo-config';
import { SITE } from '@/lib/site';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title:       post.title,
    description: post.description,
    authors:     [{ name: post.author }],
    keywords:    post.tags,
    alternates:  { canonical: `${SEO.siteUrl}/blog/${slug}` },
    openGraph: {
      title:         post.title,
      description:   post.description,
      url:           `${SEO.siteUrl}/blog/${slug}`,
      type:          'article',
      publishedTime: post.publishedAt,
      modifiedTime:  post.updatedAt ?? post.publishedAt,
      authors:       [post.author],
      tags:          post.tags,
    },
    twitter: {
      card:        'summary_large_image',
      title:       post.title,
      description: post.description,
    },
  };
}

function ArticleJsonLd({ post }: { post: NonNullable<ReturnType<typeof getPostBySlug>> }) {
  const schema = {
    '@context':    'https://schema.org',
    '@type':       'Article',
    headline:      post.title,
    description:   post.description,
    author: {
      '@type': 'Organization',
      name:    SEO.organization.name,
      url:     SEO.organization.url,
    },
    publisher: {
      '@type': 'Organization',
      name:    SEO.organization.name,
      logo:    SEO.organization.logo,
    },
    datePublished: post.publishedAt,
    dateModified:  post.updatedAt ?? post.publishedAt,
    keywords:      post.tags.join(', '),
    url:           `${SEO.siteUrl}/blog/${post.slug}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main style={{ minHeight: '100vh', padding: '140px 24px 80px' }}>
        <ArticleJsonLd post={post} />

        <article style={{ maxWidth: 680, margin: '0 auto' }}>
          <Link
            href="/blog"
            style={{ fontSize: 13, color: 'var(--text-2)', textDecoration: 'none', marginBottom: 24, display: 'inline-block' }}
          >
            ← All articles
          </Link>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {post.tags.map((tag) => (
              <span key={tag} style={{
                fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'var(--text-2)', background: 'var(--surface)',
                border: '1px solid var(--border)', borderRadius: 6, padding: '2px 8px',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text)', lineHeight: 1.1, marginBottom: 24,
          }}>
            {post.title}
          </h1>

          {/* Meta */}
          <div style={{
            display: 'flex', gap: 24, fontSize: 13, color: 'var(--text-2)',
            paddingBottom: 32, borderBottom: '1px solid var(--border)', marginBottom: 48,
          }}>
            <span>{post.author}</span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </span>
            <span>{post.readTime}</span>
          </div>

          {/* MDX Content */}
          <div className="blog-prose">
            <MDXRemote source={post.content} />
          </div>

          {/* Bottom CTA */}
          <div style={{
            marginTop: 64, padding: '2rem', background: 'rgba(59,130,246,0.05)',
            border: '1px solid rgba(59,130,246,0.3)', borderRadius: 16,
          }}>
            <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
              Thinking about a new website?
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-2)', marginBottom: 20, lineHeight: 1.6 }}>
              Book a free 30-minute call and we&apos;ll give you a clear plan and price
              for your project — wherever you are in the world.
            </p>
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block', background: 'var(--cta)', color: '#fff',
                fontWeight: 600, fontSize: 14, padding: '10px 20px',
                borderRadius: 10, textDecoration: 'none',
              }}
            >
              {SITE.bookingLabel} →
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
