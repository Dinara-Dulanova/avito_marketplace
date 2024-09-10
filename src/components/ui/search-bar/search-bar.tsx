import { FC, useState } from 'react';

interface SearchBarUIProps {
  searchText: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetChange: () => void;
}

export const SearchBarUI: FC<SearchBarUIProps> = ({
  searchText,
  handleChange,
  resetChange
}) => (
  <div className='search'>
    <input
      className='search__input'
      type='text'
      placeholder='Я ищу...'
      value={searchText}
      onChange={handleChange}
    />
    <button className='reset-search__button' onClick={resetChange}>
      Сбросить
    </button>
  </div>
);
