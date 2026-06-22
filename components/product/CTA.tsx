"use client";

import React, { useState } from 'react';
import { ArrowRight, Star, Mail, MessageSquare, Globe, X, Mailbox, Building2 } from 'lucide-react';

export default function SleekCTA() {
  const [activeModal, setActiveModal] = useState<'sales' | 'trial' | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <section className="bg-[#0b0f19] py-24 sm:py-32 px-6 relative overflow-hidden font-sans antialiased">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Minimalist Trust Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800/80 mb-8">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <span className="text-xs font-medium text-zinc-400 tracking-wide uppercase">
            Rated 4.9/5 by 50+ enterprises
          </span>
        </div>

        {/* Razor-Sharp Typography */}
        <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight max-w-2xl mx-auto leading-[1.15] mb-6">
          The infrastructure your business operations deserve.
        </h2>

        {/* Muted paragraph */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-10">
          Join thousands of fast-growing companies using our platform to automate workflows, eliminate bottlenecks, and scale predictably.
        </p>

        {/* Clean Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button 
            onClick={() => setActiveModal('trial')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-zinc-950 font-medium text-sm px-6 py-3.5 rounded-lg hover:bg-zinc-100 transition-colors group shadow-sm"
          >
            <span>Start your free trial</span>
            <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-950 group-hover:translate-x-0.5 transition-all" />
          </button>
          
          <button 
            onClick={() => setActiveModal('sales')}
            className="w-full sm:w-auto inline-flex items-center justify-center text-sm font-medium text-zinc-300 hover:text-white px-6 py-3.5 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 transition-colors"
          >
            Talk to sales
          </button>
        </div>

        <p className="mt-6 text-xs text-zinc-500">
          No credit card required. Cancel anytime.
        </p>
      </div>

      {/* --- MODAL OVERLAY BACKDROP --- */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={closeModal}
        >
          {/* Modal Container */}
          <div 
            className="relative w-full max-w-md overflow-hidden rounded-xl bg-zinc-950 border border-zinc-800 p-6 shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* --- CASE 1: TALK TO SALES MODAL --- */}
            {activeModal === 'sales' && (
              <div>
                <h3 className="text-xl font-semibold text-white tracking-tight mb-2">
                  How would you prefer to connect?
                </h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Select your preferred channel to speak with our enterprise solutions team.
                </p>

                <div className="space-y-3">
                  {/* WhatsApp */}
                  <a 
                    href="https://wa.me/923429263395" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 w-full p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all group"
                  >
                    <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-400">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">WhatsApp</p>
                      <p className="text-xs text-zinc-500">+92 342 9263395</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a 
                    href="mailto:info@bridgehomies.com"
                    className="flex items-center gap-4 w-full p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all group"
                  >
                    <div className="p-2 rounded-md bg-blue-500/10 text-blue-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">Email Us</p>
                      <p className="text-xs text-zinc-500">info@bridgehomies.com</p>
                    </div>
                  </a>

                  {/* Website */}
                  <a 
                    href="https://www.bridgehomies.com/#conatct" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 w-full p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all group"
                  >
                    <div className="p-2 rounded-md bg-purple-500/10 text-purple-400">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors">Web Form</p>
                      <p className="text-xs text-zinc-500">bridgehomies.com/#contact</p>
                    </div>
                  </a>
                </div>
              </div>
            )}

            {/* --- CASE 2: FREE TRIAL MODAL --- */}
            {activeModal === 'trial' && (
              <div>
                <h3 className="text-xl font-semibold text-white tracking-tight mb-2">
                  Choose your platform
                </h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Which suite would you like to explore during your 14-day free trial?
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {/* MailhaulerPro */}
                  <a 
                    href="https://mailhaulerpro.com" // Replace with actual URL if different
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all group text-left"
                  >
                    <div className="p-2.5 rounded-md bg-indigo-500/10 text-indigo-400">
                      <Mailbox className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">MailhaulerPro</p>
                      <p className="text-xs text-zinc-500">Advanced high-volume cold email outreach infrastructure.</p>
                    </div>
                  </a>

                  {/* Aierpify */}
                  <a 
                    href="https://aierpify.com" // Replace with actual URL if different
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all group text-left"
                  >
                    <div className="p-2.5 rounded-md bg-sky-500/10 text-sky-400">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white group-hover:text-sky-400 transition-colors">Aierpify</p>
                      <p className="text-xs text-zinc-500">AI-driven ERP system optimizing automation and operations.</p>
                    </div>
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
}