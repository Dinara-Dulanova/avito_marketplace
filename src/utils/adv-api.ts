import {
  type TAdvertisment,
  TOrderStatus,
  TOrderItem,
  TOrder,
  TImage,
  TNewAdvertisment,
  TNewOrder
} from './types';

const URL = 'http://localhost:3000';

export const enum RequestStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Succes = 'Succes',
  Failed = 'Failed'
}

export const getAdvertisements = () =>
  fetch(`${URL}/advertisements`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching advertisements: ${res.statusText}`);
      }
      return res.json();
    })
    .then((data: TAdvertisment[]) => data)
    .catch((error) => {
      console.error('Error fetching advertisements:', error);
      throw error;
    });

export const getAdvertisementById = (id: string): Promise<TAdvertisment> =>
  fetch(`${URL}/advertisements/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching advertisements: ${res.statusText}`);
      }
      return res.json();
    })
    .then((data: TAdvertisment) => data)
    .catch((error) => {
      console.error('Error fetching advertisements:', error);
      throw error;
    });

export const getAdvertisementsPangination = (start: number, limit: number) =>
  fetch(`${URL}/advertisements?_start=${start}&_limit=${limit}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching advertisements: ${res.statusText}`);
      }
      return res.json();
    })
    .then((data: TAdvertisment[]) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error('Error fetching advertisements:', error);
      throw error;
    });

export const postAdvertisement = (data: TNewAdvertisment) =>
  fetch(`${URL}/advertisements`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    } as HeadersInit,
    body: JSON.stringify({
      ...data
    })
  }).then((response) => response.json());

export const patchAdvertisement = (id: string, data: TNewAdvertisment) =>
  fetch(`${URL}/advertisements/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    } as HeadersInit,
    body: JSON.stringify({
      ...data
    })
  }).then((response) => response.json());

export const deleteAdvertisement = (data: TAdvertisment) =>
  fetch(`${URL}/advertisements/${data.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    } as HeadersInit,
    body: JSON.stringify({
      ...data
    })
  }).then((response) => {
    console.log(response);
    return response.json();
  });

export const getOrders = () =>
  fetch(`${URL}/orders`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching orders: ${res.statusText}`);
      }
      return res.json();
    })
    .then((data: TOrder[]) => data)
    .catch((error) => {
      console.error('Error fetching orders:', error);
      throw error;
    });

export const patchOrder = (id: string, data: TNewOrder) =>
  fetch(`${URL}/orders/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    } as HeadersInit,
    body: JSON.stringify({
      ...data
    })
  }).then((response) => {
    console.log(response);
    return response.json();
  });
