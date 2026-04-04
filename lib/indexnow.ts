// app/lib/indexnow.ts   (or wherever you placed it)
"use server";

export async function notifyIndexNow(slug: string | string[]) {
  const slugs = Array.isArray(slug) ? slug : [slug];

  const urls = slugs.map((s) => 
    `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bridgehomies.com'}/blog/${s}`
  );

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bridgehomies.com'}/api/indexnow`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls }),
    });

    const data = await res.json();
    
    if (res.ok) {
      console.log(`✅ IndexNow notified for: ${urls.join(', ')}`);
    } else {
      console.error('❌ IndexNow failed:', data);
    }
    
    return data;
  } catch (err) {
    console.error('Failed to notify IndexNow:', err);
    return { success: false, error: 'Network error' };
  }
}