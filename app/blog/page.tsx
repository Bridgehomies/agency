// app/blog/page.tsx
import type { Metadata } from "next";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import BlogsExperience from "@/components/blog/BlogsExperience";
import { getPublishedBlogs } from "@/lib/blog";

export const metadata: Metadata = {
  title: "AI Engineering & SaaS Development Blog",
  description:
    "In-depth articles on SaaS development, custom web apps, AI integrations, automation, and software engineering. Written by practitioners for founders and developers.",
  alternates: { canonical: "/blog" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  openGraph: {
    title: "AI Engineering & SaaS Development Blog | Bridge Homies",
    description: "Practical articles on SaaS, AI engineering, automation, web development, and software growth. Written for builders and founders.",
    url: "/blog",
    siteName: "Bridge Homies",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Bridge Homies Blog — SaaS, Web Dev & AI Engineering" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Engineering & SaaS Development Blog | Bridge Homies",
    description: "Practical articles on SaaS, AI engineering, automation, and custom software. Written for builders and founders.",
    images: ["/og-image.png"],
    site: "@bridgehomies",
  },
};

function buildJsonLd(posts: { title: string; slug: string; excerpt: string; date: string; dateModified?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://www.bridgehomies.com/blog#collectionpage",
        url: "https://www.bridgehomies.com/blog",
        name: "Bridge Homies Blog — AI Engineering & SaaS Development",
        description: "In-depth articles on SaaS development, custom web apps, AI integrations, automation, and software engineering.",
        inLanguage: "en-US",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.bridgehomies.com/#website",
          url: "https://www.bridgehomies.com",
          name: "Bridge Homies",
          publisher: {
            "@type": "Organization",
            "@id": "https://www.bridgehomies.com/#organization",
            name: "Bridge Homies",
            url: "https://www.bridgehomies.com",
            logo: { "@type": "ImageObject", url: "https://www.bridgehomies.com/logo-bg.png" },
          },
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bridgehomies.com" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.bridgehomies.com/blog" },
          ],
        },
        hasPart: posts.slice(0, 12).map((post) => ({
          "@type": "Article",
          url: `https://www.bridgehomies.com/blog/${post.slug}`,
          name: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.dateModified,
        })),
      },
    ],
  };
}

export default async function BlogPage() {
  const posts = await getPublishedBlogs();
  return (
    <>
      <script
        id="blog-index-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(posts)) }}
      />
      <Navbar />
      <BlogsExperience posts={posts} />
      {posts.length > 17 && (
        <nav
          aria-labelledby="blog-archive-heading"
          className="mx-auto max-w-[1340px] border-t border-[#d4cfc6] px-6 py-14 md:px-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">
            Article directory
          </p>
          <h2
            id="blog-archive-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950"
          >
            More from the archive
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
            Browse older articles directly by title. Every published post has a
            link here, including posts beyond the interactive list’s first page.
          </p>
          <ul className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(17).map((post) => (
              <li key={post.slug} className="border-t border-zinc-200 py-3">
                <a
                  href={`/blog/${post.slug}`}
                  className="text-sm leading-6 text-zinc-800 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-violet-700 hover:decoration-violet-500"
                >
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <Footer />
    </>
  );
}
