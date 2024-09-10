import { FC, useState } from 'react';
import { SearchBarUI } from '../ui/search-bar';

interface SearchBarProps {
  onSearch: (searchText: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  const resetChange = () => {
    setSearchText('');
    onSearch('');
  };

  return (
    <SearchBarUI
      searchText={searchText}
      handleChange={handleChange}
      resetChange={resetChange}
    />
  );
};
