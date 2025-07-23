import React from 'react'
import styles from './style.module.scss'
import { EthereumIcon, SearchIcon } from '@assets/icons'
import CardSection from '@components/CardSection'
import Input from '@components/UI/Input'
import { useLocation } from 'react-router-dom'

const cards = [
    //{ title: 'TON', description: 'On TON', picture: <TonIcon width={31} height={31} />, route: '/ton' },
    { title: 'ETH', description: 'On ETH', picture: <EthereumIcon width={31} height={31} />, route: '/eth' },
];

const ActionsPage: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname.includes('/deposit') ? '/deposit' : '/send';

    return (
        <div className={styles['actions-page']}>
            <Input icon={<SearchIcon width={20} height={20} />} placeholder='Search' />
            <CardSection cards={cards} basePath={currentPath}>Select token</CardSection>
        </div>
    )
}

export default ActionsPage