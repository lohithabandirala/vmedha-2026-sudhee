'use client'

import { useRef, useEffect, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number // -1 to 1, where 0 is no parallax
  fadeOut?: boolean
}

export function ParallaxSection({
  children,
  className,
  speed = 0.5,
  fadeOut = false
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementCenter = rect.top + rect.height / 2
      const viewportCenter = windowHeight / 2
      const distanceFromCenter = elementCenter - viewportCenter
      
      // Calculate parallax offset
      setOffset(distanceFromCenter * speed * 0.2)
      
      // Calculate fade out
      if (fadeOut) {
        const progress = Math.max(0, Math.min(1, (rect.bottom) / windowHeight))
        setOpacity(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed, fadeOut])

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        transform: `translateY(${offset}px)`,
        opacity: fadeOut ? opacity : 1,
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  )
}

interface StickyScrollSectionProps {
  children: ReactNode
  className?: string
  stickyContent: ReactNode
  stickyClassName?: string
}

export function StickyScrollSection({
  children,
  className,
  stickyContent,
  stickyClassName
}: StickyScrollSectionProps) {
  return (
    <div className={cn('relative', className)}>
      <div className={cn('sticky top-0 h-screen flex items-center justify-center', stickyClassName)}>
        {stickyContent}
      </div>
      <div className="relative">
        {children}
      </div>
    </div>
  )
}
