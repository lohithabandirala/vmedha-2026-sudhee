'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Contact Us', href: '#contact' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'bg-[#080B1F]/95 backdrop-blur-lg shadow-lg border-b border-[#3A3F7A]/30' : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center gap-3">
            {/* Club Logo */}
            <a href="#" className="flex items-center group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                {/* Circular background with light blue glow (subtle, not brighter than title) */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00F2FF]/20 to-[#6366F1]/20 border-2 border-[#00F2FF] shadow-[0_0_12px_rgba(0,242,255,0.35)] transition-all duration-500 group-hover:shadow-[0_0_18px_rgba(0,242,255,0.45)] group-hover:scale-103" />
                {/* Logo image */}
                <img
                  src="/logo.png"
                  alt="VMEDHA Logo"
                  className="relative w-full h-full object-contain p-1.5 transition-transform group-hover:scale-110 duration-500 ease-out"
                />
              </div>
            </a>

            {/* Brand Name */}
            <a href="#" className="group">
              <h1 className="font-display text-xl sm:text-2xl font-bold tracking-wider bg-gradient-to-r from-[#00F2FF] via-[#6366F1] to-[#00F2FF] bg-clip-text text-transparent group-hover:from-[#6366F1] group-hover:via-[#00F2FF] group-hover:to-[#6366F1] transition-all duration-500">
                VMEDHA
              </h1>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative text-sm font-medium tracking-wide text-[#7D7DBE]/85 hover:text-[#00F2FF] transition-colors duration-300 group py-2"
              >
                {item.label}
                <span className="absolute -bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00F2FF] to-[#6366F1] group-hover:w-full group-hover:shadow-[0_6px_20px_rgba(0,242,255,0.12)] transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-[#00F2FF]/10 transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                'w-6 h-0.5 bg-[#00F2FF] transition-all duration-300 rounded-full',
                mobileOpen && 'rotate-45 translate-y-2'
              )}
            />
            <span
              className={cn(
                'w-6 h-0.5 bg-[#00F2FF] transition-all duration-300 rounded-full',
                mobileOpen && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'w-6 h-0.5 bg-[#00F2FF] transition-all duration-300 rounded-full',
                mobileOpen && '-rotate-45 -translate-y-2'
              )}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-500',
            mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="flex flex-col gap-1 py-4 border-t border-[#3A3F7A]/30">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-[#7D7DBE]/85 hover:text-[#00F2FF] hover:bg-[#00F2FF]/5 transition-all duration-300 tracking-wide font-medium rounded-lg"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
