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
  mode: string
  venue: string
  fee: string
}

// Mobile Timeline Card Component
function MobileTimelineCard({ day, title, rounds, date, icon, index, isVisible, registerLink, mode, venue, fee }: EventCardProps) {
  return (
    <div
      className="relative pl-14 pb-10 last:pb-0 transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
        transitionDelay: `${index * 150}ms`
      }}
    >
      {/* Timeline node with event number */}
      <div
        className="absolute left-0 top-0 w-8 h-8 flex items-center justify-center z-10 transition-all duration-500"
        style={{
          transform: `scale(${isVisible ? 1 : 0})`,
          transitionDelay: `${index * 150}ms`
        }}
      >
        {/* Glow effect */}
        <div
          className="absolute w-10 h-10 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,242,255,0.2) 0%, transparent 70%)',
          }}
        />
        {/* Number circle */}
        <div
          className="w-7 h-7 rounded-full bg-[#0D0F1A] border border-[#00F2FF]/60 flex items-center justify-center relative z-10"
          style={{
            boxShadow: '0 0 12px rgba(0, 242, 255, 0.4)'
          }}
        >
          <span className="text-[#00F2FF] text-xs font-bold">{index + 1}</span>
        </div>
      </div>

      {/* Connector line to card */}
      <div
        className="absolute left-8 top-3 w-6 h-[1px] transition-all duration-500"
        style={{
          background: 'linear-gradient(90deg, rgba(0,242,255,0.5) 0%, rgba(0,242,255,0.1) 100%)',
          opacity: isVisible ? 1 : 0,
          transform: `scaleX(${isVisible ? 1 : 0})`,
          transformOrigin: 'left',
          transitionDelay: `${index * 150 + 100}ms`
        }}
      />

      {/* Card */}
      <HudFrame
        className="group hover:scale-[1.01] transition-transform duration-300"
        glowing
      >
        {/* Header with icon and title */}
        <div className="flex items-start gap-3 mb-4">
          {/* Icon container */}
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: 'rgba(0, 242, 255, 0.1)',
              border: '1px solid rgba(0, 242, 255, 0.2)'
            }}
          >
            <div className="text-[#00F2FF]">{icon}</div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-display font-bold text-[#E6E9FF] group-hover:text-[#00F2FF] transition-colors duration-300 leading-tight">
              {title}
            </h3>
          </div>
        </div>

        {/* Schedule info */}
        <div className="space-y-1 mb-3">
          <p className="text-[#E6E9FF]/70 text-sm flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[#00F2FF]/50"></span>
            {rounds}
          </p>
          {date && (
            <p className="text-[#E6E9FF]/70 text-sm flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#00F2FF]/50"></span>
              {date}
            </p>
          )}
        </div>

        {/* Event Details: Mode, Venue, Fee */}
        <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-lg bg-[#0D0F1A]/50 border border-[#3A3F7A]/30">
          <div className="text-center">
            <p className="text-[#00F2FF]/70 text-[10px] uppercase tracking-wider mb-1">Mode</p>
            <p className="text-[#E6E9FF] text-xs font-medium">{mode}</p>
          </div>
          <div className="text-center border-x border-[#3A3F7A]/30">
            <p className="text-[#00F2FF]/70 text-[10px] uppercase tracking-wider mb-1">Venue</p>
            <p className="text-[#E6E9FF] text-xs font-medium">{venue}</p>
          </div>
          <div className="text-center">
            <p className="text-[#00F2FF]/70 text-[10px] uppercase tracking-wider mb-1">Fee</p>
            <p className="text-[#00FF88] text-xs font-bold">{fee}</p>
          </div>
        </div>

        <HudButton variant="primary" href={registerLink} className="text-xs px-4 py-2">
          Register
        </HudButton>
      </HudFrame>
    </div>
  )
}

