// "use client";

// import { useRef, useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { motion, useTransform, useScroll, useMotionValue, useSpring } from "framer-motion";
// import { useToast } from "@/components/ui/use-toast";
// import { ArrowUpRight, Terminal, Cpu } from "lucide-react";

// // ─── Typing cursor ────────────────────────────────────────────────────────────
// function BlinkCursor() {
//   return (
//     <motion.span
//       className="inline-block w-[2px] h-[1em] bg-purple-600 ml-[2px] align-middle"
//       animate={{ opacity: [1, 1, 0, 0] }}
//       transition={{ duration: 0.8, repeat: Infinity, ease: "linear", times: [0, 0.49, 0.5, 1] }}
//     />
//   );
// }

// // ─── Typing text effect ───────────────────────────────────────────────────────
// function TypeWriter({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
//   const [displayed, setDisplayed] = useState("");
//   const [done, setDone] = useState(false);

//   useEffect(() => {
//     let i = 0;
//     const timeout = setTimeout(() => {
//       const interval = setInterval(() => {
//         setDisplayed(text.slice(0, i + 1));
//         i++;
//         if (i >= text.length) {
//           clearInterval(interval);
//           setDone(true);
//         }
//       }, 28);
//       return () => clearInterval(interval);
//     }, delay);
//     return () => clearTimeout(timeout);
//   }, [text, delay]);

//   return (
//     <span className={className}>
//       {displayed}
//       {!done && <BlinkCursor />}
//     </span>
//   );
// }

// // ─── ASCII art logo ───────────────────────────────────────────────────────────
// const asciiLogo = `██████╗ ██╗  ██╗
// ██╔══██╗██║  ██║
// ██████╔╝███████║
// ██╔══██╗██╔══██║
// ██████╔╝██║  ██║
// ╚═════╝ ╚═╝  ╚═╝`;

// // ─── Noise SVG filter (light theme) ───────────────────────────────────────────
// function NoiseSVG() {
//   return (
//     <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-10" aria-hidden>
//       <filter id="noise">
//         <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
//         <feColorMatrix type="saturate" values="0" />
//       </filter>
//       <rect width="100%" height="100%" filter="url(#noise)" />
//     </svg>
//   );
// }

// // ─── Scanline overlay (light theme) ───────────────────────────────────────────
// function Scanlines() {
//   return (
//     <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)] bg-[size:100%_4px]" />
//   );
// }

// // ─── Animated grid (light theme) ──────────────────────────────────────────────
// function CRTGrid() {
//   return (
//     <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04] bg-[linear-gradient(rgba(124,58,237,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.3)_1px,transparent_1px)] bg-[size:40px_40px]" />
//   );
// }

// // ─── Glitch text (minimal essential CSS for keyframes) ────────────────────────
// function GlitchText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
//   return (
//     <span className={`relative inline-block ${className}`} data-text={children as string}>
//       <style>{`
//         @keyframes glitch-1 {
//           0%, 92%, 100% { transform: translate(0); opacity: 0; }
//           93% { transform: translate(-4px, 1px); opacity: 1; }
//           95% { transform: translate(4px, -1px); opacity: 1; }
//           97% { transform: translate(-2px, 0); opacity: 1; }
//         }
//         @keyframes glitch-2 {
//           0%, 90%, 100% { transform: translate(0); opacity: 0; }
//           91% { transform: translate(4px, -1px); opacity: 1; }
//           94% { transform: translate(-4px, 1px); opacity: 1; }
//           96% { transform: translate(2px, 0); opacity: 1; }
//         }
//       `}</style>
//       <span className="relative" data-text={children as string}>
//         {children}
//         <span className="absolute inset-0 text-red-500 clip-[polygon(0_20%,100%_20%,100%_40%,0_40%)] translate-x-[-3px] animate-[glitch-1_4s_infinite_steps(1)] opacity-0" aria-hidden>
//           {children}
//         </span>
//         <span className="absolute inset-0 text-cyan-400 clip-[polygon(0_60%,100%_60%,100%_80%,0_80%)] translate-x-[3px] animate-[glitch-2_4s_infinite_steps(1)] opacity-0" aria-hidden>
//           {children}
//         </span>
//       </span>
//     </span>
//   );
// }

