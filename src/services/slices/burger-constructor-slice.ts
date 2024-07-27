import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TIngredientWithUuid } from '../../utils/types';

type TBurgerConstructorState = {
  bun: null | TIngredientWithUuid;
  ingredients: TIngredientWithUuid[];
}

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: [],
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredientWithUuid>) => {
      const { type } = action.payload;
      if (type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients
        .filter((item) => item.uuid !== action.payload);
    },
    moveIngredient: (state, action: PayloadAction<{fromIndex: number; toIndex: number}>) => {
      const { fromIndex, toIndex } = action.payload;
      const newIngredients = [...state.ingredients];
      const movedIngredient = newIngredients[fromIndex];
      newIngredients.splice(fromIndex, 1);
      newIngredients.splice(toIndex, 0, movedIngredient);
      state.ingredients = newIngredients;
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

type TActionCreators = typeof burgerConstructorSlice.actions;

export type TBurgerConstructorActions = ReturnType<TActionCreators[keyof TActionCreators]>;