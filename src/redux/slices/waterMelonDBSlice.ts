import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavedRecipe } from '../../components/Types';

interface WatermelonDBState {
  savedRecipes: SavedRecipe[];
}

const initialState: WatermelonDBState = {
  savedRecipes: [],
};

const watermelonDBSlice = createSlice({
  name: 'watermelonDB',
  initialState,
  reducers: {
    loadSavedRecipes(state, action: PayloadAction<SavedRecipe[]>) {
      state.savedRecipes = action.payload;
    },
    addSavedRecipe(state, action: PayloadAction<SavedRecipe>) {
      state.savedRecipes.push(action.payload);
      console.log('WaterMelonSlice Payload',action.payload);
    },
    removeSavedRecipe(state, action: PayloadAction<number>) {
      state.savedRecipes = state.savedRecipes.filter(
        (recipe) => recipe.spoonacularId !== action.payload // Use spoonacularId
      );
    },
  },
});

export const { loadSavedRecipes, addSavedRecipe, removeSavedRecipe } =
  watermelonDBSlice.actions;

export default watermelonDBSlice.reducer;