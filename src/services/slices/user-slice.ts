import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchWithRefresh, request } from "../../utils/api";
import { AppDispatch } from "../store";

type TUser = {
  name: string;
  email: string;
}

type TUserData = {
  name?: string;
  email?: string;
  password?: string;
}

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  registerUserError: null | string;
  loginError: null | string;
  logoutError: null | string;
  getUserError: null | string;
  updateUserError: null | string;
}

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  registerUserError: null,
  loginError: null,
  logoutError: null,
  getUserError: null,
  updateUserError: null,
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    getUserFailure: (state, action: PayloadAction<Error>) => {
      state.getUserError = action.payload.message;
      state.user = null;
    },
    getUserSuccess: (state, action: PayloadAction<{ user: TUser }>) => {
      state.getUserError = null;
      state.user = action.payload.user;
    },
    updateUserFailure: (state, action: PayloadAction<Error>) => {
      state.updateUserError = action.payload.message;
    },
    updateUserResetError: (state) => {
      state.updateUserError = null;
    },
    updateUserSuccess: (state, action: PayloadAction<{ user: TUser }>) => {
      state.updateUserError = null;
      state.user = action.payload.user;
    },
    registerUserFailure: (state, action: PayloadAction<Error>) => {
      state.registerUserError = action.payload.message;
    },
    registerUserSuccess: (state, action: PayloadAction<{ user: TUser }>) => {
      state.registerUserError = null;
      state.user = action.payload.user;
    },
    loginFailure: (state, action: PayloadAction<Error>) => {
      state.loginError = action.payload.message;
    },
    loginSuccess: (state, action: PayloadAction<{ user: TUser }>) => {
      state.loginError = null;
      state.user = action.payload.user;
    },
    logoutFailure: (state, action: PayloadAction<Error>) => {
      state.logoutError = action.payload.message;
    },
    logoutSuccess: (state) => {
      state.logoutError = null;
      state.user = null;
    },

  },
});

export const registerUser = (userData: TUserData) => (dispatch: AppDispatch) => {
  request('/auth/register', {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
  }).then((response) => {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return dispatch(registerUserSuccess(response));
  }).catch((e) => dispatch(registerUserFailure(e)));
};

export const login = (userData: TUserData) => (dispatch: AppDispatch) => {
  request('/auth/login', {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
  }).then((response) => {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return dispatch(loginSuccess(response));
  }).catch((e) => dispatch(loginFailure(e)));
};

export const logout = () => (dispatch: AppDispatch) => {
  request('/auth/logout', {
    method: "POST",
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
  }).then((response) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return dispatch(logoutSuccess(response));
  }).catch((e) => dispatch(logoutFailure(e)));
};

export const getUser = () => (dispatch: AppDispatch) => {
  fetchWithRefresh('/auth/user', {
    headers: {
        "authorization": localStorage.getItem('accessToken') ?? ''
    },
  }).then((response) => dispatch(getUserSuccess(response)))
  .catch((e) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return dispatch(getUserFailure(e));
  }).finally(() => dispatch(setAuthChecked(true)));
};

export const updateUser = (userData: TUserData) => (dispatch: AppDispatch) => {
  fetchWithRefresh('/auth/user', {
    method: "PATCH",
    body: JSON.stringify(userData),
    headers: {
        "authorization": localStorage.getItem('accessToken') ?? '',
        "Content-Type": "application/json; charset=UTF-8"
    },
  }).then((response) => dispatch(updateUserSuccess(response)))
  .catch((e) => dispatch(updateUserFailure(e)));
};

export const {
  setAuthChecked,
  getUserSuccess,
  getUserFailure,
  updateUserSuccess,
  updateUserFailure,
  updateUserResetError,
  registerUserSuccess,
  registerUserFailure,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
} = userSlice.actions;

export default userSlice.reducer;

type TActionCreators = typeof userSlice.actions;

export type TUserActions = ReturnType<TActionCreators[keyof TActionCreators]>;