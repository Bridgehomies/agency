import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { kv } from "@vercel/kv";
import { sendSubmissionNotification } from "@/lib/email";
import { resolveAmountUsd } from "@/lib/payment-info";

export type GuestSubmission = {
  id: string; submittedAt: string; status: "pending" | "approved" | "rejected";
  name: string; email: string; phone: string; occupation: string; bio: string;
  backlinks: { label: string; url: string }[]; title: string; slug: string;
  category: string; excerpt: string; tags: string[]; content: string; faqText: string;
  coverImagePath: string; adminNotes?: string;
  publishOption: "exchange" | "paid" | ""; exchangeUrl: string;
  paidPlan: "advance" | "after_live" | ""; amountUsd: number;
  paymentProofPath: string; paymentVerified: boolean;
};

const KV_KEY = "blog:submissions";

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);
}

export async function readSubmissions(): Promise<GuestSubmission[]> {
  try { return (await kv.get<GuestSubmission[]>(KV_KEY)) ?? []; } catch { return []; }
}

export async function writeSubmissions(submissions: GuestSubmission[]) {
  await kv.set(KV_KEY, submissions);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const phone = formData.get("phone")?.toString() ?? "";
    const occupation = formData.get("occupation")?.toString() ?? "";
    const bio = formData.get("bio")?.toString() ?? "";
    const backlinksRaw = formData.get("backlinks")?.toString() ?? "[]";
    const title = formData.get("title")?.toString() ?? "";
    const category = formData.get("category")?.toString() ?? "";
    const excerpt = formData.get("excerpt")?.toString() ?? "";
    const tags = formData.get("tags")?.toString() ?? "";
    const content = formData.get("content")?.toString() ?? "";
    const faqText = formData.get("faqText")?.toString() ?? "";
    const imageFile = formData.get("coverImage") as File | null;
    const publishOption = (formData.get("publishOption")?.toString() ?? "") as GuestSubmission["publishOption"];
    const paidPlan = (formData.get("paidPlan")?.toString() ?? "") as GuestSubmission["paidPlan"];
    const exchangeUrl = formData.get("exchangeUrl")?.toString() ?? "";
    const proofFile = formData.get("paymentProof") as File | null;

    if (!name || !email || !title || !excerpt || !content) return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    if (publishOption !== "exchange" && publishOption !== "paid") return NextResponse.json({ error: "Please choose a publishing option." }, { status: 400 });
    if (publishOption === "exchange" && !exchangeUrl.trim()) return NextResponse.json({ error: "Please provide the URL where you added our link." }, { status: 400 });
    if (publishOption === "paid" && paidPlan !== "advance" && paidPlan !== "after_live") return NextResponse.json({ error: "Please choose a payment plan." }, { status: 400 });
    if (publishOption === "paid" && paidPlan === "advance" && (!proofFile || proofFile.size === 0)) return NextResponse.json({ error: "Please attach your money transfer proof before submitting." }, { status: 400 });

    const upload = async (file: File | null, directory: string) => {
      if (!file || file.size === 0) return "";
      const ext = file.name.split(".").pop() ?? "jpg";
      const blob = await put(`${directory}/${slugify(title)}-${Date.now()}.${ext}`, Buffer.from(await file.arrayBuffer()), { access: "public", contentType: file.type || `image/${ext}` });
      return blob.url;
    };

    const id = `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const submission: GuestSubmission = {
      id, submittedAt: new Date().toISOString(), status: "pending", name, email, phone, occupation, bio,
      backlinks: JSON.parse(backlinksRaw), title, slug: slugify(title), category, excerpt,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean), content, faqText,
      coverImagePath: await upload(imageFile, "submissions"), publishOption, exchangeUrl, paidPlan,
      amountUsd: resolveAmountUsd(publishOption, paidPlan), paymentProofPath: await upload(proofFile, "payment-proofs"), paymentVerified: false,
    };

    const existing = await readSubmissions();
    existing.push(submission);
    await writeSubmissions(existing);
    try { await sendSubmissionNotification(submission); } catch (error) { console.error("[blog/submit] email notification failed:", error); }
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("[blog/submit]", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
