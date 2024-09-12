import { TNewOrder, TOrder } from '@utils-types';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from '../../services/store';
import { Modal } from '../modal/modal';
import { AdvertisementPreview } from '../advertisement-preview';
import { renderStatusToString } from '../../utils/helpers/functions';
import './order-card.css';
import { editOrders } from '../../services/slices/orders';

export const OrderCard: FC<{ order: TOrder }> = ({ order }) => {
  const dispatch = useDispatch();
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleArchiveOrder = () => {
    const id = order.id;
    const data: TNewOrder = {
      status: 5,
      createdAt: order.createdAt,
      finishedAt: new Date().toISOString(),
      items: order.items,
      deliveryWay: order.deliveryWay,
      total: order.total
    };
    dispatch(editOrders({ id, data: data }));
    // setIsEditing(false);

    console.log('order', order);
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
      {order.status !== 5 && (
        <button onClick={handleArchiveOrder} className='order-card__button'>
          Завершить заказ
        </button>
      )}

      {isModalOpen && (
        <>
          <Modal
            title={`Объявления из заказа номер ${order.id}`}
            onClose={handleModalClose}
          >
            <div className='order-card__modal-content'>
              {order.items.map((item) => (
                <Link key={uuidv4()} to={`/advertisement/${item.id}`}>
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
