import { mainnet, optimism, sepolia, bsc, polygon, berachainTestnet, arbitrum, avalanche, base, gnosis } from 'wagmi/chains'

export const prodChains = [
  mainnet,
  optimism,
  sepolia,
  bsc,
  polygon,
  arbitrum,
  avalanche,
  optimism,
  base,
  gnosis,
  berachainTestnet
]

export const chainMap: Record<string, string> = {
  '1': 'eth',
  '10': 'optimism',
  '11155111': 'sepolia',
  '56': 'bsc',
  '137': 'polygon',
  '42161': 'arbitrum',
  '43114': 'avalanche',
  '8453': 'base',
  '100': 'gnosis',
  '80084': 'bera',
}
