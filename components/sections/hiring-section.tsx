'use client'

import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { HudFrame, HudBadge, HudButton } from '@/components/ui/hud-frame'

export function HiringSection() {
  return (
    <section id="careers" className="py-32 px-6 relative overflow-hidden">
      {/* Animated background lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#00F2FF]/20 to-transparent" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-[#00D2C8]/20 to-transparent" />
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#00F2FF]/20 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <HudFrame className="text-center py-16 px-8" glowing>
            {/* Badge */}
            <div className="mb-6">
              <HudBadge variant="accent">{"We're Hiring!"}</HudBadge>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-6xl font-display font-bold text-[#E6E9FF] mb-6">
              Innovators <span className="text-[#00F2FF] text-glow-cyan">Wanted!</span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-[#7D7DBE] max-w-2xl mx-auto mb-8 leading-relaxed">
              Expect minimal safety nets, relentless challenges, and countless late-night pivots. 
              {"It's"} raw, {"it's"} risky, and {"it's"} all about bold innovation. 
              If {"you're"} ready to learn, pivot, and lead — join us.
            </p>

            {/* Email */}
            <div className="mb-8">
              <span className="text-[#00D2C8] font-mono text-lg">
                careers@opensys.tech
              </span>
            </div>

            {/* CTA */}
            <HudButton variant="primary" href="#careers">
              Explore Open Roles
            </HudButton>

            {/* Decorative corner elements */}
            <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[#00F2FF]/30" />
            <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-[#00F2FF]/30" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-[#00F2FF]/30" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#00F2FF]/30" />
          </HudFrame>
        </ScrollReveal>
      </div>
    </section>
  )
}
