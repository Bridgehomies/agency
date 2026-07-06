"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence, useTransform } from "framer-motion";
import { X, ArrowUpRight, ExternalLink, Sparkles, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: 8, index: "01",
    title: "IHFP", titleShort: "IH",
    subtitle: "Pigeon Racing Community Platform",
    category: "WEB",
    image: "/work/hfp.png",
    year: "2025",
    color: "#8B5CF6",
    bg: "#F3EEFF",
    longDescription: "International High Flying Pigeon connects racing and breeding enthusiasts worldwide, offering community tools for tracking pedigrees, race results, and fancier profiles.",
    technologies: ["React", "Tanstack Start", "Tailwind", "PostgreSQL", "FastAPI"],
    link: "https://ihfp.io",
  },
  {
    id: 9, index: "02",
    title: "MAIL\nHAULER PRO", titleShort: "MH",
    subtitle: "Email Infrastructure SaaS",
    category: "WEB",
    image: "/work/white.png",
    year: "2025",
    color: "#7C3AED",
    bg: "#F5F0FF",
    longDescription: "SaaS email infrastructure platform for mailbox warmup, deliverability management, and inbox operations at scale, built for teams running high-volume outbound.",
    technologies: ["React", "TypeScript", "TanStack Query", "Tailwind"],
    link: "https://mailhaulerpro.com",
  },
  {
    id: 4, index: "03",
    title: "AIERPIFY", titleShort: "AI",
    subtitle: "FBR Invoicing Software",
    category: "WEB",
    image: "/work/aierpify.png",
    year: "2025",
    color: "#6D28D9",
    bg: "#EDE9FE",
    longDescription: "Digital invoicing software designed to streamline billing for businesses. Invoice creation, payment tracking, and financial reporting—all FBR compliant.",
    technologies: ["Next.js", "Tailwind", "Supabase"],
    link: "https://aierpify.com",
  },
  {
    id: 10, index: "04",
    title: "PREMIUM\nSTRINGZ", titleShort: "PS",
    subtitle: "Event Management Platform",
    category: "WEB",
    image: "/work/logo-ps.png",
    year: "2025",
    color: "#6D28D9",
    bg: "#EDE9FE",
    longDescription: "Event management platform streamlining planning, bookings, and coordination for organizers, with tools built for a smooth end-to-end event experience.",
    technologies: ["Next.js", "Node.js", "PostgreSQL"],
    link: "https://premiumstringz.net",
  },
  {
    id: 11, index: "05",
    title: "TRINITY\nPEPTIDE", titleShort: "TP",
    subtitle: "Peptide & Supplements Ecommerce",
    category: "WEB",
    image: "/work/logo-tpg.jpeg",
    year: "2025",
    color: "#9333EA",
    bg: "#FAF5FF",
    longDescription: "Ecommerce storefront for peptide and supplement products, with clean product catalog browsing, secure checkout, and compliance-aware content presentation.",
    technologies: ["Vite", "Stripe", "Tailwind", "Medusa.js"],
    link: "https://trinitypeptidegroup.com",
  },
  {
    id: 7, index: "06",
    title: "NABEERA\nBAREERA", titleShort: "NB",
    subtitle: "Ecommerce — Fashion & Lifestyle",
    category: "WEB",
    image: "/work/nb.png",
    year: "2025",
    color: "#7C3AED",
    bg: "#F5F0FF",
    longDescription: "Developed a user-friendly ecommerce platform specializing in fashion and lifestyle products, featuring secure payment gateways and a seamless shopping experience.",
    technologies: ["Next.js", "Fast API", "Supabase"],
    link: "https://www.nabeerabareera.com/",
  },
  {
    id: 1, index: "07",
    title: "CV\nJET", titleShort: "CV",
    subtitle: "Smart Resume Platform",
    category: "WEB",
    image: "/work/cvjet.png",
    year: "2023",
    color: "#8B5CF6",
    bg: "#F3EEFF",
    longDescription: "Comprehensive CV selector solution with resume parsing, job matching, advanced filtering, and a responsive design for optimal cross-device experience.",
    technologies: ["Next.js"],
    link: "https://cvjet.com",
  },
  {
    id: 2, index: "08",
    title: "EMOTION\nDETECT", titleShort: "ED",
    subtitle: "ML · NLP Text Analysis",
    category: "WEB · MOBILE",
    image: "/work/ted1.png",
    year: "2023",
    color: "#5B21B6",
    bg: "#EDE9FE",
    longDescription: "Detects human emotions—Joy, Sadness, Anger, Fear, Surprise, Neutral—from English text using NLP and machine learning. Built for customer feedback analysis at scale.",
    technologies: ["Python", "ML", "NLP", "Streamlit"],
    link: "https://text-sentiments-detector.streamlit.app/",
  },
  {
    id: 3, index: "09",
    title: "MOVEX\nAUTO", titleShort: "MX",
    subtitle: "Vehicle Transport Platform",
    category: "WEB",
    image: "/work/movex.png",
    year: "2023",
    color: "#7C3AED",
    bg: "#F5F0FF",
    longDescription: "Professional vehicle transport service with real-time tracking, booking management, shipment oversight, and enterprise-grade data protection.",
    technologies: ["React", "Bootstrap", "JavaScript"],
    link: "https://movexautoshipping.com",
  },
  {
    id: 5, index: "10",
    title: "FB AUTO\nMATIONS", titleShort: "FB",
    subtitle: "Social Media Engine",
    category: "WEB",
    image: "/work/fb.png",
    year: "2025",
    color: "#9333EA",
    bg: "#FAF5FF",
    longDescription: "Comprehensive automation tool for Facebook posts, comments, and messages—streamlining social media management and amplifying engagement.",
    technologies: ["React", "Node.js", "Facebook API"],
    link: "https://facebook-automations.com",
  },
  {
    id: 6, index: "11",
    title: "ONYX\nFINTECH", titleShort: "OX",
    subtitle: "AI Loan Matchmaking",
    category: "WEB",
    image: "/work/fin.webp",
    year: "2025",
    color: "#6D28D9",
    bg: "#EDE9FE",
    longDescription: "Enterprise loan-matching platform connecting borrowers with optimal lenders via AI algorithms. Manages client networks, deal tracking, and financial reporting.",
    technologies: ["React", "TypeScript", "Django", "PostgreSQL", "AI/ML", "AWS"],
    link: "https://onyxfintech.com",
    keyFeatures: [
      { icon: "sparkles", title: "AI Matchmaking", description: "Algorithms predict optimal borrower-lender pairings from profile analysis" },
      { icon: "trending", title: "Deal Dashboard", description: "Centralized deal creation, progress tracking, and interaction oversight" },
      { icon: "shield", title: "Secure Infra", description: "PostgreSQL + load balancing + real-time server monitoring" },
    ],
    highlights: ["Data Visualization", "Email Campaigns", "CI/CD Pipeline", "Server Monitoring", "Dynamic Forms"],
  },
  
];

