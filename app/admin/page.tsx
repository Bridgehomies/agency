// src/app/admin/page.tsx
"use client";

import { useEffect, useState, useTransition, useCallback, useMemo } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ChevronDown,
  ChevronUp,
  Globe,
  User,
  Mail,
  Briefcase,
  Tag,
  FileText,
  Image as ImageIcon,
  Loader2,
  MessageSquare,
  Star,
  Trash2,
  RefreshCw,
  LogOut,
} from "lucide-react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type GuestSubmission = {
  id: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  name: string;
  email: string;
  phone: string;
  occupation: string;
  bio: string;
  backlinks: { label: string; url: string }[];
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  tags: string[];
  content: string;
  faqText: string;
  coverImagePath: string;
  adminNotes?: string;
};

type Testimonial = {
  id: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  services: string[];
  rating: number;
  feedback: string;
  adminNotes?: string;
};

type Section = "submissions" | "testimonials";
type FilterTab = "pending" | "approved" | "rejected" | "all";

// ─────────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────────

const STATUS_MAP = {
  pending: {
    label: "Pending",
    icon: <Clock className="h-3.5 w-3.5" />,
    cls: "bg-amber-50 text-amber-700 border-amber-200",
  },
  approved: {
    label: "Approved",
    icon: <CheckCircle className="h-3.5 w-3.5" />,
    cls: "bg-green-50 text-green-700 border-green-200",
  },
  rejected: {
    label: "Rejected",
    icon: <XCircle className="h-3.5 w-3.5" />,
    cls: "bg-red-50 text-red-700 border-red-200",
  },
};

function StatusBadge({ status }: { status: "pending" | "approved" | "rejected" }) {
  const { label, icon, cls } = STATUS_MAP[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>
      {icon}
      {label}
    </span>
  );
}

