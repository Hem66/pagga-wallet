import React from 'react'
import styles from './style.module.scss'
import Typography from '@components/UI/Typography'
import { formatDecimals } from '@/utils/utils'

interface IProps {
    token: string
    chain: string
    value: string
    amount: string
    imageUrl?: string
    icon?: React.ReactElement
    symbol: string
    priceChange: string
    isVerified: boolean
    isSpam?: boolean
}

const TokenInfo: React.FC<IProps> = ({ 
  token, 
  chain, 
  value, 
  amount, 
  imageUrl, 
  icon,
  symbol,
  priceChange,
  isVerified,
  isSpam
}) => {
    const priceChangeNum = Number(priceChange)
    const amountNum = Number(amount)

    return (
        <div className={`${styles['token-card']} ${isSpam ? styles['token-card--spam'] : ''}`}>
            <div className={styles['token-card-info']}>
                <div className={styles['token-card-info__icon']}>
                    {imageUrl ? (
                        <img 
                            src={imageUrl} 
                            alt={token} 
                            width={40} 
                            height={40}
                            className={styles['token-card-info__image']}
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                // Show icon fallback container
                                (e.target as HTMLImageElement).nextElementSibling?.classList.remove(styles['hidden']);
                            }}
                        />
                    ) : icon ? (
                        <div className={styles['token-card-info__icon-fallback']}>
                            {icon}
                        </div>
                    ) : null}
                    {isVerified && (
                        <span className={styles['token-card-info__verified']} />
                    )}
                    {isSpam && (
                        <span className={styles['token-card-info__spam']} />
                    )}
                </div>
                <div>
                    <div className={styles['token-card-info__title']}>{token}</div>
                    <div className={styles['token-card-info__chain']}>{chain}</div>
                </div>
            </div>
            <div className={styles['token-card-amount']}>
                <Typography>
                    {formatDecimals(value)} <span className={styles['token-card-token']}>{symbol}</span>
                </Typography>
                <div className={styles['token-card-price']}>
                    <Typography color='var(--gray-color)'>
                        ${amountNum.toFixed(2)}
                    </Typography>
                    <span 
                        className={styles['token-card-price__change']}
                        data-positive={priceChangeNum >= 0}
                    >
                        {priceChangeNum >= 0 ? '+' : ''}{priceChangeNum.toFixed(2)}%
                    </span>
                </div>
            </div>
        </div>
    )
}

export default TokenInfo
