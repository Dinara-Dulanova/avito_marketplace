import { FC } from 'react';
import { AddAdvertisementButton } from '../../ui/add-advertisement-button/add-advertisement-button';
import { SearchBar } from '../../search-bar';
import './style.css';

interface AdvertisementPanelUIProps {
  handleModalOpen: () => void;
  handleSearch: (search: string) => void;
}

export const AdvertisementPanelUI: FC<AdvertisementPanelUIProps> = ({
  handleModalOpen,
  handleSearch
}) => (
  <div className='advertisement-panel'>
    <AddAdvertisementButton onClick={handleModalOpen} />
    <SearchBar onSearch={handleSearch} />
  </div>
);
