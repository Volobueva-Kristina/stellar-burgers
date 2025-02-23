import {
  getIngredientSelector,
  isLoadingSelector,
  isError,
  selectIngredientById,
  fetchIngredients,
  initialState
} from '../IngredientsSlice';
import { newIngredient, mockIngredients } from '../mock';
import reducer from '../IngredientsSlice';

describe('тесты селекторов', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('селектор getIngredientSelector', () => {
    const state = {
      ingredients: {
        ...initialState,
        ingredients: mockIngredients
      }
    };
    const result = getIngredientSelector(state);
    expect(result).toEqual(mockIngredients);
  });

  test('Селектор isLoadingSelector', () => {
    const state = {
      ingredients: {
        ...initialState,
        isLoading: true
      }
    };
    const result = isLoadingSelector(state);
    expect(result).toBe(true);
  });

  test('Селектор isError', () => {
    const state = {
      ingredients: {
        ...initialState,
        error: 'Ошибка загрузки ингредиентов'
      }
    };
    const result = isError(state);
    expect(result).toBe('Ошибка загрузки ингредиентов');
  });

  test('Селектор selectIngredientById', () => {
    const state = {
      ingredients: {
        ...initialState,
        ingredients: mockIngredients
      }
    };

    const result = selectIngredientById(state, '643d69a5c3f7b9001cfa0945');
    expect(result).toEqual(newIngredient);
  });
});

describe('тесты extraReducers для fetchIngredients', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('Тест обработки состояния pending', () => {
    const action = fetchIngredients.pending('');
    const state = reducer(
      {
        ...initialState,
        error: 'Test Error'
      },
      action
    );

    const expectedState = {
      ...initialState,
      isLoading: true,
      error: null
    };

    expect(state).toEqual(expectedState);
  });

  test('Тест обработки состояния fulfilled', () => {
    const action = fetchIngredients.fulfilled(mockIngredients, '');

    const state = reducer(
      {
        ...initialState,
        isLoading: true
      },
      action
    );

    const expectedState = {
      isLoading: false,
      ingredients: mockIngredients,
      error: null
    };

    expect(state).toEqual(expectedState);
  });
  test('Тест обработки состояния rejected', () => {
    const errorMessage = 'Ошибка загрузки ингредиентов';
    const error = new Error(errorMessage);

    const action = fetchIngredients.rejected(error, '');

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isLoading: false,
      error: errorMessage
    };

    expect(state).toEqual(expectedState);
  });
});
