"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { num: "01", name: "Home", href: "/" },
  { num: "02", name: "Services", href: "#services" },
  { num: "03", name: "Work", href: "#work" },
  { num: "04", name: "Team", href: "#team" },
  { num: "05", name: "Products", href: "/products" },
  { num: "06", name: "Blog", href: "/blog" },
];

const socials = [
  { label: "LinkedIn", href: "#" },
  { label: "Github", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
];

const tickerItems = [
  "Web Development",
  "UI / UX Design",
  "Mobile Apps",
  "AI & ML",
  "Custom Software",
  "Digital Strategy",
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const go = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      setTimeout(() => {
        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else {
      window.location.href = href;
    }
  };

  const repeated = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <>
      {/* Ticker bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-7 bg-white border-b border-black/10 overflow-hidden flex items-center">
        <div className="flex whitespace-nowrap animate-ticker">
          {[...repeated, ...repeated].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-5 px-6 text-[9px] tracking-[0.2em] uppercase text-black/60 font-medium"
            >
              {item}
              <span className="text-violet-600 text-[7px]">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main bar */}
      <header
        className={cn(
          "fixed top-7 left-0 right-0 z-40 h-[68px] flex items-center justify-between px-10 transition-all duration-300 bg-white",
          scrolled && !isOpen ? "border-b border-black/10" : "border-b border-transparent"
        )}
      >
        {/* Logo */}
        <button onClick={() => go("/")} className="flex items-center gap-3 group">
          <img
            src="/logo-bg.png"
            alt="Bridge Homies"
            className="h-10 w-auto object-contain"
          />
        </button>

        {/* Center status pill */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 border border-black/15 px-4 py-[6px]">
          <span className="w-[5px] h-[5px] rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] tracking-[0.12em] uppercase text-black/70 font-medium">
            Available for projects
          </span>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-[6px] p-2 group"
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "block h-px bg-black transition-all duration-500 origin-center",
              isOpen ? "w-6 translate-y-[3.5px] rotate-45" : "w-7"
            )}
          />
          <span
            className={cn(
              "block h-px bg-black transition-all duration-500 origin-center ml-auto",
              isOpen ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-5"
            )}
          />
        </button>
      </header>

      {/* Full overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: [0.77, 0, 0.18, 1] }}
            className="fixed inset-0 z-30 bg-white grid grid-cols-2 pt-[calc(28px+68px)]"
          >
            {/* Left — Nav links */}
            <div className="flex flex-col justify-between px-10 pb-12 border-r border-black/10">
              <nav className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    onClick={() => go(link.href)}
                    className={cn(
                      "group flex items-baseline gap-3 w-full text-left py-[14px]",
                      "border-t border-black/10 last:border-b last:border-black/10",
                      "hover:border-t-black/30 transition-colors duration-200"
                    )}
                  >
                    <span className="text-[10px] text-black/50 tracking-[0.1em] font-light min-w-[24px] tabular-nums group-hover:text-black/80 transition-colors">
                      {link.num}
                    </span>
                    <span
                      className="text-[48px] leading-none tracking-[0.02em] text-black/60 group-hover:text-black transition-colors duration-300"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {link.name}
                    </span>
                    <span className="ml-auto text-base text-black/60 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      ↗
                    </span>
                  </motion.button>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col gap-1"
              >
                <span className="text-[10px] tracking-[0.1em] uppercase text-black/60">
                  Bridge Homies Studio
                </span>
                <span className="text-[10px] tracking-[0.1em] uppercase text-black/50">
                  Lahore, Pakistan — Est. 2024
                </span>
              </motion.div>
            </div>

            {/* Right — Contact + CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex flex-col justify-between px-12 pb-12 bg-black/[0.02]"
            >
              <div className="flex flex-col gap-10 pt-6">
                {/* Email */}
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-black/60 mb-3 font-medium">
                    Get in touch
                  </p>
                  <a
                    href="mailto:info@bridgehomies.com"
                    className="text-[20px] font-light text-black/90 hover:text-black transition-colors duration-200 border-b border-black/20 pb-3 block tracking-[-0.02em]"
                  >
                    info@bridgehomies.com
                  </a>
                </div>

                {/* Socials */}
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-black/60 mb-3 font-medium">
                    Follow
                  </p>
                  <div className="flex flex-col gap-1">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="text-[11px] tracking-[0.12em] uppercase text-black/60 hover:text-black transition-colors duration-200 py-[3px]"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => go("#contact")}
                  className="w-full py-4 bg-violet-600 hover:bg-violet-700 transition-colors duration-200 flex items-center justify-between px-5 group"
                >
                  <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white">
                    Start a project
                  </span>
                  <span className="text-white text-sm group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </button>
                <span className="text-[10px] text-black/50 tracking-[0.06em]">
                  Usually respond within 24hrs
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}