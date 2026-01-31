'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ScrollProgressProps {
  className?: string
}

export function ScrollProgress({ className }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / scrollHeight) * 100
      setProgress(currentProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={cn('fixed top-0 left-0 right-0 z-50 h-[2px] bg-[#1A1C3D]', className)}>
      <div
        className="h-full bg-gradient-to-r from-[#00D2C8] to-[#00F2FF] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

interface ScrollIndicatorProps {
  className?: string
  text?: string
}

export function ScrollIndicator({ className, text = 'Scroll to Explore' }: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3 transition-opacity duration-500',
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      <span className="text-sm text-[#7D7DBE] tracking-wider uppercase">{text}</span>
      <div className="relative w-6 h-10 border-2 border-[#3A3F7A] rounded-full">
        <div className="absolute left-1/2 top-2 w-1 h-2 bg-[#00F2FF] rounded-full -translate-x-1/2 animate-bounce" />
      </div>
    </div>
  )
}
