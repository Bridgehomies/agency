"use client";

import { useState, useTransition, useRef } from "react";
import {
  ArrowRight,
  Upload,
  CheckCircle,
  XCircle,
  Loader2,
  Globe,
  Mail,
  Phone,
  User,
  Briefcase,
  Link2,
  FileText,
  Image as ImageIcon,
  ChevronRight,
  Sparkles,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4;

type FormData = {
  // Step 1 – About you
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  occupation: string;
  bio: string;
  // Step 2 – Backlinks (max 3)
  backlinks: { label: string; url: string }[];
  // Step 3 – Article
  title: string;
  category: string;
  excerpt: string;
  tags: string;
  contentFormat: "markdown" | "json";
  content: string;
  faqText: string;
  coverImageFile: File | null;
  coverImagePreview: string;
};

const COUNTRY_CODES = [
  { code: "+1", flag: "🇺🇸", label: "US" },
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+92", flag: "🇵🇰", label: "PK" },
  { code: "+91", flag: "🇮🇳", label: "IN" },
  { code: "+971", flag: "🇦🇪", label: "AE" },
  { code: "+49", flag: "🇩🇪", label: "DE" },
  { code: "+33", flag: "🇫🇷", label: "FR" },
  { code: "+61", flag: "🇦🇺", label: "AU" },
  { code: "+86", flag: "🇨🇳", label: "CN" },
  { code: "+55", flag: "🇧🇷", label: "BR" },
  { code: "+34", flag: "🇪🇸", label: "ES" },
  { code: "+81", flag: "🇯🇵", label: "JP" },
];

const CATEGORIES = [
  "SEO & AEO",
  "AI & Automation",
  "Content Marketing",
  "SaaS & Product",
  "Growth & Strategy",
  "Technical Writing",
  "Case Studies",
  "Opinion & Insights",
];

const MARKDOWN_TEMPLATE = `## Your article starts here

Write clearly and concisely. Use headings to break up sections.

### Suggested structure

- Open with the problem or question
- Provide your answer or insight
- Add examples, data, or stories
- Close with a clear takeaway
`;

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  countryCode: "+92",
  occupation: "",
  bio: "",
  backlinks: [
    { label: "", url: "" },
    { label: "", url: "" },
    { label: "", url: "" },
  ],
  title: "",
  category: "Insights",
  excerpt: "",
  tags: "",
  contentFormat: "markdown",
  content: MARKDOWN_TEMPLATE,
  faqText: "",
  coverImageFile: null,
  coverImagePreview: "",
};

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepDot({
  step,
  current,
  label,
}: {
  step: number;
  current: Step;
  label: string;
}) {
  const done = step < current;
  const active = step === current;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
          done
            ? "border-[#f6c27a] bg-[#f6c27a] text-black"
            : active
            ? "border-[#111] bg-[#111] text-[#f6c27a]"
            : "border-black/15 bg-white text-slate-400"
        }`}
      >
        {done ? <CheckCircle className="h-5 w-5" /> : step}
      </div>
      <span
        className={`hidden text-xs font-semibold tracking-[0.15em] uppercase sm:block ${
          active ? "text-[#111]" : done ? "text-amber-700" : "text-slate-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function StepLine({ done }: { done: boolean }) {
  return (
    <div className="relative mx-1 mt-[-1.1rem] h-0.5 flex-1">
      <div className="absolute inset-0 rounded-full bg-black/10" />
      <div
        className={`absolute inset-0 rounded-full bg-[#f6c27a] transition-all duration-500 ${
          done ? "w-full" : "w-0"
        }`}
      />
    </div>
  );
}

// ─── Field wrappers ───────────────────────────────────────────────────────────

function Field({
  label,
  hint,
  children,
  required,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-800">
        {label}
        {required && <span className="text-amber-600">*</span>}
      </span>
      {children}
      {hint && (
        <p className="mt-1.5 text-xs leading-5 text-slate-500">{hint}</p>
      )}
    </label>
  );
}

