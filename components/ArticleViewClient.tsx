import React from "react";
import Link from "next/link";
import { BlogPost, BlogPostMeta } from "@/lib/blog";
import { Calendar, Clock, Eye, ChevronRight } from "lucide-react";

function formatViews(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
}

function formatDate(iso: string): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function ArticleViewClient({
  post,
  relatedPosts,
  content,
}: {
  post: BlogPost;
  relatedPosts: BlogPostMeta[];
  content: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pb-20">
      <div className="relative h-80 overflow-hidden md:h-[500px]">
        <img
          src={post.coverImage || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=600&fit=crop"}
          alt={post.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto flex max-w-4xl flex-col items-start p-6 md:p-12 md:pb-16">
          <Link
            href="/blog"
            className="mb-6 flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-sm font-medium text-white/70 backdrop-blur-md transition-colors hover:text-white"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            All articles
          </Link>
          <span className="mb-4 inline-block rounded-full bg-purple-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-md shadow-purple-600/30">
            {post.category}
          </span>
          <h1 className="text-3xl font-black leading-tight text-white md:text-5xl" itemProp="headline">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="sticky top-[72px] z-10 mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-6 border-b border-gray-100 bg-white px-6 py-8 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-pink-100 text-lg font-bold text-purple-700 shadow-sm dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-300">
            {post.author.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-md font-bold text-gray-900 dark:text-white">{post.author}</p>
            <p className="text-sm font-medium text-gray-500">{post.authorRole}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5 rounded-md bg-gray-50 px-3 py-1.5 dark:bg-gray-900">
            <Calendar className="h-4 w-4 text-purple-500" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5 rounded-md bg-gray-50 px-3 py-1.5 dark:bg-gray-900">
            <Clock className="h-4 w-4 text-purple-500" />
            {post.readTime} read
          </span>
          <span className="flex items-center gap-1.5 rounded-md bg-gray-50 px-3 py-1.5 dark:bg-gray-900">
            <Eye className="h-4 w-4 text-purple-500" />
            {formatViews(post.views)} views
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-16 pt-12">
        <div
          className="prose prose-gray prose-lg max-w-none dark:prose-invert
            prose-headings:font-black prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-purple-100 dark:prose-h2:border-purple-900/30 prose-h2:pb-4
            prose-h3:text-2xl prose-h3:mt-10
            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline prose-a:font-semibold
            prose-strong:text-gray-900 dark:prose-strong:text-white
            prose-ul:my-6 prose-li:text-gray-700 dark:prose-li:text-gray-300
            prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 dark:prose-blockquote:bg-purple-900/10 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:font-medium prose-blockquote:text-gray-800 dark:prose-blockquote:text-gray-200
            prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:text-purple-700 dark:prose-code:text-purple-300 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-gray-900 prose-pre:rounded-xl prose-pre:shadow-lg"
          itemProp="articleBody"
        >
          {content}
        </div>

        {post.faq && post.faq.length > 0 ? (
          <section className="mt-16 rounded-2xl border border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Frequently asked questions</h2>
            <div className="mt-6 space-y-5">
              {post.faq.map((item) => (
                <div key={item.question} className="border-b border-gray-200 pb-5 last:border-0 last:pb-0 dark:border-gray-800">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-16 flex flex-wrap gap-2 border-t border-gray-100 pt-8 dark:border-gray-800">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border-2 border-purple-100 bg-white px-4 py-1.5 text-sm font-bold text-purple-700 shadow-sm dark:border-purple-900/50 dark:bg-gray-900 dark:text-purple-400"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-purple-50/30 p-8 shadow-sm dark:border-gray-700 dark:from-gray-900 dark:to-gray-800">
          <div className="mb-4 flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-200 to-pink-200 text-xl font-bold text-purple-800 shadow-inner">
              {post.author.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-xl font-black text-gray-900 dark:text-white">{post.author}</p>
              <p className="text-sm font-medium uppercase tracking-wider text-purple-600 dark:text-purple-400">
                {post.authorRole} · Bridge Homies
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Passionate about building scalable applications and sharing knowledge with the community.
          </p>
        </div>

        {relatedPosts.length > 0 ? (
          <div className="mt-20">
            <h3 className="mb-8 flex items-center gap-3 text-2xl font-black text-gray-900 dark:text-white">
              <span className="h-1 w-8 rounded-full bg-purple-600"></span>
              Continue reading
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:border-purple-400 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="h-40 shrink-0 overflow-hidden">
                    <img
                      src={rp.coverImage}
                      alt={rp.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">{rp.category}</p>
                    <h4 className="line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-purple-600 dark:text-white">
                      {rp.title}
                    </h4>
                    <p className="mt-auto flex items-center justify-between pt-4 text-xs font-medium text-gray-400 dark:text-gray-500">
                      <span>{rp.readTime} read</span>
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
