"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface TiltImageProps {
  src: string
  alt: string
  className?: string
}

export default function TiltImage({ src, alt, className = "" }: TiltImageProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: rotateY,
        rotateX: rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ rotateX: "5deg", rotateY: "5deg" }}
      className={`relative ${className}`}
    >
      <div
        className="w-full h-full bg-cover bg-center rounded-lg shadow-2xl"
        style={{
          backgroundImage: `url('${src}')`,
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg"
        style={{
          transform: "translateZ(100px)",
          transformStyle: "preserve-3d",
        }}
      />
    </motion.div>
  )
}
