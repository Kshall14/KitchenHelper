import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'; // Correct import
import { schema } from './Schema';
import Recipe from './models/Recipe';
import ShoppingListItem from './models/ShoppingListItem';
// Create the SQLite adapter
const adapter = new SQLiteAdapter({
  dbName: 'FoodAppDB', // Name of your database
  schema, // Your schema
});

// Initialize the database
export const database = new Database({
  adapter,
  modelClasses: [Recipe, ShoppingListItem],
});