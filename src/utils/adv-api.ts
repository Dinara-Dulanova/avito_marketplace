import { Advertisement } from 'src/components/advertisement';
import {
  type TAdvertisment,
  TOrderStatus,
  TOrderItem,
  TOrder,
  TImage,
  TNewAdvertisment
} from './types';

const URL = 'http://localhost:3000';

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TServerResponse<T> = {
  success: boolean;
} & T;

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

export const getAdvertisementsPangination = (start: number, limit: number) =>
  fetch(`${URL}/advertisements?_start=${start}&_limit=${limit}`)
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
