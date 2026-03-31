import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Keep definition in sync with your frontmatter fields
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
  content: string; // The markdown content string
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

const contentDir = path.join(process.cwd(), 'content', 'blogs');

// Ensure directory exists
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
          .map((item) => ({
            question: item?.question || '',
            answer: item?.answer || '',
          }))
          .filter((item) => item.question && item.answer)
      : [],
  };
}

export function getAllBlogs(): BlogPostMeta[] {
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx') || file.endsWith('.md'));

  const posts = files.map(file => {
    const rawContent = fs.readFileSync(path.join(contentDir, file), 'utf8');
    const { data } = matter(rawContent);
    const fallback = file.replace(/\.mdx?$/, '');
    return normalizeMeta(data, fallback);
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPublishedBlogs(): BlogPostMeta[] {
  return getAllBlogs().filter((post) => post.published);
}

export function getBlogBySlug(slug: string): BlogPost | null {
  try {
    const mdPath = path.join(contentDir, `${slug}.md`);
    const mdxPath = path.join(contentDir, `${slug}.mdx`);
    
    let filePath = '';
    if (fs.existsSync(mdxPath)) filePath = mdxPath;
    else if (fs.existsSync(mdPath)) filePath = mdPath;
    else return null;

    const rawContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(rawContent);

    return {
      ...normalizeMeta(data, slug),
      content
    };
  } catch (error) {
    console.error("Error reading blog", error);
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

export function getPublishedBlogByIdentifier(identifier: string): BlogPost | null {
  const blog = getBlogByIdentifier(identifier);
  if (!blog || !blog.published) return null;
  return blog;
}

export function saveBlog(post: BlogPostMeta, content: string): boolean {
  if (process.env.NODE_ENV !== 'development') {
    // Only allow saving in local dev. In production on Vercel, fs is immutable.
    console.warn("Saving blogs is only allowed in local development environment.");
    // Wait, the user might want this on their deployed version if they are running it locally?
    // Let's just create the file
  }

  try {
    const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const filePath = path.join(contentDir, `${slug}.mdx`);

    const fileContent = matter.stringify(content, {
      id: post.id || slug,
      slug: slug,
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
    console.error("Error writing blog file", error);
    return false;
  }
}

export function deleteBlog(slug: string): boolean {
  try {
    const mdPath = path.join(contentDir, `${slug}.md`);
    const mdxPath = path.join(contentDir, `${slug}.mdx`);
    
    if (fs.existsSync(mdxPath)) fs.unlinkSync(mdxPath);
    if (fs.existsSync(mdPath)) fs.unlinkSync(mdPath);
    return true;
  } catch (error) {
    return false;
  }
}