// Desktop Timeline Card Component
function DesktopEventCard({ day, title, rounds, date, icon, index, isVisible, registerLink, mode, venue, fee }: EventCardProps) {
  const isLeft = index % 2 === 0
  const desktopTop = index * 350 + 50

  return (
    <div
      className={`absolute ${isLeft ? 'left-[5%]' : 'right-[5%]'} w-[380px] transition-all duration-700`}
      style={{
        top: `${desktopTop}px`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateX(0) scale(1)'
          : isLeft
            ? 'translateX(-40px) scale(0.98)'
            : 'translateX(40px) scale(0.98)',
        transitionDelay: `${index * 100}ms`
      }}
    >
      <HudFrame
        className="group hover:scale-[1.02] transition-transform duration-300"
        glowing
      >
        {/* Event number badge */}
        <div
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center z-20"
          style={{
            background: 'linear-gradient(135deg, #00F2FF 0%, #00D2C8 100%)',
            boxShadow: '0 4px 15px rgba(0, 242, 255, 0.4)'
          }}
        >
          <span className="text-[#0D0F1A] text-sm font-bold">{index + 1}</span>
        </div>

        {/* Header section */}
        <div className="flex items-start gap-4 mb-5">
          {/* Icon with background */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 242, 255, 0.15) 0%, rgba(0, 210, 200, 0.1) 100%)',
              border: '1px solid rgba(0, 242, 255, 0.25)'
            }}
          >
            <div className="text-[#00F2FF]">{icon}</div>
          </div>

          <div className="flex-1 pt-1">
            <h3 className="text-2xl font-display font-bold text-[#E6E9FF] mb-1 group-hover:text-[#00F2FF] transition-colors duration-300">
              {title}
            </h3>
            <p className="text-[#7D7DBE] text-xs uppercase tracking-wider">Competition</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full mb-4" style={{ background: 'linear-gradient(90deg, transparent, rgba(58, 63, 122, 0.5), transparent)' }} />

        {/* Schedule details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00F2FF]/60" />
            <p className="text-[#E6E9FF]/80 text-sm">{rounds}</p>
          </div>
          {date && (
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00D2C8]/60" />
              <p className="text-[#E6E9FF]/80 text-sm">{date}</p>
            </div>
          )}
        </div>

        {/* Event Details: Mode, Venue, Fee */}
        <div className="grid grid-cols-3 gap-3 mb-5 p-4 rounded-lg bg-[#0D0F1A]/50 border border-[#3A3F7A]/30">
          <div className="text-center">
            <p className="text-[#00F2FF]/70 text-[11px] uppercase tracking-wider mb-1">Mode</p>
            <p className="text-[#E6E9FF] text-sm font-medium">{mode}</p>
          </div>
          <div className="text-center border-x border-[#3A3F7A]/30">
            <p className="text-[#00F2FF]/70 text-[11px] uppercase tracking-wider mb-1">Venue</p>
            <p className="text-[#E6E9FF] text-sm font-medium">{venue}</p>
          </div>
          <div className="text-center">
            <p className="text-[#00F2FF]/70 text-[11px] uppercase tracking-wider mb-1">Fee</p>
            <p className="text-[#00FF88] text-sm font-bold">{fee}</p>
          </div>
        </div>

        <HudButton variant="primary" href={registerLink}>
          Register Now
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
      {/* Glow effect */}
      <div
        className="absolute -inset-3 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,242,255,0.25) 0%, transparent 70%)',
        }}
      />
      {/* Number badge */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center relative"
        style={{
          background: 'linear-gradient(135deg, #00F2FF 0%, #00D2C8 100%)',
          boxShadow: '0 0 20px rgba(0, 242, 255, 0.5), 0 4px 10px rgba(0, 0, 0, 0.3)'
        }}
      >
        <span className="text-[#0D0F1A] text-sm font-bold">{index + 1}</span>
      </div>
    </div>
  )
}

// Define events outside component to prevent hydration mismatches
const eventsData = [
  {
    day: 1,
    title: 'DSA MASTER CBIT',
    rounds: 'Round 1: 17th February',
    date: 'Round 2: 18th February',
    iconType: 'monitor' as const,
    registerLink: '/register?event=dsa-masters',
    mode: 'Offline',
    venue: 'CBIT',
    fee: 'Free'
  },
  {
    day: 2,
    title: 'Cipherville',
    rounds: 'Round 1: 17th February',
    date: 'Round 2: 18th February',
    iconType: 'lock' as const,
    registerLink: '/register?event=cipherville',
    mode: 'Offline',
    venue: 'CBIT',
    fee: 'Free'
  },
  {
    day: 3,
    title: 'Ethitech Mania',
    rounds: 'All Three Rounds: 17th & 18th February',
    date: '',
    iconType: 'zap' as const,
    registerLink: '/register?event=ethitech-mania',
    mode: 'Online',
    venue: 'Anywhere',
    fee: 'Free'
  }
]

const iconMap = {
  monitor: <Monitor className="w-6 h-6" />,
  lock: <Lock className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />
}

export function RoadmapSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false])
  const [pathProgress, setPathProgress] = useState(0)
  const pathRef = useRef<SVGPathElement | null>(null)
  const [measuredPathLength, setMeasuredPathLength] = useState<number>(0)

  const events = eventsData.map(event => ({
    ...event,
    icon: iconMap[event.iconType]
  }))

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
    <section ref={sectionRef} id="roadmap" className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3A3F7A] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3A3F7A] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-20">
          <ScrollReveal>
            <HudBadge variant="accent" className="mb-4">COMPETITIONS</HudBadge>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-6xl font-display font-bold text-[#E6E9FF] mb-4 md:mb-6">
              <span className="text-[#00F2FF] text-glow-cyan">Choose Your Challenge</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl text-[#7D7DBE] max-w-2xl mx-auto">
              Three unique competitions across two action-packed days
            </p>
          </ScrollReveal>
        </div>

        {/* ===== MOBILE TIMELINE LAYOUT ===== */}
        <div className="md:hidden relative pl-4">
          {/* Vertical timeline line - connects through dot centers */}
          <div
            className="absolute left-[31px] top-[16px] w-[2px] bg-[#3A3F7A]"
            style={{ height: 'calc(100% - 280px)' }}
          />
          {/* Animated progress line */}
          <div
            className="absolute left-[31px] top-[16px] w-[2px] origin-top transition-transform duration-300"
            style={{
              height: 'calc(100% - 280px)',
              background: 'linear-gradient(180deg, #00F2FF 0%, #00D2C8 50%, #00F2FF 100%)',
              boxShadow: '0 0 8px rgba(0, 242, 255, 0.6)',
              transform: `scaleY(${pathProgress})`
            }}
          />

          {/* Mobile timeline cards */}
          {events.map((event, index) => (
            <MobileTimelineCard
              key={index}
              {...event}
              index={index}
              isVisible={visibleCards[index]}
            />
          ))}
        </div>

        {/* ===== DESKTOP CURVED PATH LAYOUT ===== */}
        <div className="hidden md:block relative h-[1100px]">
          {/* SVG Path - Curved line connecting cards */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[400px]"
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
              ref={(el) => { pathRef.current = el }}
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

          {/* Desktop event cards */}
          {events.map((event, index) => (
            <DesktopEventCard
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

