import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RequestStatus, getOrders } from '../../utils/adv-api';
import {
  type TAdvertisment,
  type TNewAdvertisment,
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
      });
  }
});

export const ordersReducer = ordersSlice.reducer;
