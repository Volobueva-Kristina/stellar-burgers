import {
  selectFeeds,
  getTotal,
  getTotalToday,
  isLoadingSelector,
  SelectModalOrder,
  fetchFeeds,
  getOrderByNumber,
  initialState
} from '../FeedSlice';
import {
  mockOrder,
  feedsResponse,
  feedExpectedResult,
  getOrderByNumberMock,
  mockOrdersData
} from '../mock';
import reducer from '../FeedSlice';

describe('тесты селекторов', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('селектор selectFeeds', () => {
    const state = {
      feeds: {
        ...initialState,
        orders: mockOrdersData.orders,
        total: mockOrdersData.total,
        totalToday: mockOrdersData.totalToday
      }
    };
    const result = selectFeeds(state);
    expect(result).toBe(mockOrdersData.orders);
  });

  test('селектор getTotal', () => {
    const state = {
      feeds: {
        ...initialState,
        total: mockOrdersData.total
      }
    };
    const result = getTotal(state);
    expect(result).toBe(mockOrdersData.total);
  });

  test('селектор getTotalToday', () => {
    const state = {
      feeds: {
        ...initialState,
        totalToday: mockOrdersData.totalToday
      }
    };

    const result = getTotalToday(state);
    expect(result).toBe(mockOrdersData.totalToday);
  });

  test('Селектор isLoadingSelector', () => {
    const state = {
      feeds: {
        ...initialState,
        isLoading: true
      }
    };
    const result = isLoadingSelector(state);
    expect(result).toBe(true);
  });
  test('Селектор SelectModalOrder', () => {
    const state = {
      feeds: {
        ...initialState,
        modal: mockOrder
      }
    };

    const result = SelectModalOrder(state);
    expect(result).toBe(mockOrder);
  });
});

describe('тесты extraReducers для fetchFeeds', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('Тест обработки состояния pending', () => {
    const action = fetchFeeds.pending('');
    const state = reducer(
      {
        ...initialState,
        error: 'Test Error'
      },
      action
    );

    expect(state).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: null,
      modal: null
    });
  });

  test('Тест обработки состояния fulfilled', () => {
    const action = fetchFeeds.fulfilled(feedsResponse, '');

    const state = reducer(
      {
        ...initialState,
        isLoading: true
      },
      action
    );
    expect(state).toEqual(feedExpectedResult);
  });
  test('Тест обработки состояния rejected', () => {
    const errorMessage = 'Ошибка загрузки заказов';
    const error = new Error(errorMessage);

    const action = fetchFeeds.rejected(error, '');

    const state = reducer(
      {
        ...initialState,
        isLoading: true
      },
      action
    );

    const expectedState = {
      ...initialState,
      isLoading: false,
      error: errorMessage
    };

    expect(state).toEqual(expectedState);
  });
});

describe('тесты extraReducers для getOrderByNumber', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('Тест обработки состояния pending', () => {
    const action = getOrderByNumber.pending('', 68884);
    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isLoading: true,
      error: null
    };

    expect(state).toEqual(expectedState);
  });

  test('Тест обработки состояния fulfilled', () => {
    const action = getOrderByNumber.fulfilled(getOrderByNumberMock, '', 68884);

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isLoading: false,
      modal: getOrderByNumberMock.orders[0]
    };

    expect(state).toEqual(expectedState);
  });
  test('Тест обработки состояния rejected', () => {
    const errorMessage = 'Ошибка загрузки заказов';
    const error = new Error(errorMessage);

    const action = getOrderByNumber.rejected(error, '', 68884);

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isLoading: false,
      error: errorMessage
    };

    expect(state).toEqual(expectedState);
  });
});
