import React, { createContext, useContext, useState, useEffect } from 'react';
import { WalletService, StoredWallet } from '../services/WalletService';
import { Wallet } from 'ethers';

interface LocalWalletContextType {
  localWallets: StoredWallet[];
  activeWallet: Wallet | null;
  createWallet: (password: string, name?: string) => Promise<StoredWallet>;
  importFromPrivateKey: (privateKey: string, password: string, name?: string) => Promise<StoredWallet>;
  importFromMnemonic: (mnemonic: string, password: string, name?: string) => Promise<StoredWallet>;
  unlockWallet: (address: string, password: string) => Promise<boolean>;
  removeWallet: (address: string) => void;
  getRecoveryPhrase: (address: string, password: string) => Promise<string | null>;
}

const LocalWalletContext = createContext<LocalWalletContextType | undefined>(undefined);

export const LocalWalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [localWallets, setLocalWallets] = useState<StoredWallet[]>([]);
  const [activeWallet, setActiveWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    setLocalWallets(WalletService.getStoredWallets());
  }, []);

  const createWallet = async (password: string, name?: string) => {
    const wallet = await WalletService.createWallet(password, name);
    setLocalWallets(WalletService.getStoredWallets());
    return wallet;
  };

  const importFromPrivateKey = async (privateKey: string, password: string, name?: string) => {
    const wallet = await WalletService.importFromPrivateKey(privateKey, password, name);
    setLocalWallets(WalletService.getStoredWallets());
    return wallet;
  };

  const importFromMnemonic = async (mnemonic: string, password: string, name?: string) => {
    const wallet = await WalletService.importFromMnemonic(mnemonic, password, name);
    setLocalWallets(WalletService.getStoredWallets());
    return wallet;
  };

  const unlockWallet = async (address: string, password: string) => {
    const wallet = await WalletService.getWallet(address, password);
    if (wallet) {
      setActiveWallet(wallet);
      return true;
    }
    return false;
  };

  const removeWallet = (address: string) => {
    WalletService.removeWallet(address);
    setLocalWallets(WalletService.getStoredWallets());
    if (activeWallet?.address === address) {
      setActiveWallet(null);
    }
  };

  
  const value = {
    localWallets,
    activeWallet,
    createWallet,
    importFromPrivateKey,
    importFromMnemonic,
    unlockWallet,
    removeWallet,
    getRecoveryPhrase: WalletService.getRecoveryPhrase
  };

  return (
    <LocalWalletContext.Provider value={value}>
      {children}
    </LocalWalletContext.Provider>
  );
};

export const useLocalWallet = () => {
  const context = useContext(LocalWalletContext);
  if (context === undefined) {
    throw new Error('useLocalWallet must be used within a LocalWalletProvider');
  }
  return context;
};
