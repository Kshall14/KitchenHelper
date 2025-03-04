// src/redux/sagas/randomRecipesSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import { getRandomRecipe } from '../../api/ApiHandler';
import {
  fetchRandomRecipesRequest,
  fetchRandomRecipesSuccess,
  fetchRandomRecipesFailure,
} from '../slices/randomRecipeSlice';
import { RandomRecipe } from '../../components/Types';


function* fetchRandomRecipesSaga(): Generator<any, void, { recipes: RandomRecipe[] }> {
  try {
    const response: { recipes: RandomRecipe[] } = yield call(getRandomRecipe, 6); // Fetch 3 random recipes
    console.log('API Response:', response); // Log the full response

    // if (!Array.isArray(response.recipes)) {
    //   throw new Error('API response is not in the expected format');
    // }
    if (!response || !response.recipes || !Array.isArray(response.recipes)) {
      throw new Error('API response is not in the expected format');
    }
    yield put(fetchRandomRecipesSuccess(response.recipes)); // Pass the recipes array to the success action
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchRandomRecipesFailure(error.message));
    } else {
      yield put(fetchRandomRecipesFailure('An unknown error occurred'));
    }
  }
}

export function* watchFetchRandomRecipes() {
  yield takeLatest(fetchRandomRecipesRequest.type, fetchRandomRecipesSaga);
}