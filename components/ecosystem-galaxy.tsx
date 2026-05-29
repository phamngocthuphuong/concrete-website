'use client'

import { useRef, useMemo, Suspense, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { ErrorBoundary } from 'react-error-boundary'

// Protocol node component
function ProtocolNode({ position, color, name, scale = 1 }: { 
  position: [number, number, number]
  color: string
  name: string
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        {/* Glow sphere */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.35 * scale, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.15} />
        </mesh>
        {/* Main sphere */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.25 * scale, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        {/* Label */}
        <Text
          position={[0, -0.5 * scale, 0]}
          fontSize={0.12 * scale}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      </group>
    </Float>
  )
}

// Central core component
function CentralCore() {
  const coreRef = useRef<THREE.Group>(null)
  const ringRefs = useRef<THREE.Mesh[]>([])

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.002
    }
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z += 0.003 * (i % 2 === 0 ? 1 : -1)
        ring.rotation.x += 0.001 * (i % 2 === 0 ? -1 : 1)
      }
    })
  })

  return (
    <group ref={coreRef}>
      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#F4E07A"
          emissive="#F4E07A"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* Glow */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="#F4E07A" transparent opacity={0.1} />
      </mesh>

      {/* Orbital rings */}
      {[0.8, 1.2, 1.6].map((radius, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) ringRefs.current[i] = el }}
          rotation={[Math.PI * 0.5 + i * 0.3, i * 0.2, 0]}
        >
          <torusGeometry args={[radius, 0.01, 16, 100]} />
          <meshBasicMaterial color="#F4E07A" transparent opacity={0.3 - i * 0.08} />
        </mesh>
      ))}
    </group>
  )
}

// Connection beam component
function ConnectionBeam({ start, end, color }: { 
  start: [number, number, number]
  end: [number, number, number]
  color: string
}) {
  const points = useMemo(() => {
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2 + 0.5,
        (start[2] + end[2]) / 2
      ),
      new THREE.Vector3(...end)
    ).getPoints(50)
  }, [start, end])

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    return geometry
  }, [points])

  return (
    <line>
      <bufferGeometry attach="geometry" {...lineGeometry} />
      <lineBasicMaterial attach="material" color={color} transparent opacity={0.3} />
    </line>
  )
}

// Main 3D scene
function EcosystemScene() {
  const protocols = [
    { name: 'Morpho', color: '#6366f1', angle: 0 },
    { name: 'Pendle', color: '#22c55e', angle: Math.PI * 0.4 },
    { name: 'EigenLayer', color: '#8b5cf6', angle: Math.PI * 0.8 },
    { name: 'Ethena', color: '#f59e0b', angle: Math.PI * 1.2 },
    { name: 'Euler', color: '#ec4899', angle: Math.PI * 1.6 },
  ]

  const chains = [
    { name: 'Ethereum', color: '#627EEA', angle: Math.PI * 0.2 },
    { name: 'Arbitrum', color: '#28A0F0', angle: Math.PI * 0.87 },
    { name: 'Base', color: '#0052FF', angle: Math.PI * 1.53 },
  ]

  const protocolRadius = 2.5
  const chainRadius = 1.5

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#F4E07A" />

      {/* Central Concrete core */}
      <CentralCore />

      {/* Protocol nodes */}
      {protocols.map((protocol) => {
        const x = Math.cos(protocol.angle) * protocolRadius
        const z = Math.sin(protocol.angle) * protocolRadius
        return (
          <group key={protocol.name}>
            <ProtocolNode
              position={[x, 0, z]}
              color={protocol.color}
              name={protocol.name}
            />
            <ConnectionBeam
              start={[0, 0, 0]}
              end={[x, 0, z]}
              color={protocol.color}
            />
          </group>
        )
      })}

      {/* Chain nodes */}
      {chains.map((chain) => {
        const x = Math.cos(chain.angle) * chainRadius
        const z = Math.sin(chain.angle) * chainRadius
        return (
          <group key={chain.name}>
            <ProtocolNode
              position={[x, -0.5, z]}
              color={chain.color}
              name={chain.name}
              scale={0.7}
            />
            <ConnectionBeam
              start={[0, 0, 0]}
              end={[x, -0.5, z]}
              color={chain.color}
            />
          </group>
        )
      })}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />

      <Environment preset="city" />
    </>
  )
}

