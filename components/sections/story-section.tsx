'use client'

import { useRef, useEffect, useState } from 'react'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { WordReveal } from '@/components/animations/text-reveal'
import { HudBadge } from '@/components/ui/hud-frame'
import { cn } from '@/lib/utils'

interface StorySectionProps {
  badge: string
  title: string
  description: string
  index: number
  accentColor?: 'cyan' | 'teal' | 'lavender'
}

export function StorySection({
  badge,
  title,
  description,
  index,
  accentColor = 'cyan'
}: StorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  const colors = {
    cyan: { primary: '#00F2FF', glow: 'rgba(0, 242, 255, 0.3)' },
    teal: { primary: '#00D2C8', glow: 'rgba(0, 210, 200, 0.3)' },
    lavender: { primary: '#7D7DBE', glow: 'rgba(125, 125, 190, 0.3)' }
  }

  const color = colors[accentColor]

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate progress through section
      const sectionProgress = 1 - (rect.top / windowHeight)
      setProgress(Math.max(0, Math.min(1, sectionProgress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      id={`story-${index}`}
      className="relative min-h-screen flex items-center py-20"
    >
      {/* Progress line */}
      <div className="absolute left-8 md:left-16 top-0 bottom-0 w-[2px] bg-[#1A1C3D]">
        <div
          className="absolute top-0 left-0 w-full transition-all duration-300"
          style={{
            height: `${progress * 100}%`,
            background: `linear-gradient(to bottom, ${color.primary}, transparent)`
          }}
        />
        {/* Node point */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-500"
          style={{
            top: '50%',
            borderColor: color.primary,
            background: progress > 0.5 ? color.primary : 'transparent',
            boxShadow: progress > 0.5 ? `0 0 20px ${color.glow}` : 'none'
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-8 ml-16 md:ml-32">
        <ScrollReveal delay={100}>
          <HudBadge variant="accent" className="mb-6">{badge}</HudBadge>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight">
            <WordReveal
              wordDelay={80}
              className="text-[#E6E9FF]"
            >
              {title}
            </WordReveal>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <p className="text-lg md:text-xl text-[#7D7DBE] leading-relaxed max-w-2xl">
            {description}
          </p>
        </ScrollReveal>

        {/* Decorative element */}
        <ScrollReveal delay={600} direction="left">
          <div className="mt-12 flex items-center gap-4">
            <div
              className="w-16 h-[2px]"
              style={{ background: `linear-gradient(90deg, ${color.primary}, transparent)` }}
            />
            <span className="text-sm font-mono" style={{ color: color.primary }}>
              0{index + 1}
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* Background glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[150px] pointer-events-none opacity-20"
        style={{ background: color.glow }}
      />
    </section>
  )
}

export function StorytellingContainer() {
  const stories = [
    {
      badge: 'The Challenge',
      title: 'Technology should empower, not complicate',
      description: 'In a world overwhelmed by complexity, we believe the best solutions are those that simplify. Our mission is to create technology that adapts to humans, not the other way around.',
      accentColor: 'cyan' as const
    },
    {
      badge: 'Our Vision',
      title: 'Building bridges between innovation and accessibility',
      description: 'We envision a future where cutting-edge technology is accessible to everyone. Where barriers are broken down and possibilities are endless. This is not just a dream—it is what we build every day.',
      accentColor: 'teal' as const
    },
    {
      badge: 'The Solution',
      title: 'Open systems for an open future',
      description: 'OpenSys is more than a company—it is a movement. We create open, interconnected systems that empower developers, businesses, and individuals to build without limits.',
      accentColor: 'lavender' as const
    }
  ]

  return (
    <div id="vision" className="relative">
      {/* Section header */}
      <div className="py-20 px-6 text-center">
        <ScrollReveal>
          <HudBadge className="mb-4">Our Journey</HudBadge>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[#E6E9FF]">
            The Path Forward
          </h2>
        </ScrollReveal>
      </div>

      {/* Stories */}
      {stories.map((story, index) => (
        <StorySection
          key={index}
          badge={story.badge}
          title={story.title}
          description={story.description}
          index={index}
          accentColor={story.accentColor}
        />
      ))}
    </div>
  )
}
