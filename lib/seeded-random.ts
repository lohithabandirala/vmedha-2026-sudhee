/**
 * Seeded pseudo-random number generator using a simple mulberry32 algorithm.
 * This ensures consistent random values between server and client renders,
 * preventing React hydration mismatches.
 */

export function seededRandom(seed: number): () => number {
    return () => {
        let t = seed += 0x6D2B79F5
        t = Math.imul(t ^ t >>> 15, t | 1)
        t ^= t + Math.imul(t ^ t >>> 7, t | 61)
        return ((t ^ t >>> 14) >>> 0) / 4294967296
    }
}

// Pre-generated stable values for common use cases
// These are deterministic and will be the same on server and client

export const HERO_LEFT_HUD = Array.from({ length: 6 }, (_, i) => {
    const random = seededRandom(1000 + i)
    return {
        height: 30 + random() * 50,
        opacity: 0.4 + random() * 0.4,
    }
})

export const HERO_RIGHT_HUD = Array.from({ length: 6 }, (_, i) => {
    const random = seededRandom(2000 + i)
    return {
        height: 30 + random() * 50,
        opacity: 0.4 + random() * 0.4,
    }
})

export const HERO_STARS = Array.from({ length: 30 }, (_, i) => {
    const random = seededRandom(3000 + i)
    return {
        width: random() * 3 + 1,
        height: random() * 3 + 1,
        top: random() * 80,
        left: random() * 100,
        opacity: random() * 0.6 + 0.2,
        duration: random() * 3 + 2,
        delay: random() * 2,
    }
})

export const ABOUT_STARS = Array.from({ length: 20 }, (_, i) => {
    const random = seededRandom(4000 + i)
    return {
        width: random() * 2 + 1,
        height: random() * 2 + 1,
        top: random() * 100,
        left: random() * 100,
        opacity: random() * 0.5 + 0.2,
        duration: random() * 3 + 2,
        delay: random() * 2,
    }
})

export const FOOTER_STARS = Array.from({ length: 7 }, (_, i) => {
    const random = seededRandom(5000 + i)
    return {
        opacity: 0.3 + random() * 0.5,
        duration: 2 + random() * 2,
        delay: random() * 2,
    }
})
