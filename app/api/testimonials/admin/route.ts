import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

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

// GET /api/testimonials/admin — all submissions (require admin key)
export async function GET(req: NextRequest) {
  const key = req.headers.get("x-admin-key");
  if (key !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const all = await readAll();
  return NextResponse.json({ testimonials: all });
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

    const all = await readAll();
    const idx = all.findIndex((t) => t.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    all[idx].status = action === "approve" ? "approved" : "rejected";
    if (adminNotes) all[idx].adminNotes = adminNotes;
    await saveAll(all);

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
    const all = await readAll();
    const filtered = all.filter((t) => t.id !== id);
    await saveAll(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}