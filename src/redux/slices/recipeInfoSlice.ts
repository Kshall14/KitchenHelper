// src/redux/slices/recipeInfoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavedRecipe } from '../../components/Types';

interface RecipeInfoState {
  recipe: SavedRecipe | null;
  loading: boolean;
  error: string | null;
}

const initialState: RecipeInfoState = {
  recipe: null,
  loading: false,
  error: null,
};

const recipeInfoSlice = createSlice({
  name: 'recipeInfo',
  initialState,
  reducers: {
    fetchRecipeInformationRequest(state, action: PayloadAction<number>) {
      state.loading = true;
      state.error = null;
    },
    fetchRecipeInformationSuccess(state, action: PayloadAction<SavedRecipe>) {
      state.recipe = action.payload;
      state.loading = false;
    },
    fetchRecipeInformationFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchRecipeInformationRequest,
  fetchRecipeInformationSuccess,
  fetchRecipeInformationFailure,
} = recipeInfoSlice.actions;

export default recipeInfoSlice.reducer;