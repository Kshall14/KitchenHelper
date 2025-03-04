// src/redux/slices/recipesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../../components/Types';

interface RecipesState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipesState = {
  recipes: [],
  loading: false,
  error: null,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    fetchRecipesByIngredientsRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    fetchRecipesByIngredientsSuccess(state, action: PayloadAction<Recipe[]>) {
      state.recipes = action.payload;
      state.loading = false;
    },
    fetchRecipesByIngredientsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchRecipesByIngredientsRequest,
  fetchRecipesByIngredientsSuccess,
  fetchRecipesByIngredientsFailure,
} = recipesSlice.actions;

export default recipesSlice.reducer;