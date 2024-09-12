import { TNewAdvertisment } from '@utils-types';
import React, { useState } from 'react';
import { useDispatch } from '../../services/store';
import { postNewAdvertisement } from '../../services/slices/advertisements';

interface AddAdvertisementModalProps {
  onClose: () => void;
}

export const AddAdvertisementModal: React.FC<AddAdvertisementModalProps> = ({
  onClose
}) => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const [isSuccesfullyAdded, setIsSuccesfullyAdded] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data: TNewAdvertisment = {
      name,
      imageUrl,
      description,
      price,
      createdAt: new Date().toISOString(),
      views: 0,
      likes: 0
    };
    dispatch(postNewAdvertisement(data));
    setIsSuccesfullyAdded(true);
    setTimeout(() => {
      onClose();
      setIsSuccesfullyAdded(false);
    }, 5000);
  };
  return (
    <>
      {!isSuccesfullyAdded && (
        <>
          <h2 className='modal-title'>Новое Объявление</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='name'>Название:</label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='imageUrl'>Картинка (URL):</label>
              <input
                type='text'
                id='imageUrl'
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='description'>Описание:</label>
              <textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='price'>Стоимость:</label>
              <input
                type='number'
                id='price'
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <button type='submit'>Добавить</button>
          </form>
        </>
      )}

      {isSuccesfullyAdded && (
        <div className='modal-succesfully-added'>
          <p>Объявление успешно добавлено!</p>
        </div>
      )}
    </>
  );
};
