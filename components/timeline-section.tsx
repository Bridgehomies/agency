"use client"

import { motion } from "framer-motion"
import { Rocket, Users, Lightbulb, BrainCircuit, LineChart, Globe } from "lucide-react"

const features = [
  {
    icon: Lightbulb,
    title: "It Started with a Spark",
    description: "An ambitious idea born to disrupt the norm.",
  },
  {
    icon: Rocket,
    title: "MVP Launched",
    description: "We shipped fast, tested faster — real user feedback in days.",
  },
  {
    icon: Users,
    title: "Built a Power Team",
    description: "Designers, developers, marketers — all aligned to a vision.",
  },
  {
    icon: LineChart,
    title: "Traction Achieved",
    description: "Growth wasn't a fluke. Numbers backed the mission.",
  },
  {
    icon: BrainCircuit,
    title: "Scaled with Intelligence",
    description: "AI-driven decisions made scaling smoother.",
  },
  {
    icon: Globe,
    title: "Global Footprint",
    description: "Our reach expanded — product used across 10+ countries.",
  },
]

export default function StartupSection() {
  return (
    <section className="w-full py-24 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Our Startup Journey
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-100 hover:bg-purple-100 transition p-6 rounded-2xl shadow-md hover:shadow-xl group"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-purple-200 rounded-full mb-4 group-hover:bg-purple-400 transition">
                <item.icon className="w-7 h-7 text-purple-700 group-hover:text-white transition" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
