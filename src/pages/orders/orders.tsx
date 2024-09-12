import { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { fetchOrders } from '../../services/slices/orders';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '../../components/ui/preloader/preloader';
import { OrderCard } from '../../components/order-card/order-card';
import { renderStatusToString } from '../../utils/helpers/functions';
import { useDebounce } from '../../utils/hooks/hooks';
import Slider from '@mui/material/Slider';
import './orders.css';

export const Orders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  const orders = useSelector((state) => state.orders.orders);

  const isOrdersLoading = useSelector((store) =>
    store.orders.status === 'Loading' ? true : false
  );

  //sort
  const maxOrderPrice = Math.max(...orders.map((order) => order.total));
  const [sortValue, setSortValue] = useState<number[]>([0, maxOrderPrice]);

  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const statusItems = [
    { raw: -1, stringSatus: 'Все статусы' }, // Добавлено в начало
    ...Array.from(new Set([...orders.map((order) => order.status)])).map(
      (item) => ({
        raw: item,
        stringSatus: renderStatusToString(item)
      })
    )
  ];
  const [filteredOrders, setFilteredOrders] = useState(orders);
  useEffect(() => {
    //первоначальнвя отрисовка всех заказов со всеми статусами
    setFilteredOrders(orders);
    setSelectedStatus('Все статусы');
    setSortValue([0, maxOrderPrice]);
  }, [orders]);

  const debouncedSortValue = useDebounce(sortValue, 300);
  useEffect(() => {
    console.log('debouncedSortValue', debouncedSortValue);
    let filtered = orders;
    filtered = filtered.filter(
      (order) =>
        order.total >= debouncedSortValue[0] &&
        order.total <= debouncedSortValue[1]
    );
    if (selectedStatus !== 'Все статусы') {
      filtered = filtered.filter((order) => {
        const statusItem = statusItems.find(
          (item) => item.raw === order.status
        );
        return statusItem && statusItem.stringSatus === selectedStatus;
      });
    }

    setFilteredOrders(filtered);
  }, [debouncedSortValue, selectedStatus]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setSortValue(newValue as number[]);
  };

  const valuetext = (value: number) => `${value}`;

  //заготовка для показа/скрытия завершенных заказов
  // const [showArchived, setShowArchived] = useState(false);
  // function chengeCheckbox() {
  //   setShowArchived(!showArchived);
  // }

  return (
    <>
      {isOrdersLoading ? (
        <Preloader />
      ) : (
        <main className='orders'>
          <h3 className={`pb-6 text text_type_main-large`}>Заказы мои</h3>
          <select
            value={selectedStatus || ''}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {/* <option value=''>Все статусы</option> */}
            {statusItems.map((item) => (
              <option key={uuidv4()} value={item.stringSatus}>
                {item.stringSatus}
              </option>
            ))}
          </select>
          {/* <div>
            <input
              type='checkbox'
              checked={showArchived}
              onChange={chengeCheckbox}
            />
            Показать завершенные
          </div> */}

          <div className='price-slider'>
            <Slider
              getAriaLabel={() => 'Temperature range'}
              value={sortValue}
              onChange={handleChange}
              valueLabelDisplay='auto'
              getAriaValueText={valuetext}
              min={0}
              max={maxOrderPrice + 5000}
              step={5000}
            />
          </div>

          {filteredOrders.map((order) => (
            <OrderCard order={order} key={uuidv4()} />
          ))}
        </main>
      )}
    </>
  );
};
