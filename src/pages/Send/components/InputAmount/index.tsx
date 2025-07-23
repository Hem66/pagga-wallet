import React, { useState } from 'react'
import Card from '@components/UI/Card'
import Dropdown, { DropdownItem } from '@components/UI/Dropdown'
import { EthereumIcon, SolanaIcon, TonIcon, TronIcon } from '@assets/icons';
import styles from './style.module.scss'
import Input from '@components/UI/Input';
import Typography from '@components/UI/Typography';


const cryptoItems: DropdownItem[] = [
  { label: 'TON', icon: <TonIcon width={20} height={20} /> },
  { label: 'Solana', icon: <SolanaIcon width={20} height={20} /> },
  { label: 'Tron', icon: <TronIcon width={20} height={20} /> },
  { label: 'Ethereum', icon: <EthereumIcon width={20} height={20} /> },
];

const handleSelect = (item: DropdownItem) => {
  console.log(`Selected: ${item.label}`);
};


const InputAmount: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Card className={styles['input-amount']}>
      <div className={styles['amount-dropdown-container']}>
      <Dropdown
        items={cryptoItems}
        onSelect={handleSelect}
        className={styles['amount-dropdown']}
        allItems
      />
      </div>
      <div className={styles['amount-container']}>
      <div className={styles['amount-input']}>
        <Input
          className={styles['input-container']}
          inputClass={styles['input']}
          placeholder="0"
          value={inputValue}
          onChange={handleInputChange}
          rightContent={
            <Typography size="20" weight="600" color="var(--gray-color)">
              TON
            </Typography>
          }
        />
        <Typography size='14' color='var(--gray-color)'>0,00 USD</Typography>
      </div>
      <div className={styles['amount-available']}>
        <div className={styles['amount-max']}>Max</div>
        <Typography size='14' weight='500' color='var(--gray-color)'>0 TON available</Typography>
      </div>
      </div>
    </Card>
  )
}

export default InputAmount