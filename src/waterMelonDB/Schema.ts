import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'recipes',
      columns: [
        { name: 'spoonacular_id', type: 'number', isIndexed: true }, // Unique ID from Spoonacular
        { name: 'title', type: 'string' },
        { name: 'ingredients', type: 'string' }, // Store as JSON string
        { name: 'instructions', type: 'string' }, // Store as JSON string
        { name: 'image', type: 'string' }, // URL to the image
      ],
    }),
  ],
});