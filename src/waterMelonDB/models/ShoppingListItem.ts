import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class ShoppingListItem extends Model {
  static table = 'shopping_list_items'; // Name of the table in the database

  @field('ingredient') ingredient!: string; // The ingredient text 
  @field('recipe_name') recipeName!: string; // The name of the recipe 
  @field('recipe_id') recipeId!: number; // The ID of the recipe (optional)
}