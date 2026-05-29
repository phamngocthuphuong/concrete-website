import { create } from 'zustand'

// Protocol definitions
export const protocols = [
  { id: 'morpho', name: 'Morpho', color: '#6366f1', chain: 'ethereum' },
  { id: 'pendle', name: 'Pendle', color: '#22c55e', chain: 'ethereum' },
  { id: 'eigenlayer', name: 'EigenLayer', color: '#8b5cf6', chain: 'ethereum' },
  { id: 'ethena', name: 'Ethena', color: '#f59e0b', chain: 'ethereum' },
  { id: 'euler', name: 'Euler', color: '#ec4899', chain: 'ethereum' },
] as const

export const chains = [
  { id: 'ethereum', name: 'Ethereum', color: '#627EEA' },
  { id: 'arbitrum', name: 'Arbitrum', color: '#28A0F0' },
  { id: 'base', name: 'Base', color: '#0052FF' },
] as const

export type Protocol = (typeof protocols)[number]
export type Chain = (typeof chains)[number]

export interface ProtocolData {
  id: string
  name: string
  tvl: number
  utilization: number
  apy: number
  activeVaults: number
  volume24h: number
  change24h: number
}

export interface ChainData {
  id: string
  name: string
  tvl: number
  transactions24h: number
  activeUsers: number
}

interface BlockchainStore {
  protocolData: Record<string, ProtocolData>
  chainData: Record<string, ChainData>
  totalTVL: number
  totalVaults: number
  totalVolume: number
  lastUpdate: number
  isLoading: boolean
  updateData: () => void
}

// Simulated real-time data with realistic fluctuations
const generateProtocolData = (): Record<string, ProtocolData> => {
  const baseData: Record<string, Omit<ProtocolData, 'change24h'>> = {
    morpho: { id: 'morpho', name: 'Morpho', tvl: 3200000000, utilization: 78.4, apy: 8.2, activeVaults: 156, volume24h: 245000000 },
    pendle: { id: 'pendle', name: 'Pendle', tvl: 2100000000, utilization: 82.1, apy: 12.4, activeVaults: 89, volume24h: 189000000 },
    eigenlayer: { id: 'eigenlayer', name: 'EigenLayer', tvl: 15800000000, utilization: 91.2, apy: 4.8, activeVaults: 312, volume24h: 567000000 },
    ethena: { id: 'ethena', name: 'Ethena', tvl: 4500000000, utilization: 85.7, apy: 15.2, activeVaults: 67, volume24h: 312000000 },
    euler: { id: 'euler', name: 'Euler', tvl: 890000000, utilization: 71.3, apy: 9.1, activeVaults: 45, volume24h: 78000000 },
  }

  return Object.fromEntries(
    Object.entries(baseData).map(([key, data]) => [
      key,
      {
        ...data,
        tvl: data.tvl * (1 + (Math.random() - 0.5) * 0.02),
        utilization: Math.min(100, Math.max(0, data.utilization + (Math.random() - 0.5) * 2)),
        apy: Math.max(0, data.apy + (Math.random() - 0.5) * 0.5),
        volume24h: data.volume24h * (1 + (Math.random() - 0.5) * 0.1),
        change24h: (Math.random() - 0.4) * 8,
      },
    ])
  )
}

const generateChainData = (): Record<string, ChainData> => ({
  ethereum: {
    id: 'ethereum',
    name: 'Ethereum',
    tvl: 18500000000 * (1 + (Math.random() - 0.5) * 0.01),
    transactions24h: Math.floor(1250000 + Math.random() * 50000),
    activeUsers: Math.floor(245000 + Math.random() * 10000),
  },
  arbitrum: {
    id: 'arbitrum',
    name: 'Arbitrum',
    tvl: 5200000000 * (1 + (Math.random() - 0.5) * 0.01),
    transactions24h: Math.floor(890000 + Math.random() * 30000),
    activeUsers: Math.floor(178000 + Math.random() * 8000),
  },
  base: {
    id: 'base',
    name: 'Base',
    tvl: 2800000000 * (1 + (Math.random() - 0.5) * 0.01),
    transactions24h: Math.floor(560000 + Math.random() * 20000),
    activeUsers: Math.floor(134000 + Math.random() * 5000),
  },
})

export const useBlockchainStore = create<BlockchainStore>((set, get) => ({
  protocolData: generateProtocolData(),
  chainData: generateChainData(),
  totalTVL: 26490000000,
  totalVaults: 669,
  totalVolume: 1391000000,
  lastUpdate: Date.now(),
  isLoading: false,
  updateData: () => {
    const protocolData = generateProtocolData()
    const chainData = generateChainData()
    const totalTVL = Object.values(protocolData).reduce((sum, p) => sum + p.tvl, 0)
    const totalVaults = Object.values(protocolData).reduce((sum, p) => sum + p.activeVaults, 0)
    const totalVolume = Object.values(protocolData).reduce((sum, p) => sum + p.volume24h, 0)

    set({
      protocolData,
      chainData,
      totalTVL,
      totalVaults,
      totalVolume,
      lastUpdate: Date.now(),
    })
  },
}))

// Format utilities
export const formatCurrency = (value: number, decimals = 2): string => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(decimals)}T`
  if (value >= 1e9) return `$${(value / 1e9).toFixed(decimals)}B`
  if (value >= 1e6) return `$${(value / 1e6).toFixed(decimals)}M`
  if (value >= 1e3) return `$${(value / 1e3).toFixed(decimals)}K`
  return `$${value.toFixed(decimals)}`
}

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(Math.floor(value))
}

export const formatPercent = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

// Terminal log messages
export const terminalLogs = [
  '[SCANNING LIVE VAULT STATES]',
  '[MORPHO LIQUIDITY SYNCHRONIZED]',
  '[PENDLE ROUTING UPDATED]',
  '[EIGENLAYER RESTAKING ANALYZED]',
  '[ETHENA COLLATERAL VERIFIED]',
  '[EULER POSITIONS INDEXED]',
  '[ON-CHAIN REALLOCATION COMPLETE]',
  '[RPC TELEMETRY REFRESH SUCCESSFUL]',
  '[CROSS-CHAIN BRIDGE MONITORED]',
  '[VAULT APY RECALCULATED]',
  '[LIQUIDITY DEPTH ANALYZED]',
  '[RISK PARAMETERS VALIDATED]',
]
