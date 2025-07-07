"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    title: "Responsive Design",
    description: "Beautiful designs that work perfectly on all devices",
    icon: "📱",
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Performance Optimized",
    description: "Lightning-fast loading times and smooth interactions",
    icon: "⚡",
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "SEO Friendly",
    description: "Built with best practices for search engine optimization",
    icon: "🎯",
    color: "from-purple-500 to-pink-400",
  },
  {
    title: "Scalable Architecture",
    description: "Designed to grow with your business needs",
    icon: "🚀",
    color: "from-orange-500 to-amber-400",
  },
]

export default function StickyTransformSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 })

  const featureTransforms = features.map((_, index) => ({
    y: useTransform(scrollYProgress, [0, 1], [0, -(index + 1) * 50]),
    rotate: useTransform(scrollYProgress, [0, 1], [0, (index + 1) * 5]),
  }))

  return (
    <section ref={containerRef} className="py-20 sm:py-28 md:py-32 relative overflow-hidden">
      <div className="container px-4 sm:px-6 md:px-8">
        {/* Heading Section */}
        <motion.div className="text-center mb-12 sm:mb-16" style={{ opacity }}>
          <motion.h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ scale: springScale }}>
            Why Choose Our Solutions
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-muted-foreground"
            style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
          >
            Experience the difference with our cutting-edge approach
          </motion.p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-20 sm:mt-28"
          style={{ scale: springScale }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} style={featureTransforms[index]}>
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-4 sm:p-6 text-center">
                  <motion.div
                    className="text-3xl sm:text-4xl mb-4"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.2,
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">{feature.description}</p>
                  <Badge className={`bg-gradient-to-r ${feature.color} text-white border-none`}>Featured</Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background Visual Elements */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 border border-primary/20 rounded-full"
        style={{
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.5, 0.5]),
          rotate,
        }}
      />
      <motion.div
        className="absolute top-1/4 right-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl"
        style={{
          x: useTransform(scrollYProgress, [0, 1], [0, 100]),
          y: useTransform(scrollYProgress, [0, 1], [0, -100]),
        }}
      />
    </section>
  )
}
