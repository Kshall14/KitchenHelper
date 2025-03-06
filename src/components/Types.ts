// Recipe-related types
export interface Recipe {
  id: number;
  title: string;
  image: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  extendedIngredients: { name: string; amount: number; unit: string }[];
  instructions: string;
  readyInMinutes: number;
}

export interface SavedRecipe {
  id?: string; // Optional for WatermelonDB
  spoonacularId: number; // Required and always a number
  title: string;
  ingredients: any[]; // Array of ingredient objects
  instructions: string; // Instructions as a string (HTML or plain text)
  image: string;
  readyInMinutes: number;
  analyzedInstructions?: { steps: { number: number; step: string }[] }[];
  extendedIngredients?: { name: string; amount: number; unit: string }[];
}

export interface RandomRecipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  extendedIngredients: { name: string; amount: number; unit: string }[];
  usedIngredientCount: number; // Add this
  missedIngredientCount: number; // Add this
  instructions: string; // Add this
}
export interface ShoppingListItem {
  id: string; // Unique identifier for the item (handled by WatermelonDB)
  ingredient: string; // The ingredient text (e.g., "1 cup flour")
  recipeName: string; // The name of the recipe the ingredient belongs to (e.g., "Blueberry Muffins")
  recipeId?: number; // The ID of the recipe (optional, but useful for linking)
}
export type RecipeScreenState = {
  ingredients: string[];
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
};

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

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

// WatermelonDB-specific types
export interface RecipeType extends Omit<SavedRecipe, 'id'> {
  id?: string; // WatermelonDB automatically adds an `id` field
}