"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Eye, Search, PenLine } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

const PAGE_SIZE = 15;

// ── Editorial design tokens same palette/fonts as the article page ──────
// ink #0a0a0a · paper #f5f1ea · muted #6b6560 · accent #c8401a · rule #d4cfc6
const F_BEBAS = "var(--font-bebas), sans-serif";
const F_BASK = "var(--font-baskerville), serif";
const F_MONO = "var(--font-plex-mono), monospace";
const F_SANS = "var(--font-plex-sans), sans-serif";

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
  const [page, setPage] = useState(1);

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

  const pinnedPosts = filteredPosts.slice(0, 2);
  const restPosts = filteredPosts.slice(2);
  const pageCount = Math.max(1, Math.ceil(restPosts.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pagePosts = restPosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function goToPage(p: number) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function PostCard({ post, featured }: { post: BlogPost; featured: boolean }) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className={`group flex h-full flex-col bg-white transition-transform duration-200 hover:-translate-y-[2px] ${featured ? "md:col-span-2 xl:col-span-2" : ""}`}
      >
        <div className={`relative overflow-hidden bg-[#f5f1ea] ${featured ? "h-64" : "h-48"}`}>
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#f5f1ea] to-[#ece5d8]" />
          )}
          {post.category && (
            <span
              className="absolute left-0 top-4 bg-[#0a0a0a] px-3 py-1 text-[0.6rem] uppercase tracking-[0.16em] text-[#f5f1ea]"
              style={{ fontFamily: F_MONO }}
            >
              {post.category}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col border border-t-0 border-[#d4cfc6] p-5">
          <p className="mb-2 text-[0.62rem] uppercase tracking-[0.14em] text-[#c8401a]" style={{ fontFamily: F_MONO }}>
            {formatDate(post.date)}
          </p>
          <h2
            className={`font-bold leading-snug text-[#0a0a0a] ${featured ? "text-[1.6rem]" : "text-lg"}`}
            style={{ fontFamily: F_BASK }}
          >
            {post.title}
          </h2>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-[#6b6560]" style={{ fontFamily: F_SANS }}>
            {post.excerpt}
          </p>
          <div className="mt-5 flex items-center justify-between border-t border-[#d4cfc6] pt-4">
            <div className="flex items-center gap-4 text-[0.65rem] text-[#6b6560]" style={{ fontFamily: F_MONO }}>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
              <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" />{formatViews(post.views)}</span>
            </div>
            <span
              className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.1em] text-[#c8401a] transition group-hover:text-[#0a0a0a]"
              style={{ fontFamily: F_MONO }}
            >
              Read <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">

      {/* ── HERO ── */}
      <div className="bg-[#f5f1ea] border-b border-[#d4cfc6]">
        <div className="mx-auto max-w-[1340px] px-6 md:px-12 pt-36 pb-14">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-1.5 w-1.5 bg-[#c8401a]" aria-hidden="true" />
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-[#6b6560]" style={{ fontFamily: F_MONO }}>
              Bridge Homies Editorial
            </span>
          </div>

          <div className="mb-8 h-[2px] w-16 bg-[#0a0a0a]" />

          <h1
            className="text-[clamp(2.4rem,6vw,4.6rem)] uppercase leading-[0.95] tracking-[0.01em] text-[#0a0a0a]"
            style={{ fontFamily: F_BEBAS }}
          >
            AI Engineering &amp; <span className="text-[#c8401a]">SaaS</span> Development
          </h1>
          <p
            className="mt-6 max-w-2xl text-[1.05rem] italic leading-[1.7] text-[#6b6560]"
            style={{ fontFamily: F_BASK }}
          >
            In-depth articles on SaaS development, custom web apps, AI integrations, automation, and software engineering written by practitioners for founders and developers.
          </p>

          {/* ── SEARCH + FILTER ── */}
          <div className="mt-10 border-t border-[#d4cfc6] pt-8">
            <label className="relative block max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b6560]" />
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder="Search by title, topic, or tag"
                className="w-full border border-[#d4cfc6] bg-white py-3 pl-11 pr-5 text-sm text-[#0a0a0a] outline-none placeholder:text-[#6b6560] focus:border-[#c8401a]"
                style={{ fontFamily: F_SANS }}
              />
            </label>

            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => { setCategory(item); setPage(1); }}
                  className={`border px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.1em] transition ${category === item
                      ? "border-[#0a0a0a] bg-[#0a0a0a] text-[#f5f1ea]"
                      : "border-[#d4cfc6] bg-white text-[#6b6560] hover:border-[#0a0a0a] hover:text-[#0a0a0a]"
                    }`}
                  style={{ fontFamily: F_MONO }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── WRITE FOR US BANNER (mid-page, not hero) ── */}
      <div className="mx-auto max-w-[1340px] px-6 md:px-12 pt-10 pb-2">
        <Link
          href="/blog/submit"
          className="group flex items-center justify-between gap-4 border border-[#d4cfc6] bg-white px-6 py-5 transition hover:border-[#c8401a]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#f5f1ea]">
              <PenLine className="h-4 w-4 text-[#c8401a]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0a0a0a]" style={{ fontFamily: F_SANS }}>
                Write for Us Submit a Guest Post
              </p>
              <p className="text-[0.72rem] text-[#6b6560]" style={{ fontFamily: F_MONO }}>
                Share your expertise · earn 1–2 dofollow backlinks · get a permanent author profile
              </p>
            </div>
          </div>
          <span
            className="flex shrink-0 items-center gap-1.5 bg-[#c8401a] px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.1em] text-[#f5f1ea] transition group-hover:bg-[#0a0a0a]"
            style={{ fontFamily: F_MONO }}
          >
            Start writing <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>

      {/* ── POST GRID ── */}
      <section className="mx-auto max-w-[1340px] px-6 md:px-12 py-10 pb-24">
        {filteredPosts.length === 0 ? (
          <div className="border border-dashed border-[#d4cfc6] bg-[#f5f1ea] px-8 py-24 text-center">
            <p className="text-[2rem] uppercase tracking-[0.02em] text-[#0a0a0a]" style={{ fontFamily: F_BEBAS }}>
              No matching articles
            </p>
            <p className="mt-3 text-sm text-[#6b6560]" style={{ fontFamily: F_SANS }}>
              Adjust the category or search query to find a post.
            </p>
            <Link
              href="/blog/submit"
              className="mt-8 inline-flex items-center gap-2 bg-[#c8401a] px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.1em] text-[#f5f1ea] transition hover:bg-[#0a0a0a]"
              style={{ fontFamily: F_MONO }}
            >
              <PenLine className="h-4 w-4" />
              Be the first to write about this
            </Link>
          </div>
        ) : (
          <>
            {/* Top 2 posts stay pinned across every page */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {pinnedPosts.map((post, index) => (
                <PostCard key={post.slug} post={post} featured={index === 0 && category === "All" && !query} />
              ))}
            </div>

            {pagePosts.length > 0 && (
              <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {pagePosts.map((post) => (
                  <PostCard key={post.slug} post={post} featured={false} />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── PAGINATION ── */}
        {pageCount > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2" style={{ fontFamily: F_MONO }}>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="border border-[#d4cfc6] bg-white px-4 py-2 text-[0.65rem] uppercase tracking-[0.1em] text-[#6b6560] transition hover:border-[#0a0a0a] hover:text-[#0a0a0a] disabled:opacity-30 disabled:pointer-events-none"
            >
              Prev
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`h-9 w-9 border text-[0.65rem] transition ${p === currentPage
                    ? "border-[#0a0a0a] bg-[#0a0a0a] text-[#f5f1ea]"
                    : "border-[#d4cfc6] bg-white text-[#6b6560] hover:border-[#0a0a0a] hover:text-[#0a0a0a]"
                  }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === pageCount}
              className="border border-[#d4cfc6] bg-white px-4 py-2 text-[0.65rem] uppercase tracking-[0.1em] text-[#6b6560] transition hover:border-[#0a0a0a] hover:text-[#0a0a0a] disabled:opacity-30 disabled:pointer-events-none"
            >
              Next
            </button>
          </div>
        )}

        {/* ── BOTTOM WRITE FOR US CALLOUT ── */}
        <div className="mt-14 border border-[#d4cfc6] bg-[#f5f1ea] px-8 py-10 text-center">
          <p className="mb-3 text-[0.65rem] uppercase tracking-[0.24em] text-[#c8401a]" style={{ fontFamily: F_MONO }}>
            Write for Us
          </p>
          <h2 className="mx-auto max-w-md text-[1.8rem] uppercase leading-tight text-[#0a0a0a]" style={{ fontFamily: F_BEBAS }}>
            Got something worth reading? <span className="text-[#c8401a]">Publish it here.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-[0.8rem] leading-relaxed text-[#6b6560]" style={{ fontFamily: F_SANS }}>
            Submit a guest post and earn up to 1–2 dofollow backlinks plus a permanent author profile page. $15/placement, $0 for link exchanges pay after live.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/blog/submit"
              className="inline-flex items-center gap-2 bg-[#c8401a] px-6 py-3 text-[0.7rem] uppercase tracking-[0.1em] text-white transition hover:bg-[#0a0a0a]"
              style={{ fontFamily: F_MONO }}
            >
              <PenLine className="h-4 w-4" />
              Submit a guest post
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}