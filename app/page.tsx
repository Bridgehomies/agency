import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import WorkSection from "@/components/work-section"
import TimelineSection from "@/components/timeline-section"
import DiagnosticQuiz from "@/components/diagnostic-quiz"
import InteractiveChecklist from "@/components/interactive-checklist"
import BookingSystem from "@/components/booking-system"
import InteractiveMap from "@/components/interactive-map"
import RealTimePoll from "@/components/real-time-poll"
import TeamSection from "@/components/team-section"
import ContactSection from "@/components/contact-section"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import StickyTransformSection from "@/components/sticky-transform-section"

export const metadata: Metadata = {
  title: "AI & Software Development Agency | Bridge Homies",
  description:
    "Bridge Homies builds AI-powered software, SaaS platforms, and custom web & mobile apps that help businesses scale. Based in Lahore, serving clients globally.",
  alternates: {
    canonical: "https://bridgehomies.com",
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background sm:min-h-screen md:min-h-screen lg:min-h-screen xl:min-h-screen">
      <Toaster />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <WorkSection />
        <TimelineSection />
        <StickyTransformSection />
        <DiagnosticQuiz />
        <InteractiveChecklist />
        <BookingSystem />
        <InteractiveMap />
        <RealTimePoll />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
