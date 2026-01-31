'use client'

import { useRef, useEffect, useState } from 'react'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { HudFrame } from '@/components/ui/hud-frame'

interface StatItemProps {
  value: number
  suffix?: string
  label: string
  delay?: number
}

function StatItem({ value, suffix = '', label, delay = 0 }: StatItemProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(interval)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [isVisible, value, delay])

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-7xl font-display font-bold text-[#00F2FF] text-glow-cyan">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-[#7D7DBE] tracking-wider uppercase text-sm">
        {label}
      </div>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[150px] opacity-10"
          style={{ background: 'linear-gradient(90deg, #00F2FF, #00D2C8)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <HudFrame className="p-12" glowing>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <StatItem value={50} suffix="+" label="Projects" delay={0} />
              <StatItem value={100} suffix="K+" label="Users" delay={200} />
              <StatItem value={99} suffix="%" label="Uptime" delay={400} />
              <StatItem value={24} suffix="/7" label="Support" delay={600} />
            </div>
          </HudFrame>
        </ScrollReveal>
      </div>
    </section>
  )
}
