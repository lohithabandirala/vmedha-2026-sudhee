'use client'

import React from 'react'
import Image from 'next/image'
import { Instagram, Linkedin, Globe, MapPin, Mail, Phone } from 'lucide-react'
import { HudBadge } from '@/components/ui/hud-frame'
import { FOOTER_STARS } from '@/lib/seeded-random'

const footerStats = [
  { icon: <Instagram size={24} />, link: "https://www.instagram.com/cbit.vmedha/#", label: "Instagram" },
  { icon: <Linkedin size={24} />, link: "https://in.linkedin.com/company/vmedha-cbit", label: "LinkedIn" },
  { icon: <Globe size={24} />, link: "https://vmedha-cbit.org/", label: "Website" }
]

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "#about" },
  { name: "Events", path: "#events" },
  { name: "Contact Us", path: "#contact" }
]

export function Footer() {
  return (
    <footer id="contact" className="relative pt-20 pb-8 px-6 border-t border-[#3A3F7A]/30">
      {/* Atmospheric background with Deep Space Blue */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080B1F] via-[#1A1C3D]/30 to-transparent pointer-events-none" />

      {/* Subtle glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#00D2C8]/10 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Branding */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/logo1.png"
                  alt="VMedha Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <h2 className="text-3xl font-extrabold tracking-[2px] bg-gradient-to-r from-[#E6E9FF] to-[#00F2FF] bg-clip-text text-transparent">
                  VMEDHA
                </h2>
              </div>
              <p className="text-[#7D7DBE] leading-relaxed mb-4">
                Fostering innovation and technical excellence at CBIT. Join us in exploring the frontiers of technology.
              </p>
              <HudBadge variant="accent" className="animate-pulse-glow">
                <span className="text-[#E6E9FF]">We're Building</span>
              </HudBadge>
            </div>

            <div className="flex gap-4">
              {footerStats.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E6E9FF] p-2.5 bg-white/5 rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 hover:bg-[#00F2FF] hover:text-[#080B1F] hover:-translate-y-[3px] hover:shadow-[0_0_15px_#00F2FF] cursor-pointer"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="font-display text-sm tracking-wider text-[#E6E9FF] mb-2 uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00D2C8] rounded-full animate-pulse-glow" />
              Quick Links
            </h3>
            <ul className="list-none p-0 flex flex-col gap-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-[#7D7DBE] hover:text-[#00F2FF] transition-all duration-300 text-sm hover:translate-x-1 inline-block cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="flex flex-col gap-6">
            <h3 className="font-display text-sm tracking-wider text-[#E6E9FF] mb-2 uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00D2C8] rounded-full animate-pulse-glow" />
              Contact Us
            </h3>
            <div className="flex flex-col gap-5">
              <div className="flex gap-4 items-start">
                <MapPin size={20} className="text-[#00F2FF] shrink-0 mt-1" />
                <span className="text-[#7D7DBE] leading-relaxed text-sm">
                  Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad
                </span>
              </div>
              <div className="flex gap-4 items-center">
                <Mail size={20} className="text-[#00F2FF] shrink-0" />
                <a
                  href="mailto:vmedhaofficial@gmail.com"
                  className="text-[#7D7DBE] no-underline transition-colors duration-300 hover:text-[#00F2FF] cursor-pointer text-sm"
                >
                  vmedhaofficial@gmail.com
                </a>
              </div>

              <div className="mt-4">
                <h4 className="text-[12px] font-bold text-[#00F2FF] uppercase tracking-[2px] mb-4 flex items-center gap-2">
                  <Phone size={14} className="text-[#00F2FF]" /> Contacts
                </h4>
                {/* Individual Contacts - Side by Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="group transition-all duration-300 border border-white/10 rounded-xl p-3 hover:border-[#00F2FF]/40 bg-white/5">
                    <p className="text-[#E6E9FF] font-bold text-sm leading-tight mb-0.5 group-hover:text-[#00F2FF] transition-colors">Sai Prakash</p>
                    <p className="text-[#7D7DBE] text-[9px] uppercase tracking-wider mb-2">General Secretary</p>
                    <a
                      href="tel:8341264462"
                      className="text-[#00F2FF] font-mono text-[11px] tracking-tight no-underline hover:text-[#00D2C8] transition-colors block"
                    >
                      +91 83412 64462
                    </a>
                  </div>

                  <div className="group transition-all duration-300 border border-white/10 rounded-xl p-3 hover:border-[#00F2FF]/40 bg-white/5">
                    <p className="text-[#E6E9FF] font-bold text-sm leading-tight mb-0.5 group-hover:text-[#00F2FF] transition-colors">Sai Manoj</p>
                    <p className="text-[#7D7DBE] text-[9px] uppercase tracking-wider mb-2">Tech Team Head</p>
                    <a
                      href="tel:8919312156"
                      className="text-[#00F2FF] font-mono text-[11px] tracking-tight no-underline hover:text-[#00D2C8] transition-colors block"
                    >
                      +91 89193 12156
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider with Electric Cyan gradient */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#00F2FF]/40 to-transparent mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00D2C8]/40 to-transparent animate-pulse" />
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[#7D7DBE] text-sm flex items-center gap-2">
            <span className="text-[#E6E9FF]">©</span> {new Date().getFullYear()} Vive-Le-Tech | VMedha Club.

          </div>

          {/* Connect button with Neon Teal accent */}
          <a
            href="#contact"
            className="group flex items-center gap-3 px-6 py-2 rounded-lg border border-[#3A3F7A] hover:border-[#00D2C8] bg-[#1A1C3D]/30 hover:bg-[#00D2C8]/10 transition-all duration-300"
          >
            <span className="text-sm tracking-wider uppercase text-[#7D7DBE] group-hover:text-[#00F2FF] transition-colors">
              Let's Connect
            </span>
            <span className="w-8 h-[2px] bg-gradient-to-r from-[#00F2FF] to-[#00D2C8] group-hover:w-12 transition-all duration-300" />
          </a>
        </div>

        <div className="mt-8 flex justify-center gap-2 opacity-30">
          {FOOTER_STARS.map((star, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-[#E6E9FF]"
              style={{
                opacity: star.opacity,
                animation: `twinkle ${star.duration}s ease-in-out infinite`,
                animationDelay: `${star.delay}s`
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  )
}
