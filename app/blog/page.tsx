import type { Metadata } from "next";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import BlogsExperience from "@/components/BlogsExperience";
import { getPublishedBlogByIdentifier, getPublishedBlogs } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | SaaS, Web Dev, AI & Automation Insights — Bridge Homies",
  description:
    "The Bridge Homies editorial archive. In-depth articles on SaaS development, custom web apps, AI integrations, automation, and software engineering for founders and developers.",
  alternates: {
    canonical: "https://bridgehomies.com/blog",
  },
  openGraph: {
    title: "Bridge Homies Blog | SaaS, Web Dev & AI Insights",
    description:
      "A searchable archive of practical articles on SaaS, AI engineering, automation, web development, and software growth. Written for builders and founders.",
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