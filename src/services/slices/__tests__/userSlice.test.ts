import {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  initialState,
  authChecked,
  userLogout,
  updateUser,
  setUser,
  userDataSelector,
  isAuthCheckedSelector,
  isLoadingSelector
} from '../UserSlice';
import {
  userTest,
  userTestLogin,
  registerData,
  loginData,
  updateUserData
} from '../mock';
import reducer from '../UserSlice';

describe('тесты селекторов', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('селектор userDataSelector', () => {
    const state = {
      user: {
        ...initialState,
        user: { name: 'Жак-Ив', email: 'musickristy2@yandex.ru' }
      }
    };
    const result = userDataSelector(state);
    expect(result).toEqual(userTest);
  });

  test('Селектор isAuthCheckedSelector', () => {
    const state = {
      user: {
        ...initialState,
        user: { name: 'Жак-Ив', email: 'musickristy2@yandex.ru' },
        isAuthenticated: true
      }
    };
    const result = isAuthCheckedSelector(state);
    expect(result).toBe(true);
  });
  test('Селектор isLoadingSelector', () => {
    const state = {
      user: {
        ...initialState,
        isLoading: true
      }
    };
    const result = isLoadingSelector(state);
    expect(result).toBe(true);
  });
});

describe('тесты extraReducers для getUser', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('Тест обработки состояния pending', () => {
    const action = getUser.pending('');
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
    const action = getUser.fulfilled(userTestLogin, '');

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isAuthenticated: true,
      user: userTest,
      isLoading: false
    };

    expect(state).toEqual(expectedState);
  });
  test('Тест обработки состояния rejected', () => {
    const errorMessage = 'Ошибка загрузки пользователя';
    const error = new Error(errorMessage);

    const action = getUser.rejected(error, '');

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isLoading: false,
      error: errorMessage
    };

    expect(state).toEqual(expectedState);
  });
});

describe('тесты extraReducers для registerUser', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('Тест обработки состояния pending', () => {
    const action = registerUser.pending('', registerData);

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      loginUserRequest: true,
      isAuthenticated: false,
      error: null
    };

    expect(state).toEqual(expectedState);
  });

  test('Тест обработки состояния fulfilled', () => {
    const action = registerUser.fulfilled(userTest, '', registerData);

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isAuthenticated: true,
      user: userTest,
      loginUserRequest: false
    };

    expect(state).toEqual(expectedState);
  });
  test('Тест обработки состояния rejected', () => {
    const errorMessage = 'Ошибка загрузки пользователя';
    const error = new Error(errorMessage);

    const action = registerUser.rejected(error, '', registerData);

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isAuthenticated: false,
      error: errorMessage,
      loginUserRequest: false,
      loginUserError: errorMessage
    };

    expect(state).toEqual(expectedState);
  });
});

describe('тесты extraReducers для loginUser', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('Тест обработки состояния pending', () => {
    const action = loginUser.pending('', loginData);

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      loginUserRequest: true,
      loginUserError: null,
      isLoading: false
    };

    expect(state).toEqual(expectedState);
  });

  test('Тест обработки состояния fulfilled', () => {
    const action = loginUser.fulfilled(userTest, '', loginData);

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isAuthenticated: true,
      isAuthChecked: true,
      user: userTest,
      loginUserRequest: false,
      isLoading: false,
      error: null
    };

    expect(state).toEqual(expectedState);
  });
  test('Тест обработки состояния rejected', () => {
    const errorMessage = 'Ошибка загрузки пользователя';
    const error = new Error(errorMessage);

    const action = loginUser.rejected(error, '', loginData);

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isAuthChecked: true,
      error: errorMessage,
      loginUserRequest: false,
      isLoading: false
    };

    expect(state).toEqual(expectedState);
  });
});

describe('тесты extraReducers для logoutUser', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('Тест обработки состояния pending', () => {
    const action = logoutUser.pending('');

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isLoading: true
    };

    expect(state).toEqual(expectedState);
  });

  test('Тест обработки состояния fulfilled', () => {
    const action = logoutUser.fulfilled(undefined, '');

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isAuthenticated: false,
      user: null,
      isLoading: false
    };

    expect(state).toEqual(expectedState);
  });
  test('Тест обработки состояния rejected', () => {
    const errorMessage = 'Ошибка загрузки пользователя';
    const error = new Error(errorMessage);

    const action = logoutUser.rejected(error, '');

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      error: errorMessage,
      isLoading: false
    };

    expect(state).toEqual(expectedState);
  });
});

describe('тесты extraReducers для updateUser', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('Тест обработки состояния pending', () => {
    const action = updateUser.pending('', registerData);

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isLoading: true,
      isAuthenticated: true
    };

    expect(state).toEqual(expectedState);
  });

  test('Тест обработки состояния fulfilled', () => {
    const action = updateUser.fulfilled(updateUserData, '', registerData);

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isAuthenticated: true,
      user: userTest,
      isLoading: false,
      loginUserRequest: false
    };

    expect(state).toEqual(expectedState);
  });
  test('Тест обработки состояния rejected', () => {
    const errorMessage = 'Ошибка загрузки пользователя';
    const error = new Error(errorMessage);

    const action = updateUser.rejected(error, '', registerData);

    const state = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      error: errorMessage,
      isLoading: false,
      loginUserRequest: false
    };

    expect(state).toEqual(expectedState);
  });
});

describe('редьюсеры userSlice', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('authChecked: устанавливает isAuthenticated в true', () => {
    const action = authChecked();
    const newState = reducer(initialState, action);
    const expectedState = {
      ...initialState,
      isAuthenticated: true
    };
    expect(newState).toEqual(expectedState);
  });

  test('userLogout', () => {
    const action = userLogout();
    const newState = reducer(initialState, action);
    const expectedState = {
      ...initialState,
      user: null
    };
    expect(newState).toEqual(expectedState);
  });

  test('setUser', () => {
    const action = setUser(userTest);
    const newState = reducer(initialState, action);
    const expectedState = {
      ...initialState,
      user: userTest
    };
    expect(newState).toEqual(expectedState);
  });
});
