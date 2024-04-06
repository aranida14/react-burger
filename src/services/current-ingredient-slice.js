import { createSlice } from '@reduxjs/toolkit';
// import { data } from '../utils/data';

// const fakeIngredient = data[1];


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
  showIngredient: showIngredient,
  closeIngredient: closeIngredient,
} = currentIngredientSlice.actions;

export default currentIngredientSlice.reducer;