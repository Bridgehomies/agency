import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { kv } from "@vercel/kv";

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

const KV_KEY = "testimonials";
const FILE_PATH = path.join(process.cwd(), "data", "testimonials.json");

async function readFileStore(): Promise<Testimonial[]> {
  try {
    const raw = await readFile(FILE_PATH, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Testimonial[]) : [];
  } catch {
    return [];
  }
}

async function writeFileStore(data: Testimonial[]) {
  await mkdir(path.dirname(FILE_PATH), { recursive: true });
  await writeFile(FILE_PATH, JSON.stringify(data, null, 2), "utf8");
}

export async function readTestimonials(): Promise<Testimonial[]> {
  try {
    return (await kv.get<Testimonial[]>(KV_KEY)) ?? [];
  } catch (error) {
    if (process.env.NODE_ENV === "production") throw error;
    return readFileStore();
  }
}

export async function writeTestimonials(data: Testimonial[]) {
  try {
    await kv.set(KV_KEY, data);
  } catch (error) {
    if (process.env.NODE_ENV === "production") throw error;
    await writeFileStore(data);
  }
}
