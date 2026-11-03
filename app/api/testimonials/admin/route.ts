import { NextRequest, NextResponse } from "next/server";
import { readTestimonials, writeTestimonials } from "@/lib/testimonials";

// GET /api/testimonials/admin — all submissions (require admin key)
export async function GET(req: NextRequest) {
  const key = req.headers.get("x-admin-key");
  if (key !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json({ testimonials: await readTestimonials() });
  } catch (err) {
    console.error("[testimonials/admin GET]", err);
    return NextResponse.json({ error: "Unable to load testimonials." }, { status: 500 });
  }
}

// PATCH /api/testimonials/admin — approve or reject
export async function PATCH(req: NextRequest) {
  const key = req.headers.get("x-admin-key");
  if (key !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, action, adminNotes } = await req.json();
    if (!id || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const all = await readTestimonials();
    const idx = all.findIndex((t) => t.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    all[idx].status = action === "approve" ? "approved" : "rejected";
    if (adminNotes) all[idx].adminNotes = adminNotes;
    await writeTestimonials(all);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[testimonials/admin PATCH]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

// DELETE /api/testimonials/admin — delete a testimonial
export async function DELETE(req: NextRequest) {
  const key = req.headers.get("x-admin-key");
  if (key !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    const all = await readTestimonials();
    const filtered = all.filter((t) => t.id !== id);
    await writeTestimonials(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
