import {
  type TAdvertisment,
  TOrderStatus,
  TOrderItem,
  TOrder,
  TImage
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

// export const getAdvertisements = () =>
//   fetch(`${URL}/advertisements`)
//     .then((res) => {
//       console.log('LLLOOOOL');
//       console.log(res);
//       return res.json();
//     })
//     .then((data: any) => {
//       if (data.statusText === 'OK') {
//         console.log('data');
//         console.log(data);
//         return data;
//       }
//       return Promise.reject(data);
//     });

// type TRefreshResponse = TServerResponse<{
//   refreshToken: string;
//   accessToken: string;
// }>;

// export const refreshToken = (): Promise<TRefreshResponse> =>
//   fetch(`${URL}/auth/token`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify({
//       token: localStorage.getItem('refreshToken')
//     })
//   })
//     .then((res) => checkResponse<TRefreshResponse>(res))
//     .then((refreshData) => {
//       if (!refreshData.success) {
//         return Promise.reject(refreshData);
//       }
//       localStorage.setItem('refreshToken', refreshData.refreshToken);
//       setCookie('accessToken', refreshData.accessToken);
//       return refreshData;
//     });

// export const fetchWithRefresh = async <T>(
//   url: RequestInfo,
//   options: RequestInit
// ) => {
//   try {
//     const res = await fetch(url, options);
//     return await checkResponse<T>(res);
//   } catch (err) {
//     if ((err as { message: string }).message === 'jwt expired') {
//       const refreshData = await refreshToken();
//       if (options.headers) {
//         (options.headers as { [key: string]: string }).authorization =
//           refreshData.accessToken;
//       }
//       const res = await fetch(url, options);
//       return await checkResponse<T>(res);
//     } else {
//       return Promise.reject(err);
//     }
//   }
// };

// type TIngredientsResponse = TServerResponse<{
//   data: TIngredient[];
// }>;

// type TFeedsResponse = TServerResponse<{
//   orders: TOrder[];
//   total: number;
//   totalToday: number;
// }>;

// type TOrdersResponse = TServerResponse<{
//   data: TOrder[];
// }>;

// export const getIngredientsApi = () =>
//   fetch(`${URL}/ingredients`)
//     .then((res) => checkResponse<TIngredientsResponse>(res))
//     .then((data) => {
//       if (data?.success) return data.data;
//       return Promise.reject(data);
//     });

// export const getFeedsApi = () =>
//   //лента заказов
//   fetch(`${URL}/orders/all`)
//     .then((res) => checkResponse<TFeedsResponse>(res))
//     .then((data) => {
//       if (data?.success) return data;
//       return Promise.reject(data);
//     });

// export const getOrdersApi = () =>
//   //мои заказы при аксес токен
//   fetchWithRefresh<TFeedsResponse>(`${URL}/orders`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//       authorization: getCookie('accessToken')
//     } as HeadersInit
//   }).then((data) => {
//     if (data?.success) return data.orders;
//     return Promise.reject(data);
//   });

// type TNewOrderResponse = TServerResponse<{
//   order: TOrder;
//   name: string;
// }>;

// export const orderBurgerApi = (
//   data: string[] //я буду заказывать
// ) =>
//   fetchWithRefresh<TNewOrderResponse>(`${URL}/orders`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//       authorization: getCookie('accessToken')
//     } as HeadersInit,
//     body: JSON.stringify({
//       ingredients: data
//     })
//   }).then((data) => {
//     if (data?.success) return data;
//     return Promise.reject(data);
//   });

// type TOrderResponse = TServerResponse<{
//   orders: TOrder[];
// }>;

// export const getOrderByNumberApi = (number: number) =>
//   fetch(`${URL}/orders/${number}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }).then((res) => checkResponse<TOrderResponse>(res));

// export type TRegisterData = {
//   email: string;
//   name: string;
//   password: string;
// };

// type TAuthResponse = TServerResponse<{
//   refreshToken: string;
//   accessToken: string;
//   user: TUser;
// }>;

// export const registerUserApi = (data: TRegisterData) =>
//   fetch(`${URL}/auth/register`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify(data)
//   })
//     .then((res) => checkResponse<TAuthResponse>(res))
//     .then((data) => {
//       if (data?.success) return data;
//       return Promise.reject(data);
//     });

// export type TLoginData = {
//   email: string;
//   password: string;
// };

// export const loginUserApi = (data: TLoginData) =>
//   fetch(`${URL}/auth/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify(data)
//   })
//     .then((res) => checkResponse<TAuthResponse>(res))
//     .then((data) => {
//       if (data?.success) return data;
//       return Promise.reject(data);
//     });

// export const forgotPasswordApi = (data: { email: string }) =>
//   fetch(`${URL}/password-reset`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify(data)
//   })
//     .then((res) => checkResponse<TServerResponse<{}>>(res))
//     .then((data) => {
//       if (data?.success) return data;
//       return Promise.reject(data);
//     });

// export const resetPasswordApi = (data: { password: string; token: string }) =>
//   fetch(`${URL}/password-reset/reset`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify(data)
//   })
//     .then((res) => checkResponse<TServerResponse<{}>>(res))
//     .then((data) => {
//       if (data?.success) return data;
//       return Promise.reject(data);
//     });

// type TUserResponse = TServerResponse<{ user: TUser }>;

// export const getUserApi = () =>
//   fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
//     headers: {
//       authorization: getCookie('accessToken')
//     } as HeadersInit
//   });

// export const updateUserApi = (user: Partial<TRegisterData>) =>
//   fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//       authorization: getCookie('accessToken')
//     } as HeadersInit,
//     body: JSON.stringify(user)
//   });

// export const logoutApi = () =>
//   fetch(`${URL}/auth/logout`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify({
//       token: localStorage.getItem('refreshToken')
//     })
//   }).then((res) => checkResponse<TServerResponse<{}>>(res));
