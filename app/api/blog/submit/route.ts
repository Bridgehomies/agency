// File: app/api/blog/submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { kv } from "@vercel/kv";
import { sendSubmissionNotification } from "@/lib/email";
import { resolveAmountUsd } from "@/lib/payment-info";

// ─── Types ────────────────────────────────────────────────────────────────────

export type GuestSubmission = {
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
  // ── Publishing / payment choice ──
  publishOption: "exchange" | "paid" | "";
  exchangeUrl: string;
  paidPlan: "advance" | "after_live" | "";
  amountUsd: number;
  paymentProofPath: string;
  paymentVerified: boolean;
};

const KV_KEY = "blog:submissions";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export async function readSubmissions(): Promise<GuestSubmission[]> {
  try {
    const data = await kv.get<GuestSubmission[]>(KV_KEY);
    return data ?? [];
  } catch {
    return [];
  }
}

export async function writeSubmissions(submissions: GuestSubmission[]) {
  await kv.set(KV_KEY, submissions);
}

// ─── POST /api/blog/submit ────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name        = formData.get("name")?.toString() ?? "";
    const email       = formData.get("email")?.toString() ?? "";
    const phone       = formData.get("phone")?.toString() ?? "";
    const occupation  = formData.get("occupation")?.toString() ?? "";
    const bio         = formData.get("bio")?.toString() ?? "";
    const backlinksRaw = formData.get("backlinks")?.toString() ?? "[]";
    const title       = formData.get("title")?.toString() ?? "";
    const category    = formData.get("category")?.toString() ?? "";
    const excerpt     = formData.get("excerpt")?.toString() ?? "";
    const tags        = formData.get("tags")?.toString() ?? "";
    const content     = formData.get("content")?.toString() ?? "";
    const faqText     = formData.get("faqText")?.toString() ?? "";
    const imageFile   = formData.get("coverImage") as File | null;

    const publishOption = (formData.get("publishOption")?.toString() ?? "") as "exchange" | "paid" | "";
    const paidPlan       = (formData.get("paidPlan")?.toString() ?? "") as "advance" | "after_live" | "";
    const exchangeUrl    = formData.get("exchangeUrl")?.toString() ?? "";
    const proofFile      = formData.get("paymentProof") as File | null;

    if (!name || !email || !title || !excerpt || !content) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // ── Validate publishing / payment choice server-side ───────────────────
    // (The client already enforces this, but never trust the client alone.)
    if (publishOption !== "exchange" && publishOption !== "paid") {
      return NextResponse.json({ error: "Please choose a publishing option." }, { status: 400 });
    }
    if (publishOption === "exchange" && !exchangeUrl.trim()) {
      return NextResponse.json({ error: "Please provide the URL where you added our link." }, { status: 400 });
    }
    if (publishOption === "paid") {
      if (paidPlan !== "advance" && paidPlan !== "after_live") {
        return NextResponse.json({ error: "Please choose a payment plan." }, { status: 400 });
      }
      if (paidPlan === "advance" && (!proofFile || proofFile.size === 0)) {
        return NextResponse.json({ error: "Please attach your money transfer proof before submitting." }, { status: 400 });
      }
    }

    // ── Upload cover image to Vercel Blob ─────────────────────────────────
    let coverImagePath = "";
    if (imageFile && imageFile.size > 0) {
      const ext      = imageFile.name.split(".").pop() ?? "jpg";
      const safeName = `submissions/${slugify(title)}-${Date.now()}.${ext}`;
      const buffer   = Buffer.from(await imageFile.arrayBuffer());

      const blob = await put(safeName, buffer, {
        access: "public",
        contentType: imageFile.type || `image/${ext}`,
      });

      coverImagePath = blob.url;
    }

    // ── Upload payment proof (private-ish — only linked from the admin panel) ──
    let paymentProofPath = "";
    if (proofFile && proofFile.size > 0) {
      const ext      = proofFile.name.split(".").pop() ?? "jpg";
      const safeName = `payment-proofs/${slugify(title)}-${Date.now()}.${ext}`;
      const buffer   = Buffer.from(await proofFile.arrayBuffer());

      const blob = await put(safeName, buffer, {
        access: "public",
        contentType: proofFile.type || `image/${ext}`,
      });

      paymentProofPath = blob.url;
    }

    // ── Build submission record ────────────────────────────────────────────
    const id = `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const submission: GuestSubmission = {
      id,
      submittedAt: new Date().toISOString(),
      status: "pending",
      name,
      email,
      phone,
      occupation,
      bio,
      backlinks: JSON.parse(backlinksRaw),
      title,
      slug: slugify(title),
      category,
      excerpt,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      content,
      faqText,
      coverImagePath,
      publishOption,
      exchangeUrl,
      paidPlan,
      amountUsd: resolveAmountUsd(publishOption, paidPlan),
      paymentProofPath,
      // "Pay in advance" comes with proof attached, but an admin still
      // confirms the funds actually arrived before marking it verified.
      paymentVerified: false,
    };

    // ── Persist to Vercel KV ──────────────────────────────────────────────
    const existing = await readSubmissions();
    existing.push(submission);
    await writeSubmissions(existing);

    // ── Notify admin via email (non-fatal) ────────────────────────────────
    try {
      await sendSubmissionNotification(submission);
    } catch (emailErr) {
      console.error("[blog/submit] email notification failed:", emailErr);
    }

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("[blog/submit]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}