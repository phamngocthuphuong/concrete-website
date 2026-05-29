'use client'

import { motion } from 'framer-motion'

const custodyFeatures = [
  {
    title: 'Enterprise Custody',
    description: 'Bank-grade security infrastructure with multi-signature authorization',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: 'Compliance Ready',
    description: 'Built-in regulatory compliance with audit trails and reporting',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Permission Controls',
    description: 'Granular access management with role-based permissions',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Secure Gateways',
    description: 'Protected liquidity gateways with real-time monitoring',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
]

const vaultLayers = [
  { name: 'Authorization', color: '#F4E07A', width: '100%' },
  { name: 'Encryption', color: '#22c55e', width: '90%' },
  { name: 'Validation', color: '#6366f1', width: '80%' },
  { name: 'Execution', color: '#8b5cf6', width: '70%' },
  { name: 'Settlement', color: '#ec4899', width: '60%' },
]

export function CustodySystem() {
  return (
    <section id="vaults" className="relative py-32 px-8 overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 infrastructure-grid opacity-20" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#F4E07A]/5 to-transparent" />

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
            <svg className="w-4 h-4 text-[#F4E07A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-sm text-[#F4E07A] font-medium">AssetCX Framework</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Institutional Custody System
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade custody infrastructure designed for institutional capital protection and compliance.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {custodyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass-panel rounded-xl p-6 hover:border-[#F4E07A]/30 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 rounded-lg bg-[#F4E07A]/10 flex items-center justify-center mb-4 text-[#F4E07A] group-hover:bg-[#F4E07A]/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Animated vault visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="glass-panel rounded-2xl p-8">
              <div className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                Vault Security Layers
              </div>

              {/* Layered vault animation */}
              <div className="relative space-y-3">
                {vaultLayers.map((layer, index) => (
                  <motion.div
                    key={layer.name}
                    className="relative"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.15, duration: 0.5 }}
                    style={{ originX: 0 }}
                  >
                    <div
                      className="h-12 rounded-lg flex items-center px-4 relative overflow-hidden"
                      style={{
                        width: layer.width,
                        backgroundColor: `${layer.color}15`,
                        borderLeft: `3px solid ${layer.color}`,
                      }}
                    >
                      <span className="text-sm font-medium">{layer.name}</span>
                      
                      {/* Animated scan line */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Status indicators */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { label: 'Security', value: '99.99%', color: '#22c55e' },
                  { label: 'Uptime', value: '100%', color: '#F4E07A' },
                  { label: 'Audited', value: '5x', color: '#6366f1' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#F4E07A]/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#6366f1]/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