// // ─── Stat box ─────────────────────────────────────────────────────────────────
// function StatBox({ value, label, delay }: { value: string; label: string; delay: number }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay, duration: 0.5 }}
//       className="border border-purple-200 p-4 relative group hover:border-purple-400 transition-colors duration-300 bg-white"
//     >
//       <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-purple-400" />
//       <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-purple-400" />
//       <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-purple-400" />
//       <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-purple-400" />
//       <div className="font-mono text-3xl font-black text-black mb-1">{value}</div>
//       <div className="font-mono text-xs text-gray-500 uppercase tracking-widest">{label}</div>
//     </motion.div>
//   );
// }

// // ─── Terminal log ─────────────────────────────────────────────────────────────
// const logLines = [
//   { prefix: "SYS", text: "Initializing Bridge Homies kernel...", color: "text-gray-400" },
//   { prefix: "OK ", text: "AI/ML engineering stack loaded", color: "text-purple-600" },
//   { prefix: "OK ", text: "FastAPI + React + PostgreSQL ready", color: "text-purple-600" },
//   { prefix: "RUN", text: "Production deployments: ACTIVE", color: "text-green-600" },
//   { prefix: "RUN", text: "Client systems: ONLINE", color: "text-green-600" },
// ];

// function TerminalLog() {
//   const [visibleLines, setVisibleLines] = useState(0);

//   useEffect(() => {
//     const t = setTimeout(() => {
//       const interval = setInterval(() => {
//         setVisibleLines(v => {
//           if (v >= logLines.length) { clearInterval(interval); return v; }
//           return v + 1;
//         });
//       }, 400);
//       return () => clearInterval(interval);
//     }, 1200);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <div className="font-mono text-xs space-y-1">
//       {logLines.slice(0, visibleLines).map((line, i) => (
//         <motion.div
//           key={i}
//           initial={{ opacity: 0, x: -10 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="flex gap-3"
//         >
//           <span className="text-gray-300 select-none">[{line.prefix}]</span>
//           <span className={line.color}>{line.text}</span>
//         </motion.div>
//       ))}
//       {visibleLines < logLines.length && (
//         <div className="flex gap-3">
//           <span className="text-gray-300">[...] </span>
//           <BlinkCursor />
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Main component ───────────────────────────────────────────────────────────
// export default function HeroSection() {
//   const { toast } = useToast();
//   const heroRef = useRef<HTMLElement | null>(null);
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
//   const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

//   const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
//   const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
//   const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);

//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       const rect = heroRef.current?.getBoundingClientRect();
//       if (!rect) return;
//       mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 30);
//       mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 30);
//     };
//     window.addEventListener("mousemove", handler);
//     return () => window.removeEventListener("mousemove", handler);
//   }, []);

//   const handleCTA = () => {
//     const el = document.getElementById("work");
//     el?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <section
//       id="home"
//       ref={heroRef}
//       className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white"
//     >
//       {/* Atmosphere */}
//       <NoiseSVG />
//       <Scanlines />
//       <CRTGrid />

//       {/* Radial glow (purple) */}
//       <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(124,58,237,0.06)_0%,transparent_70%)]" />

//       {/* ASCII logo — top right decorative */}
//       <motion.div
//         className="absolute top-24 right-8 opacity-[0.04] pointer-events-none hidden lg:block"
//         style={{ x: smoothX, y: smoothY }}
//       >
//         <pre className="font-mono text-[10px] leading-tight text-purple-600 select-none whitespace-pre">{asciiLogo}</pre>
//       </motion.div>

//       {/* Main content */}
//       <motion.div className="container relative z-30 px-4 sm:px-6 pt-20 sm:pt-24 pb-16" style={{ y: contentY, opacity }}>

//         {/* Top label */}
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1, duration: 0.4 }}
//           className="flex flex-wrap items-center gap-3 mb-8 sm:mb-10"
//         >
//           <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-[0.2em]">
//             <Terminal className="w-3 h-3 text-purple-600" />
//             <span>Bridge Homies</span>
//             <span className="text-gray-300">—</span>
//             <span>Lahore, PK</span>
//             <span className="text-gray-300">—</span>
//             <span className="text-green-600">Est. 2024</span>
//           </div>
//           <div className="flex-1 h-px bg-gray-200" />
//           <div className="font-mono text-[10px] text-gray-400">v2.0.0</div>
//         </motion.div>

//         {/* Hero headline */}
//         <div className="mb-8 sm:mb-10 max-w-4xl">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="font-mono text-[10px] sm:text-[11px] text-purple-600/70 uppercase tracking-[0.3em] mb-3 sm:mb-4"
//           >
//             $ ./deploy --service="ai-ml-engineering" --mode=production
//           </motion.div>

