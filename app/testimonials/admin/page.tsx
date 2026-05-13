"use client";

import { useState, useEffect, useMemo, useCallback } from "react";

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

const STATUS_COLORS = {
    pending: "text-amber-400 border-amber-400/30 bg-amber-400/8",
    approved: "text-emerald-400 border-emerald-400/30 bg-emerald-400/8",
    rejected: "text-red-400 border-red-400/30 bg-red-400/8",
} as const;

type TabType = "pending" | "approved" | "rejected" | "all";

export default function TestimonialsAdminPage() {
    const [key, setKey] = useState("");
    const [authed, setAuthed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Testimonial[]>([]);
    const [tab, setTab] = useState<TabType>("pending");
    const [actionLoading, setActionLoading] = useState<Set<string>>(new Set());
    const [error, setError] = useState("");
    const [mounted, setMounted] = useState(false);

    // Fetch testimonials
    const fetchAll = useCallback(async (adminKey: string) => {
        if (!adminKey) return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/testimonials/admin", {
                headers: { "x-admin-key": adminKey },
            });

            if (!res.ok) {
                if (res.status === 401) {
                    setError("Invalid admin key.");
                    setAuthed(false);
                    return;
                }
                throw new Error(`Server error: ${res.status}`);
            }

            const d = await res.json();
            setData(d.testimonials || []);
            setAuthed(true);

            // Persist key for page refreshes
            if (typeof window !== "undefined") {
                sessionStorage.setItem("admin_key", adminKey);
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to fetch testimonials.");
            setAuthed(false);
        } finally {
            setLoading(false);
        }
    }, []);

    // Handle approve/reject/delete
    const handleAction = useCallback(async (id: string, action: "approve" | "reject" | "delete") => {
        const loadingKey = `${id}-${action}`;
        setActionLoading((prev) => new Set(prev).add(loadingKey));
        setError("");

        try {
            const method = action === "delete" ? "DELETE" : "PATCH";
            const res = await fetch("/api/testimonials/admin", {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-key": key,
                },
                body: JSON.stringify(action === "delete" ? { id } : { id, action }),
            });

            if (!res.ok) throw new Error(`Failed to ${action} testimonial.`);

            // Refresh data after successful mutation
            await fetchAll(key);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Action failed. Please try again.");
        } finally {
            setActionLoading((prev) => {
                const next = new Set(prev);
                next.delete(loadingKey);
                return next;
            });
        }
    }, [key, fetchAll]);

    // Auto-auth on mount if key exists in session storage
    useEffect(() => {
        setMounted(true);
        const savedKey = typeof window !== "undefined" ? sessionStorage.getItem("admin_key") || "" : "";
        if (savedKey) {
            setKey(savedKey);
            fetchAll(savedKey);
        }
    }, [fetchAll]);

    // Memoized computations to prevent unnecessary recalculations
    const counts = useMemo(() => ({
        all: data.length,
        pending: data.filter((t) => t.status === "pending").length,
        approved: data.filter((t) => t.status === "approved").length,
        rejected: data.filter((t) => t.status === "rejected").length,
    }), [data]);

    const filtered = useMemo(() =>
        tab === "all" ? data : data.filter((t) => t.status === tab),
        [data, tab]
    );

    const isActionLoading = (id: string, action: string) =>
        actionLoading.has(`${id}-${action}`);

    // Hydration guard
    if (!mounted) return null;

    // Auth Screen
    if (!authed) {
        return (
            <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
                <div className="w-full max-w-sm">
                    <p className="text-[10px] tracking-[3px] uppercase text-violet-400/80 mb-6">
                        Bridge Homies Admin
                    </p>
                    <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">
                        Testimonials Panel
                    </h2>
                    <input
                        type="password"
                        placeholder="Admin secret key"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && fetchAll(key)}
                        className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-violet-500/50 transition-colors mb-3"
                        aria-label="Admin secret key"
                    />
                    {error && (
                        <p role="alert" className="text-red-400 text-xs mb-3">{error}</p>
                    )}
                    <button
                        onClick={() => fetchAll(key)}
                        disabled={loading || !key}
                        className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-[11px] font-semibold tracking-[2px] uppercase text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Authenticating..." : "Access Panel"}
                    </button>
                </div>
            </div>
        );
    }

    // Admin Panel
    return (
        <div className="min-h-screen bg-[#080808] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <p className="text-[10px] tracking-[3px] uppercase text-violet-400/70 mb-1">
                            Admin Panel
                        </p>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Testimonials
                        </h1>
                    </div>
                    <button
                        onClick={() => fetchAll(key)}
                        disabled={loading}
                        className="text-[10px] tracking-[2px] uppercase text-white/30 hover:text-white/70 transition-colors border border-white/10 px-4 py-2 disabled:opacity-50"
                    >
                        {loading ? "Refreshing..." : "Refresh"}
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-8 border-b border-white/[0.07] pb-0" role="tablist">
                    {(["pending", "approved", "rejected", "all"] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            role="tab"
                            aria-selected={tab === t}
                            className={`px-4 py-2.5 text-[11px] tracking-[1px] uppercase transition-all duration-200 border-b-2 -mb-px ${tab === t
                                    ? "border-violet-500 text-violet-400"
                                    : "border-transparent text-white/30 hover:text-white/60"
                                }`}
                        >
                            {t}{" "}
                            <span className="ml-1 text-[9px] text-white/25">
                                ({counts[t]})
                            </span>
                        </button>
                    ))}
                </div>

                {/* Items */}
                {loading ? (
                    <p className="text-white/30 text-sm text-center py-12">Loading testimonials...</p>
                ) : filtered.length === 0 ? (
                    <p className="text-white/25 text-sm py-12 text-center">
                        No {tab} testimonials.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {filtered.map((t) => (
                            <article key={t.id} className="border border-white/[0.08] bg-white/[0.02] p-5">
                                {/* Top row */}
                                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-[14px] font-semibold text-white">
                                                {t.name}
                                            </span>
                                            <span className={`text-[9px] tracking-[1.5px] uppercase border px-2 py-0.5 ${STATUS_COLORS[t.status]}`}>
                                                {t.status}
                                            </span>
                                            <span className="text-[11px] text-yellow-400" aria-label={`${t.rating} out of 5 stars`}>
                                                {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
                                            </span>
                                        </div>
                                        <div className="text-[11px] text-white/30 space-x-3">
                                            <span>{t.email}</span>
                                            {t.phone && <span>· {t.phone}</span>}
                                            {t.company && <span>· {t.company}</span>}
                                            {t.role && <span>· {t.role}</span>}
                                        </div>
                                    </div>
                                    <time className="text-[10px] text-white/20" dateTime={t.submittedAt}>
                                        {new Date(t.submittedAt).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </time>
                                </div>

                                {/* Feedback */}
                                <blockquote className="text-sm text-white/60 leading-relaxed mb-3">
                                    &ldquo;{t.feedback}&rdquo;
                                </blockquote>

                                {/* Services */}
                                {t.services.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mb-4" aria-label="Services used">
                                        {t.services.map((s) => (
                                            <span
                                                key={s}
                                                className="px-2 py-[2px] text-[9px] tracking-[1px] uppercase border border-violet-500/20 text-violet-400/50"
                                            >
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Actions (Consolidated & DRY) */}
                                <div className="flex gap-2 pt-3 border-t border-white/[0.06]">
                                    {(t.status === "pending" || t.status === "rejected") && (
                                        <button
                                            onClick={() => handleAction(t.id, "approve")}
                                            disabled={isActionLoading(t.id, "approve")}
                                            className="px-4 py-2 bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-[10px] tracking-[1.5px] uppercase hover:bg-emerald-600/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isActionLoading(t.id, "approve") ? "..." : t.status === "pending" ? "Approve" : "Re-approve"}
                                        </button>
                                    )}
                                    {(t.status === "pending" || t.status === "approved") && (
                                        <button
                                            onClick={() => handleAction(t.id, "reject")}
                                            disabled={isActionLoading(t.id, "reject")}
                                            className="px-4 py-2 bg-red-600/10 border border-red-500/25 text-red-400 text-[10px] tracking-[1.5px] uppercase hover:bg-red-600/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isActionLoading(t.id, "reject") ? "..." : t.status === "pending" ? "Reject" : "Unpublish"}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleAction(t.id, "delete")}
                                        disabled={isActionLoading(t.id, "delete")}
                                        className="ml-auto px-4 py-2 bg-white/[0.03] border border-white/10 text-white/30 text-[10px] tracking-[1.5px] uppercase hover:text-red-400 hover:border-red-500/25 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isActionLoading(t.id, "delete") ? "..." : "Delete"}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}