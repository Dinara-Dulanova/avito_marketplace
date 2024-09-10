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

export type TImage = {
  /* Уникальный идентификатор. */
  id: number;
  /* Ссылка. */
  url: string;
  /* Название. */
  name: string;
};

// export type TIngredient = {
//   _id: string;
//   name: string;
//   type: string;
//   proteins: number;
//   fat: number;
//   carbohydrates: number;
//   calories: number;
//   price: number;
//   image: string;
//   image_large: string;
//   image_mobile: string;
//   uniqueId?: string;
// };

// type IngredientsState = {
//   ingredients: TIngredient[];
//   status: RequestStatus;
// };

// export type TConstructorIngredient = TIngredient & {
//   id: string;
// };

// export type TOrder = {
//   _id: string;
//   status: string;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
//   number: number;
//   ingredients: string[];
// };

// export type TOrdersData = {
//   orders: TOrder[];
//   total: number;
//   totalToday: number;
// };

// export type TUser = {
//   email: string;
//   name: string;
// };

// export type TTabMode = 'bun' | 'sauce' | 'main';

// export const enum RequestStatus {
//   Idle = 'Idle',
//   Loading = 'Loading',
//   Succes = 'Succes',
//   Failed = 'Failed'
// }
