import React from 'react'
import Swap from './components/Swap'
import WalletMenu from '@components/WalletMenu'
import styles from './style.module.scss'
import Provider from './components/Provider'

const SwapPage: React.FC = () => {
  return (
    <div className={styles['swap-page']}>
        <WalletMenu />
        <Swap />
        <Provider />
    </div>
  )
}

export default SwapPage