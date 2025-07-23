import { celoAlfajores, neonDevnet, polygonAmoy, unichainSepolia, worldchainSepolia, scrollSepolia, flowTestnet, mantleSepoliaTestnet, zircuitTestnet, gnosisChiado, hederaTestnet, lineaTestnet, morphSepolia, oasisTestnet, rootstockTestnet, sepolia, base } from "wagmi/chains";

// Contract addresses per chain
export const devContracts: Record<number, { claim: `0x${string}`}> = {
  [sepolia.id]: {
    claim: "0x6540c58a7236df1dc9ff563d4a75960f32926fe2",
  },
  [celoAlfajores.id]: {
    claim: "0xE47845dac04A7C91E73B8f09b441785810D40f69",
  },
  [gnosisChiado.id]: {
    claim: "0x7cFD096A93dD589fdB94F168158a6c631fFc22c8",
  },
  [hederaTestnet.id]: {
    claim: "0x7cfd096a93dd589fdb94f168158a6c631ffc22c8",
  },
  [rootstockTestnet.id]: {
    claim: "0x7cfd096a93dd589fdb94f168158a6c631ffc22c8", 
  },
  [flowTestnet.id]: {
    claim: "0xbefC6F3B404F2BF6B4c52E05c55BE15ee3Fe294d",
  },
  [neonDevnet.id]: {
    claim: "0xbefC6F3B404F2BF6B4c52E05c55BE15ee3Fe294d",
  },
  [oasisTestnet.id]: {
    claim: "0x7cFD096A93dD589fdB94F168158a6c631fFc22c8",
  },
  [morphSepolia.id]: {
    claim: "0xbefc6f3b404f2bf6b4c52e05c55be15ee3fe294d",
  },
  [polygonAmoy.id]: {
    claim: "0xbefc6f3b404f2bf6b4c52e05c55be15ee3fe294d",
  },
  [unichainSepolia.id]: {
    claim: "0xbefC6F3B404F2BF6B4c52E05c55BE15ee3Fe294d?",
  },
  [zircuitTestnet.id]: {
    claim: "0xbefc6f3b404f2bf6b4c52e05c55be15ee3fe294d",
  },
  [scrollSepolia.id]: {
    claim: "0xbefc6f3b404f2bf6b4c52e05c55be15ee3fe294d",
  },
  [worldchainSepolia.id]: {
    claim: "0xbefc6f3b404f2bf6b4c52e05c55be15ee3fe294d",
  },
  [mantleSepoliaTestnet.id]: {
    claim: "0xbefC6F3B404F2BF6B4c52E05c55BE15ee3Fe294d",
  },
  [base.id]: {
    claim: "0xa7bc316fa35c9eac97bd8f05fe6404ffda826308", 
  },
  [80084]: {
    claim: "0xaC0d56E871DbeecE3e576A4B64183eCd9a479195", 
  },
};

const prodContracts: Record<number, { claim: `0x${string}`}> = {
  [base.id]: {
    claim: "0xa7bc316fa35c9eac97bd8f05fe6404ffda826308", 
  },
  [80084]: {
    claim: "0xaC0d56E871DbeecE3e576A4B64183eCd9a479195",
  },
  // Add other production chain contracts
}

export const contracts = import.meta.env.DEV ? devContracts : prodContracts