import type { Metadata } from "next";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import BlogsExperience from "@/components/BlogsExperience";
import { getPublishedBlogByIdentifier, getPublishedBlogs } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Bridge Homies editorial archive for AI, software development, automation, SEO, and digital growth insights.",
  alternates: {
    canonical: "https://bridgehomies.com/blog",
  },
  openGraph: {
    title: "Bridge Homies Blog",
    description:
      "A searchable archive of articles on AI, engineering, automation, SEO, and growth.",
    url: "https://bridgehomies.com/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getPublishedBlogs()
    .map((post) => getPublishedBlogByIdentifier(post.slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));

  return (
    <>
      <Navbar />
      <BlogsExperience posts={posts} />
      <Footer />
    </>
  );
}