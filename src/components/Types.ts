// Types.ts
// Recipe-related types
export interface Recipe {
  id: number;
  title: string;
  image: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
}

export interface SavedRecipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  analyzedInstructions?: { steps: { number: number; step: string }[] }[];
}

export type RecipeScreenState = {
  ingredients: string[];
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
};

// Navigation-related types
export type RootStackParamList = {
  MainMenu: undefined;
  FindRecipe: undefined;
  MealCalender: undefined;
  SavedRecipe: undefined;
  ShoppingList: undefined;
  UploadRecipe: undefined;
  Recipe: { recipeId: number; recipe?: SavedRecipe };
  SignIn: undefined;
  MainAppScreen: undefined;
};