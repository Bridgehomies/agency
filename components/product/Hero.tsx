'use client'

import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; r: number; dx: number; dy: number; alpha: number }[] = []
    for (let i = 0; i < 48; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.4 + 0.1,
      })
    }

    let animId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        .hero-root {
          font-family: 'DM Sans', sans-serif;
        }

        .hero-heading {
          font-family: 'Syne', sans-serif;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        @keyframes floatBlob {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-24px) scale(1.04); }
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @keyframes badgePop {
          0%   { opacity: 0; transform: scale(0.8) translateY(-8px); }
          70%  { transform: scale(1.06) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .anim-badge   { animation: badgePop 0.6s cubic-bezier(.34,1.56,.64,1) 0.1s both; }
        .anim-h1      { animation: fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.3s both; }
        .anim-sub     { animation: fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.5s both; }
        .anim-cta     { animation: fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.7s both; }
        .anim-stats   { animation: fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.9s both; }

        .shimmer-text {
          background: linear-gradient(
            90deg,
            #a855f7 0%,
            #c084fc 30%,
            #e879f9 50%,
            #c084fc 70%,
            #a855f7 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .blob1 {
          animation: floatBlob 7s ease-in-out infinite;
        }
        .blob2 {
          animation: floatBlob 9s ease-in-out 1.5s infinite;
        }
        .blob3 {
          animation: floatBlob 11s ease-in-out 3s infinite;
        }

        .ring-spin {
          animation: spinSlow 18s linear infinite;
        }

        .cta-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%);
          pointer-events: none;
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 48px -8px rgba(168,85,247,0.55);
        }
        .cta-btn:active {
          transform: translateY(0);
        }

        .grid-line {
          stroke: rgba(168,85,247,0.08);
        }

        .stat-card {
          backdrop-filter: blur(12px);
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(168,85,247,0.15);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 32px -4px rgba(168,85,247,0.2);
        }

        .badge-glow {
          box-shadow: 0 0 0 4px rgba(168,85,247,0.08), 0 2px 12px rgba(168,85,247,0.18);
        }

        .diagonal-stripe {
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 6px,
            rgba(168,85,247,0.04) 6px,
            rgba(168,85,247,0.04) 12px
          );
        }
      `}</style>

      <section className="hero-root relative min-h-screen bg-gradient-to-br from-fuchsia-50 via-white to-purple-50 flex items-center pt-16 overflow-hidden">

        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        />

        {/* Diagonal stripe texture */}
        <div className="diagonal-stripe absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />

        {/* SVG grid */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" style={{ zIndex: 0 }}>
          <defs>
            <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" className="grid-line" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Blobs */}
        <div className="absolute pointer-events-none" style={{ zIndex: 0 }}>
          <div className="blob1 absolute top-16 -left-32 w-[520px] h-[520px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,121,249,0.22) 0%, transparent 70%)' }} />
          <div className="blob2 absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)' }} />
          <div className="blob3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(192,132,252,0.10) 0%, transparent 70%)' }} />
        </div>

        {/* Decorative spinning ring */}
        <div className="ring-spin absolute -right-40 top-1/2 -translate-y-1/2 pointer-events-none" style={{ zIndex: 0 }}>
          <svg width="640" height="640" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="320" cy="320" r="300" stroke="url(#ringGrad)" strokeWidth="1.5" strokeDasharray="12 20" />
            <circle cx="320" cy="320" r="240" stroke="rgba(168,85,247,0.10)" strokeWidth="1" strokeDasharray="6 30" />
            <defs>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="640" y2="640" gradientUnits="userSpaceOnUse">
                <stop stopColor="#e879f9" stopOpacity="0.4" />
                <stop offset="0.5" stopColor="#a855f7" stopOpacity="0.15" />
                <stop offset="1" stopColor="#e879f9" stopOpacity="0.0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Main content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full" style={{ zIndex: 1 }}>
          <div className="text-center">

            {/* Badge */}
            <div className="anim-badge flex justify-center mb-8">
              <div className="badge-glow inline-flex items-center gap-2 bg-white/80 border border-purple-200 text-purple-700 px-5 py-2 rounded-full text-sm font-medium">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-fuchsia-400 to-purple-600">
                  <Sparkles className="w-3 h-3 text-white" />
                </span>
                ERP Software with FBR Integration Now Live!
                <span className="ml-1 inline-block w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
              </div>
            </div>

            {/* Heading */}
            <h1 className="hero-heading anim-h1 text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.08] tracking-tight mb-6">
              Innovative Software
              <br />
              <span className="relative inline-block">
                <span className="shimmer-text">Solutions</span>
                {/* Underline accent */}
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 400 8" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 6 Q100 0 200 5 Q300 10 400 4" stroke="url(#underlineGrad)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="underlineGrad" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#e879f9" />
                      <stop offset="1" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              {' '}for
              <br className="hidden md:block" />
              <span className="text-gray-900"> Modern Businesses</span>
            </h1>

            {/* Subheading */}
            <p className="anim-sub text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
              We build next-generation software to{' '}
              <span className="text-gray-700 font-medium">automate workflows</span>,{' '}
              <span className="text-gray-700 font-medium">enhance visibility</span>, and drive real growth
              across <span className="text-gray-700 font-medium">Pakistan and beyond</span>.
            </p>

            {/* CTA */}
            <div className="anim-cta flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
              <a href="#products">
                <button className="cta-btn inline-flex items-center gap-2.5 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-base font-semibold shadow-lg shadow-purple-300/40 group">
                  Explore Products
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </a>
              <a href="#contact">
                <button className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur border border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-4 rounded-2xl text-base font-semibold transition-colors duration-200">
                  Talk to Us
                </button>
              </a>
            </div>

            {/* Stats row */}
            <div className="anim-stats flex flex-wrap justify-center gap-4 md:gap-6">
              {[
                { value: '500+', label: 'Businesses Served' },
                { value: '99.9%', label: 'Uptime SLA' },
                { value: 'FBR', label: 'Certified Integration' },
                { value: '24/7', label: 'Dedicated Support' },
              ].map((stat) => (
                <div key={stat.label} className="stat-card flex flex-col items-center px-7 py-4 rounded-2xl min-w-[120px]">
                  <span
                    className="hero-heading text-2xl font-extrabold"
                    style={{
                      background: 'linear-gradient(135deg, #d946ef, #9333ea)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs text-gray-500 mt-0.5 font-medium tracking-wide uppercase">{stat.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}