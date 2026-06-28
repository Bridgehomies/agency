import type { Metadata } from "next";
import HeroSection from "@/components/about/HeroSection";
import StorySection from "@/components/about/StorySection";
import TeamSection from "@/components/about/TeamSection";
import ValuesSection from "@/components/about/ValuesSection";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "About Bridge Homies AI/ML Engineering Team in Lahore, Pakistan",
  description: "Meet the team behind Bridge Homies an AI/ML engineering agency founded in Lahore in 2025 by Muhammad Bin Asif and Muhammad Talha.",
  alternates: { canonical: "/aboutus" },
  openGraph: { url: "/aboutus", type: "website" },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12 md:pt-28">
        <HeroSection />
        <StorySection />
        <TeamSection />
        <ValuesSection />
        
      </main>
      <Footer />
    </>
  );
} 