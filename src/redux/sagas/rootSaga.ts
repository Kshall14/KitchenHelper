// src/redux/sagas/rootSaga.ts
import { all } from 'redux-saga/effects';
import { watchFetchRecipesByIngredients } from './recipesSagas';
import { watchFetchRecipeInformation } from './recipeInfoSaga';
import { watchFetchRandomRecipes } from './randomRecipeSaga';

export default function* rootSaga() {
  yield all([
    watchFetchRecipesByIngredients(),
    watchFetchRecipeInformation(),
    watchFetchRandomRecipes(),
  ]);
}