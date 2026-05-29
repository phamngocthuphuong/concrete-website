'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useBlockchainStore, formatCurrency, formatNumber } from '@/lib/blockchain-data'

// Animated counter that counts up
function CountUp({ end, duration = 2000, prefix = '', suffix = '' }: { 
  end: number
  duration?: number
  prefix?: string
  suffix?: string
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(end * eased))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <>{prefix}{count.toLocaleString()}{suffix}</>
}

export function StatsSection() {
  const { totalTVL, totalVaults, totalVolume, chainData } = useBlockchainStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const totalChainTVL = Object.values(chainData).reduce((sum, c) => sum + c.tvl, 0)
  const totalTransactions = Object.values(chainData).reduce((sum, c) => sum + c.transactions24h, 0)
  const totalUsers = Object.values(chainData).reduce((sum, c) => sum + c.activeUsers, 0)

  const stats = [
    { label: 'Total Value Locked', value: totalTVL, format: 'currency' },
    { label: 'Active Vaults', value: totalVaults, format: 'number' },
    { label: '24h Volume', value: totalVolume, format: 'currency' },
    { label: 'Cross-Chain TVL', value: totalChainTVL, format: 'currency' },
    { label: '24h Transactions', value: totalTransactions, format: 'number' },
    { label: 'Active Users', value: totalUsers, format: 'number' },
  ]

  return (
    <section className="relative py-32 px-8 overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 infrastructure-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#F4E07A]/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Building The Infrastructure Layer For{' '}
            <span className="text-[#F4E07A]">Institutional On-Chain Yield</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time metrics from our integrated ecosystem of protocols, chains, and vault infrastructure.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-panel rounded-xl p-6 md:p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-[#F4E07A]">
                {stat.format === 'currency' ? (
                  formatCurrency(stat.value)
                ) : (
                  formatNumber(stat.value)
                )}
              </div>
              <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          className="glass-panel rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-center mb-8">
            <Image
              src="https://docs.concrete.xyz/img/concrete-mark.png"
              alt="Concrete"
              width={80}
              height={80}
              className="gold-glow"
            />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Access Institutional DeFi Infrastructure?
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Join the next generation of institutional yield coordination with Concrete&apos;s advanced vault infrastructure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://app.concrete.xyz"
              className="px-8 py-4 rounded-lg bg-[#F4E07A] text-background font-semibold hover:bg-[#F4E07A]/90 transition-all hover:scale-105"
            >
              Launch App
            </Link>
            <Link
              href="https://docs.concrete.xyz"
              className="px-8 py-4 rounded-lg border border-[#F4E07A]/30 text-foreground font-semibold hover:bg-[#F4E07A]/10 transition-all"
            >
              Read Documentation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Footer() {
  const links = {
    Product: ['App', 'Documentation', 'Vaults', 'Analytics'],
    Resources: ['Blog', 'Whitepaper', 'Brand Kit', 'Security'],
    Community: ['Twitter', 'Discord', 'Telegram', 'GitHub'],
    Company: ['About', 'Careers', 'Contact', 'Legal'],
  }

  return (
    <footer className="relative py-16 px-8 border-t border-border bg-background">
      <div className="absolute inset-0 infrastructure-grid opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="https://docs.concrete.xyz/img/concrete-mark.png"
                alt="Concrete"
                width={32}
                height={32}
                className="gold-glow"
              />
              <span className="text-lg font-semibold">Concrete</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Institutional yield infrastructure for the on-chain economy. Autonomous vault coordination powered by real-time blockchain intelligence.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div className="text-sm font-semibold mb-4 text-foreground">{category}</div>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 Concrete. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
