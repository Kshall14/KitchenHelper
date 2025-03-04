// src/redux/sagas/recipesSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import { findRecipesByIngredients } from '../../api/ApiHandler';
import {
  fetchRecipesByIngredientsRequest,
  fetchRecipesByIngredientsSuccess,
  fetchRecipesByIngredientsFailure,
} from '../slices/recipeSlice';
import { Recipe } from '../../components/Types';
function* fetchRecipesByIngredientsSaga(action: { type: string; payload: string }) {
  try {
    const ingredients = action.payload;
    const data: Recipe[] = yield call(findRecipesByIngredients, ingredients);
    yield put(fetchRecipesByIngredientsSuccess(data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchRecipesByIngredientsFailure(error.message));
    } else {
      yield put(fetchRecipesByIngredientsFailure('An unknown error occurred'));
    }
  }
}

export function* watchFetchRecipesByIngredients() {
  yield takeLatest(fetchRecipesByIngredientsRequest.type, fetchRecipesByIngredientsSaga);
}