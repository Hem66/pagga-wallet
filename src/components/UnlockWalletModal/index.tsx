import React, { useState } from 'react';
import styles from './style.module.scss';
import { useLocalWallet } from '@/providers/LocalWalletProvider';

interface UnlockWalletModalProps {
  walletAddress: string;
  onClose: () => void;
  onSuccess: (walletAddress: string, password: string) => Promise<void>;
}

const UnlockWalletModal: React.FC<UnlockWalletModalProps> = ({
  walletAddress,
  onClose,
  onSuccess
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { localWallets } = useLocalWallet();

  const selectedWallet = localWallets.find(w => w.address === walletAddress);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onSuccess(walletAddress, password);
    } catch (err) {
      console.error('Unlock error:', err);
      setError('Invalid password or wallet access failed');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUnlock(e);
    }
  };

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles.modal}>
        <div className={styles['modal-content']}>
          <div className={styles['drag-handle']} />
          <button
            className={styles['close-button']}
            onClick={onClose}
            disabled={loading}
          >
            ×
          </button>
          <div className={styles['modal-content']}>
            <h2>Unlock Wallet</h2>

            {selectedWallet && (
              <div className={styles['wallet-info']}>
                <p className={styles['wallet-name']}>
                  {selectedWallet.name || 'Unnamed Wallet'}
                </p>
                <p className={styles['wallet-address']}>
                  {`${selectedWallet.address.slice(0, 6)}...${selectedWallet.address.slice(-4)}`}
                </p>
              </div>
            )}

            <form onSubmit={handleUnlock}>
              <div className={styles['input-group']}>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  autoFocus
                />
                {error && <p className={styles.error}>{error}</p>}
              </div>

              <div className={styles['button-group']}>
                <button
                  type="button"
                  onClick={onClose}
                  className={styles['secondary-button']}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles['primary-button']}
                  disabled={loading}
                >
                  {loading ? 'Unlocking...' : 'Unlock'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockWalletModal;
