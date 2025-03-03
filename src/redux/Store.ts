// store.ts
import { configureStore } from '@reduxjs/toolkit';
import savedRecipesReducer from './slices/savedRecipesSlice';

export const store = configureStore({
  reducer: {
    savedRecipes: savedRecipesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;