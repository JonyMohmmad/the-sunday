// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import Link             from 'next/link';
import { notFound }     from 'next/navigation';
import { MDXRemote }    from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { SEO } from '@/lib/seo-config';

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
    <main style={{ backgroundColor: '#0A0A0B', minHeight: '100vh', padding: '120px 24px 80px' }}>
      <ArticleJsonLd post={post} />

      <article style={{ maxWidth: 680, margin: '0 auto' }}>
        {/* Tags */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {post.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: '#A1A1AA', backgroundColor: '#141416',
              border: '1px solid #232327', borderRadius: 4, padding: '2px 8px',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
          fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800,
          color: '#FAFAFA', lineHeight: 1.1, marginBottom: 24,
        }}>
          {post.title}
        </h1>

        {/* Meta */}
        <div style={{
          display: 'flex', gap: 24, fontSize: 13, color: '#A1A1AA',
          paddingBottom: 32, borderBottom: '1px solid #232327', marginBottom: 48,
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
          marginTop: 64, padding: '2rem', backgroundColor: '#141416',
          border: '1px solid #232327', borderRadius: 12,
        }}>
          <p style={{
            fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
            fontSize: 20, fontWeight: 600, color: '#FAFAFA', marginBottom: 8,
          }}>
            Want us to audit your store?
          </p>
          <p style={{ fontSize: 14, color: '#A1A1AA', marginBottom: 20 }}>
            We&apos;ll review your Shopify store&apos;s CRO, speed, and mobile UX —
            and send you a Loom walkthrough within 48 hours. Free.
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block', backgroundColor: '#CCFF00', color: '#0A0A0B',
              fontWeight: 600, fontSize: 14, padding: '10px 20px',
              borderRadius: 6, textDecoration: 'none',
            }}
          >
            Get a free audit →
          </Link>
        </div>
      </article>
    </main>
  );
}
