'use client'

import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { HudBadge, HudButton } from '@/components/ui/hud-frame'

interface TeamMemberProps {
  name: string
  role: string
  title: string
  index: number
}

function TeamMemberCard({ name, role, title, index }: TeamMemberProps) {
  return (
    <ScrollReveal delay={index * 150} direction="up">
      <div className="group relative">
        {/* Avatar placeholder with HUD style */}
        <div className="relative w-full aspect-square mb-6 overflow-hidden">
          {/* Border frame */}
          <div className="absolute inset-0 border border-[#3A3F7A] group-hover:border-[#00F2FF] transition-colors duration-500">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00F2FF]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00F2FF]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00F2FF]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00F2FF]" />
          </div>
          
          {/* Avatar background with initials */}
          <div className="absolute inset-2 bg-gradient-to-br from-[#1A1C3D] to-[#080B1F] flex items-center justify-center">
            <span className="text-6xl font-display font-bold text-[#3A3F7A] group-hover:text-[#00D2C8] transition-colors duration-500">
              {name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>

          {/* Scan line effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F2FF]/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out" />
        </div>

        {/* Info */}
        <div className="text-center">
          <h3 className="text-xl font-display font-bold text-[#E6E9FF] group-hover:text-[#00F2FF] transition-colors duration-300">
            {name}
          </h3>
          <p className="text-[#00D2C8] font-medium mt-1">{role}</p>
          <p className="text-[#7D7DBE] text-sm mt-1">{title}</p>

          {/* Social link */}
          <button className="mt-4 text-xs tracking-wider uppercase text-[#7D7DBE] hover:text-[#00F2FF] transition-colors duration-300">
            {"Let's Connect"}
          </button>
        </div>
      </div>
    </ScrollReveal>
  )
}

export function TeamSection() {
  const team = [
    {
      name: 'Alex Chen',
      role: 'Founder',
      title: 'CEO & Technical Lead'
    },
    {
      name: 'Sarah Miller',
      role: 'Co-Founder',
      title: 'Head of Strategy'
    },
    {
      name: 'James Wu',
      role: 'CTO',
      title: 'Systems Architecture'
    },
    {
      name: 'Maria Garcia',
      role: 'Lead Designer',
      title: 'UX & Brand Vision'
    }
  ]

  return (
    <section id="team" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <HudBadge variant="accent" className="mb-4">The Team</HudBadge>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-[#E6E9FF] mb-6">
              Visionary <span className="text-[#00D2C8] text-glow-teal">Leaders</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-xl text-[#7D7DBE] max-w-2xl mx-auto">
              A team committed to transforming technology with innovation and purpose.
            </p>
          </ScrollReveal>
        </div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
          {team.map((member, index) => (
            <TeamMemberCard key={index} {...member} index={index} />
          ))}
        </div>

        {/* Discover team CTA */}
        <ScrollReveal delay={600}>
          <div className="text-center">
            <HudButton variant="primary" href="#team">
              Discover Our Team
            </HudButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
