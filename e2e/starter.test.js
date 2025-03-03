describe('Navigation and Recipe Search Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should open the drawer and navigate to MealCalenderScreen', async () => {
    // Open the drawer navigator
    await element(by.id('burgerButton')).tap();

    // Navigate to MealCalenderScreen
    await element(by.id('drawerItem-MealCalender')).tap();

    // Verify that we are on the MealCalenderScreen
    await expect(element(by.text('Welcome to MealCalenderScreen'))).toBeVisible();
  });

  it('should open the drawer again and navigate to FindRecipeScreen', async () => {
    // Open the drawer navigator again
    await element(by.id('burgerButton')).tap();

    // Navigate to FindRecipeScreen
    await element(by.id('drawerItem-FindRecipe')).tap();

    // Verify that we are on the FindRecipeScreen
    await expect(element(by.text('Find a recipe!'))).toBeVisible();
  });

  it('should input an ingredient, search, and scroll through the list', async () => {
    // Input an ingredient
    await element(by.id('ingredientInput-0')).typeText('chicken');

    // Add another ingredient
    await element(by.id('addIngredientButton')).tap();
    await element(by.id('ingredientInput-1')).typeText('tomato');

    // Search for recipes
    await element(by.id('searchButton')).tap();

    // Wait for the recipes to load
    await waitFor(element(by.id('recipeList'))).toBeVisible().withTimeout(5000);

    // Scroll through the list of recipes
    await element(by.id('recipeList')).scroll(200, 'down');
  });
});
// describe('Navigation', () => {
//   beforeAll(async () => {
//     await device.launchApp(); // Launch the app before running tests
//   });

//   it('should open the drawer and navigate to Shopping List', async () => {
//     // Open the drawer
//     await element(by.text('Open Drawer')).tap();

//     // Navigate to Shopping List
//     await element(by.text('Shopping List')).tap();

//     // Verify that the Shopping List screen is visible
//     await expect(element(by.text('Shopping List Screen'))).toBeVisible();
//   });

//   it('should open the drawer and navigate to Find Recipe', async () => {
//     // Open the drawer
//     await element(by.text('Open Drawer')).tap();

//     // Navigate to Find Recipe
//     await element(by.text('Find a Recipe')).tap();

//     // Verify that the Find Recipe screen is visible
//     await expect(element(by.text('Find a recipe!'))).toBeVisible();
//   });

//   it('should add ingredients, delete one, input values, search recipe, and scroll results', async () => {
//     // Add two more text inputs for recipe ingredients
//     await element(by.text('+ Add Ingredient')).tap();
//     await waitFor(() => {}).withTimeout(100);
//     await element(by.text('+ Add Ingredient')).tap();
//     await waitFor(() => {}).withTimeout(100);
//     // Delete the last text input
//     await element(by.text('X')).atIndex(2).tap();
//     await waitFor(() => {}).withTimeout(100);
//     // Input 'milk' into the first text input
//     await element(by.type('TextInput')).atIndex(0).typeText('milk');
//     await waitFor(() => {}).withTimeout(100);
//     // Input 'eggs' into the second text input
//     await element(by.type('TextInput')).atIndex(1).typeText('eggs');
//     await waitFor(() => {}).withTimeout(100);
//     // Tap the Search for recipe button
//     await element(by.text('Search for Recipe!')).tap();
//     await waitFor(() => {}).withTimeout(100);
//     // Wait for the recipes to load
//     await waitFor(element(by.type('FlatList'))).toBeVisible().withTimeout(10000);
//     await waitFor(() => {}).withTimeout(100);
//     // Scroll the returned list of recipes
//     await element(by.type('FlatList')).scrollTo('bottom');
//   });
// });
  
