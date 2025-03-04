import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';
import { RecipeType } from '../types/RecipeType'; // Import the type (optional)

export default class Recipe extends Model {
  static table = 'recipes';

  @field('spoonacular_id') spoonacularId!: number;
  @field('title') title!: string;
  @field('ingredients') ingredients!: string;
  @field('instructions') instructions!: string;
  @field('image') image!: string;
}