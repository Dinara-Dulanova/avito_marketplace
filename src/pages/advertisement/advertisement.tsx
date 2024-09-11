import { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { TAdvertisment, TNewAdvertisment } from '@utils-types';
import { NotFound404 } from '../not-fount-404';
import { useDispatch } from '../../services/store';
import { editAdvertisement } from '../../services/slices/advertisements';
import { Preloader } from '../../components/ui/preloader/preloader';
import { RequestStatus } from '@api';
import './advertisement.css';

export const Advertisement: FC = () => {
  const dispatch = useDispatch();
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
      ...advertisement
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

  if (!advertisement) {
    return <NotFound404 />;
  }

  return (
    <div className='advertisement'>
      {isLoading === RequestStatus.Loading ? (
        <Preloader />
      ) : (
        <div>
          {isEditing ? (
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
              <button type='submit'>Сохранить</button>
              <button onClick={handleCancelClick}>Отменить</button>
            </form>
          ) : (
            <div className='advertisement'>
              <h2 className='advertisement-card__name'>{advertisement.name}</h2>
              <p className='advertisement-card__price'>{advertisement.price}</p>
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

              <img
                className='advertisement-card__img'
                src={advertisement.imageUrl}
                alt={`img of ${advertisement.name}`}
              />
              <button onClick={handleEditClick}>Редактировать</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
