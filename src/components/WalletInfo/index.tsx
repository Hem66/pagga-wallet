import React, { useState, useRef, useEffect } from 'react';
import styles from './style.module.scss';
import cx from 'classnames';
import { useLocalWallet } from '@/providers/LocalWalletProvider';
import WalletTooltip from '@/components/UI/WalletTooltip';

interface WalletInfoProps {
  authenticated: boolean;
  activeWallet: any;
  balance: any;
  address: string | undefined;
  localWallets: any[];
  onWalletSelection: (walletAddress: string) => void;
  onAddNewWallet: () => void;
  onDisconnect: () => void;
}

const WalletInfo: React.FC<WalletInfoProps> = ({
  authenticated,
  activeWallet,
  balance,
  address,
  localWallets,
  onWalletSelection,
  onAddNewWallet,
  onDisconnect,
}) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const { removeWallet } = useLocalWallet();

  const handleRemoveWallet = async (walletAddress: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent wallet selection when clicking remove
    console.log(balance, address)
    if (window.confirm('Are you sure you want to remove this wallet?')) {
      await removeWallet(walletAddress);

      // If we're removing the active wallet, close the bottom sheet
      if (activeWallet?.address === walletAddress) {
        setIsBottomSheetOpen(false);
        onDisconnect();
      }
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (bottomSheetRef.current && !bottomSheetRef.current.contains(event.target as Node)) {
        setIsBottomSheetOpen(false);
      }
    }

    if (isBottomSheetOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isBottomSheetOpen]);


  const getWalletDisplayName = (wallet: any) => {
    return wallet?.name || `${wallet?.address.slice(0, 6)}...`;
  };

  if (!authenticated && !activeWallet) {
    // Only show "Add wallet" when there are no wallets
    if (localWallets.length === 0) {
      return (
        <div className={styles.centerContainer}>
          <WalletTooltip onClick={onAddNewWallet}>
            Add wallet
          </WalletTooltip>
        </div>
      );
    }
  }


  // Show the first wallet from the list when there are wallets but none is authenticated
  //const firstWallet = localWallets[0];
  //const walletName = firstWallet?.name || `${firstWallet?.address.slice(0, 6)}...`;

  return (
    <>
      <div className={styles.walletContainer}>
        <WalletTooltip onClick={() => setIsBottomSheetOpen(true)}>
          {getWalletDisplayName(activeWallet)}
        </WalletTooltip>
      </div>

      {isBottomSheetOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsBottomSheetOpen(false)} />
          <div className={styles.bottomSheet} ref={bottomSheetRef}>
            <div className={styles.bottomSheetHeader}>
              <div className={styles.dragHandle} />
              <h2>Wallets</h2>
            </div>
            <div className={styles.bottomSheetContent}>
              {localWallets.map((wallet) => (
                <div key={wallet.address} className={styles.walletOptionWrapper}>
                  <button
                    onClick={() => {
                      onWalletSelection(wallet.address);
                      setIsBottomSheetOpen(false);
                    }}
                    className={cx(styles.walletOption, {
                      [styles.active]: activeWallet?.address === wallet.address,
                    })}
                  >
                    <div className={styles.walletInfo}>
                      <span className={styles.walletName}>Wallet {wallet.name || wallet.address.slice(0, 6)}</span>
                      <span className={styles.walletAddress}>{wallet.address}</span>
                    </div>
                    <div className={styles.walletActions}>
                      {activeWallet?.address === wallet.address && (
                        <div className={styles.activeIndicator} />
                      )}
                      <button
                        className={styles.removeWalletButton}
                        onClick={(e) => handleRemoveWallet(wallet.address, e)}
                        title="Remove wallet"
                      >
                        Delete
                      </button>
                    </div>
                  </button>
                </div>
              ))}
              <div className={styles.bottomSheetDivider} />
              <button
                className={styles.addNewWallet}
                onClick={onAddNewWallet}
              >
                Add New Wallet
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WalletInfo;
