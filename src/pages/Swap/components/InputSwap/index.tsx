import React from 'react'
import Dropdown, { DropdownItem } from '@components/UI/Dropdown'
import { EthereumIcon, SolanaIcon, TonIcon, TronIcon } from '@assets/icons';
import styles from './style.module.scss'
import Input from '@components/UI/Input';

const cryptoItems: DropdownItem[] = [
    { label: 'Toncoin', icon: <TonIcon width={20} height={20} /> },
    { label: 'Solana', icon: <SolanaIcon width={20} height={20} /> },
    { label: 'Tron', icon: <TronIcon width={20} height={20} /> },
    { label: 'Ethereum', icon: <EthereumIcon width={20} height={20} /> },
  ];
  
  const handleSelect = (item: DropdownItem) => {
    console.log(`Selected: ${item.label}`);
  };

const InputSwap: React.FC = () => {
  return (
    <div className={styles['swap-input']}>
        <Dropdown
          items={cryptoItems}
          onSelect={handleSelect}
          defaultLabel="All chains"
          className={styles['swap__button']}
          allItems
        />
        <Input className={styles['swap__input']} inputClass={styles['swap__input']} placeholder={`Balance: ${1000} TON`} />
    </div>
  )
}

export default InputSwap