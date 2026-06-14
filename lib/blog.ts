// lib/blog.ts
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// MDX blog post utilities. Posts live in /content/blog/*.mdx
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

import fs          from 'fs';
import path        from 'path';
import matter      from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
  slug:        string;
  title:       string;
  description: string;
  publishedAt: string;
  updatedAt?:  string;
  author:      string;
  tags:        string[];
  readTime:    string;
  draft?:      boolean;
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw  = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8');
      const { data, content } = matter(raw);
      const rt = readingTime(content);

      return {
        slug,
        title:       data.title       ?? 'Untitled',
        description: data.description ?? '',
        publishedAt: data.publishedAt ?? new Date().toISOString(),
        updatedAt:   data.updatedAt,
        author:      data.author      ?? 'Lumora Studio',
        tags:        data.tags        ?? [],
        readTime:    rt.text,
        draft:       data.draft       ?? false,
      } satisfies BlogPost;
    })
    .filter((p) => !p.draft)
    .sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getPostBySlug(slug: string): BlogPostWithContent | null {
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;

  const raw = fs.readFileSync(filepath, 'utf-8');
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    slug,
    title:       data.title       ?? 'Untitled',
    description: data.description ?? '',
    publishedAt: data.publishedAt ?? new Date().toISOString(),
    updatedAt:   data.updatedAt,
    author:      data.author      ?? 'Lumora Studio',
    tags:        data.tags        ?? [],
    readTime:    rt.text,
    draft:       data.draft       ?? false,
    content,
  };
}

export function getAllTags(): string[] {
  const posts  = getAllPosts();
  const tagSet = new Set(posts.flatMap((p) => p.tags));
  return Array.from(tagSet).sort();
}
