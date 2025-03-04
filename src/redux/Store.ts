// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import savedRecipesReducer from './slices/savedRecipesSlice';
import recipesReducer from './slices/recipeSlice';
import recipeInfoReducer from './slices/recipeInfoSlice';
import randomRecipesReducer from './slices/randomRecipeSlice';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
export const store = configureStore({
  reducer: {
    savedRecipes: savedRecipesReducer,
    recipes: recipesReducer,
    recipeInfo: recipeInfoReducer, 
    randomRecipes: randomRecipesReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware), 
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Export types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;