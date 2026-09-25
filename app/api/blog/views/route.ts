import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { getPublishedBlogByIdentifier } from "@/lib/blog";

const keyFor = (slug: string) => `blog:views:${slug}`;

async function getPublishedPost(slug: string) {
  if (!/^[a-z0-9-]{1,120}$/.test(slug)) return null;
  return getPublishedBlogByIdentifier(slug);
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug") ?? "";
  const post = await getPublishedPost(slug);
  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });

  try {
    const views = (await kv.get<number>(keyFor(post.slug))) ?? post.views;
    return NextResponse.json({ views }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    // Local development and preview environments may not have KV configured.
    return NextResponse.json({ views: post.views }, { headers: { "Cache-Control": "no-store" } });
  }
}

export async function POST(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug") ?? "";
  const post = await getPublishedPost(slug);
  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });

  try {
    // Preserve any historical frontmatter total once, then use atomic INCR so
    // concurrent readers cannot overwrite one another.
    await kv.setnx(keyFor(post.slug), post.views);
    const views = await kv.incr(keyFor(post.slug));
    return NextResponse.json({ views }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ views: post.views }, { headers: { "Cache-Control": "no-store" } });
  }
}
