"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Smartphone, Globe, Layers, Rocket, Sparkles, ArrowUpRight } from "lucide-react"
import Link from "next/link"

const services = [
  {
    num: "01", icon: Code, name: "Web Dev",
    desc: "Blazing-fast web apps built with React, Next.js and Node. From idea to production.",
    tags: ["Next.js", "React", "Node", "APIs"],
    skills: [["React / Next", 95], ["Node / Express", 90], ["UI Engineering", 85]] as [string, number][],
    span: "lg:col-span-5", tall: false,
    href: "/webdev"
  },
  {
    num: "02", icon: Smartphone, name: "Mobile",
    desc: "Native & cross-platform apps that feel genuinely at home on every device.",
    tags: ["React Native", "Swift", "Flutter"],
    skills: [["React Native", 92], ["SwiftUI", 88], ["Flutter", 85]] as [string, number][],
    span: "lg:col-span-4", tall: false,
    href: "/mobile"
  },
  {
    num: "03", icon: Globe, name: "UI/UX",
    desc: "Research-driven design that converts. Every pixel earns its place.",
    tags: ["Research", "Figma", "Systems", "Motion"],
    skills: [["User Research", 90], ["Prototyping", 95], ["Visual Design", 92]] as [string, number][],
    span: "lg:col-span-3 lg:row-span-2", tall: true,
    href: "/ui-ux-design"
  },
  {
    num: "04", icon: Layers, name: "Software",
    desc: "Custom enterprise solutions engineered for your exact scale and logic.",
    tags: ["Cloud", "Enterprise", "DB"],
    skills: [["Architecture", 90], ["Cloud", 88], ["DB Design", 85]] as [string, number][],
    span: "lg:col-span-4", tall: false,
    href: "/software"
  },
  {
    num: "05", icon: Rocket, name: "Strategy",
    desc: "Roadmaps and transformation plans that cut through noise and move fast.",
    tags: ["Consulting", "Roadmaps", "GTM"],
    skills: [["Market Analysis", 92], ["Transformation", 88], ["Growth", 90]] as [string, number][],
    span: "lg:col-span-5", tall: false,
    href: "#contact" // Added a default routing for Strategy
  },
  {
    num: "06", icon: Sparkles, name: "AI & ML",
    desc: "End-to-end ML engineering. Turn raw data into your sharpest competitive edge.",
    tags: ["LLMs", "Vision", "NLP", "MLOps"],
    skills: [["Machine Learning", 94], ["NLP", 90], ["Computer Vision", 88]] as [string, number][],
    span: "lg:col-span-3", tall: false,
    href: "/ai-ml-development"
  },
]

