import { TAdvertisment } from '@utils-types';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import './advertisement-card.css';

export const AdvertisementCard: FC<{ advertisement: TAdvertisment }> = ({
  advertisement
}) => {
  const location = useLocation();
  return (
    <div className='advertisement-card'>
      <h3>{advertisement.name}</h3>
      <p>{advertisement.price}</p>
      <p>{advertisement.views}</p>
      <p>{advertisement.likes}</p>
    </div>
  );
};

// export const AdvertisementCard: FC<{ advertisement: TAdvertisment }> = ({
//   advertisement
// }) => {
//   return <div>{advertisement.name}</div>;
// };
