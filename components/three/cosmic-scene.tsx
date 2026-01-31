'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CosmicBackground } from './cosmic-background'
import { NetworkMesh } from './network-mesh'
import { FloatingParticles } from './floating-particles'

export function CosmicScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <CosmicBackground />
          <NetworkMesh />
          <FloatingParticles count={200} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#00F2FF" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00D2C8" />
        </Suspense>
      </Canvas>
    </div>
  )
}