function FilterTabs({
  filter,
  setFilter,
  counts,
}: {
  filter: FilterTab;
  setFilter: (f: FilterTab) => void;
  counts: Record<FilterTab, number>;
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {(["pending", "all", "approved", "rejected"] as const).map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            filter === f
              ? "bg-[#111] text-white"
              : "border border-black/10 bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}{" "}
          <span
            className={`ml-1 rounded-full px-1.5 py-0.5 text-xs ${
              filter === f ? "bg-white/20 text-white" : "bg-black/8 text-slate-600"
            }`}
          >
            {counts[f]}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Submission Card
// ─────────────────────────────────────────────

function SubmissionCard({
  sub,
  onAction,
  onDelete,
}: {
  sub: GuestSubmission;
  onAction: (id: string, action: "approve" | "reject", notes?: string) => void;
  onDelete?: (id: string, password: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState(sub.adminNotes || "");
  const [isPending, startTransition] = useTransition();

  function act(action: "approve" | "reject") {
    startTransition(() => onAction(sub.id, action, notes));
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_4px_24px_-8px_rgba(17,17,17,0.1)]">
      {/* Header row */}
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={sub.status} />
            <span className="text-xs text-slate-400">
              {new Date(sub.submittedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <h3 className="mt-2 text-lg font-bold text-slate-900">{sub.title}</h3>
          <p className="mt-0.5 text-sm text-slate-600">{sub.excerpt}</p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-amber-600" />
              <strong>{sub.name}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-amber-600" />
              {sub.occupation}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-amber-600" />
              {sub.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-amber-600" />
              {sub.category}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-black/10 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <Eye className="h-4 w-4" />
          {expanded ? "Collapse" : "Review"}
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-black/8 bg-[#faf7f2] p-5 space-y-5">
          {sub.coverImagePath && (
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                <ImageIcon className="h-3.5 w-3.5" /> Featured image
              </p>
              <img src={sub.coverImagePath} alt="Cover" className="h-40 w-full rounded-xl object-cover" />
            </div>
          )}
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Bio</p>
            <p className="text-sm leading-7 text-slate-700">{sub.bio}</p>
          </div>
          {sub.backlinks.length > 0 && (
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                <Globe className="h-3.5 w-3.5" /> Backlinks
              </p>
              <div className="flex flex-wrap gap-2">
                {sub.backlinks.map((bl, i) => (
                  <a
                    key={i}
                    href={bl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-amber-50"
                  >
                    <Globe className="h-3 w-3 text-amber-600" />
                    {bl.label || bl.url}
                  </a>
                ))}
              </div>
            </div>
          )}
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
              <FileText className="h-3.5 w-3.5" />
              Article body (~{sub.content.split(/\s+/).filter(Boolean).length} words)
            </p>
            <pre className="max-h-80 overflow-y-auto rounded-xl bg-[#111] p-4 font-mono text-xs leading-6 text-[#f5efe5] whitespace-pre-wrap">
              {sub.content}
            </pre>
          </div>
          {sub.faqText && (
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">FAQ pairs</p>
              <pre className="rounded-xl bg-white p-4 font-mono text-xs leading-6 text-slate-700 whitespace-pre-wrap border border-black/8">
                {sub.faqText}
              </pre>
            </div>
          )}
          {sub.status === "pending" && (
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                <MessageSquare className="h-3.5 w-3.5" />
                Editorial feedback (sent to author on rejection)
              </label>
              <textarea
                className="min-h-20 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 resize-none"
                placeholder="Optional notes for the author if you're declining..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          )}
          {sub.status === "pending" && (
            <div className="flex flex-wrap gap-3 border-t border-black/8 pt-4">
              <button
                type="button"
                disabled={isPending}
                onClick={() => act("approve")}
                className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                Approve & publish
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={() => act("reject")}
                className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-6 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-60"
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
                Decline
              </button>
            </div>
          )}
          {sub.status !== "pending" && sub.adminNotes && (
            <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800">
              <strong>Admin note:</strong> {sub.adminNotes}
            </div>
          )}
          {sub.status === "approved" && onDelete && (
            <div className="flex justify-end border-t border-black/8 pt-4">
              <button
                type="button"
                onClick={() => {
                  const entered = window.prompt("Re-enter admin password to delete this post:");
                  if (entered !== null) onDelete(sub.id, entered);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete post
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Submissions Panel
// ─────────────────────────────────────────────

function SubmissionsPanel() {
  const [submissions, setSubmissions] = useState<GuestSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterTab>("pending");
  const [status, setStatus] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/blog/submissions");
      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch {
      setStatus("Could not load submissions.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleAction(id: string, action: "approve" | "reject", notes?: string) {
    setStatus("");
    try {
      const res = await fetch("/api/blog/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action, adminNotes: notes }),
      });
      const data = await res.json();
      if (!res.ok) { setStatus(data.error || "Action failed."); return; }
      setStatus(action === "approve" ? "✅ Published and author notified." : "❌ Submission declined and author notified.");
      await load();
    } catch {
      setStatus("Network error.");
    }
  }

  async function handleDelete(id: string, password: string) {
    setStatus("");
    try {
      const res = await fetch("/api/blog/submissions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, adminPassword: password }),
      });
      const data = await res.json();
      if (!res.ok) { setStatus(data.error || "Delete failed."); return; }
      setStatus("🗑️ Post deleted.");
      await load();
    } catch {
      setStatus("Network error.");
    }
  }

  const counts = useMemo(() => ({
    all: submissions.length,
    pending: submissions.filter((s) => s.status === "pending").length,
    approved: submissions.filter((s) => s.status === "approved").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
  }), [submissions]);

  const filtered = useMemo(
    () => submissions.filter((s) => filter === "all" || s.status === filter),
    [submissions, filter]
  );

  return (
    <div>
      {status && (
        <div className="mb-5 rounded-2xl border border-black/8 bg-white px-5 py-3 text-sm font-semibold text-slate-700">
          {status}
        </div>
      )}
      <FilterTabs filter={filter} setFilter={setFilter} counts={counts} />
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-black/8 bg-white p-10 text-center text-slate-500">
          No {filter === "all" ? "" : filter} submissions yet.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((sub) => (
            <SubmissionCard key={sub.id} sub={sub} onAction={handleAction} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Testimonials Panel
// ─────────────────────────────────────────────

function TestimonialsPanel({ adminKey }: { adminKey: string }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Testimonial[]>([]);
  const [filter, setFilter] = useState<FilterTab>("pending");
  const [actionLoading, setActionLoading] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState("");

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("/api/testimonials/admin", {
        headers: { "x-admin-key": adminKey },
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const d = await res.json();
      setData(d.testimonials || []);
    } catch (err: unknown) {
      setStatus(err instanceof Error ? err.message : "Failed to fetch testimonials.");
    } finally {
      setLoading(false);
    }
  }, [adminKey]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleAction = useCallback(async (id: string, action: "approve" | "reject" | "delete") => {
    const lk = `${id}-${action}`;
    setActionLoading((prev) => new Set(prev).add(lk));
    setStatus("");
    try {
      const res = await fetch("/api/testimonials/admin", {
        method: action === "delete" ? "DELETE" : "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify(action === "delete" ? { id } : { id, action }),
      });
      if (!res.ok) throw new Error(`Failed to ${action} testimonial.`);
      await fetchAll();
    } catch (err: unknown) {
      setStatus(err instanceof Error ? err.message : "Action failed.");
    } finally {
      setActionLoading((prev) => {
        const next = new Set(prev);
        next.delete(lk);
        return next;
      });
    }
  }, [adminKey, fetchAll]);

  const isActing = (id: string, action: string) => actionLoading.has(`${id}-${action}`);

  const counts = useMemo(() => ({
    all: data.length,
    pending: data.filter((t) => t.status === "pending").length,
    approved: data.filter((t) => t.status === "approved").length,
    rejected: data.filter((t) => t.status === "rejected").length,
  }), [data]);

  const filtered = useMemo(
    () => (filter === "all" ? data : data.filter((t) => t.status === filter)),
    [data, filter]
  );

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        {status && (
          <p className="rounded-2xl border border-black/8 bg-white px-5 py-3 text-sm font-semibold text-slate-700">
            {status}
          </p>
        )}
        <button
          onClick={fetchAll}
          disabled={loading}
          className="ml-auto inline-flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <FilterTabs filter={filter} setFilter={setFilter} counts={counts} />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-black/8 bg-white p-10 text-center text-slate-500">
          No {filter === "all" ? "" : filter} testimonials yet.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((t) => (
            <div key={t.id} className="overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_4px_24px_-8px_rgba(17,17,17,0.1)]">
              <div className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-slate-900">{t.name}</span>
                      <StatusBadge status={t.status} />
                      <span
                        className="text-sm text-amber-500"
                        aria-label={`${t.rating} out of 5 stars`}
                      >
                        {"★".repeat(t.rating)}
                        <span className="text-slate-300">{"★".repeat(5 - t.rating)}</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{t.email}</span>
                      {t.phone && <span>{t.phone}</span>}
                      {t.company && <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{t.company}</span>}
                      {t.role && <span>{t.role}</span>}
                    </div>
                  </div>
                  <time className="text-xs text-slate-400" dateTime={t.submittedAt}>
                    {new Date(t.submittedAt).toLocaleDateString("en-GB", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </time>
                </div>

                <blockquote className="mb-3 rounded-xl border-l-4 border-amber-200 bg-[#faf7f2] px-4 py-3 text-sm italic leading-relaxed text-slate-700">
                  &ldquo;{t.feedback}&rdquo;
                </blockquote>

                {t.services.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {t.services.map((s) => (
                      <span key={s} className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 border-t border-black/8 pt-4">
                  {(t.status === "pending" || t.status === "rejected") && (
                    <button
                      onClick={() => handleAction(t.id, "approve")}
                      disabled={isActing(t.id, "approve")}
                      className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2 text-xs font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
                    >
                      {isActing(t.id, "approve") ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle className="h-3.5 w-3.5" />}
                      {t.status === "pending" ? "Approve" : "Re-approve"}
                    </button>
                  )}
                  {(t.status === "pending" || t.status === "approved") && (
                    <button
                      onClick={() => handleAction(t.id, "reject")}
                      disabled={isActing(t.id, "reject")}
                      className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-60"
                    >
                      {isActing(t.id, "reject") ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <XCircle className="h-3.5 w-3.5" />}
                      {t.status === "pending" ? "Reject" : "Unpublish"}
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(t.id, "delete")}
                    disabled={isActing(t.id, "delete")}
                    className="ml-auto inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2 text-xs font-semibold text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
                  >
                    {isActing(t.id, "delete") ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Root Admin Page
// ─────────────────────────────────────────────

export default function AdminPage() {
  const [section, setSection] = useState<Section>("submissions");
  const [adminKey, setAdminKey] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = typeof window !== "undefined" ? sessionStorage.getItem("admin_key") || "" : "";
    if (saved) {
      setAdminKey(saved);
      setAuthed(true);
    }
  }, []);

  async function handleLogin() {
    if (!keyInput) return;
    setAuthLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/testimonials/admin", {
        headers: { "x-admin-key": keyInput },
      });
      if (res.status === 401) { setAuthError("Invalid admin key."); return; }
      if (!res.ok) throw new Error("Server error.");
      setAdminKey(keyInput);
      setAuthed(true);
      sessionStorage.setItem("admin_key", keyInput);
    } catch {
      setAuthError("Could not authenticate. Try again.");
    } finally {
      setAuthLoading(false);
    }
  }

  function handleLogout() {
    setAuthed(false);
    setAdminKey("");
    setKeyInput("");
    sessionStorage.removeItem("admin_key");
  }

  if (!mounted) return null;

  // ── Auth wall ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#f5efe5] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <p className="text-xs uppercase tracking-[0.28em] text-amber-700 mb-2">Admin</p>
          <h2 className="font-serif text-4xl text-slate-900 mb-8">Dashboard</h2>
          <input
            type="password"
            placeholder="Admin secret key"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 mb-3"
          />
          {authError && <p className="mb-3 text-xs text-red-600">{authError}</p>}
          <button
            onClick={handleLogin}
            disabled={authLoading || !keyInput}
            className="w-full rounded-xl bg-[#111] py-3 text-sm font-semibold text-white transition hover:bg-[#333] disabled:opacity-50"
          >
            {authLoading ? "Authenticating…" : "Access dashboard"}
          </button>
        </div>
      </div>
    );
  }

  // ── Main dashboard ──
  return (
    <div className="min-h-screen bg-[#f5efe5] px-6 pb-20 pt-16 text-slate-900">
      <div className="mx-auto max-w-4xl">
        {/* Top bar */}
        <div className="mb-10 flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-amber-700">Admin</p>
            <h1 className="mt-1 font-serif text-5xl">Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600 hover:border-red-200"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>

        {/* Section nav */}
        <div className="mb-8 flex gap-2">
          {([
            { id: "submissions", label: "Guest submissions", icon: <FileText className="h-4 w-4" /> },
            { id: "testimonials", label: "Testimonials", icon: <Star className="h-4 w-4" /> },
          ] as const).map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                section === s.id
                  ? "bg-[#111] text-white"
                  : "border border-black/10 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </div>

        {/* Section header */}
        <div className="mb-6">
          {section === "submissions" ? (
            <>
              <h2 className="text-2xl font-bold text-slate-900">Guest submissions</h2>
              <p className="mt-1 text-sm text-slate-500">
                Review, approve, or decline reader-submitted articles. Approving publishes immediately and notifies the author.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-slate-900">Testimonials</h2>
              <p className="mt-1 text-sm text-slate-500">
                Approve or reject reader testimonials before they appear publicly on the site.
              </p>
            </>
          )}
        </div>

        {/* Panel */}
        {section === "submissions" ? (
          <SubmissionsPanel />
        ) : (
          <TestimonialsPanel adminKey={adminKey} />
        )}
      </div>
    </div>
  );
}