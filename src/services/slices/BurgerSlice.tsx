import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';
import { TOrder, TIngredient, TConstructorIngredient } from '../../utils/types';
import { orderBurgerApi } from '../../utils/burger-api';

export const createOrder = createAsyncThunk(
  'createOrder/createNewOrder',
  async (ingredients: string[]) => {
    const data = await orderBurgerApi(ingredients);
    return data;
  }
);

export interface OrderState {
  order: TOrder | null;
  name: string | null;
  isLoading: boolean;
  error: string | null;
  orderRequest: boolean;
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderModalData: TOrder | null;
}

export const initialState: OrderState = {
  order: null,
  name: null,
  isLoading: false,
  error: null,
  orderRequest: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderModalData: null
};

const prepareIngredient = (ingredient: TIngredient) => {
  const id = nanoid();
  return { payload: { ...ingredient, id } };
};

export const burgerSlice = createSlice({
  name: 'createOrder',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: prepareIngredient
    },
    removeIngredient: (state, action: PayloadAction<{ id: string }>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload.id
        );
    },
    moveIngredientUp: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const index = state.constructorItems.ingredients.findIndex(
        (ingredient) => ingredient.id === id
      );
      if (index > 0) {
        const newIngredients = [...state.constructorItems.ingredients];
        [newIngredients[index], newIngredients[index - 1]] = [
          newIngredients[index - 1],
          newIngredients[index]
        ];
        state.constructorItems.ingredients = newIngredients;
      }
    },
    moveIngredientDown: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const index = state.constructorItems.ingredients.findIndex(
        (ingredient) => ingredient.id === id
      );
      if (index < state.constructorItems.ingredients.length - 1) {
        const newIngredients = [...state.constructorItems.ingredients];
        [newIngredients[index], newIngredients[index + 1]] = [
          newIngredients[index + 1],
          newIngredients[index]
        ];
        state.constructorItems.ingredients = newIngredients;
      }
    },
    clearConstructor: (state) => initialState,
    openOrderModal: (state, action: PayloadAction<TOrder>) => {
      state.orderModalData = action.payload;
    },
    closeOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    selectConstructorItems: (state) => state.constructorItems,
    selectOrderModal: (state) => state.orderModalData,
    isLoadingSelector: (state) => state.isLoading,
    selectOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload.name;
        state.order = action.payload.order;
        state.orderRequest = false;
        state.error = null;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.error = action.error.message || 'Не удалось загрузить Feed';
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  openOrderModal,
  moveIngredientDown,
  moveIngredientUp,
  closeOrderModal
} = burgerSlice.actions;

export const {
  selectConstructorItems,
  selectOrderModal,
  isLoadingSelector,
  selectOrderRequest
} = burgerSlice.selectors;

export default burgerSlice.reducer;
