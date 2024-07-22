import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchWithRefresh } from '../../utils/api';
import { AppDispatch } from '../store';

type TOrderState = {
  orderId: null | string;
  isLoading: boolean;
  error: null | string;
}

const initialState: TOrderState = {
  orderId: null,
  isLoading: false,
  error: null,
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

export const {
  createOrderFailure,
  createOrderRequest,
  createOrderSuccess,
  hideOrder,
} = orderSlice.actions;

export default orderSlice.reducer;

type TActionCreators = typeof orderSlice.actions;

export type TOrderActions = ReturnType<TActionCreators[keyof TActionCreators]>;