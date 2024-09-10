import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAdvertisements, RequestStatus } from '../../utils/adv-api';
import { type TAdvertisment } from '../../utils/types';

type advertisementsState = {
  advertisements: TAdvertisment[];
  status: RequestStatus;
};

const initialState: any = {
  advertisements: [],
  status: RequestStatus.Idle
};

export const fetchAdvertisements = createAsyncThunk(
  'advertisements/advertisements',
  async () => {
    console.log('async thunk');
    try {
      const response = await getAdvertisements();
      return response;
    } catch (error) {
      console.error('Error fetching advertisements:', error);
      throw error;
    }
  }
);
// export const fetchAdvertisements = createAsyncThunk(
//   'advertisements/advertisements',
//   getAdvertisements
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
      });
  }
});

export const advertisementsReducer = advertisementsSlice.reducer;
