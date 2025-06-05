"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

export default function FloatingElements() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Different scroll speeds for parallax effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 })
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 })
  const springY3 = useSpring(y3, { stiffness: 100, damping: 30 })

  const particleStyles = Array.from({ length: 8 }, (_, i) => ({
    left: `${10 + i * 12}%`,
    top: `${20 + (i % 3) * 30}%`,
    y: useTransform(scrollYProgress, [0, 1], [0, -50 - i * 20]),
  }))

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Geometric Shapes */}
      <motion.div
        style={{ y: springY1 }}
        className="absolute top-1/4 left-1/4 w-20 h-20 border border-primary/20 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        style={{ y: springY2, rotate }}
        className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        style={{ y: springY3 }}
        className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full"
        animate={{
          x: [0, 20, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Particle System */}
      {particleStyles.map((style, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/30 rounded-full"
          style={style}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}
