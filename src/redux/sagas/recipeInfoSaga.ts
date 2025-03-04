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
  try {
    const recipeId = action.payload;
    const data: SavedRecipe = yield call(getRecipeInformation, recipeId);
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
  yield takeLatest(fetchRecipeInformationRequest.type, fetchRecipeInformationSaga);
}