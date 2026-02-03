'use client'

import { useEffect, useState } from 'react'
import { ScrollIndicator } from '@/components/animations/scroll-progress'
import { HudBadge } from '@/components/ui/hud-frame'

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

  const title = 'Vive-Le-Tech'
  const tagline = 'Long Live Tech' 

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Deep Space Atmospheric Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Deep Space Blue gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B1F] via-[#1A1C3D] to-[#080B1F] opacity-80" />
        
        {/* Main visible grid - softened and faded toward center */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 242, 255, 0.09) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 242, 255, 0.09) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            // Fade more aggressively toward the center so the grid supports rather than competes with content
            maskImage: 'radial-gradient(ellipse 70% 50% at center, black 15%, transparent 85%)'
          }}
        />
        
        {/* Perspective grid at bottom - softened and more faded toward center */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[60vh]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 242, 255, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 242, 255, 0.12) 2px, transparent 2px)
            `,
            backgroundSize: '80px 40px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'center bottom',
            // Fade the floor more toward the center so content remains dominant
            maskImage: 'linear-gradient(to top, black 0%, transparent 90%)'
          }}
        />
        
        {/* Horizontal glow line (subtler) */}
        <div 
          className="absolute bottom-[20%] left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0, 242, 255, 0.45), rgba(0, 210, 200, 0.38), transparent)',
            boxShadow: '0 0 12px rgba(0, 242, 255, 0.18), 0 0 30px rgba(0, 242, 255, 0.12)'
          }}
        />
      </div>

      {/* Multiple layered glowing orbs for atmospheric depth */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-[120px] pointer-events-none animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, rgba(0, 242, 255, 0.4) 0%, rgba(99, 102, 241, 0.2) 40%, transparent 70%)'
        }}
      />
      <div 
        className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full opacity-25 blur-[80px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 210, 200, 0.3) 0%, transparent 60%)',
          animation: 'float 4s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-20 blur-[60px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(125, 125, 190, 0.4) 0%, transparent 70%)',
          animation: 'float 5s ease-in-out infinite reverse'
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl">
        {/* Futuristic Badge */}
        <div
          className="mb-8 transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(-20px)'
          }}
        >
          <HudBadge variant="accent" className="animate-pulse-glow">
            <span className="text-[#E6E9FF] tracking-widest">🚀 Welcome to the Future</span>
          </HudBadge>
        </div>

        {/* Main Title with gradient and glow */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold tracking-tight mb-8" style={{ textShadow: '0 6px 30px rgba(0,242,255,0.12), 0 0 40px rgba(0,242,255,0.08)'}}>
          {title.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block"
              style={{
                background: char === '-' ? 'none' : 'linear-gradient(135deg, #00F2FF 0%, #00D2C8 50%, #7D7DBE 100%)',
                WebkitBackgroundClip: char === '-' ? 'unset' : 'text',
                WebkitTextFillColor: char === '-' ? '#3A3F7A' : 'transparent',
                filter: char === '-' ? 'none' : 'drop-shadow(0 0 14px rgba(0, 242, 255, 0.28))',
                letterSpacing: char === ' ' ? '0.06em' : '0.02em',
                opacity: titleVisible ? 1 : 0,
                transform: titleVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.985)',
                transition: `all 700ms cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 60}ms`
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Tagline with cosmic feel */}
        <div className="overflow-hidden mb-6">
          <p
            className="text-xl md:text-2xl font-medium tracking-normal mb-2"
            style={{
              color: '#E6E9FF',
              textShadow: '0 0 8px rgba(125, 125, 190, 0.12)',
              opacity: subtitleVisible ? 1 : 0,
              transform: subtitleVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 700ms ease-out'
            }}
          >
            {tagline}
          </p>
          <p
            className="text-base md:text-lg text-[#E6E9FF]/85 tracking-normal max-w-xl mx-auto leading-7"
            style={{
              opacity: subtitleVisible ? 1 : 0,
              transform: subtitleVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 700ms ease-out 150ms'
            }}
          >
            A technology-driven event series by VMedha Club
          </p> 
        </div>




      </div>

      {/* Twilight Violet Landscape/Silhouette at bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        {/* Mountain/Hill silhouettes */}
        <svg className="w-full h-32 md:h-40" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3A3F7A', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: '#1A1C3D', stopOpacity: 0.9 }} />
            </linearGradient>
          </defs>
          {/* Back mountains */}
          <path 
            d="M0,100 Q200,60 400,80 T800,100 T1200,90 L1200,200 L0,200 Z" 
            fill="url(#hillGradient)" 
            opacity="0.4"
          />
          {/* Mid mountains */}
          <path 
            d="M0,130 Q150,90 300,110 T600,120 T900,100 T1200,120 L1200,200 L0,200 Z" 
            fill="#3A3F7A" 
            opacity="0.6"
          />
          {/* Front mountains (slow movement + subtle top-edge glow to suggest roadmap start) */}
          <path 
            d="M0,150 Q100,120 250,140 T500,145 T750,135 T1000,150 T1200,140 L1200,200 L0,200 Z" 
            fill="#3A3F7A" 
            opacity="0.8"
            stroke="rgba(0,242,255,0.06)"
            strokeWidth={2}
            className="animate-wave-slow"
          />
        </svg>
        
        {/* Gradient fade to background */}
        <div className="h-16 bg-gradient-to-t from-[#080B1F] via-[#1A1C3D]/50 to-transparent" />
      </div>





      {/* Celestial particles/stars overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Fewer, slower twinkles */}
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#E6E9FF]"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 75}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.6,
              boxShadow: '0 0 3px rgba(230, 233, 255, 0.35)',
              animation: `twinkle ${Math.random() * 6 + 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}

        {/* A few slow drifting particles (anti-gravity feel) */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`drift-${i}`}
            className="absolute rounded-full bg-[#E6E9FF]"
            style={{
              width: `${Math.random() * 6 + 4}px`,
              height: `${Math.random() * 6 + 4}px`,
              top: `${60 + Math.random() * 30}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.5,
              boxShadow: '0 0 8px rgba(230, 233, 255, 0.25)',
              animation: `drift ${10 + Math.random() * 12}s linear infinite`,
              animationDelay: `${Math.random() * 6}s`,
              transformOrigin: 'center'
            }}
          />
        ))}
      </div>
    </section>
  )
}
