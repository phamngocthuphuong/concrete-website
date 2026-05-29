import { HeroSection } from '@/components/hero-section'
import { EcosystemMap } from '@/components/ecosystem-map'
import { YieldDashboard } from '@/components/yield-dashboard'
import { AssetRouting } from '@/components/asset-routing'
import { CustodySystem } from '@/components/custody-system'
import { EcosystemGalaxy } from '@/components/ecosystem-galaxy'
import { StatsSection, Footer } from '@/components/stats-footer'

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden">
      {/* Hero Section with central infrastructure core */}
      <HeroSection />

      {/* Interactive Ecosystem Map */}
      <EcosystemMap />

      {/* Real-time Yield Dashboard */}
      <YieldDashboard />

      {/* Asset Routing Infrastructure Flow */}
      <AssetRouting />

      {/* Institutional Custody System */}
      <CustodySystem />

      {/* 3D Ecosystem Galaxy */}
      <EcosystemGalaxy />

      {/* Final Stats Section */}
      <StatsSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
