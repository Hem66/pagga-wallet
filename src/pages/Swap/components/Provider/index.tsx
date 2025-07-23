import React from 'react'
import Card from '@components/UI/Card'
import styles from './style.module.scss'
import Typography from '@components/UI/Typography'
import Dropdown, { DropdownItem } from '@components/UI/Dropdown'
import { EthereumIcon, SolanaIcon, TonIcon, TronIcon } from '@assets/icons'
import Button from '@components/UI/Button'


const cryptoItems: DropdownItem[] = [
    { label: 'TON', icon: <TonIcon width={20} height={20} /> },
    { label: 'Solana', icon: <SolanaIcon width={20} height={20} /> },
    { label: 'Tron', icon: <TronIcon width={20} height={20} /> },
    { label: 'Ethereum', icon: <EthereumIcon width={20} height={20} /> },
];

const handleSelect = (item: DropdownItem) => {
    console.log(`Selected: ${item.label}`);
};


const Provider: React.FC = () => {
    return (
        <Card className={styles['provider']}>
            <div className={styles['provider-header']}>
                <Typography size='16' weight='700'>Provider</Typography>
                <Dropdown
                    items={cryptoItems}
                    onSelect={handleSelect}
                    className={styles['provider-dropdown']}
                    allItems
                />
            </div>
            <div className={styles['provider-content']}>
                <Typography size='14' color='var(--gray-color)' width='140px'>Link your Binance account to continue</Typography>
                <Button className={styles['provider-button']}>Start</Button>
            </div>
        </Card>
    )
}

export default Provider