function ServiceCard({
  service, isActive, onToggle,
}: {
  service: typeof services[0]
  isActive: boolean
  onToggle: () => void
}) {
  const Icon = service.icon
  const cardRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
  }

  return (
    <div
      ref={cardRef}
      onClick={onToggle}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-sm border cursor-pointer select-none transition-all duration-300 flex flex-col p-5 sm:p-6 min-h-[180px] sm:min-h-[200px] h-full
        ${service.tall ? "lg:min-h-[408px]" : ""}
        ${isActive ? "bg-purple-500 border-purple-500" : " border-[#151515] hover:border-[#252525]"}`}
    >
      {!isActive && (
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(168,85,247,0.09) 0%, transparent 60%)` }} />
      )}

      <span className={`absolute top-4 right-5 font-black leading-none select-none pointer-events-none text-[clamp(28px,4vw,44px)] ${isActive ? "text-white/10" : "text-[#151515]"}`}
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        {service.num}
      </span>

      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 flex-shrink-0 border transition-all duration-300
        ${isActive ? "bg-white/15 text-white border-white/20" : "bg- text-[#444] border-[#1f1f1f]"}`}>
        <Icon size={16} />
      </div>

      <p className={`font-mono text-[10px] tracking-widest uppercase mb-2 transition-colors duration-300 ${isActive ? "text-white/40" : "text-[#2a2a2a]"}`}>
        {service.num} / 06
      </p>

      <h3 className={`leading-none mb-2.5 transition-colors duration-300 text-[clamp(20px,2.5vw,26px)] ${isActive ? "text-white" : "text-[#e0e0e0]"}`}
        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "1px" }}>
        {service.name}
      </h3>

      <p className={`text-[11px] sm:text-[12px] leading-relaxed mb-3 transition-colors duration-300 ${isActive ? "text-white/65" : "text-[#3a3a3a]"}`}>
        {service.desc}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {service.tags.map(tag => (
          <span key={tag} className={`font-mono text-[10px] px-2 py-1 rounded-[2px] border tracking-tight transition-all duration-300
            ${isActive ? "bg-white/12 text-white/60 border-white/15" : " text-[#2d2d2d] border-[#1d1d1d]"}`}>
            {tag}
          </span>
        ))}
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-auto space-y-2.5 overflow-hidden flex flex-col"
          >
            {service.skills.map(([label, val], si) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className="font-mono text-[9px] text-white/50 uppercase tracking-widest w-20 sm:w-24 flex-shrink-0">{label}</span>
                <div className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${val}%` }}
                    transition={{ duration: 0.9, delay: si * 0.1, ease: [0.16, 1, 0.3, 1] }} />
                </div>
                <span className="font-mono text-[9px] text-white/70 w-7 text-right">{val}%</span>
              </div>
            ))}

            {/* Added Link Button */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="pt-3"
            >
              <Link 
                href={service.href} 
                onClick={(e) => e.stopPropagation()} 
                className="inline-flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-[2px] font-mono text-[10px] uppercase tracking-widest hover:bg-white/90 transition-colors w-max"
              >
                <span>View {service.name} Page</span>
                <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ServicesSection() {
  const [active, setActive] = useState<number | null>(null)
  const toggle = (i: number) => setActive(active === i ? null : i)

  useEffect(() => {
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;700&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
  }, [])

  return (
    <section className="min-h-screen px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-12">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-4 mb-8 sm:mb-10 lg:mb-12">
        <div>
          <p className="font-mono text-[11px] text-[#333] tracking-[.2em] uppercase mb-3">Expertise</p>
          <h2 className="leading-[.9] text-back/80"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px, 7vw, 96px)", letterSpacing: "2px" }}>
            What<br />We <span className="text-purple-500">Build</span>
          </h2>
          <div className="flex items-center gap-2 mt-4 border border-[#1f1f1f] rounded-full px-4 py-2 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse flex-shrink-0" />
            <span className="font-mono text-[10px] sm:text-[11px] text-[#444]">6 active disciplines — tap to inspect</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="leading-none text-[#111] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px, 7vw, 72px)", WebkitTextStroke: "1px #222", letterSpacing: "-2px" }}>
            06
          </div>
          <p className="font-mono text-[11px] text-[#333] tracking-[.15em] uppercase mt-1">Services</p>
        </div>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-[2px] mb-[2px]">
        {services.map((s, i) => (
          <div key={i} className={s.span}>
            <ServiceCard service={s} isActive={active === i} onToggle={() => toggle(i)} />
          </div>
        ))}
      </div>

      {/* Bottom strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px]">
        <div className="border border-[#151515] rounded-sm flex items-center px-5 sm:px-7 py-5">
          <span className="font-mono text-[10px] sm:text-[11px] text-[#2a2a2a] tracking-widest uppercase">
            <Link href="https://www.iso.org/standard/81230.html" target="_blank" className="text-purple-500 underline">ISO/IEC 42001 AI Management System</Link> best practices
          </span>
        </div>
        <div className="bg-purple-500 hover:bg-purple-600 transition-colors duration-300 rounded-sm flex items-center justify-between px-5 sm:px-7 py-5 cursor-pointer group">
          <span className="text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(18px, 2.5vw, 22px)", letterSpacing: "1px" }}>
            Start a project
          </span>
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-purple-500 group-hover:rotate-45 transition-transform duration-300 flex-shrink-0">
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </section>
  )
}