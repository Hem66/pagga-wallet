import { Wallet, HDNodeWallet, SigningKey } from 'ethers';
import { encrypt, decrypt } from '@metamask/browser-passworder';
import { Buffer } from 'buffer';
export interface StoredWallet {
  address: string;
  encryptedPrivateKey: string;
  name?: string;
  mnemonic?: string; // Stored encrypted
}

if (typeof window !== 'undefined') {
    window.Buffer = Buffer;
  }  

export class WalletService {
  private static WALLETS_KEY = 'pagga_wallets';
  //private static SESSION_KEY = 'pagga_session';
  
  // Create new wallet
  static async createWallet(password: string, name?: string): Promise<StoredWallet> {
    const wallet = Wallet.createRandom();
    console.log("wallet", wallet)
    return await this.storeWallet(wallet, password, name, wallet.mnemonic?.phrase || 'error');
  }

  // Import wallet from private key
  static async importFromPrivateKey(privateKey: string, password: string, name?: string): Promise<StoredWallet> {
    console.log("privateKey", privateKey)
    const wallet = new Wallet(privateKey);
    return await this.storeWallet(wallet, password, name);
  }

  // Import wallet from mnemonic
  static async importFromMnemonic(mnemonic: string, password: string, name?: string): Promise<StoredWallet> {
    console.log("mnemonic", mnemonic)
    const wallet = Wallet.fromPhrase(mnemonic);
    return await this.storeWallet(wallet, password, name, mnemonic);
  }

  // Store wallet securely
  private static async storeWallet(
    wallet: Wallet | HDNodeWallet, 
    password: string, 
    name?: string,
    mnemonic?: string
  ): Promise<StoredWallet> {
    const encryptedPrivateKey = await encrypt(password, wallet.privateKey);
    //const encryptedMnemonic = mnemonic ? await encrypt(password, mnemonic) : undefined;

    const storedWallet: StoredWallet = {
      address: wallet.address,
      encryptedPrivateKey,
      name,
      //mnemonic: encryptedMnemonic
      mnemonic
    };

    // Get existing wallets
    const existingWallets = this.getStoredWallets();
    existingWallets.push(storedWallet);
    
    // Save updated wallets list
    localStorage.setItem(this.WALLETS_KEY, JSON.stringify(existingWallets));

    return storedWallet;
  }

  // Get all stored wallets
  static getStoredWallets(): StoredWallet[] {
    const walletsJson = localStorage.getItem(this.WALLETS_KEY);
    return walletsJson ? JSON.parse(walletsJson) : [];
  }

  // Decrypt and get wallet instance
  static async getWallet(address: string, password: string): Promise<Wallet | null> {
    const storedWallet = this.getStoredWallets().find(w => w.address === address);
    if (!storedWallet) return null;

    try {
      const privateKey = await decrypt(password, storedWallet.encryptedPrivateKey) as SigningKey;
      return new Wallet(privateKey);
    } catch (error) {
      console.error('Failed to decrypt wallet:', error);
      return null;
    }
  }

  // Get recovery phrase if available
  static async getRecoveryPhrase(address: string, password: string): Promise<string | null> {
    const storedWallet = this.getStoredWallets().find(w => w.address === address);
    if (!storedWallet?.mnemonic) return null;

    try {
      return await decrypt(password, storedWallet.mnemonic) as string;
    } catch (error) {
      console.error('Failed to decrypt recovery phrase:', error);
      return null;
    }
  }

  // Remove wallet
  static removeWallet(address: string): void {
    const wallets = this.getStoredWallets().filter(w => w.address !== address);
    localStorage.setItem(this.WALLETS_KEY, JSON.stringify(wallets));
  }
}
