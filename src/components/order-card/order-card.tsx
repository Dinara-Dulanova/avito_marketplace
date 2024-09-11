import { TOrder } from '@utils-types';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../modal/modal';
import { AdvertisementPreview } from '../advertisement-preview';
import { renderStatusToString } from '../../utils/helpers/functions';
import './order-card.css';

export const OrderCard: FC<{ order: TOrder }> = ({ order }) => {
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='order-card'>
      <div className='order-card__header'>
        <div>Номер заказа: {order.id}</div>
        <div>Статус заказа: {renderStatusToString(order.status)}</div>
      </div>
      <div className='order-card__content'>
        <div className='order-card__item'>
          <span>Количество товаров:</span> {order.items.length}
        </div>
        <div className='order-card__item'>
          <span>Стоимость заказа:</span> {order.total}
        </div>
        <div className='order-card__item'>
          <span>Дата создания:</span>{' '}
          {new Date(order.createdAt).toLocaleDateString()}
        </div>
      </div>
      <button onClick={handleModalOpen} className='order-card__button'>
        Показать все товары
      </button>

      {isModalOpen && (
        <>
          <Modal
            title={`Объявления из заказа номер ${order.id}`}
            onClose={handleModalClose}
          >
            <div className='order-card__modal-content'>
              {order.items.map((item) => (
                <Link key={item.id} to={`/advertisement/${item.id}`}>
                  <AdvertisementPreview advertisement={item} />
                </Link>
              ))}
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

// Возможность завершения заказа;
// vКнопка “Показать все товары”, показывающая все товары в данном заказе (можно отображать их в этой же карточке или сделать модальное окно)
