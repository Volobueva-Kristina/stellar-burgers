import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';

export const fetchFeeds = createAsyncThunk('feeds/fetchFeeds', async () => {
  const data = await getFeedsApi();
  return data;
});

export const getOrderByNumber = createAsyncThunk(
  'feeds/getOrderNumber',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data;
  }
);

export interface FeedsState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
  modal: TOrder | null;
}

const initialState: FeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null,
  modal: null
};

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectFeeds: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    isLoadingSelector: (state) => state.isLoading,
    SelectModalOrder: (state) => state.modal
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Не удалось загрузить список заказов';
      })

      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.modal = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Не удалось загрузить выбранный заказ';
      });
  }
});

export default feedSlice.reducer;

export const {
  selectFeeds,
  getTotal,
  getTotalToday,
  isLoadingSelector,
  SelectModalOrder
} = feedSlice.selectors;
