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
    <div className="min-h-screen bg-[#0e0e0e] text-[#f0ece4]">

      {/* ── HERO — LIGHT ── */}
      <section className="relative overflow-hidden bg-[#f5f0e8] text-[#111]">
        {/* Decorative circle */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[#e8dcc8]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-28">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.24em] text-[#8a7a65]">
            Bridge Homies · Editorial
          </p>

          <h1
            className="max-w-2xl font-serif text-5xl font-normal leading-[1.08] text-[#111] md:text-6xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Writing that ranks,{" "}
            <em className="italic text-[#6b5b3e]">answers,</em>{" "}
            and converts.
          </h1>

          <p className="mt-6 max-w-lg text-[15px] font-light leading-relaxed text-[#5a5040]">
            Practical articles on AI, software, automation, and digital growth
            built for humans and search engines alike.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/blog/submit"
              className="inline-flex items-center gap-2 rounded-full bg-[#111] px-6 py-3 text-sm font-medium text-[#f5f0e8] transition hover:bg-[#2a2520]"
            >
              <PenLine className="h-4 w-4" />
              Open writing portal
            </Link>
            
          </div>
        </div>
      </section>

      {/* ── SEARCH + FILTER — DARK ── */}
      <div className="mx-auto max-w-6xl px-6 pt-10">
        {/* Search */}
        <label className="relative block max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#555]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, topic, or tag"
            className="w-full rounded-full border border-[#2e2e2e] bg-[#1a1a1a] py-3 pl-11 pr-5 text-sm text-[#f0ece4] outline-none placeholder:text-[#555] focus:border-[#c5b89e]"
          />
        </label>

        {/* Category pills */}
        <div className="mt-5 flex flex-wrap gap-2 border-b border-[#1e1e1e] pb-8">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${category === item
                  ? "bg-[#f5f0e8] text-[#111]"
                  : "border border-[#2e2e2e] bg-[#1a1a1a] text-[#666] hover:text-[#f0ece4]"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* ── GRID — DARK ── */}
      <section className="mx-auto max-w-6xl px-6 py-12 pb-24">
        {filteredPosts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#2e2e2e] bg-[#141414] px-8 py-24 text-center">
            <p
              className="font-serif text-3xl text-[#f0ece4]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              No matching articles
            </p>
            <p className="mt-3 text-sm text-[#555]">
              Adjust the category or search query to find a post.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post, index) => {
              const featured = index === 0 && category === "All" && !query;

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-[#222] bg-[#141414] transition hover:border-[#3a3530] ${featured ? "md:col-span-2 xl:col-span-2" : ""
                    }`}
                >
                  {/* Image */}
                  <div
                    className={`relative overflow-hidden bg-[#1e1c19] ${featured ? "h-60" : "h-48"
                      }`}
                  >
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
                      />
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

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-2 text-[11px] uppercase tracking-[0.12em] text-[#555]">
                      {formatDate(post.date)}
                    </p>
                    <h2
                      className={`font-serif font-normal leading-snug text-[#f0ece4] ${featured ? "text-[1.6rem]" : "text-xl"
                        }`}
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#666]">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="mt-5 flex items-center justify-between border-t border-[#1e1e1e] pt-4">
                      <div className="flex items-center gap-4 text-xs text-[#444]">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readTime}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Eye className="h-3.5 w-3.5" />
                          {formatViews(post.views)}
                        </span>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs font-medium text-[#8a7a65] transition group-hover:text-[#c5b89e]">
                        Read
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
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