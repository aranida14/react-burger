import { createSlice } from "@reduxjs/toolkit";
import { fetchWithRefresh, request } from "../utils/api";

const initialState = {
  user: null,
  isAuthChecked: false,
  registerUserError: null,
  loginError: null,
  logoutError: null,
  getUserError: null,
  updateUserError: null,
  // userUpdated: false,
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    getUserFailure: (state, action) => {
      state.getUserError = action.payload.message;
      state.user = null;
    },
    getUserSuccess: (state, action) => {
      state.getUserError = null;
      state.user = action.payload.user;
    },
    updateUserFailure: (state, action) => {
      state.updateUserError = action.payload.message;
      // state.userUpdated = false;
    },
    updateUserResetError: (state) => {
      state.updateUserError = null;
    },
    updateUserSuccess: (state, action) => {
      state.updateUserError = null;
      state.user = action.payload.user;
      // state.userUpdated = true;
    },
    registerUserFailure: (state, action) => {
      state.registerUserError = action.payload.message;
    },
    registerUserSuccess: (state, action) => {
      state.registerUserError = null;
      state.user = action.payload.user;
    },
    loginFailure: (state, action) => {
      state.loginError = action.payload.message;
    },
    loginSuccess: (state, action) => {
      state.loginError = null;
      state.user = action.payload.user;
    },
    logoutFailure: (state, action) => {
      state.logoutError = action.payload.message;
    },
    logoutSuccess: (state) => {
      state.logoutError = null;
      state.user = null;
    },

  },
});

export const registerUser = (userData) => (dispatch) => {
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

export const login = (userData) => (dispatch) => {
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

export const logout = () => (dispatch) => {
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

export const getUser = () => (dispatch) => {
  fetchWithRefresh('/auth/user', {
    headers: {
        "authorization": localStorage.getItem('accessToken')
    },
  }).then((response) => dispatch(getUserSuccess(response)))
  .catch((e) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return dispatch(getUserFailure(e));
  }).finally(() => dispatch(setAuthChecked(true)));
};

export const updateUser = (userData) => (dispatch) => {
  fetchWithRefresh('/auth/user', {
    method: "PATCH",
    body: JSON.stringify(userData),
    headers: {
        "authorization": localStorage.getItem('accessToken'),
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