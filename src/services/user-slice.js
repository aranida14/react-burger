import { createSlice } from "@reduxjs/toolkit";
import { request } from "../utils/utils";

const initialState = {
  userData: null,
  registerUserError: null,
  loginError: null,
  logoutError: null,

};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserRequest: (state) => {
    
    },
    getUserFailure: (state) => {
      
    },
    registerUserFailure: (state, action) => {
      state.registerUserError = action.payload;
    },
    registerUserSuccess: (state, action) => {
      state.registerUserError = null;
      state.userData = action.payload.user;
    },
    loginFailure: (state, action) => {
      state.loginError = action.payload;
    },
    loginSuccess: (state, action) => {
      state.loginError = null;
      state.userData = action.payload.user;
    },
    logoutFailure: (state, action) => {
      state.logoutError = action.payload;
    },
    logoutSuccess: (state) => {
      state.logoutError = null;
      state.userData = null;
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

export const logout = (token) => (dispatch) => {
  request('/auth/logout', {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
  }).then((response) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return dispatch(logoutSuccess(response));
  }).catch((e) => dispatch(logoutFailure(e)));
};

export const {
  // getUserFailure,
  // getUserRequest,
  registerUserSuccess,
  registerUserFailure,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
} = userSlice.actions;

export default userSlice.reducer;