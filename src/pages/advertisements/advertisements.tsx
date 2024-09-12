import { TAdvertisment } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDebounce } from '../../utils/hooks/hooks';
import {
  fetchAdvertisements,
  fetchAdvertisementsPerPage
} from '../../services/slices/advertisements';
import { Preloader } from '../../components/ui/preloader/preloader';
import { AdvertisementPreview } from '../../components/advertisement-preview/advertisement-preview';
import './advertisements.css';

import { Pagination } from '../../components/pagination/pagination';

import { AddAdvertisementModal } from '../../components/add-advertisement-modal';
import { Modal } from '../../components/modal/modal';
import { AdvertisementPanelUI } from '../../components/ui/advertisement-panel';

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

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  //pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(3);
  const [totalCountPage, setTotalCountPage] = useState(0);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    let arrAfterFilter: TAdvertisment[] = advertisements;

    if (searchText !== debouncedValue) {
      setCurrentPage(1); //установка на первую страницу при начале ввода в строку поиск
    }
    if (searchText) {
      arrAfterFilter = advertisements.filter((advertisement) =>
        advertisement.name.toLowerCase().includes(debouncedValue.toLowerCase())
      );
    }
    const arr = arrAfterFilter.slice(firstItemIndex, lastItemIndex);

    setTotalCountPage(arrAfterFilter.length);
    setFilteredAdvertisements(arr);
  }, [currentPage, debouncedValue, advertisements, itemsPerPage]);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <>
      <AdvertisementPanelUI
        handleModalOpen={handleModalOpen}
        handleSearch={handleSearch}
      />
      {isAdvertisementsLoading ? (
        <Preloader />
      ) : (
        <>
          <main className='advertisements'>
            {filteredAdvertisements.map((advertisement) => (
              <Link
                key={uuidv4()}
                to={`/advertisement/${advertisement.id}`}
                className='no-link-style'
              >
                <AdvertisementPreview advertisement={advertisement} />
              </Link>
            ))}
          </main>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={totalCountPage}
            paginate={paginate}
            currentPage={currentPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
      )}
      {isModalOpen && (
        <>
          <Modal title='Добавить объявление' onClose={handleModalClose}>
            <AddAdvertisementModal onClose={handleModalClose} />
          </Modal>
        </>
      )}
    </>
  );
};
