import { createSlice } from '@reduxjs/toolkit'
import { INGREDIENTS_API_URL } from '../utils/api';

const initialState = {
  data: [],
  loading: false,
  error: null,
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    fetchIngredientsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchIngredientsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchIngredientsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const fetchIngredients = () => async (dispatch) => {
  try {
    dispatch(fetchIngredientsRequest());
    const response = await fetch(INGREDIENTS_API_URL);
    if (!response.ok) {
      throw new Error("API response not ok");
    }
    const json = await response.json();
    if (json && json.data) {
      dispatch(fetchIngredientsSuccess(json.data));
    } else {
      throw new Error("API response has no data");
    }    
  } catch (err) {
    dispatch(fetchIngredientsFailure(err));
  }
  
};

// Action creators are generated for each case reducer function
export const {
  fetchIngredientsRequest,
  fetchIngredientsSuccess,
  fetchIngredientsFailure
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;