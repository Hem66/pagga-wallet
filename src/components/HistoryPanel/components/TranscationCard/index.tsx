import React from 'react'
import styles from './style.module.scss'
import Typography from '@components/UI/Typography'
import Card from '@components/UI/Card'
import { ReceivedIcon, SentIcon } from '@assets/icons'
import { formatDecimals } from '@/utils/utils'

interface IProps {
  sent?: boolean
  amount: string
  date: string
  address: string
  tokenLabel?: string | null
  isNativeTransfer: boolean
  tokenLogo?: string | null
  isSpam: boolean
  isVerified: boolean
  securityScore: number
  entityLogo?: string | null
}
const shortenAddress = (address: string): string => {
  if (!address) return '';
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const shortenTicker = (ticker: string): string => {
  if (ticker.length <= 8) return ticker;
  return `${ticker.slice(0, 8)}...`;
};

const TransactionCard: React.FC<IProps> = ({ 
  sent, 
  amount, 
  date, 
  address, 
  tokenLabel,
  isNativeTransfer,
  tokenLogo,
  isSpam,
//  isVerified,
  securityScore,
  entityLogo
}) => {
  const ticker = isNativeTransfer ? 'ETH' : tokenLabel || 'Unknown Token'
  const shortenedAddress = shortenAddress(address)

  return (
    <Card className={`${styles['transaction-card']} ${isSpam ? styles['transaction-card--spam'] : ''}`}>
      <div className={styles['transaction-card-main']}>
        {entityLogo ? (
          <img 
            src={entityLogo} 
            alt=""
            width={40} 
            height={40} 
            className={styles['transaction-card-main__entity-logo']}
          />
        ) : (
          sent ? <SentIcon width={40} height={40} /> : <ReceivedIcon width={40} height={40} />
        )}
        <div>
          <div className={styles['transaction-card-main__state']}>
            {sent ? 'Sent' : 'Received'}
            {isSpam && <span className={styles['transaction-card-main__spam-badge']}>SPAM</span>}
          </div>
          <div 
            className={styles['transaction-card-main__address']} 
            title={address}
          >
            {shortenedAddress}
          </div>
        </div>
      </div>
      <div className={styles['transaction-card-info']}>   
        <div className={styles['transaction-card-info__amount']}>
          <Typography size='18' color={!sent ? 'var(--green-color)' : undefined}>
            {!sent && '+'}{formatDecimals(amount)} <span className={styles['token-card-token']}>{shortenTicker(ticker)}</span>
          </Typography>
          {tokenLogo && (
            <img 
              src={tokenLogo} 
              alt={tokenLabel || ''} 
              width={20} 
              height={20}
              className={styles['transaction-card-info__token-logo']}
            />
          )}
        </div>
        <Typography size='14' color={!sent ? 'var(--green-color)' : undefined}>
          {date}
        </Typography>
        {securityScore < 1 && (
          <div className={styles['transaction-card-info__security-warning']}>
            Low security score
          </div>
        )}
      </div>
    </Card>
  )
}

export default TransactionCard
