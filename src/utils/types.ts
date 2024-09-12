export type TAdvertisment = {
  /* Уникальный идентификатор. */
  id: string;
  /* Название. */
  name: string;
  /* Описание. */
  description?: string;
  /* Цена. */
  price: number;
  /* Дата и время создания. */
  createdAt: string;
  /* Количество просмотров. */
  views: number;
  /* Количество лайков. */
  likes: number;
  /* Ссылка на изображение. */
  imageUrl?: string;
};

export type TNewAdvertisment = {
  name: string;
  imageUrl?: string;
  description?: string;
  price: number;
  createdAt: string;
  views: 0;
  likes: 0;
};

export const TOrderStatus = {
  Created: 0,
  Paid: 1,
  Transport: 2,
  DeliveredToThePoint: 3,
  Received: 4,
  Archived: 5,
  Refund: 6
} as const;

export type TOrderItem = TAdvertisment & { count: number };

export type TOrder = {
  /* Уникальный идентификатор. */
  id: string;
  /* Статус. */
  status: (typeof TOrderStatus)[keyof typeof TOrderStatus];
  /* Дата и время создания. */
  createdAt: string;
  /* Дата и время завершения. */
  finishedAt?: string;
  /* Товары в заказе. */
  items: Array<TOrderItem>;
  /* Способ доставки(Почта, СДЭК...) */
  deliveryWay: string;
  /* Сумма заказа */
  total: number;
};

export type TNewOrder = {
  status: (typeof TOrderStatus)[keyof typeof TOrderStatus];
  createdAt: string;
  finishedAt?: string;
  items: Array<TOrderItem>;
  deliveryWay: string;
  total: number;
};

export type TImage = {
  /* Уникальный идентификатор. */
  id: number;
  /* Ссылка. */
  url: string;
  /* Название. */
  name: string;
};
