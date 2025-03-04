// src/redux/slices/randomRecipesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RandomRecipe } from '../../components/Types';

interface RandomRecipesState {
  randomRecipes: RandomRecipe[];
  loading: boolean;
  error: string | null;
}

const initialState: RandomRecipesState = {
  randomRecipes: [], // Initialize as an empty array
  loading: false,
  error: null,
};

const randomRecipesSlice = createSlice({
  name: 'randomRecipes',
  initialState,
  reducers: {
    fetchRandomRecipesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRandomRecipesSuccess(state, action: PayloadAction<RandomRecipe[]>) {
      state.randomRecipes = action.payload; // Set the recipes array
      state.loading = false;
    },
    fetchRandomRecipesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchRandomRecipesRequest,
  fetchRandomRecipesSuccess,
  fetchRandomRecipesFailure,
} = randomRecipesSlice.actions;

export default randomRecipesSlice.reducer;