"use client";

import { useState, useTransition, useRef, useCallback } from "react";
import PhoneInput from "react-phone-input-2";
import React from "react";
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
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Code,
  Minus,
  Link,
  Undo,
  Redo,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4;

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
  content: string;
  faqText: string;
  coverImageFile: File | null;
  coverImagePreview: string;
};

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

// Guest post guidelines — rendered as semantic <ul> for crawlers
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
  "Articles under 800 words",
];

// FAQ data — rendered as semantic <dl> for crawlers (mirrors JSON-LD)
const FAQ_ITEMS = [
  {
    q: "Is it free to write for Bridge Homies?",
    a: "Yes — submitting a guest post is completely free. No fees, ever.",
  },
  {
    q: "Do I get a dofollow backlink?",
    a: "Every accepted article includes up to 3 dofollow backlinks in your author profile, plus natural in-body links.",
  },
  {
    q: "What is the minimum word count?",
    a: "800 words minimum. We recommend 1,200–2,500 words for best editorial and SEO performance.",
  },
  {
    q: "How long does review take?",
    a: "Our editorial team responds within 3–5 business days.",
  },
  {
    q: "What topics can I write about?",
    a: "Custom web apps, admin dashboards, SaaS, AI/ML integrations, automation, eCommerce, billing systems, lead generation, SEO, and software case studies.",
  },
  {
    q: "Will I get an author profile?",
    a: "Yes — every published contributor gets a permanent author profile page with their bio and backlinks.",
  },
];

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
  content: "",
  faqText: "",
  coverImageFile: null,
  coverImagePreview: "",
};

// ─── Rich Text Editor ───────────────────────────────────────────────────────

function RichEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);

  const exec = useCallback((command: string, val?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, val ?? undefined);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  }, [onChange]);

  const insertLink = useCallback(() => {
    const url = prompt("Enter URL:");
    if (url) exec("createLink", url);
  }, [exec]);

  const handleInput = useCallback(() => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  }, [onChange]);

  const tools: { title: string; action: () => void; icon: React.ReactNode; group?: string }[] = [
    { title: "Bold", action: () => exec("bold"), icon: <Bold size={14} />, group: "format" },
    { title: "Italic", action: () => exec("italic"), icon: <Italic size={14} />, group: "format" },
    { title: "Heading 2", action: () => exec("formatBlock", "<h2>"), icon: <Heading2 size={14} />, group: "block" },
    { title: "Heading 3", action: () => exec("formatBlock", "<h3>"), icon: <Heading3 size={14} />, group: "block" },
    { title: "Blockquote", action: () => exec("formatBlock", "<blockquote>"), icon: <Quote size={14} />, group: "block" },
    { title: "Inline Code", action: () => exec("formatBlock", "<pre>"), icon: <Code size={14} />, group: "block" },
    { title: "Bullet List", action: () => exec("insertUnorderedList"), icon: <List size={14} />, group: "list" },
    { title: "Numbered List", action: () => exec("insertOrderedList"), icon: <ListOrdered size={14} />, group: "list" },
    { title: "Divider", action: () => exec("insertHorizontalRule"), icon: <Minus size={14} />, group: "insert" },
    { title: "Insert Link", action: insertLink, icon: <Link size={14} />, group: "insert" },
    { title: "Undo", action: () => exec("undo"), icon: <Undo size={14} />, group: "history" },
    { title: "Redo", action: () => exec("redo"), icon: <Redo size={14} />, group: "history" },
  ];

  const groups = ["format", "block", "list", "insert", "history"];

  return (
    <div className="rich-editor-wrap">
      <style>{`
        .rich-editor-wrap { border: 1px solid rgba(0,0,0,0.12); border-radius: 12px; overflow: hidden; background: #fff; }
        .rich-toolbar { display: flex; align-items: center; gap: 2px; padding: 8px 10px; border-bottom: 1px solid rgba(0,0,0,0.08); background: #fafaf9; flex-wrap: wrap; }
        .rich-toolbar-sep { width: 1px; height: 20px; background: rgba(0,0,0,0.10); margin: 0 4px; }
        .rich-btn { display:flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:6px; border:none; background:transparent; cursor:pointer; color:#444; transition:background 0.12s,color 0.12s; }
        .rich-btn:hover { background:rgba(0,0,0,0.07); color:#111; }
        .rich-content { min-height: 340px; padding: 20px 24px; font-size: 14px; line-height: 1.85; color: #1a1a1a; outline: none; font-family: 'Georgia', serif; }
        .rich-content:empty::before { content: attr(data-placeholder); color: #aaa; font-style: italic; pointer-events:none; }
        .rich-content h2 { font-size: 1.35em; font-weight: 700; margin: 1.4em 0 0.5em; font-family: inherit; color: #111; }
        .rich-content h3 { font-size: 1.1em; font-weight: 700; margin: 1.2em 0 0.4em; font-family: inherit; color: #111; }
        .rich-content blockquote { border-left: 3px solid #c9a84c; margin: 1.2em 0; padding: 4px 0 4px 18px; color: #555; font-style: italic; }
        .rich-content pre { background: #f4f3f0; border-radius: 6px; padding: 12px 16px; font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 0.85em; overflow-x: auto; }
        .rich-content ul, .rich-content ol { padding-left: 24px; margin: 0.75em 0; }
        .rich-content li { margin-bottom: 0.3em; }
        .rich-content a { color: #b5883b; text-decoration: underline; }
        .rich-content hr { border: none; border-top: 1px solid rgba(0,0,0,0.12); margin: 1.6em 0; }
        .rich-content p { margin: 0.7em 0; }
      `}</style>
      <div className="rich-toolbar" onMouseDown={(e) => e.preventDefault()}>
        {groups.map((group, gi) => (
          <React.Fragment key={group}>
            {gi > 0 && <span className="rich-toolbar-sep" />}
            {tools.filter(t => t.group === group).map(t => (
              <button key={t.title} type="button" className="rich-btn" title={t.title} onClick={t.action}>
                {t.icon}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div
        ref={editorRef}
        className="rich-content"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder="Write your article here. Use the toolbar above to format headings, bold text, lists, and more…"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}

// ─── Step indicator ─────────────────────────────────────────────────────────

function StepIndicator({ step, total, labels }: { step: Step; total: number; labels: string[] }) {
  return (
    <div className="step-indicator" role="navigation" aria-label="Form steps">
      <style>{`
        .step-indicator { display:flex; align-items:center; gap:0; margin-bottom:40px; }
        .step-item { display:flex; align-items:center; flex:1; }
        .step-dot { display:flex; flex-direction:column; align-items:center; gap:6px; }
        .step-circle { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; font-family: 'Helvetica Neue', sans-serif; transition: all 0.3s; flex-shrink:0; }
        .step-circle.done   { background:#1a1a1a; color:#c9a84c; border: 2px solid #1a1a1a; }
        .step-circle.active { background:#f7f3fe; color:#1a1a1a; border: 2px solid purple; }
        .step-circle.idle   { background:transparent; color:#aaa; border: 2px solid #ddd; }
        .step-label { font-size:10px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; white-space:nowrap; }
        .step-label.done   { color:#7a6535; } 
        .step-label.active { color:#1a1a1a; }
        .step-label.idle   { color:#bbb; }
        .step-line { flex:1; height:1px; background:#00000061; position:relative; margin: 0 4px; margin-bottom: 22px; }
        .step-line-fill { position:absolute; inset:0; background:#c9a84c; transition: width 0.5s ease; }
        @media(max-width:480px) { .step-label { display:none; } }
      `}</style>
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

function Field({ label, hint, children, required }: {
  label: string; hint?: React.ReactNode; children: React.ReactNode; required?: boolean;
}) {
  return (
    <label className="field-block">
      <style>{`
        .field-block { display:block; }
        .field-label { display:flex; align-items:center; gap:4px; font-size:11.5px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#555; margin-bottom:8px; font-family:'Helvetica Neue',sans-serif; }
        .field-req { color:#c9a84c; }
        .field-hint { font-size:11.5px; color:#999; margin-top:6px; line-height:1.6; font-weight:400; text-transform:none; letter-spacing:0; }
      `}</style>
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

const sharedStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  .bh-root { font-family: 'DM Sans', sans-serif; }

  .bh-input {
    width: 100%;
    background: #fafaf8;
    border: 1px solid rgba(0,0,0,0.12);
    border-radius: 8px;
    padding: 11px 14px;
    font-size: 14px;
    color: #1a1a1a;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    -webkit-appearance: none;
  }
  .bh-input:focus {
    border-color: #c9a84c;
    box-shadow: 0 0 0 3px rgba(201,168,76,0.12);
    background: #fff;
  }
  .bh-input::placeholder { color: #bbb; }
  .bh-textarea { resize: vertical; min-height: 100px; }

  select.bh-input { cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 14px center; padding-right:36px; }

  .bh-btn-primary {
    display:inline-flex; align-items:center; gap:8px;
    background:#1a1a1a; color:#fff;
    border:none; border-radius:8px;
    padding:12px 28px; font-size:13px; font-weight:600;
    font-family:'DM Sans',sans-serif;
    letter-spacing:0.04em;
    cursor:pointer; transition:background 0.15s;
  }
  .bh-btn-primary:hover { background:#000; }
  .bh-btn-primary:disabled { opacity:0.5; cursor:not-allowed; }

  .bh-btn-submit {
    display:inline-flex; align-items:center; gap:8px;
    background:#c9a84c; color:#1a1a1a;
    border:none; border-radius:8px;
    padding:12px 28px; font-size:13px; font-weight:700;
    font-family:'DM Sans',sans-serif;
    letter-spacing:0.04em;
    cursor:pointer; transition:background 0.15s, box-shadow 0.15s;
  }
  .bh-btn-submit:hover { background:#b8963e; box-shadow: 0 4px 20px rgba(201,168,76,0.3); }
  .bh-btn-submit:disabled { opacity:0.5; cursor:not-allowed; }

  .bh-btn-ghost {
    display:inline-flex; align-items:center; gap:6px;
    background:transparent; color:#666;
    border:1px solid rgba(0,0,0,0.12); border-radius:8px;
    padding:12px 22px; font-size:13px; font-weight:500;
    font-family:'DM Sans',sans-serif;
    cursor:pointer; transition:background 0.15s;
  }
  .bh-btn-ghost:hover { background:#f5f5f4; }

  .bh-notice {
    border-radius: 8px;
    padding: 14px 18px;
    font-size: 13px;
    line-height: 1.7;
  }
  .bh-notice-gold { background:#f7f3fe; border:1px solid purple; color:#7a6535; }
  .bh-notice-blue { background:#f0f5ff; border:1px solid #c5d5f8; color:#3554a0; }
  .bh-notice-green { background:#f0faf4; border:1px solid #b2dfc5; color:#1e6640; }
  .bh-notice-red   { background:#fdf1f0; border:1px solid #f2c4c1; color:#9b2c2a; }

  .bh-card {
    background:#fff;
    border:1px solid rgba(0,0,0,0.08);
    border-radius:12px;
    padding:24px;
  }

  .bh-section-label {
    font-size:10px;
    font-weight:700;
    letter-spacing:0.18em;
    text-transform:uppercase;
    color:purple;
    margin-bottom:16px;
    font-family:'DM Sans',sans-serif;
  }

  .phone-wrap .react-tel-input .form-control {
    width:100% !important; border-radius:8px !important;
    border:1px solid rgba(0,0,0,0.12) !important;
    background:#fafaf8 !important;
    padding:11px 14px 11px 48px !important;
    font-size:14px !important; color:#1a1a1a !important;
    height:auto !important; font-family:'DM Sans',sans-serif !important;
    box-shadow:none !important;
  }
  .phone-wrap .react-tel-input .form-control:focus {
    border-color:#c9a84c !important;
    box-shadow:0 0 0 3px rgba(201,168,76,0.12) !important;
  }
  .phone-wrap .react-tel-input .flag-dropdown {
    border-radius:8px 0 0 8px !important;
    border:1px solid rgba(0,0,0,0.12) !important;
    border-right:none !important;
    background:#fafaf8 !important;
  }
  .phone-wrap .react-tel-input .selected-flag { border-radius:8px 0 0 8px !important; padding:0 0 0 12px !important; background:transparent !important; }
  .phone-wrap .react-tel-input .selected-flag:hover { background:rgba(201,168,76,0.08) !important; }
  .phone-wrap .react-tel-input .country-list { border-radius:8px !important; box-shadow:0 8px 32px -8px rgba(0,0,0,0.16) !important; border:1px solid rgba(0,0,0,0.10) !important; }
`;

// ─── Steps (unchanged logic, same as original) ────────────────────────────

function Step1({ form, update }: { form: FormData; update: (k: keyof FormData, v: any) => void }) {
  return (
    <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ gridColumn: "1/-1" }}>
        <div className="bh-notice bh-notice-gold">
          <strong style={{ fontWeight: 700 }}>Step 1 of 4 — Tell us about yourself</strong> — Our editorial team reviews every submission personally. A complete profile with a real bio and role increases your chances of acceptance significantly.
        </div>
      </div>
      <Field label="Full Name" required>
        <div style={{ position: "relative" }}>
          <User size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#bbb", pointerEvents: "none" }} />
          <input className={inputCls} style={{ paddingLeft: 36 }} placeholder="Jane Smith" value={form.name} onChange={(e) => update("name", e.target.value)} required />
        </div>
      </Field>
      <Field label="Occupation / Role" required>
        <div style={{ position: "relative" }}>
          <Briefcase size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#bbb", pointerEvents: "none" }} />
          <input className={inputCls} style={{ paddingLeft: 36 }} placeholder="Full-Stack Developer, Acme Inc." value={form.occupation} onChange={(e) => update("occupation", e.target.value)} required />
        </div>
      </Field>
      <Field label="Email Address" required hint="We'll notify you when your guest post is reviewed.">
        <div style={{ position: "relative" }}>
          <Mail size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#bbb", pointerEvents: "none" }} />
          <input type="email" className={inputCls} style={{ paddingLeft: 36 }} placeholder="jane@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} required />
        </div>
      </Field>
      <Field label="Phone Number" hint="Optional — only for editorial follow-ups.">
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
        <strong style={{ fontWeight: 700 }}>Your 3 dofollow backlinks</strong> — These appear in your permanent author profile on every article you publish here. For the highest SEO value, also weave them naturally into your article body in Step 3.
      </div>
      {form.backlinks.map((bl, i) => (
        <div key={i} className="bh-card">
          <p className="bh-section-label">Link {i + 1}{i === 0 ? " — recommended" : " — optional"}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Display Label">
              <input className={inputCls} placeholder={["My Website", "LinkedIn Profile", "Portfolio"][i]} value={bl.label} onChange={(e) => updateLink(i, "label", e.target.value)} />
            </Field>
            <Field label="URL">
              <div style={{ position: "relative" }}>
                <Globe size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#bbb", pointerEvents: "none" }} />
                <input type="url" className={inputCls} style={{ paddingLeft: 36 }} placeholder="https://yoursite.com" value={bl.url} onChange={(e) => updateLink(i, "url", e.target.value)} />
              </div>
            </Field>
          </div>
        </div>
      ))}
      {filled.length > 0 && (
        <div className="bh-notice bh-notice-blue">
          <strong style={{ fontWeight: 700 }}>Heads-up for Step 3:</strong> You have {filled.length} backlink{filled.length > 1 ? "s" : ""} queued. Contextual, in-body links rank significantly higher than footer or bio links — weave them into your article naturally.
        </div>
      )}
    </div>
  );
}

function Step3({ form, update }: { form: FormData; update: (k: keyof FormData, v: any) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("Please upload an image file (JPG, PNG, WebP)."); return; }
    if (file.size > 5 * 1024 * 1024) { alert("Image must be under 5 MB."); return; }
    const reader = new FileReader();
    reader.onload = (e) => { update("coverImagePreview", e.target?.result as string); update("coverImageFile", file); };
    reader.readAsDataURL(file);
  }

  const filled = form.backlinks.filter(bl => bl.url.trim());

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
      {filled.length > 0 && (
        <div className="bh-notice bh-notice-gold" style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <Link2 size={15} style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <strong style={{ fontWeight: 700 }}>Include your backlinks in the article body</strong><br />
            <span style={{ fontSize: 12 }}>{filled.map(bl => bl.label || bl.url).join(", ")} — embed these contextually for maximum SEO value.</span>
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
          <select className={inputCls} value={form.category} onChange={(e) => update("category", e.target.value)}>
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
          <span className="field-label" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", marginBottom: 8, fontFamily: "'DM Sans',sans-serif" }}>
            Featured Image <span style={{ color: "#c9a84c" }}>*</span>
          </span>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files?.[0] ?? null)} />
          {form.coverImagePreview ? (
            <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(0,0,0,0.10)" }}>
              <img src={form.coverImagePreview} alt="Cover preview" style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)", display: "flex", alignItems: "flex-end", padding: 14, gap: 10 }}>
                <span style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: "#fff", fontWeight: 500 }}>{form.coverImageFile?.name}</span>
                <button type="button" onClick={() => { update("coverImageFile", null); update("coverImagePreview", ""); }} style={{ background: "#e53e3e", border: "none", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: "#fff", fontWeight: 600, cursor: "pointer" }}>Remove</button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); (e.currentTarget as HTMLElement).style.borderColor = "#c9a84c"; (e.currentTarget as HTMLElement).style.background = "#fdf8ec"; }}
              onDragLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.12)"; (e.currentTarget as HTMLElement).style.background = "#fafaf8"; }}
              onDrop={(e) => { e.preventDefault(); (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.12)"; (e.currentTarget as HTMLElement).style.background = "#fafaf8"; handleFile(e.dataTransfer.files?.[0] ?? null); }}
              style={{ border: "2px dashed rgba(0,0,0,0.12)", borderRadius: 10, background: "#fafaf8", padding: "40px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 10, background: "#f2e9d0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ImageIcon size={22} color="#c9a84c" />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#333", margin: 0 }}>Drop image here or <span style={{ color: "#c9a84c", textDecoration: "underline" }}>browse</span></p>
                <p style={{ fontSize: 11.5, color: "#aaa", margin: "4px 0 0" }}>JPG, PNG, WebP · max 5 MB · recommended 1200×630</p>
              </div>
            </div>
          )}
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <span className="field-label" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", marginBottom: 8, fontFamily: "'DM Sans',sans-serif" }}>
            Article Body <span style={{ color: "#c9a84c" }}>*</span>
          </span>
          <RichEditor value={form.content} onChange={(v) => update("content", v)} />
          <p style={{ fontSize: 11.5, color: "#999", marginTop: 6, lineHeight: 1.6 }}>
            Use the toolbar for headings, bold, lists, blockquotes, and links. Minimum 800 words. <strong style={{ color: "purple", fontWeight: 600 }}>Remember to embed your backlinks naturally.</strong>
          </p>
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <Field label="FAQ Pairs" hint={<span>Optional — boosts AEO/SEO. One per line: <code style={{ background: "#f4f3f0", borderRadius: 4, padding: "1px 6px", fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>Question::Answer</code></span>}>
            <textarea className={textareaCls} style={{ minHeight: 100 }} placeholder={"What is a custom web app?::A custom web app is tailored specifically to your business needs.\nHow long does a dashboard take?::Most take 4–12 weeks depending on complexity."} value={form.faqText} onChange={(e) => update("faqText", e.target.value)} />
          </Field>
        </div>
      </div>
    </div>
  );
}

function Step4({ form }: { form: FormData }) {
  const filled = form.backlinks.filter(bl => bl.url.trim());
  const wordCount = form.content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div className="bh-notice bh-notice-green">
        <strong style={{ fontWeight: 700 }}>Ready to submit your guest post.</strong> Review everything below, then hit <em>Submit for Review</em>. We'll respond within 3–5 business days.
      </div>
      <div className="bh-card">
        <p className="bh-section-label">Author</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px", fontSize: 13, color: "#333" }}>
          <div><span style={{ fontWeight: 600, color: "#888" }}>Name </span>{form.name}</div>
          <div><span style={{ fontWeight: 600, color: "#888" }}>Email </span>{form.email}</div>
          <div><span style={{ fontWeight: 600, color: "#888" }}>Role </span>{form.occupation}</div>
          {form.phone && <div><span style={{ fontWeight: 600, color: "#888" }}>Phone </span>+{form.phone}</div>}
          <div style={{ gridColumn: "1/-1" }}><span style={{ fontWeight: 600, color: "#888" }}>Bio </span>{form.bio}</div>
        </div>
      </div>
      {filled.length > 0 && (
        <div className="bh-card">
          <p className="bh-section-label">Backlinks</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
            {filled.map((bl, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Globe size={13} color="#c9a84c" />
                <span style={{ fontWeight: 600 }}>{bl.label || "—"}</span>
                <span style={{ color: "#888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{bl.url}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="bh-card">
        <p className="bh-section-label">Article</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px", fontSize: 13, color: "#333" }}>
          <div style={{ gridColumn: "1/-1" }}><span style={{ fontWeight: 600, color: "#888" }}>Title </span>{form.title}</div>
          <div><span style={{ fontWeight: 600, color: "#888" }}>Category </span>{form.category}</div>
          <div><span style={{ fontWeight: 600, color: "#888" }}>Word count </span>~{wordCount} words {wordCount < 800 && <span style={{ color: "#c9a84c", fontWeight: 700 }}>(min 800)</span>}</div>
          <div><span style={{ fontWeight: 600, color: "#888" }}>Tags </span>{form.tags || "—"}</div>
          <div><span style={{ fontWeight: 600, color: "#888" }}>Image </span>{form.coverImageFile?.name || "None"}</div>
          <div style={{ gridColumn: "1/-1" }}><span style={{ fontWeight: 600, color: "#888" }}>Excerpt </span>{form.excerpt}</div>
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
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 800, color: "#1a1a1a", margin: "0 0 14px" }}>You're in the queue!</h2>
      <p style={{ fontSize: 14, lineHeight: 1.8, color: "#666", maxWidth: 440, margin: "0 0 10px" }}>
        Your guest post has been received. Our editorial team will review it and get back to you within <strong style={{ color: "#555" }}>3–5 business days</strong>.
      </p>
      <p style={{ fontSize: 13, lineHeight: 1.8, color: "#999", maxWidth: 400, margin: "0 0 32px" }}>
        Once accepted, your article will be published with your author profile and all backlinks live.
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        <a href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1a1a1a", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 13, fontWeight: 600, textDecoration: "none", fontFamily: "'DM Sans',sans-serif" }}>
          Browse the blog <ArrowRight size={14} />
        </a>
        <a href="/blog/write-for-us" onClick={() => window.location.reload()} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#555", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 8, padding: "12px 24px", fontSize: 13, fontWeight: 500, textDecoration: "none", fontFamily: "'DM Sans',sans-serif" }}>
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
      const text = form.content.replace(/<[^>]*>/g, "").trim();
      if (!text) return "Please write your article content.";
      if (!form.coverImageFile) return "Please upload a featured image.";
    }
    return "";
  }

  function nextStep() {
    const err = validate(step);
    if (err) { setError(err); return; }
    setError("");
    setStep(prev => Math.min(4, prev + 1) as Step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prevStep() {
    setError("");
    setStep(prev => Math.max(1, prev - 1) as Step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    const err = validate(3);
    if (err) { setError(err); return; }
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

        const res = await fetch("/api/blog/submit", { method: "POST", body: data });
        const result = await res.json();
        if (!res.ok) { setError(result.error || "Something went wrong. Please try again."); return; }
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        setError("Network error. Please check your connection and try again.");
      }
    });
  }

  const STEP_LABELS = ["About You", "Your Links", "The Article", "Review"];

  if (submitted) return (
    <div className="bh-root" style={{ minHeight: "100vh", background: "#f5efe5", padding: "120px 24px 80px" }}>
      <style>{sharedStyles}</style>
      <div style={{ maxWidth: 680, margin: "0 auto" }}><SuccessScreen /></div>
    </div>
  );

  return (
    <div className="bh-root bg-black/10" style={{ minHeight: "100vh", padding: "120px 24px 80px" }}>
      <style>{sharedStyles}</style>

      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        {/* ── Breadcrumb (semantic + crawler-readable) ── */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 20 }}>
          <ol
            itemScope
            itemType="https://schema.org/BreadcrumbList"
            style={{ display: "flex", alignItems: "center", gap: 6, listStyle: "none", padding: 0, margin: 0, fontSize: 11.5, color: "#999", fontFamily: "'DM Sans',sans-serif" }}
          >
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" style={{ color: "#bbb", textDecoration: "none" }}><span itemProp="name">Home</span></a>
              <meta itemProp="position" content="1" />
            </li>
            <li style={{ color: "#ccc" }}>›</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/blog" itemProp="item" style={{ color: "#bbb", textDecoration: "none" }}><span itemProp="name">Blog</span></a>
              <meta itemProp="position" content="2" />
            </li>
            <li style={{ color: "#ccc" }}>›</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" style={{ color: "#888" }}>Write for Us</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        {/* ── Hero ── */}
        <header style={{ marginBottom: 64 }}>
          {/* SEO: exact-match keyword in prominent position before H1 */}
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "purple", marginBottom: 14, fontFamily: "'DM Sans',sans-serif" }}>
            Write for Us — Guest Post Submission Portal
          </p>

          {/*
            SEO CRITICAL: H1 must contain the exact keyword "Write for Us".
            This is the primary ranking signal on-page.
          */}
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 800, color: "#111", lineHeight: 1.12, margin: "0 0 20px", maxWidth: 620 }}>
            Write for Us —<br />Publish on Bridge Homies
          </h1>

          <p style={{ fontSize: 14.5, lineHeight: 1.85, color: "#666", maxWidth: 560, margin: "0 0 12px" }}>
            We publish guest posts from developers, architects, product managers, and founders who build real software for real businesses.
            Submit an article and reach thousands of readers — plus earn up to <strong style={{ color: "#555" }}>3 dofollow backlinks</strong> and a <strong style={{ color: "#555" }}>permanent author profile</strong>, free.
          </p>
          <p style={{ fontSize: 13.5, lineHeight: 1.8, color: "#888", maxWidth: 560, margin: "0 0 36px" }}>
            We cover <strong style={{ color: "#555" }}>custom web apps</strong>, <strong style={{ color: "#555" }}>admin dashboards</strong>, <strong style={{ color: "#555" }}>automation tools</strong>, <strong style={{ color: "#555" }}>AI integrations</strong>, <strong style={{ color: "#555" }}>SaaS platforms</strong>, <strong style={{ color: "#555" }}>eCommerce systems</strong>, and software built for growing businesses — everything beyond what WordPress handles.
          </p>

          {/* Niche grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 28 }}>
            {NICHES.map(({ label, desc }) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.6)", border: "1px solid #937cbbff", borderRadius: 10, padding: "14px 16px" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a", margin: "0 0 4px", fontFamily: "'DM Sans',sans-serif" }}>{label}</p>
                <p style={{ fontSize: 11, color: "#888", margin: 0, lineHeight: 1.5 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              "100% free to submit",
              "Up to 3 dofollow backlinks",
              "Editorial review in 3–5 days",
              "Permanent author profile",
              "800 words minimum",
              "No AI filler accepted",
            ].map(tag => (
              <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#fff", border: "1px solid #937cbbff", borderRadius: 20, padding: "5px 12px", fontSize: 11, fontWeight: 600, color: "#7a6535", fontFamily: "'DM Sans',sans-serif" }}>
                <CheckCircle size={11} color="purple" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* ── Step indicator ── */}
        <StepIndicator step={step} total={4} labels={STEP_LABELS} />

        {/* ── Form card ── */}
        <section aria-label="Guest post submission form">
          <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "36px 40px", boxShadow: "0 24px 60px -30px rgba(0,0,0,0.14)" }}>
            <div style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", paddingBottom: 20, marginBottom: 28 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "purple", margin: "0 0 6px", fontFamily: "'DM Sans',sans-serif" }}>
                Step {step} of 4
              </p>
              {/*
                H2 inside the form — secondary heading, not competing with H1.
                Uses "write for us" adjacent copy at step 3 naturally.
              */}
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.85rem", fontWeight: 700, color: "#111", margin: 0 }}>
                {["Tell us about yourself", "Add your dofollow backlinks", "Write your article", "Review & submit your guest post"][step - 1]}
              </h2>
            </div>

            {step === 1 && <Step1 form={form} update={update} />}
            {step === 2 && <Step2 form={form} update={update} />}
            {step === 3 && <Step3 form={form} update={update} />}
            {step === 4 && <Step4 form={form} />}

            {error && (
              <div className="bh-notice bh-notice-red" style={{ marginTop: 20, display: "flex", alignItems: "flex-start", gap: 10 }} role="alert">
                <XCircle size={15} style={{ marginTop: 2, flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(0,0,0,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button type="button" onClick={prevStep} className="bh-btn-ghost" style={{ visibility: step === 1 ? "hidden" : "visible" }}>
                Back
              </button>
              {step < 4 ? (
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
        <section aria-labelledby="guidelines-heading" style={{ marginTop: 32, background: "rgba(255,255,255,0.55)", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, padding: "28px 32px" }}>
          <h2 id="guidelines-heading" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1a1a", margin: "0 0 10px" }}>
            Guest Post Guidelines — Who Should Write for Us?
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: "#666", margin: "0 0 20px" }}>
            We welcome practitioners — developers, architects, product managers, and founders — who work hands-on with custom web applications, admin dashboards, SaaS platforms, AI/ML integrations, automation tooling, eCommerce systems, and lead generation software. If you build real software for real businesses, your experience belongs here. Guest posts must be original, not published elsewhere, and a minimum of 800 words.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2d8653", margin: "0 0 10px", fontFamily: "'DM Sans',sans-serif" }}>We publish</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {WE_PUBLISH.map(t => (
                  <li key={t} style={{ fontSize: 12, color: "#555", margin: "0 0 6px", lineHeight: 1.6, paddingLeft: 12, borderLeft: "2px solid #b2dfc5" }}>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9b2c2a", margin: "0 0 10px", fontFamily: "'DM Sans',sans-serif" }}>We don't publish</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {WE_DONT.map(t => (
                  <li key={t} style={{ fontSize: 12, color: "#555", margin: "0 0 6px", lineHeight: 1.6, paddingLeft: 12, borderLeft: "2px solid #f2c4c1" }}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── FAQ section (semantic <dl>, mirrors JSON-LD FAQPage) ── */}
        <section aria-labelledby="faq-heading" style={{ marginTop: 24, background: "rgba(255,255,255,0.55)", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, padding: "28px 32px" }}>
          <h2 id="faq-heading" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1a1a", margin: "0 0 20px" }}>
            Frequently Asked Questions — Write for Us
          </h2>
          <dl style={{ margin: 0 }}>
            {FAQ_ITEMS.map(({ q, a }, i) => (
              <div key={i} style={{ borderBottom: i < FAQ_ITEMS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none", paddingBottom: 14, marginBottom: 14 }}>
                <dt style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", margin: "0 0 5px", fontFamily: "'DM Sans',sans-serif" }}>{q}</dt>
                <dd style={{ fontSize: 13, color: "#666", margin: 0, lineHeight: 1.75 }}>{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p style={{ textAlign: "center", fontSize: 11.5, color: "#aaa", marginTop: 24, lineHeight: 1.7 }}>
          By submitting your guest post you agree to our editorial guidelines. We respond within 3–5 business days. Your email is never shared publicly.
        </p>
      </div>
    </div>
  );
}