const inputCls =
  "w-full rounded-2xl border border-black/10 bg-[#faf7f2] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 placeholder:text-slate-400";

const textareaCls =
  "w-full rounded-2xl border border-black/10 bg-[#faf7f2] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 placeholder:text-slate-400 resize-none";

// ─── Individual steps ─────────────────────────────────────────────────────────

function Step1({
  form,
  update,
}: {
  form: FormData;
  update: (key: keyof FormData, val: any) => void;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="md:col-span-2">
        <div className="mb-6 rounded-2xl border border-amber-100 bg-amber-50 px-5 py-4">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div>
              <p className="text-sm font-semibold text-amber-900">Welcome, future contributor!</p>
              <p className="mt-0.5 text-xs leading-6 text-amber-700">
                Tell us a bit about yourself. This helps our editorial team understand your expertise
                and context before reviewing your submission.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Field label="Full name" required>
        <div className="relative">
          <User className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
          <input
            className={inputCls + " pl-10"}
            placeholder="Jane Smith"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
        </div>
      </Field>

      <Field label="Occupation / Role" required>
        <div className="relative">
          <Briefcase className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
          <input
            className={inputCls + " pl-10"}
            placeholder="SEO Strategist at Acme Inc."
            value={form.occupation}
            onChange={(e) => update("occupation", e.target.value)}
            required
          />
        </div>
      </Field>

      <Field label="Email address" required hint="We'll send you a status update when your post is reviewed.">
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="email"
            className={inputCls + " pl-10"}
            placeholder="jane@example.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
        </div>
      </Field>

      <Field label="Phone number" hint="Optional — include country code.">
        <div className="flex gap-2">
          <select
            className="rounded-2xl border border-black/10 bg-[#faf7f2] px-3 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            value={form.countryCode}
            onChange={(e) => update("countryCode", e.target.value)}
          >
            {COUNTRY_CODES.map(({ code, flag, label }) => (
              <option key={code} value={code}>
                {flag} {code}
              </option>
            ))}
          </select>
          <div className="relative flex-1">
            <Phone className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="tel"
              className={inputCls + " pl-10"}
              placeholder="300 1234567"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>
        </div>
      </Field>

      <Field label="Short bio" hint="2–3 sentences about you. Will appear in your author card." required>
        <textarea
          className={textareaCls + " min-h-24 md:col-span-2"}
          placeholder="I'm a content strategist who has spent 6 years helping SaaS brands build organic traffic through data-driven writing."
          value={form.bio}
          onChange={(e) => update("bio", e.target.value)}
          required
        />
      </Field>
    </div>
  );
}

function Step2({
  form,
  update,
}: {
  form: FormData;
  update: (key: keyof FormData, val: any) => void;
}) {
  function updateLink(index: number, field: "label" | "url", val: string) {
    const next = form.backlinks.map((bl, i) =>
      i === index ? { ...bl, [field]: val } : bl
    );
    update("backlinks", next);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-amber-100 bg-amber-50 px-5 py-4">
        <div className="flex items-start gap-3">
          <Link2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-semibold text-amber-900">Up to 3 backlinks</p>
            <p className="mt-0.5 text-xs leading-6 text-amber-700">
              Add up to 3 links to your website, portfolio, LinkedIn, or any page you'd like to
              attribute. These will be included in your author profile if your post is approved.
            </p>
          </div>
        </div>
      </div>

      {form.backlinks.map((bl, i) => (
        <div
          key={i}
          className="rounded-2xl border border-black/8 bg-white p-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)]"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
            Link {i + 1} {i === 0 ? "(recommended)" : "(optional)"}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Display label">
              <input
                className={inputCls}
                placeholder={i === 0 ? "My Website" : i === 1 ? "LinkedIn Profile" : "Portfolio"}
                value={bl.label}
                onChange={(e) => updateLink(i, "label", e.target.value)}
              />
            </Field>
            <Field label="URL">
              <div className="relative">
                <Globe className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="url"
                  className={inputCls + " pl-10"}
                  placeholder="https://yoursite.com"
                  value={bl.url}
                  onChange={(e) => updateLink(i, "url", e.target.value)}
                />
              </div>
            </Field>
          </div>
        </div>
      ))}
    </div>
  );
}

