import { TNewAdvertisment } from '@utils-types';
import React, { useState } from 'react';
import { Button, Input } from '@mui/material';
import { useDispatch } from '../../services/store';
import { postNewAdvertisement } from '../../services/slices/advertisements';
import './style.css';

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
          <div>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='name'>Название:</label>
                <Input
                  required
                  type='text'
                  id='name'
                  value={name}
                  placeholder='Название объявления'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='imageUrl'>Картинка (URL):</label>
                <Input
                  type='text'
                  id='imageUrl'
                  value={imageUrl}
                  placeholder='URL картинки'
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='description'>Описание:</label>
                <textarea
                  id='description'
                  value={description}
                  placeholder='Описание'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='price'>Стоимость:</label>
                <Input
                  required
                  type='number'
                  id='price'
                  value={price}
                  placeholder='Стоимость'
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <Button type='submit'>Добавить</Button>
            </form>
          </div>
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
