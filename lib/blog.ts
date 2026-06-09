import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { kv } from '@vercel/kv';

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface BlogPostMeta {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  coverImage: string;
  views: number;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
  schemaType: "Article" | "BlogPosting" | "TechArticle";
  faq?: BlogFaqItem[];
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

// ─── KV type ──────────────────────────────────────────────────────────────────

type GuestSubmission = {
  id: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImagePath: string;
  content: string;
  name: string;
  occupation: string;
  faqText: string;
};

// ─── MDX helpers ─────────────────────────────────────────────────────────────

const contentDir = path.join(process.cwd(), 'content', 'blogs');

if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

function normalizeMeta(data: Record<string, any>, fallback: string): BlogPostMeta {
  return {
    id: data.id || fallback,
    slug: data.slug || fallback,
    title: data.title || '',
    excerpt: data.excerpt || '',
    author: data.author || '',
    authorRole: data.authorRole || '',
    date: data.date || new Date().toISOString(),
    readTime: data.readTime || '1 min',
    category: data.category || 'General',
    tags: Array.isArray(data.tags) ? data.tags : [],
    coverImage: data.coverImage || '',
    views: Number(data.views || 0),
    published: data.published === undefined ? false : Boolean(data.published),
    seoTitle: data.seoTitle || '',
    seoDescription: data.seoDescription || '',
    schemaType: data.schemaType || 'BlogPosting',
    faq: Array.isArray(data.faq)
      ? data.faq
          .map((item: any) => ({
            question: item?.question || '',
            answer: item?.answer || '',
          }))
          .filter((item: BlogFaqItem) => item.question && item.answer)
      : [],
  };
}

export function getAllBlogs(): BlogPostMeta[] {
  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'));

  return files
    .map((file) => {
      const rawContent = fs.readFileSync(path.join(contentDir, file), 'utf8');
      const { data } = matter(rawContent);
      const fallback = file.replace(/\.mdx?$/, '');
      return normalizeMeta(data, fallback);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogBySlug(slug: string): BlogPost | null {
  try {
    const mdxPath = path.join(contentDir, `${slug}.mdx`);
    const mdPath = path.join(contentDir, `${slug}.md`);

    let filePath = '';
    if (fs.existsSync(mdxPath)) filePath = mdxPath;
    else if (fs.existsSync(mdPath)) filePath = mdPath;
    else return null;

    const rawContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(rawContent);
    return { ...normalizeMeta(data, slug), content };
  } catch (error) {
    console.error('Error reading blog', error);
    return null;
  }
}

export function getBlogByIdentifier(identifier: string): BlogPost | null {
  if (!identifier) return null;
  const direct = getBlogBySlug(identifier);
  if (direct) return direct;
  const match = getAllBlogs().find(
    (post) => post.id === identifier || post.slug === identifier
  );
  return match ? getBlogBySlug(match.slug) : null;
}

export function saveBlog(post: BlogPostMeta, content: string): boolean {
  try {
    const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const filePath = path.join(contentDir, `${slug}.mdx`);
    const fileContent = matter.stringify(content, {
      id: post.id || slug,
      slug,
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      authorRole: post.authorRole,
      date: post.date,
      readTime: post.readTime,
      category: post.category,
      tags: post.tags,
      coverImage: post.coverImage,
      views: post.views,
      published: post.published,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      schemaType: post.schemaType,
      faq: post.faq || [],
    });
    fs.writeFileSync(filePath, fileContent, 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing blog file', error);
    return false;
  }
}

export function deleteBlog(slug: string): boolean {
  try {
    const mdxPath = path.join(contentDir, `${slug}.mdx`);
    const mdPath = path.join(contentDir, `${slug}.md`);
    if (fs.existsSync(mdxPath)) fs.unlinkSync(mdxPath);
    if (fs.existsSync(mdPath)) fs.unlinkSync(mdPath);
    return true;
  } catch {
    return false;
  }
}

// ─── KV helpers ───────────────────────────────────────────────────────────────

function estimateReadTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function parseFaq(faqText: string): BlogFaqItem[] {
  return faqText
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [q, ...a] = l.split('::');
      return { question: q.trim(), answer: a.join('::').trim() };
    })
    .filter((f) => f.question && f.answer);
}

function submissionToPost(s: GuestSubmission): BlogPost {
  return {
    id: s.id,
    slug: s.slug,
    title: s.title,
    excerpt: s.excerpt,
    author: s.name,
    authorRole: s.occupation,
    date: s.submittedAt,
    readTime: estimateReadTime(s.content),
    category: s.category,
    tags: s.tags,
    coverImage: s.coverImagePath,
    views: 0,
    published: true,
    seoTitle: s.title,
    seoDescription: s.excerpt,
    schemaType: 'BlogPosting',
    faq: parseFaq(s.faqText),
    content: s.content,
  };
}

async function getApprovedSubmissions(): Promise<BlogPost[]> {
  try {
    const all = await kv.get<GuestSubmission[]>('blog:submissions');
    if (!all) return [];
    return all
      .filter((s) => s.status === 'approved')
      .map(submissionToPost);
  } catch {
    return [];
  }
}

async function getApprovedSubmissionBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const all = await kv.get<GuestSubmission[]>('blog:submissions');
    if (!all) return null;
    const s = all.find(
      (s) => s.status === 'approved' && (s.slug === slug || s.id === slug)
    );
    return s ? submissionToPost(s) : null;
  } catch {
    return null;
  }
}

// ─── Public async API ─────────────────────────────────────────────────────────

export async function getPublishedBlogs(): Promise<BlogPost[]> {
  const [kvPosts, mdxMetas] = await Promise.all([
    getApprovedSubmissions(),
    Promise.resolve(getAllBlogs().filter((p) => p.published)),
  ]);

  // Resolve MDX metas to full BlogPost (with content)
  const mdxPosts = mdxMetas
    .map((meta) => getBlogBySlug(meta.slug))
    .filter((p): p is BlogPost => p !== null);

  // KV posts take precedence; dedupe by slug
  const seen = new Set(kvPosts.map((p) => p.slug));
  const merged = [...kvPosts, ...mdxPosts.filter((p) => !seen.has(p.slug))];

  return merged.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPublishedBlogByIdentifier(identifier: string): Promise<BlogPost | null> {
  const kvPost = await getApprovedSubmissionBySlug(identifier);
  if (kvPost) return kvPost;

  const mdxPost = getBlogByIdentifier(identifier);
  if (!mdxPost || !mdxPost.published) return null;
  return mdxPost;
}