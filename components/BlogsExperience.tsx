"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Eye, Search, Sparkles } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

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

export default function BlogsExperience({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean)))],
    [posts]
  );

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [category, posts, query]);

  return (
    <div className="min-h-screen bg-[#f8f4ec] text-slate-900">
      <section className="relative overflow-hidden border-b border-black/10 bg-[#111111] text-[#f8f4ec]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(217,119,6,0.28),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(190,24,93,0.2),_transparent_30%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(248,244,236,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(248,244,236,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#f8f4ec]/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#f6c27a]">
                <Sparkles className="h-3.5 w-3.5" />
                Editorial Engine
              </span>
              <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-none text-[#f8f4ec] md:text-7xl">
                Articles designed to rank, answer, and convert.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#ddd5ca]">
                `/blog` is your public archive, and every article lives on its own clean URL at `/blog/[slug]` so search engines can index it properly.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.22em] text-[#f6c27a]">Publishing workflow</p>
              <div className="mt-5 space-y-4 text-sm text-[#ece5db]">
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#f6c27a]" />
                  <p>Write posts in the built-in portal and publish them into `content/blogs`.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#f6c27a]" />
                  <p>Each article gets a dedicated URL like `/blog/your-article-slug`.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#f6c27a]" />
                  <p>Structured data and FAQ schema help answer engines understand the page faster.</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/blog/write"
                  className="inline-flex items-center gap-2 rounded-full bg-[#f6c27a] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#ffd59d]"
                >
                  Open writing portal
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-xl">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9f9687]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, topic, or tag"
                className="w-full rounded-full border border-white/10 bg-white/95 py-3 pl-12 pr-5 text-base text-slate-900 outline-none ring-0 placeholder:text-slate-500 focus:border-[#f6c27a]"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-20 border-b border-black/10 bg-[#f8f4ec]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-4">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                category === item
                  ? "bg-[#111111] text-[#f8f4ec]"
                  : "border border-black/10 bg-white/70 text-slate-700 hover:bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        {filteredPosts.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-black/15 bg-white/60 px-8 py-20 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-slate-300" />
            <h2 className="mt-4 font-serif text-3xl">No matching articles</h2>
            <p className="mt-3 text-slate-600">Adjust the category or search query to find a post.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post, index) => {
              const featured = index === 0 && category === "All" && !query;

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_24px_80px_-50px_rgba(17,17,17,0.5)] transition hover:-translate-y-1 hover:shadow-[0_24px_80px_-40px_rgba(17,17,17,0.65)] ${
                    featured ? "md:col-span-2 xl:col-span-2" : ""
                  }`}
                >
                  <div className={`relative overflow-hidden ${featured ? "h-80" : "h-56"}`}>
                    <img
                      src={post.coverImage || "/placeholder.jpg"}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute left-5 top-5 rounded-full bg-[#f6c27a] px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-black">
                      {post.category}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{formatDate(post.date)}</p>
                    <h2 className="mt-3 font-serif text-3xl leading-tight text-slate-950">{post.title}</h2>
                    <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{post.excerpt}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 text-sm text-slate-500">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Eye className="h-4 w-4" />
                          {formatViews(post.views)}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-2 font-semibold text-slate-900">
                        Read article
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