function Step3({
  form,
  update,
}: {
  form: FormData;
  update: (key: keyof FormData, val: any) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  function handleFileChange(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPG, PNG, WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      update("coverImagePreview", e.target?.result as string);
      update("coverImageFile", file);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {/* Title */}
      <label className="md:col-span-2 block">
        <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-800">
          Article title <span className="text-amber-600">*</span>
        </span>
        <input
          className={inputCls}
          placeholder="How I grew organic traffic by 340% using AEO tactics"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          required
        />
      </label>

      {/* Category */}
      <Field label="Category" required>
        <select
          className={inputCls}
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>

      {/* Tags */}
      <Field label="Tags" hint="Comma-separated, e.g. SEO, AI, SaaS">
        <input
          className={inputCls}
          placeholder="SEO, AEO, Content"
          value={form.tags}
          onChange={(e) => update("tags", e.target.value)}
        />
      </Field>

      {/* Excerpt */}
      <label className="md:col-span-2 block">
        <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-800">
          Excerpt / summary <span className="text-amber-600">*</span>
        </span>
        <textarea
          className={textareaCls + " min-h-24"}
          placeholder="A short 2–3 sentence summary that appears in cards, search snippets, and social previews."
          value={form.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          required
        />
      </label>

      {/* Cover image upload */}
      <div className="md:col-span-2">
        <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-800">
          Featured image <span className="text-amber-600">*</span>
        </span>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
        />

        {form.coverImagePreview ? (
          <div className="relative overflow-hidden rounded-2xl border border-black/10">
            <img
              src={form.coverImagePreview}
              alt="Cover preview"
              className="h-52 w-full object-cover"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {form.coverImageFile?.name}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    update("coverImageFile", null);
                    update("coverImagePreview", "");
                  }}
                  className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            ref={dropRef}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              dropRef.current?.classList.add("border-amber-500", "bg-amber-50");
            }}
            onDragLeave={() => {
              dropRef.current?.classList.remove("border-amber-500", "bg-amber-50");
            }}
            onDrop={(e) => {
              e.preventDefault();
              dropRef.current?.classList.remove("border-amber-500", "bg-amber-50");
              handleFileChange(e.dataTransfer.files?.[0] ?? null);
            }}
            className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-black/15 bg-[#faf7f2] px-6 py-12 text-center transition hover:border-amber-400 hover:bg-amber-50/50"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
              <ImageIcon className="h-7 w-7 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Drop your image here, or{" "}
                <span className="text-amber-600 underline decoration-dotted">browse</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">JPG, PNG, WebP · max 5 MB · recommended 1200×630px</p>
            </div>
          </div>
        )}
      </div>

      {/* Article body */}
      <label className="md:col-span-2 block">
        <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-800">
          Article body <span className="text-amber-600">*</span>
        </span>
        <textarea
          className={textareaCls + " min-h-[22rem] font-mono leading-7"}
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          required
        />
        <p className="mt-1.5 text-xs leading-5 text-slate-500">
          Write in Markdown. Use ## for section headings, **bold**, _italic_, and - for lists.
        </p>
      </label>

      {/* FAQ */}
      <label className="md:col-span-2 block">
        <span className="mb-1.5 block text-sm font-semibold text-slate-800">
          FAQ pairs{" "}
          <span className="font-normal text-slate-500">(optional — boosts SEO)</span>
        </span>
        <textarea
          className={textareaCls + " min-h-28"}
          placeholder={"What is AEO?::AEO stands for Answer Engine Optimisation...\nHow long should my article be?::Aim for at least 800 words with clear sections."}
          value={form.faqText}
          onChange={(e) => update("faqText", e.target.value)}
        />
        <p className="mt-1.5 text-xs leading-5 text-slate-500">
          One FAQ per line using <code className="rounded bg-slate-100 px-1 py-0.5">Question::Answer</code> format.
        </p>
      </label>
    </div>
  );
}

