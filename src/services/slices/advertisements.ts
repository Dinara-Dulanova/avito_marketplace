import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAdvertisements,
  getAdvertisementsPangination,
  postAdvertisement,
  patchAdvertisement,
  RequestStatus
} from '../../utils/adv-api';
import { type TAdvertisment, type TNewAdvertisment } from '../../utils/types';

type TAdvertisementsState = {
  advertisements: TAdvertisment[];
  advertisementsPerPage: TAdvertisment[];
  status: RequestStatus;
};

const initialState: TAdvertisementsState = {
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

export const editAdvertisement = createAsyncThunk<
  TAdvertisment,
  { id: string; data: TNewAdvertisment }
>('advertisements/editAdvertisement', async ({ id, data }, thunkAPI) =>
  patchAdvertisement(id, data)
);

// export const editAdvertisement = createAsyncThunk(
//   'advertisements/editAdvertisement',
//   async (id: string, data: TNewAdvertisment ) => {
//     return await patchAdvertisement(id, data)
//   }
// );

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
      })
      .addCase(editAdvertisement.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(editAdvertisement.fulfilled, (state, action) => {
        state.status = RequestStatus.Succes;
        const existingAdvertisementIndex = state.advertisements.findIndex(
          (ad: TAdvertisment) => ad.id === action.payload.id
        );
        if (existingAdvertisementIndex >= 0) {
          state.advertisements[existingAdvertisementIndex] = action.payload;
        }
      })
      .addCase(editAdvertisement.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const advertisementsReducer = advertisementsSlice.reducer;
