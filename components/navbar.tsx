"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Team", href: "#team" },
    { name: "Products", href: "/products" },
  ];

  // Update smoothScrollTo to handle "/" as a route navigation
  const smoothScrollTo = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.getElementById(href.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    } else {
      window.location.href = href;
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-purple-600 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <header
        className={cn(
          "fixed w-full z-40 transition-all duration-500",
          scrolled
            ? "bg-background/80 backdrop-blur-md pb-2 pt-4 shadow-md border-b border-border/20"
            : "bg-transparent py-4"
        )}
      >
        <div className="container relative flex items-center justify-between">
          {/* Logo Left */}
          <div className="flex items-center">
            <img
              src="/logo-bg.png"
              alt="Logo"
              className="h-16 w-auto object-contain cursor-pointer"
              onClick={() => smoothScrollTo("/")} // Optional: scroll to top
            />
          </div>

          {/* Hamburger Center (Always visible) */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Get Started Right */}
          <Button
            className="bg-gradient-to-r from-primary to-purple-600 text-black shadow hover:from-primary/90 hover:to-purple-600/90"
            onClick={() => smoothScrollTo("#contact")}
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu (Triggered by Hamburger) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background text-black flex"
          >
            {/* Left: Nav Links Centered in Half Screen */}
            <div className="w-1/2 flex items-center justify-center relative">
              {/* Close Button */}
              <Button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-black hover:text-primary transition"
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Nav Links */}
              <div className="flex flex-col space-y-6 text-center">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => smoothScrollTo(link.href)}
                      onMouseEnter={() => setHoveredLink(link.name)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="text-4xl font-bold hover:text-primary transition duration-300"
                    >
                      {link.name}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Image Preview */}
            <div className="w-1/2 relative overflow-hidden">
              <motion.img
                src="/logo.jpg"
                alt="Menu Preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
