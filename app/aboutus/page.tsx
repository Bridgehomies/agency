"use client";

import { useEffect } from "react";
import HeroSection from "@/components/about/HeroSection";
import StorySection from "@/components/about/StorySection";
import TeamSection from "@/components/about/TeamSection";
import ValuesSection from "@/components/about/ValuesSection";
import ClientsSection from "@/components/about/ClientsSection";
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutPage() {
  useEffect(() => {
    // Animation triggers
    const elements = document.querySelectorAll('.hover-scale');
    elements.forEach(el => {
      el.addEventListener('mouseenter', (event) => {
        (event.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
      });
      el.addEventListener('mouseleave', (event) => {
        (event.currentTarget as HTMLElement).style.transform = 'scale(1)';
      });
    });

    // Animate elements when they come into view
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__fadeInUp');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('section > div').forEach(section => {
      observer.observe(section);
    });

    return () => {
      // Cleanup observers
      elements.forEach(el => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
     <main className="container mx-auto px-4 py-12 md:pt-28">
      {/* Decorative elements */}
      <div className="fixed top-20 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-30 blur-xl animate-pulse"></div>
      <div className="fixed bottom-40 right-20 w-40 h-40 rounded-full bg-purple-100 opacity-30 blur-xl animate-pulse" style={{ animationDelay: '300ms' }}></div>
      
      <HeroSection />
      <StorySection />
      <TeamSection />
      <ValuesSection />
      {/* <ClientsSection /> */}

      {/* Floating action button */}
      
      <Footer/>
    </main>
    </>
   
  );
}