"use client";

import { useState } from "react";
import Link from "next/link";

const TICKER_ITEMS = [
  "Web Development",
  "AI & Machine Learning",
  "Mobile Apps",
  "UI/UX Design",
  "Custom Software",
  "Digital Strategy",
];

const NAV_LEFT = [
  { label: "About Us", href: "/aboutus" },
  { label: "Careers", href: "", disabled: true },
  { label: "Our Team", href: "/#team" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Submit Blog", href: "/blog/submit" },
];

const NAV_RIGHT = [
  { label: "Web Dev", href: "/webdev" },
  { label: "Mobile Dev", href: "/mobile" },
  { label: "UI/UX", href: "/ui-ux-design" },
  { label: "Software", href: "/software" },
  { label: "AI & ML", href: "/ai-ml-development" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/bridge-homies" },
  { label: "Github", href: "https://github.com/Bridgehomies" },
  { label: "Instagram", href: "https://www.instagram.com/bridgehomies/" },
  { label: "Twitter", href: "https://x.com/BridgeHomies" },
];

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "loading" | "success" | "error">(null);

  const handleSubmit = async () => {
    if (!name.trim() || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/mgvyqeog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="bg-[#0e0e0e] text-white overflow-hidden">
      {/* Ticker */}
      <div className="border-b border-white/[0.08] overflow-hidden whitespace-nowrap py-3">
        <div className="inline-flex animate-ticker">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 px-8 text-[11px] tracking-[3px] uppercase text-white/20 font-normal"
            >
              {item}
              <span className="text-[8px] text-violet-500">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Col 1 — CTA */}
        <div className="flex flex-col justify-between p-10 gap-8 md:border-r md:border-white/[0.08]">
          <div>
            <p className="text-[10px] tracking-[3px] uppercase text-white/25 mb-7 font-normal">
              Got a project?
            </p>
            <h2 className="font-serif italic text-[34px] leading-[1.15] font-normal text-white">
              Let&apos;s build something{" "}
              <em className="text-violet-400 italic">remarkable</em>{" "}
              together.
            </h2>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 border border-white/25 text-white px-5 py-3 rounded-sm text-[12px] font-semibold tracking-[1.5px] uppercase w-fit transition-colors hover:border-violet-500 hover:bg-violet-500/10"
          >
            Start a project
            <span className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center text-[10px]">
              ↗
            </span>
          </Link>
        </div>

        {/* Col 2 — Nav */}
        <div className="flex flex-col justify-between p-10 border-t border-white/[0.08] md:border-t-0 md:border-r md:border-white/[0.08]">
          <div>
            <p className="text-[10px] tracking-[3px] uppercase text-white/25 mb-7 font-normal">
              Navigate
            </p>
            <div className="grid grid-cols-2 gap-x-6">
              <div className="flex flex-col">
                {NAV_LEFT.map((item) =>
                  item.disabled ? (
                    <span
                      key={item.label}
                      className="block text-[13px] font-light text-white/18 py-[6px] border-b border-white/[0.06] cursor-not-allowed"
                      title="Coming Soon"
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block text-[13px] font-light text-white/50 py-[6px] border-b border-white/[0.06] transition-colors hover:text-violet-400 hover:border-violet-400/20"
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>
              <div className="flex flex-col">
                {NAV_RIGHT.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block text-[13px] font-light text-white/50 py-[6px] border-b border-white/[0.06] transition-colors hover:text-violet-400 hover:border-violet-400/20"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-6 text-[11px] text-white/18 font-mono tracking-[0.5px]">
            Lahore, Pakistan — Since 2024
          </p>
        </div>

        {/* Col 3 — Newsletter */}
        <div className="flex flex-col justify-between p-10 border-t border-white/[0.08] md:border-t-0">
          <div>
            <p className="text-[10px] tracking-[3px] uppercase text-white/25 mb-5 font-normal">
              Stay updated
            </p>
            <h3 className="text-[22px] font-extrabold tracking-tight leading-[1.2] mb-5">
              Get insights <span className="text-violet-400">delivered.</span>
            </h3>

            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-4 py-[10px] text-[12px] text-white placeholder:text-white/20 outline-none focus:border-violet-500/40 transition-colors"
              />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-4 py-[10px] text-[12px] text-white placeholder:text-white/20 outline-none focus:border-violet-500/40 transition-colors"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="w-full mt-4 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white py-3 text-[12px] font-semibold tracking-[1.5px] uppercase rounded-sm transition-colors"
            >
              {status === "loading" ? "Sending..." : "Subscribe"}
            </button>

            {status === "success" && (
              <p className="text-[11px] text-emerald-400 mt-2">Subscribed!</p>
            )}
            {status === "error" && (
              <p className="text-[11px] text-red-400 mt-2">
                Please enter a valid name & email.
              </p>
            )}

            <p className="text-[10px] text-white/20 mt-3 leading-relaxed">
              By subscribing you agree to our Privacy Policy.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/[0.08]">
        <div className="flex items-center px-10 py-[18px] md:border-r md:border-white/[0.08]">
          <span className="text-[11px] text-white/18 tracking-[0.3px]">
            © {new Date().getFullYear()} Bridge Homies. All rights reserved.
          </span>
        </div>

        <div className="flex items-center justify-center px-10 py-[18px] border-t border-white/[0.08] md:border-t-0 md:border-r md:border-white/[0.08]">
          <span className="w-[7px] h-[7px] rounded-full bg-emerald-400 animate-pulse mr-2 shrink-0" />
          <span className="text-[11px] text-white/30 tracking-[0.5px]">
            Open for new projects
          </span>
        </div>

        <div className="flex items-center justify-end px-10 py-[18px] border-t border-white/[0.08] md:border-t-0">
          <div className="flex gap-[18px]">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-[10px] text-white/30 uppercase tracking-[2px] font-normal hover:text-violet-400 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}