type Project = typeof PROJECTS[0];

/* ─── HOOKS ──────────────────────────────────────────────────────────────── */

// Utility to disable custom cursors on mobile to prevent layout and touch issues
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(true); // Default true to avoid hydration mismatch
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  return isTouch;
}

/* ─── CURSOR SPOTLIGHT ───────────────────────────────────────────────────── */

function CursorSpotlight() {
  const isTouch = useIsTouchDevice();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (isTouch) return;
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, isTouch]);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-0"
      style={{
        width: 600, height: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 65%)",
        translateX: "-50%", translateY: "-50%",
        left: springX, top: springY,
      }}
    />
  );
}

/* ─── MARQUEE ─────────────────────────────────────────────────────────────── */

function Marquee({ items }: { items: string[] }) {
  const text = items.join("  ·  ") + "  ·  ";
  return (
    <div
      className="overflow-hidden whitespace-nowrap select-none py-3"
      style={{ borderTop: "1px solid rgba(124,58,237,0.12)", borderBottom: "1px solid rgba(124,58,237,0.12)" }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="inline-block font-mono"
        style={{ fontSize: 11, letterSpacing: "0.35em", color: "rgba(124,58,237,0.35)" }}
      >
        {text.repeat(8)}
      </motion.div>
    </div>
  );
}

/* ─── ICON HELPER ────────────────────────────────────────────────────────── */

const getIcon = (name: string) => {
  if (name === "sparkles") return <Sparkles className="h-4 w-4" />;
  if (name === "trending") return <TrendingUp className="h-4 w-4" />;
  return <Shield className="h-4 w-4" />;
};

/* ─── PROJECT CARD ───────────────────────────────────────────────────────── */

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const isTouch = useIsTouchDevice();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-4, 4]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0); mouseY.set(0); setHovered(false);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
      style={{
        rotateX: isTouch ? 0 : rotateX,
        rotateY: isTouch ? 0 : rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`group flex flex-col w-full h-full text-left bg-transparent border-none p-0 ${isTouch ? "cursor-pointer" : "cursor-none"}`}
    >
      <div
        className="relative flex flex-col w-full h-full overflow-hidden"
        style={{
          border: `1px solid ${hovered ? project.color + "50" : "rgba(124,58,237,0.12)"}`,
          transition: "border-color 0.4s, box-shadow 0.4s",
          boxShadow: hovered ? `0 0 40px ${project.color}15` : "none",
        }}
      >
        {/* Image - Fixed Aspect Ratio */}
        <div className="relative w-full shrink-0 overflow-hidden" style={{ aspectRatio: "4/3" }}>
          <motion.img
            src={project.image}
            alt={project.title.replace("\n", " ")}
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full h-full object-cover"
          />
          {/* Subtle index number overlay */}
          <div
            className="absolute top-2 right-4 leading-none font-black select-none pointer-events-none"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              color: "#ffffff",
              opacity: hovered ? 0.4 : 0.2,
              mixBlendMode: "overlay",
              transition: "opacity 0.4s",
              fontFamily: "'Courier New', monospace",
            }}
          >
            {project.index}
          </div>
        </div>

        {/* Bottom info - Flex Grows to Match Heights */}
        <div className="p-5 flex flex-col grow bg-white" style={{ background: "#FFFFFF" }}>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <p className="text-[10px] mb-2 font-mono uppercase" style={{ color: project.color, letterSpacing: "0.25em" }}>
                {project.category} — {project.year}
              </p>
              <h3
                className="font-black leading-tight"
                style={{
                  fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                  color: "#1E0A3C",
                  fontFamily: "'Bebas Neue', sans-serif",
                  whiteSpace: "pre-line",
                  letterSpacing: "1px",
                }}
              >
                {project.title}
              </h3>
            </div>
            <motion.div
              animate={{ rotate: hovered ? 45 : 0, scale: hovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center shrink-0 w-9 h-9 rounded-full"
              style={{ border: `1px solid ${project.color}50` }}
            >
              <ArrowUpRight style={{ width: 16, height: 16, color: project.color }} />
            </motion.div>
          </div>
          
          <p className="text-xs leading-relaxed flex-grow" style={{ color: "rgba(30,10,60,0.6)", letterSpacing: "0.02em" }}>
            {project.subtitle}
          </p>
          
          <div className="flex flex-wrap gap-1.5 mt-4 pt-4" style={{ borderTop: "1px solid rgba(124,58,237,0.08)" }}>
            {project.technologies.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[9px] px-2 py-1 uppercase font-mono"
                style={{
                  background: project.color + "10",
                  color: project.color,
                  letterSpacing: "0.05em",
                  border: `1px solid ${project.color}25`,
                }}
              >
                {t}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[9px] px-2 py-1 uppercase font-mono text-gray-400 border border-gray-200">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

/* ─── PROJECT DETAIL OVERLAY ─────────────────────────────────────────────── */

function ProjectDetail({ project, onClose, projects, onSelect }: {
  project: Project;
  onClose: () => void;
  projects: Project[];
  onSelect: (p: Project) => void;
}) {
  const currentIdx = projects.findIndex((p) => p.id === project.id);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onSelect(projects[(currentIdx + 1) % projects.length]);
      if (e.key === "ArrowLeft") onSelect(projects[(currentIdx - 1 + projects.length) % projects.length]);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onSelect, projects, currentIdx]);

  return (
    <motion.div
      key={project.id}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed inset-0 z-50 overflow-y-auto ${!isTouch ? "cursor-none" : ""}`}
      style={{ background: "#FAFAFA" }}
    >
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-10 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      {/* Top bar */}
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-12 py-5"
        style={{ borderBottom: `1px solid ${project.color}20`, backdropFilter: "blur(10px)", background: "rgba(250,250,250,0.9)" }}
      >
        <div className="flex items-center gap-6">
          <span
            className="font-black text-sm"
            style={{ color: project.color, fontFamily: "Courier New, monospace", letterSpacing: "0.2em" }}
          >
            {project.index} / {String(projects.length).padStart(2, "0")}
          </span>
          <span className="hidden sm:block text-xs uppercase" style={{ color: "rgba(30,10,60,0.5)", letterSpacing: "0.2em" }}>
            {project.category}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onSelect(projects[(currentIdx - 1 + projects.length) % projects.length])}
            className={`text-[10px] sm:text-xs px-3 py-1.5 transition-all ${!isTouch ? "cursor-none" : ""}`}
            style={{ border: `1px solid ${project.color}30`, color: project.color, letterSpacing: "0.1em", background: "none" }}
          >
            ← PREV
          </button>
          <button
            onClick={() => onSelect(projects[(currentIdx + 1) % projects.length])}
            className={`text-[10px] sm:text-xs px-3 py-1.5 transition-all ${!isTouch ? "cursor-none" : ""}`}
            style={{ border: `1px solid ${project.color}30`, color: project.color, letterSpacing: "0.1em", background: "none" }}
          >
            NEXT →
          </button>
          <Button
            onClick={onClose}
            className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 transition-all ml-2 ${!isTouch ? "cursor-none" : ""}`}
            style={{ border: `1px solid ${project.color}40`, color: project.color, background: "none" }}
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative px-6 md:px-12 pt-12 pb-8 overflow-hidden z-10">
        <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden" aria-hidden>
          <span
            className="font-black whitespace-nowrap leading-none"
            style={{
              fontSize: "clamp(8rem, 22vw, 22rem)",
              color: project.color,
              opacity: 0.04,
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "1px",
              transform: "translateX(-2%)",
            }}
          >
            {project.titleShort}
          </span>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Text Content */}
          <div className="order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[10px] sm:text-xs mb-4 uppercase font-mono"
              style={{ color: project.color, letterSpacing: "0.2em" }}
            >
              {project.year} — {project.subtitle}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="font-black leading-tight mb-6"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 6rem)",
                color: "#1E0A3C",
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "1px",
              }}
            >
              {project.title}
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6 origin-left w-full max-w-md"
              style={{ height: 1, background: `linear-gradient(to right, ${project.color}, transparent)` }}
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-sm sm:text-base leading-relaxed mb-8"
              style={{ color: "rgba(30,10,60,0.7)", fontWeight: 400, maxWidth: "50ch" }}
            >
              {project.longDescription}
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <p className="text-[10px] mb-3 font-mono" style={{ color: "rgba(30,10,60,0.4)", letterSpacing: "0.2em" }}>TECH STACK</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.04 }}
                    className="text-[10px] sm:text-xs px-3 py-1.5 font-mono uppercase"
                    style={{
                      background: "white",
                      border: `1px solid ${project.color}35`,
                      color: project.color,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Image Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="order-1 lg:order-2 w-full"
          >
            <div className="relative shadow-xl overflow-hidden" style={{ border: `1px solid ${project.color}25` }}>
              <img
                src={project.image}
                alt={project.title.replace("\n", " ")}
                className="w-full h-auto object-cover block"
                style={{ aspectRatio: "16/10" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feature Grids */}
      <div className="relative z-10 max-w-[1600px] mx-auto">
        {"keyFeatures" in project && project.keyFeatures && (
          <div className="px-6 md:px-12 py-10" style={{ borderTop: `1px solid ${project.color}15` }}>
            <p className="text-[10px] mb-6 font-mono" style={{ color: "rgba(30,10,60,0.4)", letterSpacing: "0.2em" }}>KEY FEATURES</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.keyFeatures.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="p-6 bg-white shadow-sm"
                  style={{ border: `1px solid ${project.color}15` }}
                >
                  <div className="mb-4" style={{ color: project.color }}>{getIcon(f.icon)}</div>
                  <p className="text-sm font-bold mb-2 font-mono uppercase" style={{ color: "#1E0A3C" }}>{f.title}</p>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(30,10,60,0.6)" }}>{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {"highlights" in project && project.highlights && (
          <div className="px-6 md:px-12 py-8" style={{ borderTop: `1px solid ${project.color}15` }}>
            <p className="text-[10px] mb-5 font-mono" style={{ color: "rgba(30,10,60,0.4)", letterSpacing: "0.2em" }}>HIGHLIGHTS</p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {project.highlights.map((h, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className="text-[10px] sm:text-xs px-4 py-2 font-mono uppercase bg-white shadow-sm"
                  style={{ border: `1px solid ${project.color}20`, color: project.color, letterSpacing: "0.05em" }}
                >
                  — {h}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {project.link && (
          <div className="px-6 md:px-12 py-12 mb-12" style={{ borderTop: `1px solid ${project.color}15` }}>
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={!isTouch ? { scale: 1.02 } : {}}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex items-center gap-4 px-8 py-4 font-black font-mono text-xs sm:text-sm group ${!isTouch ? "cursor-none" : ""}`}
              style={{
                background: project.color,
                color: "#ffffff",
                letterSpacing: "0.1em",
                boxShadow: `0 10px 40px ${project.color}40`,
              }}
            >
              VISIT LIVE SITE
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── CUSTOM CURSOR ──────────────────────────────────────────────────────── */

function CustomCursor({ activeColor }: { activeColor?: string }) {
  const isTouch = useIsTouchDevice();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 250, damping: 20 });
  const springY = useSpring(y, { stiffness: 250, damping: 20 });
  const lagX = useSpring(x, { stiffness: 100, damping: 25 });
  const lagY = useSpring(y, { stiffness: 100, damping: 25 });

  useEffect(() => {
    if (isTouch) return;
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, isTouch]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[100]"
        style={{
          width: 8, height: 8, borderRadius: "50%",
          background: activeColor || "#6D28D9",
          translateX: "-50%", translateY: "-50%",
          left: springX, top: springY,
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-[99]"
        style={{
          width: 32, height: 32, borderRadius: "50%",
          border: `1px solid ${activeColor || "rgba(109,40,217,0.4)"}`,
          translateX: "-50%", translateY: "-50%",
          left: lagX, top: lagY,
        }}
      />
    </>
  );
}

/* ─── MAIN EXPORT ────────────────────────────────────────────────────────── */

export default function WorkSection() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cursorColor, setCursorColor] = useState<string | undefined>();
  const isTouch = useIsTouchDevice();
  const ref = useRef(null);

  const categories = ["ALL", "WEB", "MOBILE"];

  const filteredProjects = useMemo(() => {
    if (activeCategory === "ALL") return PROJECTS;
    return PROJECTS.filter((p) => p.category.toUpperCase().includes(activeCategory));
  }, [activeCategory]);

  const openProject = useCallback((p: Project) => {
    setSelectedProject(p);
    document.body.style.overflow = "hidden";
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = "";
  }, []);

  // Keyboard navigation for categories
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedProject) return;
      if (e.key === "ArrowRight") {
        const idx = categories.indexOf(activeCategory);
        setActiveCategory(categories[(idx + 1) % categories.length]);
      } else if (e.key === "ArrowLeft") {
        const idx = categories.indexOf(activeCategory);
        setActiveCategory(categories[(idx - 1 + categories.length) % categories.length]);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeCategory, categories, selectedProject]);

  return (
    <section
      id="work"
      ref={ref}
      style={{ background: "#FAFAFA", minHeight: "100vh" }}
      className={!isTouch ? "cursor-none" : ""}
    >
      <CustomCursor activeColor={cursorColor} />
      <CursorSpotlight />

      {/* ── HEADER ── */}
      <div className="relative z-10 px-6 md:px-12 pt-20 pb-8 max-w-[1600px] mx-auto">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] sm:text-xs mb-4 font-mono uppercase"
          style={{ color: "rgba(109,40,217,0.5)", letterSpacing: "0.4em" }}
        >
          SELECTED WORK — {new Date().getFullYear()}
        </motion.p>

        {/* Headline */}
        <div className="overflow-hidden mb-1">
          <motion.h2
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-black leading-none"
            style={{ fontSize: "clamp(4rem, 12vw, 10rem)", color: "#1E0A3C", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "1px" }}
          >
            OUR
          </motion.h2>
        </div>
        <div className="overflow-hidden pl-2">
          <motion.h2
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-black leading-none"
            style={{
              fontSize: "clamp(4rem, 12vw, 10rem)",
              color: "transparent",
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
              WebkitTextStroke: "2px rgba(109,40,217,0.3)",
            }}
          >
            WORK
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mt-10"
        >
          <p className="text-sm sm:text-base max-w-md" style={{ color: "rgba(30,10,60,0.6)", lineHeight: 1.8, fontWeight: 400 }}>
            Crafted digital experiences from the ground up — each project a commitment to precision, performance, and scale.
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] sm:text-xs px-5 py-2.5 font-mono transition-all duration-300 uppercase ${!isTouch ? "cursor-none" : ""}`}
                style={{
                  border: `1px solid ${activeCategory === cat ? "rgba(109,40,217,0.8)" : "rgba(109,40,217,0.15)"}`,
                  color: activeCategory === cat ? "#1E0A3C" : "rgba(30,10,60,0.4)",
                  background: activeCategory === cat ? "rgba(109,40,217,0.05)" : "white",
                  letterSpacing: "0.15em",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── MARQUEE ── */}
      <Marquee items={["NEXT.JS", "REACT", "DJANGO", "PYTHON", "SUPABASE", "TAILWIND", "TYPESCRIPT", "AWS", "NODE.JS", "POSTGRESQL"]} />

      {/* ── GRID ── */}
      <div className="relative z-10 px-6 md:px-12 py-14 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="h-px flex-1 max-w-[100px] sm:max-w-xs" style={{ background: "rgba(109,40,217,0.1)" }} />
          <span className="mx-4 text-[9px] sm:text-[10px] font-mono uppercase" style={{ color: "rgba(109,40,217,0.4)", letterSpacing: "0.3em" }}>
            {String(filteredProjects.length).padStart(2, "0")} PROJECTS
          </span>
          <div className="h-px flex-1 max-w-[100px] sm:max-w-xs" style={{ background: "rgba(109,40,217,0.1)" }} />
        </div>

        {/* Adding items-stretch makes all divs share exact uniform height in the row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredProjects.map((project, i) => (
            <div
              key={project.id}
              className="flex w-full h-full"
              onMouseEnter={() => !isTouch && setCursorColor(project.color)}
              onMouseLeave={() => !isTouch && setCursorColor(undefined)}
            >
              <ProjectCard project={project} index={i} onClick={() => openProject(project)} />
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM RULE ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="px-6 md:px-12 pb-16 max-w-[1600px] mx-auto"
      >
        <div className="flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: "rgba(109,40,217,0.1)" }} />
          <span className="text-[8px] sm:text-[9px] font-mono uppercase text-center" style={{ color: "rgba(109,40,217,0.3)", letterSpacing: "0.3em" }}>
            CLICK TO EXPLORE {isTouch ? "" : "— ARROW KEYS TO NAVIGATE"}
          </span>
          <div className="h-px flex-1" style={{ background: "rgba(109,40,217,0.1)" }} />
        </div>
      </motion.div>

      {/* ── OVERLAY ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            key={selectedProject.id}
            project={selectedProject}
            onClose={closeProject}
            projects={filteredProjects}
            onSelect={(p) => setSelectedProject(p)}
          />
        )}
      </AnimatePresence>
    </section>
  );
} 