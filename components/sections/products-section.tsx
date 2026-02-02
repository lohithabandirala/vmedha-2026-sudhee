'use client'

import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { HudFrame, HudBadge, HudButton } from '@/components/ui/hud-frame'

interface EventCardProps {
  title: string
  description: string
  features: string[]
  badges: string[]
  index: number
  ctaText: string
  ctaHref: string
}

function EventCard({
  title,
  description,
  features,
  badges,
  index,
  ctaText,
  ctaHref
}: EventCardProps) {
  return (
    <ScrollReveal delay={index * 150} direction="up">
      <HudFrame
        className="h-full flex flex-col group hover:scale-[1.02] transition-transform duration-500"
        glowing
      >
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {badges.map((badge, i) => (
            <HudBadge key={i}>{badge}</HudBadge>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-display font-bold text-[#E6E9FF] mb-4 group-hover:text-[#00F2FF] transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[#7D7DBE] mb-6 flex-grow">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-[#E6E9FF]/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D2C8]" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <HudButton variant="primary" href={ctaHref} className="w-full">
          {ctaText}
        </HudButton>
      </HudFrame>
    </ScrollReveal>
  )
}

export function ProductsSection() {
  const events = [
    {
      title: 'DSA MASTER CBIT',
      description: 'Master data structures and algorithms with intensive hands-on sessions and expert guidance.',
      features: [
        'Industry mentors',
        'Full day sessions',
        '17th - 18th FEB',
        'Round 1 & 2'
      ],
      badges: ['Data Structures', 'Coding'],
      ctaText: 'Register',
      ctaHref: '#'
    },
    {
      title: 'Cipherville',
      description: 'Unlock the secrets of cryptography and cybersecurity in this immersive challenge.',
      features: [
        'Security experts',
        'Full day sessions',
        '17th - 18th FEB',
        'Round 1 & 2'
      ],
      badges: ['Cybersecurity', 'Cryptography'],
      ctaText: 'Register',
      ctaHref: '#'
    },
    {
      title: 'Ethitechmania',
      description: 'Explore ethical technology and AI innovation across three intensive rounds of competition and learning.',
      features: [
        'Tech leaders',
        'Full day sessions',
        '17th - 18th FEB',
        'All 3 Rounds'
      ],
      badges: ['AI/ML', 'Ethics'],
      ctaText: 'Register',
      ctaHref: '#'
    }
  ]

  return (
    <section id="products" className="py-32 px-6 relative">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3A3F7A] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3A3F7A] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <HudBadge variant="accent" className="mb-4">Experience the Future</HudBadge>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-[#E6E9FF] mb-6">
              Our <span className="text-[#00F2FF] text-glow-cyan">Events</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-xl text-[#7D7DBE] max-w-2xl mx-auto">
              Three exciting competitions and learning experiences over 17-18 February.
            </p>
          </ScrollReveal>
        </div>

        {/* Events grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={index} {...event} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
