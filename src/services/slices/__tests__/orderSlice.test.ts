import {
  selectOrders,
  selectcurrentOrder,
  initialState,
  fetchOrders,
  fetchOrder
} from '../OrdersSlice';
import { mockOrder, mockOrders, mockState } from '../mock';
import reducer from '../OrdersSlice';

describe('тесты селекторов', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('селектор selectOrders', () => {
    const result = selectOrders(mockState);
    expect(result).toEqual(mockOrders);
  });

  test('Селектор selectcurrentOrder', () => {
    const result = selectcurrentOrder(mockState);
    expect(result).toEqual(mockOrders[0]);
  });
});

describe('тесты extraReducers для fetchOrders', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('Тест обработки состояния pending', () => {
    const action = fetchOrders.pending('');
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
    const action = fetchOrders.fulfilled(mockOrders, '');

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isLoading: false,
      orders: mockOrders,
      error: null
    };

    expect(state).toEqual(expectedState);
  });
  test('Тест обработки состояния rejected', () => {
    const errorMessage = 'Ошибка загрузки заказов';
    const error = new Error(errorMessage);

    const action = fetchOrders.rejected(error, '');

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isLoading: false,
      error: errorMessage
    };

    expect(state).toEqual(expectedState);
  });
});

describe('тесты extraReducers для fetchOrder', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('Тест обработки состояния pending', () => {
    const action = fetchOrder.pending('', 68884);
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
      error: null,
      currentOrder: null
    };

    expect(state).toEqual(expectedState);
  });

  test('Тест обработки состояния fulfilled', () => {
    const action = fetchOrder.fulfilled([mockOrder], '', 68884);

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isLoading: false,
      currentOrder: mockOrder,
      error: null
    };

    expect(state).toEqual(expectedState);
  });
  test('Тест обработки состояния rejected', () => {
    const errorMessage = 'Ошибка загрузки заказа';
    const error = new Error(errorMessage);

    const action = fetchOrder.rejected(error, '', 68884);

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isLoading: false,
      error: errorMessage
    };

    expect(state).toEqual(expectedState);
  });
});
