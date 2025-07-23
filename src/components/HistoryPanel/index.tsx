import React, { useState, useEffect } from 'react'
import styles from './style.module.scss'
import Card from '@components/UI/Card'
import Dropdown, { DropdownItem } from '@components/UI/Dropdown'
import { useAccount } from 'wagmi'
import { wagmiConfig } from '@/config/wagmi'
import axios from 'axios'
import TransactionCard from './components/TranscationCard'
import { useLocalWallet } from '@/providers/LocalWalletProvider'

interface TokenTransfer {
  hash: string
  blockNumber: string
  blockTimestamp: string
  tokenAddress: string | null
  tokenName: string | null
  tokenSymbol: string | null
  tokenLogo: string | null
  tokenDecimals: number
  from: string
  fromLabel: string | null
  fromEntityLogo: string | null
  to: string
  toLabel: string | null
  toEntityLogo: string | null
  value: string
  valueFormatted: string
  isSpam: boolean
  isVerified: boolean
  securityScore: number
}

interface TokenTransfersResponse {
  transfers: TokenTransfer[] | Record<string, TokenTransfer[]>
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const HistoryPanel: React.FC = () => {
  const { address: wagmiAddress } = useAccount();
  const { activeWallet } = useLocalWallet();
  const [loading, setLoading] = useState(false);
  const [selectedChain, setSelectedChain] = useState<number | null>(null);
  const [transfers, setTransfers] = useState<TokenTransfer[]>([]);

  // Use either wagmi address or local wallet address
  const address = activeWallet?.address || wagmiAddress;

  // Listen for chain changes from NetworkSelector
  useEffect(() => {
    const handleChainChange = (event: CustomEvent<number>) => {
      setSelectedChain(event.detail);
    };

    window.addEventListener('chainChanged', handleChainChange as EventListener);
    return () => {
      window.removeEventListener('chainChanged', handleChainChange as EventListener);
    };
  }, []);
  
  const chainItems: DropdownItem[] = wagmiConfig.chains.map(chain => ({
    label: chain.name,
    value: chain.id.toString()
  }))

  const handleSelect = (item: DropdownItem) => {
    setSelectedChain(Number(item.value))
  }
  
  useEffect(() => {
    const fetchtransfers = async () => {
      if (!address) return

      setLoading(true)
      try {
        let url: string
        if (!selectedChain) {
          const chainIds = wagmiConfig.chains.map(chain => chain.id).join(',')
          url = `${API_BASE_URL}/all_history_list?chain_ids=${chainIds}&id=${address}`
        } else {
          url = `${API_BASE_URL}/history_list?chain_id=${selectedChain}&id=${address}`
        }

        const { data } = await axios.get<TokenTransfersResponse>(url)
        console.log('API Response:', data)
        // Handle empty responses and ensure transfers is always an array
        if (!data.transfers || 
            (Array.isArray(data.transfers) && data.transfers.length === 0)) {
          setTransfers([])
          return
        }

        if (!selectedChain) {
          // Handle multi-chain response
          const transfersRecord = data.transfers as Record<string, TokenTransfer[]>
          // Check if there are any transfers at all
          if (Object.keys(transfersRecord).length === 0) {
            setTransfers([])
            return
          }
          
          const alltransfers = Object.values(transfersRecord)
            .filter(chainTxs => Array.isArray(chainTxs) && chainTxs.length > 0)
            .flat()
            .sort((a, b) => new Date(b.blockTimestamp).getTime() - new Date(a.blockTimestamp).getTime())
          
          setTransfers(alltransfers)
        } else {
          // Handle single chain response
          const txns = Array.isArray(data.transfers) ? data.transfers : []
          setTransfers(txns)
        }
      } catch (error) {
        console.error('Error fetching transfers:', error)
        setTransfers([])
      } finally {
        setLoading(false)
      }
    }

    fetchtransfers()
  }, [address, selectedChain])

  useEffect(() => {
    if (selectedChain) {
      const chainItem = chainItems.find(item => Number(item.value) === selectedChain);
      if (chainItem) {
        handleSelect(chainItem);
      }
    }
  }, [selectedChain]);
  
  return (
    <Card className={styles['history']}>
      <div className={styles['history-header']}>
        <div className={styles['history__title']}>
          Transaction history
        </div>
        <Dropdown
          items={chainItems}
          onSelect={handleSelect}
          defaultLabel="All chains"
          selectedValue={selectedChain?.toString()}
          className={styles['history__button']}
        />
      </div>
      <div className={styles['history-content']}>
        {loading ? (
          <div className={styles['history__loading']}>Loading...</div>
        ) : transfers.length === 0 ? (
          <div className={styles['history__empty']}>No transfers found</div>
        ) : (
          transfers.map((tx) => (
            <TransactionCard
              key={tx.hash}
              sent={tx.from.toLowerCase() === address?.toLowerCase()}
              amount={tx.valueFormatted}
              date={new Date(tx.blockTimestamp).toLocaleString()}
              address={tx.from.toLowerCase() === address?.toLowerCase() ? tx.to : tx.from}
              tokenLabel={tx.tokenSymbol}
              isNativeTransfer={!tx.tokenAddress} // If no token address, it's a native transfer
              tokenLogo={tx.tokenLogo}
              isSpam={tx.isSpam}
              isVerified={tx.isVerified}
              securityScore={tx.securityScore}
              entityLogo={tx.from.toLowerCase() === address?.toLowerCase() 
                ? tx.toEntityLogo 
                : tx.fromEntityLogo
              }
            />
          ))
        )}
      </div>
    </Card>
  )
}

export default HistoryPanel
