import React from 'react'
import styles from './style.module.scss'
import cx from 'classnames'

interface IProps {
  children: React.ReactNode
  className?: string
  icon?: React.ReactElement
  borderColor?: string
  text?: string
  active?: boolean
  onClick?: () => void,
  isDisabled?: boolean;
}

const Button: React.FC<IProps> = ({ children, className, icon = false, borderColor, text, active, onClick, isDisabled }) => {
  return (
    icon ? (
      <button onClick={onClick} className={`${styles['menu-button']}`} disabled={isDisabled}>
        <div className={cx(styles['menu-button__icon'], className, `${active && [styles['button__active']]}`)} style={{ borderColor: borderColor }}>
          {text}
          {text && <>&ensp;</>}
          {icon}
        </div>
        {children}
      </button>
    ) : (
      <button onClick={onClick} className={cx(styles['button'], className, `${active && [styles['button__active']]}`)} style={{ borderColor: borderColor }}>
        {children}
      </button>
    )
  )
}

export default Button
