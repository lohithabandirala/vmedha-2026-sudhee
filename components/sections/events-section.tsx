'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const EVENTS = [
  {
    id: 'cipherville',
    title: 'Cipherville',
    description: `A mystery-solving challenge where logic, clues,
      and hidden data guide participants to the truth.`,
    nodes: ['Decode', 'Infiltrate', 'Escape'],
    meta: '3 Rounds'
  },
  {
    id: 'dsa-masters',
    title: 'DSA Masters',
    description: `A competitive coding event focused on problem-solving
      and algorithmic thinking.`,
    nodes: ['Qualifier', 'Coding Round', 'Final Challenge'],
    meta: '3 Rounds'
  },
  {
    id: 'ethitech-mania',
    title: 'Ethitech Mania',
    description: `An event exploring the ethical side of technology
      through ideas, discussions, and innovation.`,
    nodes: ['Ideation', 'Discussion', 'Impact Pitch'],
    meta: '3 Phases'
  }
]

export function EventsSection() {
  // No interactive selection on overview cards — they are purely an overview layer
  // The journey layer below shows the S-curve path with markers and info blocks

  const journeyRef = useRef<HTMLDivElement | null>(null)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  useEffect(() => {
    const root = journeyRef.current
    if (!root || typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) (entry.target as HTMLElement).classList.add('in-view')
      })
    }, { threshold: 0.18 })

    root.querySelectorAll<HTMLElement>('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="events" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-center mb-8">
          <div className="text-sm tracking-widest text-[#E6E9FF] bg-[#0b1226]/20 px-4 py-2 rounded-full border border-[#3A3F7A]">EVENTS</div>
        </div>

        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-[#E6E9FF] mb-2">Choose Your Challenge</h2>
        <p className="text-center text-[#7D7DBE] max-w-2xl mx-auto mb-2">All events are independent. Participants may choose any event.</p>
        <p className="text-center text-[#7D7DBE]/80 max-w-2xl mx-auto mb-6">A flowing visual thread connecting the signature events — pick any challenge to participate.</p>

        {/* Events intro micro-section */}
        <div className="text-center mb-6 pt-2">
          <p className="text-sm md:text-base text-[#E6E9FF]/90 max-w-xl mx-auto">Three curated events. Pick the one you want — each is independent.</p>
        </div>

        {/* How it works mini-strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-3 text-sm text-[#7D7DBE]">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#0b1226]/40 border border-[#2f335a]">1</div>
            <div>Choose an Event</div>
          </div>
          <div className="w-px h-6 bg-[#3A3F7A]/30" />
          <div className="flex items-center gap-3 text-sm text-[#7D7DBE]">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#0b1226]/40 border border-[#2f335a]">2</div>
            <div>Follow the Journey</div>
          </div>
          <div className="w-px h-6 bg-[#3A3F7A]/30" />
          <div className="flex items-center gap-3 text-sm text-[#7D7DBE]">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent border border-[#00F2FF]">3</div>
            <div>Register & Compete</div>
          </div>
        </div>



        {/* Soft wave divider and spacing */}
        <div className="mt-12 mb-6 pointer-events-none">
          <svg className="w-full" viewBox="0 0 1440 40" preserveAspectRatio="none">
            <path d="M0,20 C360,0 1080,40 1440,20 L1440,40 L0,40 Z" fill="rgba(14,22,48,0.06)" />
          </svg>
        </div>

        {/* Spiral / Journey section (Detail layer) */}
        <div className="max-w-5xl mx-auto mt-6">
          <p className="text-center text-[#7D7DBE] mb-6">A visual connector — not a timeline. Each event is independent; choose any challenge.</p>

          {/* Explicit clarity line (visible without scrolling) */}
          <p className="text-center text-[#E6E9FF]/90 mb-4">Each event is independent. The path is a visual connector, not a sequence.</p>

          {/* Interactive connector shimmer (moved from Hero) */}
          <div className="flex justify-center mb-4">
            <div
              className="w-32 h-1 rounded-full relative overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, transparent, #00F2FF, transparent)',
                boxShadow: '0 0 20px rgba(0, 242, 255, 0.12)',
                opacity: 1
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"
                style={{ animation: 'shimmer 3s ease-in-out infinite' }}
              />
            </div>
          </div>

          <div id="event-journeys" className="space-y-12">
            {/* The connector line is left-anchored now; markers and cards align to it */}
            <div ref={journeyRef} className="relative w-full min-h-[120vh]">{/* container for intersection observer */}
              <div className="absolute inset-0 pointer-events-none journey-bg-stars" aria-hidden="true" />

              {/* Left vertical connector (animated gradient) */}
              <div className="absolute left-12 top-8 bottom-8 pointer-events-none" aria-hidden="true">
                <div className="left-connector h-full rounded-full" />
              </div>

              {/* Right-side stacked event cards (desktop) placed immediately to the right of the connector */}
              <div className="hidden md:block absolute left-40 top-12">
                <div className="flex flex-col gap-6">
                  {EVENTS.map((e) => (
                    <article key={e.id} className="journey-stack-card relative w-72 p-4 rounded-lg bg-[#0f1724]/60 border border-[#2f335a] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1">
                      <div className="stack-connector hidden md:block" aria-hidden="true" />
                      <div className="text-sm font-semibold text-[#E6E9FF] mb-1">{e.title}</div>
                      <p className="text-sm text-[#7D7DBE] mb-2 leading-snug truncate" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{e.description}</p>
                      <div className="text-xs text-[#E6E9FF]/80 mb-2">Timeline: <span className="text-[#7D7DBE]">TBA</span></div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-[#7D7DBE]">{e.meta}</div>
                        <Link href={`/register/${e.id}`} className="inline-block">
                          <button className="btn-primary">Register</button>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Mobile stacked event cards (visible on small screens) */}
              <div className="md:hidden mt-8 px-4">
                <div className="stack-top-connector md:hidden mb-4" aria-hidden="true" />
                <div className="flex flex-col gap-4">
                  {EVENTS.map((e) => (
                    <article key={e.id} className="journey-stack-card w-full p-4 rounded-lg bg-[#0f1724]/60 border border-[#2f335a] backdrop-blur-sm transition-transform duration-200">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-[#E6E9FF] mb-1">{e.title}</div>
                          <p className="text-sm text-[#7D7DBE] mb-2 leading-snug" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{e.description}</p>
                          <div className="text-xs text-[#E6E9FF]/80">Timeline: <span className="text-[#7D7DBE]">TBA</span></div>
                        </div>
                        <div className="flex-shrink-0 flex items-center">
                          <div className="text-xs text-[#7D7DBE] mr-3">{e.meta}</div>
                          <Link href={`/register/${e.id}`} className="inline-block">
                            <button className="btn-primary">Register</button>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Markers and floating info blocks spaced far apart; events are visual highlights, not a sequence */}
              {(() => {
                const order = ['dsa-masters','cipherville','ethitech-mania']
                const positions: Record<string,string> = { 'dsa-masters': '6%', 'cipherville': '50%', 'ethitech-mania': '94%' }
                return order.map((id, idx) => {
                  const e = EVENTS.find(ev => ev.id === id)!
                  return (
                    <div key={e.id} className="absolute left-0 w-full" style={{ top: positions[id] }}>
                      <div className={`flex items-center gap-4 md:gap-6 justify-start ml-20 md:ml-28`}>

                        {/* Neutral glowing marker node (reveal) — now decorative and hidden on wider screens */}
                        <div className="journey-marker reveal" role="img" aria-label={e.title} style={{ transitionDelay: `${idx * 160}ms` }} />

                      </div>
                    </div>
                  )
                })
              })()}
            </div>
          </div>
        </div>


      </div>

      {/* Background subtle grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B1F] via-[#0e1630] to-transparent opacity-60" />
      </div>
    </section>
  )
}

// helpers for path shapes (simple approximations)
function generatePath(id: string) {
  if (id === 'cipherville') {
    // spiral-like inward
    return 'M280 20 C220 40 180 60 160 80 C140 100 130 110 120 120'
  }
  if (id === 'dsa-masters') {
    // S-curve
    return 'M20 120 C120 20 200 140 300 40'
  }
  // ethitech - gentle wave
  return 'M20 40 C90 60 140 20 200 50 C240 70 300 40 320 60'
}

function nodeCoordinates(id: string, index: number) {
  if (id === 'cipherville') {
    const coords = [{ x: 240, y: 40 }, { x: 175, y: 70 }, { x: 135, y: 95 }]
    return coords[index]
  }
  if (id === 'dsa-masters') {
    const coords = [{ x: 70, y: 105 }, { x: 165, y: 65 }, { x: 250, y: 45 }]
    return coords[index]
  }
  const coords = [{ x: 50, y: 50 }, { x: 140, y: 70 }, { x: 230, y: 65 }]
  return coords[index]
}

// Larger path helpers for the detail section (scaled and smoother curves)
function generateLargePath(id: string) {
  if (id === 'cipherville') {
    // inward spiral-like curve
    return 'M580 40 C460 60 380 80 320 110 C280 130 250 140 220 160'
  }
  if (id === 'dsa-masters') {
    // gentle S-curve across the area
    return 'M40 160 C180 20 360 180 600 40'
  }
  // ethitech - wave
  return 'M20 50 C120 80 260 20 380 60 C460 90 540 50 620 70'
}

function largeNodeCoordinates(id: string, index: number) {
  if (id === 'cipherville') {
    const coords = [{ x: 460, y: 55 }, { x: 360, y: 85 }, { x: 300, y: 120 }]
    return coords[index]
  }
  if (id === 'dsa-masters') {
    const coords = [{ x: 140, y: 130 }, { x: 320, y: 70 }, { x: 500, y: 40 }]
    return coords[index]
  }
  const coords = [{ x: 80, y: 70 }, { x: 240, y: 90 }, { x: 420, y: 80 }]
  return coords[index]
}
