import React from 'react'
import Typography from '@components/UI/Typography'
import styles from './style.module.scss'
import { EvaaIcon, TonWhalesIcon } from '@assets/icons'
import CardSection from '@components/CardSection'

// Add a new icon for Pagga Test Earn
//import { PaggaIcon } from '@assets/icons'

const cards = [
  { title: 'Evaa protocol', description: 'APR: 23%', picture: <EvaaIcon width={31} height={31} />, route: '/evaa' },
  { title: 'TON Whales', description: 'APR: 23%', picture: <TonWhalesIcon width={31} height={31} />, route: '/whales' },
  // Add the new Pagga Test Earn option
  { title: 'Pagga Test Earn', description: 'Stake/Unstake Test Tokens', picture: <TonWhalesIcon width={31} height={31} />, route: '/testEarn' },
];

const EarnPage: React.FC = () => {
  return (
    <div className={styles['earn-page']}>
      <div>
        <Typography size='20' weight='700' textAlign='center'>Staking</Typography>
        <Typography size='14' textAlign='center' color='var(--main-color)'>Participate in staking and earn rewards!</Typography>
      </div>
      <CardSection cards={cards} basePath='/earn'>Select dApps</CardSection>
    </div>
  )
}

export default EarnPage
