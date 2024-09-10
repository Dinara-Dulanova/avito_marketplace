import { TNewAdvertisment } from '@utils-types';
import React, { useState } from 'react';
import { useDispatch } from '../../services/store';
import { postNewAdvertisement } from '../../services/slices/advertisements';

export const AddAdvertisementModal = () => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch();

  //   const handlePostAdvertisement = (newAdData: TNewAdvertisment) => {
  //     dispatch(postNewAdvertisement(newAdData));
  //   };

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
    // handlePostAdvertisement(data);
    // postAdvertisement(data);
    console.log(data);
  };
  return (
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
  );
};
