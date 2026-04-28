"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ─── Glitch text hook ────────────────────────────────────────────────────────
function useGlitch(text: string, active: boolean) {
  const [display, setDisplay] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#@$%&ABCDEFabcdef0123456789";
  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    let frame = 0;
    const id = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((c, i) =>
            frame / 2 > i ? c : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("")
      );
      frame++;
      if (frame > text.length * 2) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [active, text]);
  return display;
}

// ─── Terminal lines ───────────────────────────────────────────────────────────
const TERMINAL_LINES = [
  { delay: 0,    text: "$ curl https://bridgehomies.com/[path]", color: "#a3e635" },
  { delay: 600,  text: "> Initializing request...",              color: "#94a3b8" },
  { delay: 1100, text: "> Scanning route registry...",           color: "#94a3b8" },
  { delay: 1700, text: "> Running AI path resolver...",          color: "#94a3b8" },
  { delay: 2300, text: "ERROR: Route not found in manifest",     color: "#f87171" },
  { delay: 2700, text: "STATUS: 404 — Page does not exist",      color: "#fb923c" },
  { delay: 3200, text: "SUGGEST: Navigate to /home",             color: "#60a5fa" },
];

// ─── Nav links from sitemap ────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",        href: "/" },
  { label: "AI/ML",       href: "/ai-ml-development" },
  { label: "Web Dev",     href: "/webdev" },
  { label: "Mobile",      href: "/mobile" },
  { label: "Software",    href: "/software" },
  { label: "UI/UX",       href: "/ui-ux-design" },
  { label: "Blog",        href: "/blog" },
  { label: "About Us",    href: "/aboutus" },
];

