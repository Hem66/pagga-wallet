import React, { PropsWithChildren } from 'react'
import styles from './style.module.scss'


interface WalletTooltipProps extends PropsWithChildren {
  onClick?: () => void;
}

const WalletTooltip: React.FC<WalletTooltipProps> = ({children, onClick}) => {
  return (
    <div className={styles['wallet-tooltip']} onClick={onClick}>
      <span className={styles['wallet-tooltip__text']}>
        {typeof children === 'string' ? `Wallet ${children}` : children}
      </span>
      <div className={styles['wallet-tooltip__circle']}></div>
    </div>
  )
}

export default WalletTooltip