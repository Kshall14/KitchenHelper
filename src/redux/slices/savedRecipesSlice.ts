import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavedRecipe } from '../../components/Types'; // Import the SavedRecipe type

interface SavedRecipesState {
  savedRecipes: SavedRecipe[];
}

const initialState: SavedRecipesState = {
  savedRecipes: [],
};

const savedRecipesSlice = createSlice({
  name: 'savedRecipes',
  initialState,
  reducers: {
    // Action to load saved recipes into the state
    loadSavedRecipes: (state, action: PayloadAction<SavedRecipe[]>) => {
      state.savedRecipes = action.payload;
    },
    // Action to add a new recipe to the saved recipes
    addSavedRecipe: (state, action: PayloadAction<SavedRecipe>) => {
      state.savedRecipes.push(action.payload);
    },
    // Action to remove a recipe from the saved recipes
    removeSavedRecipe: (state, action: PayloadAction<number>) => {
      state.savedRecipes = state.savedRecipes.filter(
        (recipe) => recipe.spoonacularId !== action.payload
      );
    },
  },
});

export const { loadSavedRecipes, addSavedRecipe, removeSavedRecipe } = savedRecipesSlice.actions;
export default savedRecipesSlice.reducer;