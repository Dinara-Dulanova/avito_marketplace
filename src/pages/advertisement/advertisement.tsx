import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { TAdvertisment } from '@utils-types';
import { NotFound404 } from '../not-fount-404';

export const Advertisement: FC = () => {
  const { id } = useParams();
  const advertisement = useSelector((state) =>
    state.advertisements.advertisements.find(
      (ad: TAdvertisment) => ad.id === id
    )
  );

  //edit mode
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // dispatch(updateAdvertisement(advertisement)); // Отправляем advertisement
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleChange = () => {};

  if (!advertisement) {
    return <NotFound404 />;
  }

  return (
    <div>
      {isEditing ? (
        <form>
          <input
            type='text'
            name='name'
            value={advertisement.name}
            placeholder='Название'
          />
          <input
            type='number'
            name='price'
            value={advertisement.price}
            placeholder='Цена'
          />
          <input
            type='number'
            name='price'
            value={advertisement.imageUrl}
            placeholder='Ссылка на картинку'
          />
          <textarea
            name='description'
            value={advertisement.description}
            placeholder='Описание'
          />
          <button onClick={handleSaveClick}>Сохранить</button>
          <button onClick={handleCancelClick}>Отменить</button>
        </form>
      ) : (
        <div>
          <h1>{advertisement.name}</h1>
          <p>{advertisement.price}</p>
          <p>{advertisement.description}</p>
          <img
            className='advertisement-card__img'
            src={advertisement.imageUrl}
            alt={`img of ${advertisement.name}`}
          />
          <button onClick={handleEditClick}>Редактировать</button>
        </div>
      )}
    </div>
  );
};
