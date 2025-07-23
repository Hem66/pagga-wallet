import React from 'react'
import { Link } from 'react-router-dom'
import InfoCard from "@components/InfoCard";
import Typography from "@components/UI/Typography";
import styles from './style.module.scss'

interface IProps {
    children: React.ReactNode;
    cards: Array<{ title: string; description: string; picture: React.ReactElement; route: string }>;
    basePath: string;
}

const CardSection: React.FC<IProps> = ({ children, cards, basePath }) => (
    <div className={styles['cards-section']}>
        <Typography size='16' weight='700' className={styles['cards-section__title']}>
            {children}
        </Typography>
        <div className={styles['cards-section__cards']}>
            {cards.map((card, index) => (
                <Link to={`${basePath}${card.route}`} key={index}>
                    <InfoCard
                        title={card.title}
                        description={card.description}
                        picture={card.picture}
                    />
                </Link>
            ))}
        </div>
    </div>
);

export default CardSection
