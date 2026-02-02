'use client'

import dynamic from 'next/dynamic'
import { Navigation } from '@/components/sections/navigation'
import { HeroSection } from '@/components/sections/hero'
import { AboutSection } from '@/components/sections/about-section'
import { ProductsSection } from '@/components/sections/products-section'
import { TeamSection } from '@/components/sections/team-section'
import { RoadmapSection } from '@/components/sections/roadmap-section'
import { Footer } from '@/components/sections/footer'
import { ScrollProgress } from '@/components/animations/scroll-progress'

// Dynamic import for 3D scene to avoid SSR issues
const CosmicScene = dynamic(
  () => import('@/components/three/cosmic-scene').then(mod => ({ default: mod.CosmicScene })),
  { ssr: false }
)

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#080B1F]">
      {/* Base Background - Midnight Indigo */}
      <div className="fixed inset-0 bg-[#080B1F] -z-20" />
      
      {/* Atmospheric Depth Layer - Deep Space Blue gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#1A1C3D]/50 via-[#080B1F] to-[#080B1F] -z-10" />
      
      {/* 3D Cosmic Background Scene */}
      <CosmicScene />
      
      {/* Scroll progress indicator with Electric Cyan */}
      <ScrollProgress />
      
      {/* Navigation Header */}
      <Navigation />
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section - Immersive cosmic entry */}
        <HeroSection />
        
        {/* About Section - Who we are */}
        <div id="about">
          <AboutSection />
        </div>
        
        {/* Events Section - Our events cards */}
        <div id="events">
          <ProductsSection />
        </div>
        
        {/* Roadmap Section - The Journey timeline */}
        <RoadmapSection />
        
        {/* Team Section */}
        <TeamSection />
        
        {/* Footer */}
        <div id="contact">
          <Footer />
        </div>
      </div>
      
      {/* Additional atmospheric effect overlay */}
      <div className="fixed inset-0 pointer-events-none -z-5">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#1A1C3D]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-[#1A1C3D]/30 to-transparent" />
      </div>
    </main>
  )
}
