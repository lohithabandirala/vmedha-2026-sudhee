'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  children: ReactNode
  className?: string
  speed?: 'slow' | 'normal' | 'fast'
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
}

export function Marquee({
  children,
  className,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true
}: MarqueeProps) {
  const speedMap = {
    slow: '40s',
    normal: '25s',
    fast: '15s'
  }

  return (
    <div
      className={cn(
        'flex overflow-hidden',
        pauseOnHover && 'group',
        className
      )}
    >
      <div
        className={cn(
          'flex shrink-0 gap-8 animate-marquee',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={{
          animationDuration: speedMap[speed],
          animationDirection: direction === 'right' ? 'reverse' : 'normal'
        }}
      >
        {children}
      </div>
      <div
        className={cn(
          'flex shrink-0 gap-8 animate-marquee',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={{
          animationDuration: speedMap[speed],
          animationDirection: direction === 'right' ? 'reverse' : 'normal'
        }}
      >
        {children}
      </div>
    </div>
  )
}
