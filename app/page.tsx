'use client'

import { useEffect, useState } from 'react'


import dynamic from 'next/dynamic'
import { ViewportLazy } from '@/components/utils/view-port-lazy'
import { Navigation } from '@/components/sections/navigation'
import { Hero } from '@/components/sections/hero'


// Dynamic import for 3D scene to avoid SSR issues
const CosmicScene = dynamic(
  () => import('@/components/three/cosmic-scene').then(mod => ({ default: mod.CosmicScene })),
  { ssr: false }
)
const Roadmap = dynamic(() => import('@/components/sections/roadmap').then(mod => ({ default: mod.Roadmap })), { ssr: false })
const Sponsors = dynamic(() => import('@/components/sections/sponsors').then(mod => ({ default: mod.Sponsors })), { ssr: false })
const Faq = dynamic(() => import('@/components/sections/faq').then(mod => ({ default: mod.Faq })), { ssr: false })

// Lazy load below-the-fold components
const About = dynamic(() => import('@/components/sections/about').then(mod => ({ default: mod.About })), { ssr: false })
const Events = dynamic(() => import('@/components/sections/events').then(mod => ({ default: mod.Events })), { ssr: false })
const Footer = dynamic(() => import('@/components/sections/footer').then(mod => ({ default: mod.Footer })), { ssr: false })
const ScrollProgress = dynamic(() => import('@/components/animations/scroll-progress').then(mod => ({ default: mod.ScrollProgress })), { ssr: false })

export default function HomePage() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Only mount 3D scene on larger screens
    // Matching tailwind 'md' breakpoint (768px)
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#080B1F]">
      {/* Base Background - Midnight Indigo */}
      <div className="fixed inset-0 bg-[#080B1F] -z-20" />

      {/* Atmospheric Depth Layer - Deep Space Blue gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#1A1C3D]/50 via-[#080B1F] to-[#080B1F] -z-10" />

      {/* 3D Cosmic Background Scene - Desktop only for performance */}
      {isDesktop && (
        <div className="hidden md:block">
          <CosmicScene />
        </div>
      )}

      {/* Scroll progress indicator with Electric Cyan */}
      <ScrollProgress />

      {/* Navigation Header */}
      <Navigation />

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section - Immersive cosmic entry */}
        <Hero />

        {/* About Section - Who we are */}
        <div id="about">
          <ViewportLazy minHeight="80vh">
            <About />
          </ViewportLazy>
        </div>

        {/* Events Section - Our events cards */}
        <div id="events">
          <ViewportLazy minHeight="100vh">
            <Events />
          </ViewportLazy>
        </div>

        {/* Roadmap Section - The Journey timeline */}
        <div id="timeline">
          <ViewportLazy minHeight="100vh">
            <Roadmap />
          </ViewportLazy>
        </div>

        {/* Sponsors Section */}
        <ViewportLazy minHeight="40vh">
          <Sponsors />
        </ViewportLazy>

        {/* FAQ Section */}
        <ViewportLazy minHeight="50vh">
          <Faq />
        </ViewportLazy>

        {/* Footer */}
        <div id="contact">
          <ViewportLazy minHeight="40vh">
            <Footer />
          </ViewportLazy>
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
