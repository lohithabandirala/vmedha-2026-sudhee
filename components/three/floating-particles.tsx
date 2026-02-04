'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FloatingParticlesProps {
  count?: number
}

export function FloatingParticles({ count = 200 }: FloatingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const colors = new Float32Array(count * 3)

    const colorCyan = new THREE.Color('#00F2FF')
    const colorTeal = new THREE.Color('#00D2C8')
    const colorWhite = new THREE.Color('#E6E9FF')

    for (let i = 0; i < count; i++) {
      // Spread particles across the scene
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5

      // Random sizes
      sizes[i] = Math.random() * 0.1 + 0.02

      // Random colors from palette
      const colorChoice = Math.random()
      let color: THREE.Color
      if (colorChoice < 0.3) {
        color = colorCyan
      } else if (colorChoice < 0.6) {
        color = colorTeal
      } else {
        color = colorWhite
      }

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, sizes, colors }
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return

    const time = state.clock.elapsedTime
    const positionsAttr = pointsRef.current.geometry.attributes.position

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Gentle floating animation
      positionsAttr.array[i3 + 1] += Math.sin(time * 0.2 + i * 0.1) * 0.003
      positionsAttr.array[i3] += Math.cos(time * 0.1 + i * 0.05) * 0.002

      // Wrap around when out of bounds
      if (positionsAttr.array[i3 + 1] > 15) {
        positionsAttr.array[i3 + 1] = -15
      }
      if (positionsAttr.array[i3 + 1] < -15) {
        positionsAttr.array[i3 + 1] = 15
      }
    }

    positionsAttr.needsUpdate = true

    // Rotate the entire particle system slowly
    pointsRef.current.rotation.y = time * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
