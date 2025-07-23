import { defineChain, Transport } from 'viem'
import { http, createConfig } from 'wagmi'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'
import { celoAlfajores, flowTestnet, gnosisChiado, hederaTestnet, lineaTestnet, morphSepolia, oasisTestnet, rootstockTestnet, sepolia, base, mainnet, bsc, polygon, arbitrum, avalanche, gnosis, optimism } from 'wagmi/chains'

const berachainTestnet = defineChain({
  id: 80084, // Replace with Berachain testnet's chain ID
  name: 'Berachain Testnet',
  network: 'berachain-testnet',
  nativeCurrency: {
    name: 'BERA',
    symbol: 'BERA',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://bartio.rpc.berachain.com'] // Update with Berachain RPC URL
    }
  },
  blockExplorers: {
    default: { name: 'Berachain Explorer', url: 'https://bartio.beratrail.io' },
  },
  testnet: true,
});


const createTransports = (chains: any[]): Record<number, Transport> => {
  return chains.reduce((acc, chain) => ({
    ...acc,
    [chain.id]: http()
  }), {})
}

const chains = import.meta.env.ENV === 'development' ? [
  celoAlfajores,
  flowTestnet,
  gnosisChiado,
  hederaTestnet,
  lineaTestnet,
  morphSepolia,
  oasisTestnet,
  rootstockTestnet,
  sepolia,
  base,
  berachainTestnet
] : [
  mainnet,
  bsc,
  polygon,
  arbitrum,
  avalanche,
  base,
  gnosis,
  sepolia,
  optimism,
  berachainTestnet
]

const transports = createTransports(chains)

export const wagmiConfig = createConfig({
  chains: import.meta.env.ENV === 'development' ? [
    celoAlfajores,
    flowTestnet,
    gnosisChiado,
    hederaTestnet,
    lineaTestnet,
    morphSepolia,
    oasisTestnet,
    rootstockTestnet,
    sepolia,
    base,
    berachainTestnet
  ] : [
    mainnet,
    bsc,
    polygon,
    arbitrum,
    avalanche,
    base,
    gnosis,
    sepolia,
    optimism,
    berachainTestnet
  ],
  transports,
  connectors: [
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID }),
  ],
})
