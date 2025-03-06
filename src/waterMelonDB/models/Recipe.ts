import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Recipe extends Model {
  static table = 'recipes';

  @field('spoonacular_id') spoonacularId!: number;
  @field('title') title!: string;
  @field('ingredients') ingredients!: string;
  @field('instructions') instructions!: string;
  @field('image') image!: string;
  @field('ready_in_minutes') readyInMinutes!: number;
}