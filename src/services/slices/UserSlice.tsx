import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import {
  TRegisterData,
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  refreshToken
} from '../../utils/burger-api';

import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }) => {
    const accessToken = getCookie('accessToken');
    const refreshUserToken = localStorage.getItem('refreshToken');

    if (accessToken) {
      try {
        await dispatch(getUser()).unwrap();
      } catch (error) {
        if (refreshUserToken) {
          try {
            const newTokens = await refreshToken();
            setCookie('accessToken', newTokens.accessToken);
            localStorage.setItem('refreshToken', newTokens.refreshToken);
            await dispatch(getUser()).unwrap();
          } catch (refreshTokenError) {
            localStorage.removeItem('refreshToken');
            deleteCookie('accessToken');
            dispatch(userLogout());
          }
        } else {
          deleteCookie('accessToken');
          dispatch(userLogout());
        }
      }
    } else if (refreshUserToken) {
      try {
        const newTokens = await refreshToken();
        setCookie('accessToken', newTokens.accessToken);
        localStorage.setItem('refreshToken', newTokens.refreshToken);
        await dispatch(getUser()).unwrap();
      } catch (refreshTokenError) {
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        dispatch(userLogout());
      }
    } else {
      dispatch(userLogout());
    }

    dispatch(authChecked());
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData) => {
    const userData = await registerUserApi({ email, name, password });

    setCookie('accessToken', userData.refreshToken);
    localStorage.setItem('refreshToken', userData.refreshToken);

    return userData.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const userData = await loginUserApi({ email, password });

    setCookie('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);

    return userData.user;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
        dispatch(userLogout());
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
  }
);

export const updateUser = createAsyncThunk('user/updateUserApi', updateUserApi);
export interface UserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginUserError: null | string;
  loginUserRequest: boolean;
  user: TUser | null;
  error: string | null;
}

const initialState: UserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  isLoading: false,
  loginUserError: null,
  loginUserRequest: false,
  user: null,
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthenticated = true;
    },
    userLogout: (state) => {
      state.user = null;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    userDataSelector: (state) => state.user,
    isAuthCheckedSelector: (state) => state.isAuthenticated,
    isLoadingSelector: (state) => state.isLoading,
    errorelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error =
          `${action.error.message}` || 'Не удалось загрузить данные';
        state.user = null;
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.isLoading = false;
      })

      .addCase(registerUser.pending, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.loginUserRequest = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loginUserRequest = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error =
          `${action.error.message}` ||
          'Не удалось зарегистрировать пользователя';
        state.isAuthenticated = false;
        state.loginUserError = `${action.error.message}`;
        state.loginUserRequest = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.isLoading = false;
        state.error =
          `${action.error.message}` || 'Не удалось выполнить вход в профиль';
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error =
          `${action.error.message}` || 'Не удалось выйти из профиля';
        state.isLoading = false;
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.isLoading = false;
        state.loginUserRequest = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error =
          `${action.error.message}` ||
          'Не удалось обновить данные пользователя';
        state.isLoading = false;
        state.loginUserRequest = false;
      });
  }
});

export const { authChecked, userLogout, setUser } = userSlice.actions;
export const { isAuthCheckedSelector, userDataSelector, isLoadingSelector } =
  userSlice.selectors;

export default userSlice.reducer;
