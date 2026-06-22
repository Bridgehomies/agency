'use client'

import { useState } from 'react'
import {
  Calculator,
  TrendingUp,
  FileText,
  ArrowRight,
  Lock,
  Cloud,
  CheckCircle,
  Clock,
  ChevronDown,
  Mail,
  Send
} from 'lucide-react'
import AierpifyPage from '@/components/product/AierpifyPage'
import MailHaulerProPage from '@/components/product/MailHaulerProPage'

export default function FeaturedProduct() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMailExpanded, setIsMailExpanded] = useState(false)

  return (
    <section className="py-24 bg-white" id="products">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ========================================================================= */}
        {/* PRODUCT 1: AIERPIFY */}
        {/* ========================================================================= */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 auto-rows-fr mb-8">
            
            {/* 1. AIERPIFY HERO BLOCK */}
            <div className="lg:col-span-8 flex flex-col justify-center bg-white p-2">
              <div className="inline-flex items-center w-max px-4 py-1.5 bg-green-100 text-green-700 rounded-none text-sm font-bold tracking-widest uppercase mb-8 border-l-4 border-green-500">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-3"></span>
                Module Status: Live
              </div>
              
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-6">
                AIERPIFY. <br />
                <span className="text-green-600 text-4xl sm:text-5xl lg:text-6xl block mt-2 font-extrabold">SMART ERP. FBR INTEGRATED.</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-xl font-medium leading-relaxed mb-10">
                Stop waiting on compliance. Generate and submit invoices to the FBR instantly, while we build the rest of your command center.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="https://www.aierpify.com" target="_blank" rel="noopener noreferrer">
                  <button className="group flex items-center gap-4 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-none transition-all w-full sm:w-auto justify-center">
                    TRY INVOICING NOW
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </button>
                </a>
                
                <button
                  onClick={() => setIsMailExpanded(!isMailExpanded)}
                  aria-expanded={isMailExpanded ? "true" : "false"}
                  aria-controls="mail-hauler-pro-drawer"
                  className="group flex items-center gap-4 px-8 py-4 bg-gray-900 hover:bg-black text-white font-bold text-lg rounded-none transition-all w-full sm:w-auto justify-center"
                >
                  {isMailExpanded ? 'Hide Details' : 'See How It Works'}
                  <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isMailExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* 2. AIERPIFY LIVE FEATURE BLOCK */}
            <div className="lg:col-span-4 relative bg-green-50 border-4 border-green-100 p-8 rounded-tr-[3rem] rounded-bl-[3rem] overflow-hidden group hover:border-green-300 transition-colors flex flex-col justify-between min-h-[320px]">
              <div className="absolute -right-6 -bottom-10 text-9xl font-black text-green-100/50 select-none transform -rotate-12 group-hover:scale-110 transition-transform duration-700">
                FBR
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-none flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">FBR Invoicing</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Fully functional and natively connected with FBR Pakistan. Direct submission, tax automation, and compliant reporting—ready today.
                </p>
              </div>
              
              <div className="relative z-10 mt-8 pt-4 border-t-2 border-green-200">
                <span className="text-green-700 font-black tracking-widest uppercase text-sm">Status: Operational</span>
              </div>
            </div>

          </div>

          {/* AIERPIFY DRAWER */}
          <div 
            id="seo-compliance-drawer"
            className={`transition-all duration-500 ease-in-out overflow-hidden w-full ${
              isExpanded ? 'max-h-[10000px] opacity-100 my-12' : 'max-h-0 opacity-0 pointer-events-none'
            }`}
          >
            <div className="bg-white border-4 border-gray-900 relative rounded-none shadow-xl">
              <AierpifyPage />
            </div>
          </div>
        </div>

        {/* SECTION DIVIDER */}
        <hr className="border-t border-gray-200 my-16 max-w-7xl mx-auto" />

        {/* ========================================================================= */}
        {/* PRODUCT 2: MAIL HAULER PRO */}
        {/* ========================================================================= */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 auto-rows-fr mb-8">

            {/* MAIL HAULER PRO LIVE FEATURE BLOCK */}
            <div className="lg:col-span-4 relative bg-rose-50 border-4 border-rose-100 p-8 rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden group hover:border-rose-300 transition-colors flex flex-col justify-between min-h-[320px] order-2 lg:order-1">
              <div className="absolute -left-6 -bottom-10 text-9xl font-black text-rose-100/50 select-none transform rotate-12 group-hover:scale-110 transition-transform duration-700">
                MHP
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-none flex items-center justify-center mb-6">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Mail Hauler Pro</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Bring-your-own-SMTP email marketing and deliverability platform. Multi-inbox sending, warmup, and unified replies — in private beta now.
                </p>
              </div>

              <div className="relative z-10 mt-8 pt-4 border-t-2 border-rose-200">
                <span className="text-rose-700 font-black tracking-widest uppercase text-sm">Status: Private Beta</span>
              </div>
            </div>

            {/* MAIL HAULER PRO HERO/COPY BLOCK */}
            <div className="lg:col-span-8 flex flex-col justify-center bg-white p-2 order-1 lg:order-2">
              <div className="inline-flex items-center w-max px-4 py-1.5 bg-rose-100 text-rose-700 rounded-none text-sm font-bold tracking-widest uppercase mb-8 border-l-4 border-rose-500">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse mr-3"></span>
                Product Status: Private Beta
              </div>

              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-6">
                MAIL HAULER PRO. <br />
                <span className="text-rose-600 text-4xl sm:text-5xl lg:text-6xl block mt-2 font-extrabold">SMARTER SENDING. ZERO WASTED SENDS.</span>
              </h2>

              <p className="text-xl text-gray-600 max-w-xl font-medium leading-relaxed mb-10">
                Connect the mailboxes you own, run campaigns at scale, and protect your reputation with built-in warmup, verification, and sending limits.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="https://mailhaulerpro.com" target="_blank" rel="noopener noreferrer">
                  <button className="group flex items-center gap-4 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-lg rounded-none transition-all w-full sm:w-auto justify-center">
                    START SENDING FREE
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </button>
                </a>

                <button
                  onClick={() => setIsMailExpanded(!isMailExpanded)}
                  aria-expanded={isMailExpanded ? "true" : "false"}
                  aria-controls="mail-hauler-pro-drawer"
                  className="group flex items-center gap-4 px-8 py-4 bg-gray-900 hover:bg-black text-white font-bold text-lg rounded-none transition-all w-full sm:w-auto justify-center"
                >
                  {isMailExpanded ? 'Hide Details' : 'See How It Works'}
                  <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isMailExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

          </div>

          {/* MAIL HAULER PRO DRAWER */}
          <div
            id="mail-hauler-pro-drawer"
            className={`transition-all duration-500 ease-in-out overflow-hidden w-full ${
              isMailExpanded ? 'max-h-[10000px] opacity-100 my-12' : 'max-h-0 opacity-0 pointer-events-none'
            }`}
          >
            <div className="bg-white border-4 border-gray-900 relative rounded-none shadow-xl">
              <MailHaulerProPage />
            </div>
          </div>
        </div>

        {/* SECTION DIVIDER */}
        <hr className="border-t border-gray-200 my-16 max-w-7xl mx-auto" />

        {/* ========================================================================= */}
        {/* UPCOMING ECOSYSTEM & ARCHITECTURE */}
        {/* ========================================================================= */}
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-wider">
            Future Ecosystem Roadmap
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 auto-rows-fr">

            {/* 3. UPCOMING MODULE: ANALYTICS */}
            <div className="lg:col-span-4 bg-white border-2 border-dashed border-blue-200 p-8 rounded-tl-[3rem] rounded-br-[3rem] hover:bg-blue-50/50 hover:border-blue-400 transition-all cursor-crosshair relative">
              <div className="absolute top-6 right-6 bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-3 h-3" /> Building
              </div>
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-none flex items-center justify-center mb-6">
                <Calculator className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Smart Analytics</h3>
              <p className="text-gray-600 font-medium">
                Powerful dashboards to track business performance and revenue insights.
              </p>
            </div>

            {/* 4. UPCOMING MODULE: INVENTORY */}
            <div className="lg:col-span-4 bg-white border-2 border-dashed border-purple-200 p-8 rounded-none hover:bg-purple-50/50 hover:border-purple-400 transition-all cursor-crosshair relative">
              <div className="absolute top-6 right-6 bg-purple-100 text-purple-600 text-xs font-bold px-3 py-1 uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-3 h-3" /> Building
              </div>
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-none flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Stock & Inventory</h3>
              <p className="text-gray-600 font-medium">
                Real-time stock tracking and inventory control features for full asset visibility.
              </p>
            </div>

            {/* 5. CORE INFRASTRUCTURE */}
            <div className="lg:col-span-4 bg-gray-50 border border-gray-200 p-8 rounded-tr-[3rem] rounded-bl-[3rem]">
              <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-widest border-b border-gray-200 pb-4">
                Core Architecture
              </h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                  <div>
                    <div className="font-bold text-gray-900 leading-none mb-1">Aierpify Tax Engine</div>
                    <div className="text-sm text-gray-500">Live compliance</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-rose-600 shrink-0" />
                  <div>
                    <div className="font-bold text-gray-900 leading-none mb-1">Mail Hauler Platform</div>
                    <div className="text-sm text-gray-500">Private beta</div>
                  </div>
                </li>
                <li className="flex items-start gap-4 opacity-60">
                  <Lock className="w-6 h-6 text-gray-400 shrink-0" />
                  <div>
                    <div className="font-bold text-gray-900 leading-none mb-1">Role-Based Access</div>
                    <div className="text-sm text-gray-500">In development</div>
                  </div>
                </li>
                <li className="flex items-start gap-4 opacity-60">
                  <Cloud className="w-6 h-6 text-gray-400 shrink-0" />
                  <div>
                    <div className="font-bold text-gray-900 leading-none mb-1">Cloud + Offline</div>
                    <div className="text-sm text-gray-500">In development</div>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}