'use client'

import { useRef, useEffect, useState } from 'react'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { HudFrame, HudBadge, HudButton } from '@/components/ui/hud-frame'
import { Monitor, Lock, Zap } from 'lucide-react'

interface EventCardProps {
  day: number
  title: string
  rounds: string
  date: string
  icon: React.ReactNode
  index: number
  isVisible: boolean
  registerLink: string
}

function EventCard({ day, title, rounds, date, icon, index, isVisible, registerLink }: EventCardProps) {
  const isLeft = index % 2 === 0

  return (
    <div
      className={`absolute ${isLeft ? 'left-0 md:left-[5%]' : 'right-0 md:right-[5%]'} w-[85%] md:w-[350px] transition-all duration-700`}
      style={{
        top: `${index * 350 + 50}px`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? 'translateX(0) scale(1)' 
          : isLeft 
            ? 'translateX(-50px) scale(0.95)' 
            : 'translateX(50px) scale(0.95)',
        transitionDelay: `${index * 100}ms`
      }}
    >
      <HudFrame
        className="group hover:scale-[1.02] transition-transform duration-500"
        glowing
      >
        {/* Icon */}
        <div className="text-[#00F2FF] mb-4">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-display font-bold text-[#E6E9FF] mb-2 group-hover:text-[#00F2FF] transition-colors duration-300">
          {title}
        </h3>

        {/* Rounds */}
        <p className="text-[#E6E9FF]/80 text-sm mb-1">
          {rounds}
        </p>

        {/* Date */}
        <p className="text-[#E6E9FF]/80 text-sm mb-4">
          {date}
        </p>

        {/* Register Button */}
        <HudButton variant="primary" href={registerLink}>
          Register
        </HudButton>
      </HudFrame>
    </div>
  )
}

function StopPoint({ index, isVisible }: { index: number; isVisible: boolean }) {
  // Position dots along the path - these match the curve inflection points
  const positions = [
    { top: 170, left: 50 },  // Near card 1 (left side)
    { top: 520, left: 50 },  // Near card 2 (right side)
    { top: 870, left: 50 },  // Near card 3 (left side)
  ]
  
  return (
    <div
      className="absolute left-1/2 z-20 transition-all duration-500"
      style={{
        top: `${positions[index].top}px`,
        transform: `translateX(-50%) scale(${isVisible ? 1 : 0})`,
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${index * 150}ms`
      }}
    >
      {/* Outer glow ring */}
      {isVisible && (
        <div 
          className="absolute -inset-3 rounded-full animate-ping"
          style={{
            background: 'rgba(0, 242, 255, 0.3)',
            animationDuration: '2s',
          }}
        />
      )}
      {/* Middle glow */}
      <div 
        className="absolute -inset-2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,242,255,0.5) 0%, transparent 70%)',
        }}
      />
      {/* Main dot */}
      <div 
        className="w-5 h-5 rounded-full border-2 border-[#00F2FF] relative"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #00F2FF 0%, #00D2C8 100%)',
          boxShadow: '0 0 15px rgba(0, 242, 255, 0.8), 0 0 30px rgba(0, 242, 255, 0.4)'
        }}
      />
    </div>
  )
}

export function RoadmapSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false])
  const [pathProgress, setPathProgress] = useState(0)
  const pathRef = useRef<SVGPathElement | null>(null)
  const [measuredPathLength, setMeasuredPathLength] = useState<number>(0)

  const events = [
    {
      day: 1,
      title: 'DSA Masters CBIT',
      rounds: 'Round 1: 17th February',
      date: 'Round 2: 18th February',
      icon: <Monitor className="w-6 h-6" />,
      registerLink: '/register?event=cbit-dsa-master'
    },
    {
      day: 2,
      title: 'Cipherville',
      rounds: 'Round 1: 17th February',
      date: 'Round 2: 18th February',
      icon: <Lock className="w-6 h-6" />,
      registerLink: '/register?event=cipherville'
    },
    {
      day: 3,
      title: 'Ethitech Mania',
      rounds: 'All Three Rounds: 17th & 18th February',
      date: '',
      icon: <Zap className="w-6 h-6" />,
      registerLink: '/register?event=ethi-tech-mania'
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const windowHeight = window.innerHeight

      // Calculate scroll progress through section
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (sectionHeight + windowHeight * 0.5)))
      setPathProgress(scrollProgress)

      // Determine which cards should be visible
      const newVisibleCards = events.map((_, index) => {
        const cardThreshold = (index + 1) / (events.length + 1)
        return scrollProgress > cardThreshold * 0.6
      })
      setVisibleCards(newVisibleCards)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [events.length])

  useEffect(() => {
    const updateLength = () => {
      try {
        if (pathRef.current) {
          const len = pathRef.current.getTotalLength()
          setMeasuredPathLength(Math.max(0, Math.round(len)))
        }
      } catch (e) {
        // ignore if SVG not ready
      }
    }

    updateLength()
    window.addEventListener('resize', updateLength)
    return () => window.removeEventListener('resize', updateLength)
  }, [])

  return (
    <section ref={sectionRef} id="roadmap" className="py-32 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3A3F7A] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3A3F7A] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <ScrollReveal>
            <HudBadge variant="accent" className="mb-4">EVENT SCHEDULE</HudBadge>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-[#E6E9FF] mb-6">
              <span className="text-[#00F2FF] text-glow-cyan">Event Options</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-xl text-[#7D7DBE] max-w-2xl mx-auto">
              Two days of innovation, learning, and connection
            </p>
          </ScrollReveal>
        </div>

        {/* Roadmap container */}
        <div className="relative" style={{ height: '1100px' }}>
          {/* SVG Path - Curved line connecting cards */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[200px] md:w-[400px]"
            viewBox="0 0 400 1100"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00F2FF" />
                <stop offset="50%" stopColor="#00D2C8" />
                <stop offset="100%" stopColor="#00F2FF" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            {/* Background path (dimmed) */}
            <path
              d="M 200 16 
                 C 200 96, 80 136, 80 216 
                 C 80 296, 320 336, 320 416 
                 C 320 496, 80 536, 80 616 
                 C 80 696, 320 736, 320 816
                 C 320 896, 200 936, 200 1064"
              stroke="#3A3F7A"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            {/* Animated path (foreground) */}
            <path
              ref={(el) => (pathRef.current = el)}
              d="M 200 16 
                 C 200 96, 80 136, 80 216 
                 C 80 296, 320 336, 320 416 
                 C 320 496, 80 536, 80 616 
                 C 80 696, 320 736, 320 816
                 C 320 896, 200 936, 200 1064"
              stroke="url(#pathGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              filter="url(#glow)"
              strokeDasharray={measuredPathLength || 1200}
              strokeDashoffset={(measuredPathLength || 1200) * (1 - pathProgress)}
              style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
            />
            {/* Start point indicator (star) */}
            <g className="pointer-events-none" transform="translate(200,16)">
              <path d="M0-12 L3-4 L11-4 L5 1 L7 9 L0 4 L-7 9 L-5 1 L-11-4 L-3-4 Z" fill="#FFFFFF" />
              <path d="M0-22 L6-6 L22-6 L10 2 L14 22 L0 10 L-14 22 L-10 2 L-22-6 L-6-6 Z" fill="rgba(255,255,255,0.06)" />
            </g>
            {/* End point indicator (star) */}
            <g className="pointer-events-none" transform="translate(200,1064)">
              <path d="M0-12 L3-4 L11-4 L5 1 L7 9 L0 4 L-7 9 L-5 1 L-11-4 L-3-4 Z" fill="#FFFFFF" />
              <path d="M0-22 L6-6 L22-6 L10 2 L14 22 L0 10 L-14 22 L-10 2 L-22-6 L-6-6 Z" fill="rgba(255,255,255,0.06)" />
            </g>
          </svg>

          {/* Stop points on the path */}
          {events.map((_, index) => (
            <StopPoint 
              key={index} 
              index={index} 
              isVisible={visibleCards[index]} 
            />
          ))}

          {/* Event cards */}
          {events.map((event, index) => (
            <EventCard
              key={index}
              {...event}
              index={index}
              isVisible={visibleCards[index]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
