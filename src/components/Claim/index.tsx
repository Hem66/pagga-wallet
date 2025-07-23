// src/components/Claim/index.tsx
import React from 'react';
import Button from '@components/UI/Button';
import { DepositIcon } from '@assets/icons';
import { useClaim } from '@/hooks/useClaim';
import styles from './style.module.scss';

const Claim: React.FC = () => {
  const { claim, loading, error } = useClaim();

  return (
    <Button 
      onClick={claim} 
      icon={<DepositIcon width={22} height={22} />} 
    >
      {loading ? 'Claiming...' : 'Claim PAGGA'}
      {loading && <div className={styles.message}>Confirm in wallet</div>}
      {error && <div className={styles.error}>{error}</div>}
    </Button>
  );
};

export default Claim;
