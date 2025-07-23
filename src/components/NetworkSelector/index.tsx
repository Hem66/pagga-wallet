import React, { useState, useRef, useEffect } from 'react';
import styles from './style.module.scss';
import cx from 'classnames';
import { Chain } from 'viem';
import { useLocalWallet } from '@/providers/LocalWalletProvider';

interface NetworkSelectorProps {
  chain: any;
  chains: readonly Chain[];
  isWrongNetwork: boolean;
  onSwitchNetwork: (chainId: number) => Promise<void>;
  switchStatus: string;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  chain,
  chains,
  isWrongNetwork,
  onSwitchNetwork,
  switchStatus,
}) => {
  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false);
  const networkDropdownRef = useRef<HTMLDivElement>(null);
  const { activeWallet } = useLocalWallet();
  const [currentChain, setCurrentChain] = useState(chain);

  useEffect(() => {
    setCurrentChain(chain);
  }, [chain]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (networkDropdownRef.current && !networkDropdownRef.current.contains(event.target as Node)) {
        setNetworkDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNetworkSwitch = async (chainId: number) => {
    try {
      if (activeWallet) {
        const event = new CustomEvent('chainChanged', { detail: chainId });
        window.dispatchEvent(event);
        // Update current chain immediately for local wallets
        const selectedChain = chains.find(c => c.id === chainId);
        setCurrentChain(selectedChain);
      } else {
        await onSwitchNetwork(chainId);
      }
      setNetworkDropdownOpen(false);
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };

  return (
    <div className={styles['dropdown-container']} ref={networkDropdownRef}>
      <button
        className={cx(styles['dropdown-button'], {
          [styles['wrong-network']]: isWrongNetwork,
        })}
        onClick={() => setNetworkDropdownOpen(!networkDropdownOpen)}
      >
        <span>{currentChain?.name || 'Select Network'}</span>
        <svg
          className={styles['dropdown-icon']}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {networkDropdownOpen && (
        <div className={styles['dropdown-menu']}>
          {chains.map((availableChain) => (
            <button
              key={availableChain.id}
              onClick={() => handleNetworkSwitch(availableChain.id)}
              disabled={switchStatus === 'pending'}
              className={cx(styles['chain-option'], {
                [styles['active']]: chain?.id === availableChain.id,
              })}
            >
              {availableChain.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NetworkSelector;
