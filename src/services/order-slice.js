import { createSlice } from '@reduxjs/toolkit';
import { ORDERS_API_URL } from '../utils/api';

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
      state.error = action.payload.error;
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

export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const response = await fetch(ORDERS_API_URL, {
      method: "POST",
      body: JSON.stringify({ingredients: orderData}),
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
    });
    if (!response.ok) {
      throw new Error("API response not ok");
    }
    const json = await response.json();
    dispatch(createOrderSuccess(json));
    console.log(json);
  } catch (err) {
    dispatch(createOrderFailure(err));
  }
}

export const {
  createOrderFailure,
  createOrderRequest,
  createOrderSuccess,
  hideOrder,
} = orderSlice.actions;

export default orderSlice.reducer;