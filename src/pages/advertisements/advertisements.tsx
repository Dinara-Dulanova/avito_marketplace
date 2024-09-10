import { TAdvertisment } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../utils/hooks/hooks';
import {
  fetchAdvertisements,
  fetchAdvertisementsPerPage
} from '../../services/slices/advertisements';
import { Preloader } from '../../components/ui/preloader/preloader';
import { AdvertisementCard } from '../../components/advertisement-card/advertisement-card';
import './advertisements.css';
import { SearchBar } from '../../components/search-bar/search-bar';
import { Pagination } from '../../components/pagination/pagination';
import { AddAdvertisementButton } from '../../components/add-advertisement-button';
import { AddAdvertisementModal } from '../../components/add-advertisement-modal';
import { Modal } from '../../components/modal/modal';

export const Advertisements: FC = () => {
  const dispatch = useDispatch(); //загружаю данные по моим объявлениям
  useEffect(() => {
    dispatch(fetchAdvertisements());
  }, []);

  const advertisements: TAdvertisment[] = useSelector(
    (state) => state.advertisements.advertisements
  );

  const isAdvertisementsLoading = useSelector((store) =>
    store.advertisements.status === 'Loading' ? true : false
  );

  //search
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const debouncedValue = useDebounce(searchText, 500);

  const [filteredAdvertisements, setFilteredAdvertisements] = useState<
    TAdvertisment[]
  >([]);

  const handleSearch = (search: string) => {
    setSearchText(search);
  };

  useEffect(() => {
    if (advertisements.length > 0) {
      setLoading(true);
      const filtered = advertisements.filter((advertisement) =>
        advertisement.name.toLowerCase().includes(debouncedValue.toLowerCase())
      );
      setFilteredAdvertisements(filtered);
      setLoading(false);
    }
  }, [debouncedValue, advertisements]);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AddAdvertisementButton onClick={handleModalOpen} />
      <SearchBar onSearch={handleSearch} />
      {isAdvertisementsLoading ? (
        <Preloader />
      ) : (
        <main className='advertisements'>
          {filteredAdvertisements.map((advertisement) => (
            <AdvertisementCard
              key={advertisement.id}
              advertisement={advertisement}
            />
          ))}
        </main>
      )}
      {isModalOpen && (
        <>
          <Modal title='Добавить объявление' onClose={handleModalClose}>
            <AddAdvertisementModal />
          </Modal>
        </>
      )}
    </>
  );
};
