import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.scss';
import Button from '@components/UI/Button';
import Typography from '@components/UI/Typography';
import QRCode from 'react-qr-code';
import { useAccount } from 'wagmi';
import { useLocalWallet } from '@/providers/LocalWalletProvider';

const DepositPage: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const { address: wagmiAddress } = useAccount();
    const { activeWallet } = useLocalWallet();
    const [copied, setCopied] = useState(false);

    const address = activeWallet?.address || wagmiAddress;
    const tokenUpperCase = token?.toUpperCase();

    const handleCopy = async () => {
        if (address) {
            await navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!address) {
        return (
            <div className={styles['deposit-page']}>
                <Typography>Please connect your wallet first</Typography>
            </div>
        );
    }

    return (
        <div className={styles['deposit-page']}>
            <div className={styles['deposit-page-header']}>
                <Typography tag="h2" size="24" weight="600">
                    Deposit <span className={styles.token}>{tokenUpperCase}</span>
                </Typography>
                <Typography size="14" color="var(--gray-color)">
                    Send only <span className={styles.token}>{tokenUpperCase}</span> to this address
                </Typography>
            </div>

            <div className={styles['deposit-page-qr']}>
                <QRCode
                    value={address}
                    size={200}
                    style={{ background: 'white', padding: '16px' }}
                />
            </div>

            <div className={styles['deposit-page-address']}>
                <Typography size="14" color="var(--gray-color)">
                    Your {tokenUpperCase} address
                </Typography>
                <Typography size="16">{address}</Typography>
            </div>

            <div className={styles['deposit-page-buttons']}>
                <Button onClick={handleCopy}>
                    {copied ? 'Copied!' : 'Copy Address'}
                </Button>
                
                {navigator.share && (
                    <Button
                        onClick={() => {
                            navigator.share({
                                title: `My ${tokenUpperCase} Address`,
                                text: address
                            });
                        }}
                        className={styles['deposit-page-buttons__share']}
                    >
                        Share Address
                    </Button>
                )}
            </div>

            <Typography 
                size="14" 
                color="var(--gray-color)"
                textAlign="center"
            >
                Transaction will be processed after network confirmation
            </Typography>
        </div>
    );
};

export default DepositPage;
