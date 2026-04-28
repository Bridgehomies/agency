import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BlogSubmitPortal from "@/components/BlogSubmitPortal";

export const metadata: Metadata = {
  title: "Submit a Guest Post | Bridge Homies",
  description:
    "Share your knowledge with the Bridge Homies community. Submit a guest post and get published in front of our growing audience.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogSubmitPage() {
  return (
    <>
      <Navbar />
      <BlogSubmitPortal />
      <Footer />
    </>
  );
}