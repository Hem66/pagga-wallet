import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import Card from '@components/UI/Card'
import Button from '@components/UI/Button'
import { DepositIcon, EarnIcon, SendIcon, SwapIcon, TonWhalesIcon } from '@assets/icons'
import { Link } from 'react-router-dom'
import { useTokenBalances } from '@/hooks/useTokenBalances'
import { formatUnits } from 'ethers/utils'
import Claim from '@components/Claim'
import axios from 'axios'
import { useAccount } from 'wagmi'
import { wagmiConfig } from '@/config/wagmi'
import { useLocalWallet } from '@/providers/LocalWalletProvider'

interface Token {
  chainId: string
  balanceUsd: string
  // ... other token fields if needed
}

interface TokenResponse {
  tokens: Record<string, Token[]>
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const WalletMenu: React.FC = () => {
  const { unlockedBalance } = useTokenBalances()
  const { address: wagmiAddress } = useAccount()
  const { activeWallet } = useLocalWallet()
  const [totalBalanceUsd, setTotalBalanceUsd] = useState<string>('0.00')
  const [loading, setLoading] = useState(false)

  // Use either wagmi address or local wallet address
  const address = activeWallet?.address || wagmiAddress

  useEffect(() => {
    const fetchTotalBalance = async () => {
      if (!address) return

      setLoading(true)
      try {
        // Get all chain IDs from wagmi config
        const chainIds = wagmiConfig.chains.map(chain => chain.id).join(',')
        
        const { data } = await axios.get<TokenResponse>(
          `${API_BASE_URL}/all_token_list?chain_ids=${chainIds}&id=${address}`
        )

        // Calculate total USD balance across all chains
        let total = 0
        if (data.tokens) {
          if (Array.isArray(data.tokens)) {
            // Handle single chain response
            total = data.tokens.reduce((sum, token) => sum + Number(token.balanceUsd), 0)
          } else {
            // Handle multi-chain response
            total = Object.values(data.tokens)
              .flat()
              .reduce((sum, token) => sum + Number(token.balanceUsd), 0)
          }
        }

        setTotalBalanceUsd(total.toFixed(2))
      } catch (error) {
        console.error('Error fetching total balance:', error)
        setTotalBalanceUsd('0.00')
      } finally {
        setLoading(false)
      }
    }

    fetchTotalBalance()
  }, [address])

  // Listen for chain changes
  useEffect(() => {
    const handleChainChange = () => {
      // Refresh balances when chain changes
      if (address) {
        setLoading(true)
        // Re-fetch balances
        fetchTotalBalance()
      }
    }

    window.addEventListener('chainChanged', handleChainChange)
    return () => {
      window.removeEventListener('chainChanged', handleChainChange)
    }
  }, [address])

  // Function to fetch balances (moved outside useEffect for reusability)
  const fetchTotalBalance = async () => {
    if (!address) return

    try {
      const chainIds = wagmiConfig.chains.map(chain => chain.id).join(',')
      const { data } = await axios.get<TokenResponse>(
        `${API_BASE_URL}/all_token_list?chain_ids=${chainIds}&id=${address}`
      )

      let total = 0
      if (data.tokens) {
        if (Array.isArray(data.tokens)) {
          total = data.tokens.reduce((sum, token) => sum + Number(token.balanceUsd), 0)
        } else {
          total = Object.values(data.tokens)
            .flat()
            .reduce((sum, token) => sum + Number(token.balanceUsd), 0)
        }
      }

      setTotalBalanceUsd(total.toFixed(2))
    } catch (error) {
      console.error('Error fetching total balance:', error)
      setTotalBalanceUsd('0.00')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={styles['wallet-menu']}>
      <div className={styles['wallet-menu-balance']}>
        <div className={styles['wallet-menu-balance__title']}>Total balance:</div>
        <div className={styles['wallet-menu-balance__value']}>
          {loading ? 'Loading...' : `$${totalBalanceUsd}`}
        </div>
      </div>
      <div className={styles['wallet-menu-buttons']}>
        <Link to={'/deposit'}>
          <Button icon={<DepositIcon width={22} height={22} />}>Deposit</Button>
        </Link>
        <Link to={'/send'}>
          <Button icon={<SendIcon width={22} height={22} />}>Send</Button>
        </Link>
        <Link to={'/swap'}>
          <Button icon={<SwapIcon width={22} height={22} />}>Swap</Button>
        </Link>
        <Link to={'/earn'}>
          <Button 
            icon={<EarnIcon width={22} height={22} />} 
            borderColor='var(--green-color)'
          >
            Earn
          </Button>
        </Link>
      </div>
      <div className={styles['wallet-menu-pagga']}>
        <div className={styles['wallet-menu-pagga__balance']}>
          Your Balance:
          <TonWhalesIcon width={24} height={24} />
          <span>
            {formatUnits(unlockedBalance ? unlockedBalance as string : '0', 18)} PAGGA
          </span>
        </div>
        <div className={styles['wallet-menu-pagga__actions']}>
          <Claim />
          <Link to='/earn/testEarn'>
            <Button icon={<EarnIcon width={22} height={22} />}>Stake PAGGA</Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

export default WalletMenu
