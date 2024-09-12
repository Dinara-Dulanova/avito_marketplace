import { TAdvertisment } from '@utils-types';
import { FC } from 'react';
import './advertisement-preview.css';

export const AdvertisementPreview: FC<{ advertisement: TAdvertisment }> = ({
  advertisement
}) => (
  <div className='advertisement-card'>
    <img
      className='advertisement-card__img'
      src={advertisement.imageUrl}
      alt={`img of ${advertisement.name}`}
    />
    <h3>{advertisement.name}</h3>
    <p>Цена: {advertisement.price} руб.</p>
    <p>Просмотров: {advertisement.views}</p>
    <p>Лайков: {advertisement.likes}</p>
  </div>
);
