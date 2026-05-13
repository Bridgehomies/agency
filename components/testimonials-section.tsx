"use client";

import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

const AVATAR_COLORS = [
  "from-violet-600 to-purple-800",
  "from-indigo-500 to-violet-700",
  "from-purple-600 to-pink-700",
  "from-violet-700 to-blue-700",
  "from-fuchsia-600 to-violet-700",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((d) => {
        setTestimonials(d.testimonials || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useGSAP(
    () => {
      gsap.from(".tmn-heading", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      if (loading || !testimonials.length) return;
      gsap.from(".tmn-card", {
        x: 30,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: trackRef, dependencies: [loading, testimonials.length] }
  );

  if (!loading && testimonials.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 bg-[#080808] border-t border-white/[0.06] overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="tmn-heading text-[10px] tracking-[3px] uppercase text-violet-400/80 mb-3 font-medium">
              Client Reviews
            </p>
            <h2
              className="tmn-heading text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.025em] font-bold text-white"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Trusted by
              <br />
              <em className="text-violet-400 not-italic">builders & founders</em>
            </h2>
          </div>
          <Link
            href="/testimonials"
            className="tmn-heading flex-shrink-0 flex items-center gap-2 text-[11px] tracking-[2px] uppercase text-white/35 hover:text-violet-400 transition-colors group"
          >
            All Reviews
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </Link>
        </div>

        {/* Scrollable track */}
        {loading ? (
          <div className="flex items-center gap-3 py-12 text-white/25 text-sm">
            <span className="w-4 h-4 border border-white/20 border-t-violet-500 rounded-full animate-spin" />
            Loading reviews...
          </div>
        ) : (
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-none"
            style={{ scrollbarWidth: "none" }}
          >
            {testimonials.slice(0, 8).map((t, i) => (
              <div
                key={t.id}
                className="tmn-card flex-shrink-0 w-72 md:w-80 bg-white/[0.03] border border-white/[0.08] p-5 hover:border-violet-500/30 hover:bg-white/[0.05] transition-all duration-300 group"
              >
                {/* Stars */}
                <div className="flex gap-0.5 text-sm mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className={s <= t.rating ? "text-violet-400" : "text-white/12"}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-[13px] leading-relaxed text-white/60 mb-4 line-clamp-4 group-hover:text-white/80 transition-colors">
                  &ldquo;{t.feedback}&rdquo;
                </p>

                {/* Services */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {t.services.slice(0, 2).map((s) => (
                    <span
                      key={s}
                      className="px-2 py-[2px] text-[8px] tracking-[1px] uppercase border border-violet-500/20 text-violet-400/50"
                    >
                      {s}
                    </span>
                  ))}
                  {t.services.length > 2 && (
                    <span className="px-2 py-[2px] text-[8px] tracking-[1px] uppercase border border-white/10 text-white/25">
                      +{t.services.length - 2}
                    </span>
                  )}
                </div>

                {/* Author */}
                <div className="flex items-center gap-2.5 pt-3 border-t border-white/[0.06]">
                  <div
                    className={`w-7 h-7 rounded-full bg-gradient-to-br ${
                      AVATAR_COLORS[i % AVATAR_COLORS.length]
                    } flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}
                  >
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-white/75 leading-none mb-0.5">
                      {t.name}
                    </div>
                    {(t.role || t.company) && (
                      <div className="text-[9px] text-white/25">
                        {[t.role, t.company].filter(Boolean).join(" · ")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* View all card */}
            <Link
              href="/testimonials"
              className="tmn-card flex-shrink-0 w-48 bg-white/[0.02] border border-dashed border-white/[0.08] flex flex-col items-center justify-center gap-3 text-center p-6 hover:border-violet-500/30 transition-all duration-300 group"
            >
              <span className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/40 group-hover:border-violet-500/40 group-hover:text-violet-400 transition-all text-sm">
                →
              </span>
              <span className="text-[10px] tracking-[1.5px] uppercase text-white/30 group-hover:text-violet-400/70 transition-colors">
                View All Reviews
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}