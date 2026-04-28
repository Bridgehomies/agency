"use client";

import { useEffect, useState, useTransition } from "react";
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
} from "lucide-react";

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

const STATUS_MAP = {
  pending: {
    label: "Pending",
    icon: <Clock className="h-4 w-4" />,
    cls: "bg-amber-50 text-amber-700 border-amber-200",
  },
  approved: {
    label: "Approved",
    icon: <CheckCircle className="h-4 w-4" />,
    cls: "bg-green-50 text-green-700 border-green-200",
  },
  rejected: {
    label: "Rejected",
    icon: <XCircle className="h-4 w-4" />,
    cls: "bg-red-50 text-red-700 border-red-200",
  },
};

function StatusBadge({ status }: { status: GuestSubmission["status"] }) {
  const { label, icon, cls } = STATUS_MAP[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}
    >
      {icon}
      {label}
    </span>
  );
}

function SubmissionCard({
  sub,
  onAction,
}: {
  sub: GuestSubmission;
  onAction: (id: string, action: "approve" | "reject", notes?: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState(sub.adminNotes || "");
  const [isPending, startTransition] = useTransition();

  function act(action: "approve" | "reject") {
    startTransition(() => {
      onAction(sub.id, action, notes);
    });
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
          {/* Cover image */}
          {sub.coverImagePath && (
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                <ImageIcon className="h-3.5 w-3.5" />
                Featured image
              </p>
              <img
                src={sub.coverImagePath}
                alt="Cover"
                className="h-40 w-full rounded-xl object-cover"
              />
            </div>
          )}

          {/* Bio */}
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Bio</p>
            <p className="text-sm leading-7 text-slate-700">{sub.bio}</p>
          </div>

          {/* Backlinks */}
          {sub.backlinks.length > 0 && (
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                <Globe className="h-3.5 w-3.5" />
                Backlinks
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

          {/* Article content */}
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
              <FileText className="h-3.5 w-3.5" />
              Article body (~{sub.content.split(/\s+/).filter(Boolean).length} words)
            </p>
            <pre className="max-h-80 overflow-y-auto rounded-xl bg-[#111] p-4 font-mono text-xs leading-6 text-[#f5efe5] whitespace-pre-wrap">
              {sub.content}
            </pre>
          </div>

          {/* FAQ */}
          {sub.faqText && (
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">FAQ pairs</p>
              <pre className="rounded-xl bg-white p-4 font-mono text-xs leading-6 text-slate-700 whitespace-pre-wrap border border-black/8">
                {sub.faqText}
              </pre>
            </div>
          )}

          {/* Admin notes */}
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

          {/* Action buttons */}
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
        </div>
      )}
    </div>
  );
}

export default function SubmissionsPanel() {
  const [submissions, setSubmissions] = useState<GuestSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
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

  async function handleAction(
    id: string,
    action: "approve" | "reject",
    notes?: string
  ) {
    setStatus("");
    try {
      const res = await fetch("/api/blog/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action, adminNotes: notes }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(data.error || "Action failed.");
        return;
      }
      setStatus(
        action === "approve"
          ? `✅ Published and author notified.`
          : `❌ Submission declined and author notified.`
      );
      await load();
    } catch {
      setStatus("Network error.");
    }
  }

  const filtered = submissions.filter(
    (s) => filter === "all" || s.status === filter
  );

  const counts = {
    all: submissions.length,
    pending: submissions.filter((s) => s.status === "pending").length,
    approved: submissions.filter((s) => s.status === "approved").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-[#f5efe5] px-6 pb-20 pt-32 text-slate-900">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.28em] text-amber-700">Admin</p>
          <h1 className="mt-2 font-serif text-5xl">Guest submissions</h1>
          <p className="mt-3 text-base text-slate-600">
            Review, approve, or decline reader-submitted articles. Approving a post publishes it
            immediately and notifies the author.
          </p>
        </div>

        {/* Status message */}
        {status && (
          <div className="mb-5 rounded-2xl border border-black/8 bg-white px-5 py-3 text-sm font-semibold text-slate-700">
            {status}
          </div>
        )}

        {/* Filter tabs */}
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

        {/* Cards */}
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
              <SubmissionCard key={sub.id} sub={sub} onAction={handleAction} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}