'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function CosmicBackground() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#080B1F') },
    uColor2: { value: new THREE.Color('#1A1C3D') },
    uColor3: { value: new THREE.Color('#3A3F7A') },
  }), [])

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.elapsedTime * 0.1
    }
  })

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;

    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      
      // Create gradient from bottom to top
      float gradient = smoothstep(0.0, 1.0, uv.y);
      
      // Add subtle animated noise
      float n = noise(uv * 10.0 + uTime);
      gradient += n * 0.02;
      
      // Mix colors
      vec3 color = mix(uColor1, uColor2, gradient);
      color = mix(color, uColor3, pow(gradient, 2.0) * 0.3);
      
      // Add subtle stars
      float stars = step(0.997, noise(uv * 500.0));
      color += vec3(stars * 0.8);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `

  return (
    <mesh ref={meshRef} position={[0, 0, -20]} scale={[60, 40, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
