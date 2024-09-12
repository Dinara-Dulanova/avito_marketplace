import { FC } from 'react';
import { Button, Input } from '@mui/material';
import './search-bar.css';

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
    <Input
      className='search__input'
      type='text'
      placeholder='Я ищу...'
      value={searchText}
      onChange={handleChange}
    />
    <Button
      className='reset-search__button'
      onClick={resetChange}
      variant='outlined'
    >
      Сбросить
    </Button>
    {/* <button >
      
    </button> */}
  </div>
);