//           <h1 className="font-black leading-none tracking-tight mb-0"
//             style={{ fontFamily: "'Courier New', 'Courier', monospace" }}>
//             <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-black mb-1 sm:mb-2">
//               <GlitchText>WE BUILD</GlitchText>
//             </div>
//             <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
//               <span className="text-purple-600">
//                 <TypeWriter text="MACHINES" delay={400} />
//               </span>
//             </div>
//             <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-black mt-1 sm:mt-2">
//               <TypeWriter text="THAT THINK." delay={1200} />
//             </div>
//           </h1>
//         </div>

//         {/* Body + right column */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
//           {/* Left */}
//           <div>
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 2.2 }}
//               className="font-mono text-gray-500 text-sm leading-relaxed mb-6 sm:mb-8 max-w-lg"
//             >
//               Production-grade AI/ML engineering. No fluff. No vaporware.
//               We deliver systems that automate operations, sharpen decisions,
//               and scale without breaking — for businesses that ship, not just plan.
//             </motion.p>

//             {/* CTA row */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 2.5 }}
//               className="flex flex-wrap gap-3 sm:gap-4 items-center mb-8 sm:mb-10"
//             >
//               <button
//                 onClick={handleCTA}
//                 className="group relative font-mono text-sm font-bold px-5 py-2.5 sm:px-6 sm:py-3 bg-black text-white overflow-hidden transition-all duration-200 hover:bg-purple-600"
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   VIEW OUR WORK
//                   <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
//                 </span>
//               </button>

//               <button
//                 onClick={() => { const el = document.getElementById("contact"); el?.scrollIntoView({ behavior: "smooth" }); }}
//                 className="font-mono text-sm text-gray-500 hover:text-purple-600 transition-colors duration-200 flex items-center gap-2 border border-gray-200 hover:border-purple-300 px-5 py-2.5 sm:px-6 sm:py-3"
//               >
//                 GET IN TOUCH
//               </button>
//             </motion.div>

//             {/* Terminal log */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 2.8 }}
//               className="border border-gray-200 bg-gray-50 p-4 max-w-lg"
//             >
//               <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
//                 <Cpu className="w-3 h-3 text-purple-600" />
//                 <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">System Status</span>
//               </div>
//               <TerminalLog />
//             </motion.div>
//           </div>

//           {/* Right — stats + services */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 2.0, duration: 0.6 }}
//           >
//             {/* Stats grid */}
//             <div className="grid grid-cols-2 gap-px mb-px bg-gray-200">
//               <StatBox value="50+" label="Projects shipped" delay={2.2} />
//               <StatBox value="98%" label="Client retention" delay={2.3} />
//               <StatBox value="6" label="Core services" delay={2.4} />
//               <StatBox value="∞" label="Ambition level" delay={2.5} />
//             </div>

//             {/* Services list */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 2.8 }}
//               className="border border-gray-200 divide-y divide-gray-200 mt-px bg-white"
//             >
//               {[
//                 ["01", "AI / ML Engineering"],
//                 ["02", "Web & Enterprise SaaS"],
//                 ["03", "Mobile App Development"],
//                 ["04", "UI/UX Design"],
//                 ["05", "Automation & Pipelines"],
//               ].map(([num, svc]) => (
//                 <div key={num} className="flex items-center justify-between px-4 py-3 group hover:bg-purple-50 cursor-default transition-colors">
//                   <span className="font-mono text-[10px] text-gray-400">{num}</span>
//                   <span className="font-mono text-xs text-gray-600 group-hover:text-purple-600 transition-colors">{svc}</span>
//                   <ArrowUpRight className="w-3 h-3 text-gray-300 group-hover:text-purple-600 transition-colors" />
//                 </div>
//               ))}
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Bottom bar */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 3.2 }}
//           className="mt-12 sm:mt-16 pt-6 border-t border-gray-200 flex flex-wrap justify-between items-center gap-4"
//         >
//           <div className="flex flex-wrap gap-4 sm:gap-6">
//             {["Next.js", "FastAPI", "Python", "PostgreSQL", "React"].map(tech => (
//               <span key={tech} className="font-mono text-[10px] text-gray-400 uppercase tracking-widest hover:text-purple-600 transition-colors cursor-default">{tech}</span>
//             ))}
//           </div>
//           <div className="font-mono text-[10px] text-gray-400 flex items-center gap-2">
//             <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
//             ALL SYSTEMS OPERATIONAL
//           </div>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }

"use client";

import { useRef, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles, Activity, ArrowRight, Fingerprint, Cpu } from "lucide-react";

