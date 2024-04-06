import { configureStore } from '@reduxjs/toolkit'
import ingredientsReducer from './ingredients-slice';
import burgerConstructorReducer from './burger-constructor-slice';
import currentIngredientReducer from './current-ingredient-slice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    currentIngredient: currentIngredientReducer,
  }
});
