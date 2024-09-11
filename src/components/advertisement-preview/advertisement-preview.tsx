import { TAdvertisment } from '@utils-types';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
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
    <p>{advertisement.price}</p>
    <p>{advertisement.views}</p>
    <p>{advertisement.likes}</p>
  </div>
);