// 2D Fallback visualization
function FallbackVisualization() {
  const protocols = [
    { name: 'Morpho', color: '#6366f1', angle: -30 },
    { name: 'Pendle', color: '#22c55e', angle: 30 },
    { name: 'EigenLayer', color: '#8b5cf6', angle: 90 },
    { name: 'Ethena', color: '#f59e0b', angle: 150 },
    { name: 'Euler', color: '#ec4899', angle: 210 },
  ]

  const chains = [
    { name: 'Ethereum', color: '#627EEA' },
    { name: 'Arbitrum', color: '#28A0F0' },
    { name: 'Base', color: '#0052FF' },
  ]

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-background">
      {/* Central Core */}
      <motion.div 
        className="relative z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-24 h-24 rounded-full bg-[#F4E07A] flex items-center justify-center shadow-[0_0_60px_rgba(244,224,122,0.4)]">
          <span className="text-3xl font-bold text-background">C</span>
        </div>
      </motion.div>

      {/* Orbital Rings */}
      {[140, 200, 260].map((size, i) => (
        <motion.div
          key={i}
          className="absolute border border-[#F4E07A]/20 rounded-full"
          style={{ width: size * 2, height: size * 2 }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 30 + i * 10, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Protocol Nodes */}
      {protocols.map((protocol, i) => {
        const radius = 180
        const angle = (protocol.angle * Math.PI) / 180
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        return (
          <motion.div
            key={protocol.name}
            className="absolute flex flex-col items-center gap-1"
            style={{ transform: `translate(${x}px, ${y}px)` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium text-white"
              style={{ backgroundColor: protocol.color, boxShadow: `0 0 20px ${protocol.color}40` }}
            >
              {protocol.name.slice(0, 2)}
            </div>
            <span className="text-[10px] text-muted-foreground">{protocol.name}</span>
          </motion.div>
        )
      })}

      {/* Chain badges at bottom */}
      <div className="absolute bottom-8 flex gap-4">
        {chains.map((chain, i) => (
          <motion.div
            key={chain.name}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-muted-foreground/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chain.color }} />
            <span className="text-xs text-muted-foreground">{chain.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function EcosystemGalaxy() {
  const [webglSupported, setWebglSupported] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setWebglSupported(false)
      }
    } catch {
      setWebglSupported(false)
    }
  }, [])

  const showFallback = !webglSupported || hasError

  return (
    <section className="relative py-32 px-8 overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,224,122,0.03)_0%,transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F4E07A]/20 bg-[#F4E07A]/5 mb-6">
            <span className="text-sm text-[#F4E07A] font-medium">{showFallback ? 'Infrastructure View' : '3D Infrastructure View'}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ecosystem Galaxy
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the interconnected infrastructure powering institutional DeFi.
          </p>
        </motion.div>

        {/* 3D Canvas or Fallback */}
        <motion.div
          className="relative aspect-square max-w-3xl mx-auto rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10 pointer-events-none" />
          <div className="absolute inset-0 border border-[#F4E07A]/10 rounded-2xl z-10 pointer-events-none" />

          {showFallback ? (
            <FallbackVisualization />
          ) : (
            <ErrorBoundary fallback={<FallbackVisualization />} onError={() => setHasError(true)}>
              <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center bg-background">
                  <div className="text-muted-foreground">Loading 3D Environment...</div>
                </div>
              }>
                <Canvas
                  camera={{ position: [0, 2, 5], fov: 50 }}
                  dpr={[1, 2]}
                  style={{ background: 'transparent' }}
                  onCreated={({ gl }) => {
                    gl.domElement.addEventListener('webglcontextlost', () => {
                      setHasError(true)
                    })
                  }}
                >
                  <EcosystemScene />
                </Canvas>
              </Suspense>
            </ErrorBoundary>
          )}
        </motion.div>

        {/* Interaction hint */}
        {!showFallback && (
          <motion.p
            className="text-center text-sm text-muted-foreground mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            Drag to rotate • Auto-rotating view
          </motion.p>
        )}
      </div>
    </section>
  )
}
