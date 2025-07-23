import React from 'react'
import styles from './style.module.scss'
import cx from 'classnames'

interface IProps {
    children: React.ReactNode
    className?: string
}


const Card: React.FC<IProps> = ({children, className}) => {
  return (
    <div className={cx(styles['card'], className)}>
        {children}
    </div>
  )
}

export default Card