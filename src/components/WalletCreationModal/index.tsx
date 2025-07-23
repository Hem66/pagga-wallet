import React, { useState } from 'react';
import styles from './style.module.scss'
import { useLocalWallet } from '@/providers/LocalWalletProvider';
import { usePrivy } from '@privy-io/react-auth';

interface WalletCreationModalProps {
  onClose: () => void;
  onSuccess: (walletAddress: string) => void;
}

const WalletCreationModal: React.FC<WalletCreationModalProps> = ({ onClose, onSuccess }) => {
  const { login } = usePrivy();
  const [step, setStep] = useState<'select' | 'create' | 'import' | 'showMnemonic'>('select');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [walletName, setWalletName] = useState('');
  const [error, setError] = useState('');
  const [newMnemonic, setNewMnemonic] = useState('');
  const [createdWalletAddress, setCreatedWalletAddress] = useState('');

  const { createWallet, importFromPrivateKey, importFromMnemonic } = useLocalWallet();

  const handleExternalWallet = async () => {
    try {
      await login();
      onClose();
    } catch (error) {
      console.error('Failed to connect external wallet:', error);
      setError('Failed to connect external wallet');
    }
  };

  const handleCreateWallet = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const createdWallet = await createWallet(password, walletName);
      console.log('Created wallet:', createdWallet); // Debug log
      setNewMnemonic(createdWallet.mnemonic || '');
      setCreatedWalletAddress(createdWallet.address);
      setStep('showMnemonic');
    } catch (err) {
      setError(`Failed to create wallet: ${err}`);
    }
  };

  const handleImportWallet = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      let importedWallet;
      if (privateKey) {
        importedWallet = await importFromPrivateKey(privateKey, password, walletName);
      } else if (mnemonic) {
        importedWallet = await importFromMnemonic(mnemonic, password, walletName);
      }
      if (importedWallet) {
        onSuccess(importedWallet.address);
      }
      onClose();
    } catch (err) {
      setError(`Failed to import wallet: ${err}`);
    }
  };

  const handleMnemonicConfirmed = () => {
    onSuccess(createdWalletAddress);
    onClose();
  };

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles.modal}>
        <div className={styles['modal-content']}>
          <div className={styles['drag-handle']} />
          <button
            className={styles['close-button']}
            onClick={onClose}
            disabled={step === 'showMnemonic'}
          >
            ×
          </button>

          {step === 'select' && (
            <>
              <h2>Choose Wallet Option</h2>
              <div className={styles['button-group']}>
                <button className={styles['primary-button']} onClick={() => setStep('create')}>Create New Wallet</button>
                <button className={styles['primary-button']} onClick={() => setStep('import')}>Import Existing Wallet</button>
                <button className={styles['primary-button']} onClick={handleExternalWallet}>
                  Connect External Wallet
                </button>
              </div>
            </>
          )}

          {step === 'create' && (
            <>
              <h2>Create New Wallet</h2>
              <div className={styles['input-group']}>
                <input
                  type="text"
                  placeholder="Wallet Name"
                  value={walletName}
                  onChange={(e) => setWalletName(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles['button-group']}>
                  <button className={styles['primary-button']} onClick={handleCreateWallet}>Create Wallet</button>
                  <button className={styles['secondary-button']} onClick={() => setStep('select')}>Back</button>
                </div>
              </div>
            </>
          )}

          {step === 'import' && (
            <>
              <h2>Import Wallet</h2>
              <div className={styles['input-group']}>
                <input
                  type="text"
                  placeholder="Wallet Name"
                  value={walletName}
                  onChange={(e) => setWalletName(e.target.value)}
                />
                <textarea
                  placeholder="Enter Private Key"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                />
                <p>OR</p>
                <textarea
                  placeholder="Enter Recovery Phrase"
                  value={mnemonic}
                  onChange={(e) => setMnemonic(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles['button-group']}>
                  <button className={styles['primary-button']} onClick={handleImportWallet}>Import Wallet</button>
                  <button className={styles['secondary-button']} onClick={() => setStep('select')}>Back</button>
                </div>
              </div>
            </>
          )}

          {step === 'showMnemonic' && (
            <>
              <h2>Wallet Created Successfully</h2>
              <div className={styles['warning-box']}>
                <p>⚠️ Important: Save your recovery phrase securely</p>
                <p>This is the only way to recover your wallet if you forget your password.</p>
              </div>
              <textarea
                readOnly
                value={newMnemonic}
                className={styles['mnemonic-textarea']}
                onClick={(e) => e.currentTarget.select()}
              />
              <div className={styles['info-text']}>
                <p>Click to select and copy. Store this phrase in a safe place.</p>
              </div>
              <div className={styles['button-group']}>
                <button
                  className={styles['primary-button']}
                  onClick={handleMnemonicConfirmed}
                >
                  I've Saved My Recovery Phrase
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default WalletCreationModal;
