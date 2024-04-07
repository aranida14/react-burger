import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bun: null,
  ingredients: [],
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const { type } = action.payload;
      if (type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients
        .filter((item) => item.id !== action.payload._id);
    },
    moveIngredient: (state, action) => {
      const { from, to } = action.payload;
      const movingIngredient = state.ingredients[from];
      state.ingredients[from] = state.ingredients[to];
      state.ingredients[to] = movingIngredient;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const {
  addIngredient,
  deleteIngredient,
  moveIngredient,
  clearConstructor,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;