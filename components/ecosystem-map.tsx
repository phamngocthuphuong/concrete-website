'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBlockchainStore, formatCurrency, protocols, chains } from '@/lib/blockchain-data'

interface NodePosition {
  x: number
  y: number
  id: string
  name: string
  type: 'protocol' | 'chain'
  color: string
}

export function EcosystemMap() {
  const { protocolData, chainData } = useBlockchainStore()
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Position nodes in a circular layout
  const centerX = 50
  const centerY = 50
  const protocolRadius = 35
  const chainRadius = 20

  const protocolNodes: NodePosition[] = protocols.map((p, i) => ({
    x: centerX + protocolRadius * Math.cos((i / protocols.length) * 2 * Math.PI - Math.PI / 2),
    y: centerY + protocolRadius * Math.sin((i / protocols.length) * 2 * Math.PI - Math.PI / 2),
    id: p.id,
    name: p.name,
    type: 'protocol',
    color: p.color,
  }))

  const chainNodes: NodePosition[] = chains.map((c, i) => ({
    x: centerX + chainRadius * Math.cos((i / chains.length) * 2 * Math.PI + Math.PI / 6),
    y: centerY + chainRadius * Math.sin((i / chains.length) * 2 * Math.PI + Math.PI / 6),
    id: c.id,
    name: c.name,
    type: 'chain',
    color: c.color,
  }))

  const allNodes = [...protocolNodes, ...chainNodes]

  return (
    <section id="ecosystem" className="relative py-32 px-8 overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 infrastructure-grid opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,224,122,0.05)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F4E07A]/20 bg-[#F4E07A]/5 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-sm text-[#F4E07A] font-medium">Live Infrastructure</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Interactive Ecosystem Map
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visualize the institutional infrastructure connecting protocols, chains, and liquidity flows in real-time.
          </p>
        </motion.div>

        {/* Map container */}
        <div className="relative aspect-square max-w-4xl mx-auto">
          {/* SVG connections */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {/* Connection lines from center to protocols */}
            {protocolNodes.map((node) => (
              <motion.line
                key={`line-${node.id}`}
                x1={centerX}
                y1={centerY}
                x2={node.x}
                y2={node.y}
                stroke={hoveredNode === node.id ? '#F4E07A' : 'rgba(244,224,122,0.15)'}
                strokeWidth={hoveredNode === node.id ? 0.3 : 0.15}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            ))}
            {/* Connection lines from center to chains */}
            {chainNodes.map((node) => (
              <motion.line
                key={`line-${node.id}`}
                x1={centerX}
                y1={centerY}
                x2={node.x}
                y2={node.y}
                stroke={hoveredNode === node.id ? node.color : 'rgba(244,224,122,0.1)'}
                strokeWidth={hoveredNode === node.id ? 0.3 : 0.1}
                strokeDasharray="1 0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
            ))}
            {/* Animated pulse circles */}
            <circle cx={centerX} cy={centerY} r="3" fill="none" stroke="rgba(244,224,122,0.2)" strokeWidth="0.2">
              <animate attributeName="r" values="3;8;3" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* Center node (Concrete) */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#F4E07A]/20 rounded-full blur-2xl scale-150" />
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F4E07A]/30 to-[#F4E07A]/5 border border-[#F4E07A]/30 flex items-center justify-center">
                <span className="text-[#F4E07A] font-bold text-lg">C</span>
              </div>
            </div>
          </motion.div>

          {/* Protocol nodes */}
          {protocolNodes.map((node, index) => {
            const data = protocolData[node.id]
            return (
              <motion.div
                key={node.id}
                className="absolute z-10"
                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className={`relative cursor-pointer transition-transform duration-300 ${hoveredNode === node.id ? 'scale-125' : ''}`}>
                  {/* Glow */}
                  <div
                    className="absolute inset-0 rounded-full blur-xl opacity-40"
                    style={{ backgroundColor: node.color }}
                  />
                  {/* Node */}
                  <div
                    className="relative w-14 h-14 rounded-full flex items-center justify-center border"
                    style={{
                      backgroundColor: `${node.color}20`,
                      borderColor: `${node.color}50`,
                    }}
                  >
                    <span className="text-xs font-semibold text-foreground">{node.name.slice(0, 2)}</span>
                  </div>
                  {/* Pulse */}
                  <motion.div
                    className="absolute inset-0 rounded-full border"
                    style={{ borderColor: node.color }}
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredNode === node.id && data && (
                    <motion.div
                      className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-30"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="glass-panel rounded-lg p-4 min-w-[200px] text-sm">
                        <div className="font-semibold mb-2" style={{ color: node.color }}>{node.name}</div>
                        <div className="space-y-1 text-muted-foreground">
                          <div className="flex justify-between">
                            <span>TVL:</span>
                            <span className="text-foreground">{formatCurrency(data.tvl)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Utilization:</span>
                            <span className="text-foreground">{data.utilization.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>APY:</span>
                            <span className="text-[#22c55e]">{data.apy.toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Vaults:</span>
                            <span className="text-foreground">{data.activeVaults}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}

          {/* Chain nodes */}
          {chainNodes.map((node, index) => {
            const data = chainData[node.id]
            return (
              <motion.div
                key={node.id}
                className="absolute z-10"
                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className={`relative cursor-pointer transition-transform duration-300 ${hoveredNode === node.id ? 'scale-125' : ''}`}>
                  {/* Node */}
                  <div
                    className="relative w-10 h-10 rounded-lg flex items-center justify-center border"
                    style={{
                      backgroundColor: `${node.color}15`,
                      borderColor: `${node.color}40`,
                    }}
                  >
                    <span className="text-xs font-medium text-foreground">{node.name.slice(0, 1)}</span>
                  </div>
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredNode === node.id && data && (
                    <motion.div
                      className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-30"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="glass-panel rounded-lg p-4 min-w-[180px] text-sm">
                        <div className="font-semibold mb-2" style={{ color: node.color }}>{node.name}</div>
                        <div className="space-y-1 text-muted-foreground">
                          <div className="flex justify-between">
                            <span>TVL:</span>
                            <span className="text-foreground">{formatCurrency(data.tvl)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>24h Txns:</span>
                            <span className="text-foreground">{(data.transactions24h / 1000).toFixed(0)}K</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Users:</span>
                            <span className="text-foreground">{(data.activeUsers / 1000).toFixed(0)}K</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Legend */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Protocols:</span>
            {protocols.map((p) => (
              <div key={p.id} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-sm">{p.name}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Chains:</span>
            {chains.map((c) => (
              <div key={c.id} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: c.color }} />
                <span className="text-sm">{c.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
