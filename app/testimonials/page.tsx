"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────
type Testimonial = {
  id: string;
  submittedAt: string;
  name: string;
  company?: string;
  role?: string;
  services: string[];
  rating: number;
  feedback: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  "from-violet-500 to-purple-700",
  "from-purple-500 to-violet-700",
  "from-violet-600 to-fuchsia-700",
  "from-indigo-500 to-violet-600",
  "from-fuchsia-500 to-purple-700",
] as const;

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Stars({ count, size = "sm" }: { count: number; size?: "sm" | "lg" }) {
  return (
    <div
      className={`flex gap-0.5 ${size === "lg" ? "text-xl" : "text-sm"}`}
      aria-label={`${count} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={s <= count ? "text-violet-600" : "text-black/10"}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

function StatItem({ value, label, accent = false }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="stat-item flex flex-col gap-1">
      <span
        className={`text-[52px] font-bold leading-none tracking-[-0.03em] ${
          accent ? "text-violet-600" : "text-black"
        }`}
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        {value}
      </span>
      <span className="text-[11px] tracking-[1.5px] uppercase text-black/35 font-medium">
        {label}
      </span>
    </div>
  );
}

function FilterTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 text-[11px] tracking-[0.08em] font-semibold border transition-all duration-200 ${
        active
          ? "border-violet-600 bg-violet-600 text-white"
          : "border-black/12 text-black/40 hover:border-violet-400 hover:text-violet-600"
      }`}
    >
      {label}
    </button>
  );
}

function ReviewCard({
  testimonial,
  colorIndex,
}: {
  testimonial: Testimonial;
  colorIndex: number;
}) {
  const { name, role, company, rating, feedback, services, submittedAt } = testimonial;

  return (
    <div className="review-card break-inside-avoid bg-white border border-black/[0.08] p-6 hover:border-violet-400 hover:shadow-[0_4px_24px_rgba(109,40,217,0.08)] transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Stars count={rating} />
        <span className="text-[9px] tracking-[1.5px] uppercase text-black/25 font-medium">
          {formatDate(submittedAt)}
        </span>
      </div>

      {/* Feedback */}
      <p className="text-[13.5px] leading-relaxed text-black/60 mb-5 group-hover:text-black/80 transition-colors">
        &ldquo;{feedback}&rdquo;
      </p>

      {/* Service tags */}
      {services.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {services.map((s) => (
            <span
              key={s}
              className="px-2 py-[3px] text-[9px] tracking-[1px] uppercase border border-violet-200 text-violet-600 bg-violet-50 font-medium"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-black/[0.06]">
        <div
          className={`w-8 h-8 rounded-full bg-gradient-to-br ${
            AVATAR_COLORS[colorIndex % AVATAR_COLORS.length]
          } flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0`}
          aria-hidden="true"
        >
          {getInitials(name)}
        </div>
        <div>
          <div className="text-[12px] font-semibold text-black/80 leading-none mb-0.5">
            {name}
          </div>
          {(role || company) && (
            <div className="text-[10px] text-black/35">
              {[role, company].filter(Boolean).join(" · ")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // ── Fetch ──
  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((d) => setTestimonials(d.testimonials ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // ── Derived data ──
  const allServices = useMemo(
    () => ["All", ...Array.from(new Set(testimonials.flatMap((t) => t.services)))],
    [testimonials]
  );

  const filtered = useMemo(
    () =>
      filter === "All"
        ? testimonials
        : testimonials.filter((t) => t.services.includes(filter)),
    [testimonials, filter]
  );

  const avgRating = useMemo(() => {
    if (!testimonials.length) return "—";
    return (testimonials.reduce((a, t) => a + t.rating, 0) / testimonials.length).toFixed(1);
  }, [testimonials]);

  const fiveStarCount = useMemo(
    () => testimonials.filter((t) => t.rating === 5).length,
    [testimonials]
  );

  // ── Animations ──
  useGSAP(
    () => {
      gsap.from(".hero-line", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });
      gsap.from(".stat-item", {
        y: 24,
        opacity: 0,
        duration: 0.65,
        ease: "power2.out",
        stagger: 0.09,
        delay: 0.35,
      });
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      if (loading || !filtered.length) return;
      gsap.from(".review-card", {
        y: 36,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: cardsRef, dependencies: [loading, filter] }
  );

  // ── Render ──
  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#F8F7F5] text-black"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Subtle texture overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-violet-100/60 blur-[120px]" />
        <div className="absolute bottom-[15%] left-[-8%] w-[40vw] h-[40vw] rounded-full bg-purple-100/50 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* ── Hero ── */}
        <section className="pt-36 pb-20 px-6 max-w-6xl mx-auto">
          <p className="hero-line text-[10px] tracking-[3px] uppercase text-violet-600/80 mb-5 font-semibold">
            Client Testimonials
          </p>

          <h1
            className="hero-line text-[52px] md:text-[76px] leading-[1.0] tracking-[-0.03em] font-bold mb-6 max-w-3xl text-black"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            What our clients
            <br />
            <em className="text-violet-600 not-italic">actually say</em>
          </h1>

          <p className="hero-line text-black/45 text-base leading-relaxed max-w-xl mb-14">
            Every review below is from a real client who worked with us. No
            cherry-picking, no marketing copy — just honest takes on the work.
          </p>

          {/* Stats */}
          {!loading && testimonials.length > 0 && (
            <div className="flex flex-wrap gap-10 pb-14 border-b border-black/[0.08]">
              <StatItem value={avgRating} label="Avg Rating" />
              <div className="w-px bg-black/[0.08] hidden md:block" />
              <StatItem value={String(testimonials.length)} label="Total Reviews" />
              <div className="w-px bg-black/[0.08] hidden md:block" />
              <StatItem value={String(fiveStarCount)} label="5-Star Reviews" accent />
            </div>
          )}
        </section>

        {/* ── Filters ── */}
        {!loading && testimonials.length > 0 && (
          <div className="px-6 max-w-6xl mx-auto mb-10">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by service">
              {allServices.map((s) => (
                <FilterTab
                  key={s}
                  label={s}
                  active={filter === s}
                  onClick={() => setFilter(s)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Cards ── */}
        <section className="px-6 max-w-6xl mx-auto pb-24" ref={cardsRef}>
          {loading ? (
            <div className="flex items-center gap-3 py-24 text-black/30">
              <span className="w-4 h-4 border border-black/15 border-t-violet-600 rounded-full animate-spin" />
              <span className="text-sm">Loading reviews…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-black/25 text-sm">No reviews yet for this service.</p>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
              {filtered.map((t, i) => (
                <ReviewCard key={t.id} testimonial={t} colorIndex={i} />
              ))}
            </div>
          )}
        </section>

        {/* ── CTA Banner ── */}
        <section className="border-t border-black/[0.08] bg-white">
          <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-[10px] tracking-[3px] uppercase text-violet-600/70 mb-3 font-semibold">
                Worked with us?
              </p>
              <h3
                className="text-[28px] md:text-[34px] leading-tight font-bold tracking-tight text-black"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Share your{" "}
                <em className="text-violet-600 not-italic">experience</em>
              </h3>
            </div>
            <Link
              href="/testimonials/submit"
              className="flex-shrink-0 flex items-center gap-3 px-6 py-3.5 bg-black hover:bg-violet-700 transition-colors text-[11px] font-semibold tracking-[2px] uppercase text-white group"
            >
              Leave a Review
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}