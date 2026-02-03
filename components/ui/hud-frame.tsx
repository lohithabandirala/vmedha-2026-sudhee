'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HudFrameProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'accent' | 'minimal'
  glowing?: boolean
}

export function HudFrame({
  children,
  className,
  variant = 'default',
  glowing = false
}: HudFrameProps) {
  const borderColor = variant === 'accent' ? '#00F2FF' : '#3A3F7A'
  const glowColor = variant === 'accent' ? 'rgba(0, 242, 255, 0.3)' : 'rgba(0, 210, 200, 0.2)'

  return (
    <div
      className={cn(
        'relative p-6',
        glowing && 'glow-cyan',
        className
      )}
      style={{
        background: 'rgba(26, 28, 61, 0.6)',
        backdropFilter: 'blur(10px)',
        boxShadow: glowing ? `0 0 30px ${glowColor}, inset 0 0 30px rgba(0, 210, 200, 0.05)` : undefined
      }}
    >
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor }} />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor }} />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor }} />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor }} />
      
      {/* Top line decoration */}
      {variant !== 'minimal' && (
        <>
          <div className="absolute top-0 left-6 right-6 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${borderColor}, transparent)` }} />
          <div className="absolute bottom-0 left-6 right-6 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${borderColor}, transparent)` }} />
        </>
      )}
      
      {children}
    </div>
  )
}

interface HudBadgeProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'accent'
}

export function HudBadge({
  children,
  className,
  variant = 'default'
}: HudBadgeProps) {
  const bgColor = variant === 'accent' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(58, 63, 122, 0.5)'
  const borderColor = variant === 'accent' ? '#00F2FF' : '#3A3F7A'
  const textColor = variant === 'accent' ? '#00F2FF' : '#7D7DBE'

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 text-xs font-mono tracking-wider uppercase',
        className
      )}
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
        color: textColor
      }}
    >
      {children}
    </span>
  )
}

interface HudButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'default' | 'primary'
  href?: string
}

export function HudButton({
  children,
  className,
  onClick,
  variant = 'default',
  href
}: HudButtonProps) {
  const isPrimary = variant === 'primary'
  
  const styles = {
    // Primary is a filled Electric Cyan — clear hero CTA
    background: isPrimary ? '#00F2FF' : 'transparent',
    border: `1px solid ${isPrimary ? '#00F2FF' : '#3A3F7A'}`,
    color: isPrimary ? 'var(--primary-foreground)' : '#E6E9FF'
  }

  const Component = href ? 'a' : 'button'

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center justify-center px-6 py-3 font-medium tracking-wider uppercase transition-all duration-300',
        // Only primary gets a soft neon-teal glow on hover — secondary stays outline-only with no glow
        isPrimary ? 'hover:shadow-[0_8px_40px_rgba(0,210,200,0.25)] hover:border-[#00F2FF]' : 'hover:border-[#00F2FF] hover:shadow-none',
        'group overflow-hidden',
        className
      )}
      style={styles}
    >
      {/* Animated background (subtle for primary, inert for outline) */}
      <span className={cn("absolute inset-0 bg-gradient-to-r from-[#00D2C8]/0 via-[#00F2FF]/20 to-[#00D2C8]/0 translate-x-[-100%] transition-transform duration-700", isPrimary && "group-hover:translate-x-[100%]")} />
      
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-50" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-current opacity-50" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-current opacity-50" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current opacity-50" />
      
      <span className="relative z-10">{children}</span>
    </Component>
  )
}
