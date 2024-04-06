import { configureStore } from '@reduxjs/toolkit'
import ingredientsReducer from './ingredients-slice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
