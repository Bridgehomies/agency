"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BlogPostMeta } from "@/lib/blog";
import { Calendar, Clock, Eye, Search, BookOpen } from "lucide-react";

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
  } catch (e) {
    return iso;
  }
}

function ArticleCard({
  post,
  featured = false,
}: {
  post: BlogPostMeta;
  featured?: boolean;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className={`group cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-purple-400 hover:shadow-lg transition-all duration-200 ${featured ? "md:col-span-2" : "flex flex-col h-full"}`}>
      <article
        className="flex flex-col h-full"
        itemScope
        itemType={`https://schema.org/${post.schemaType}`}
      >
        <meta itemProp="headline" content={post.seoTitle || post.title} />
        <meta itemProp="description" content={post.seoDescription || post.excerpt} />
        <meta itemProp="datePublished" content={post.date} />
        <meta itemProp="author" content={post.author} />

        <div className={`relative overflow-hidden ${featured ? "h-64" : "h-48 shrink-0"}`}>
          <img
            src={post.coverImage || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop"}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md z-10">
            {post.category}
          </span>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h2
            className="font-semibold text-gray-900 dark:text-white text-lg leading-snug mb-2 group-hover:text-purple-600 transition-colors line-clamp-2"
            itemProp="name"
          >
            {post.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-1">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-auto pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {formatViews(post.views)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogListingClient({ initialPosts }: { initialPosts: BlogPostMeta[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(initialPosts.map((p) => p.category).filter(Boolean))),
  ];

  const filteredPosts = initialPosts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)));
    return matchCat && matchQ;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Blog header */}
      <div className="bg-gray-950 text-white py-20 px-6 pt-32">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-4">Bridge Homies Blog</h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-medium">
            Engineering insights, product updates, and digital strategy from our team.
          </p>

          {/* Search */}
          <div className="relative mt-8 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-gray-900 border border-gray-800 rounded-xl text-md text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-16 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 overflow-x-auto my-1 scrollbar-hide">
          <div className="flex items-center gap-2 py-3 whitespace-nowrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${
                  activeCategory === cat
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles grid */}
      <div className="max-w-5xl mx-auto px-6 py-14">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-24 text-gray-400 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-xl font-medium text-gray-500">No articles found.</p>
            <p className="text-sm mt-2">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPosts.map((post, i) => (
              <ArticleCard
                key={post.id}
                post={post}
                featured={i === 0 && filteredPosts.length >= 3 && activeCategory === "All" && !searchQuery}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}