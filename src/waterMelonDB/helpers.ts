import { database } from './Database'; // Import your WatermelonDB database instance
import Recipe from './models/Recipe'; // Import your Recipe model
import { Q } from '@nozbe/watermelondb'; // For querying
import { RecipeType } from './types/RecipeType';
import { SavedRecipe } from '../components/Types';
import ShoppingListItem from './models/ShoppingListItem';
/**
 * Save a recipe to WatermelonDB.
 * @param recipe - The recipe to save.
 */

export const saveRecipe = async (recipe: RecipeType) => {
    console.log('Saving recipe:', recipe);
    console.log('Ingredients to save:', recipe.ingredients);
    try {
      await database.write(async () => {
        console.log('Creating new recipe...');
        await database.collections.get<Recipe>('recipes').create((newRecipe) => {
          console.log('New recipe created.');
          console.log('Ingredients before saving:', recipe.ingredients); 
          newRecipe.spoonacularId = recipe.spoonacularId;
          newRecipe.title = recipe.title;
          newRecipe.ingredients = JSON.stringify(recipe.ingredients); // Stringify ingredients (array)
          console.log('Ingredients after stringify:', newRecipe.ingredients);
          newRecipe.instructions = recipe.instructions; // Do not stringify instructions (already a string)
          newRecipe.image = recipe.image;
          newRecipe.readyInMinutes = recipe.readyInMinutes;
        });
      });
      console.log('Recipe saved successfully.');
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
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
export const fetchSavedRecipes = async (): Promise<SavedRecipe[]> => {
    try {
      const recipes = await database.collections.get<Recipe>('recipes').query().fetch();
      return recipes.map((recipe) => ({
        spoonacularId: recipe.spoonacularId,
        title: recipe.title,
        ingredients: JSON.parse(recipe.ingredients || '[]'), // Parse ingredients back into an array
        instructions: recipe.instructions, // Do not parse instructions (already a string)
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes ?? 30, // Use nullish coalescing
      }));
    } catch (error) {
      console.error('Error fetching saved recipes:', error);
      return []; // Return an empty array if there's an error
    }
  };
  

/**
 * Check if a recipe is favorited by its Spoonacular ID.
 * @param id - The Spoonacular ID of the recipe to check.
 * @returns A boolean indicating whether the recipe is favorited.
 */
export const isRecipeFavorited = async (id: number) => {
    try {
      if (typeof id !== 'number') {
        throw new Error('Invalid spoonacularId: must be a number');
      }
  
      const recipe = await database.collections
        .get<Recipe>('recipes')
        .query(Q.where('spoonacular_id', id))
        .fetch();
  
      return recipe.length > 0;
    } catch (error) {
      console.error('Error checking if recipe is favorited:', error);
      return false;
    }
  };
  export const saveIngredientsToShoppingList = async (
    ingredients: string[],
    recipeName: string,
    recipeId?: number
  ) => {
    try {
      await database.write(async () => {
        for (const ingredient of ingredients) {
          console.log('Saving ingredient:', ingredient);
          await database.collections
            .get<ShoppingListItem>('shopping_list_items')
            .create((newItem) => {
              newItem.ingredient = ingredient;
              newItem.recipeName = recipeName;
              newItem.recipeId = recipeId || 0; // Use 0 or another default if recipeId is not provided
            });
        }
      });
      console.log('Ingredients saved to shopping list successfully.');
    } catch (error) {
      console.error('Error saving ingredients to shopping list:', error);
    }
  };
  /**
 * Delete an ingredient from the shopping list by its ID.
 * @param id - The ID of the ingredient to delete.
 */
export const deleteIngredientFromShoppingList = async (id: string) => {
  try {
    await database.write(async () => {
      const ingredientToDelete = await database.collections
        .get<ShoppingListItem>('shopping_list_items')
        .find(id);

      await ingredientToDelete.destroyPermanently();
    });
    console.log('Ingredient deleted from shopping list successfully.');
  } catch (error) {
    console.error('Error deleting ingredient from shopping list:', error);
  }
};
/**
 * Fetch all shopping list items.
 * @returns An array of shopping list items.
 */
export const fetchShoppingListItems = async () => {
  try {
    const shoppingListItems = await database.collections
      .get<ShoppingListItem>('shopping_list_items')
      .query()
      .fetch();

    return shoppingListItems.map((item) => ({
      id: item.id,
      ingredient: item.ingredient,
      recipeName: item.recipeName,
      recipeId: item.recipeId,
    }));
  } catch (error) {
    console.error('Error fetching shopping list items:', error);
    return []; // Return an empty array if there's an error
  }
};