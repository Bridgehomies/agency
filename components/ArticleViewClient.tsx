"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BlogPost, BlogPostMeta } from "@/lib/blog";

function formatViews(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
}

function formatDate(iso: string): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

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
    <div className="fixed top-0 left-0 right-0 z-[999] h-[3px] bg-transparent">
      <div
        className="h-full bg-violet-600 transition-all duration-75 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
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
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        @keyframes heroZoom { from { transform: scale(1.04); } to { transform: scale(1.0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scrollLine { 0%, 100% { opacity: 0.3; transform: scaleY(0.6); } 50% { opacity: 1; transform: scaleY(1); } }
        .hero-img { animation: heroZoom 12s ease-out forwards; }
        .hero-content { animation: fadeUp 0.9s 0.2s both; }
        .scroll-cue { animation: fadeUp 1.2s 0.6s both; }
        .scroll-line { animation: scrollLine 2s 1s ease-in-out infinite; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-dm-sans { font-family: 'DM Sans', sans-serif; }
        .font-dm-mono { font-family: 'DM Mono', monospace; }
      `}</style>

      <ReadingProgress />

      {/* NAVBAR */}
      

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[600px] h-svh overflow-hidden flex flex-col justify-end"
      >
        <img
          src={post.coverImage || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1600&h=900&fit=crop"}
          alt={post.title}
          className="hero-img absolute inset-0 w-full h-full object-cover scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,5,30,0.96)] via-[rgba(30,10,70,0.65)] to-[rgba(80,40,180,0.18)]" />

        <div className="hero-content relative z-[2] px-[clamp(1.5rem,6vw,7rem)] pb-[clamp(3rem,7vh,5rem)] max-w-[960px]">
          <div className="inline-block border border-violet-600 text-violet-500 font-dm-mono text-[0.68rem] tracking-[0.14em] uppercase px-3.5 py-1.5 rounded-sm mb-6">
            {post.category}
          </div>
          <h1 className="font-playfair text-[clamp(2.4rem,5.5vw,5rem)] font-black leading-[1.05] text-white mb-6 tracking-[-0.01em]">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-6 items-center">
            {/* Author */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-violet-700 flex items-center justify-center font-dm-sans text-xs font-bold text-white tracking-wide shrink-0">
                {post.author.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-dm-sans text-sm font-medium text-white">{post.author}</div>
                <div className="font-dm-sans text-[0.72rem] text-purple-300">{post.authorRole}</div>
              </div>
            </div>
            <div className="w-px h-7 bg-white/20" />
            {/* Date */}
            <div className="font-dm-mono text-[0.72rem] text-purple-300 tracking-[0.04em] flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="opacity-50">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {formatDate(post.date)}
            </div>
            {/* Read time */}
            <div className="font-dm-mono text-[0.72rem] text-purple-300 tracking-[0.04em] flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="opacity-50">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              {post.readTime} read
            </div>
            {/* Views */}
            <div className="font-dm-mono text-[0.72rem] text-purple-300 tracking-[0.04em] flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="opacity-50">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
              {formatViews(post.views)} views
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="scroll-cue absolute bottom-7 right-8 z-[3] hidden sm:flex flex-col items-center gap-1.5">
          <div className="font-dm-mono text-[0.6rem] tracking-[0.18em] text-purple-400 uppercase [writing-mode:vertical-rl]">Scroll</div>
          <div className="scroll-line w-px h-12 bg-gradient-to-b from-transparent to-violet-600" />
        </div>
      </section>

      {/* BODY */}
      <main className="grid grid-cols-[1fr_min(720px,90%)_1fr]">
        {/* Article content */}
        <article
          className="col-start-2 py-20 font-dm-sans text-[1.075rem] leading-[1.82] text-[#2d2540]
            [&_p]:mb-[1.7em]
            [&_h2]:font-playfair [&_h2]:text-[1.9rem] [&_h2]:font-bold [&_h2]:text-[#1a1625] [&_h2]:mt-[3em] [&_h2]:mb-[0.8em] [&_h2]:pb-[0.5em] [&_h2]:border-b [&_h2]:border-purple-100 [&_h2]:leading-tight
            [&_h3]:font-playfair [&_h3]:text-[1.4rem] [&_h3]:font-bold [&_h3]:text-[#1a1625] [&_h3]:mt-[2.4em] [&_h3]:mb-[0.6em]
            [&_h4]:font-dm-sans [&_h4]:text-base [&_h4]:font-bold [&_h4]:text-violet-600 [&_h4]:uppercase [&_h4]:tracking-widest [&_h4]:mt-[2em] [&_h4]:mb-[0.5em]
            [&_a]:text-violet-600 [&_a]:underline [&_a]:underline-offset-[3px]
            [&_strong]:text-[#1a1625] [&_strong]:font-semibold
            [&_ul]:mb-[1.7em] [&_ul]:pl-6 [&_ol]:mb-[1.7em] [&_ol]:pl-6
            [&_li]:mb-2
            [&_blockquote]:my-10 [&_blockquote]:py-5 [&_blockquote]:px-6 [&_blockquote]:pl-8 [&_blockquote]:border-l-[3px] [&_blockquote]:border-violet-600 [&_blockquote]:bg-violet-50 [&_blockquote]:rounded-r-lg [&_blockquote]:font-playfair [&_blockquote]:text-[1.2rem] [&_blockquote]:italic [&_blockquote]:text-[#1a1625] [&_blockquote]:leading-relaxed
            [&_code]:font-dm-mono [&_code]:text-[0.86em] [&_code]:bg-purple-50 [&_code]:text-violet-600 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:border [&_code]:border-purple-100
            [&_pre]:bg-[#1e1030] [&_pre]:border [&_pre]:border-purple-100 [&_pre]:rounded-xl [&_pre]:p-6 [&_pre]:overflow-x-auto [&_pre]:my-8
            [&_pre_code]:bg-transparent [&_pre_code]:border-none [&_pre_code]:p-0 [&_pre_code]:text-purple-100 [&_pre_code]:text-[0.88em]"
          itemProp="articleBody"
        >
          {content}
        </article>

        {/* TAGS */}
        <div className="col-start-2 flex flex-wrap gap-2 pt-12 border-t border-purple-100 mt-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-dm-mono text-[0.7rem] tracking-[0.1em] text-purple-400 border border-purple-100 px-3.5 py-1.5 rounded-sm uppercase cursor-default transition-all hover:text-violet-600 hover:border-violet-600 hover:bg-violet-50"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* FAQ */}
        {post.faq && post.faq.length > 0 && (
          <section className="col-start-2 mt-16 p-10 bg-[#f9f8ff] border border-purple-100 rounded-xl">
            <h2 className="font-playfair text-[1.4rem] font-bold text-[#1a1625] mb-8 flex items-center gap-3 after:flex-1 after:h-px after:bg-purple-100 after:content-['']">
              FAQ
            </h2>
            {post.faq.map((item) => (
              <div key={item.question} className="py-5 border-b border-purple-100 last:border-b-0 last:pb-0">
                <p className="font-dm-sans text-[0.95rem] font-semibold text-[#1a1625] mb-2">{item.question}</p>
                <p className="font-dm-sans text-[0.9rem] text-purple-400 leading-[1.7] m-0">{item.answer}</p>
              </div>
            ))}
          </section>
        )}

        {/* AUTHOR CARD */}
        <div className="col-start-2 mt-16 p-10 border border-purple-100 rounded-xl flex gap-6 items-start relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-violet-600 before:to-transparent before:content-['']">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-violet-700 flex items-center justify-center font-dm-sans text-base font-bold text-white shrink-0">
            {post.author.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-playfair text-[1.15rem] font-bold text-[#1a1625] mb-1">{post.author}</p>
            <p className="font-dm-mono text-[0.7rem] text-violet-600 tracking-[0.1em] uppercase mb-3">
              {post.authorRole} · Bridge Homies
            </p>
            <p className="font-dm-sans text-[0.88rem] text-purple-400 leading-[1.65] m-0">
              Passionate about building scalable applications and sharing knowledge with the developer community.
            </p>
          </div>
        </div>

        {/* RELATED */}
        {relatedPosts.length > 0 && (
          <section className="col-start-2 mt-20 pt-12 border-t border-purple-100">
            <p className="font-dm-mono text-[0.7rem] tracking-[0.18em] text-purple-400 uppercase mb-8 flex items-center gap-3.5 after:flex-1 after:h-px after:bg-purple-100 after:content-['']">
              Continue reading
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  className="flex flex-col border border-purple-100 rounded-xl overflow-hidden no-underline bg-[#f9f8ff] transition-all duration-200 hover:border-violet-600 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(124,58,237,0.10)] group"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={rp.coverImage}
                      alt={rp.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="font-dm-mono text-[0.65rem] tracking-[0.12em] text-violet-600 uppercase mb-2">{rp.category}</p>
                    <h4 className="font-playfair text-[1.05rem] font-bold text-[#1a1625] leading-[1.35] m-0 line-clamp-2">{rp.title}</h4>
                    <div className="mt-auto pt-4 font-dm-mono text-[0.68rem] text-purple-400 tracking-[0.08em] flex items-center justify-between">
                      <span>{rp.readTime} read</span>
                      <div className="w-5 h-5 border border-purple-100 rounded-full flex items-center justify-center transition-all group-hover:border-violet-600 group-hover:bg-violet-50">
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <path d="M2.5 1.5L6.5 4.5L2.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FOOTER STRIP */}
        <footer className="col-span-3 mt-24 px-[clamp(1.5rem,6vw,7rem)] py-8 border-t border-purple-100 flex items-center justify-between gap-4 flex-wrap">
          {/* Add footer content here */}
        </footer>
      </main>
    </>
  );
}