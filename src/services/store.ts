import { configureStore } from '@reduxjs/toolkit';

import { combineReducers } from 'redux';

import { userSlice } from '../services/slices/UserSlice';
import { ingredientsSlice } from '../services/slices/IngredientsSlice';
import { feedSlice } from '../services/slices/FeedSlice';
import { burgerSlice } from '../services/slices/BurgerSlice';
import { ordersSlice } from './slices/OrdersSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [burgerSlice.name]: burgerSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export { rootReducer };
export default store;
