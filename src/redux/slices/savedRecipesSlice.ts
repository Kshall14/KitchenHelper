import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavedRecipe } from '../../components/Types';

const initialState: SavedRecipe[] = [];

const savedRecipesSlice = createSlice({
  name: 'savedRecipes',
  initialState,
  reducers: {
    addSavedRecipe(state: SavedRecipe[], action: PayloadAction<SavedRecipe>) {
      state.push(action.payload);
    },
    removeSavedRecipe(state: SavedRecipe[], action: PayloadAction<number>) {
      return state.filter((recipe: SavedRecipe) => recipe.id !== action.payload);
    },
    loadSavedRecipes(state: SavedRecipe[], action: PayloadAction<SavedRecipe[]>) {
      return action.payload; // Replace the state with the loaded recipes
    },
    replaceSavedRecipes(state: SavedRecipe[], action: PayloadAction<SavedRecipe[]>) {
      return action.payload; // Replace the entire list of saved recipes
    },
  },
});

export const { addSavedRecipe, removeSavedRecipe, loadSavedRecipes, replaceSavedRecipes } = savedRecipesSlice.actions;
export default savedRecipesSlice.reducer;