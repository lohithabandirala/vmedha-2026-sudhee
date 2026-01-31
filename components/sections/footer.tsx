'use client'

import { HudBadge } from '@/components/ui/hud-frame'

const footerLinks = {
  products: [
    { label: 'OpenCore Platform', href: '#' },
    { label: 'SysFlow Analytics', href: '#' },
    { label: 'DevConnect Suite', href: '#' },
    { label: 'API Documentation', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#careers' },
    { label: 'Blog', href: '#' },
    { label: 'Press Kit', href: '#' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'Support', href: '#' },
    { label: 'Status', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer id="contact" className="relative pt-20 pb-8 px-6 border-t border-[#3A3F7A]/30">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080B1F] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="lg:max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 border-2 border-[#00F2FF] rotate-45" />
                <div className="absolute inset-2 bg-[#00F2FF]/20 rotate-45" />
              </div>
              <span className="font-display text-2xl tracking-wider text-[#E6E9FF]">
                OPENSYS
              </span>
            </div>
            <p className="text-[#7D7DBE] mb-6">
              Building open systems for an open future. Long live tech.
            </p>
            <div className="flex gap-2">
              <HudBadge variant="accent">{"We're Hiring"}</HudBadge>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-display text-sm tracking-wider text-[#E6E9FF] mb-4 uppercase">Products</h4>
              <ul className="space-y-3">
                {footerLinks.products.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[#7D7DBE] hover:text-[#00F2FF] transition-colors duration-300 text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm tracking-wider text-[#E6E9FF] mb-4 uppercase">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[#7D7DBE] hover:text-[#00F2FF] transition-colors duration-300 text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm tracking-wider text-[#E6E9FF] mb-4 uppercase">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[#7D7DBE] hover:text-[#00F2FF] transition-colors duration-300 text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm tracking-wider text-[#E6E9FF] mb-4 uppercase">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[#7D7DBE] hover:text-[#00F2FF] transition-colors duration-300 text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#3A3F7A] to-transparent mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[#7D7DBE] text-sm">
            © {new Date().getFullYear()} OpenSys. All rights reserved.
          </div>

          {/* Connect button */}
          <a
            href="#contact"
            className="group flex items-center gap-3 text-[#E6E9FF] hover:text-[#00F2FF] transition-colors duration-300"
          >
            <span className="text-sm tracking-wider uppercase">{"Let's Connect"}</span>
            <span className="w-8 h-[1px] bg-current group-hover:w-12 transition-all duration-300" />
          </a>
        </div>
      </div>
    </footer>
  )
}
