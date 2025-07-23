// src/pages/TestEarn/index.tsx
import React, { useCallback } from 'react'
import styles from './style.module.scss'
import Card from '@components/UI/Card'
import Button from '@components/UI/Button'
import Typography from '@components/UI/Typography'
import { SendIcon, ReceivedIcon } from '@assets/icons'
import { useTokenBalances } from '@/hooks/useTokenBalances'
import { useLockTokens } from '@/hooks/useLockTokens'
import { useUnlockTokens } from '@/hooks/useUnlockTokens'
import { formatUnits } from 'ethers/utils'

const TestEarn: React.FC = () => {
  const { lockedBalance, unlockedBalance, refreshBalances } = useTokenBalances();
  const { lockTokens, loading: lockLoading, error: lockError } = useLockTokens();
  const { unlockTokens, loading: unlockLoading, error: unlockError } = useUnlockTokens();

  const handleLock = useCallback(async () => {
    if (!unlockedBalance) return
    await lockTokens(Number(unlockedBalance));
    refreshBalances();
  }, [lockTokens, refreshBalances, unlockedBalance]);

  const handleUnLock = useCallback(async () => {
    if (!lockedBalance) return
    await unlockTokens(Number(lockedBalance));
    refreshBalances();
  }, [unlockTokens, refreshBalances, lockedBalance]);

  return (
    <div className={styles.testEarn}>
      <Typography size='20' weight='700' textAlign='center'>Test Token Staking</Typography>
      <Typography size='14' textAlign='center' color='var(--gray-secondary)'>Stake and unstake your test tokens</Typography>
      
      <Card className={styles.stakeCard}>
        <div className={styles.balance}>
          <Typography size='16' weight='600'>Available Balance:</Typography>
          <Typography size='16'>{formatUnits(unlockedBalance ? unlockedBalance as string : '0', 18)} PAGGA</Typography>
        </div>
        <div className={styles.balance}>
          <Typography size='16' weight='600'>Staked Balance:</Typography>
          <Typography size='16'>{formatUnits(lockedBalance ? lockedBalance as string : '0', 18)} PAGGA</Typography>
        </div>
        <div className={styles.actions}>
          <Button onClick={handleLock} icon={<SendIcon width={22} height={22} />}>{lockLoading ? 'Staking...' : 'Stake'}</Button>
          <Button onClick={handleUnLock} icon={<ReceivedIcon width={22} height={22} />}>{unlockLoading ? 'Unstaking...' : 'Unstake'}</Button>
        </div>
        {(lockLoading || unlockLoading) && <div className={styles.message}>Confirm in wallet</div>}
        {lockError && <div className={styles.error}>Error staking tokens</div>}
        {unlockError && <div className={styles.error}>Error unstaking tokens</div>}
      </Card>
    </div>
  )
}

export default TestEarn
