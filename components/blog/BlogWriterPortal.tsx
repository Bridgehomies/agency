"use client";

import { useEffect, useState, useTransition, useRef } from "react";
import Link from "next/link";
import { ArrowRight, FileText, Pencil, Save, Trash2, Image as ImageIcon, Link2 } from "lucide-react";
import { notifyIndexNow } from '@/lib/indexnow';

const ADMIN_ENDPOINT =
  process.env.NEXT_PUBLIC_BLOG_ADMIN_URL || "http://localhost:3001";

type PortalPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  coverImage: string;
  views: number;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
  schemaType: "Article" | "BlogPosting" | "TechArticle";
  faq?: { question: string; answer: string }[];
  content: string;
};

type ContentFormat = "markdown" | "json";
type CoverImageMode = "url" | "file";

const markdownTemplate = `## Start with a strong search-intent heading

Write the article body in Markdown or MDX. This content will be saved into \`content/blogs\` and rendered on the public blog routes.

### Suggested structure

- Problem your audience is searching for
- Your answer in practical terms
- Clear examples, steps, and FAQs
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
      "text": "Write the article body in JSON blocks. The renderer will convert this into the article layout automatically."
    },
    {
      "type": "heading",
      "level": 3,
      "text": "Suggested structure"
    },
    {
      "type": "list",
      "items": [
        "Problem your audience is searching for",
        "Your answer in practical terms",
        "Clear examples, steps, and FAQs"
      ]
    }
  ]
}`;

function detectContentFormat(content: string): ContentFormat {
  const trimmed = content.trim();
  return trimmed.startsWith("{") || trimmed.startsWith("[") ? "json" : "markdown";
}

const initialForm = {
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  author: "Bridge Homies Team",
  authorRole: "Editorial",
  category: "Insights",
  tags: "SEO, AEO, Content Marketing",
  coverImage: "",
  coverImageFile: null as File | null,
  coverImagePreview: "",
  coverImageMode: "url" as CoverImageMode,
  seoTitle: "",
  seoDescription: "",
  faqText:
    "What makes a blog post good for AEO?::A strong AEO post answers a specific question directly, uses clear section headings, and includes concise factual explanations.\nHow should I structure an SEO article?::Start with the main answer, then add supporting sections, examples, and FAQs around related search intent.",
  published: true,
  contentFormat: "markdown" as ContentFormat,
  content: markdownTemplate,
};

function toFaqText(items?: { question: string; answer: string }[]) {
  return (items || []).map((item) => `${item.question}::${item.answer}`).join("\n");
}

function parseFaqText(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [question, ...answerParts] = line.split("::");
      return {
        question: (question || "").trim(),
        answer: answerParts.join("::").trim(),
      };
    })
    .filter((item) => item.question && item.answer);
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

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

function JsonPreview({ content }: { content: string }) {
  try {
    const parsed = JSON.parse(content);
    const blocks = extractJsonBlocks(parsed);

    if (blocks.length === 0) {
      return <p className="text-sm text-red-600">JSON is valid, but no `blocks`, `content`, or `body` array was found.</p>;
    }

    return (
      <div className="space-y-5">
        {blocks.map((block, index) => {
          const type = typeof block.type === "string" ? block.type : "paragraph";

          if (type === "heading") {
            const level = Math.min(6, Math.max(1, Number(block.level || 2)));
            const Tag = `h${level}` as any;
            return (
              <Tag key={index} className="font-serif text-2xl font-bold text-slate-950">
                {String(block.text || "")}
              </Tag>
            );
          }

          if (type === "paragraph") {
            return (
              <p key={index} className="text-sm leading-7 text-slate-700">
                {String(block.text || "")}
              </p>
            );
          }

          if (type === "list") {
            const items = Array.isArray(block.items) ? block.items : [];
            const ordered = Boolean(block.ordered);
            const ListTag = (ordered ? "ol" : "ul") as any;
            return (
              <ListTag key={index} className="space-y-2 pl-5 text-sm leading-7 text-slate-700 list-disc">
                {items.map((item, itemIndex) => (
                  <li key={itemIndex}>{String(item)}</li>
                ))}
              </ListTag>
            );
          }

          if (type === "quote") {
            return (
              <blockquote key={index} className="border-l-4 border-amber-600 bg-amber-50 px-4 py-3 text-sm italic text-slate-700">
                {String(block.text || "")}
              </blockquote>
            );
          }

          if (type === "code") {
            return (
              <pre key={index} className="overflow-x-auto rounded-2xl bg-[#111111] p-4 text-xs leading-6 text-[#f5efe5]">
                <code>{String(block.code || "")}</code>
              </pre>
            );
          }

          if (type === "html" || type === "markdown") {
            return (
              <pre key={index} className="overflow-x-auto whitespace-pre-wrap rounded-2xl bg-slate-100 p-4 text-xs leading-6 text-slate-700">
                {String(block.html || block.value || "")}
              </pre>
            );
          }

          return (
            <p key={index} className="text-sm leading-7 text-slate-700">
              {typeof block.text === "string" ? block.text : JSON.stringify(block)}
            </p>
          );
        })}
      </div>
    );
  } catch (error) {
    return (
      <p className="text-sm text-red-600">
        Invalid JSON. {error instanceof Error ? error.message : "Check the syntax and try again."}
      </p>
    );
  }
}

