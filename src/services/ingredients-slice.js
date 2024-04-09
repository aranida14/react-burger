import { createSlice } from '@reduxjs/toolkit'
import { request } from '../utils/utils';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    fetchIngredientsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchIngredientsSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchIngredientsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const fetchIngredients = () => (dispatch) => {
  dispatch(fetchIngredientsRequest());
  request('/ingredients')
    .then((response) => dispatch(fetchIngredientsSuccess(response.data)))
    .catch((e) => dispatch(fetchIngredientsFailure(e)));  
};

export const {
  fetchIngredientsRequest,
  fetchIngredientsSuccess,
  fetchIngredientsFailure
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;