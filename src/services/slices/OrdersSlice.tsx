import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrdersApi, getOrderByNumberApi } from '../../utils/burger-api';
import { stat } from 'fs';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', getOrdersApi);

export const fetchOrder = createAsyncThunk(
  'orders/fetchOrderByNumber',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data.orders;
  }
);

export interface OrdersState {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
  currentOrder: TOrder | null;
}

const initialState: OrdersState = {
  orders: [],
  isLoading: false,
  error: null,
  currentOrder: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders,
    selectcurrentOrder: (state) => state.currentOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось получить заказ';
      })

      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentOrder = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentOrder = action.payload[0];
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось загрузить';
      });
  }
});

export default ordersSlice.reducer;
export const { selectOrders, selectcurrentOrder } = ordersSlice.selectors;
