'use client'

import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { HudFrame, HudBadge, HudButton } from '@/components/ui/hud-frame'

interface ProductCardProps {
  title: string
  description: string
  features: string[]
  badges: string[]
  index: number
  ctaText: string
  ctaHref: string
}

function ProductCard({
  title,
  description,
  features,
  badges,
  index,
  ctaText,
  ctaHref
}: ProductCardProps) {
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
  const products = [
    {
      title: 'OpenCore Platform',
      description: 'Our flagship development platform that provides the foundation for building scalable, interconnected systems.',
      features: [
        'Modular architecture',
        'Real-time collaboration',
        'Enterprise-grade security',
        'API-first design'
      ],
      badges: ['Platform', 'Enterprise'],
      ctaText: 'Explore Platform',
      ctaHref: '#'
    },
    {
      title: 'SysFlow Analytics',
      description: 'Advanced analytics and monitoring solution designed to give you deep insights into your systems performance.',
      features: [
        'Real-time dashboards',
        'Predictive analytics',
        'Custom alerts',
        'Historical data analysis'
      ],
      badges: ['Analytics', 'AI-Powered'],
      ctaText: 'Try Analytics',
      ctaHref: '#'
    },
    {
      title: 'DevConnect Suite',
      description: 'A comprehensive toolkit for developers that streamlines workflows and enhances productivity.',
      features: [
        'IDE integrations',
        'Code generation',
        'Team collaboration',
        'CI/CD pipelines'
      ],
      badges: ['Developer Tools', 'Free Tier'],
      ctaText: 'Get Started',
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
            <HudBadge variant="accent" className="mb-4">Our Products</HudBadge>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-[#E6E9FF] mb-6">
              Experience the <span className="text-[#00F2FF] text-glow-cyan">Future</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-xl text-[#7D7DBE] max-w-2xl mx-auto">
              Cutting-edge solutions designed to transform how you build and scale technology.
            </p>
          </ScrollReveal>
        </div>

        {/* Products grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
