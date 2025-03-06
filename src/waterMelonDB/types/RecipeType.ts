export interface RecipeType {
    id?: string; // WatermelonDB automatically adds an `id` field
    spoonacularId: number;
    title: string;
   // ingredients: string; // Store as JSON string
    ingredients: any[];
    instructions: string; // Store as JSON string
    image: string;
    readyInMinutes: number;
  }