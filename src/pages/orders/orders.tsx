import { FC, useEffect } from 'react';
import { fetchOrders } from '../../services/slices/orders';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '../../components/ui/preloader/preloader';
import { OrderCard } from '../../components/order-card/order-card';
import './orders.css';

export const Orders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  const orders = useSelector((state) => state.orders.orders);
  console.log(orders);
  const isOrdersLoading = useSelector((store) =>
    store.orders.status === 'Loading' ? true : false
  );

  return (
    <>
      {isOrdersLoading ? (
        <Preloader />
      ) : (
        <main className='orders'>
          {orders.map((order) => (
            <OrderCard order={order} key={order.id} />
          ))}
        </main>
      )}
    </>
  );
  <h3 className={`pb-6 text text_type_main-large`}>Заказы мои</h3>;
};
