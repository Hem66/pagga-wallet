import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import cx from 'classnames';
import { usePrivy } from '@privy-io/react-auth';
import { useAccount, useBalance, useSwitchChain, useChains } from 'wagmi';
import { useLocalWallet } from '@/providers/LocalWalletProvider';
import NetworkSelector from '@components/NetworkSelector';
import UnlockWalletModal from '@components/UnlockWalletModal';
import WalletCreationModal from '@components/WalletCreationModal';
import WalletInfo from '@components/WalletInfo';
import { MobileNavBar } from '@components/MobileNavBar';

interface IProps {
  children: React.ReactNode;
  className?: string;
}


const MainLayout: React.FC<IProps> = ({ children, className }) => {
  const { logout, authenticated } = usePrivy();
  const { chain, address } = useAccount();
  const chains = useChains();
  const { data: balance } = useBalance({ address });
  const { status, switchChain } = useSwitchChain();
  const { localWallets, activeWallet, unlockWallet } = useLocalWallet();

  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string>('');

  const handleLogout = async () => {
    await logout();
  };

  const handleWalletSelection = (walletAddress: string) => {
    setSelectedWallet(walletAddress);
    setShowUnlockModal(true);
  };

  const handleSwitchNetwork = async (chainId: number) => {
    try {
      await switchChain({ chainId });
    } catch (error) {
      console.error('Failed to switch chain:', error);
    }
  };

  const isWrongNetwork = chain?.id !== chains.find(c => c.id === chain?.id)?.id;

  // Effect to handle initial wallet state
  useEffect(() => {
    if (localWallets.length > 0 && !activeWallet) {
      // If there are wallets but none active, show unlock modal for the first wallet
      setSelectedWallet(localWallets[0].address);
      setShowUnlockModal(true);
    }
  }, [localWallets, activeWallet]);

  // Handle wallet creation success
  const handleWalletCreated = (walletAddress: string) => {
    setShowWalletModal(false);
    setSelectedWallet(walletAddress);
    setShowUnlockModal(true);
  };

  // Handle wallet unlock success
  const handleUnlockSuccess = async (walletAddress: string, password: string) => {
    try {
      const success = await unlockWallet(walletAddress, password);
      if (success) {
        setShowUnlockModal(false);
        setSelectedWallet('');
      }
    } catch (error) {
      console.error('Failed to unlock wallet:', error);
    }
  };


  return (
    <div className={cx(styles['main-layout'], className)}>
      <div className={styles['main-layout__header']}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 32, marginRight: 8 }} role="img" aria-label="logo">💸</span>
          <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: 1, color: '#fff' }}>youBuidl</span>
          <div className={styles['main-layout__wallet']}>
            {(authenticated || activeWallet) && (
              <NetworkSelector
                chain={chain}
                chains={chains}
                isWrongNetwork={isWrongNetwork}
                onSwitchNetwork={handleSwitchNetwork}
                switchStatus={status}
              />
            )}

            <WalletInfo
              authenticated={authenticated}
              activeWallet={activeWallet}
              balance={balance}
              address={address}
              localWallets={localWallets}
              onWalletSelection={handleWalletSelection}
              onAddNewWallet={() => setShowWalletModal(true)}
              onDisconnect={handleLogout}
            />
          </div>
        </div>
      </div>

      <div className={styles['main-layout__content']}>
        {children}
      </div>

      {showWalletModal && (
        <WalletCreationModal
          onClose={() => setShowWalletModal(false)}
          onSuccess={handleWalletCreated}
        />
      )}

      {showUnlockModal && (
        <UnlockWalletModal
          walletAddress={selectedWallet}
          onClose={() => {
            setShowUnlockModal(false);
            setSelectedWallet('');
          }}
          onSuccess={handleUnlockSuccess}
        />
      )}
      <MobileNavBar />
    </div>
  );
};

export default MainLayout;
