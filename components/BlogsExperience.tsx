"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Eye, Search, PenLine } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

function formatViews(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
}

function formatDate(iso: string): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch { return iso; }
}

export default function BlogsExperience({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))],
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
    <div className="min-h-screen bg-secondary text-[#f0ece4]">

      {/* ── SEARCH + FILTER ── */}
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-2">
        <h1
          className="font-serif text-5xl font-normal leading-[1.08] text-black md:text-6xl mb-10"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          AI Engineering &{" "}
          <h1><em className="italic text-purple-400">SaaS Development</em>{" "}</h1>
          Blog
        </h1>

        <label className="relative block max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#555]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, topic, or tag"
            className="w-full rounded-full border border-[#2e2e2e] bg-gray-100 py-3 pl-11 pr-5 text-sm text-[#f0ece4] outline-none placeholder:text-[#555] focus:border-[#c5b89e]"
          />
        </label>

        <div className="mt-5 flex flex-wrap gap-2 border-b border-[#1e1e1e] pb-8">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                category === item
                  ? "bg-[#f5f0e8] text-[#111]"
                  : "border border-[#2e2e2e] bg-gray-100 text-[#666] hover:text-[#f0ece4]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* ── WRITE FOR US BANNER (mid-page, not hero) ── */}
      <div className="mx-auto max-w-6xl px-6 pt-8 pb-2">
        <Link
          href="/blog/submit"
          className="group flex items-center justify-between gap-4 rounded-2xl border border-violet-900/60 bg-gray-100 px-6 py-4 transition hover:border-violet-700/80 hover:bg-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-900/60">
              <PenLine className="h-4 w-4 text-violet-100" />
            </div>
            <div>
              <p className="text-sm font-semibold text-black">Write for Us — Submit a Guest Post</p>
              <p className="text-[12px] text-[#666]">Share your expertise · earn 3 dofollow backlinks · get a permanent author profile</p>
            </div>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-violet-800/60 px-4 py-1.5 text-xs font-semibold text-violet-100 transition group-hover:bg-violet-700/70">
            Start writing <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>

      {/* ── POST GRID ── */}
      <section className="mx-auto max-w-6xl px-6 py-10 pb-24">
        {filteredPosts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#2e2e2e] bg-[#141414] px-8 py-24 text-center">
            <p className="font-serif text-3xl text-[#f0ece4]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              No matching articles
            </p>
            <p className="mt-3 text-sm text-[#555]">Adjust the category or search query to find a post.</p>
            <Link
              href="/blog/submit"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-violet-900/60 border border-violet-700/60 px-5 py-2.5 text-sm font-medium text-violet-200 transition hover:bg-violet-800/70"
            >
              <PenLine className="h-4 w-4" />
              Be the first to write about this
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post, index) => {
              const featured = index === 0 && category === "All" && !query;
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-[#222] bg-[#141414] transition hover:border-[#3a3530] ${featured ? "md:col-span-2 xl:col-span-2" : ""}`}
                >
                  <div className={`relative overflow-hidden bg-[#1e1c19] ${featured ? "h-60" : "h-48"}`}>
                    {post.coverImage ? (
                      <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[#1e1c19] to-[#2a2520]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {post.category && (
                      <span className="absolute left-4 top-4 rounded-full bg-[#f5f0e8] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#111]">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-2 text-[11px] uppercase tracking-[0.12em] text-violet-100">{formatDate(post.date)}</p>
                    <h2
                      className={`font-serif font-normal leading-snug text-purple-100 ${featured ? "text-[1.6rem]" : "text-xl"}`}
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-400">{post.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-[#1e1e1e] pt-4">
                      <div className="flex items-center gap-4 text-xs text-violet-100">
                        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
                        <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" />{formatViews(post.views)}</span>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs font-medium text-[#f7f3fe] transition group-hover:text-[#DCCBFB]">
                        Read <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* ── BOTTOM WRITE FOR US CALLOUT ── */}
        <div className="mt-14 rounded-2xl border border-[#1e1e2e] bg-gradient-to-br from-violet-100 to-white/80 px-8 py-10 text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-violet-400">Write for Us</p>
          <h2 className="mx-auto max-w-md font-serif text-2xl font-normal text-black/80" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Got something worth reading? <em className="italic text-violet-300">Publish it here.</em>
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-[13px] leading-relaxed text-[#666]">
            Submit a guest post and earn up to 3 dofollow backlinks plus a permanent author profile page.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/blog/submit" className="inline-flex items-center gap-2 rounded-full bg-violet-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-600">
              <PenLine className="h-4 w-4" />
              Submit a guest post — it's free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}