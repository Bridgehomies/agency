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

// Use the local JSON store in development when KV credentials are not present.
function hasKvConfig() {
  return Boolean(
    (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) &&
      (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN)
  );
}

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
  if (!hasKvConfig()) return readFileStore();
  return (await kv.get<Testimonial[]>(KV_KEY)) ?? [];
}

export async function writeTestimonials(data: Testimonial[]) {
  if (!hasKvConfig()) return writeFileStore(data);
  await kv.set(KV_KEY, data);
}
