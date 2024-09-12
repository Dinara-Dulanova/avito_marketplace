import { FC, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { TAdvertisment, TNewAdvertisment } from '@utils-types';
import { NotFound404 } from '../not-fount-404';
import { useDispatch } from '../../services/store';
import {
  editAdvertisement,
  fetchDeleteAdvertisement,
  fetchAdvertisements
} from '../../services/slices/advertisements';
import { Preloader } from '../../components/ui/preloader/preloader';
import { Modal } from '../../components/modal/modal';
import { ConfirmationModal } from '../../components/confirmation-modal';
import { RequestStatus } from '@api';
import './advertisement.css';
import { Button } from '@mui/material';

export const Advertisement: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAdvertisements());
  }, []);
  const navigate = useNavigate();
  const { id } = useParams();
  const advertisement = useSelector((state) =>
    state.advertisements.advertisements.find(
      (ad: TAdvertisment) => ad.id === id
    )
  );
  const isLoading = useSelector((state) => state.advertisements.status);

  //edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedAdvertisement, setEditedAdvertisement] =
    useState<TNewAdvertisment>({
      ...(advertisement as TNewAdvertisment)
    });
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEditedAdvertisement({
      ...editedAdvertisement,
      [name]: value
    });
  };

  const submitChange = () => {
    if (id) {
      dispatch(editAdvertisement({ id, data: editedAdvertisement }));
      setIsEditing(false);
    }
  };

  //read more button
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [showReadMoreButton, setShowReadMoreButton] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(ref.current?.scrollHeight, ref.current?.clientHeight);
    if (ref.current) {
      setShowReadMoreButton(
        ref.current.scrollHeight != ref.current.clientHeight
      );
    }
  }, []);

  //delete
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);

  const handleConfirmDeletion = () => {
    console.log('Confirming deletion!');
    setIsDeleteConfirmed(true);
    console.log(isDeleteConfirmed);
    setIsDeleteModalOpen(false);
    if (advertisement) {
      dispatch(fetchDeleteAdvertisement(advertisement));
      navigate('/advertisements');
    }
  };

  const handleCancelDeletion = () => {
    console.log('Canceling deletion!');
    setIsDeleteConfirmed(false);
    setIsDeleteModalOpen(false);
  };

  const handleBackNavigate = () => {
    navigate('/advertisements');
  };

  if (!advertisement) {
    return <NotFound404 />;
  }

  return (
    <>
      <div className='advertisement__panel'>
        <Button
          className='back-button'
          variant='contained'
          onClick={handleBackNavigate}
        >
          Назад к объявлениям
        </Button>
      </div>

      <div className='advertisement'>
        {isLoading === RequestStatus.Loading ? (
          <Preloader />
        ) : (
          <div className='advertisement__container'>
            {isEditing ? (
              <>
                <div className='advertisemenеt__form'>
                  <form onSubmit={submitChange}>
                    <input
                      type='text'
                      name='name'
                      value={editedAdvertisement.name}
                      placeholder='Название'
                      onChange={handleChange}
                    />
                    <input
                      type='number'
                      name='price'
                      value={editedAdvertisement.price}
                      placeholder='Цена'
                      onChange={handleChange}
                    />
                    <input
                      type='string'
                      name='imageUrl'
                      value={editedAdvertisement.imageUrl}
                      placeholder='Ссылка на картинку'
                      onChange={handleChange}
                    />
                    <textarea
                      name='description'
                      value={editedAdvertisement.description}
                      placeholder='Описание'
                      onChange={handleChange}
                    />
                    <Button variant='contained' type='submit'>
                      Сохранить
                    </Button>
                    <Button variant='contained' onClick={handleCancelClick}>
                      Отменить
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <>
                <div className='adv-buttons__container'>
                  <Button
                    className='edit-button'
                    variant='contained'
                    onClick={handleEditClick}
                  >
                    Редактировать
                  </Button>
                  <Button
                    className='delete-button'
                    variant='contained'
                    onClick={handleDeleteClick}
                  >
                    Удалить
                  </Button>
                </div>
                <div className=''>
                  {advertisement.imageUrl && (
                    <img
                      className='advertisement-card__img'
                      src={advertisement.imageUrl}
                      alt={`img of ${advertisement.name}`}
                    />
                  )}

                  <h2 className='advertisement-card__name'>
                    {advertisement.name}
                  </h2>
                  <p className='advertisement-card__price'>
                    Цена: {advertisement.price}
                  </p>
                  <p className='advertisement-card__likes'>
                    Цена: {advertisement.likes}
                  </p>
                  <p className='advertisement-card__views'>
                    Цена: {advertisement.views}
                  </p>
                  <p
                    className={
                      isDescriptionOpen
                        ? 'advertisement-card__description_full'
                        : 'advertisement-card__description_short'
                    }
                    ref={ref}
                  >
                    {advertisement.description}
                  </p>
                  {showReadMoreButton && (
                    <button
                      onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                    >
                      {isDescriptionOpen ? 'Скрыть' : 'Показать все'}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
        {isDeleteModalOpen && (
          <Modal
            title='Вы уверены, что хотите удалить объявление?'
            onClose={handleModalClose}
          >
            <ConfirmationModal
              onConfirm={handleConfirmDeletion}
              onCancel={handleCancelDeletion}
            />
          </Modal>
        )}
      </div>
    </>
  );
};
