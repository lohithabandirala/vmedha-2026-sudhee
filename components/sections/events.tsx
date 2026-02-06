'use client'

import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { HudFrame, HudBadge } from '@/components/ui/hud-frame'

interface EventCardProps {
  title: string
  description: string
  domains: string[]
  index: number
}

function EventCard({
  title,
  description,
  domains,
  index
}: EventCardProps) {
  return (
    <ScrollReveal delay={index * 150} direction="up">
      <HudFrame
        className="h-full flex flex-col group hover:scale-[1.02] transition-transform duration-500"
        glowing
      >
        {/* Domains */}
        <div className="flex flex-wrap gap-2 mb-4">
          {domains.map((domain, i) => (
            <HudBadge key={i}>{domain}</HudBadge>
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

        {/* no CTA */}
      </HudFrame>
    </ScrollReveal>
  )
}

export function Events() {
  const events = [
    {
      title: 'DSA MASTER CBIT',
      description:
        "DSA MASTER is a competitive coding challenge designed to test participants' problem-solving abilities using Data Structures and Algorithms. Players tackle time-bound problems of increasing difficulty, focusing on logic, efficiency, and optimized solutions. It's ideal for sharpening DSA skills and preparing for technical interviews.",
      domains: ['DSA', 'Coding']
    },
    {
      title: 'CIPHERVILLE',
      description:
        'Cipherville is a mystery-based problem-solving game where participants decode hidden clues to escape challenges. Players crack ciphers, analyze data, and apply logical thinking to progress through levels. Each solved clue unlocks the next mystery, testing reasoning, creativity, and teamwork.',
      domains: ['Detective Skills', 'DBMS']
    },
    {
      title: 'ETHITECH MANIA',
      description:
        'Ethitech Mania is a thought-provoking competition that challenges participants on aptitude, logical reasoning, and ethical decision-making through real-world technology scenarios. It encourages critical thinking and responsible innovation in today\'s tech-driven world.',
      domains: ['Critical Thinking & Aptitude']
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
