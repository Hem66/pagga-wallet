import React from 'react';
import cx from 'classnames';
import styles from './style.module.scss';

interface IProps {
  className?: string;
  inputClass?: string;
  icon?: React.ReactElement;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightContent?: React.ReactElement | JSX.Element;
}

const Input: React.FC<IProps> = ({
  className,
  inputClass,
  icon,
  placeholder = '',
  value = '',
  onChange,
  rightContent
}) => {
  const inputValue = String(value);
  const inputWidth = Math.max(inputValue.length, placeholder.length, 1);

  return (
    <div className={cx(styles['input-wrapper'], className)}>
      {icon && <div className={styles['input-icon']}>{icon}</div>}
      <input
        type="text"
        className={cx(styles['input'], inputClass)}
        placeholder={placeholder}
        value={inputValue}
        onChange={onChange}
        style={{ width: `${inputWidth}ch` }}
      />
      {rightContent && <div>{rightContent}</div>}
    </div>
  );
}

export default Input;
