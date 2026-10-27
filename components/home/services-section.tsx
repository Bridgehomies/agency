"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion"
import { Code, Smartphone, Globe, Layers, Rocket, Sparkles, ArrowUpRight } from "lucide-react"
import Link from "next/link"

const services = [
  {
    num: "01", icon: Code, name: "Web Applications",
    desc: "Business websites, custom web apps, SaaS platforms, portals, e-commerce, marketplaces, and API-driven systems.",
    tags: ["Web Apps", "SaaS", "Portals", "Marketplaces"],
    focusAreas: ["Custom web applications", "Customer and vendor portals", "E-commerce and marketplaces"],
    span: "lg:col-span-5", tall: false,
    href: "/webdev"
  },
  {
    num: "02", icon: Smartphone, name: "Mobile Apps",
    desc: "Android, iOS, and cross-platform apps for customers, employees, field teams, delivery, booking, commerce, and community.",
    tags: ["Android", "iOS", "React Native", "Flutter"],
    focusAreas: ["Customer and employee applications", "Delivery and booking workflows", "App maintenance and upgrades"],
    span: "lg:col-span-4", tall: false,
    href: "/mobile"
  },
  {
    num: "03", icon: Globe, name: "UI/UX & Product Design",
    desc: "Product design for software, including user flows, wireframes, web and mobile interfaces, prototypes, and design systems.",
    tags: ["User Flows", "Wireframes", "Prototypes", "Design Systems"],
    focusAreas: ["SaaS dashboards and admin panels", "Responsive interface design", "Product redesign and usability improvements"],
    span: "lg:col-span-3 lg:row-span-2", tall: true,
    href: "/ui-ux-design"
  },
  {
    num: "04", icon: Layers, name: "Custom Software",
    desc: "Business systems, SaaS products, workflow automation, APIs, integrations, cloud deployment, and ongoing maintenance.",
    tags: ["ERP & CRM", "Automation", "APIs", "Cloud & DevOps"],
    focusAreas: ["Business and operations software", "Workflow automation and system integrations", "Deployment, support, and maintenance"],
    span: "lg:col-span-4", tall: false,
    href: "/software"
  },
  {
    num: "05", icon: Rocket, name: "Technical Consulting",
    desc: "Technical assessment, AI feasibility, software architecture, technology selection, legacy modernization, and technical roadmaps.",
    tags: ["Technical Assessment", "Architecture", "AI Feasibility", "Roadmaps"],
    focusAreas: ["MVP technical planning and estimation", "Code and architecture review", "Technology and implementation guidance"],
    span: "lg:col-span-5", tall: false,
    href: "/software#services"
  },
  {
    num: "06", icon: Sparkles, name: "AI & ML Engineering",
    desc: "AI/ML engineering, generative AI, LLM integration, RAG applications, AI agents, computer vision, and MLOps.",
    tags: ["LLMs", "RAG", "AI Agents", "MLOps"],
    focusAreas: ["RAG and knowledge-base systems", "AI workflow automation and document processing", "Model deployment and MLOps"],
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
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)
  const spotlight = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(168,85,247,0.09) 0%, transparent 60%)`

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100)
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100)
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
          style={{ background: spotlight }} />
      )}

      <span className={`absolute top-4 right-5 font-black leading-none select-none pointer-events-none text-[clamp(28px,4vw,44px)] ${isActive ? "text-white/10" : "text-[#151515]"}`}
        style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
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
        style={{ fontFamily: "var(--font-bebas), sans-serif", letterSpacing: "1px" }}>
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
            <ul className="flex flex-wrap gap-2">
              {service.focusAreas.map((area) => (
                <li key={area} className="rounded-sm border border-white/20 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wide text-white/70">
                  {area}
                </li>
              ))}
            </ul>

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

  return (
    <section className="min-h-screen px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-12">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-4 mb-8 sm:mb-10 lg:mb-12">
        <div>
          <p className="font-mono text-[11px] text-[#333] tracking-[.2em] uppercase mb-3">Expertise</p>
          <h2 className="leading-[.9] text-back/80"
            style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(44px, 7vw, 96px)", letterSpacing: "2px" }}>
            What<br />We <span className="text-purple-500">Build</span>
          </h2>
          <div className="flex items-center gap-2 mt-4 border border-[#1f1f1f] rounded-full px-4 py-2 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse flex-shrink-0" />
            <span className="font-mono text-[10px] sm:text-[11px] text-[#444]">Explore software engineering services</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="leading-none text-[#111] select-none"
            style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(44px, 7vw, 72px)", WebkitTextStroke: "1px #222", letterSpacing: "-2px" }}>
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
          <span className="text-white" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(18px, 2.5vw, 22px)", letterSpacing: "1px" }}>
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
