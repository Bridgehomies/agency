// app/components/ArticleViewClient.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { BlogPost, BlogPostMeta } from "@/lib/blog";
import { Button } from "@/components/ui/button";

// ─── Helpers ───────────────────────────────────────────────────────────────

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

// ─── Reading Progress Bar ──────────────────────────────────────────────────
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[999] h-[2px] bg-transparent" role="progressbar" aria-label="Reading progress" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
      <div
        className="h-full bg-gradient-to-r from-[#c8401a] to-[#0a0a0a] transition-all duration-75 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// ─── TOC Types ─────────────────────────────────────────────────────────────
interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

// ─── Table of Contents ─────────────────────────────────────────────────────
function TableOfContents({ articleRef }: { articleRef: React.RefObject<HTMLElement | null> }) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const timer = setTimeout(() => {
      const headings = Array.from(
        article.querySelectorAll("h2, h3")
      ) as HTMLHeadingElement[];

      const tocItems: TocItem[] = headings.map((h, idx) => {
        if (!h.id) h.id = `section-${idx}`;
        return {
          id: h.id,
          text: h.textContent?.replace(/\s*#\s*$/, "").trim() || "",
          level: parseInt(h.tagName[1]) as 2 | 3,
        };
      });

      setItems(tocItems.filter((i) => i.text));
      if (tocItems.length > 0) setActiveId(tocItems[0].id);
    }, 120);

    return () => clearTimeout(timer);
  }, [articleRef]);

  useEffect(() => {
    if (items.length === 0) return;
    observerRef.current?.disconnect();

    const headingEls = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );

    headingEls.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [items]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  if (items.length < 2) return null;

  return (
    <div className="toc-sidebar">
      {/* FIX: aria-expanded must be boolean, not string */}
      <Button
        className="toc-header"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-controls="toc-nav"
      >
        <div className="toc-header-left">
          <div className="toc-dot" />
          <span className="toc-label">Index of Sections</span>
          <span className="toc-count">{items.length}</span>
        </div>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={`toc-chevron transform transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`}
        >
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </Button>

      {isOpen && (
        <nav id="toc-nav" aria-label="Article sections">
          <ol className="toc-list">
            {items.map((item, idx) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id} className={`toc-item ${item.level === 3 ? "toc-item--sub" : ""}`}>
                  <span className={`toc-index ${isActive ? "toc-index--active" : ""}`} aria-hidden="true">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="toc-track" aria-hidden="true">
                    <div className={`toc-track-fill ${isActive ? "toc-track-fill--active" : ""}`} />
                  </div>
                  <button
                    className={`toc-link ${isActive ? "toc-link--active" : ""}`}
                    onClick={() => scrollTo(item.id)}
                    aria-current={isActive ? "location" : undefined}
                    title={item.text}
                  >
                    {item.text}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </div>
  );
}

// ─── Schema helpers ────────────────────────────────────────────────────────
/**
 * SEO: Generates Article structured data as a visible-to-crawlers JSON-LD
 * supplement. The page-level [slug]/page.tsx already emits the primary
 * articleJsonLd; this adds BreadcrumbList + speakable for voice/AI search.
 */
function ArticleSchema({ post }: { post: BlogPost }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bridgehomies.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://bridgehomies.com/blog" },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://bridgehomies.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
    />
  );
}
 
// ─── Main Component ────────────────────────────────────────────────────────
export default function ArticleViewClient({
  post,
  relatedPosts,
  content,
}: {
  post: BlogPost;
  relatedPosts: BlogPostMeta[];
  content: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const articleRef = useRef<HTMLElement>(null);
  const [calculatedReadTime, setCalculatedReadTime] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Calculate read time from actual rendered word count
    if (articleRef.current) {
      const textBlock = articleRef.current.innerText || articleRef.current.textContent || "";
      const totalWords = textBlock.trim().split(/\s+/).length;
      setCalculatedReadTime(Math.max(1, Math.ceil(totalWords / 200)));
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <ArticleSchema post={post} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500&display=swap');

        :root {
          --ink:    #0a0a0a;
          --paper:  #f5f1ea;
          --muted:  #6b6560;
          --accent: #c8401a;
          --rule:   #d4cfc6;
        }

        @keyframes revealUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(1.01); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); transform-origin: left; }
          to   { transform: scaleX(1); transform-origin: left; }
        }

        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        .font-bask  { font-family: 'Libre Baskerville', serif; }
        .font-mono  { font-family: 'IBM Plex Mono', monospace; }
        .font-sans  { font-family: 'IBM Plex Sans', sans-serif; }

        .hero-animate .hero-eyebrow { animation: revealLeft 0.6s 0.1s  both; }
        .hero-animate .hero-line    { animation: lineGrow  0.5s 0.25s  both; }
        .hero-animate .hero-title   { animation: revealUp  0.7s 0.3s   both; }
        .hero-animate .hero-meta    { animation: revealUp  0.6s 0.55s  both; }
        .hero-animate .hero-image   { animation: scaleIn   0.9s 0.15s  both; }

        .article-main-container   { background: #fff; }
        .hero-editorial-wrapper   { min-height: min(92vh, 780px); }
        .hero-dynamic-line        { width: clamp(3rem, 6vw, 5rem); }
        .hero-excerpt-block       { font-size: clamp(1.05rem, 1.3vw, 1.25rem); }
        .hero-title-text          { font-size: clamp(2.8rem, 6.5vw, 5.5rem); }

        /* ── Article body typography ─────────────────────────────────────── */
        .article-body p              { margin-bottom: 1.65em; }
        .article-body h2             { font-family: 'Bebas Neue', sans-serif; font-size: clamp(1.8rem, 3vw, 2.4rem); letter-spacing: 0.02em; color: var(--ink); margin-top: 3em; margin-bottom: 0.6em; border-bottom: 1px solid var(--rule); padding-bottom: 0.3em; scroll-margin-top: 110px; }
        .article-body h3             { font-family: 'Libre Baskerville', serif; font-size: 1.3rem; font-style: italic; color: var(--ink); margin-top: 2.4em; margin-bottom: 0.5em; scroll-margin-top: 110px; }
        .article-body h4             { font-family: 'IBM Plex Mono', monospace; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.14em; color: var(--accent); margin-top: 2em; margin-bottom: 0.4em; scroll-margin-top: 110px; }
        .article-body a              { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
        .article-body strong         { color: var(--ink); font-weight: 700; }
        .article-body ul,
        .article-body ol             { margin-bottom: 1.65em; padding-left: 1.4em; }
        .article-body li             { margin-bottom: 0.5em; }
        .article-body blockquote     { margin: 2.5em 0; padding: 1.6em 2em; border-left: 3px solid var(--accent); background: #fff; font-family: 'Libre Baskerville', serif; font-style: italic; font-size: 1.18rem; color: var(--ink); line-height: 1.75; }
        /* FIX: was ".article-body mt-4" (broken selector) — correct: .article-body .mt-4 */
        .article-body code           { font-family: 'IBM Plex Mono', monospace; font-size: 0.84em; background: #ede9e0; color: #c8401a; padding: 2px 6px; border-radius: 3px; }
        .article-body .mt-4          { font-family: 'IBM Plex Mono', monospace; font-size: 0.84em; }
        .article-body pre            { background: var(--ink); border-radius: 4px; padding: 1.5em; overflow-x: auto; margin: 2em 0; }
        .article-body pre code       { background: transparent; color: #d4cfc6; padding: 0; font-size: 0.88em; }

        /* ── TOC Sidebar ─────────────────────────────────────────────────── */
        .toc-col {
          position: sticky;
          top: 110px;
          z-index: 40;
          align-self: start;
        }
        .toc-sidebar {
          width: 240px;
          border-left: 1px solid var(--rule);
          background: transparent;
        }
        .toc-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 0 12px 14px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--ink);
        }
        .toc-header:hover            { color: var(--accent); }
        .toc-header-left             { display: flex; align-items: center; gap: 8px; }
        .toc-dot                     { width: 6px; height: 6px; background: var(--accent); flex-shrink: 0; border-radius: 50%; }
        .toc-label                   { font-family: 'IBM Plex Mono', monospace; font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink); font-weight: 500; }
        .toc-count                   { font-family: 'IBM Plex Mono', monospace; font-size: 0.58rem; color: var(--muted); background: var(--rule); padding: 1px 6px; }
        .toc-chevron                 { color: var(--muted); flex-shrink: 0; }
        .toc-list                    { list-style: none; margin: 0; padding: 4px 0; }
        .toc-item                    { display: flex; align-items: center; gap: 0; padding: 0 0 0 14px; min-height: 36px; position: relative; }
        .toc-item--sub               { padding-left: 28px; }
        .toc-item--sub .toc-index   { opacity: 0.4; }
        .toc-index                   { font-family: 'IBM Plex Mono', monospace; font-size: 0.58rem; color: var(--muted); width: 22px; flex-shrink: 0; user-select: none; }
        .toc-index--active           { color: var(--accent); font-weight: 500; }
        .toc-track                   { width: 2px; height: 100%; background: rgba(10,10,10,0.06); margin: 0 10px; flex-shrink: 0; position: relative; align-self: stretch; }
        .toc-track-fill              { position: absolute; top: 0; left: 0; right: 0; height: 0%; background: var(--accent); transition: height 0.2s ease; }
        .toc-track-fill--active      { height: 100%; }
        .toc-link                    { flex: 1; background: none; border: none; text-align: left; font-family: 'IBM Plex Sans', sans-serif; font-size: 0.78rem; line-height: 1.4; color: var(--muted); cursor: pointer; padding: 6px 0; transition: color 0.15s; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
        .toc-link:hover              { color: var(--ink); }
        .toc-link--active            { color: var(--ink); font-weight: 600; }

        /* ── Body layout grid ────────────────────────────────────────────── */
        .body-layout {
          max-width: 1340px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr min(720px, 90%) 240px 1fr;
          gap: 4rem;
          align-items: start;
        }
        .article-col { padding-right: 1.5rem; }

        @media (max-width: 1240px) {
          .body-layout {
            grid-template-columns: 1fr min(720px, 90%) 1fr;
            gap: 2rem;
          }
          .toc-col      { display: none; }
          .article-col  { padding-right: 0; }
        }

        /* ── Hover states ────────────────────────────────────────────────── */
        .tag-pill:hover              { background: var(--ink); color: var(--paper); border-color: var(--ink); }
        .related-card:hover          { transform: translateY(-2px); }
        .related-card:hover .related-arrow { transform: translateX(4px); }

        /* ── Skip link for accessibility ─────────────────────────────────── */
        .skip-link {
          position: absolute;
          top: -100%;
          left: 1rem;
          background: var(--accent);
          color: #fff;
          padding: 0.5rem 1rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem;
          z-index: 9999;
          text-decoration: none;
          transition: top 0.1s;
        }
        .skip-link:focus { top: 1rem; }
      `}</style>

      {/* Accessibility: skip nav */}
      <a href="#article-content" className="skip-link">Skip to article</a>

      <ReadingProgress />

      {/*
        SEO FIX: wrap EVERYTHING (hero + body) in a single <main> so Google's
        primary content zone includes the H1. Previously hero was outside <main>.
      */}
      <main id="main-content" itemScope itemType="https://schema.org/BlogPosting">

        {/* Hidden machine-readable metadata for schema.org crawlers */}
        <meta itemProp="headline"       content={post.seoTitle || post.title} />
        <meta itemProp="description"    content={post.seoDescription || post.excerpt} />
        <meta itemProp="datePublished"  content={post.date} />
        <meta itemProp="dateModified"   content={post.date} />
        <meta itemProp="author"         content={post.author} />
        <meta itemProp="keywords"       content={post.tags.join(", ")} />
        {post.coverImage && <meta itemProp="image" content={post.coverImage} />}

        {/* ─── HERO ──────────────────────────────────────────────────────── */}
        <section
          className={`hero-editorial-wrapper bg-[#f5f1ea] border-b border-[#d4cfc6] w-full ${mounted ? "hero-animate" : ""}`}
          aria-label="Article header"
        >
          <div className="max-w-[1340px] mx-auto px-6 md:px-12 pt-16 pb-12">

            {/* SEO: breadcrumb visible to crawlers + users */}
            <nav aria-label="Breadcrumb" className="hero-eyebrow mb-4">
              <ol className="flex items-center gap-2 list-none p-0 m-0" itemScope itemType="https://schema.org/BreadcrumbList">
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link href="/" className="font-mono text-[0.62rem] tracking-[0.14em] uppercase text-[#6b6560] hover:text-[#c8401a] transition-colors no-underline" itemProp="item">
                    <span itemProp="name">Home</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                </li>
                <li aria-hidden="true" className="font-mono text-[0.62rem] text-[#d4cfc6]">/</li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link href="/blog" className="font-mono text-[0.62rem] tracking-[0.14em] uppercase text-[#6b6560] hover:text-[#c8401a] transition-colors no-underline" itemProp="item">
                    <span itemProp="name">Blog</span>
                  </Link>
                  <meta itemProp="position" content="2" />
                </li>
                <li aria-hidden="true" className="font-mono text-[0.62rem] text-[#d4cfc6]">/</li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <span className="font-mono text-[0.62rem] tracking-[0.14em] uppercase text-[#c8401a]" itemProp="name">
                    {post.category}
                  </span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </nav>

            {/* Category tag + date */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-[0.64rem] tracking-[0.2em] uppercase text-[#c8401a] border border-[#c8401a] px-3 py-1">
                {post.category}
              </span>
              <time
                dateTime={post.date}
                className="font-mono text-[0.64rem] tracking-[0.12em] uppercase text-[#6b6560]"
              >
                PUBLISHED // {formatDate(post.date)}
              </time>
            </div>

            <div className="hero-dynamic-line h-[2px] bg-[#0a0a0a] mb-8 hero-line" />

            {/*
              SEO: H1 uses itemProp="headline" — visible to crawlers as the
              primary topic of the page. The title is the single most important
              on-page ranking signal. Rendered here inside <main>.
            */}
            <h1
              className="hero-title-text hero-title font-bebas text-[#0a0a0a] leading-[0.9] tracking-[0.01em] uppercase mb-6"
              itemProp="name"
            >
              {post.title}
            </h1>

            {post.excerpt && (
              <p
                className="hero-excerpt-block hero-meta font-bask italic text-[#6b6560] mb-10 leading-[1.7] max-w-4xl"
                itemProp="abstract"
              >
                {post.excerpt}
              </p>
            )}

            {/* Author + metrics */}
            <div className="hero-meta border-t border-[#d4cfc6] pt-6 flex flex-wrap gap-x-8 gap-y-4 items-center justify-between">
              <div
                className="flex items-center gap-3"
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                <div
                  className="w-9 h-9 bg-[#0a0a0a] flex items-center justify-center font-mono text-[0.65rem] text-[#f5f1ea] font-bold tracking-wide shrink-0"
                  aria-hidden="true"
                >
                  {post.author.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-sans text-[0.85rem] font-semibold text-[#0a0a0a]" itemProp="name">
                    {post.author}
                  </div>
                  <div className="font-mono text-[0.62rem] text-[#6b6560] uppercase tracking-wider" itemProp="jobTitle">
                    {post.authorRole}
                  </div>
                </div>
              </div>

              {/* Metrics: read time + views only. No fake live readers. */}
              <div className="flex gap-6 items-center">
                <div className="flex flex-col items-end">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-bebas text-2xl text-[#0a0a0a] leading-none tracking-tight">
                      {calculatedReadTime || post.readTime.replace(" min", "")}
                    </span>
                    <span className="font-mono text-[0.58rem] tracking-[0.12em] uppercase text-[#6b6560]">MIN</span>
                  </div>
                  <span className="font-mono text-[9px] text-[#c8401a]/80 uppercase tracking-widest mt-0.5">
                    READING TIME
                  </span>
                </div>

                <div className="h-6 w-px bg-[#d4cfc6]" aria-hidden="true" />

                <div className="flex flex-col items-end">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-bebas text-2xl text-[#0a0a0a] leading-none tracking-tight">
                      {formatViews(post.views)}
                    </span>
                    <span className="font-mono text-[0.58rem] tracking-[0.12em] uppercase text-[#6b6560]">VIEWS</span>
                  </div>
                  <span className="font-mono text-[9px] text-[#6b6560] uppercase tracking-widest mt-0.5">
                    TOTAL READS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cover image — FIX: fetchPriority="high" + loading="eager" for LCP */}
          <div className="border-t border-[#d4cfc6] relative w-full h-[320px] md:h-[460px] overflow-hidden hero-image">
            <img
              src={post.coverImage || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1600&h=600&fit=crop"}
              alt={post.title}
              className="w-full h-full object-cover"
              fetchPriority="high"
              loading="eager"
              width={1600}
              height={600}
            />
            {/* Trademark stamp */}
            <div
              className="absolute bottom-6 right-6 w-16 h-16 border border-[#c8401a]/60 flex items-center justify-center bg-[#f5f1ea]/80 backdrop-blur-sm transform rotate-6 pointer-events-none"
              aria-hidden="true"
            >
              <div className="font-bebas text-[#c8401a] text-center text-[0.55rem] leading-none tracking-widest">
                BRIDGE<br />HOMIES<br />™
              </div>
            </div>
            {/* Tag overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-6 py-4 flex items-center gap-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#f5f1ea] bg-[#c8401a] px-2 py-0.5"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ARTICLE BODY GRID ─────────────────────────────────────────── */}
        <div className="article-main-container">
          <div className="body-layout">
            {/* Col 1: left spacer */}
            <div aria-hidden="true" />

            {/* Col 2: article content */}
            <div className="article-col">
              <article
                id="article-content"
                ref={articleRef}
                className="article-body py-16 font-sans text-[1.05rem] leading-[1.82] text-[#2a2520]"
                itemProp="articleBody"
              >
                {content}
              </article>

              {/* Tags */}
              <div
                className="flex flex-wrap gap-2 pt-8 border-t border-[#d4cfc6]"
                aria-label="Article tags"
              >
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag-pill font-mono text-[0.65rem] tracking-[0.12em] text-[#6b6560] border border-[#d4cfc6] px-3.5 py-1.5 uppercase cursor-default transition-all duration-150"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/*
                SEO: FAQ rendered as real visible HTML (not just JSON-LD).
                Google reads visible FAQ text as on-page content signals.
                Uses <details>/<summary> for accordion without JS.
              */}
              {post.faq && post.faq.length > 0 && (
                <section
                  className="mt-16 border border-[#d4cfc6] bg-[#f5f1ea]"
                  aria-label="Frequently asked questions"
                  itemScope
                  itemType="https://schema.org/FAQPage"
                >
                  <div className="border-b border-[#d4cfc6] px-8 py-4 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[#c8401a]" aria-hidden="true" />
                    <h2 className="font-bebas text-[1.1rem] tracking-[0.1em] text-[#0a0a0a] m-0 border-none pb-0">
                      FREQUENTLY ASKED QUESTIONS
                    </h2>
                  </div>
                  {post.faq.map((item, i) => (
                    <div
                      key={item.question}
                      className={`px-8 py-6 ${i < (post.faq?.length ?? 0) - 1 ? "border-b border-[#d4cfc6]" : ""}`}
                      itemScope
                      itemProp="mainEntity"
                      itemType="https://schema.org/Question"
                    >
                      <p
                        className="font-sans text-[0.92rem] font-medium text-[#0a0a0a] mb-2"
                        itemProp="name"
                      >
                        {item.question}
                      </p>
                      <div
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                      >
                        <p
                          className="font-sans text-[0.88rem] text-[#6b6560] leading-[1.7] m-0"
                          itemProp="text"
                        >
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {/* Author card */}
              <div
                className="mt-14 border border-[#d4cfc6] flex gap-0 overflow-hidden"
                itemScope
                itemType="https://schema.org/Person"
              >
                <div className="w-1 bg-[#c8401a] shrink-0" aria-hidden="true" />
                <div className="flex gap-6 items-start p-8">
                  <div
                    className="w-12 h-12 bg-[#0a0a0a] flex items-center justify-center font-mono text-xs font-bold text-[#f5f1ea] shrink-0"
                    aria-hidden="true"
                  >
                    {post.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bebas text-[1.2rem] tracking-[0.04em] text-[#0a0a0a] mb-0.5" itemProp="name">
                      {post.author}
                    </p>
                    <p className="font-mono text-[0.65rem] text-[#c8401a] tracking-[0.12em] uppercase mb-3" itemProp="jobTitle">
                      {post.authorRole} · Bridge Homies
                    </p>
                    <p className="font-sans text-[0.87rem] text-[#6b6560] leading-[1.65] m-0">
                      Passionate about building scalable applications and sharing knowledge with the developer community.
                    </p>
                  </div>
                </div>
              </div>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <section className="mt-16 pt-10 border-t border-[#d4cfc6]" aria-label="Related articles">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-1.5 h-1.5 bg-[#c8401a]" aria-hidden="true" />
                    <p className="font-mono text-[0.65rem] tracking-[0.18em] text-[#6b6560] uppercase m-0">
                      Continue reading
                    </p>
                    <div className="flex-1 h-px bg-[#d4cfc6]" aria-hidden="true" />
                  </div>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-px bg-[#d4cfc6] border border-[#d4cfc6]">
                    {relatedPosts.map((rp) => (
                      <Link
                        key={rp.id}
                        href={`/blog/${rp.slug}`}
                        className="related-card flex flex-col bg-white no-underline transition-transform duration-200 group"
                        aria-label={`Read: ${rp.title}`}
                      >
                        <div className="h-40 overflow-hidden relative">
                          <img
                            src={rp.coverImage}
                            alt={rp.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            width={560}
                            height={160}
                          />
                          <div className="absolute top-3 left-3">
                            <span className="font-mono text-[0.58rem] tracking-[0.12em] uppercase text-[#f5f1ea] bg-[#0a0a0a] px-2.5 py-1">
                              {rp.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1 border-t border-[#d4cfc6]">
                          <h3 className="font-bask text-[0.95rem] font-bold text-[#0a0a0a] leading-[1.35] m-0 line-clamp-2 mb-auto">
                            {rp.title}
                          </h3>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="font-mono text-[0.62rem] text-[#6b6560] tracking-[0.06em]">
                              {rp.readTime} read
                            </span>
                            <span className="related-arrow font-mono text-[0.7rem] text-[#c8401a] transition-transform duration-150" aria-hidden="true">
                              →
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Contribute CTA — SEO: internal link to /blog/submit with keyword-rich anchor */}
              <div className="mt-14 border border-[#d4cfc6] bg-[#f5f1ea] px-8 py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="font-bebas text-[1.1rem] tracking-[0.06em] text-[#0a0a0a] mb-1">
                    WRITE FOR BRIDGE HOMIES
                  </p>
                  <p className="font-sans text-[0.82rem] text-[#6b6560] m-0">
                    Share your expertise on SaaS, web development, or AI. Earn dofollow backlinks.
                  </p>
                </div>
                <Link
                  href="/blog/submit"
                  className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-[#f5f1ea] bg-[#c8401a] px-5 py-2.5 no-underline hover:bg-[#0a0a0a] transition-colors whitespace-nowrap shrink-0"
                >
                  Submit a Guest Post →
                </Link>
              </div>

              <div className="pb-16" />
            </div>

            {/* Col 3: sticky TOC */}
            <div className="toc-col pt-16">
              <TableOfContents articleRef={articleRef} />
            </div>

            {/* Col 4: right spacer */}
            <div aria-hidden="true" />
          </div>

          {/* Footer strip */}
          <footer className="mt-0 px-8 md:px-16 py-10 border-t border-[#d4cfc6] bg-[#f5f1ea] flex items-center justify-between gap-4 flex-wrap font-mono text-[11px] text-[#6b6560]">
            <div>BRIDGE HOMIES EDITORIAL PORTAL // 2026</div>
            {/* FIX: was href="#" — now uses a real scroll handler via button */}
            <button
              onClick={scrollToTop}
              className="text-[#0a0a0a] bg-transparent border-none cursor-pointer font-mono text-[11px] hover:text-[#c8401a] transition-colors"
              aria-label="Scroll back to top"
            >
              BACK TO TOP ↑
            </button>
          </footer>
        </div>

      </main>{/* end <main> — hero + body now unified under one landmark */}
    </>
  );
}