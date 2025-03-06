import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 3, // Increment the version (from 2 to 3)
  tables: [
    tableSchema({
      name: 'recipes',
      columns: [
        { name: 'spoonacular_id', type: 'number', isIndexed: true },
        { name: 'title', type: 'string' },
        { name: 'ingredients', type: 'string' },
        { name: 'instructions', type: 'string' },
        { name: 'image', type: 'string' },
        { name: 'ready_in_minutes', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'shopping_list_items', // New table for shopping list items
      columns: [
        { name: 'ingredient', type: 'string' }, // The ingredient text (e.g., "1 cup flour")
        { name: 'recipe_name', type: 'string' }, // The name of the recipe (e.g., "Blueberry Muffins")
        { name: 'recipe_id', type: 'number' }, // The ID of the recipe (optional, but useful for linking)
      ],
    }),
  ],
});