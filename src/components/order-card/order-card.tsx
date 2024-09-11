import { TOrder } from '@utils-types';
import { FC } from 'react';
import { renderStatusToString } from '../../utils/helpers/functions';
import './order-card.css';

export const OrderCard: FC<{ order: TOrder }> = ({ order }) => (
  <>
    <div className='order-card'>
      <div>Количество товаров: {order.items.length}</div>
      <div>Стоимость заказа: {order.total}</div>
      <div>Статус заказа: {renderStatusToString(order.status)}</div>
      <div>
        Дата создания заказа: {new Date(order.createdAt).toLocaleDateString()}
      </div>
      <div>Номер заказа: {order.id}</div>
    </div>
  </>
);

// Возможность завершения заказа;
// ;
// Статус (текстом);
// ;
// vКнопка “Показать все товары”, показывающая все товары в данном заказе (можно отображать их в этой же карточке или сделать модальное окно)