export default function NotFound() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [cursorBlink, setCursorBlink] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glitchedCode = useGlitch("404", glitchActive);

  // ── trigger glitch on mount + interval ──────────────────────────────────
  useEffect(() => {
    setGlitchActive(true);
    const t = setTimeout(() => setGlitchActive(false), 1200);
    const loop = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 800);
    }, 5000);
    return () => { clearTimeout(t); clearInterval(loop); };
  }, []);

  // ── terminal line reveals ────────────────────────────────────────────────
  useEffect(() => {
    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines((p) => [...p, i]), line.delay);
    });
  }, []);

  // ── cursor blink ─────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setCursorBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  // ── matrix rain canvas ───────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(1);
    const chars = "01アイウエオカキ<>/{}[]#@$";
    let raf: number;
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(163,230,53,0.15)";
      ctx.font = "14px monospace";
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:        #050810;
          --surface:   #0d1117;
          --border:    #1e2d3d;
          --accent:    #a3e635;
          --accent2:   #60a5fa;
          --accent3:   #f87171;
          --text:      #e2e8f0;
          --muted:     #64748b;
          --mono:      'Space Mono', monospace;
          --sans:      'Syne', sans-serif;
        }

        html, body { height: 100%; background: var(--bg); color: var(--text); }

        .nf-root {
          min-height: 100svh;
          font-family: var(--sans);
          background: var(--bg);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* ── matrix canvas ── */
        .nf-canvas {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          pointer-events: none; z-index: 0;
          opacity: 0.6;
        }

        /* ── scan line overlay ── */
        .nf-scan {
          position: fixed; inset: 0; pointer-events: none; z-index: 1;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.03) 2px,
            rgba(0,0,0,0.03) 4px
          );
        }

        /* ── header ── */
        .nf-header {
          position: relative; z-index: 10;
          padding: 1.5rem 2.5rem;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid var(--border);
          background: rgba(5,8,16,0.85);
          backdrop-filter: blur(8px);
        }
        .nf-logo {
          font-family: var(--sans); font-weight: 800; font-size: 1.15rem;
          color: var(--text); text-decoration: none; letter-spacing: -0.02em;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .nf-logo-dot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; }
        .nf-status-badge {
          font-family: var(--mono); font-size: 0.7rem;
          color: var(--accent3); background: rgba(248,113,113,0.1);
          border: 1px solid rgba(248,113,113,0.3);
          padding: 0.3rem 0.75rem; border-radius: 4px;
          letter-spacing: 0.05em;
          animation: pulse-badge 2s infinite;
        }
        @keyframes pulse-badge {
          0%,100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        /* ── main content ── */
        .nf-main {
          position: relative; z-index: 10;
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          align-items: center;
        }

        /* ── left panel ── */
        .nf-left {
          padding: 4rem 3rem 4rem 5vw;
          display: flex; flex-direction: column; gap: 2rem;
        }

        .nf-eyebrow {
          font-family: var(--mono); font-size: 0.72rem;
          color: var(--accent); letter-spacing: 0.18em;
          text-transform: uppercase;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .nf-eyebrow::before {
          content: '';
          display: block; width: 28px; height: 1px;
          background: var(--accent);
        }

        .nf-big-code {
          font-family: var(--mono);
          font-size: clamp(6rem, 14vw, 11rem);
          font-weight: 700;
          line-height: 1;
          color: var(--text);
          position: relative;
          display: inline-block;
          text-shadow:
            0 0 40px rgba(163,230,53,0.2),
            0 0 80px rgba(163,230,53,0.1);
          letter-spacing: -0.04em;
        }

        .nf-big-code.glitch {
          animation: glitch-skew 0.3s steps(2) forwards;
        }
        .nf-big-code::before,
        .nf-big-code::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
        }
        .nf-big-code::before {
          color: var(--accent2);
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
          transform: translate(-4px, 2px);
          opacity: 0;
          animation: glitch-before 5s infinite;
        }
        .nf-big-code::after {
          color: var(--accent3);
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
          transform: translate(4px, -2px);
          opacity: 0;
          animation: glitch-after 5s infinite;
        }
        @keyframes glitch-before {
          0%,94%,100% { opacity: 0; transform: translate(-4px, 2px); }
          95%,99% { opacity: 0.7; transform: translate(-8px, 2px); }
        }
        @keyframes glitch-after {
          0%,94%,100% { opacity: 0; transform: translate(4px, -2px); }
          96%,100% { opacity: 0.7; transform: translate(8px, -2px); }
        }
        @keyframes glitch-skew {
          0% { transform: skewX(0deg); }
          25% { transform: skewX(-4deg); }
          50% { transform: skewX(3deg); }
          75% { transform: skewX(-2deg); }
          100% { transform: skewX(0deg); }
        }

        .nf-headline {
          font-family: var(--sans); font-weight: 800;
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          line-height: 1.15; letter-spacing: -0.03em;
          color: var(--text);
        }
        .nf-headline span { color: var(--accent); }

        .nf-desc {
          font-family: var(--mono); font-size: 0.82rem;
          color: var(--muted); line-height: 1.7;
          max-width: 420px;
        }

        /* ── CTA buttons ── */
        .nf-ctas { display: flex; gap: 1rem; flex-wrap: wrap; }

        .nf-btn-primary {
          font-family: var(--mono); font-size: 0.78rem; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase; text-decoration: none;
          color: var(--bg);
          background: var(--accent);
          border: 1px solid var(--accent);
          padding: 0.75rem 1.75rem;
          border-radius: 4px;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
          display: inline-flex; align-items: center; gap: 0.5rem;
        }
        .nf-btn-primary:hover {
          background: #bef264;
          box-shadow: 0 0 24px rgba(163,230,53,0.4);
          transform: translateY(-2px);
        }

        .nf-btn-ghost {
          font-family: var(--mono); font-size: 0.78rem;
          letter-spacing: 0.06em; text-transform: uppercase; text-decoration: none;
          color: var(--accent2);
          background: transparent;
          border: 1px solid rgba(96,165,250,0.35);
          padding: 0.75rem 1.75rem;
          border-radius: 4px;
          transition: border-color 0.2s, background 0.2s, transform 0.15s;
          display: inline-flex; align-items: center; gap: 0.5rem;
        }
        .nf-btn-ghost:hover {
          border-color: var(--accent2);
          background: rgba(96,165,250,0.08);
          transform: translateY(-2px);
        }

        /* ── right panel ── */
        .nf-right {
          padding: 4rem 5vw 4rem 3rem;
          display: flex; flex-direction: column; gap: 2rem;
          border-left: 1px solid var(--border);
          height: 100%;
          justify-content: center;
        }

        /* ── terminal ── */
        .nf-terminal {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          font-family: var(--mono);
        }
        .nf-terminal-header {
          background: #161b22;
          padding: 0.65rem 1rem;
          display: flex; align-items: center; gap: 0.5rem;
          border-bottom: 1px solid var(--border);
        }
        .nf-dot { width: 10px; height: 10px; border-radius: 50%; }
        .nf-dot-r { background: #f87171; }
        .nf-dot-y { background: #fbbf24; }
        .nf-dot-g { background: #a3e635; }
        .nf-terminal-title {
          margin-left: auto; font-size: 0.65rem;
          color: var(--muted); letter-spacing: 0.08em;
        }
        .nf-terminal-body {
          padding: 1.25rem 1.25rem 1.5rem;
          display: flex; flex-direction: column; gap: 0.4rem;
          min-height: 220px;
        }
        .nf-line {
          font-size: 0.72rem; line-height: 1.5;
          opacity: 0;
          animation: line-in 0.3s forwards;
        }
        @keyframes line-in { to { opacity: 1; } }
        .nf-cursor {
          font-size: 0.72rem; color: var(--accent);
          animation: none;
        }

        /* ── quick links ── */
        .nf-links-label {
          font-family: var(--mono); font-size: 0.65rem;
          color: var(--muted); letter-spacing: 0.15em; text-transform: uppercase;
          margin-bottom: 0.25rem;
        }
        .nf-links-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }
        .nf-link-item {
          text-decoration: none;
          font-family: var(--mono); font-size: 0.72rem;
          color: var(--muted);
          padding: 0.55rem 0.85rem;
          border: 1px solid var(--border);
          border-radius: 4px;
          display: flex; align-items: center; gap: 0.5rem;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .nf-link-item:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: rgba(163,230,53,0.05);
        }
        .nf-link-arrow { opacity: 0.4; font-size: 0.65rem; margin-left: auto; }

        /* ── footer ── */
        .nf-footer {
          position: relative; z-index: 10;
          padding: 1rem 2.5rem;
          border-top: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(5,8,16,0.85);
          backdrop-filter: blur(8px);
          font-family: var(--mono); font-size: 0.65rem; color: var(--muted);
        }
        .nf-footer-right { display: flex; gap: 1.5rem; }
        .nf-footer a { color: var(--muted); text-decoration: none; }
        .nf-footer a:hover { color: var(--accent); }

        /* ── responsive ── */
        @media (max-width: 768px) {
          .nf-main { grid-template-columns: 1fr; }
          .nf-right { border-left: none; border-top: 1px solid var(--border); padding: 2rem 1.5rem; }
          .nf-left { padding: 2.5rem 1.5rem; }
          .nf-header { padding: 1rem 1.5rem; }
          .nf-footer { padding: 0.75rem 1.5rem; flex-direction: column; gap: 0.5rem; text-align: center; }
        }
      `}</style>

      <div className="nf-root">
        {/* Matrix rain background */}
        <canvas ref={canvasRef} className="nf-canvas" />

        {/* Scanlines */}
        <div className="nf-scan" />

        {/* Header */}
        <header className="nf-header">
          <Link href="/" className="nf-logo">
            <span className="nf-logo-dot" />
            Bridge Homies
          </Link>
          <div className="nf-status-badge">⚠ STATUS 404</div>
        </header>

        {/* Main */}
        <main className="nf-main">
          {/* Left */}
          <div className="nf-left">
            <div className="nf-eyebrow">Error Code</div>

            <div
              className={`nf-big-code${glitchActive ? " glitch" : ""}`}
              data-text={glitchedCode}
            >
              {glitchedCode}
            </div>

            <h1 className="nf-headline">
              This route<br />
              <span>doesn&apos;t exist</span><br />
              in our stack.
            </h1>

            <p className="nf-desc">
              The page you requested was not found in our routing manifest.
              It may have been moved, deleted, or never deployed.
              Our AI resolver tried — and failed gracefully.
            </p>

            <div className="nf-ctas">
              <Link href="/" className="nf-btn-primary">
                ← Return Home
              </Link>
              <Link href="/ai-ml-development" className="nf-btn-ghost">
                Explore AI/ML ↗
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="nf-right">
            {/* Terminal */}
            <div className="nf-terminal">
              <div className="nf-terminal-header">
                <div className="nf-dot nf-dot-r" />
                <div className="nf-dot nf-dot-y" />
                <div className="nf-dot nf-dot-g" />
                <span className="nf-terminal-title">bridge-homies — zsh</span>
              </div>
              <div className="nf-terminal-body">
                {TERMINAL_LINES.map((line, i) =>
                  visibleLines.includes(i) ? (
                    <div
                      key={i}
                      className="nf-line"
                      style={{ color: line.color }}
                    >
                      {line.text}
                    </div>
                  ) : null
                )}
                <div className="nf-cursor">
                  {cursorBlink ? "█" : " "}
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <div className="nf-links-label">// Suggested routes</div>
              <div className="nf-links-grid">
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} className="nf-link-item">
                    {link.label}
                    <span className="nf-link-arrow">↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="nf-footer">
          <span>© 2026 Bridge Homies · Lahore, Pakistan</span>
          <div className="nf-footer-right">
            <Link href="/terms">Terms</Link>
            <Link href="/aboutus">About</Link>
            <Link href="/#contact">Contact</Link>
          </div>
        </footer>
      </div>
    </>
  );
}