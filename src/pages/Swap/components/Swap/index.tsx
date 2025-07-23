import React from 'react'
import Card from '@components/UI/Card'
import styles from './style.module.scss'
import InputSwap from '../InputSwap'
import Button from '@components/UI/Button'

const Swap: React.FC = () => {
    return (
        <Card className={styles['swap']}>
            <div className={styles['swap-inputs']}>
                <div className={styles['swap-from']}>
                    <div>From</div>
                    <div className={styles['swap-from-max']}>Max</div>
                </div>
                <InputSwap />
                <div className={styles['swap-to']}>To</div>
                <InputSwap />
            </div>
            <Button className={styles['swap-button']}>Swap</Button>
        </Card>
    )
}

export default Swap