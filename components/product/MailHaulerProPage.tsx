'use client'

import {
  Mail,
  Send,
  HeartPulse,
  Users,
  Sparkles,
  Inbox,
  BarChart3,
  ListChecks,
  RotateCw,
  Sheet,
  Gauge,
} from 'lucide-react'
import Link from 'next/link'

const FEATURES = [
  {
    icon: Mail,
    title: 'Multiple Mailbox Management',
    desc: 'Connect and manage multiple mailboxes for outreach campaigns.',
  },
  {
    icon: RotateCw,
    title: 'Mailbox Rotation',
    desc: 'Rotate sending across connected mailboxes as part of campaign management.',
  },
  {
    icon: HeartPulse,
    title: 'Warm-Up and Bounce Monitoring',
    desc: 'Manage mailbox warm-up and monitor bounced messages.',
  },
  {
    icon: Gauge,
    title: 'Deliverability Health Monitoring',
    desc: 'Review mailbox and campaign deliverability health signals.',
  },
  {
    icon: Users,
    title: 'Lead Import',
    desc: 'Bring leads into campaigns through CSV, API, or Google Sheets.',
  },
  {
    icon: Sheet,
    title: 'Personalization and Spintax',
    desc: 'Use personalization variables and spintax in outreach messages.',
  },
  {
    icon: Send,
    title: 'Email Sequences',
    desc: 'Set up multi-step email sequences for outreach campaigns.',
  },
  {
    icon: Inbox,
    title: 'Unified Inbox and IMAP',
    desc: 'Manage replies through a unified inbox with IMAP support.',
  },
  {
    icon: BarChart3,
    title: 'Campaign Analytics',
    desc: 'Review campaign activity and outreach performance in analytics.',
  },
  {
    icon: Gauge,
    title: 'Daily Sending Limits',
    desc: 'Set and manage daily sending limits for connected mailboxes.',
  },
  {
    icon: ListChecks,
    title: 'Lead and Outreach Tracking',
    desc: 'Track leads and their progress through outreach activity.',
  },
]

export default function MailHaulerProPage() {
  return (
    <div className="p-8 sm:p-12">
      <div className="mb-10 flex flex-col gap-6 border-b-2 border-gray-100 pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-6 inline-flex w-max items-center border-l-4 border-rose-500 bg-rose-100 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-rose-700">
            Cold Email Outreach and Infrastructure
          </div>
          <h2 className="mb-4 text-4xl font-black leading-[0.95] tracking-tighter text-gray-900 sm:text-5xl">
            MAIL HAULER PRO
          </h2>
          <p className="max-w-2xl text-lg font-medium leading-relaxed text-gray-600">
            Mail Hauler Pro is a cold-email outreach and email infrastructure platform. Manage mailboxes, warm-up, lead imports, sequences, replies, deliverability health, and campaign activity from its outreach workflow.
          </p>
        </div>

        <Link
          href="/case-studies/mail-hauler-pro"
          className="inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap bg-rose-600 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-rose-700"
        >
          Explore Mail Hauler Pro
          <Send className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <h3 className="mb-6 border-b border-gray-200 pb-4 text-lg font-black uppercase tracking-widest text-gray-900">
        Platform Capabilities
      </h3>
      <div className="mb-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => {
          const Icon = feature.icon
          return (
            <article
              key={feature.title}
              className="border border-gray-200 bg-white p-6 transition-colors hover:border-rose-300 hover:bg-rose-50/30"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center bg-rose-50 text-rose-600">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h4 className="mb-2 font-black tracking-tight text-gray-900">{feature.title}</h4>
              <p className="text-sm font-medium leading-relaxed text-gray-600">{feature.desc}</p>
            </article>
          )
        })}
      </div>
    </div>
  )
}
