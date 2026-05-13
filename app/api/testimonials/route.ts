import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

export type Testimonial = {
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

const FILE_PATH = path.join(process.cwd(), "data", "testimonials.json");

async function readAll(): Promise<Testimonial[]> {
  try {
    const raw = await readFile(FILE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function saveAll(data: Testimonial[]) {
  await mkdir(path.dirname(FILE_PATH), { recursive: true });
  await writeFile(FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// GET /api/testimonials — return only approved ones
export async function GET() {
  const all = await readAll();
  const approved = all.filter((t) => t.status === "approved");
  return NextResponse.json({ testimonials: approved });
}

// POST /api/testimonials — submit a new testimonial (goes to pending)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, role, services, rating, feedback } = body;

    if (!name || !email || !services?.length || !rating || !feedback) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be 1–5." }, { status: 400 });
    }

    const id = `tmn_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const entry: Testimonial = {
      id,
      submittedAt: new Date().toISOString(),
      status: "pending",
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || undefined,
      company: company?.trim() || undefined,
      role: role?.trim() || undefined,
      services,
      rating: Number(rating),
      feedback: feedback.trim(),
    };

    const all = await readAll();
    all.push(entry);
    await saveAll(all);

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("[testimonials POST]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}