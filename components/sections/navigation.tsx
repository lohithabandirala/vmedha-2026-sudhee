'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'Vision', href: '#vision' },
  { label: 'Products', href: '#products' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
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
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
        scrolled ? 'bg-[#080B1F]/80 backdrop-blur-lg border-b border-[#3A3F7A]/30' : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              {/* Logo shape */}
              <div className="absolute inset-0 border-2 border-[#00F2FF] rotate-45 transition-transform group-hover:rotate-[135deg] duration-500" />
              <div className="absolute inset-2 bg-[#00F2FF]/20 rotate-45 transition-transform group-hover:rotate-[135deg] duration-500" />
            </div>
            <span className="font-display text-xl tracking-wider text-[#E6E9FF] hidden sm:block">
              OPENSYS
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative text-sm tracking-wider text-[#7D7DBE] hover:text-[#00F2FF] transition-colors duration-300 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00F2FF] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                'w-6 h-0.5 bg-[#00F2FF] transition-all duration-300',
                mobileOpen && 'rotate-45 translate-y-2'
              )}
            />
            <span
              className={cn(
                'w-6 h-0.5 bg-[#00F2FF] transition-all duration-300',
                mobileOpen && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'w-6 h-0.5 bg-[#00F2FF] transition-all duration-300',
                mobileOpen && '-rotate-45 -translate-y-2'
              )}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-500',
            mobileOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
          )}
        >
          <div className="flex flex-col gap-4 py-4 border-t border-[#3A3F7A]/30">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-[#7D7DBE] hover:text-[#00F2FF] transition-colors duration-300 tracking-wider"
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
