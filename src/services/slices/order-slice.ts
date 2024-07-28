import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchWithRefresh, request } from '../../utils/api';
import { AppDispatch } from '../store';
import { TOrderCard } from '../../utils/types';

type TOrderState = {
  orderId: null | string;
  isLoading: boolean;
  error: null | string;
  currentOrder: TOrderCard | null;
  // isLoadingCurrentOrder: boolean;
}

export const initialState: TOrderState = {
  orderId: null,
  isLoading: false,
  error: null,
  currentOrder: null,
  // isLoadingCurrentOrder: false
}


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrderRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    createOrderSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.orderId = action.payload;
    },
    createOrderFailure: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    hideOrder: (state) => {
      state.orderId = null;
    },
    getOrderRequest: (state) => {
      // state.isLoadingCurrentOrder = true;
      state.currentOrder = null;
    },
    getOrderSuccess: (state, action: PayloadAction<TOrderCard>) => {
      state.currentOrder = action.payload;
    },
    getOrderFailure: (state) => {
      state.currentOrder = null;
      // state.isLoadingCurrentOrder = false;
    }
  },
});

// response:
// {
//   "success": true,
//   "name": "Краторный био-марсианский люминесцентный бургер",
//   "order": {
//       "number": 6768
//   }
// }

export const createOrder = (orderData: string[]) => (dispatch: AppDispatch) => {
  dispatch(createOrderRequest());
  fetchWithRefresh('/orders', {
    method: "POST",
    body: JSON.stringify({ingredients: orderData}),
    headers: {
        "authorization": localStorage.getItem('accessToken') ?? '',
        "Content-Type": "application/json; charset=UTF-8"
    },
  }).then((response) => dispatch(createOrderSuccess(response.order.number)))
  .catch((e) => dispatch(createOrderFailure(e)));
}

export const getOrderByNumber = (orderNumber: string) => (dispatch: AppDispatch) => {
  dispatch(getOrderRequest());
  
  request(`/orders/${orderNumber}`)
    .then((response) => {
      // console.log()
      if (response && response.orders && response.orders.length) {
        return dispatch(getOrderSuccess(response.orders[0]));
      }
      return dispatch(getOrderFailure());
    })
    .catch(() => dispatch(getOrderFailure()));
}

export const {
  createOrderFailure,
  createOrderRequest,
  createOrderSuccess,
  hideOrder,
  getOrderSuccess,
  getOrderFailure,
  getOrderRequest,
} = orderSlice.actions;

export default orderSlice.reducer;

type TActionCreators = typeof orderSlice.actions;

export type TOrderActions = ReturnType<TActionCreators[keyof TActionCreators]>;