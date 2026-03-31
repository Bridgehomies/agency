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
  title: "AI ML Engineering Services & Machine Learning Agency | Bridge Homies",
  description:
    "Bridge Homies is a leading machine learning agency and top ai ml engineering service providers. We offer expert ai/ml engineering services, SaaS, and custom software to help businesses scale globally.",
  alternates: {
    canonical: "https://bridgehomies.com",
  },
  openGraph: {
    title: "AI ML Engineering Services & Machine Learning Agency | Bridge Homies",
    description:
      "Top ai ml engineering service providers delivering expert ai/ml engineering services. A trusted machine learning agency for enterprise AI solutions.",
    url: "https://bridgehomies.com",
    type: "website",
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