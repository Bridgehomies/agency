import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { sendApprovalEmail, sendRejectionEmail } from "@/lib/email";

// ─── Re-use the same type as the submit route ─────────────────────────────────

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

const SUBMISSIONS_PATH = path.join(process.cwd(), "data", "submissions.json");

async function readAll(): Promise<GuestSubmission[]> {
  try {
    const raw = await readFile(SUBMISSIONS_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function saveAll(submissions: GuestSubmission[]) {
  await mkdir(path.dirname(SUBMISSIONS_PATH), { recursive: true });
  await writeFile(SUBMISSIONS_PATH, JSON.stringify(submissions, null, 2), "utf-8");
}

// ─── GET /api/blog/submissions  →  list all ───────────────────────────────────
export async function GET() {
  const all = await readAll();
  return NextResponse.json({ submissions: all });
}

// ─── PATCH /api/blog/submissions  →  approve or reject ───────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, action, adminNotes } = body as {
      id: string;
      action: "approve" | "reject";
      adminNotes?: string;
    };

    if (!id || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const all = await readAll();
    const index = all.findIndex((s) => s.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Submission not found." }, { status: 404 });
    }

    const submission = all[index];
    submission.status = action === "approve" ? "approved" : "rejected";
    if (adminNotes) submission.adminNotes = adminNotes;

    // ── If approving: publish to blog (write into content/blogs via the
    //    existing admin writer service, or write file directly) ────────────
    if (action === "approve") {
      const ADMIN_ENDPOINT =
        process.env.BLOG_ADMIN_URL || "http://localhost:3001";

      const parsedFaq = submission.faqText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [q, ...aParts] = line.split("::");
          return { question: q.trim(), answer: aParts.join("::").trim() };
        })
        .filter((item) => item.question && item.answer);

      await fetch(`${ADMIN_ENDPOINT}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: submission.id,
          slug: submission.slug,
          title: submission.title,
          excerpt: submission.excerpt,
          author: submission.name,
          authorRole: submission.occupation,
          category: submission.category,
          tags: submission.tags,
          coverImage: submission.coverImagePath,
          seoTitle: submission.title,
          seoDescription: submission.excerpt,
          published: true,
          content: submission.content,
          faq: parsedFaq,
        }),
      });

      await sendApprovalEmail(submission);
    } else {
      await sendRejectionEmail(submission, adminNotes);
    }

    all[index] = submission;
    await saveAll(all);

    return NextResponse.json({ success: true, submission });
  } catch (err) {
    console.error("[blog/submissions PATCH]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}