// Assuming these remain for ambient background effects
import ParallaxBackground from "../parallax-background";
import FloatingElements from "../floating-elements";

export default function HeroSectionSpatial() {
  const { toast } = useToast();
  const containerRef = useRef<HTMLElement | null>(null);

  // --- Scroll Parallax Setup ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const statsY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // --- 3D Hover Effect Setup ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the 3D tilt
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    // Calculate normalized position (-0.5 to 0.5)
    mouseX.set(mouseXPos / width - 0.5);
    mouseY.set(mouseYPos / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleAction = () => {
    toast({
      title: "Systems Online",
      description: "Routing you to our engineering specialists.",
      action: (
        <Button variant="outline" size="sm" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
          Initialize
        </Button>
      ),
    });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen lg:min-h-[120vh] flex items-center justify-center overflow-hidden bg-background [perspective:1000px]"
    >
      <ParallaxBackground speed={0.05} className="absolute inset-0 -z-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      </ParallaxBackground>
      <FloatingElements />

      {/* BACKGROUND TYPOGRAPHY LAYER (Moves down on scroll) */}
      <motion.div
        className="absolute w-full text-center pointer-events-none -z-10"
        style={{ y: textY, opacity, willChange: "transform, opacity" }}
      >
        <h1 className="text-[12vw] font-black tracking-tighter text-foreground/5 leading-none select-none uppercase">
          Intelligence
        </h1>
      </motion.div>

      <div className="container relative z-10 px-4 max-w-6xl mx-auto flex flex-col items-center mt-8 sm:mt-16 lg:mt-20">
        {/* HEADER BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-xl border border-border shadow-2xl mb-8 z-20"
        >
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </div>
          <span className="text-sm font-semibold tracking-wide uppercase text-foreground">Next-Gen AI/ML Services</span>
        </motion.div>

        {/* 3D SPATIAL IMAGE WRAPPER */}
        <motion.div
          className="relative w-full max-w-4xl cursor-none"
          style={{ y: imageY, rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleAction}
        >
          {/* Main Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-primary/10 bg-muted transform-gpu">
            <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent mix-blend-overlay z-10" />
            <img
              src="/team.png"
              alt="Bridge Homies Engineering"
              className="w-full h-auto object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              fetchPriority="high"
            />
          </div>

          {/* FLOATING GLASS STAT 1 (Z-axis offset) */}
          <motion.div
            className="absolute -left-6 md:-left-12 top-1/4 p-4 md:p-6 bg-background/60 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-2xl z-20"
            style={{ transform: "translateZ(50px)" }}
          >
            <Cpu className="h-6 w-6 text-primary mb-2" />
            <div className="text-2xl font-bold tracking-tight">Production</div>
            <div className="text-sm text-muted-foreground font-medium">Ready ML Models</div>
          </motion.div>

          {/* FLOATING GLASS STAT 2 (Z-axis offset) */}
          <motion.div
            className="absolute -right-6 md:-right-12 bottom-1/4 p-4 md:p-6 bg-primary/90 text-primary-foreground backdrop-blur-2xl border border-primary-foreground/20 rounded-2xl shadow-2xl shadow-primary/30 z-20"
            style={{ transform: "translateZ(80px)" }}
          >
            <Activity className="h-6 w-6 mb-2" />
            <div className="text-2xl font-bold tracking-tight">Fewer Flops.</div>
            <div className="text-sm opacity-90 font-medium">More Wins.</div>
          </motion.div>

          {/* CUSTOM CURSOR FOLLOWER */}
          <motion.div
            className="absolute top-0 left-0 w-24 h-24 bg-primary/20 rounded-full blur-xl pointer-events-none z-30 mix-blend-screen"
            style={{
              x: useTransform(mouseX, [-0.5, 0.5], [-100, 100]),
              y: useTransform(mouseY, [-0.5, 0.5], [-100, 100])
            }}
          />
        </motion.div>

        {/* BOTTOM CONTENT (Moves up on scroll) */}
        <motion.div
          className="mt-16 text-center max-w-2xl z-20"
          style={{ y: statsY, willChange: "transform" }}
        >
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
            We bridge the gap between <span className="text-primary italic">theory</span> and <span className="text-primary italic">scale.</span>
          </h2>
          <Button
            size="lg"
            className="rounded-full h-14 px-8 text-lg group bg-foreground text-background hover:bg-foreground/90 transition-all"
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore Our Work
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
          </Button>
        </motion.div>

      </div>
    </section>
  );
}