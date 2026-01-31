'use client'

import { useRef, useEffect, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  charDelay?: number
  once?: boolean
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

export function TextReveal({
  children,
  className,
  delay = 0,
  charDelay = 30,
  once = true,
  as: Component = 'span'
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [displayedChars, setDisplayedChars] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [once])

  useEffect(() => {
    if (!isVisible) return

    const timeout = setTimeout(() => {
      if (displayedChars < children.length) {
        const interval = setInterval(() => {
          setDisplayedChars(prev => {
            if (prev >= children.length) {
              clearInterval(interval)
              return prev
            }
            return prev + 1
          })
        }, charDelay)

        return () => clearInterval(interval)
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [isVisible, children.length, charDelay, delay, displayedChars])

  return (
    <Component ref={ref as any} className={cn(className)}>
      {children.split('').map((char, index) => (
        <span
          key={index}
          style={{
            opacity: index < displayedChars ? 1 : 0,
            transition: 'opacity 100ms ease-out'
          }}
        >
          {char}
        </span>
      ))}
    </Component>
  )
}

interface WordRevealProps {
  children: string
  className?: string
  delay?: number
  wordDelay?: number
  once?: boolean
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

export function WordReveal({
  children,
  className,
  delay = 0,
  wordDelay = 100,
  once = true,
  as: Component = 'span'
}: WordRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [once])

  const words = children.split(' ')

  return (
    <Component ref={ref as any} className={cn(className)}>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 500ms ease-out ${delay + index * wordDelay}ms, transform 500ms ease-out ${delay + index * wordDelay}ms`
          }}
        >
          {word}
          {index < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Component>
  )
}
