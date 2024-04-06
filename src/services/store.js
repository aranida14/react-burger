import { configureStore } from '@reduxjs/toolkit'
import ingredientsReducer from './ingredients-slice';
import burgerConstructorReducer from './burger-constructor-slice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
  }
});
