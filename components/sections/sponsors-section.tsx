'use client'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { HudFrame, HudBadge } from '@/components/ui/hud-frame'

// Single sponsor - update with actual sponsor details
const sponsor = {
    name: 'Our Sponsor',
    logo: '/sponsors/swinfy.jpeg',
    website: '#'
}

export function SponsorsSection() {
    return (
        <section id="sponsors" className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3A3F7A] to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3A3F7A] to-transparent" />
            </div>

            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-12">
                    <ScrollReveal>
                        <HudBadge variant="accent" className="mb-4">OUR PARTNER</HudBadge>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <h2 className="text-2xl md:text-4xl font-display font-bold text-[#E6E9FF] mb-3">
                            Powered by <span className="text-[#00F2FF] text-glow-cyan">Innovation</span>
                        </h2>
                    </ScrollReveal>
                </div>

                {/* Single Sponsor Card - Full Rectangle Banner Style */}
                <ScrollReveal delay={200}>
                    <div className="flex justify-center">
                        <a
                            href={sponsor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block w-full max-w-md mx-auto"
                        >
                            {/* Decorative glow behind */}
                            <div className="absolute inset-0 bg-[#00F2FF]/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <HudFrame
                                className="relative p-2 bg-transparent border-[#3A3F7A] group-hover:border-[#00F2FF]/50 transition-colors duration-300"
                            >
                                {/* Wide rectangular container - 3:1 aspect ratio */}
                                <div className="relative aspect-[3/1] w-full overflow-hidden rounded bg-black/40 group-hover:bg-black/30 transition-colors duration-300">
                                    <img
                                        src={sponsor.logo}
                                        alt={sponsor.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            target.parentElement!.innerHTML = `<span class="text-[#E6E9FF] text-xl font-display font-bold text-center flex items-center justify-center h-full w-full">${sponsor.name}</span>`;
                                        }}
                                    />
                                </div>
                            </HudFrame>
                        </a>
                    </div>
                </ScrollReveal>

                {/* Become a Sponsor CTA */}
                <ScrollReveal delay={300}>
                    <div className="mt-10 text-center">
                        <p className="text-[#7D7DBE] text-sm mb-3">Want to partner with us?</p>
                        <a
                            href="https://vmedha-cbit.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2 text-sm border border-[#3A3F7A] text-[#7D7DBE] hover:border-[#00F2FF] hover:text-[#00F2FF] transition-all duration-300"
                        >
                            Become a Sponsor
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
