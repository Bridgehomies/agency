"use client"

import { useEffect } from "react"

import { useState } from "react"

export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId.replace("#", ""))
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    })
  }
}

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = scrolled / scrollHeight
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", updateScrollProgress, { passive: true })
    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  return scrollProgress
}
