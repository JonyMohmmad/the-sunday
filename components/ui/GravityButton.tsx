"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function GravityButton({
  text = "Get Started",
  onClick,
}: {
  text?: string
  onClick?: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const x = useSpring(mx, {
    stiffness: 250,
    damping: 20,
  })

  const y = useSpring(my, {
    stiffness: 250,
    damping: 20,
  })

  const [hovered, setHovered] = useState(false)
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()

    const relX = e.clientX - rect.left
    const relY = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    mx.set((relX - centerX) * 0.2)
    my.set((relY - centerY) * 0.2)

    setGlowPos({
      x: (relX / rect.width) * 100,
      y: (relY / rect.height) * 100,
    })
  }

  const reset = () => {
    mx.set(0)
    my.set(0)
    setHovered(false)
  }

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      className="group relative overflow-hidden rounded-2xl p-[1px]"
    >
      {/* Animated Border */}
      <div className="absolute inset-0 animate-spin-slow bg-[conic-gradient(from_0deg,#7c3aed,#06b6d4,#ec4899,#7c3aed)]" />

      {/* Glow */}
      <motion.div
        animate={{
          opacity: hovered ? 1 : 0,
        }}
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.4), transparent 40%)`,
        }}
      />

      {/* Content */}
      <div className="relative flex h-14 items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-8 text-white">
        <span className="relative flex overflow-hidden">
          {text.split("").map((char, i) => (
            <span
              key={i}
              className="relative inline-block overflow-hidden"
            >
              <motion.span
                initial={{ y: 0 }}
                animate={{
                  y: hovered ? -22 : 0,
                }}
                transition={{
                  delay: i * 0.03,
                  duration: 0.35,
                }}
                className="block"
              >
                {char === " " ? " " : char}
              </motion.span>

              <motion.span
                initial={{ y: 22 }}
                animate={{
                  y: hovered ? 0 : 22,
                }}
                transition={{
                  delay: i * 0.03,
                  duration: 0.35,
                }}
                className="absolute left-0 top-0 block text-cyan-400"
              >
                {char === " " ? " " : char}
              </motion.span>
            </span>
          ))}
        </span>

        <motion.span
          animate={{
            x: hovered ? 4 : 0,
          }}
        >
          →
        </motion.span>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 5s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </motion.button>
  )
}
