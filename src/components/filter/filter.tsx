import React from 'react';
import { FC, useState } from 'react';

interface FilterProps<T> {
  options: T[];
  selectedValues: T[];
  onFilterChange: (selectedValues: T[]) => void;
  renderItem: (item: T) => React.ReactNode; // Функция для рендеринга элемента фильтра
}

export const Filter: FC<FilterProps<any>> = ({
  options,
  selectedValues,
  onFilterChange,
  renderItem
}) => {
  const [selectedItems, setSelectedItems] = useState<any[]>(selectedValues);

  const handleItemClick = (item: any) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
    onFilterChange(selectedItems);
  };

  return (
    <div>
      {options.map((item) => (
        <div key={item}>
          <input
            type='checkbox'
            id={`item-${item}`}
            value={item}
            checked={selectedItems.includes(item)}
            onChange={() => handleItemClick(item)}
          />
          <label htmlFor={`item-${item}`}>{renderItem(item)}</label>
        </div>
      ))}
    </div>
  );
};
