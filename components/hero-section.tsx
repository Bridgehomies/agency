"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useTransform, useScroll } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import {
  MousePointer,
  Sparkles,
  Zap,
  Target,
  Rocket,
} from "lucide-react";
import ParallaxBackground from "./parallax-background";
import ScrollReveal from "./scroll-reveal";

// NOTE: If you still experience lag after this update, you MUST check these two components. 
// They might have unoptimized requestAnimationFrame loops or heavy SVG animations.
import FloatingElements from "./floating-elements";
import { ScrollingGrid } from "./scrolling-grid";

const interactiveElements = [
  { icon: <Zap className="h-6 w-6" />, text: "AI/ML Engineering", delay: 0.2 },
  { icon: <Target className="h-6 w-6" />, text: "Machine Learning Solutions", delay: 0.4 },
  { icon: <Rocket className="h-6 w-6" />, text: "Production Ready", delay: 0.6 },
];

export default function HeroSection() {
  const { toast } = useToast();
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Simplified scroll transforms
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const handleClick = () => {
    toast({
      title: "🎉 Welcome aboard!",
      description: "We're excited to start this journey with you.",
      action: (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const element = document.getElementById("contact");
            element?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Contact Us
        </Button>
      ),
    });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative pt-20 pb-10 md:pt-32 md:pb-20 overflow-hidden min-h-screen flex items-center"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ScrollingGrid />
        {/* Replaced backdrop-blur with a semi-transparent solid background */}
        <div className="absolute left-1/2 top-1/2 w-[80%] h-[60%] -translate-x-1/2 -translate-y-1/2 bg-white/60 rounded-xl" />
      </div>

      <ParallaxBackground speed={0.2} className="absolute inset-0 -z-20">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.02]" />
      </ParallaxBackground>

      <FloatingElements />

      {/* 
        PERFORMANCE FIX: Replaced heavy `blur-3xl` and `bg-primary/10` with cheap radial gradients.
        The GPU paints gradients instantly without running heavy blur matrices.
      */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{ opacity, willChange: "opacity" }}
      >
        <motion.div
          className="absolute w-96 h-96 -left-16 top-1/4 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.1) 0%, rgba(147,51,234,0) 70%)', willChange: "transform" }}
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-96 h-96 right-0 bottom-0 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, rgba(168,85,247,0) 70%)', willChange: "transform" }}
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="container relative z-10 px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center sm:max-w-xl md:max-w-4xl"
          style={{ y: textY, willChange: "transform" }}
        >
          <ScrollReveal direction="scale" delay={0}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted mb-6 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Crafting Digital Bridges</span>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Expert{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                AI/ML Engineering Services
              </span>{" "}
              That Drive Growth
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8">
              Bridge Homies is a trusted machine learning agency and one of the top AI ML engineering service providers. Our engineers deliver production-grade AI/ML engineering services that help businesses automate, innovate, and scale.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.5}>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {interactiveElements.map((element, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  // Replaced backdrop-blur-sm with bg-background/95
                  className="flex items-center gap-2 px-4 py-2 bg-background/95 rounded-full shadow-sm cursor-pointer border border-border/20"
                >
                  <div className="text-primary">{element.icon}</div>
                  <span className="text-sm font-medium">{element.text}</span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.6}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="group border-primary/20 hover:border-primary/40 shadow-sm transition-all duration-300 bg-background/95"
                onClick={() => {
                  const element = document.getElementById("work");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Our Work
                <MousePointer className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </Button>
            </motion.div>
          </ScrollReveal>
        </motion.div>

        <ScrollReveal direction="up" delay={0.8}>
          <div className="mt-16 relative">
            <motion.div
              className="relative mx-auto max-w-5xl overflow-hidden rounded-xl shadow-2xl shadow-primary/10 sm:max-w-3xl"
              style={{
                y: useTransform(scrollYProgress, [0, 1], [0, 50]),
                willChange: "transform",
              }}
            >
              {/* Removed mix-blend-overlay, replaced with a simple linear gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-purple-600/5 z-10 pointer-events-none" />
              <img
                src="/team.png"
                alt="Bridge Homies team working on software projects"
                className="w-full h-auto cursor-pointer object-cover transition-transform duration-500 hover:scale-[1.02]"
                fetchPriority="high"
                loading="eager"
              />

              {/* Hotspots */}
              <motion.div
                role="button"
                onClick={handleClick}
                className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full cursor-pointer z-20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                role="button"
                onClick={handleClick}
                className="absolute top-1/2 right-1/3 w-4 h-4 bg-purple-500 rounded-full cursor-pointer z-20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </motion.div>

            {/* Replaced backdrop-blur-sm with bg-background/95 for performance */}
            <motion.div
              className="absolute top-4 left-4 p-4 bg-background/95 rounded-lg shadow-lg cursor-pointer border border-border/20 sm:top-4 sm:left-4 md:top-20 md:left-36"
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -40]), willChange: "transform" }}
            >
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium">Fewer Flops</span>
              </div>
              <div className="text-2xl font-bold">More Wins.</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-4 md:bottom-8 md:right-8 p-4 bg-background/95 rounded-lg shadow-lg cursor-pointer border border-border/20"
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -20]), willChange: "transform" }}
            >
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium">Almost perfect</span>
              </div>
              <div className="text-2xl font-bold">(Nobody’s that good.)</div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll Indicator */}
      {/* <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 sm:bottom-6 md:bottom-8 z-30 pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-primary/50 rounded-full flex justify-center items-start">
          <motion.div
            className="w-1 h-2 sm:h-4 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div> */}
    </section>
  );
}