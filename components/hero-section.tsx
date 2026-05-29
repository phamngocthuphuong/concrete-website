'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useBlockchainStore, formatCurrency, formatNumber, formatPercent } from '@/lib/blockchain-data'

// Animated counter component
function AnimatedValue({ value, format = 'currency' }: { value: number; format?: 'currency' | 'number' | 'percent' }) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const duration = 1000
    const startValue = displayValue
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setDisplayValue(startValue + (value - startValue) * eased)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value])

  if (format === 'currency') return formatCurrency(displayValue)
  if (format === 'percent') return formatPercent(displayValue)
  return formatNumber(displayValue)
}

// Orbital ring component
function OrbitalRing({ size, duration, delay = 0, reverse = false, children }: { 
  size: number
  duration: number
  delay?: number
  reverse?: boolean
  children?: React.ReactNode 
}) {
  return (
    <motion.div
      className="absolute rounded-full border border-[#F4E07A]/10"
      style={{
        width: size,
        height: size,
        left: '50%',
        top: '50%',
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      initial={{ rotate: 0, opacity: 0 }}
      animate={{ rotate: reverse ? -360 : 360, opacity: 1 }}
      transition={{
        rotate: { duration, repeat: Infinity, ease: 'linear', delay },
        opacity: { duration: 2, delay },
      }}
    >
      {children}
    </motion.div>
  )
}

// Floating particle
function Particle({ delay }: { delay: number }) {
  const randomX = Math.random() * 100
  const randomDuration = 15 + Math.random() * 20

  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-[#F4E07A]/30"
      style={{ left: `${randomX}%` }}
      initial={{ y: '100vh', opacity: 0 }}
      animate={{ y: '-100vh', opacity: [0, 0.5, 0] }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay,
        ease: 'linear',
      }}
    />
  )
}

export function HeroSection() {
  const { totalTVL, totalVaults, totalVolume, protocolData, updateData } = useBlockchainStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(updateData, 15000)
    return () => clearInterval(interval)
  }, [updateData])

  // Calculate aggregate APY
  const avgApy = Object.values(protocolData).reduce((sum, p) => sum + p.apy, 0) / Object.values(protocolData).length

  if (!mounted) return null

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Background grid */}
      <div className="absolute inset-0 infrastructure-grid opacity-50" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F4E07A]/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,224,122,0.08)_0%,transparent_70%)]" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <Particle key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <Image
            src="https://docs.concrete.xyz/img/concrete-mark.png"
            alt="Concrete"
            width={40}
            height={40}
            className="gold-glow"
          />
          <span className="text-xl font-semibold tracking-tight">Concrete</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#ecosystem" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Ecosystem
          </Link>
          <Link href="#infrastructure" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Infrastructure
          </Link>
          <Link href="#vaults" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Vaults
          </Link>
          <Link href="https://app.concrete.xyz" className="px-4 py-2 rounded-lg bg-[#F4E07A] text-background font-medium text-sm hover:bg-[#F4E07A]/90 transition-colors">
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-88px)] px-8 py-20">
        {/* Central infrastructure core */}
        <div className="relative flex items-center justify-center mb-16">
          {/* Orbital rings */}
          <OrbitalRing size={400} duration={60}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#F4E07A]/60" />
          </OrbitalRing>
          <OrbitalRing size={500} duration={45} reverse>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-[#F4E07A]/40" />
          </OrbitalRing>
          <OrbitalRing size={600} duration={75}>
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#F4E07A]/30" />
          </OrbitalRing>

          {/* Glow effect */}
          <div className="absolute w-64 h-64 bg-[#F4E07A]/10 rounded-full blur-[100px]" />
          
          {/* Core logo */}
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <Image
              src="https://docs.concrete.xyz/img/concrete-mark.png"
              alt="Concrete Infrastructure Core"
              width={180}
              height={180}
              priority
              loading="eager"
              className="object-contain gold-glow-strong"
            />
          </motion.div>
        </div>

        {/* Headline */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center max-w-5xl text-balance leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="text-foreground">Institutional Yield Infrastructure</span>
          <br />
          <span className="text-[#F4E07A]">For The On-Chain Economy</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl text-pretty mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Autonomous institutional yield coordination through intelligent cross-chain vault infrastructure
          powered directly by live on-chain liquidity systems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <Link
            href="#ecosystem"
            className="px-8 py-4 rounded-lg bg-[#F4E07A] text-background font-semibold hover:bg-[#F4E07A]/90 transition-all hover:scale-105"
          >
            Explore Infrastructure
          </Link>
          <Link
            href="#vaults"
            className="px-8 py-4 rounded-lg border border-[#F4E07A]/30 text-foreground font-semibold hover:bg-[#F4E07A]/10 transition-all hover:scale-105"
          >
            View Live Vaults
          </Link>
          <Link
            href="https://app.concrete.xyz"
            className="px-8 py-4 rounded-lg border border-muted-foreground/30 text-muted-foreground font-semibold hover:border-foreground hover:text-foreground transition-all"
          >
            Launch App
          </Link>
        </motion.div>

        {/* Live metrics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <div className="glass-panel rounded-xl p-6 text-center">
            <div className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">Total TVL</div>
            <div className="text-2xl md:text-3xl font-bold text-[#F4E07A]">
              <AnimatedValue value={totalTVL} format="currency" />
            </div>
          </div>
          <div className="glass-panel rounded-xl p-6 text-center">
            <div className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">Active Vaults</div>
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              <AnimatedValue value={totalVaults} format="number" />
            </div>
          </div>
          <div className="glass-panel rounded-xl p-6 text-center">
            <div className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">24h Volume</div>
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              <AnimatedValue value={totalVolume} format="currency" />
            </div>
          </div>
          <div className="glass-panel rounded-xl p-6 text-center">
            <div className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">Avg APY</div>
            <div className="text-2xl md:text-3xl font-bold text-[#22c55e]">
              {avgApy.toFixed(1)}%
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: 'reverse' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#F4E07A]"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
