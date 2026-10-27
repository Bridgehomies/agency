'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Calculator,
  TrendingUp,
  FileText,
  ArrowRight,
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
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-6">
                AIERPIFY. <br />
                <span className="text-green-600 text-4xl sm:text-5xl lg:text-6xl block mt-2 font-extrabold">FBR &amp; PRAL E-INVOICING.</span>
              </h2>

              <p className="text-xl text-gray-600 max-w-xl font-medium leading-relaxed mb-10">
                Create and manage digital invoices with FBR and PRAL validation, submission, and tax workflow support.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="https://www.aierpify.com" target="_blank" rel="noopener noreferrer">
                  <button className="group flex items-center gap-4 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-none transition-all w-full sm:w-auto justify-center">
                    VIEW AIERPIFY
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </button>
                </a>

                <Link href="/case-studies/aierpify" className="group flex items-center gap-4 px-8 py-4 border-2 border-gray-200 hover:border-gray-900 text-gray-900 font-bold text-lg rounded-none transition-all w-full sm:w-auto justify-center">
                  Aierpify Case Study
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-expanded={isExpanded ? "true" : "false"}
                  aria-controls="aierpify-details-drawer"
                  className="group flex items-center gap-4 px-8 py-4 bg-gray-900 hover:bg-black text-white font-bold text-lg rounded-none transition-all w-full sm:w-auto justify-center"
                >
                  {isExpanded ? 'Hide Details' : 'See How It Works'}
                  <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
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
                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">FBR &amp; PRAL E-Invoicing</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Digital invoicing with FBR and PRAL workflow support for Pakistani businesses. See Aierpify for current product capabilities and availability.
                </p>
              </div>

            </div>

          </div>

          {/* AIERPIFY DRAWER */}
          <div
            id="aierpify-details-drawer"
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
        {/* PRODUCT 3: OPLEO */}
        {/* ========================================================================= */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 auto-rows-fr">
          <div className="lg:col-span-4 relative bg-violet-50 border-4 border-violet-100 p-8 rounded-tr-[3rem] rounded-bl-[3rem] overflow-hidden flex flex-col justify-between min-h-[320px]">
            <div className="absolute -right-6 -bottom-10 text-9xl font-black text-violet-100/70 select-none -rotate-12">
              OP
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-violet-100 text-violet-700 rounded-none flex items-center justify-center mb-6">
                <span className="text-2xl font-black">O</span>
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">OPleo</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                A connected people-operations platform for attendance, payroll, leave, remote work, invoicing, and employee self-service.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col justify-center bg-white p-2">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-6">
              OPLEO. <br />
              <span className="text-violet-600 text-4xl sm:text-5xl lg:text-6xl block mt-2 font-extrabold">PEOPLE OPERATIONS, CONNECTED.</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-xl font-medium leading-relaxed mb-10">
              A shared operational record connects employee, HR, finance, and attendance workflows.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/case-studies/opleo" className="group flex items-center gap-4 px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold text-lg rounded-none transition-all w-full sm:w-auto justify-center">
                EXPLORE OPLEO
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="/case-studies/opleo" className="group flex items-center gap-4 px-8 py-4 bg-gray-900 hover:bg-black text-white font-bold text-lg rounded-none transition-all w-full sm:w-auto justify-center">
                VIEW CASE STUDY
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
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
                  Bring-your-own-SMTP email outreach and deliverability platform for mailbox management, warmup, campaign sending, and unified replies.
                </p>
              </div>

            </div>

            {/* MAIL HAULER PRO HERO/COPY BLOCK */}
            <div className="lg:col-span-8 flex flex-col justify-center bg-white p-2 order-1 lg:order-2">

              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-6">
                MAIL HAULER PRO. <br />
                <span className="text-rose-600 text-4xl sm:text-5xl lg:text-6xl block mt-2 font-extrabold">MAILBOX MANAGEMENT &amp; OUTREACH.</span>
              </h2>

              <p className="text-xl text-gray-600 max-w-xl font-medium leading-relaxed mb-10">
                Manage connected mailboxes, campaign sequences, warm-up, deliverability monitoring, and sending limits in one platform.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/case-studies/mail-hauler-pro" className="group flex items-center gap-4 px-8 py-4 border-2 border-gray-200 hover:border-gray-900 text-gray-900 font-bold text-lg rounded-none transition-all w-full sm:w-auto justify-center">
                  Explore Mail Hauler Pro
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>

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

        <section aria-labelledby="product-case-studies" className="mb-20">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Built by Bridge Homies</p>
              <h2 id="product-case-studies" className="mt-2 text-3xl font-black uppercase tracking-tight text-gray-900">Product case studies</h2>
            </div>
            <p className="max-w-xl text-gray-600">Explore how selected software products and platforms were developed.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { name: "Aierpify", category: "Digital invoicing", href: "/case-studies/aierpify" },
              { name: "OPleo", category: "HR and operations", href: "/case-studies/opleo" },
              { name: "Mail Hauler Pro", category: "Email outreach platform", href: "/case-studies/mail-hauler-pro" },
              { name: "Anosuim", category: "Business operations software", href: "/case-studies/anosuim" },
              { name: "IHFP", category: "Community and tournament platform", href: "/case-studies/ihfp" },
            ].map((study) => (
              <Link key={study.href} href={study.href} className="group border border-gray-200 p-5 transition-colors hover:border-gray-900">
                <h3 className="text-lg font-bold text-gray-900">{study.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{study.category}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 group-hover:text-violet-700">
                  View case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* UPCOMING ECOSYSTEM & ARCHITECTURE */}
        {/* ========================================================================= */}
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-wider">
            Products and Product Capabilities
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 auto-rows-fr">

            {/* AIERPIFY POS */}
            <div className="lg:col-span-4 bg-white border-2 border-dashed border-blue-200 p-8 rounded-tl-[3rem] rounded-br-[3rem] hover:bg-blue-50/50 hover:border-blue-400 transition-all relative">
              <div className="absolute top-6 right-6 bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 uppercase tracking-widest">
                Aierpify product
              </div>
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-none flex items-center justify-center mb-6">
                <Calculator className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Aierpify POS</h3>
              <p className="text-gray-600 font-medium">
                Cloud POS and digital invoicing for retail, restaurants, salons, clinics, schools, and service businesses, with sales, billing, inventory, reporting, and tax workflows.
              </p>
              <a href="https://pos.aierpify.com" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900">
                Explore Aierpify POS <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* STOCKHALE PRODUCT */}
            <div className="lg:col-span-4 bg-white border-2 border-purple-200 p-8 rounded-none hover:bg-purple-50/50 hover:border-purple-400 transition-all relative">
              <div className="absolute top-6 right-6 bg-purple-100 text-purple-600 text-xs font-bold px-3 py-1 uppercase tracking-widest">
                Product platform
              </div>
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-none flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Stockhale</h3>
              <p className="text-gray-600 font-medium">
                Inventory and business-management platform for stock, sales, purchases, billing, customers, suppliers, and business operations.
              </p>
              <a href="https://stockhale.app" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-semibold text-purple-700 hover:text-purple-900">
                Explore Stockhale <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* OTHER PRODUCT PLATFORMS */}
            <div className="lg:col-span-4 bg-gray-50 border border-gray-200 p-8 rounded-tr-[3rem] rounded-bl-[3rem]">
              <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-widest border-b border-gray-200 pb-4">
                Other Product Platforms
              </h3>
              <ul className="space-y-6">
                <li>
                  <h4 className="font-bold text-gray-900">CV JET</h4>
                  <p className="mt-1 text-sm text-gray-600">AI resume and career tools for resume creation, improvement, ATS scoring, and job-focused resumes.</p>
                </li>
                <li>
                  <h4 className="font-bold text-gray-900">Account-o-Legal</h4>
                  <p className="mt-1 text-sm text-gray-600">Planned accounting and legal-operations platform.</p>
                </li>
                <li>
                  <h4 className="font-bold text-gray-900">AI RFP Proposal Generator</h4>
                  <p className="mt-1 text-sm text-gray-600">Proposal-generation platform; listed feature ideas are potential capabilities.</p>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
