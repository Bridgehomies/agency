import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BlogSubmitPortal from "@/components/blog/BlogSubmitPortal";

export const metadata: Metadata = {
  title: "Submit a Guest Article | Bridge Homies",
  description: "Submit an original, technically useful software article for editorial review. Publication is not guaranteed; paid placements disclose sponsored links.",
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  alternates: { canonical: "/blog/submit" },
  openGraph: {
    title: "Submit a Guest Article | Bridge Homies",
    description: "Submit an original software article for editorial review. Paid placements disclose sponsored links.",
    url: "/blog/submit",
    type: "website",
  },
};

export default function WriteForUsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" aria-label="Submit a Guest Article">
        <BlogSubmitPortal />
      </main>
      <Footer />
    </>
  );
}
