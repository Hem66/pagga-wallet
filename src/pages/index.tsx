import React from 'react'
import styles from './style.module.scss'
import BalanceCard from '../components/TokenBalance'
import WalletMenu from '@components/WalletMenu'
import HistoryPanel from '@components/HistoryPanel'

const MainPage: React.FC = () => {
  return (
    <div className={styles['main-page']}>
        <WalletMenu />
        <BalanceCard />
        <HistoryPanel />
    </div>
  )
}

export default MainPage