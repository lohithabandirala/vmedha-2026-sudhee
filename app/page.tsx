'use client'

import dynamic from 'next/dynamic'
import { Navigation } from '@/components/sections/navigation'
import { HeroSection } from '@/components/sections/hero'
import { StorytellingContainer } from '@/components/sections/story-section'
import { StatsSection } from '@/components/sections/stats-section'
import { ProductsSection } from '@/components/sections/products-section'
import { TeamSection } from '@/components/sections/team-section'
import { HiringSection } from '@/components/sections/hiring-section'
import { Footer } from '@/components/sections/footer'
import { ScrollProgress } from '@/components/animations/scroll-progress'

// Dynamic import for 3D scene to avoid SSR issues
const CosmicScene = dynamic(
  () => import('@/components/three/cosmic-scene').then(mod => ({ default: mod.CosmicScene })),
  { ssr: false }
)

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#080B1F] overflow-x-hidden">
      {/* 3D Background */}
      <CosmicScene />
      
      {/* Scroll progress indicator */}
      <ScrollProgress />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Storytelling Sections with Scroll Reveals */}
        <StorytellingContainer />
        
        {/* Stats Section */}
        <StatsSection />
        
        {/* Products Section */}
        <ProductsSection />
        
        {/* Team Section */}
        <TeamSection />
        
        {/* Hiring CTA Section */}
        <HiringSection />
        
        {/* Footer */}
        <Footer />
      </div>
    </main>
  )
}
