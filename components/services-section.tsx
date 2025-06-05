"use client"

import { motion } from "framer-motion"
import { useState, useRef } from "react"
import { useInView } from "framer-motion"
import { Code, Smartphone, Globe, Layers, Rocket, Shield, ArrowRight, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const services = [
  {
    icon: <Code className="h-10 w-10" />,
    title: "Web Development",
    description: "We build responsive, fast, and scalable web applications using the latest technologies.",
    color: "from-blue-500 to-cyan-400",
    skills: [
      { name: "React & Next.js", value: 95 },
      { name: "Node.js & Express", value: 90 },
      { name: "UI/UX Implementation", value: 85 },
    ],
    features: [
      "Custom web application development",
      "E-commerce solutions",
      "Progressive Web Apps (PWAs)",
      "API development and integration",
    ],
  },
  {
    icon: <Smartphone className="h-10 w-10" />,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
    color: "from-green-500 to-emerald-400",
    skills: [
      { name: "React Native", value: 92 },
      { name: "Swift & SwiftUI", value: 88 },
      { name: "Flutter", value: 85 },
    ],
    features: [
      "Cross-platform mobile apps",
      "Native iOS and Android development",
      "Mobile UI/UX design",
      "App Store optimization",
    ],
  },
  {
    icon: <Globe className="h-10 w-10" />,
    title: "UI/UX Design",
    description: "User-centered design that creates intuitive, engaging, and memorable digital experiences.",
    color: "from-purple-500 to-pink-400",
    skills: [
      { name: "User Research", value: 90 },
      { name: "Wireframing & Prototyping", value: 95 },
      { name: "Visual Design", value: 92 },
    ],
    features: [
      "User research and testing",
      "Wireframing and prototyping",
      "Visual design and branding",
      "Interaction design",
    ],
  },
  {
    icon: <Layers className="h-10 w-10" />,
    title: "Custom Software",
    description: "Tailored software solutions designed to address your specific business challenges.",
    color: "from-orange-500 to-amber-400",
    skills: [
      { name: "Enterprise Solutions", value: 88 },
      { name: "Cloud Architecture", value: 90 },
      { name: "Database Design", value: 85 },
    ],
    features: [
      "Enterprise software development",
      "Legacy system modernization",
      "Cloud-based solutions",
      "Database design and optimization",
    ],
  },
  {
    icon: <Rocket className="h-10 w-10" />,
    title: "Digital Strategy",
    description: "Strategic planning and roadmapping to help you achieve your digital transformation goals.",
    color: "from-red-500 to-rose-400",
    skills: [
      { name: "Market Analysis", value: 92 },
      { name: "Digital Transformation", value: 88 },
      { name: "Growth Strategy", value: 90 },
    ],
    features: [
      "Digital transformation roadmaps",
      "Technology stack consulting",
      "Market and competitor analysis",
      "Growth strategy development",
    ],
  },
  {
    icon: <Shield className="h-10 w-10" />,
    title: "Cybersecurity",
    description: "Protect your digital assets with our comprehensive security solutions and best practices.",
    color: "from-primary to-violet-400",
    skills: [
      { name: "Security Audits", value: 94 },
      { name: "Penetration Testing", value: 90 },
      { name: "Compliance", value: 88 },
    ],
    features: [
      "Security audits and assessments",
      "Penetration testing",
      "Compliance (GDPR, HIPAA, etc.)",
      "Security training and awareness",
    ],
  },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  const handleFlip = (index: number) => {
    setFlippedCard(flippedCard === index ? null : index)
  }

  return (
    <section id="services" className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground">
            We offer a comprehensive range of digital services to help your business succeed in the digital landscape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="perspective-1000"
            >
              <div
                className={`relative transition-all duration-500 preserve-3d cursor-pointer ${flippedCard === index ? "rotate-y-180" : ""}`}
                style={{ height: "400px" }}
                onClick={() => handleFlip(index)}
              >
                {/* Front of card */}
                <Card className="absolute inset-0 backface-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="flex flex-col items-start h-full p-6">
                    <div className="relative pb-0 flex flex-col h-full">
                      <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} blur-3xl`} />
                      </div>
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${service.color} text-white mb-4`}
                      >
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground mb-6">{service.description}</p>
                      <div className="mt-auto flex items-center text-sm text-primary">
                        <span>Learn more</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Back of card */}
                <Card className="absolute inset-0 backface-hidden rotate-y-180 border-none shadow-lg h-full overflow-hidden">
                  <CardContent className="flex flex-col h-full p-6">
                    <h3 className="text-xl font-bold mb-4">{service.title}</h3>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Expertise</h4>
                      <div className="space-y-3">
                        {service.skills.map((skill, skillIndex) => (
                          <div key={skillIndex} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{skill.name}</span>
                              <span>{skill.value}%</span>
                            </div>
                            <Progress
                              value={skill.value}
                              className={`h-2 bg-muted`}
                              indicatorClassName={`bg-gradient-to-r ${service.color}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <h4 className="font-medium mb-2">What we offer</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <Check className="mr-2 h-4 w-4 text-primary mt-1 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
