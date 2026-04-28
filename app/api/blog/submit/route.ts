import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readFile, access } from "fs/promises";
import path from "path";
import { sendSubmissionNotification } from "@/lib/email";

// ─── Types ────────────────────────────────────────────────────────────────────

export type GuestSubmission = {
  id: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  // Author info
  name: string;
  email: string;
  phone: string;
  occupation: string;
  bio: string;
  backlinks: { label: string; url: string }[];
  // Article
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  tags: string[];
  content: string;
  faqText: string;
  coverImagePath: string; // relative to /public
  adminNotes?: string;
};

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

async function readSubmissions(): Promise<GuestSubmission[]> {
  const filePath = path.join(process.cwd(), "data", "submissions.json");
  try {
    await access(filePath);
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeSubmissions(submissions: GuestSubmission[]) {
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  const filePath = path.join(dir, "submissions.json");
  await writeFile(filePath, JSON.stringify(submissions, null, 2), "utf-8");
}

// ─── POST /api/blog/submit ────────────────────────────────────────────────────

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

    // Basic validation
    if (!name || !email || !title || !excerpt || !content) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // ── Save cover image to /public/uploads/submissions/ ──────────────────
    let coverImagePath = "";
    if (imageFile && imageFile.size > 0) {
      const uploadDir = path.join(process.cwd(), "public", "uploads", "submissions");
      await mkdir(uploadDir, { recursive: true });

      const ext = imageFile.name.split(".").pop() ?? "jpg";
      const safeName = `${slugify(title)}-${Date.now()}.${ext}`;
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await writeFile(path.join(uploadDir, safeName), buffer);
      coverImagePath = `/uploads/submissions/${safeName}`;
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
    };

    // ── Persist to data/submissions.json ──────────────────────────────────
    const existing = await readSubmissions();
    existing.push(submission);
    await writeSubmissions(existing);

    // ── Notify admin via email ────────────────────────────────────────────
    await sendSubmissionNotification(submission);

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("[blog/submit]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}