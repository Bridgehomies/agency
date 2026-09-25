"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  Loader2,
  Globe,
  Mail,
  User,
  Briefcase,
  Link2,
  FileText,
  Image as ImageIcon,
  ChevronRight,
  Landmark,
  ShieldCheck,
  Upload,
  Copy,
  Check,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4 | 5;
type ContentFormat = "markdown" | "json";
type PublishOption = "" | "exchange" | "paid";
type PaidPlan = "" | "advance" | "after_live";

type FormData = {
  name: string;
  email: string;
  phone: string;
  occupation: string;
  bio: string;
  backlinks: { label: string; url: string }[];
  title: string;
  category: string;
  excerpt: string;
  tags: string;
  contentFormat: ContentFormat;
  content: string;
  faqText: string;
  coverImageFile: File | null;
  coverImagePreview: string;
  // ── Publishing / payment choice ──
  publishOption: PublishOption;
  exchangeUrl: string; // required when publishOption === "exchange"
  paidPlan: PaidPlan; // required when publishOption === "paid"
  paymentProofFile: File | null; // required when paidPlan === "advance"
  paymentProofPreview: string;
};

const DRAFT_STORAGE_KEY = "bh_guest_post_draft_v1";

const CATEGORIES = [
  "Custom Web Apps",
  "Admin Dashboards",
  "Automation Tools",
  "SaaS Platforms",
  "AI Integrations",
  "ML-Based Tools",
  "Smart Dashboards",
  "eCommerce Platforms",
  "Invoice & Billing Systems",
  "Lead Generation & Outreach",
  "SEO & AEO",
  "Content Marketing",
  "Case Studies",
  "Opinion & Insights",
];

const NICHES = [
  { label: "Custom Web Apps", desc: "Scalable, bespoke beyond off-the-shelf" },
  { label: "Admin Dashboards", desc: "Data-rich interfaces and control panels" },
  { label: "Automation & SaaS", desc: "Tools that replace repetitive work at scale" },
  { label: "AI / ML Integrations", desc: "Smart systems, models, and data pipelines" },
  { label: "eCommerce & Billing", desc: "Storefronts, invoicing, FBR integrations" },
  { label: "Lead Gen & Outreach", desc: "Growth tooling for the software industry" },
];

// Guest post guidelines rendered as semantic <ul> for crawlers
const WE_PUBLISH = [
  "Technical how-tos and architecture breakdowns",
  "Case studies with real metrics and outcomes",
  "Tool or stack comparisons backed by experience",
  "Opinion pieces grounded in hands-on work",
];
const WE_DONT = [
  "Generic explainers with no original depth",
  "Promotional copy or press releases",
  "AI-generated filler without genuine insight",
  "Articles under 1,000 words",
];

// FAQ data rendered as semantic <dl> for crawlers (mirrors JSON-LD)
const FAQ_ITEMS = [
  {
    q: "Is it free to write for Bridge Homies?",
    a: "Reciprocal link exchanges are $0. Paid placements are $10 if you pay in advance, or $12 if you'd rather pay after your piece is verified live.",
  },
  {
    q: "Do I get a dofollow backlink?",
    a: "Every accepted article includes up to 1–2 permanent dofollow links, placed naturally in the body.",
  },
  {
    q: "What is the minimum word count?",
    a: "1,000+ words minimum, deeply technical and 100% human-written. AI-generated filler is rejected during technical review.",
  },
  {
    q: "How long does review take?",
    a: "2–3 business days for technical review, formatting, and publication.",
  },
  {
    q: "What topics can I write about?",
    a: "Custom web apps, admin dashboards, SaaS, AI/ML integrations, automation, eCommerce, billing systems, lead generation, SEO, and software case studies.",
  },
  {
    q: "Will I get an author profile?",
    a: "Yes every published contributor gets a permanent author profile page with their bio and backlinks.",
  },
  {
    q: "What niches are excluded?",
    a: "Zero-tolerance: casino/gambling/iGaming, CBD/cannabis/pharma, crypto/forex/high-risk finance, adult, and essay-writing or general non-technical content — at any price.",
  },
];

// ─── Content format templates (same authoring model as BlogWriterPortal) ──

const markdownTemplate = `## Start with a strong search-intent heading

Write your article body in Markdown. Use headings, short paragraphs, and lists that answer the reader's question directly.

### Suggested structure

- The problem your reader is searching for
- Your practical answer or approach
- Real examples, steps, or a mini case study
- Link your backlinks naturally, e.g. [Bridge Homies](https://bridgehomies.com)
`;

const jsonTemplate = `{
  "blocks": [
    {
      "type": "heading",
      "level": 2,
      "text": "Start with a strong search-intent heading"
    },
    {
      "type": "paragraph",
      "text": "Write your article body in JSON blocks. Each block becomes a rendered section on the published page."
    },
    {
      "type": "heading",
      "level": 3,
      "text": "Suggested structure"
    },
    {
      "type": "list",
      "items": [
        "The problem your reader is searching for",
        "Your practical answer or approach",
        "Real examples, steps, or a mini case study"
      ]
    }
  ]
}`;

function extractJsonBlocks(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) {
    return value as Record<string, unknown>[];
  }
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (Array.isArray(record.blocks)) return record.blocks as Record<string, unknown>[];
    if (Array.isArray(record.content)) return record.content as Record<string, unknown>[];
    if (Array.isArray(record.body)) return record.body as Record<string, unknown>[];
  }
  return [];
}

