import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RequestStatus, getOrders, patchOrder } from '../../utils/adv-api';
import {
  type TAdvertisment,
  type TNewAdvertisment,
  TNewOrder,
  TOrder
} from '../../utils/types';

type TAdvertisementsState = {
  orders: TOrder[];
  status: RequestStatus;
};

const initialState: TAdvertisementsState = {
  orders: [],
  status: RequestStatus.Idle
};

export const fetchOrders = createAsyncThunk('orders/orders', async () =>
  getOrders()
);

export const editOrders = createAsyncThunk<
  TOrder,
  { id: string; data: TNewOrder }
>('orders/editOrders', async ({ id, data }, thunkAPI) => patchOrder(id, data));

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = RequestStatus.Succes;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(editOrders.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(editOrders.fulfilled, (state, action) => {
        state.status = RequestStatus.Succes;
        const existingAdvertisementIndex = state.orders.findIndex(
          (item: TOrder) => item.id === action.payload.id
        );
        if (existingAdvertisementIndex >= 0) {
          state.orders[existingAdvertisementIndex].status = 5;
        }
      })
      .addCase(editOrders.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const ordersReducer = ordersSlice.reducer;
