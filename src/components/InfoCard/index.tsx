import React from 'react'
import styles from './style.module.scss'
import Card from '@components/UI/Card'

interface IProps {
    title: string
    description: string
    full?: React.ReactElement
    picture: React.ReactElement
}

const InfoCard: React.FC<IProps> = ({ title, description, full, picture }) => {
    return (
        <Card className={styles['info-card']}>
            <div className={styles['info-card-main']}>
                {picture}
                <div>
                    <div className={styles['info-card-main__title']}>{title}</div>
                    <div className={styles['info-card-main__description']}>{description}</div>
                </div>
            </div>
            {full && <div className={styles['info-card-full']}>
                {full}
            </div>}
        </Card>
    )
}

export default InfoCard