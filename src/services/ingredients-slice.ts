import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { request } from '../utils/api';
import { TIngredient } from '../utils/types';
import { AppDispatch } from './store';

type TIngredientsState = {
  data: TIngredient[];
  isLoading: boolean;
  error: null | Error;
}

const initialState: TIngredientsState = {
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
    fetchIngredientsSuccess: (state, action: PayloadAction<TIngredient[]>) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchIngredientsFailure: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const fetchIngredients = () => (dispatch: AppDispatch) => {
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

type TActionCreators = typeof ingredientsSlice.actions;

export type TIngredientsActions = ReturnType<TActionCreators[keyof TActionCreators]>;