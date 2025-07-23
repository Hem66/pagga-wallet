import Input from '@components/UI/Input';
import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.scss';
import Typography from '@components/UI/Typography';
import { ScanIcon } from '@assets/icons';
import InputAmount from './components/InputAmount';

const SendPage: React.FC = () => {
    const { token } = useParams<{ token: string }>();

    const tokenUpperCase = token?.toUpperCase();

    return (
        <div className={styles['send-page']}>
            <Input className={styles['send-page__input-scan']}
                placeholder={`${tokenUpperCase} (${tokenUpperCase}) Address`}
                rightContent={<div className={styles['send-page-scan']}>
                    <Typography color='var(--primary)'>Insert</Typography>
                    <ScanIcon />
                </div>} />
            <Input placeholder={'Comment'} />
            <InputAmount />
        </div>
    );
};

export default SendPage;
