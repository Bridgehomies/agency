"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useSpring } from "framer-motion"

interface ScrollCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

export default function ScrollCounter({ end, duration = 2, suffix = "", prefix = "" }: ScrollCounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  const motionValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    if (isInView) {
      motionValue.set(end)
    }
  }, [isInView, end, motionValue])

  useEffect(() => {
    const unsubscribe = motionValue.onChange((latest) => {
      setCount(Math.round(latest))
    })
    return unsubscribe
  }, [motionValue])

  return (
    <motion.span
      ref={ref}
      className="font-bold text-2xl text-primary"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}
      {count}
      {suffix}
    </motion.span>
  )
}
