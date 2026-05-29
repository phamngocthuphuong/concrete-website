'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useBlockchainStore, formatCurrency, terminalLogs } from '@/lib/blockchain-data'

export function YieldDashboard() {
  const { protocolData, updateData } = useBlockchainStore()
  const [logs, setLogs] = useState<{ message: string; timestamp: Date }[]>([])
  const [mounted, setMounted] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    // Add initial logs
    const initialLogs = terminalLogs.slice(0, 4).map((message) => ({
      message,
      timestamp: new Date(),
    }))
    setLogs(initialLogs)

    // Periodic updates
    const interval = setInterval(() => {
      updateData()
      const randomLog = terminalLogs[Math.floor(Math.random() * terminalLogs.length)]
      setLogs((prev) => [...prev.slice(-8), { message: randomLog, timestamp: new Date() }])
    }, 3000)

    return () => clearInterval(interval)
  }, [updateData])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [logs])

  if (!mounted) return null

  const protocolArray = Object.values(protocolData)

  return (
    <section id="infrastructure" className="relative py-32 px-8 overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 infrastructure-grid opacity-20" />
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#F4E07A]/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F4E07A]/20 bg-[#F4E07A]/5 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#F4E07A] animate-pulse" />
            <span className="text-sm text-[#F4E07A] font-medium">Real-Time Telemetry</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Institutional Yield Engine
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-powered yield optimization with live protocol synchronization and autonomous rebalancing systems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Protocol metrics grid */}
          <div className="lg:col-span-2 space-y-4">
            {/* Metrics cards */}
            <div className="grid md:grid-cols-2 gap-4">
              {protocolArray.map((protocol, index) => (
                <motion.div
                  key={protocol.id}
                  className="glass-panel rounded-xl p-5 hover:border-[#F4E07A]/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F4E07A]/20 to-transparent flex items-center justify-center">
                        <span className="text-sm font-bold text-[#F4E07A]">{protocol.name.slice(0, 2)}</span>
                      </div>
                      <div>
                        <div className="font-semibold">{protocol.name}</div>
                        <div className="text-xs text-muted-foreground">Protocol</div>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${protocol.change24h >= 0 ? 'text-[#22c55e]' : 'text-red-500'}`}>
                      {protocol.change24h >= 0 ? '+' : ''}{protocol.change24h.toFixed(2)}%
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">TVL</div>
                      <div className="font-semibold text-lg">{formatCurrency(protocol.tvl)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">APY</div>
                      <div className="font-semibold text-lg text-[#22c55e]">{protocol.apy.toFixed(2)}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Utilization</div>
                      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-[#F4E07A]"
                          initial={{ width: 0 }}
                          animate={{ width: `${protocol.utilization}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                      <div className="text-xs text-right mt-1">{protocol.utilization.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Active Vaults</div>
                      <div className="font-semibold">{protocol.activeVaults}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Heatmap visualization */}
            <motion.div
              className="glass-panel rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold">Liquidity Allocation Matrix</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Low</span>
                  <div className="flex gap-0.5">
                    {[0.2, 0.4, 0.6, 0.8, 1].map((opacity) => (
                      <div
                        key={opacity}
                        className="w-4 h-3 rounded-sm"
                        style={{ backgroundColor: `rgba(244, 224, 122, ${opacity})` }}
                      />
                    ))}
                  </div>
                  <span>High</span>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {protocolArray.map((protocol) =>
                  ['Lending', 'Staking', 'LP', 'Yield'].map((strategy) => {
                    const intensity = Math.random() * 0.8 + 0.2
                    return (
                      <motion.div
                        key={`${protocol.id}-${strategy}`}
                        className="aspect-square rounded-lg relative overflow-hidden cursor-pointer group"
                        style={{ backgroundColor: `rgba(244, 224, 122, ${intensity * 0.8})` }}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: Math.random() * 0.5 }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-background/80 transition-opacity">
                          <div className="text-xs text-center p-1">
                            <div className="font-medium">{protocol.name}</div>
                            <div className="text-muted-foreground">{strategy}</div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })
                )}
              </div>
            </motion.div>
          </div>

          {/* Terminal */}
          <motion.div
            className="glass-panel rounded-xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-muted-foreground font-mono ml-2">vault_telemetry.log</span>
            </div>

            {/* Terminal content */}
            <div
              ref={terminalRef}
              className="flex-1 p-4 font-mono text-xs overflow-auto min-h-[400px] max-h-[500px]"
            >
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  className="mb-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-muted-foreground">
                    {log.timestamp.toLocaleTimeString()}
                  </span>
                  <span className="text-[#22c55e] ml-2">{log.message}</span>
                </motion.div>
              ))}
              <motion.div
                className="flex items-center gap-2"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="text-[#F4E07A]">▶</span>
                <span className="text-muted-foreground">Awaiting next sync cycle...</span>
              </motion.div>
            </div>

            {/* Status bar */}
            <div className="px-4 py-2 border-t border-border bg-muted/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="text-muted-foreground">Connected</span>
              </div>
              <span className="text-muted-foreground font-mono">
                Refresh: 15s
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
