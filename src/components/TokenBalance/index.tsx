import React, { useEffect, useState } from 'react';
import Card from '@UI/Card';
import styles from './style.module.scss';
import TokenInfo from '@components/TokenInfo';
import axios from 'axios';
import { useAccount } from 'wagmi';
import { EthereumIcon } from '@assets/icons';
import { useLocalWallet } from '@/providers/LocalWalletProvider';
import { chainMap } from '@/config/chains.prod';

interface Token {
  chainId: string;
  contractAddress: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
  balanceRawInteger: string;
  balanceFormatted: string;
  balanceUsd: string;
  price: string;
  priceChange24h: string;
  logo: string;
  thumbnail: string;
  isNative: boolean;
  isSpam: boolean;
  isVerified: boolean;
  portfolioPercentage: string;
}

interface TokenResponse {
  tokens: Token[] | Record<string, Token[]>;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const TokenBalance: React.FC = () => {
  const { address: wagmiAddress, chain: wagmiChain } = useAccount();
  const { activeWallet } = useLocalWallet();
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [showSpam, setShowSpam] = useState(false);
  const [currentChainId, setCurrentChainId] = useState<number | null>(1);
  
  // Use either wagmi address or local wallet address
  const address = activeWallet?.address || wagmiAddress;
  const chain = currentChainId ? { id: currentChainId, name: chainMap[currentChainId] } : wagmiChain;

  const fetchTokens = async () => {
    console.log('Fetching tokens for address:', address, 'on chain:', chain?.id);
    if (!address || !chain) return;
    
    setLoading(true);
    try {
      const { data } = await axios.get<TokenResponse>(
        `${API_BASE_URL}/token_list?chain_id=${chain.id}&id=${address}`
      );

      setTokens(data.tokens as Token[]);
    } catch (error) {
      console.error('Error fetching tokens:', error);
      setTokens([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, [address, chain?.id]);

  // Listen for chain changes from NetworkSelector
  useEffect(() => {
    const handleChainChange = (event: CustomEvent<number>) => {
      setCurrentChainId(event.detail);
    };

    window.addEventListener('chainChanged', handleChainChange as EventListener);
    return () => {
      window.removeEventListener('chainChanged', handleChainChange as EventListener);
    };
  }, []);

  const sortedTokens = tokens.sort((a, b) => {
    // Sort by spam status first (non-spam first)
    if (a.isSpam !== b.isSpam) {
      return a.isSpam ? 1 : -1;
    }
    // Then sort by USD value (highest first)
    return Number(b.balanceUsd) - Number(a.balanceUsd);
  });

  const normalTokens = sortedTokens.filter(token => !token.isSpam);
  const spamTokens = sortedTokens.filter(token => token.isSpam);

  if (!chain) {
    return <div>Please connect to a network</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className={styles['balance-card']}>
      <div className={styles['balance-card__title']}>
        Balances on {chain.name}
      </div>
      
      {normalTokens.length === 0 && spamTokens.length === 0 ? (
        <div className={styles['balance-card__empty']}>
          No tokens found on this chain
        </div>
      ) : (
        <>
          {/* Regular tokens */}
          {normalTokens.map((token) => (
            <TokenInfo 
              key={`${token.chainId}-${token.contractAddress}`}
              imageUrl={token.logo}
              token={token.name}
              chain={chain.name}
              value={token.balanceFormatted}
              amount={token.balanceUsd}
              symbol={token.symbol}
              priceChange={token.priceChange24h}
              isVerified={token.isVerified}
              icon={!token.logo ? <EthereumIcon width={40} height={40} /> : undefined}
            />
          ))}

          {/* Spam tokens section */}
          {spamTokens.length > 0 && (
            <div className={styles['spam-section']}>
              <button 
                className={styles['spam-section__toggle']}
                onClick={() => setShowSpam(!showSpam)}
              >
                Potential spam tokens ({spamTokens.length})
                <span className={`${styles['spam-section__arrow']} ${showSpam ? styles['spam-section__arrow--expanded'] : ''}`}>
                  ▼
                </span>
              </button>
              
              {showSpam && (
                <div className={styles['spam-section__content']}>
                  {spamTokens.map((token) => (
                    <TokenInfo 
                      key={`${token.chainId}-${token.contractAddress}`}
                      imageUrl={token.logo}
                      token={token.name}
                      chain={chain.name}
                      value={token.balanceFormatted}
                      amount={token.balanceUsd}
                      symbol={token.symbol}
                      priceChange={token.priceChange24h}
                      isVerified={token.isVerified}
                      isSpam={true}
                      icon={!token.logo ? <EthereumIcon width={40} height={40} /> : undefined}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default TokenBalance;