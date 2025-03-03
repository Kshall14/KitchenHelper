// // AppNavigator.js
// import * as React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';

// // Import your screens
// import MainMenuScreen from '../screens/MainMenuScreen';
// import ShoppingListScreen from '../screens/ShoppingListScreen';
// import RecipeScreen from '../screens/FindRecipeScreen';
// // Create the Drawer Navigator
// const Drawer = createDrawerNavigator();

// function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="MainMenu">
//         <Drawer.Screen
//           name="MainMenu"
//           component={MainMenuScreen}
//           options={{ title: 'Main Menu' }}
//         />
//         <Drawer.Screen
//           name="ShoppingList"
//           component={ShoppingListScreen}
//           options={{ title: 'Shopping List' }}
//         />
//         <Drawer.Screen
//           name="Find Recipe"
//           component={RecipeScreen}
//           options={{ title: 'Find a Recipe' }}
//         />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

// export default AppNavigator;