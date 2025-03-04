import { database } from './database'; // Import your WatermelonDB database instance
import Recipe from './models/Recipe'; // Import your Recipe model
import { Q } from '@nozbe/watermelondb'; // For querying

/**
 * Save a recipe to WatermelonDB.
 * @param recipe - The recipe to save.
 */
export const saveRecipe = async (recipe: {
  id: number; // Spoonacular ID
  title: string;
  ingredients: string; // Store as JSON string
  instructions: string; // Store as JSON string
  image: string;
}) => {
  await database.write(async () => {
    await database.collections.get<Recipe>('recipes').create((newRecipe) => {
      newRecipe.spoonacularId = recipe.id;
      newRecipe.title = recipe.title;
      newRecipe.ingredients = recipe.ingredients;
      newRecipe.instructions = recipe.instructions;
      newRecipe.image = recipe.image;
    });
  });
};

/**
 * Delete a recipe from WatermelonDB by its Spoonacular ID.
 * @param id - The Spoonacular ID of the recipe to delete.
 */
export const deleteRecipe = async (id: number) => {
  await database.write(async () => {
    const recipeToDelete = await database.collections
      .get<Recipe>('recipes')
      .query(Q.where('spoonacular_id', id))
      .fetch();

    if (recipeToDelete.length > 0) {
      await recipeToDelete[0].destroyPermanently();
    }
  });
};

/**
 * Fetch all saved recipes from WatermelonDB.
 * @returns An array of saved recipes.
 */
export const fetchSavedRecipes = async () => {
  const recipes = await database.collections.get<Recipe>('recipes').query().fetch();
  return recipes.map((recipe) => ({
    id: recipe.spoonacularId,
    title: recipe.title,
    ingredients: JSON.parse(recipe.ingredients),
    instructions: JSON.parse(recipe.instructions),
    image: recipe.image,
  }));
};

/**
 * Check if a recipe is favorited by its Spoonacular ID.
 * @param id - The Spoonacular ID of the recipe to check.
 * @returns A boolean indicating whether the recipe is favorited.
 */
export const isRecipeFavorited = async (id: number) => {
  const recipe = await database.collections
    .get<Recipe>('recipes')
    .query(Q.where('spoonacular_id', id))
    .fetch();
  return recipe.length > 0;
};