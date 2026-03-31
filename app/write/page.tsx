import type { Metadata } from "next";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import BlogWriterPortal from "@/components/BlogWriterPortal";

export const metadata: Metadata = {
  title: "Write Blog",
  description: "Internal writing portal for creating and managing Bridge Homies blog articles.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BlogWriterPage() {
  return (
    <>
      <Navbar />
      <BlogWriterPortal />
      <Footer />
    </>
  );
}