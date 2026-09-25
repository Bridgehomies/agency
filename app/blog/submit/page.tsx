import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BlogSubmitPortal from "@/components/blog/BlogSubmitPortal";

export const metadata: Metadata = {
  title: "Write for Us | SaaS, Web Dev & AI Guest Posts",
  description: "Write for Bridge Homies on SaaS, web development, AI, and software automation. Submit a guest post for editorial review.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/blog/submit" },
  openGraph: {
    title: "Write for Us | SaaS & Web Dev Guest Posts | Bridge Homies",
    description: "Submit a guest post on SaaS, web development, AI integrations, or software automation.",
    url: "/blog/submit",
    type: "website",
  },
};

export default function WriteForUsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" aria-label="Write for Us — Guest Post Submission">
        <BlogSubmitPortal />
      </main>
      <Footer />
    </>
  );
}
