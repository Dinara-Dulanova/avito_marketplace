import { TOrderStatus } from '@utils-types';
export const renderStatusToString = (statusNumber: number): string => {
  switch (statusNumber) {
    case TOrderStatus.Created:
      return 'Создан';
    case TOrderStatus.Paid:
      return 'Оплачен';
    case TOrderStatus.Transport:
      return 'В пути';
    case TOrderStatus.DeliveredToThePoint:
      return 'Доставлен в пункт выдачи';
    case TOrderStatus.Received:
      return 'Получен';
    case TOrderStatus.Archived:
      return 'Архивирован';
    case TOrderStatus.Refund:
      return 'Возврат';
    default:
      return 'Неизвестный статус';
  }
};
