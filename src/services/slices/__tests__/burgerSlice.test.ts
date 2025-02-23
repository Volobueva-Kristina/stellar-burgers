import {
  addIngredient,
  createOrder,
  initialState,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor,
  openOrderModal,
  closeOrderModal,
  selectConstructorItems,
  selectOrderModal,
  isLoadingSelector,
  selectOrderRequest
} from '../BurgerSlice';
import {
  mockPayload,
  mockOrder,
  newIngredient,
  newBun,
  mockIngredients,
  expectedResult
} from '../mock';
import reducer from '../BurgerSlice';
import { orderBurgerApi } from '../../../utils/burger-api';
import { getCookie } from '../../../utils/cookie';
import store from '../../../services/store';

describe('редьюсеры burgerSlice', () => {
  describe('с корректными данными', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('Добавление ингредиента в конструктор', () => {
      const action = addIngredient(newIngredient);
      const newState = reducer(initialState, action);

      expect(newState.constructorItems.ingredients[0].name).toBe(
        'Соус с шипами Антарианского плоскоходца'
      );
    });

    test('Добавление булки в конструктор', () => {
      const action = addIngredient(newBun);
      const newState = reducer(initialState, action);

      expect(newState.constructorItems.bun?.name).toBe(
        'Краторная булка N-200i'
      );
    });

    test('Удаление ингредиента', () => {
      const stateWithIngredients = {
        ...initialState,
        constructorItems: {
          ...initialState.constructorItems,
          ingredients: mockIngredients
        }
      };

      const action = removeIngredient({ id: mockIngredients[0].id });
      const newState = reducer(stateWithIngredients, action);

      expect(newState.constructorItems.ingredients.length).toBe(1);
    });

    test('Очистка конструктора', () => {
      const stateWithIngredients = {
        ...initialState,
        constructorItems: {
          ...initialState.constructorItems,
          ingredients: mockIngredients
        }
      };

      const action = clearConstructor();
      const newState = reducer(stateWithIngredients, action);

      expect(newState.constructorItems.ingredients.length).toBe(0);
    });

    test('перемещение ингредиента наверх', () => {
      const stateWithIngredients = {
        ...initialState,
        constructorItems: {
          ...initialState.constructorItems,
          ingredients: mockIngredients
        }
      };
      const action = moveIngredientUp({ id: mockIngredients[1].id });
      const newState = reducer(stateWithIngredients, action);
      expect(newState.constructorItems.ingredients[0].id).toBe(
        mockIngredients[1].id
      );
      expect(newState.constructorItems.ingredients[1].id).toBe(
        mockIngredients[0].id
      );
    });
    test('перемещение ингредиента вниз', () => {
      const stateWithIngredients = {
        ...initialState,
        constructorItems: {
          ...initialState.constructorItems,
          ingredients: mockIngredients
        }
      };
      const action = moveIngredientDown({ id: mockIngredients[0].id });
      const newState = reducer(stateWithIngredients, action);
      expect(newState.constructorItems.ingredients[0].id).toBe(
        mockIngredients[1].id
      );
      expect(newState.constructorItems.ingredients[1].id).toBe(
        mockIngredients[0].id
      );
    });

    test('открытие модельного окна', () => {
      const state = {
        ...initialState,
        orderModalData: null
      };
      const action = openOrderModal(mockOrder);
      const newState = reducer(state, action);
      expect(newState.orderModalData).toEqual(mockOrder);
    });
    test('закрытие модельного окна', () => {
      const state = {
        ...initialState,
        orderModalData: mockOrder
      };
      const action = closeOrderModal();
      const newState = reducer(state, action);
      expect(newState.orderModalData).toBeNull();
    });
  });
  describe('тесты с некорректными данными', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
    test('перемещаем первый элемент наверх', () => {
      const stateWithIngredients = {
        ...initialState,
        constructorItems: {
          ...initialState.constructorItems,
          ingredients: mockIngredients
        }
      };

      const action = moveIngredientUp({ id: mockIngredients[0].id });
      const newState = reducer(stateWithIngredients, action);

      expect(newState.constructorItems.ingredients).toEqual(mockIngredients);
    });

    test('перемещаем последний элемент вниз', () => {
      const stateWithIngredients = {
        ...initialState,
        constructorItems: {
          ...initialState.constructorItems,
          ingredients: mockIngredients
        }
      };

      const action = moveIngredientDown({ id: mockIngredients[1].id });
      const newState = reducer(stateWithIngredients, action);

      expect(newState.constructorItems.ingredients).toEqual(mockIngredients);
    });
  });
});

describe('тесты селекторов', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('селектор selectConstructorItems', () => {
    const state = {
      createOrder: {
        ...initialState,
        constructorItems: {
          bun: {
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png',
            id: '643d69a5c3f7b9001cfa0941'
          },
          ingredients: [
            {
              _id: '643d69a5c3f7b9001cfa0945',
              name: 'Соус с шипами Антарианского плоскоходца',
              type: 'sauce',
              proteins: 101,
              fat: 99,
              carbohydrates: 100,
              calories: 100,
              price: 88,
              image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/sauce-01-large.png',
              id: '643d69a5c3f7b9001cfa0945'
            }
          ]
        }
      }
    };
    const result = selectConstructorItems(state);
    expect(result).toEqual({
      bun: {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: '643d69a5c3f7b9001cfa0941'
      },
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa0945',
          name: 'Соус с шипами Антарианского плоскоходца',
          type: 'sauce',
          proteins: 101,
          fat: 99,
          carbohydrates: 100,
          calories: 100,
          price: 88,
          image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-01-large.png',
          id: '643d69a5c3f7b9001cfa0945'
        }
      ]
    });
  });

  test('селектор selectOrderModal', () => {
    const state = {
      createOrder: {
        ...initialState,
        orderModalData: mockOrder
      }
    };
    const result = selectOrderModal(state);
    expect(result).toEqual(mockOrder);
  });

  test('селектор isLoadingSelector', () => {
    const state = {
      createOrder: {
        ...initialState,
        isLoading: true
      }
    };
    const result = isLoadingSelector(state);
    expect(result).toBe(true);
  });

  test('Селектор selectOrderRequest возвращает состояние запроса', () => {
    const state = {
      createOrder: {
        ...initialState,
        orderRequest: true
      }
    };

    const result = selectOrderRequest(state);
    expect(result).toBe(true);
  });
});

describe('тесты extraReducers для createOrder', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('Тест обработки состояния createOrder.pending', () => {
    const action = createOrder.pending('', [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0943'
    ]);
    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isLoading: true,
      error: null,
      orderRequest: true
    };

    expect(state).toEqual(expectedState);
  });

  test('Тест обработки состояния createOrder.fulfilled', () => {
    const action = createOrder.fulfilled(mockPayload, '', [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0943'
    ]);
    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isLoading: false,
      name: mockOrder.name,
      order: mockPayload.order,
      orderRequest: false,
      error: null,
      orderModalData: mockPayload.order
    };

    expect(state).toEqual(expectedState);
  });

  test('Тест обработки состояния createOrder.rejected', () => {
    const errorMessage = 'Ошибка создания заказа';
    const action = createOrder.rejected(new Error(errorMessage), '', [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0943'
    ]);
    const state = reducer(initialState, action);
    const expectedState = {
      ...initialState,
      isLoading: false,
      orderRequest: false,
      error: errorMessage
    };
    expect(state).toEqual(expectedState);
  });
});
