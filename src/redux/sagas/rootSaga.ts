// src/redux/sagas/rootSaga.ts
import { all } from 'redux-saga/effects';
import { watchFetchRecipesByIngredients } from './recipesSagas';
import { watchFetchRecipeInformation } from './recipeInfoSaga';
import { watchFetchRandomRecipes } from './randomRecipeSaga';
import { watchUserSaga } from './userSaga';
export default function* rootSaga() {
  yield all([
    watchFetchRecipesByIngredients(),
    watchFetchRecipeInformation(),
    
    watchFetchRandomRecipes(),
    watchUserSaga(),
  ]);
}