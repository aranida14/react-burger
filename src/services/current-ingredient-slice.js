import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
}


export const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    showIngredient: (state, action) => {
      state.data = action.payload;
    },
    closeIngredient: (state) => {
      state.data = null;
    },
  },
});

export const {
  showIngredient,
  closeIngredient,
} = currentIngredientSlice.actions;

export default currentIngredientSlice.reducer;