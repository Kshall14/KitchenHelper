// src/redux/sagas/recipeInfoSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import { getRecipeInformation } from '../../api/ApiHandler';
import {
  fetchRecipeInformationRequest,
  fetchRecipeInformationSuccess,
  fetchRecipeInformationFailure,
} from '../slices/recipeInfoSlice';
import { SavedRecipe } from '../../components/Types';
function* fetchRecipeInformationSaga(action: { type: string; payload: number }) {
  console.log('fetchRecipeInformationSaga triggered');
  try {
    console.log('Attempting to fetch recipe information...');

    const recipeId = action.payload;
    const data: SavedRecipe = yield call(getRecipeInformation, recipeId);
    console.log('Recipe Information: from saga', data);
    yield put(fetchRecipeInformationSuccess(data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchRecipeInformationFailure(error.message));
    } else {
      yield put(fetchRecipeInformationFailure('An unknown error occurred'));
    }
  }
}

export function* watchFetchRecipeInformation() {
  console.log('watchFetchRecipeInformation is running');
  yield takeLatest(fetchRecipeInformationRequest.type, fetchRecipeInformationSaga);
}