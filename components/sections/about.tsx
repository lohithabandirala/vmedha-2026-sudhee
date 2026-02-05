'use client'

import { useEffect, useState } from 'react'
import { HudBadge } from '@/components/ui/hud-frame'
import { ABOUT_STARS } from '@/lib/seeded-random'
import { Lightbulb, Users, Rocket } from 'lucide-react'

export function About() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    const element = document.getElementById('about-content')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Deep Space Blue background layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080B1F] via-[#1A1C3D] to-[#080B1F] opacity-60" />

      {/* Atmospheric glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D2C8]/10 rounded-full blur-[100px] animate-cosmic-drift" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7D7DBE]/15 rounded-full blur-[120px] animate-cosmic-drift"
        style={{ animationDelay: '5s', animationDuration: '25s' }}
      />

      <div id="about-content" className="max-w-6xl mx-auto relative z-10">
        {/* Section badge */}
        <div className="flex justify-center mb-8">
          <HudBadge variant="accent" className="animate-pulse-glow">
            <span className="text-[#E6E9FF] tracking-widest">ABOUT US</span>
          </HudBadge>
        </div>

        {/* Main heading */}
        <h2
          className="text-4xl md:text-6xl font-display font-bold text-center mb-6 transition-all duration-1000"
          style={{
            background: 'linear-gradient(135deg, #00F2FF 0%, #E6E9FF 50%, #7D7DBE 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
          }}
        >
          Where Innovation Meets Infinity
        </h2>

        {/* Subtitle */}
        <p
          className="text-xl md:text-2xl text-[#7D7DBE] text-center mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-200"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
          }}
        >
          {"We're a community of tech enthusiasts, innovators, and dreamers exploring the endless possibilities of technology."}
        </p>


        {/* Single rectangle with three sections */}
        <div className="mx-auto max-w-5xl transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)' }}>
          <div className="rounded-2xl border border-[#3A3F7A] bg-[#1A1C3D]/30 backdrop-blur-sm overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {[
                {
                  title: 'Innovation',
                  icon: <Lightbulb className="w-8 h-8" />,
                  description: 'Pushing boundaries with cutting-edge technology and creative solutions',
                  color: '#00F2FF'
                },
                {
                  title: 'Community',
                  icon: <Users className="w-8 h-8" />,
                  description: 'Building a vibrant ecosystem of learners, creators, and collaborators',
                  color: '#00D2C8'
                },
                {
                  title: 'Impact',
                  icon: <Rocket className="w-8 h-8" />,
                  description: 'Creating meaningful change through technology and innovation',
                  color: '#7D7DBE'
                }
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className={`flex-1 p-8 ${index > 0 ? 'border-t md:border-t-0 md:border-l' : ''} border-[#3A3F7A]`}
                >
                  <div className="relative">
                    <div
                      className="mb-4 inline-block"
                      style={{
                        color: feature.color,
                        filter: `drop-shadow(0 0 12px ${feature.color}80)`
                      }}
                    >
                      {feature.icon}
                    </div>

                    <h3 className="text-2xl font-display font-bold text-[#E6E9FF] mb-3">
                      {feature.title}
                    </h3>

                    <p className="text-[#7D7DBE] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom decorative line with Electric Cyan */}
        <div
          className="mt-16 h-[2px] max-w-md mx-auto rounded-full relative overflow-hidden transition-all duration-1000 delay-700"
          style={{
            background: 'linear-gradient(90deg, transparent, #00F2FF, transparent)',
            opacity: isVisible ? 1 : 0
          }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              animation: 'shimmer 3s ease-in-out infinite'
            }}
          />
        </div>
      </div>

      {/* Starlight particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {ABOUT_STARS.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#E6E9FF]"
            style={{
              width: `${star.width}px`,
              height: `${star.height}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity,
              boxShadow: '0 0 4px rgba(230, 233, 255, 0.5)',
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`
            }}
          />
        ))}
      </div>
    </section>
  )
}
