import { createSlice } from '@reduxjs/toolkit';
import { fetchWithRefresh } from '../utils/api';

const initialState = {
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
    createOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.orderId = action.payload.order.number;
    },
    createOrderFailure: (state, action) => {
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

export const createOrder = (orderData) => (dispatch) => {
  dispatch(createOrderRequest());
  fetchWithRefresh('/orders', {
    method: "POST",
    body: JSON.stringify({ingredients: orderData}),
    headers: {
        "authorization": localStorage.getItem('accessToken'),
        "Content-Type": "application/json; charset=UTF-8"
    },
  }).then((response) => dispatch(createOrderSuccess(response)))
  .catch((e) => dispatch(createOrderFailure(e)));
}

export const {
  createOrderFailure,
  createOrderRequest,
  createOrderSuccess,
  hideOrder,
} = orderSlice.actions;

export default orderSlice.reducer;