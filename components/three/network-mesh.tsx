'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Node {
  position: THREE.Vector3
  velocity: THREE.Vector3
  connections: number[]
}

export function NetworkMesh() {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  
  const nodeCount = 80
  const connectionDistance = 4

  const { nodes, positions, linePositions } = useMemo(() => {
    const nodes: Node[] = []
    const positions = new Float32Array(nodeCount * 3)
    
    // Create nodes with random positions
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 30
      const y = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 10 - 5
      
      nodes.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.005
        ),
        connections: []
      })
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }
    
    // Calculate connections
    const linePositions: number[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position)
        if (distance < connectionDistance) {
          nodes[i].connections.push(j)
          nodes[j].connections.push(i)
          linePositions.push(
            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
          )
        }
      }
    }
    
    return { nodes, positions, linePositions: new Float32Array(linePositions) }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return
    
    const time = state.clock.elapsedTime
    const positionsAttr = pointsRef.current.geometry.attributes.position
    const linePositionsAttr = linesRef.current.geometry.attributes.position
    
    // Animate nodes
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      
      // Gentle floating motion
      node.position.x += Math.sin(time * 0.5 + i) * 0.002
      node.position.y += Math.cos(time * 0.3 + i * 0.5) * 0.002
      node.position.z += Math.sin(time * 0.2 + i * 0.3) * 0.001
      
      positionsAttr.array[i * 3] = node.position.x
      positionsAttr.array[i * 3 + 1] = node.position.y
      positionsAttr.array[i * 3 + 2] = node.position.z
    }
    
    // Update line positions
    let lineIndex = 0
    for (let i = 0; i < nodes.length; i++) {
      for (const j of nodes[i].connections) {
        if (j > i) {
          linePositionsAttr.array[lineIndex * 6] = nodes[i].position.x
          linePositionsAttr.array[lineIndex * 6 + 1] = nodes[i].position.y
          linePositionsAttr.array[lineIndex * 6 + 2] = nodes[i].position.z
          linePositionsAttr.array[lineIndex * 6 + 3] = nodes[j].position.x
          linePositionsAttr.array[lineIndex * 6 + 4] = nodes[j].position.y
          linePositionsAttr.array[lineIndex * 6 + 5] = nodes[j].position.z
          lineIndex++
        }
      }
    }
    
    positionsAttr.needsUpdate = true
    linePositionsAttr.needsUpdate = true
  })

  return (
    <group>
      {/* Network nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodeCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#00F2FF"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      
      {/* Network connections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00D2C8"
          transparent
          opacity={0.15}
        />
      </lineSegments>
    </group>
  )
}
