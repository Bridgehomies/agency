// File: app/api/blog/submissions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendApprovalEmail, sendRejectionEmail } from "@/lib/email";
import { readSubmissions, writeSubmissions } from "@/app/api/blog/submit/route";
import type { GuestSubmission } from "@/app/api/blog/submit/route";

// ─── GET /api/blog/submissions  →  list all ───────────────────────────────────
export async function GET() {
  const all = await readSubmissions();
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

    const all = await readSubmissions();
    const index = all.findIndex((s) => s.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Submission not found." }, { status: 404 });
    }

    const submission = all[index];
    submission.status = action === "approve" ? "approved" : "rejected";
    if (adminNotes) submission.adminNotes = adminNotes;

    if (action === "approve") {
      const ADMIN_ENDPOINT = process.env.BLOG_ADMIN_URL || "http://localhost:3001";

      const parsedFaq = submission.faqText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [q, ...aParts] = line.split("::");
          return { question: q.trim(), answer: aParts.join("::").trim() };
        })
        .filter((item) => item.question && item.answer);

      // ── Publish to blog writer service (non-fatal if offline) ────────────
      try {
        const res = await fetch(`${ADMIN_ENDPOINT}/save`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id:             submission.id,
            slug:           submission.slug,
            title:          submission.title,
            excerpt:        submission.excerpt,
            author:         submission.name,
            authorRole:     submission.occupation,
            category:       submission.category,
            tags:           submission.tags,
            coverImage:     submission.coverImagePath,
            seoTitle:       submission.title,
            seoDescription: submission.excerpt,
            published:      true,
            content:        submission.content,
            faq:            parsedFaq,
          }),
        });
        if (!res.ok) {
          const body = await res.text();
          console.error("[blog/submissions] writer service error:", res.status, body);
        }
      } catch (writerErr) {
        console.error("[blog/submissions] writer service unreachable:", writerErr);
      }

      // ── Send approval email (non-fatal) ───────────────────────────────────
      try {
        await sendApprovalEmail(submission);
      } catch (emailErr) {
        console.error("[blog/submissions] approval email failed:", emailErr);
      }
    } else {
      // ── Send rejection email (non-fatal) ──────────────────────────────────
      try {
        await sendRejectionEmail(submission, adminNotes);
      } catch (emailErr) {
        console.error("[blog/submissions] rejection email failed:", emailErr);
      }
    }

    all[index] = submission;
    await writeSubmissions(all);

    return NextResponse.json({ success: true, submission });
  } catch (err) {
    console.error("[blog/submissions PATCH]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

// ─── DELETE /api/blog/submissions  →  delete an approved post ────────────────
export async function DELETE(req: NextRequest) {
  const { id, adminPassword } = await req.json();

  if (adminPassword !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const all = await readSubmissions();
  const index = all.findIndex((s) => s.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  }

  all.splice(index, 1);
  await writeSubmissions(all);

  return NextResponse.json({ success: true });
}