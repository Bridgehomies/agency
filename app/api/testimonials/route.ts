import { NextRequest, NextResponse } from "next/server";
import { readTestimonials, writeTestimonials, type Testimonial } from "@/lib/testimonials";

// GET /api/testimonials — return only approved ones
export async function GET() {
  try {
    const all = await readTestimonials();
    return NextResponse.json({ testimonials: all.filter((t) => t.status === "approved") });
  } catch (err) {
    console.error("[testimonials GET]", err);
    return NextResponse.json({ error: "Unable to load testimonials." }, { status: 500 });
  }
}

// POST /api/testimonials — submit a new testimonial (goes to pending)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, role, services, rating, feedback } = body;

    if (
      typeof name !== "string" || !name.trim() ||
      typeof email !== "string" || !email.trim() ||
      !Array.isArray(services) || services.length === 0 ||
      !Number.isInteger(Number(rating)) || !feedback || typeof feedback !== "string"
    ) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (Number(rating) < 1 || Number(rating) > 5) {
      return NextResponse.json({ error: "Rating must be 1–5." }, { status: 400 });
    }
    if (feedback.trim().length < 30) {
      return NextResponse.json({ error: "Feedback must be at least 30 characters." }, { status: 400 });
    }

    const id = `tmn_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const entry: Testimonial = {
      id,
      submittedAt: new Date().toISOString(),
      status: "pending",
      name: name.trim(),
      email: email.trim(),
      phone: typeof phone === "string" ? phone.trim() || undefined : undefined,
      company: typeof company === "string" ? company.trim() || undefined : undefined,
      role: typeof role === "string" ? role.trim() || undefined : undefined,
      services: services.filter((service: unknown): service is string => typeof service === "string"),
      rating: Number(rating),
      feedback: feedback.trim(),
    };

    const all = await readTestimonials();
    all.push(entry);
    await writeTestimonials(all);

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("[testimonials POST]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
