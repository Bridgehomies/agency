"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowRight,
  MousePointer,
  Sparkles,
  Zap,
  Target,
  Rocket,
} from "lucide-react";
import ParallaxBackground from "./parallax-background";
import ScrollReveal from "./scroll-reveal";
import FloatingElements from "./floating-elements";
import { ScrollingGrid } from "./scrolling-grid";


export default function HeroSection() {
  const { toast } = useToast();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  // Scroll-based transformations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Cursor tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
        cursorX.set(x - 16);
        cursorY.set(y - 16);
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", moveCursor);
      heroElement.addEventListener("mouseenter", () => setIsHovering(true));
      heroElement.addEventListener("mouseleave", () => setIsHovering(false));
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", moveCursor);
        heroElement.removeEventListener("mouseenter", () =>
          setIsHovering(true)
        );
        heroElement.removeEventListener("mouseleave", () =>
          setIsHovering(false)
        );
      }
    };
  }, [cursorX, cursorY]);

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

  const interactiveElements = [
    { icon: <Zap className="h-6 w-6" />, text: "Fast Development", delay: 0.2 },
    {
      icon: <Target className="h-6 w-6" />,
      text: "Precise Solutions",
      delay: 0.4,
    },
    { icon: <Rocket className="h-6 w-6" />, text: "Launch Ready", delay: 0.6 },
  ];

  return (
    <section
      id="home"
      className="relative pt-20 pb-10 md:pt-32 md:pb-20 overflow-hidden min-h-screen flex items-center"
      ref={heroRef}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ScrollingGrid />
        <div className="absolute left-1/2 top-1/2 w-[80%] h-[60%] -translate-x-1/2 -translate-y-1/2 bg-white/20 rounded-xl backdrop-blur-md" />
      </div>

      {/* Custom Cursor */}
      {isHovering && (
        <motion.div
          className="hidden sm:block fixed top-0 left-0 w-8 h-8 bg-primary/20 rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
          animate={{
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
        />
      )}

      {/* Parallax Background */}
      <ParallaxBackground speed={0.3} className="absolute inset-0 -z-20">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.02]" />
        <div className="absolute top-1/4 -left-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl md:w-96 md:h-96" />
        <div className="absolute bottom-1/4 -right-16 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl md:w-96 md:h-96" />
      </ParallaxBackground>

      {/* Floating Elements */}
      <FloatingElements />

      {/* Interactive Background Elements */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{ scale, opacity }}
      >
        {/* Mouse-following elements */}
        <motion.div
          className="absolute w-64 h-64 bg-primary/10 rounded-full blur-3xl md:w-96 md:h-96"
          style={{
            x: useTransform(cursorXSpring, [0, 1000], [0, 50]),
            y: useTransform(cursorYSpring, [0, 800], [0, 30]),
          }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-purple-500/10 rounded-full blur-3xl md:w-96 md:h-96"
          style={{
            x: useTransform(cursorXSpring, [0, 1000], [0, -30]),
            y: useTransform(cursorYSpring, [0, 800], [0, -20]),
          }}
        />
      </motion.div>

      <div className="container relative z-10 px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center sm:max-w-xl md:max-w-4xl"
          style={{ y: textY }}
        >
          <ScrollReveal direction="scale" delay={0}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted mb-6 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">
                Crafting Digital Bridges
              </span>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              We Build{" "}
              <motion.span
                className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                Software
              </motion.span>{" "}
              That Drives Growth
            </motion.h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <motion.p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8">
              Our team of experts combines creativity and technology to deliver
              exceptional digital solutions that help businesses thrive in the
              digital age.
            </motion.p>
          </ScrollReveal>

          {/* Interactive Elements */}
          <ScrollReveal direction="up" delay={0.5}>
            <motion.div className="flex flex-wrap justify-center gap-4 mb-8">
              {interactiveElements.map((element, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: element.delay }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg cursor-pointer border border-border/20"
                >
                  <div className="text-primary">{element.icon}</div>
                  <span className="text-sm font-medium">{element.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.6}>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-primary/20 hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm"
                  onClick={() => {
                    const element = document.getElementById("work");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View Our Work
                  <MousePointer className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                </Button>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </motion.div>

        {/* Interactive Hero Image with Immersive Scroll */}
        <ScrollReveal direction="up" delay={0.8}>
          <motion.div className="mt-16 relative">
            <motion.div
              className="relative mx-auto max-w-5xl overflow-hidden rounded-xl shadow-2xl shadow-primary/10 sm:max-w-3xl"
              style={{
                scale: useTransform(scrollYProgress, [0, 0.5], [1, 0.95]),
                rotateX: useTransform(scrollYProgress, [0, 0.5], [0, 5]),
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-purple-600/10 mix-blend-overlay " />
              <motion.img
                src="/team.png"
                alt="Dashboard preview"
                className="w-full h-auto cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                loading="lazy"
              />

              {/* Interactive Hotspots */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full cursor-pointer"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
                whileHover={{ scale: 1.5 }}
              />
              <motion.div
                className="absolute top-1/2 right-1/3 w-4 h-4 bg-purple-500 rounded-full cursor-pointer"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.5,
                }}
                whileHover={{ scale: 1.5 }}
              />
            </motion.div>

            {/* Floating Achievement Cards with Parallax */}
            <motion.div
              className="absolute top-4 left-4 p-4 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg cursor-pointer border border-border/20 
               sm:top-4 sm:left-4 
               md:top-20 md:left-36"
              style={{
                y: useTransform(scrollYProgress, [0, 1], [0, -50]),
              }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium">Fewer Flops</span>
              </div>
              <motion.div
                className="text-2xl font-bold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                More Wins.
              </motion.div>
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -right-4 md:bottom-8 md:right-8 p-4 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg cursor-pointer border border-border/20"
              style={{
                y: useTransform(scrollYProgress, [0, 1], [0, -30]),
              }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium">Almost perfect</span>
              </div>
              <motion.div
                className="text-2xl font-bold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.5,
                }}
              >
                (Nobody’s that good.)
              </motion.div>
            </motion.div>
          </motion.div>
        </ScrollReveal>
      </div>

      {/* Scroll Indicator */}
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 sm:bottom-6 md:bottom-8 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-primary/50 rounded-full flex justify-center items-start">
          <motion.div
            className="w-1 h-2 sm:h-4 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>
    </section>
  );
}
