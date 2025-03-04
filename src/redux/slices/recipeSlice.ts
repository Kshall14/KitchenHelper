// src/redux/slices/recipesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../../components/Types';

interface RecipesState {
  recipes: Recipe[];
  recipesOnlyIngredients: Recipe[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipesState = {
  recipes: [],
  recipesOnlyIngredients: [],
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
    fetchRecipesByOnlyIngredientsRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchRecipesByOnlyIngredientsSuccess: (state, action: PayloadAction<Recipe[]>) => {
      state.recipesOnlyIngredients = action.payload; // Store the results in the new property
      state.loading = false;
    },
    fetchRecipesByOnlyIngredientsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  
});

export const {
  fetchRecipesByIngredientsRequest,
  fetchRecipesByIngredientsSuccess,
  fetchRecipesByIngredientsFailure,
  fetchRecipesByOnlyIngredientsRequest,
  fetchRecipesByOnlyIngredientsSuccess,
  fetchRecipesByOnlyIngredientsFailure,
} = recipesSlice.actions;

export default recipesSlice.reducer;