function renderPreviewText(content: string) {
  return content
    .split("\n")
    .map((line) => line.replace(/^#{1,6}\s*/, "").replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);
}

function getWordCount(content: string, format: ContentFormat): number {
  if (format === "json") {
    try {
      const parsed = JSON.parse(content);
      const blocks = extractJsonBlocks(parsed);
      const text = blocks
        .map((b) => {
          if (typeof b.text === "string") return b.text;
          if (Array.isArray(b.items)) return b.items.join(" ");
          return "";
        })
        .join(" ");
      return text.split(/\s+/).filter(Boolean).length;
    } catch {
      return 0;
    }
  }
  return content
    .replace(/^#{1,6}\s*/gm, "")
    .split(/\s+/)
    .filter(Boolean).length;
}

// ─── Live preview (ported from BlogWriterPortal) ───────────────────────────

function JsonPreview({ content }: { content: string }) {
  try {
    const parsed = JSON.parse(content);
    const blocks = extractJsonBlocks(parsed);

    if (blocks.length === 0) {
      return (
        <p style={{ fontSize: 13, color: "#9b2c2a" }}>
          JSON is valid, but no `blocks`, `content`, or `body` array was found.
        </p>
      );
    }

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {blocks.map((block, index) => {
          const type = typeof block.type === "string" ? block.type : "paragraph";

          if (type === "heading") {
            const level = Math.min(6, Math.max(1, Number(block.level || 2)));
            const Tag = `h${level}` as any;
            return (
              <Tag
                key={index}
                style={{
                  fontFamily: "var(--font-baskerville), serif",
                  fontWeight: 700,
                  color: "#0a0a0a",
                  fontSize: level === 2 ? "1.4rem" : "1.15rem",
                  margin: 0,
                }}
              >
                {String(block.text || "")}
              </Tag>
            );
          }

          if (type === "paragraph") {
            return (
              <p key={index} style={{ fontSize: 13, lineHeight: 1.85, color: "#444", margin: 0 }}>
                {String(block.text || "")}
              </p>
            );
          }

          if (type === "list") {
            const items = Array.isArray(block.items) ? block.items : [];
            const ListTag = (block.ordered ? "ol" : "ul") as any;
            return (
              <ListTag
                key={index}
                style={{
                  paddingLeft: 20,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: "#444",
                }}
              >
                {items.map((item: any, itemIndex: number) => (
                  <li key={itemIndex}>{String(item)}</li>
                ))}
              </ListTag>
            );
          }

          if (type === "quote") {
            return (
              <blockquote
                key={index}
                style={{
                  borderLeft: "3px solid #c8401a",
                  margin: 0,
                  padding: "4px 0 4px 16px",
                  color: "#6b6560",
                  fontStyle: "italic",
                  fontSize: 13,
                }}
              >
                {String(block.text || "")}
              </blockquote>
            );
          }

          if (type === "code") {
            return (
              <pre
                key={index}
                style={{
                  background: "#0a0a0a",
                  color: "#f5f1ea",
                  borderRadius: 0,
                  padding: "12px 16px",
                  fontSize: 12,
                  overflowX: "auto",
                  fontFamily: "var(--font-plex-mono), monospace",
                }}
              >
                <code>{String(block.code || "")}</code>
              </pre>
            );
          }

          return (
            <p key={index} style={{ fontSize: 13, color: "#444" }}>
              {typeof block.text === "string" ? block.text : JSON.stringify(block)}
            </p>
          );
        })}
      </div>
    );
  } catch (error) {
    return (
      <p style={{ fontSize: 13, color: "#9b2c2a" }}>
        Invalid JSON. {error instanceof Error ? error.message : "Check the syntax and try again."}
      </p>
    );
  }
}

function MarkdownPreview({ content }: { content: string }) {
  const lines = renderPreviewText(content);

  if (lines.length === 0) {
    return <p style={{ fontSize: 13, color: "#a39d94" }}>Start writing to see a preview.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {lines.slice(0, 12).map((line, index) => (
        <p
          key={index}
          style={
            index === 0
              ? { fontFamily: "var(--font-baskerville), serif", fontSize: "1.4rem", fontWeight: 700, color: "#0a0a0a", margin: 0 }
              : { fontSize: 13, lineHeight: 1.85, color: "#444", margin: 0 }
          }
        >
          {line}
        </p>
      ))}
      {lines.length > 12 ? (
        <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a39d94" }}>
          Preview truncated
        </p>
      ) : null}
    </div>
  );
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  occupation: "",
  bio: "",
  backlinks: [
    { label: "", url: "" },
    { label: "", url: "" },
    { label: "", url: "" },
  ],
  title: "",
  category: "Custom Web Apps",
  excerpt: "",
  tags: "",
  contentFormat: "markdown",
  content: markdownTemplate,
  faqText: "",
  coverImageFile: null,
  coverImagePreview: "",
  publishOption: "",
  exchangeUrl: "",
  paidPlan: "",
  paymentProofFile: null,
  paymentProofPreview: "",
};

// Fields that are safe (and small enough) to persist to localStorage as an
// in-progress draft. File objects can't be serialized, so they're excluded
// — a resumed draft asks the contributor to re-attach the image / proof.
function serializableDraft(form: FormData) {
  const { coverImageFile, paymentProofFile, coverImagePreview, paymentProofPreview, ...rest } = form;
  return rest;
}

// ─── Step indicator ─────────────────────────────────────────────────────────
// PERF FIX: this component used to inject its own <style> tag on every
// render. It's now pure markup — its CSS lives once in `sharedStyles`,
// rendered a single time by the top-level BlogSubmitPortal component.
function StepIndicator({ step, total, labels }: { step: Step; total: number; labels: string[] }) {
  return (
    <div className="step-indicator" role="navigation" aria-label="Form steps">
      {labels.map((label, i) => {
        const s = i + 1;
        const state = s < step ? "done" : s === step ? "active" : "idle";
        return (
          <div key={i} className="step-item">
            <div className="step-dot">
              <div className={`step-circle ${state}`} aria-label={`Step ${s}: ${label}`}>
                {state === "done" ? <CheckCircle size={15} /> : s}
              </div>
              <span className={`step-label ${state}`}>{label}</span>
            </div>
            {i < labels.length - 1 && (
              <div className="step-line">
                <div className="step-line-fill" style={{ width: state === "done" ? "100%" : "0%" }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Field wrapper ─────────────────────────────────────────────────────────
// PERF FIX: same as StepIndicator above — this renders inside every step,
// for every input on the form (10-15+ instances). It used to inject a
// duplicate <style> tag on each render, which is exactly what PageSpeed's
// "Reduce unused CSS" and main-thread/forced-reflow diagnostics were
// picking up. Its CSS now lives once in `sharedStyles`.
function Field({ label, hint, children, required }: {
  label: string; hint?: React.ReactNode; children: React.ReactNode; required?: boolean;
}) {
  return (
    <label className="field-block">
      <span className="field-label">
        {label}{required && <span className="field-req" aria-label="required">*</span>}
      </span>
      {children}
      {hint && <p className="field-hint">{hint}</p>}
    </label>
  );
}

const inputCls = "bh-input";
const textareaCls = "bh-input bh-textarea";

// PERF FIX: removed the @import('fonts.googleapis.com/...') that used to
// open this string. @import inside a client-rendered <style> tag forces a
// 4-hop chain (HTML -> parse <style> -> discover @import -> fetch CSS ->
// fetch font files) before the H1 ("Write for Us / Publish on Bridge
// Homies" — the LCP element on this page) can paint in its final font.
// That chain is what PageSpeed flagged as "render-blocking requests" and
// "network dependency tree", and the fallback-to-webfont swap it caused
// (serif Playfair Display vs. the browser's sans-serif fallback, on a
// two-line clamp()-sized heading) is the CLS "layout shift culprit".
//
// Fonts now load once, site-wide, via next/font/google in the root layout
// (see app/fonts.ts + app/layout.tsx) and are referenced below as CSS
// variables. Make sure the *.variable classes from app/fonts.ts are applied
// on <html> or <body> in the root layout so these variables are in scope.
//
// Also merged in: the CSS that used to live in separate <style> tags inside
// the Field and StepIndicator components (see PERF FIX notes above them),
// now declared exactly once here.
// ── Editorial design tokens — same palette/fonts as /blog ───────────────
// ink #0a0a0a · paper #f5f1ea · muted #6b6560 · accent #c8401a · violet #7c3aed · rule #d4cfc6
const sharedStyles = `
  .bh-root { font-family: var(--font-plex-sans), sans-serif; }

  .bh-input {
    width: 100%;
    background: #fff;
    border: 1px solid #d4cfc6;
    border-radius: 0;
    padding: 11px 14px;
    font-size: 14px;
    color: #0a0a0a;
    font-family: var(--font-plex-sans), sans-serif;
    outline: none;
    transition: border-color 0.15s;
    -webkit-appearance: none;
  }
  .bh-input:focus {
    border-color: #c8401a;
    background: #fff;
  }
  .bh-input::placeholder { color: #a39d94; }
  .bh-textarea { resize: vertical; min-height: 100px; }

  select.bh-input { cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b6560' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 14px center; padding-right:36px; }

  .bh-btn-primary {
    display:inline-flex; align-items:center; gap:8px;
    background:#0a0a0a; color:#f5f1ea;
    border:none; border-radius:0;
    padding:12px 28px; font-size:0.65rem; font-weight:600;
    font-family: var(--font-plex-mono), monospace;
    letter-spacing:0.1em; text-transform:uppercase;
    cursor:pointer; transition:background 0.15s;
  }
  .bh-btn-primary:hover { background:#c8401a; }
  .bh-btn-primary:disabled { opacity:0.4; cursor:not-allowed; }

  .bh-btn-submit {
    display:inline-flex; align-items:center; gap:8px;
    background:#c8401a; color:#f5f1ea;
    border:none; border-radius:0;
    padding:12px 28px; font-size:0.65rem; font-weight:700;
    font-family: var(--font-plex-mono), monospace;
    letter-spacing:0.1em; text-transform:uppercase;
    cursor:pointer; transition:background 0.15s;
  }
  .bh-btn-submit:hover { background:#0a0a0a; }
  .bh-btn-submit:disabled { opacity:0.4; cursor:not-allowed; }

  .bh-btn-ghost {
    display:inline-flex; align-items:center; gap:6px;
    background:transparent; color:#6b6560;
    border:1px solid #d4cfc6; border-radius:0;
    padding:12px 22px; font-size:0.65rem; font-weight:600;
    font-family: var(--font-plex-mono), monospace;
    letter-spacing:0.1em; text-transform:uppercase;
    cursor:pointer; transition:background 0.15s, border-color 0.15s;
  }
  .bh-btn-ghost:hover { border-color:#0a0a0a; color:#0a0a0a; }

  .bh-notice {
    border-radius: 0;
    padding: 14px 18px;
    font-size: 13px;
    line-height: 1.7;
    font-family: var(--font-plex-sans), sans-serif;
  }
  .bh-notice-gold { background:#f5f1ea; border:1px solid #d4cfc6; color:#6b6560; }
  .bh-notice-blue { background:#f5f1ea; border:1px solid #ded3f2; color:#4c1d95; }
  .bh-notice-green { background:#f0faf4; border:1px solid #b2dfc5; color:#1e6640; }
  .bh-notice-red   { background:#fdf1f0; border:1px solid #f2c4c1; color:#9b2c2a; }

  .bh-card {
    background:#fff;
    border:1px solid #d4cfc6;
    border-radius:0;
    padding:24px;
  }

  .bh-section-label {
    font-size:0.62rem;
    font-weight:700;
    letter-spacing:0.18em;
    text-transform:uppercase;
    color:#7c3aed;
    margin-bottom:16px;
    font-family: var(--font-plex-mono), monospace;
  }

  .phone-wrap .react-tel-input .form-control {
    width:100% !important; border-radius:0 !important;
    border:1px solid #d4cfc6 !important;
    background:#fff !important;
    padding:11px 14px 11px 48px !important;
    font-size:14px !important; color:#0a0a0a !important;
    height:auto !important; font-family: var(--font-plex-sans), sans-serif !important;
    box-shadow:none !important;
  }
  .phone-wrap .react-tel-input .form-control:focus {
    border-color:#c8401a !important;
    box-shadow:none !important;
  }
  .phone-wrap .react-tel-input .flag-dropdown {
    border-radius:0 !important;
    border:1px solid #d4cfc6 !important;
    border-right:none !important;
    background:#fff !important;
  }
  .phone-wrap .react-tel-input .selected-flag { border-radius:0 !important; padding:0 0 0 12px !important; background:transparent !important; }
  .phone-wrap .react-tel-input .selected-flag:hover { background:#f5f1ea !important; }
  .phone-wrap .react-tel-input .country-list { border-radius:0 !important; box-shadow:0 8px 32px -8px rgba(0,0,0,0.16) !important; border:1px solid #d4cfc6 !important; }

  /* ── merged from StepIndicator ───────────────────────────────────────── */
  .step-indicator { display:flex; align-items:center; gap:0; margin-bottom:40px; }
  .step-item { display:flex; align-items:center; flex:1; }
  .step-dot { display:flex; flex-direction:column; align-items:center; gap:6px; }
  .step-circle { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; font-family: var(--font-plex-mono), monospace; transition: all 0.3s; flex-shrink:0; }
  .step-circle.done   { background:#0a0a0a; color:#f5f1ea; border: 2px solid #0a0a0a; }
  .step-circle.active { background:#f5f1ea; color:#0a0a0a; border: 2px solid #7c3aed; }
  .step-circle.idle   { background:transparent; color:#a39d94; border: 2px solid #d4cfc6; }
  .step-label { font-size:0.6rem; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; white-space:nowrap; font-family: var(--font-plex-mono), monospace; }
  .step-label.done   { color:#6b6560; }
  .step-label.active { color:#0a0a0a; }
  .step-label.idle   { color:#a39d94; }
  .step-line { flex:1; height:1px; background:#d4cfc6; position:relative; margin: 0 4px; margin-bottom: 22px; }
  .step-line-fill { position:absolute; inset:0; background:#7c3aed; transition: width 0.5s ease; }
  @media(max-width:480px) { .step-label { display:none; } }

  /* ── merged from Field ───────────────────────────────────────────────── */
  .field-block { display:block; }
  .field-label { display:flex; align-items:center; gap:4px; font-size:0.62rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#6b6560; margin-bottom:8px; font-family: var(--font-plex-mono), monospace; }
  .field-req { color:#c8401a; }
  .field-hint { font-size:11.5px; color:#a39d94; margin-top:6px; line-height:1.6; font-weight:400; text-transform:none; letter-spacing:0; font-family: var(--font-plex-sans), sans-serif; }
`;

// ─── Steps ─────────────────────────────────────────────────────────────────

function Step1({ form, update }: { form: FormData; update: (k: keyof FormData, v: any) => void }) {
  return (
    <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ gridColumn: "1/-1" }}>
        <div className="bh-notice bh-notice-gold">
          <strong style={{ fontWeight: 700 }}>Step 1 of 5 Tell us about yourself</strong> Our editorial team reviews every submission personally. A complete profile with a real bio and role increases your chances of acceptance significantly.
        </div>
      </div>
      <Field label="Full Name" required>
        <div style={{ position: "relative" }}>
          <User size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#a39d94", pointerEvents: "none" }} />
          <input className={inputCls} style={{ paddingLeft: 36 }} placeholder="Jane Smith" value={form.name} onChange={(e) => update("name", e.target.value)} required />
        </div>
      </Field>
      <Field label="Occupation / Role" required>
        <div style={{ position: "relative" }}>
          <Briefcase size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#a39d94", pointerEvents: "none" }} />
          <input className={inputCls} style={{ paddingLeft: 36 }} placeholder="Full-Stack Developer, Acme Inc." value={form.occupation} onChange={(e) => update("occupation", e.target.value)} required />
        </div>
      </Field>
      <Field label="Email Address" required hint="We'll notify you when your guest post is reviewed.">
        <div style={{ position: "relative" }}>
          <Mail size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#a39d94", pointerEvents: "none" }} />
          <input type="email" className={inputCls} style={{ paddingLeft: 36 }} placeholder="jane@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} required />
        </div>
      </Field>
      <Field label="Phone Number" hint="Optional only for editorial follow-ups.">
        <div className="phone-wrap">
          <PhoneInput country="pk" value={form.phone} onChange={(v) => update("phone", v)} enableSearch searchPlaceholder="Search country…" inputProps={{ name: "phone", autoComplete: "tel" }} />
        </div>
      </Field>
      <div style={{ gridColumn: "1/-1" }}>
        <Field label="Short Bio" required hint="2–3 sentences. Appears on your published author profile page.">
          <textarea className={textareaCls} placeholder="I'm a software engineer specialising in custom SaaS platforms and AI-integrated dashboards for mid-market businesses." value={form.bio} onChange={(e) => update("bio", e.target.value)} required />
        </Field>
      </div>
    </div>
  );
}

function Step2({ form, update }: { form: FormData; update: (k: keyof FormData, v: any) => void }) {
  function updateLink(i: number, field: "label" | "url", val: string) {
    const next = form.backlinks.map((bl, idx) => (idx === i ? { ...bl, [field]: val } : bl));
    update("backlinks", next);
  }
  const filled = form.backlinks.filter(bl => bl.url.trim());

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div className="bh-notice bh-notice-gold">
        <strong style={{ fontWeight: 700 }}>Your dofollow backlinks (up to 1–2)</strong> These appear in your permanent author profile on every article you publish here. For the highest SEO value, also weave them naturally into your article body in Step 3.
      </div>
      {form.backlinks.map((bl, i) => (
        <div key={i} className="bh-card">
          <p className="bh-section-label">Link {i + 1}{i === 0 ? " recommended" : " optional"}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Display Label">
              <input className={inputCls} placeholder={["My Website", "LinkedIn Profile", "Portfolio"][i]} value={bl.label} onChange={(e) => updateLink(i, "label", e.target.value)} />
            </Field>
            <Field label="URL">
              <div style={{ position: "relative" }}>
                <Globe size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#a39d94", pointerEvents: "none" }} />
                <input type="url" className={inputCls} style={{ paddingLeft: 36 }} placeholder="https://yoursite.com" value={bl.url} onChange={(e) => updateLink(i, "url", e.target.value)} />
              </div>
            </Field>
          </div>
        </div>
      ))}
      {filled.length > 0 && (
        <div className="bh-notice bh-notice-blue">
          <strong style={{ fontWeight: 700 }}>Heads-up for Step 3:</strong> You have {filled.length} backlink{filled.length > 1 ? "s" : ""} queued. Contextual, in-body links rank significantly higher than footer or bio links weave them into your article naturally.
        </div>
      )}
    </div>
  );
}

function Step3({ form, update }: { form: FormData; update: (k: keyof FormData, v: any) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  function handleFile(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("Please upload an image file (JPG, PNG, WebP)."); return; }
    if (file.size > 5 * 1024 * 1024) { alert("Image must be under 5 MB."); return; }
    const reader = new FileReader();
    reader.onload = (e) => { update("coverImagePreview", e.target?.result as string); update("coverImageFile", file); };
    reader.readAsDataURL(file);
  }

  const filled = form.backlinks.filter(bl => bl.url.trim());

  function insertBacklink(bl: { label: string; url: string }) {
    const anchor = bl.label || bl.url;
    const snippet = `[${anchor}](${bl.url})`;
    const el = contentRef.current;

    if (!el) {
      update("content", `${form.content} ${snippet} `);
      return;
    }

    const start = el.selectionStart ?? form.content.length;
    const end = el.selectionEnd ?? form.content.length;
    const next = form.content.slice(0, start) + snippet + form.content.slice(end);
    update("content", next);

    requestAnimationFrame(() => {
      el.focus();
      const pos = start + snippet.length;
      el.setSelectionRange(pos, pos);
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
      {filled.length > 0 && (
        <div className="bh-notice bh-notice-gold" style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <Link2 size={15} style={{ marginTop: 2, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <strong style={{ fontWeight: 700 }}>Include your backlinks in the article body</strong><br />
            <span style={{ fontSize: 12 }}>Click a link to insert it at your cursor, or type it manually as <code style={{ background: "#fff", borderRadius: 0, padding: "1px 6px", fontFamily: "var(--font-plex-mono), monospace", fontSize: 11 }}>[anchor text](url)</code>.</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
              {filled.map((bl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => insertBacklink(bl)}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #7c3aed", borderRadius: 0, padding: "5px 12px", fontSize: 11, fontWeight: 700, color: "#7c3aed", cursor: "pointer" }}
                >
                  <Link2 size={11} />
                  {bl.label || `Link ${i + 1}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div style={{ gridColumn: "1/-1" }}>
          <Field label="Article Title" required>
            <input className={inputCls} style={{ fontSize: 15 }} placeholder="How we built a custom admin dashboard that replaced 3 SaaS tools" value={form.title} onChange={(e) => update("title", e.target.value)} required />
          </Field>
        </div>
        <Field label="Category" required>
          <select className={inputCls} aria-label="Category" value={form.category} onChange={(e) => update("category", e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Tags" hint="Comma-separated, e.g. SaaS, AI, React">
          <input className={inputCls} placeholder="Custom Web App, React, Node.js" value={form.tags} onChange={(e) => update("tags", e.target.value)} />
        </Field>
        <div style={{ gridColumn: "1/-1" }}>
          <Field label="Excerpt / Summary" required hint="2–3 sentences shown in article cards and search snippets.">
            <textarea className={textareaCls} placeholder="A concise summary that hooks readers and performs in search." value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} required />
          </Field>
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <span className="field-label" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6560", marginBottom: 8, fontFamily: "var(--font-plex-sans), sans-serif" }}>
            Featured Image <span style={{ color: "#c8401a" }}>*</span>
          </span>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} aria-label="Upload featured image" tabIndex={-1} onChange={(e) => handleFile(e.target.files?.[0] ?? null)} />
          {form.coverImagePreview ? (
            <div style={{ position: "relative", borderRadius: 0, overflow: "hidden", border: "1px solid #d4cfc6" }}>
              <img src={form.coverImagePreview} alt="Cover preview" style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)", display: "flex", alignItems: "flex-end", padding: 14, gap: 10 }}>
                <span style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", borderRadius: 0, padding: "4px 12px", fontSize: 11, color: "#fff", fontWeight: 500 }}>{form.coverImageFile?.name}</span>
                <button type="button" onClick={() => { update("coverImageFile", null); update("coverImagePreview", ""); }} style={{ background: "#e53e3e", border: "none", borderRadius: 0, padding: "4px 12px", fontSize: 11, color: "#fff", fontWeight: 600, cursor: "pointer" }}>Remove</button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); (e.currentTarget as HTMLElement).style.borderColor = "#c8401a"; (e.currentTarget as HTMLElement).style.background = "#f5f1ea"; }}
              onDragLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#d4cfc6"; (e.currentTarget as HTMLElement).style.background = "#fff"; }}
              onDrop={(e) => { e.preventDefault(); (e.currentTarget as HTMLElement).style.borderColor = "#d4cfc6"; (e.currentTarget as HTMLElement).style.background = "#fff"; handleFile(e.dataTransfer.files?.[0] ?? null); }}
              style={{ border: "2px dashed #d4cfc6", borderRadius: 0, background: "#fff", padding: "40px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 0, background: "#f5f1ea", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ImageIcon size={22} color="#c8401a" />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#0a0a0a", margin: 0 }}>Drop image here or <span style={{ color: "#c8401a", textDecoration: "underline" }}>browse</span></p>
                <p style={{ fontSize: 11.5, color: "#a39d94", margin: "4px 0 0" }}>JPG, PNG, WebP · max 5 MB · recommended 1200×630</p>
              </div>
            </div>
          )}
        </div>

        {/* ── Content format + body — same writing model as BlogWriterPortal ── */}
        <div style={{ gridColumn: "1/-1" }}>
          <Field label="Content Format" required hint="Choose how you'd like to write your article.">
            <select
              className={inputCls}
              value={form.contentFormat}
              onChange={(e) => {
                const nextFormat = e.target.value as ContentFormat;
                const currentTemplate = form.contentFormat === "json" ? jsonTemplate : markdownTemplate;
                const nextTemplate = nextFormat === "json" ? jsonTemplate : markdownTemplate;

                update("contentFormat", nextFormat);
                if (form.content.trim() === currentTemplate.trim() || !form.content.trim()) {
                  update("content", nextTemplate);
                }
              }}
            >
              <option value="markdown">Markdown / MDX</option>
              <option value="json">JSON blocks</option>
            </select>
          </Field>
        </div>

        <div style={{ gridColumn: "1/-1" }}>
          <span className="field-label" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6560", marginBottom: 8, fontFamily: "var(--font-plex-sans), sans-serif" }}>
            Article Body <span style={{ color: "#c8401a" }}>*</span>
          </span>
          <textarea
            ref={contentRef}
            className={textareaCls}
            style={{ minHeight: "22rem", fontFamily: "var(--font-plex-mono), monospace", fontSize: 13, lineHeight: 1.8 }}
            value={form.content}
            onChange={(e) => update("content", e.target.value)}
            required
          />
          <p style={{ fontSize: 11.5, color: "#a39d94", marginTop: 6, lineHeight: 1.6 }}>
            {form.contentFormat === "json"
              ? "Use JSON blocks. Supported JSON can be an array of blocks or an object with `blocks`, `content`, or `body`."
              : "Use Markdown or MDX. Minimum 1,000 words."}{" "}
            <strong style={{ color: "#7c3aed", fontWeight: 600 }}>Remember to embed your backlinks naturally.</strong>
          </p>
        </div>

        {/* ── Live preview ── */}
        <div style={{ gridColumn: "1/-1" }} className="bh-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, borderBottom: "1px solid #d4cfc6", paddingBottom: 14, marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7c3aed", margin: 0 }}>Live preview</p>
              <h3 style={{ fontFamily: "var(--font-baskerville), serif", fontSize: "1.4rem", fontWeight: 700, color: "#0a0a0a", margin: "4px 0 0" }}>
                {form.title || "Untitled article"}
              </h3>
            </div>
            <span style={{ borderRadius: 0, background: "#f5f1ea", padding: "4px 12px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b6560" }}>
              {form.contentFormat === "json" ? "JSON preview" : "Draft preview"}
            </span>
          </div>
          {form.excerpt ? (
            <p style={{ fontSize: 13, lineHeight: 1.85, color: "#6b6560", borderBottom: "1px solid #d4cfc6", paddingBottom: 16, marginBottom: 16 }}>
              {form.excerpt}
            </p>
          ) : null}
          {form.contentFormat === "json" ? <JsonPreview content={form.content} /> : <MarkdownPreview content={form.content} />}
        </div>

        <div style={{ gridColumn: "1/-1" }}>
          <Field label="FAQ Pairs" hint={<span>Optional boosts AEO/SEO. One per line: <code style={{ background: "#f5f1ea", borderRadius: 0, padding: "1px 6px", fontFamily: "var(--font-plex-mono), monospace", fontSize: 11 }}>Question::Answer</code></span>}>
            <textarea className={textareaCls} style={{ minHeight: 100 }} placeholder={"What is a custom web app?::A custom web app is tailored specifically to your business needs.\nHow long does a dashboard take?::Most take 4–12 weeks depending on complexity."} value={form.faqText} onChange={(e) => update("faqText", e.target.value)} />
          </Field>
        </div>
      </div>
    </div>
  );
}

// ─── Bank details (fetched on demand, never hardcoded client-side) ───────
type BankDetails = {
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  bankName: string;
  bankAddress: string;
  accountType: string;
  bankCountry: string;
};

function BankDetailsCard({ amountLabel }: { amountLabel: string }) {
  const [details, setDetails] = useState<BankDetails | null>(null);
  const [loadError, setLoadError] = useState("");
  const [copiedField, setCopiedField] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/blog/payment-details", { cache: "no-store" })
      .then((res) => { if (!res.ok) throw new Error("failed"); return res.json(); })
      .then((data: BankDetails) => { if (!cancelled) setDetails(data); })
      .catch(() => { if (!cancelled) setLoadError("Couldn't load transfer details. Please refresh or contact us."); });
    return () => { cancelled = true; };
  }, []);

  function copy(field: string, value: string) {
    navigator.clipboard?.writeText(value).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(""), 1500);
    });
  }

  const rows: { key: keyof BankDetails; label: string }[] = [
    { key: "accountName", label: "Account Name" },
    { key: "accountNumber", label: "Account Number" },
    { key: "routingNumber", label: "Routing Number" },
    { key: "bankName", label: "Bank" },
    { key: "bankAddress", label: "Bank Address" },
    { key: "accountType", label: "Account Type" },
  ];

  return (
    <div className="bh-card" style={{ background: "#f5f1ea" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <ShieldCheck size={15} color="#2d8653" />
        <p className="bh-section-label" style={{ margin: 0 }}>Bank transfer details — {amountLabel}</p>
      </div>
      {loadError && <p style={{ fontSize: 12.5, color: "#9b2c2a" }}>{loadError}</p>}
      {!details && !loadError && (
        <p style={{ fontSize: 12.5, color: "#a39d94", display: "flex", alignItems: "center", gap: 8 }}>
          <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> Loading secure transfer details…
        </p>
      )}
      {details && (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {rows.map(({ key, label }, i) => (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: "10px 0",
                borderBottom: i < rows.length - 1 ? "1px solid #d4cfc6" : "none",
              }}
            >
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a39d94", margin: "0 0 2px" }}>{label}</p>
                <p style={{ fontSize: 13.5, color: "#0a0a0a", margin: 0, fontFamily: key === "accountNumber" || key === "routingNumber" ? "var(--font-plex-mono), monospace" : "inherit" }}>{details[key]}</p>
              </div>
              <button
                type="button"
                onClick={() => copy(key, details[key])}
                aria-label={`Copy ${label}`}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: copiedField === key ? "#2d8653" : "#a39d94", display: "flex", alignItems: "center", padding: 4, flexShrink: 0 }}
              >
                {copiedField === key ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          ))}
        </div>
      )}
      <p style={{ fontSize: 11, color: "#a39d94", marginTop: 14, lineHeight: 1.6 }}>
        These details are fetched securely and are never stored in your browser. Please double-check the account number before sending a transfer.
      </p>
    </div>
  );
}

function Step4({ form, update }: { form: FormData; update: (k: keyof FormData, v: any) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleProofFile(file: File | null) {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) { alert("File must be under 8 MB."); return; }
    const reader = new FileReader();
    reader.onload = (e) => { update("paymentProofPreview", e.target?.result as string); update("paymentProofFile", file); };
    reader.readAsDataURL(file);
  }

  const options: { id: PublishOption; title: string; price: string; desc: string }[] = [
    { id: "exchange", title: "Reciprocal Link Exchange", price: "$0", desc: "You link to us from a live page on your site — we publish your guest post free." },
    { id: "paid", title: "Paid Placement", price: "$10–$12", desc: "No link exchange needed. Pay a small placement fee instead." },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="bh-notice bh-notice-gold">
        <strong style={{ fontWeight: 700 }}>Choose how you'd like to publish.</strong> Pick a reciprocal link exchange (free) or a paid placement.
      </div>

      {/* ── Publish option cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {options.map((opt) => {
          const active = form.publishOption === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => update("publishOption", opt.id)}
              style={{
                textAlign: "left",
                cursor: "pointer",
                background: active ? "#fff" : "#f5f1ea",
                border: active ? "2px solid #7c3aed" : "1px solid #d4cfc6",
                borderRadius: 0,
                padding: "18px 20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0a0a0a" }}>{opt.title}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", fontFamily: "var(--font-plex-mono), monospace" }}>{opt.price}</span>
              </div>
              <p style={{ fontSize: 12, color: "#6b6560", margin: 0, lineHeight: 1.6 }}>{opt.desc}</p>
            </button>
          );
        })}
      </div>

      {/* ── Reciprocal link exchange ── */}
      {form.publishOption === "exchange" && (
        <div className="bh-card">
          <p className="bh-section-label">Where did you add our link?</p>
          <Field label="URL of the page where you added our company link" required hint="Please add a link to our company on a live page before submitting.">
            <div style={{ position: "relative" }}>
              <Globe size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#a39d94", pointerEvents: "none" }} />
              <input
                type="url"
                className={inputCls}
                style={{ paddingLeft: 36 }}
                placeholder="https://yoursite.com/page-with-our-link"
                value={form.exchangeUrl}
                onChange={(e) => update("exchangeUrl", e.target.value)}
                required
              />
            </div>
          </Field>
        </div>
      )}

      {/* ── Paid placement ── */}
      {form.publishOption === "paid" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { id: "advance" as PaidPlan, title: "Pay in Advance", price: "$10", desc: "Send payment now and attach your transfer proof before submitting." },
              { id: "after_live" as PaidPlan, title: "Pay After Live", price: "$12", desc: "Submit now, pay once your article is verified live." },
            ].map((plan) => {
              const active = form.paidPlan === plan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => update("paidPlan", plan.id)}
                  style={{
                    textAlign: "left",
                    cursor: "pointer",
                    background: active ? "#fff" : "#f5f1ea",
                    border: active ? "2px solid #c8401a" : "1px solid #d4cfc6",
                    borderRadius: 0,
                    padding: "16px 18px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0a0a0a" }}>{plan.title}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#c8401a", fontFamily: "var(--font-plex-mono), monospace" }}>{plan.price}</span>
                  </div>
                  <p style={{ fontSize: 11.5, color: "#6b6560", margin: 0, lineHeight: 1.6 }}>{plan.desc}</p>
                </button>
              );
            })}
          </div>

          {form.paidPlan && (
            <BankDetailsCard amountLabel={form.paidPlan === "advance" ? "$10, pay in advance" : "$12, pay after your post is live"} />
          )}

          {form.paidPlan === "advance" && (
            <div className="bh-card">
              <p className="bh-section-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Landmark size={13} /> Money transfer proof <span style={{ color: "#c8401a" }}>*</span>
              </p>
              <p style={{ fontSize: 12, color: "#6b6560", margin: "0 0 12px", lineHeight: 1.6 }}>
                Please send your $10 transfer first, then attach a screenshot or receipt below. You can't submit your post until this is attached.
              </p>
              <input ref={fileInputRef} type="file" accept="image/*,.pdf" style={{ display: "none" }} aria-label="Upload payment proof" onChange={(e) => handleProofFile(e.target.files?.[0] ?? null)} />
              {form.paymentProofFile ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, border: "1px solid #d4cfc6", background: "#f0faf4", padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                    <CheckCircle size={16} color="#2d8653" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 12.5, color: "#0a0a0a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{form.paymentProofFile.name}</span>
                  </div>
                  <button type="button" onClick={() => { update("paymentProofFile", null); update("paymentProofPreview", ""); }} style={{ background: "transparent", border: "none", color: "#9b2c2a", cursor: "pointer", fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", flexShrink: 0 }}>Remove</button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{ border: "2px dashed #d4cfc6", background: "#fff", padding: "24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", textAlign: "center" }}
                >
                  <Upload size={16} color="#c8401a" />
                  <span style={{ fontSize: 12.5, color: "#6b6560" }}>Attach transfer proof (image or PDF, max 8 MB)</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Step5({ form }: { form: FormData }) {
  const filled = form.backlinks.filter(bl => bl.url.trim());
  const wordCount = getWordCount(form.content, form.contentFormat);
  const paymentSummary =
    form.publishOption === "exchange"
      ? "Reciprocal link exchange (free)"
      : form.publishOption === "paid"
      ? form.paidPlan === "advance" ? "Paid — $10, pay in advance" : form.paidPlan === "after_live" ? "Paid — $12, pay after live" : "Paid — plan not selected"
      : "Not selected";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div className="bh-notice bh-notice-green">
        <strong style={{ fontWeight: 700 }}>Ready to submit your guest post.</strong> Review everything below, then hit <em>Submit for Review</em>. We'll respond within 2–3 business days.
      </div>
      <div className="bh-card">
        <p className="bh-section-label">Author</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px", fontSize: 13, color: "#0a0a0a" }}>
          <div><span style={{ fontWeight: 600, color: "#6b6560" }}>Name </span>{form.name}</div>
          <div><span style={{ fontWeight: 600, color: "#6b6560" }}>Email </span>{form.email}</div>
          <div><span style={{ fontWeight: 600, color: "#6b6560" }}>Role </span>{form.occupation}</div>
          {form.phone && <div><span style={{ fontWeight: 600, color: "#6b6560" }}>Phone </span>+{form.phone}</div>}
          <div style={{ gridColumn: "1/-1" }}><span style={{ fontWeight: 600, color: "#6b6560" }}>Bio </span>{form.bio}</div>
        </div>
      </div>
      {filled.length > 0 && (
        <div className="bh-card">
          <p className="bh-section-label">Backlinks</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
            {filled.map((bl, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Globe size={13} color="#c8401a" />
                <span style={{ fontWeight: 600 }}>{bl.label || "—"}</span>
                <span style={{ color: "#6b6560", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{bl.url}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="bh-card">
        <p className="bh-section-label">Article</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px", fontSize: 13, color: "#0a0a0a" }}>
          <div style={{ gridColumn: "1/-1" }}><span style={{ fontWeight: 600, color: "#6b6560" }}>Title </span>{form.title}</div>
          <div><span style={{ fontWeight: 600, color: "#6b6560" }}>Category </span>{form.category}</div>
          <div><span style={{ fontWeight: 600, color: "#6b6560" }}>Format </span>{form.contentFormat === "json" ? "JSON blocks" : "Markdown / MDX"}</div>
          <div><span style={{ fontWeight: 600, color: "#6b6560" }}>Word count </span>~{wordCount} words {wordCount < 1000 && <span style={{ color: "#c8401a", fontWeight: 700 }}>(min 1,000)</span>}</div>
          <div><span style={{ fontWeight: 600, color: "#6b6560" }}>Tags </span>{form.tags || "—"}</div>
          <div><span style={{ fontWeight: 600, color: "#6b6560" }}>Image </span>{form.coverImageFile?.name || "None"}</div>
          <div style={{ gridColumn: "1/-1" }}><span style={{ fontWeight: 600, color: "#6b6560" }}>Excerpt </span>{form.excerpt}</div>
        </div>
      </div>
      <div className="bh-card">
        <p className="bh-section-label">Publishing option</p>
        <div style={{ fontSize: 13, color: "#0a0a0a" }}>
          <span style={{ fontWeight: 600, color: "#6b6560" }}>Plan </span>{paymentSummary}
          {form.publishOption === "exchange" && form.exchangeUrl && (
            <div style={{ marginTop: 6 }}><span style={{ fontWeight: 600, color: "#6b6560" }}>Link exchange URL </span>{form.exchangeUrl}</div>
          )}
          {form.publishOption === "paid" && form.paidPlan === "advance" && (
            <div style={{ marginTop: 6 }}><span style={{ fontWeight: 600, color: "#6b6560" }}>Transfer proof </span>{form.paymentProofFile?.name || "Not attached"}</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Success ─────────────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div style={{ minHeight: "50vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px", textAlign: "center" }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#f0faf4", border: "2px solid #b2dfc5", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
        <CheckCircle size={30} color="#2d8653" />
      </div>
      <h2 style={{ fontFamily: "var(--font-bebas), sans-serif", textTransform: "uppercase", letterSpacing: "0.01em", fontSize: "2.6rem", color: "#0a0a0a", margin: "0 0 14px" }}>You're in the queue!</h2>
      <p style={{ fontSize: 14, lineHeight: 1.8, color: "#6b6560", fontFamily: "var(--font-plex-sans), sans-serif", maxWidth: 440, margin: "0 0 10px" }}>
        Your guest post has been received. Our editorial team will review it and get back to you within <strong style={{ color: "#0a0a0a" }}>2–3 business days</strong>.
      </p>
      <p style={{ fontSize: 13, lineHeight: 1.8, color: "#a39d94", fontFamily: "var(--font-plex-sans), sans-serif", maxWidth: 400, margin: "0 0 32px" }}>
        Once accepted, your article will be published with your author profile and all backlinks live.
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        <a href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0a0a0a", color: "#f5f1ea", borderRadius: 0, padding: "12px 24px", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none", fontFamily: "var(--font-plex-mono), monospace" }}>
          Browse the blog <ArrowRight size={14} />
        </a>
        <a href="/blog/write-for-us" onClick={() => window.location.reload()} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#6b6560", border: "1px solid #d4cfc6", borderRadius: 0, padding: "12px 24px", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none", fontFamily: "var(--font-plex-mono), monospace" }}>
          Submit another post
        </a>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function BlogSubmitPortal() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [draftBanner, setDraftBanner] = useState<"none" | "offer" | "dismissed">("none");

  // ── Draft persistence: resume an abandoned submission ──────────────────
  // On mount, check for a previously saved in-progress draft and offer to
  // resume it, so leaving mid-way doesn't lose the contributor's work.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
      if (raw) setDraftBanner("offer");
    } catch {
      // localStorage unavailable (private browsing, etc.) — skip silently.
    }
  }, []);

  // Autosave the in-progress form (minus files) to localStorage on every
  // change, so if the person closes the tab or navigates away mid-form,
  // their progress is kept as a draft instead of lost.
  useEffect(() => {
    if (submitted || draftBanner === "offer") return;
    try {
      window.localStorage.setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify({ step, form: serializableDraft(form), savedAt: Date.now() })
      );
    } catch {
      // Ignore quota/availability errors — autosave is best-effort.
    }
  }, [form, step, submitted, draftBanner]);

  function resumeDraft() {
    try {
      const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setForm(prev => ({ ...prev, ...parsed.form }));
        setStep((parsed.step ?? 1) as Step);
      }
    } catch {
      // Corrupt draft — just start fresh.
    }
    setDraftBanner("dismissed");
  }

  function discardDraft() {
    try { window.localStorage.removeItem(DRAFT_STORAGE_KEY); } catch {}
    setDraftBanner("dismissed");
  }

  function clearDraft() {
    try { window.localStorage.removeItem(DRAFT_STORAGE_KEY); } catch {}
  }

  function update(key: keyof FormData, val: any) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  function validate(s: Step): string {
    if (s === 1) {
      if (!form.name.trim()) return "Please enter your full name.";
      if (!form.email.trim()) return "Please enter your email address.";
      if (!form.occupation.trim()) return "Please enter your occupation.";
      if (!form.bio.trim()) return "Please add a short bio.";
    }
    if (s === 3) {
      if (!form.title.trim()) return "Please enter an article title.";
      if (!form.excerpt.trim()) return "Please add a short excerpt.";
      const templateTrim = (form.contentFormat === "json" ? jsonTemplate : markdownTemplate).trim();
      if (!form.content.trim() || form.content.trim() === templateTrim) return "Please write your article content.";
      if (!form.coverImageFile) return "Please upload a featured image.";
    }
    if (s === 4) {
      if (!form.publishOption) return "Please choose how you'd like to publish — link exchange or paid placement.";
      if (form.publishOption === "exchange" && !form.exchangeUrl.trim()) {
        return "Please share the URL of the page where you added our company link.";
      }
      if (form.publishOption === "paid") {
        if (!form.paidPlan) return "Please choose a payment plan.";
        if (form.paidPlan === "advance" && !form.paymentProofFile) {
          return "Please attach your money transfer proof before continuing you can't submit an advance-paid post without it.";
        }
      }
    }
    return "";
  }

  function nextStep() {
    const err = validate(step);
    if (err) { setError(err); return; }
    setError("");
    setStep(prev => Math.min(5, prev + 1) as Step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prevStep() {
    setError("");
    setStep(prev => Math.max(1, prev - 1) as Step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    const stepErr = validate(3) || validate(4);
    if (stepErr) { setError(stepErr); return; }
    setError("");
    startTransition(async () => {
      try {
        const data = new FormData();
        data.append("name", form.name);
        data.append("email", form.email);
        data.append("phone", form.phone ? `+${form.phone}` : "");
        data.append("occupation", form.occupation);
        data.append("bio", form.bio);
        data.append("backlinks", JSON.stringify(form.backlinks.filter(bl => bl.url.trim())));
        data.append("title", form.title);
        data.append("category", form.category);
        data.append("excerpt", form.excerpt);
        data.append("tags", form.tags);
        data.append("content", form.content);
        data.append("faqText", form.faqText);
        if (form.coverImageFile) data.append("coverImage", form.coverImageFile);
        data.append("publishOption", form.publishOption);
        data.append("paidPlan", form.paidPlan);
        data.append("exchangeUrl", form.exchangeUrl);
        if (form.paymentProofFile) data.append("paymentProof", form.paymentProofFile);

        const res = await fetch("/api/blog/submit", { method: "POST", body: data });
        const result = await res.json();
        if (!res.ok) { setError(result.error || "Something went wrong. Please try again."); return; }
        clearDraft();
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        setError("Network error. Please check your connection and try again.");
      }
    });
  }

  const STEP_LABELS = ["About You", "Your Links", "The Article", "Payment", "Review"];

  if (submitted) return (
    <div className="bh-root" style={{ minHeight: "100vh", background: "#f5f1ea", padding: "160px 24px 80px" }}>
      <style>{sharedStyles}</style>
      <div style={{ maxWidth: 680, margin: "0 auto" }}><SuccessScreen /></div>
    </div>
  );

  return (
    <div className="bh-root" style={{ minHeight: "100vh", background: "#fff", padding: "160px 24px 80px" }}>
      {/* sharedStyles is now rendered exactly once, here, for the whole
          multi-step form — not re-injected by Field/StepIndicator on every
          render. */}
      <style>{sharedStyles}</style>

      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        {/* ── Breadcrumb (semantic + crawler-readable) ── */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 20 }}>
          <ol
            itemScope
            itemType="https://schema.org/BreadcrumbList"
            style={{ display: "flex", alignItems: "center", gap: 6, listStyle: "none", padding: 0, margin: 0, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#a39d94", fontFamily: "var(--font-plex-mono), monospace" }}
          >
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" style={{ color: "#6b6560", textDecoration: "none" }}><span itemProp="name">Home</span></a>
              <meta itemProp="position" content="1" />
            </li>
            <li style={{ color: "#d4cfc6" }}>/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/blog" itemProp="item" style={{ color: "#6b6560", textDecoration: "none" }}><span itemProp="name">Blog</span></a>
              <meta itemProp="position" content="2" />
            </li>
            <li style={{ color: "#d4cfc6" }}>/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" style={{ color: "#0a0a0a" }}>Write for Us</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        {/* ── Hero ── */}
        <header style={{ marginBottom: 64 }}>
          {/* SEO: exact-match keyword in prominent position before H1 */}
          <div style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ height: 6, width: 6, background: "#7c3aed" }} aria-hidden="true" />
            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b6560", margin: 0, fontFamily: "var(--font-plex-mono), monospace" }}>
              Write for Us — Guest Post Submission Portal
            </p>
          </div>

          <div style={{ marginBottom: 24, height: 2, width: 64, background: "#0a0a0a" }} />

          {/*
            SEO CRITICAL: H1 must contain the exact keyword "Write for Us".
            This is the primary ranking signal on-page.

            PERF: this H1 is the page's LCP element. It now paints against
            next/font's self-hosted, preloaded Bebas Neue instead of
            waiting on the old @import chain — see the sharedStyles comment
            above for the full explanation.
          */}
          <h1 style={{ fontFamily: "var(--font-bebas), sans-serif", textTransform: "uppercase", fontSize: "clamp(2.4rem, 6vw, 4.2rem)", lineHeight: 0.95, letterSpacing: "0.01em", color: "#0a0a0a", margin: "0 0 20px", maxWidth: 640 }}>
            Write for Us <span style={{ color: "#7c3aed" }}>Publish on Bridge Homies</span>
          </h1>

          <p style={{ fontSize: "1.02rem", lineHeight: 1.85, color: "#6b6560", fontFamily: "var(--font-baskerville), serif", fontStyle: "italic", maxWidth: 560, margin: "0 0 16px" }}>
            We publish guest posts from developers, architects, product managers, and founders who build real software for real businesses.
            Submit an article and reach thousands of readers plus earn up to <strong style={{ fontStyle: "normal", color: "#0a0a0a" }}>1–2 dofollow backlinks</strong> and a <strong style={{ fontStyle: "normal", color: "#0a0a0a" }}>permanent author profile</strong>. Paid placements are <strong style={{ fontStyle: "normal", color: "#0a0a0a" }}>$10</strong> paid in advance or <strong style={{ fontStyle: "normal", color: "#0a0a0a" }}>$12</strong> paid after your piece is live — reciprocal link exchanges are <strong style={{ fontStyle: "normal", color: "#0a0a0a" }}>$0</strong>.
          </p>
          <p style={{ fontSize: 13.5, lineHeight: 1.8, color: "#6b6560", fontFamily: "var(--font-plex-sans), sans-serif", maxWidth: 560, margin: "0 0 36px" }}>
            We cover <strong style={{ color: "#0a0a0a" }}>custom web apps</strong>, <strong style={{ color: "#0a0a0a" }}>admin dashboards</strong>, <strong style={{ color: "#0a0a0a" }}>automation tools</strong>, <strong style={{ color: "#0a0a0a" }}>AI integrations</strong>, <strong style={{ color: "#0a0a0a" }}>SaaS platforms</strong>, <strong style={{ color: "#0a0a0a" }}>eCommerce systems</strong>, and software built for growing businesses everything beyond what WordPress handles.
          </p>

          {/* Niche grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 28 }}>
            {NICHES.map(({ label, desc }) => (
              <div key={label} style={{ background: "#fff", border: "1px solid #d4cfc6", borderRadius: 0, padding: "14px 16px" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#0a0a0a", margin: "0 0 4px", fontFamily: "var(--font-plex-sans), sans-serif" }}>{label}</p>
                <p style={{ fontSize: 11, color: "#6b6560", margin: 0, lineHeight: 1.5, fontFamily: "var(--font-plex-sans), sans-serif" }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              "$10–$12 per placement ($0 link exchange)",
              "Up to 1–2 dofollow backlinks",
              "Editorial review in 2–3 days",
              "Permanent author profile",
              "1,000+ words minimum",
              "No AI filler accepted",
              "Pay in advance or after live",
            ].map(tag => (
              <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#fff", border: "1px solid #d4cfc6", borderRadius: 0, padding: "5px 12px", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "#6b6560", fontFamily: "var(--font-plex-mono), monospace" }}>
                <CheckCircle size={11} color="#7c3aed" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* ── Draft resume banner ── */}
        {draftBanner === "offer" && (
          <div className="bh-notice bh-notice-blue" style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <span><strong style={{ fontWeight: 700 }}>You have an unfinished guest post in progress.</strong> Pick up where you left off?</span>
            <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
              <button type="button" onClick={resumeDraft} className="bh-btn-primary" style={{ padding: "8px 16px" }}>Resume draft</button>
              <button type="button" onClick={discardDraft} className="bh-btn-ghost" style={{ padding: "8px 16px" }}>Start fresh</button>
            </div>
          </div>
        )}

        {/* ── Step indicator ── */}
        <StepIndicator step={step} total={5} labels={STEP_LABELS} />

        {/* ── Form card ── */}
        <section aria-label="Guest post submission form">
          <div style={{ background: "#fff", border: "1px solid #d4cfc6", borderRadius: 0, padding: "36px 40px" }}>
            <div style={{ borderBottom: "1px solid #d4cfc6", paddingBottom: 20, marginBottom: 28 }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7c3aed", margin: "0 0 6px", fontFamily: "var(--font-plex-mono), monospace" }}>
                Step {step} of 5
              </p>
              {/*
                H2 inside the form secondary heading, not competing with H1.
                Uses "write for us" adjacent copy at step 3 naturally.
              */}
              <h2 style={{ fontFamily: "var(--font-bebas), sans-serif", textTransform: "uppercase", letterSpacing: "0.01em", fontSize: "2rem", color: "#0a0a0a", margin: 0 }}>
                {["Tell us about yourself", "Add your dofollow backlinks", "Write your article", "How would you like to publish?", "Review & submit your guest post"][step - 1]}
              </h2>
            </div>

            {step === 1 && <Step1 form={form} update={update} />}
            {step === 2 && <Step2 form={form} update={update} />}
            {step === 3 && <Step3 form={form} update={update} />}
            {step === 4 && <Step4 form={form} update={update} />}
            {step === 5 && <Step5 form={form} />}

            {error && (
              <div className="bh-notice bh-notice-red" style={{ marginTop: 20, display: "flex", alignItems: "flex-start", gap: 10 }} role="alert">
                <XCircle size={15} style={{ marginTop: 2, flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid #d4cfc6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button type="button" onClick={prevStep} className="bh-btn-ghost" style={{ visibility: step === 1 ? "hidden" : "visible" }}>
                Back
              </button>
              {step < 5 ? (
                <button type="button" onClick={nextStep} className="bh-btn-primary">
                  Continue <ChevronRight size={14} />
                </button>
              ) : (
                <button type="button" onClick={handleSubmit} disabled={isPending} className="bh-btn-submit">
                  {isPending
                    ? <><Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />Submitting…</>
                    : <>Submit guest post <FileText size={14} /></>}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ── Guest post guidelines (semantic, crawlable) ── */}
        <section aria-labelledby="guidelines-heading" style={{ marginTop: 32, background: "#f2eaf5ff", border: "1px solid #d4cfc6", borderRadius: 0, padding: "28px 32px" }}>
          <h2 id="guidelines-heading" style={{ fontFamily: "var(--font-bebas), sans-serif", textTransform: "uppercase", letterSpacing: "0.01em", fontSize: "1.7rem", color: "#0a0a0a", margin: "0 0 10px" }}>
            Guest Post Guidelines — Who Should Write for Us?
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: "#6b6560", fontFamily: "var(--font-plex-sans), sans-serif", margin: "0 0 20px" }}>
            We welcome practitioners developers, architects, product managers, and founders who work hands-on with custom web applications, admin dashboards, SaaS platforms, AI/ML integrations, automation tooling, eCommerce systems, and lead generation software. If you build real software for real businesses, your experience belongs here. Guest posts must be original, not published elsewhere, and a minimum of 1,000 words. Strictly software engineering, SaaS architecture, AI/ML, cloud/DevOps, or web/mobile development — we do not accept casino, CBD/pharma, crypto/forex, adult, or general non-technical content at any price.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <h3 style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#2d8653", margin: "0 0 10px", fontFamily: "var(--font-plex-mono), monospace" }}>We publish</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {WE_PUBLISH.map(t => (
                  <li key={t} style={{ fontSize: 12, color: "#6b6560", margin: "0 0 6px", lineHeight: 1.6, paddingLeft: 12, borderLeft: "2px solid #b2dfc5", fontFamily: "var(--font-plex-sans), sans-serif" }}>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9b2c2a", margin: "0 0 10px", fontFamily: "var(--font-plex-mono), monospace" }}>We don't publish</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {WE_DONT.map(t => (
                  <li key={t} style={{ fontSize: 12, color: "#6b6560", margin: "0 0 6px", lineHeight: 1.6, paddingLeft: 12, borderLeft: "2px solid #f2c4c1", fontFamily: "var(--font-plex-sans), sans-serif" }}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── FAQ section (semantic <dl>, mirrors JSON-LD FAQPage) ── */}
        <section aria-labelledby="faq-heading" style={{ marginTop: 24, background: "#f5f1ea", border: "1px solid #d4cfc6", borderRadius: 0, padding: "28px 32px" }}>
          <h2 id="faq-heading" style={{ fontFamily: "var(--font-bebas), sans-serif", textTransform: "uppercase", letterSpacing: "0.01em", fontSize: "1.7rem", color: "#0a0a0a", margin: "0 0 20px" }}>
            Frequently Asked Questions — Write for Us
          </h2>
          <dl style={{ margin: 0 }}>
            {FAQ_ITEMS.map(({ q, a }, i) => (
              <div key={i} style={{ borderBottom: i < FAQ_ITEMS.length - 1 ? "1px solid #d4cfc6" : "none", paddingBottom: 14, marginBottom: 14 }}>
                <dt style={{ fontSize: 13, fontWeight: 700, color: "#0a0a0a", margin: "0 0 5px", fontFamily: "var(--font-plex-sans), sans-serif" }}>{q}</dt>
                <dd style={{ fontSize: 13, color: "#6b6560", margin: 0, lineHeight: 1.75, fontFamily: "var(--font-plex-sans), sans-serif" }}>{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p style={{ textAlign: "center", fontSize: 11.5, color: "#a39d94", marginTop: 24, lineHeight: 1.7, fontFamily: "var(--font-plex-sans), sans-serif" }}>
          By submitting your guest post you agree to our editorial guidelines. We respond within 2–3 business days. Your email is never shared publicly.
        </p>
      </div>
    </div>
  );
}