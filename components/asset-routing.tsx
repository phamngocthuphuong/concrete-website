'use client'

import { motion } from 'framer-motion'

const flowStages = [
  {
    id: 'custody',
    title: 'Custody Layer',
    description: 'Enterprise-grade asset custody with institutional security standards',
    icon: '🔐',
  },
  {
    id: 'allocation',
    title: 'Allocation Engine',
    description: 'AI-powered capital allocation across optimized vault strategies',
    icon: '⚡',
  },
  {
    id: 'vaults',
    title: 'Vault Strategies',
    description: 'ERC-4626 compliant vaults with automated yield optimization',
    icon: '📊',
  },
  {
    id: 'yield',
    title: 'Yield Optimization',
    description: 'Real-time APY maximization through cross-protocol routing',
    icon: '📈',
  },
  {
    id: 'rebalancing',
    title: 'Autonomous Rebalancing',
    description: 'Continuous portfolio optimization based on market conditions',
    icon: '🔄',
  },
]

export function AssetRouting() {
  return (
    <section className="relative py-32 px-8 overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 infrastructure-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F4E07A]/5 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F4E07A]/20 bg-[#F4E07A]/5 mb-6">
            <span className="text-sm text-[#F4E07A] font-medium">Capital Flow Architecture</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Asset Routing Infrastructure
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visualize how institutional capital flows through our secure infrastructure layers.
          </p>
        </motion.div>

        {/* Flow visualization */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#F4E07A]/30 to-transparent hidden md:block" />

          {/* Flow stages */}
          <div className="space-y-8 md:space-y-0">
            {flowStages.map((stage, index) => (
              <motion.div
                key={stage.id}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <motion.div
                    className="glass-panel rounded-xl p-6 inline-block max-w-md"
                    whileHover={{ scale: 1.02, borderColor: 'rgba(244, 224, 122, 0.3)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl mb-3">{stage.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-[#F4E07A]">{stage.title}</h3>
                    <p className="text-muted-foreground">{stage.description}</p>
                  </motion.div>
                </div>

                {/* Center node */}
                <div className="hidden md:flex items-center justify-center w-16">
                  <motion.div
                    className="relative"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, type: 'spring' }}
                  >
                    {/* Glow */}
                    <div className="absolute inset-0 bg-[#F4E07A]/30 rounded-full blur-lg" />
                    {/* Node */}
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#F4E07A] to-[#F4E07A]/60 flex items-center justify-center">
                      <span className="text-background font-bold">{index + 1}</span>
                    </div>
                    {/* Pulse */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-[#F4E07A]"
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>

          {/* Animated particles flowing down */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 hidden md:block pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[#F4E07A]"
                style={{ left: '50%', marginLeft: -4 }}
                initial={{ top: '0%', opacity: 0 }}
                animate={{ top: '100%', opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: 'linear',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
