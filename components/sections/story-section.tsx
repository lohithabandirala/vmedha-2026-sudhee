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
  rounds?: string
  timeline?: string
  registerHref?: string
  accentColor?: 'cyan' | 'teal' | 'lavender'
}

export function StorySection({
  badge,
  title,
  description,
  index,
  rounds,
  timeline,
  registerHref,
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
          <div className="text-lg md:text-xl text-[#7D7DBE] leading-relaxed max-w-2xl">
            <p>{description}</p>
            {typeof rounds !== 'undefined' && <p className="mt-3 text-sm text-[#E6E9FF]/80">Rounds: <span className="text-[#7D7DBE]">{rounds}</span></p>}
            {typeof timeline !== 'undefined' && <p className="mt-1 text-sm text-[#E6E9FF]/80">Timeline: <span className="text-[#7D7DBE]">{timeline}</span></p>}
            {registerHref && (
              <div className="mt-4">
                <a href={registerHref} className="inline-block">
                  <button className="btn-primary">Register Now</button>
                </a>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Decorative element */}
        <ScrollReveal delay={600} direction="left">
          <div className="mt-12 flex items-center gap-4">
            <div
              className="w-16 h-[2px]"
              style={{ background: `linear-gradient(90deg, ${color.primary}, transparent)` }}
            />
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
      badge: 'DSA Masters',
      title: 'Data Structures & Algorithms Challenge',
      description: 'A multi-stage coding competition testing algorithmic skill and speed.',
      rounds: '3 Rounds',
      timeline: 'TBA',
      registerHref: '/register/dsa-masters',
      accentColor: 'cyan' as const
    },
    {
      badge: 'Cipherville',
      title: 'Cryptography & Forensics Puzzle Hunt',
      description: 'A challenge of wits focused on decoding, analysis, and puzzle-solving.',
      rounds: '3 Rounds',
      timeline: 'TBA',
      registerHref: '/register/cipherville',
      accentColor: 'teal' as const
    },
    {
      badge: 'Ethitech Mania',
      title: 'Ethics, Innovation & Impact Sprint',
      description: 'Collaborative event exploring ethical dimensions of tech through ideation and pitches.',
      rounds: '3 Phases',
      timeline: 'TBA',
      registerHref: '/register/ethitech-mania',
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
