import React, { useState, useEffect } from 'react';
import Card from '@UI/Card';
import Button from '@UI/Button';
import { ArrowIcon } from '@assets/icons';
import styles from './style.module.scss';

export interface DropdownItem {
  label: string;
  icon?: JSX.Element;
  value?: string;
}

interface IProps {
  items: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
  defaultLabel?: string;
  className?: string;
  allItems?: boolean;
  selectedValue?: string; // Add selectedValue prop
}

const Dropdown: React.FC<IProps> = ({
  items,
  onSelect,
  defaultLabel = 'Select item',
  className,
  allItems,
  selectedValue
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

  // Update selected item when selectedValue changes
  useEffect(() => {
    if (selectedValue) {
      const item = items.find(i => i.value === selectedValue);
      if (item) {
        setSelectedItem(item);
      }
    } else {
      setSelectedItem(null);
    }
  }, [selectedValue, items]);

  const handleSelect = (item: DropdownItem): void => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);
  };

  const displayItem = selectedItem || (allItems ? items[0] : null);

  return (
    <div className={styles['dropdown-container']}>
      <Button
        className={className}
        onClick={() => setIsOpen(!isOpen)}
      >
        {displayItem ? (
          <>
            {displayItem.icon} {displayItem.label}
            <ArrowIcon width={10} height={10} />
          </>
        ) : (
          <>
            {defaultLabel} <ArrowIcon width={10} height={10} />
          </>
        )}
      </Button>

      {isOpen && (
        <div className={styles['dropdown-card-container']}>
          <Card className={styles['dropdown-card']}>
            {items.map((item) => (
              <div
                key={item.label}
                className={`${styles['dropdown-item']} ${
                  selectedItem?.value === item.value ? styles['selected'] : ''
                }`}
                onClick={() => handleSelect(item)}
              >
                {item.icon} {item.label}
              </div>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
