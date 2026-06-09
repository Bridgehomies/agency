import { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ArticleViewClient from "@/components/ArticleViewClient";
import { getAllBlogs, getPublishedBlogByIdentifier, getPublishedBlogs } from "@/lib/blog";

function escapeInline(value: string) {
  return value.replace(/\n/g, " ").trim();
}

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map((item) => String(item)) : [];
}

function extractBlocks(value: unknown) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (Array.isArray(record.blocks)) return record.blocks;
    if (Array.isArray(record.content)) return record.content;
    if (Array.isArray(record.body)) return record.body;
  }
  return [];
}

function renderJsonBlock(block: Record<string, unknown>) {
  const type = typeof block.type === "string" ? block.type : "paragraph";

  if (type === "heading") {
    const level = Math.min(6, Math.max(1, Number(block.level || 2)));
    return `${"#".repeat(level)} ${escapeInline(String(block.text || ""))}`;
  }
  if (type === "paragraph") return String(block.text || "");
  if (type === "list") {
    const ordered = Boolean(block.ordered);
    return toStringArray(block.items)
      .map((item, index) => `${ordered ? `${index + 1}.` : "-"} ${escapeInline(item)}`)
      .join("\n");
  }
  if (type === "quote") return `> ${String(block.text || "").split("\n").join("\n> ")}`;
  if (type === "code") return `\`\`\`${String(block.language || "")}\n${String(block.code || "")}\n\`\`\``;
  if (type === "html") return String(block.html || "");
  if (type === "markdown") return String(block.value || "");
  return typeof block.text === "string" ? block.text : "";
}

function normalizeBlogContent(raw: string) {
  const source = raw.trim();
  if (!source) return "";
  if (!(source.startsWith("{") || source.startsWith("["))) return raw;
  try {
    const parsed = JSON.parse(source);
    const blocks = extractBlocks(parsed);
    if (blocks.length === 0) return raw;
    return blocks
      .map((block) => renderJsonBlock((block || {}) as Record<string, unknown>))
      .filter(Boolean)
      .join("\n\n");
  } catch {
    return raw;
  }
}

// ─── Static params: MDX files + approved KV submissions ───────────────────────

export async function generateStaticParams() {
  const [mdxSlugs, kvPosts] = await Promise.all([
    Promise.resolve(getAllBlogs().map((blog) => ({ slug: blog.slug }))),
    // getPublishedBlogs() returns merged MDX + KV — dedupe by slug
    import("@/lib/blog").then((m) =>
      m.getPublishedBlogs().then((posts) => posts.map((p) => ({ slug: p.slug })))
    ),
  ]);

  const seen = new Set<string>();
  return [...mdxSlugs, ...kvPosts].filter(({ slug }) => {
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getPublishedBlogByIdentifier(slug);

  if (!blog) return { title: "Post Not Found | Bridge Homies" };

  const siteUrl = "https://bridgehomies.com";
  const url = `${siteUrl}/blog/${blog.slug}`;
  const title = blog.seoTitle || blog.title;
  const description = blog.seoDescription || blog.excerpt;

  return {
    title: `${title} | Bridge Homies`,
    description,
    authors: [{ name: blog.author }],
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author],
      tags: blog.tags,
      images: blog.coverImage ? [{ url: blog.coverImage, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: blog.coverImage ? [blog.coverImage] : undefined,
    },
    alternates: { canonical: url },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // getPublishedBlogByIdentifier checks KV first, then MDX
  const blog = await getPublishedBlogByIdentifier(slug);

  if (!blog) notFound();

  // Guest submissions store HTML from the rich editor.
  // MDX files store markdown. normalizeBlogContent handles both.
  const rawContent = normalizeBlogContent(blog.content);

  // If the content looks like HTML (from the rich editor), sanitize it so
  // compileMDX doesn't choke on unclosed HTML void tags.
  const isHtml =
    rawContent.trim().startsWith("<") ||
    /<(p|h[1-6]|ul|ol|li|blockquote|pre|strong|em|a)\b/i.test(rawContent);

  const mdxSource = isHtml
    ? rawContent
      // Convert unclosed HTML void elements to JSX-compliant self-closing tags
      .replace(/<br\s*>/gi, "<br />")
      .replace(/<hr\s*>/gi, "<hr />")
      .replace(/<img([^>]+[^\/])>/gi, "<img$1 />") 
    : rawContent;

  const { content } = await compileMDX({
    source: mdxSource,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "append" }],
          rehypeHighlight,
        ],
        format: isHtml ? "mdx" : "mdx",
      },
    },
  });

  // Related posts: merge MDX + KV, filter by shared tags
  const allPosts = await getPublishedBlogs();
  const relatedPosts = allPosts
    .filter(
      (post) =>
        post.slug !== blog.slug &&
        post.tags.some((tag) => blog.tags.includes(tag))
    )
    .slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": blog.schemaType || "BlogPosting",
    headline: blog.seoTitle || blog.title,
    description: blog.seoDescription || blog.excerpt,
    image: blog.coverImage,
    datePublished: blog.date,
    dateModified: blog.date,
    author: {
      "@type": "Person",
      name: blog.author,
      jobTitle: blog.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "Bridge Homies",
      url: "https://bridgehomies.com",
    },
    url: `https://bridgehomies.com/blog/${blog.slug}`,
    keywords: blog.tags.join(", "),
    articleSection: blog.category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://bridgehomies.com/blog/${blog.slug}`,
    },
  };

  const faqJsonLd =
    blog.faq && blog.faq.length > 0
      ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: blog.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
      : null;

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <ArticleViewClient post={blog} relatedPosts={relatedPosts} content={content} />
      <Footer />
    </>
  );
} 