import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAdvertisements,
  getAdvertisementsPangination,
  postAdvertisement,
  RequestStatus
} from '../../utils/adv-api';
import { type TAdvertisment, type TNewAdvertisment } from '../../utils/types';

type advertisementsState = {
  advertisements: TAdvertisment[];
  advertisementsPerPage: TAdvertisment[];
  status: RequestStatus;
};

const initialState: any = {
  advertisements: [],
  advertisementsPerPage: [],
  status: RequestStatus.Idle
};

export const fetchAdvertisements = createAsyncThunk(
  'advertisements/advertisements',
  async () => getAdvertisements()
);

export const fetchAdvertisementsPerPage = createAsyncThunk(
  'advertisements/advertisementsPerPage',
  async ({ start, limit }: { start: number; limit: number }) =>
    getAdvertisementsPangination(start, limit)
);

export const postNewAdvertisement = createAsyncThunk(
  'advertisements/postAdvertisement',
  async (data: TNewAdvertisment) => postAdvertisement(data)
);

const advertisementsSlice = createSlice({
  name: 'advertisements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvertisements.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchAdvertisements.fulfilled, (state, action) => {
        state.status = RequestStatus.Succes;
        state.advertisements = action.payload;
      })
      .addCase(fetchAdvertisements.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchAdvertisementsPerPage.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchAdvertisementsPerPage.fulfilled, (state, action) => {
        state.status = RequestStatus.Succes;
        state.advertisementsPerPage = action.payload;
      })
      .addCase(fetchAdvertisementsPerPage.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(postNewAdvertisement.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(postNewAdvertisement.fulfilled, (state, action) => {
        state.status = RequestStatus.Succes;
        state.advertisements = [...state.advertisements, action.payload];
      })
      .addCase(postNewAdvertisement.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const advertisementsReducer = advertisementsSlice.reducer;
