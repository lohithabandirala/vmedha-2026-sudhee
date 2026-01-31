'use client'

import { useEffect, useState } from 'react'
import { ScrollIndicator } from '@/components/animations/scroll-progress'
import { HudBadge, HudButton } from '@/components/ui/hud-frame'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [titleVisible, setTitleVisible] = useState(false)
  const [subtitleVisible, setSubtitleVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    const titleTimer = setTimeout(() => setTitleVisible(true), 300)
    const subtitleTimer = setTimeout(() => setSubtitleVisible(true), 800)
    return () => {
      clearTimeout(titleTimer)
      clearTimeout(subtitleTimer)
    }
  }, [])

  const title = 'OPENSYS'
  const tagline = 'VIVE LE TECH'

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
      {/* Animated grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 242, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 242, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)'
        }} />
      </div>

      {/* Glowing orb behind title */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 242, 255, 0.3) 0%, rgba(0, 210, 200, 0.1) 40%, transparent 70%)'
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
        {/* Badge */}
        <div
          className="mb-8 transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(-20px)'
          }}
        >
          <HudBadge variant="accent">Building the Future</HudBadge>
        </div>

        {/* Main Title with character animation */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-wider mb-6">
          {title.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block text-glow-cyan"
              style={{
                color: '#00F2FF',
                opacity: titleVisible ? 1 : 0,
                transform: titleVisible ? 'translateY(0) rotateX(0)' : 'translateY(40px) rotateX(-90deg)',
                transition: `all 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 80}ms`
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <div className="overflow-hidden mb-12">
          <p
            className="text-2xl md:text-3xl font-light tracking-[0.3em] text-[#7D7DBE]"
            style={{
              opacity: subtitleVisible ? 1 : 0,
              transform: subtitleVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 800ms ease-out'
            }}
          >
            {tagline}
          </p>
          <p
            className="text-lg md:text-xl text-[#E6E9FF]/70 mt-4 tracking-wide"
            style={{
              opacity: subtitleVisible ? 1 : 0,
              transform: subtitleVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 800ms ease-out 200ms'
            }}
          >
            Long Live Tech
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-wrap gap-4 justify-center"
          style={{
            opacity: subtitleVisible ? 1 : 0,
            transform: subtitleVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 800ms ease-out 400ms'
          }}
        >
          <HudButton variant="primary" href="#explore">
            Explore Our Vision
          </HudButton>
          <HudButton href="#contact">
            Get in Touch
          </HudButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080B1F] to-transparent pointer-events-none" />
      
      {/* Side decorations */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 opacity-30">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-[#00F2FF]"
            style={{
              height: `${20 + Math.random() * 40}px`,
              opacity: 0.3 + Math.random() * 0.4
            }}
          />
        ))}
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 opacity-30">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-[#00D2C8]"
            style={{
              height: `${20 + Math.random() * 40}px`,
              opacity: 0.3 + Math.random() * 0.4
            }}
          />
        ))}
      </div>
    </section>
  )
}
