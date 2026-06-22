'use client'

import {
  Mail,
  Send,
  ShieldCheck,
  Users,
  Sparkles,
  Inbox,
  BarChart3,
  Server,
  HeartPulse,
  CheckCircle2,
  Search,
  ArrowRight
} from 'lucide-react'

const FEATURES = [
  {
    icon: Send,
    title: 'Multi-Inbox Sending at Scale',
    desc: 'Run campaigns across unlimited connected inboxes with smart rotation, parallel sending, and human-paced delivery patterns.'
  },
  {
    icon: HeartPulse,
    title: 'Automated Warmup & Deliverability',
    desc: 'Inbox vs. spam detection, bounce monitoring, real-time account health scoring, and auto-warmup from day one.'
  },
  {
    icon: Users,
    title: 'Subscriber Management',
    desc: 'Import from CSV, API, or Google Sheets. Subscribers auto-distributed across inboxes with per-account sending controls.'
  },
  {
    icon: Sparkles,
    title: 'Personalization & Smart Sequences',
    desc: 'Dynamic variables, spintax, multi-step sequences, and thread-based follow-ups that feel hand-written.'
  },
  {
    icon: Inbox,
    title: 'Unified Inbox',
    desc: 'Replies from every connected inbox in one place — threaded conversations, IMAP sync, direct response.'
  },
  {
    icon: BarChart3,
    title: 'Campaign Analytics',
    desc: 'Opens, replies, bounce rates, inbox placement, and account health in clean, focused dashboards.'
  },
  {
    icon: Server,
    title: 'Deliverability Infrastructure',
    desc: 'Dedicated IP pools, DKIM/SPF setup, sending throttling, automatic failover, and suppression systems.'
  },
  {
    icon: ShieldCheck,
    title: 'Account Health Protection',
    desc: 'Bounce spikes and sending limit violations caught early with dynamic throttling and auto-pause.'
  },
  {
    icon: CheckCircle2,
    title: 'Multi-Layer Verification',
    desc: 'Validate every subscriber before sending to reduce bounces and protect domain reputation.'
  },
  {
    icon: Search,
    title: 'Automated Lead Generation',
    desc: 'Scrape verified business contacts from public directories and push clean prospects into campaigns.'
  }
]

const STATS = [
  { value: '2.4B+', label: 'Emails Delivered' },
  { value: '1.2s', label: 'Avg. Delivery Speed' },
  { value: '12,400+', label: 'Marketing Teams' },
  { value: '99.8%', label: 'Avg. Inbox Placement' }
]

export default function MailHaulerProPage() {
  return (
    <div className="p-8 sm:p-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10 pb-8 border-b-2 border-gray-100">
        <div>
          <div className="inline-flex items-center w-max px-4 py-1.5 bg-rose-100 text-rose-700 rounded-none text-sm font-bold tracking-widest uppercase mb-6 border-l-4 border-rose-500">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse mr-3"></span>
            Private Beta · v1.0
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tighter leading-[0.95] mb-4">
            MAIL HAULER PRO
          </h2>
          <p className="text-lg text-gray-600 max-w-xl font-medium leading-relaxed">
            Bring-your-own-SMTP email marketing and inbox management. Connect the
            mailboxes you own, then manage campaigns, warmup, replies, and
            deliverability from one centralized dashboard with built-in sending
            limits that protect your reputation.
          </p>
        </div>

        <a
          href="https://mailhaulerpro.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <button className="group flex items-center gap-3 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm uppercase tracking-widest rounded-none transition-all whitespace-nowrap">
            Visit Site
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-rose-50 border-2 border-rose-100 p-5 rounded-tr-2xl rounded-bl-2xl text-center"
          >
            <div className="text-3xl font-black text-rose-700 tracking-tight mb-1">
              {stat.value}
            </div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Feature grid */}
      <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-widest border-b border-gray-200 pb-4">
        Platform Capabilities
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {FEATURES.map((feature) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.title}
              className="bg-white border border-gray-200 p-6 rounded-none hover:border-rose-300 hover:bg-rose-50/30 transition-all"
            >
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-none flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="font-black text-gray-900 mb-2 tracking-tight">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                {feature.desc}
              </p>
            </div>
          )
        })}
      </div>

      {/* Pricing strip */}
      <div className="bg-gray-50 border border-gray-200 p-8 rounded-tl-2xl rounded-br-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <span className="text-xs font-black text-rose-600 uppercase tracking-widest block mb-2">
            Early Bird · First 100 Customers
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-black text-gray-400 line-through">
              $44.99
            </span>
            <span className="text-4xl font-black text-gray-900 tracking-tight">
              $35.99
            </span>
            <span className="text-gray-500 font-bold">/mo for 6 months</span>
          </div>
          <p className="text-sm text-gray-500 font-medium mt-2">
            One flat plan, every feature included. 10-day free trial, no credit
            card required.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
          <Mail className="w-4 h-4 text-rose-600" />
          Bridge Homies · Lahore, Pakistan
        </div>
      </div>
    </div>
  )
}