function Step4({ form }: { form: FormData }) {
  const filledLinks = form.backlinks.filter((bl) => bl.url.trim());

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
        <div className="flex items-start gap-3">
          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
          <div>
            <p className="font-semibold text-green-900">Everything looks great!</p>
            <p className="mt-0.5 text-sm text-green-700">
              Review your submission below, then hit <strong>Submit for Review</strong> when you're ready.
            </p>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="rounded-2xl border border-black/8 bg-white p-5">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">About you</p>
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div><span className="font-semibold text-slate-600">Name:</span> {form.name}</div>
          <div><span className="font-semibold text-slate-600">Email:</span> {form.email}</div>
          <div><span className="font-semibold text-slate-600">Role:</span> {form.occupation}</div>
          {form.phone && (
            <div>
              <span className="font-semibold text-slate-600">Phone:</span>{" "}
              {form.countryCode} {form.phone}
            </div>
          )}
          <div className="sm:col-span-2">
            <span className="font-semibold text-slate-600">Bio:</span> {form.bio}
          </div>
        </div>
      </div>

      {/* Links */}
      {filledLinks.length > 0 && (
        <div className="rounded-2xl border border-black/8 bg-white p-5">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Backlinks</p>
          <div className="space-y-2 text-sm">
            {filledLinks.map((bl, i) => (
              <div key={i} className="flex items-center gap-2">
                <Globe className="h-4 w-4 shrink-0 text-amber-600" />
                <span className="font-semibold">{bl.label || bl.url}</span>
                <span className="truncate text-slate-500">{bl.url}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Article */}
      <div className="rounded-2xl border border-black/8 bg-white p-5">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Article</p>
        <div className="space-y-2 text-sm">
          <div><span className="font-semibold text-slate-600">Title:</span> {form.title}</div>
          <div><span className="font-semibold text-slate-600">Category:</span> {form.category}</div>
          <div><span className="font-semibold text-slate-600">Tags:</span> {form.tags || "—"}</div>
          <div><span className="font-semibold text-slate-600">Excerpt:</span> {form.excerpt}</div>
          <div>
            <span className="font-semibold text-slate-600">Featured image:</span>{" "}
            {form.coverImageFile ? form.coverImageFile.name : "None"}
          </div>
          <div>
            <span className="font-semibold text-slate-600">Word count:</span>{" "}
            ~{form.content.split(/\s+/).filter(Boolean).length} words
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Success screen ────────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-12 w-12 text-green-600" />
        <span className="absolute -right-1 -top-1 h-5 w-5 animate-ping rounded-full bg-green-400 opacity-75" />
      </div>
      <h2 className="font-serif text-4xl font-bold text-slate-950">Submission received!</h2>
      <p className="mt-4 max-w-md text-base leading-8 text-slate-600">
        Thank you for contributing. Our editorial team will review your article and get back to you
        at your email within 3–5 business days.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <a
          href="/blog"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
        >
          Browse the blog <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href="/blog/submit"
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Submit another post
        </a>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function BlogSubmitPortal() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function update(key: keyof FormData, val: any) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function validateStep(s: Step): string {
    if (s === 1) {
      if (!form.name.trim()) return "Please enter your full name.";
      if (!form.email.trim()) return "Please enter your email address.";
      if (!form.occupation.trim()) return "Please enter your occupation.";
      if (!form.bio.trim()) return "Please add a short bio.";
    }
    if (s === 3) {
      if (!form.title.trim()) return "Please enter an article title.";
      if (!form.excerpt.trim()) return "Please add a short excerpt.";
      if (!form.content.trim() || form.content.trim() === MARKDOWN_TEMPLATE.trim())
        return "Please write your article content.";
      if (!form.coverImageFile) return "Please upload a featured image.";
    }
    return "";
  }

  function nextStep() {
    const err = validateStep(step);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStep((prev) => Math.min(4, prev + 1) as Step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prevStep() {
    setError("");
    setStep((prev) => Math.max(1, prev - 1) as Step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    const err = validateStep(3);
    if (err) { setError(err); return; }
    setError("");

    startTransition(async () => {
      try {
        // Build multipart form data so we can upload the image file
        const data = new FormData();

        // Flatten all form fields into form data
        data.append("name", form.name);
        data.append("email", form.email);
        data.append("phone", form.phone ? `${form.countryCode} ${form.phone}` : "");
        data.append("occupation", form.occupation);
        data.append("bio", form.bio);
        data.append("backlinks", JSON.stringify(form.backlinks.filter((bl) => bl.url.trim())));
        data.append("title", form.title);
        data.append("category", form.category);
        data.append("excerpt", form.excerpt);
        data.append("tags", form.tags);
        data.append("content", form.content);
        data.append("faqText", form.faqText);
        if (form.coverImageFile) {
          data.append("coverImage", form.coverImageFile);
        }

        const response = await fetch("/api/blog/submit", {
          method: "POST",
          body: data,
        });

        const result = await response.json();

        if (!response.ok) {
          setError(result.error || "Something went wrong. Please try again.");
          return;
        }

        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        setError("Network error. Please check your connection and try again.");
      }
    });
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f5efe5] px-6 pb-20 pt-32 text-slate-900">
        <div className="mx-auto max-w-2xl">
          <SuccessScreen />
        </div>
      </div>
    );
  }

  const STEPS = ["About you", "Your links", "The article", "Review"];

  return (
    <div className="min-h-screen bg-[#f5efe5] px-6 pb-20 pt-32 text-slate-900">
      <div className="mx-auto max-w-3xl">
        {/* Hero header */}
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-700">Guest contributions</p>
          <h1 className="mt-3 font-serif text-5xl leading-tight text-slate-950 sm:text-6xl">
            Write for Bridge Homies
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600">
            Share your expertise with thousands of marketers, founders, and growth professionals.
            Submit your article — our team will review and publish it.
          </p>

          {/* Social proof chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {["Free to submit", "Dofollow backlinks", "Editorial review", "Author profile"].map(
              (tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-800"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* Step indicator */}
        <div className="mb-8 flex items-center px-2">
          {STEPS.map((label, i) => (
            <div key={i} className="flex flex-1 items-center">
              <StepDot step={i + 1} current={step} label={label} />
              {i < STEPS.length - 1 && <StepLine done={i + 1 < step} />}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="rounded-[2rem] border border-black/8 bg-white p-8 shadow-[0_32px_80px_-40px_rgba(17,17,17,0.18)]">
          <div className="mb-6 border-b border-black/8 pb-5">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-700">Step {step} of 4</p>
            <h2 className="mt-1 font-serif text-3xl text-slate-950">
              {step === 1 && "Tell us about yourself"}
              {step === 2 && "Add your backlinks"}
              {step === 3 && "Your article"}
              {step === 4 && "Review & submit"}
            </h2>
          </div>

          {step === 1 && <Step1 form={form} update={update} />}
          {step === 2 && <Step2 form={form} update={update} />}
          {step === 3 && <Step3 form={form} update={update} />}
          {step === 4 && <Step4 form={form} />}

          {/* Error */}
          {error && (
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between border-t border-black/8 pt-6">
            <button
              type="button"
              onClick={prevStep}
              className={`rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 ${
                step === 1 ? "invisible" : ""
              }`}
            >
              Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 rounded-full bg-[#111] px-7 py-3 text-sm font-semibold text-white transition hover:bg-black"
              >
                Continue <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isPending}
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3 text-sm font-semibold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit for review <FileText className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Bottom trust bar */}
        <p className="mt-6 text-center text-xs leading-6 text-slate-500">
          By submitting you agree to our editorial guidelines. We typically respond within 3–5 business days.
          Your email will never be shared publicly.
        </p>
      </div>
    </div>
  );
}