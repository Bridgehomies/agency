import type { Metadata } from "next";
import HeroSection from "@/components/about/HeroSection";
import StorySection from "@/components/about/StorySection";
import TeamSection from "@/components/about/TeamSection";
import ValuesSection from "@/components/about/ValuesSection";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "About Bridge Homies | Software Engineering & AI",
  description:
    "Meet Bridge Homies, a Lahore-based software engineering and AI company building custom software, SaaS platforms, web and mobile apps, and automation.",
  alternates: { canonical: "/aboutus" },
  openGraph: { url: "/aboutus", type: "website" },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen overflow-hidden bg-gray-50 text-gray-900 selection:bg-purple-900 selection:text-white">
        <HeroSection />
        <StorySection />
        <TeamSection />
        <ValuesSection />
        
      </main>
      <Footer />
    </>
  );
}
