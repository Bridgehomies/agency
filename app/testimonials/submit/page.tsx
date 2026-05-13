"use client";

import { useState, useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

// ─── Constants ────────────────────────────────────────────────────────────────
const SERVICES = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "AI & ML Engineering",
  "Custom Software",
  "SaaS Development",
  "Digital Strategy",
  "Enterprise Software",
] as const;

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"] as const;

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  services: string[];
  rating: number;
  feedback: string;
};

type Status = "idle" | "loading" | "success" | "error";

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  services: [],
  rating: 0,
  feedback: "",
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-3xl transition-transform duration-150 hover:scale-110 focus:outline-none"
          aria-label={`Rate ${star} stars`}
        >
          <span className={star <= (hovered || value) ? "text-violet-600" : "text-black/15"}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
}

function FieldLabel({
  children,
  required,
  optional,
}: {
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label className="block text-[10px] tracking-[2px] uppercase text-black/40 mb-2 font-semibold">
      {children}{" "}
      {required && <span className="text-violet-600">*</span>}
      {optional && (
        <span className="text-black/25 normal-case tracking-normal text-[9px] font-normal">
          (optional)
        </span>
      )}
    </label>
  );
}

const inputClass =
  "w-full bg-black/[0.03] border border-black/10 px-4 py-3 text-sm text-black placeholder:text-black/25 outline-none focus:border-violet-500 focus:bg-violet-50/30 transition-all duration-200";

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function TestimonialSubmitPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // ── Animations ──
  useGSAP(
    () => {
      gsap.from(".anim-header", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });
      gsap.from(".anim-field", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.07,
        delay: 0.3,
      });
    },
    { scope: containerRef }
  );

  // ── Handlers ──
  const setField = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleService = useCallback((s: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter((x) => x !== s)
        : [...prev.services, s],
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    // Validation
    if (!form.name || !form.email || !form.services.length || !form.rating || !form.feedback) {
      setErrorMsg("Please fill in all required fields and select at least one service.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    if (form.feedback.trim().length < 30) {
      setErrorMsg("Feedback must be at least 30 characters.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        gsap.to(".form-wrap", { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" });
        gsap.from(".success-wrap", { opacity: 0, y: 30, duration: 0.7, delay: 0.3, ease: "power3.out" });
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }, [form]);

  // ── Render ──
  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#F8F7F5] text-black selection:bg-violet-200"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-violet-100/60 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-100/50 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* Back link */}
        <Link
          href="/"
          className="anim-header inline-flex items-center gap-2 text-[11px] tracking-[2px] uppercase text-black/30 hover:text-violet-600 transition-colors mb-12 font-semibold"
        >
          <span>←</span> Bridge Homies
        </Link>

        {status === "success" ? (
          /* ── Success state ── */
          <div className="success-wrap text-center py-16">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-violet-100 border border-violet-300 flex items-center justify-center text-2xl text-violet-600">
              ✓
            </div>
            <h2
              className="text-3xl font-bold mb-3 tracking-tight text-black"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Thank you, {form.name.split(" ")[0]}!
            </h2>
            <p className="text-black/45 text-sm leading-relaxed max-w-sm mx-auto">
              Your review has been submitted and is under review. We genuinely
              appreciate you taking the time — it means a lot to the team.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 border border-black/12 text-[11px] tracking-[2px] uppercase text-black/45 hover:text-black hover:border-black/30 transition-all font-semibold"
            >
              Back to homepage
            </Link>
          </div>
        ) : (
          /* ── Form ── */
          <div className="form-wrap">
            {/* Header */}
            <div className="mb-12">
              <p className="anim-header text-[10px] tracking-[3px] uppercase text-violet-600/80 mb-4 font-semibold">
                Bridge Homies — Client Review
              </p>
              <h1
                className="anim-header text-[42px] md:text-[56px] leading-[1.05] tracking-[-0.02em] font-bold mb-4 text-black"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Share your
                <br />
                <em className="text-violet-600 not-italic">experience</em>
              </h1>
              <p className="anim-header text-black/45 text-sm leading-relaxed max-w-md">
                Your honest feedback helps us improve and helps other businesses
                understand what it&apos;s like to work with us.
              </p>
            </div>

            <div className="space-y-6">
              {/* Name + Email */}
              <div className="anim-field grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>Full Name</FieldLabel>
                  <input
                    type="text"
                    placeholder="e.g. Ahmad Raza"
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel required>Email</FieldLabel>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Phone + Company */}
              <div className="anim-field grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FieldLabel optional>Phone</FieldLabel>
                  <input
                    type="tel"
                    placeholder="+92 300 0000000"
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel optional>Company</FieldLabel>
                  <input
                    type="text"
                    placeholder="Your company name"
                    value={form.company}
                    onChange={(e) => setField("company", e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Role */}
              <div className="anim-field">
                <FieldLabel optional>Your Role</FieldLabel>
                <input
                  type="text"
                  placeholder="e.g. Founder, CTO, Product Manager"
                  value={form.role}
                  onChange={(e) => setField("role", e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Services */}
              <div className="anim-field">
                <FieldLabel required>Services Taken</FieldLabel>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Select services">
                  {SERVICES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleService(s)}
                      className={`px-3 py-1.5 text-[11px] tracking-[0.08em] border transition-all duration-200 font-medium ${
                        form.services.includes(s)
                          ? "border-violet-600 bg-violet-600 text-white"
                          : "border-black/12 text-black/40 hover:border-violet-400 hover:text-violet-600"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="anim-field">
                <FieldLabel required>Overall Rating</FieldLabel>
                <div className="flex items-center gap-4">
                  <StarRating
                    value={form.rating}
                    onChange={(v) => setField("rating", v)}
                  />
                  {form.rating > 0 && (
                    <span className="text-[11px] tracking-[1px] uppercase text-violet-600 font-semibold">
                      {RATING_LABELS[form.rating]}
                    </span>
                  )}
                </div>
              </div>

              {/* Feedback */}
              <div className="anim-field">
                <FieldLabel required>Your Feedback</FieldLabel>
                <textarea
                  rows={5}
                  placeholder="Tell us about your experience working with Bridge Homies — the project, the results, and the team..."
                  value={form.feedback}
                  onChange={(e) => setField("feedback", e.target.value)}
                  className={`${inputClass} resize-none`}
                />
                <p className="text-[10px] text-black/25 mt-1">
                  Min 30 characters · be as detailed as you like
                </p>
              </div>

              {/* Error */}
              {status === "error" && (
                <div className="anim-field border border-red-400/40 bg-red-50 px-4 py-3 text-[12px] text-red-600">
                  {errorMsg}
                </div>
              )}

              {/* Submit */}
              <div className="anim-field pt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  className="w-full py-4 bg-black hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[11px] font-semibold tracking-[2px] uppercase transition-colors duration-200 flex items-center justify-center gap-3 group"
                >
                  {status === "loading" ? (
                    <>
                      <span className="w-4 h-4 border border-white/40 border-t-white rounded-full animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit Review
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </>
                  )}
                </button>
                <p className="text-[10px] text-black/25 mt-3 text-center">
                  Reviews are manually approved before going live. Your email
                  is never shared publicly.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}