function MarkdownPreview({ content }: { content: string }) {
  const lines = renderPreviewText(content);

  if (lines.length === 0) {
    return <p className="text-sm text-slate-500">Start writing to see a preview.</p>;
  }

  return (
    <div className="space-y-4">
      {lines.slice(0, 12).map((line, index) => (
        <p key={index} className={`${index === 0 ? "font-serif text-2xl font-bold text-slate-950" : "text-sm leading-7 text-slate-700"}`}>
          {line}
        </p>
      ))}
      {lines.length > 12 ? (
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Preview truncated</p>
      ) : null}
    </div>
  );
}

// ─── Cover Image Input ──────────────────────────────────────────────────────

function CoverImageInput({
  mode,
  urlValue,
  filePreview,
  fileName,
  onModeChange,
  onUrlChange,
  onFileChange,
  onFileClear,
}: {
  mode: CoverImageMode;
  urlValue: string;
  filePreview: string;
  fileName: string;
  onModeChange: (m: CoverImageMode) => void;
  onUrlChange: (v: string) => void;
  onFileChange: (file: File) => void;
  onFileClear: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPG, PNG, WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5 MB.");
      return;
    }
    onFileChange(file);
  }

  return (
    <div>
      {/* Mode toggle */}
      <div className="mb-3 inline-flex rounded-xl border border-black/10 bg-[#f0ebe0] p-1">
        <button
          type="button"
          onClick={() => onModeChange("url")}
          className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition ${
            mode === "url"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Link2 className="h-3 w-3" />
          URL
        </button>
        <button
          type="button"
          onClick={() => onModeChange("file")}
          className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition ${
            mode === "file"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <ImageIcon className="h-3 w-3" />
          Upload
        </button>
      </div>

      {/* URL input */}
      {mode === "url" && (
        <input
          value={urlValue}
          onChange={(e) => onUrlChange(e.target.value)}
          className="w-full rounded-2xl border border-black/10 bg-[#faf7f2] px-4 py-3 outline-none focus:border-amber-600"
          placeholder="https://..."
        />
      )}

      {/* File upload */}
      {mode === "file" && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
          {filePreview ? (
            <div className="relative overflow-hidden rounded-2xl border border-black/10">
              <img
                src={filePreview}
                alt="Cover preview"
                className="h-48 w-full object-cover"
              />
              <div className="absolute inset-0 flex items-end gap-2 bg-gradient-to-t from-black/60 to-transparent p-4">
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {fileName}
                </span>
                <button
                  type="button"
                  onClick={onFileClear}
                  className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                (e.currentTarget as HTMLElement).style.borderColor = "#d97706";
                (e.currentTarget as HTMLElement).style.background = "#fdf8ec";
              }}
              onDragLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "";
                (e.currentTarget as HTMLElement).style.background = "";
              }}
              onDrop={(e) => {
                e.preventDefault();
                (e.currentTarget as HTMLElement).style.borderColor = "";
                (e.currentTarget as HTMLElement).style.background = "";
                handleFile(e.dataTransfer.files?.[0] ?? null);
              }}
              className="flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-black/12 bg-[#faf7f2] px-6 py-10 text-center transition hover:border-amber-600 hover:bg-amber-50/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                <ImageIcon className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Drop image here or{" "}
                  <span className="text-amber-700 underline">browse</span>
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  JPG, PNG, WebP · max 5 MB · recommended 1200×630
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function BlogWriterPortal() {
  const [form, setForm] = useState(initialForm);
  const [posts, setPosts] = useState<PortalPost[]>([]);
  const [status, setStatus] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  function update<K extends keyof typeof initialForm>(key: K, value: (typeof initialForm)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function loadPosts() {
    try {
      const response = await fetch(`${ADMIN_ENDPOINT}/posts`);
      const result = await response.json();
      if (response.ok) {
        setPosts(result.posts || []);
      }
    } catch {
      setStatus("Could not load existing posts. Make sure the writer service is running.");
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function resetForm() {
    setForm(initialForm);
  }

  function editPost(post: PortalPost) {
    setForm({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      authorRole: post.authorRole,
      category: post.category,
      tags: post.tags.join(", "),
      coverImage: post.coverImage,
      coverImageFile: null,
      coverImagePreview: "",
      coverImageMode: "url",
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      faqText: toFaqText(post.faq),
      published: post.published,
      contentFormat: detectContentFormat(post.content),
      content: post.content,
    });
    setStatus(`Editing /blog/${post.slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(slug: string) {
    const confirmed = window.confirm(`Delete /blog/${slug}?`);
    if (!confirmed) return;

    setStatus("");
    startTransition(async () => {
      const response = await fetch(`${ADMIN_ENDPOINT}/delete/${slug}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus(result.error || "Failed to delete the article.");
        return;
      }

      if (form.slug === slug) {
        resetForm();
      }

      setStatus(`Deleted /blog/${slug}`);
      await loadPosts();
      if (result.slug) {
        await notifyIndexNow(result.slug);
      }
    });
  }

  function handleCoverFileChange(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      update("coverImagePreview", e.target?.result as string);
      update("coverImageFile", file);
    };
    reader.readAsDataURL(file);
  }

  function handleCoverFileClear() {
    update("coverImageFile", null);
    update("coverImagePreview", "");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");

    startTransition(async () => {
      const slug = form.slug ? slugify(form.slug) : slugify(form.title);

      // Resolve the final coverImage value
      let resolvedCoverImage = form.coverImage;

      if (form.coverImageMode === "file" && form.coverImageFile) {
        const imageData = new FormData();
        imageData.append("file", form.coverImageFile);

        const uploadRes = await fetch(`${ADMIN_ENDPOINT}/upload`, {
          method: "POST",
          body: imageData,
        });
        const uploadResult = await uploadRes.json();

        if (!uploadRes.ok) {
          setStatus(uploadResult.error || "Image upload failed.");
          return;
        }

        resolvedCoverImage = uploadResult.url;
      }

      const response = await fetch(`${ADMIN_ENDPOINT}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: form.id || slug,
          slug,
          title: form.title,
          excerpt: form.excerpt,
          author: form.author,
          authorRole: form.authorRole,
          category: form.category,
          tags: form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          coverImage: resolvedCoverImage,
          seoTitle: form.seoTitle || form.title,
          seoDescription: form.seoDescription || form.excerpt,
          published: form.published,
          content: form.content,
          faq: parseFaqText(form.faqText),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus(result.error || "Failed to save the article.");
        return;
      }

      setStatus(`Saved successfully. Public URL: /blog/${result.slug}`);
      resetForm();
      await loadPosts();
      if (result.slug && form.published) {
        await notifyIndexNow(result.slug);
      }
    });
  }

  return (
    <div className="min-h-screen bg-[#f5efe5] px-6 pb-20 pt-32 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="rounded-[2rem] border border-black/10 bg-[#111111] p-8 text-[#f5efe5] shadow-[0_24px_80px_-40px_rgba(0,0,0,0.7)]">
            <p className="text-xs uppercase tracking-[0.28em] text-[#f6c27a]">Blog writing portal</p>
            <h1 className="mt-4 font-serif text-5xl leading-none">Write, edit, and publish from one panel.</h1>
            <p className="mt-5 text-base leading-8 text-[#d9d0c5]">
              This portal writes files into `content/blogs`, supports Markdown/MDX content, and adds FAQ schema-ready data for answer engines.
            </p>

            <div className="mt-8 space-y-4 text-sm leading-7 text-[#e9dfd1]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                Use semantic headings, concise answers, and FAQ pairs to strengthen SEO and AEO.
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                The article body can now be written in Markdown, MDX, or structured JSON blocks.
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                Publishing requires the companion writer service. In local development this starts with `pnpm dev`.
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full bg-[#f6c27a] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#ffd59d]"
              >
                View blog archive
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-[0_24px_80px_-50px_rgba(17,17,17,0.45)]"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Article title</span>
                <input
                  value={form.title}
                  onChange={(event) => update("title", event.target.value)}
                  className="w-full rounded-2xl border border-black/10 bg-[#faf7f2] px-4 py-3 outline-none focus:border-amber-600"
                  placeholder="How AI automation reduces support response time"
                  required
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-semibold text-slate-700">Slug</span>
                <input
                  value={form.slug}
                  onChange={(event) => update("slug", event.target.value)}
                  className="w-full rounded-2xl border border-black/10 bg-[#faf7f2] px-4 py-3 outline-none focus:border-amber-600"
                  placeholder="auto-generated-from-title"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-semibold text-slate-700">Category</span>
                <input
                  value={form.category}
                  onChange={(event) => update("category", event.target.value)}
                  className="w-full rounded-2xl border border-black/10 bg-[#faf7f2] px-4 py-3 outline-none focus:border-amber-600"
                />
              </label>

              <label className="md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Excerpt</span>
                <textarea
                  value={form.excerpt}
                  onChange={(event) => update("excerpt", event.target.value)}
                  className="min-h-28 w-full rounded-2xl border border-black/10 bg-[#faf7f2] px-4 py-3 outline-none focus:border-amber-600"
                  placeholder="A concise summary for cards, search snippets, and social previews."
                  required
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-semibold text-slate-700">Content format</span>
                <select
                  value={form.contentFormat}
                  onChange={(event) => {
                    const nextFormat = event.target.value as ContentFormat;
                    update("contentFormat", nextFormat);

                    const currentTemplate =
                      form.contentFormat === "json" ? jsonTemplate : markdownTemplate;
                    const nextTemplate =
                      nextFormat === "json" ? jsonTemplate : markdownTemplate;

                    if (form.content.trim() === currentTemplate.trim() || !form.content.trim()) {
                      update("content", nextTemplate);
                    }
                  }}
                  className="w-full rounded-2xl border border-black/10 bg-[#faf7f2] px-4 py-3 outline-none focus:border-amber-600"
                >
                  <option value="markdown">Markdown / MDX</option>
                  <option value="json">JSON blocks</option>
                </select>
              </label>

              <label>
                <span className="mb-2 block text-sm font-semibold text-slate-700">Author</span>
                <input
                  value={form.author}
                  onChange={(event) => update("author", event.target.value)}
                  className="w-full rounded-2xl border border-black/10 bg-[#faf7f2] px-4 py-3 outline-none focus:border-amber-600"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-semibold text-slate-700">Author role</span>
                <input
                  value={form.authorRole}
                  onChange={(event) => update("authorRole", event.target.value)}
                  className="w-full rounded-2xl border border-black/10 bg-[#faf7f2] px-4 py-3 outline-none focus:border-amber-600"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-semibold text-slate-700">Tags</span>
                <input
                  value={form.tags}
                  onChange={(event) => update("tags", event.target.value)}
                  className="w-full rounded-2xl border border-black/10 bg-[#faf7f2] px-4 py-3 outline-none focus:border-amber-600"
                  placeholder="SEO, AEO, AI, SaaS"
                />
              </label>

              {/* ── Cover Image (URL or Upload) ── */}
              <div className="md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Cover image</span>
                <CoverImageInput
                  mode={form.coverImageMode}
                  urlValue={form.coverImage}
                  filePreview={form.coverImagePreview}
                  fileName={form.coverImageFile?.name ?? ""}
                  onModeChange={(m) => update("coverImageMode", m)}
                  onUrlChange={(v) => update("coverImage", v)}
                  onFileChange={handleCoverFileChange}
                  onFileClear={handleCoverFileClear}
                />
              </div>

              <label>
                <span className="mb-2 block text-sm font-semibold text-slate-700">SEO title</span>
                <input
                  value={form.seoTitle}
                  onChange={(event) => update("seoTitle", event.target.value)}
                  className="w-full rounded-2xl border border-black/10 bg-[#faf7f2] px-4 py-3 outline-none focus:border-amber-600"
                  placeholder="Optional; defaults to article title"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-semibold text-slate-700">SEO description</span>
                <input
                  value={form.seoDescription}
                  onChange={(event) => update("seoDescription", event.target.value)}
                  className="w-full rounded-2xl border border-black/10 bg-[#faf7f2] px-4 py-3 outline-none focus:border-amber-600"
                  placeholder="Optional; defaults to excerpt"
                />
              </label>

              <label className="md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">FAQ schema lines</span>
                <textarea
                  value={form.faqText}
                  onChange={(event) => update("faqText", event.target.value)}
                  className="min-h-32 w-full rounded-[1.5rem] border border-black/10 bg-[#faf7f2] px-4 py-4 text-sm leading-7 outline-none focus:border-amber-600"
                />
                <p className="mt-2 text-xs leading-6 text-slate-500">
                  One FAQ per line using `Question::Answer`.
                </p>
              </label>

              <label className="md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Article body</span>
                <textarea
                  value={form.content}
                  onChange={(event) => update("content", event.target.value)}
                  className="min-h-[24rem] w-full rounded-[1.5rem] border border-black/10 bg-[#faf7f2] px-4 py-4 font-mono text-sm leading-7 outline-none focus:border-amber-600"
                  required
                />
                <p className="mt-2 text-xs leading-6 text-slate-500">
                  {form.contentFormat === "json"
                    ? "Use JSON blocks. Supported JSON can be an array of blocks or an object with `blocks`, `content`, or `body`."
                    : "Use Markdown or MDX. Switch to JSON blocks if the writer wants to submit structured content."}
                </p>
              </label>

              <div className="md:col-span-2 rounded-[1.5rem] border border-black/10 bg-[#faf7f2] p-6">
                <div className="flex items-center justify-between gap-3 border-b border-black/10 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-amber-700">Live preview</p>
                    <h3 className="mt-1 font-serif text-2xl text-slate-950">
                      {form.title || "Untitled article"}
                    </h3>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {form.contentFormat === "json" ? "JSON preview" : "Draft preview"}
                  </span>
                </div>

                <div className="mt-6 rounded-[1.25rem] bg-white p-6 shadow-[0_16px_40px_-32px_rgba(17,17,17,0.5)]">
                  {form.excerpt ? (
                    <p className="mb-5 border-b border-black/10 pb-5 text-sm leading-7 text-slate-600">
                      {form.excerpt}
                    </p>
                  ) : null}

                  {form.contentFormat === "json" ? (
                    <JsonPreview content={form.content} />
                  ) : (
                    <MarkdownPreview content={form.content} />
                  )}
                </div>
              </div>

              <label className="inline-flex items-center gap-3 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(event) => update("published", event.target.checked)}
                  className="h-4 w-4 rounded border-black/20"
                />
                Publish immediately
              </label>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-6">
              <div className="text-sm text-slate-600">
                {status ? status : "Posts save into the repo content directory."}
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  New article
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isPending ? "Saving..." : "Save article"}
                  {isPending ? <FileText className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </form>
        </div>

        <section className="mt-10 rounded-[2rem] border border-black/10 bg-white p-8 shadow-[0_24px_80px_-50px_rgba(17,17,17,0.45)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-amber-700">Manage posts</p>
              <h2 className="mt-2 font-serif text-4xl">Existing articles</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4">
            {posts.length === 0 ? (
              <p className="text-sm text-slate-600">No saved posts found yet.</p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.slug}
                  className="flex flex-col justify-between gap-4 rounded-2xl border border-black/10 bg-[#faf7f2] p-5 md:flex-row md:items-center"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{post.category}</p>
                    <h3 className="mt-2 text-xl font-bold text-slate-900">{post.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">/blog/{post.slug}</p>
                    <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      onClick={() => editPost(post)}
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.slug)}
                      className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}