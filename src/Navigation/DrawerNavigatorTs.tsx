import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { RootStackParamList } from '../components/Types';
import MainMenuScreenTs from '../screens/MainMenuScreenTs';
import FindRecipeScreenTs from '../screens/FindRecipeScreenTs';
import MealCalenderScreenTs from '../screens/MealCalenderScreenTs';
import SavedRecipeScreenTs from '../screens/SavedRecipeTs';
import ShoppingListScreenTs from '../screens/ShoppingListTs';
import UploadRecipeScreenTs from '../screens/UploadRecipeScreenTs';
import ViewRecipeScreenTs from '../screens/ViewRecipeScreen'
import SignInScreen from '../screens/SignInScreen';
import MainAppScreenTs from '../screens/MainAppScreenTs';
import SavedRecipesScreenTs from '../screens/SavedRecipeTs';
import { View, Text, StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator<RootStackParamList>();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props} style={styles.drawerBackground}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>My Recipe App</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const DrawerNavigatorTs: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="MainMenu"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#4CAF50', // Active item text color
        drawerInactiveTintColor: '#333', // Inactive item text color
        drawerLabelStyle: styles.drawerLabel, // Label style
        drawerStyle: styles.drawerStyle, // Drawer style
      }}
    >
      <Drawer.Screen
        name="MainMenu"
        component={MainMenuScreenTs}
        // options={{
        //   drawerIcon: ({ color }) => <Ionicons name="home" size={20} color={color} />,
        // }}
      />
      <Drawer.Screen
        name="FindRecipe"
        component={FindRecipeScreenTs}
        // options={{
        //   drawerIcon: ({ color }) => <Ionicons name="search" size={20} color={color} />,
        // }}
      />
      <Drawer.Screen
        name="MealCalender"
        component={MealCalenderScreenTs}
        // options={{
        //   drawerIcon: ({ color }) => <Ionicons name="calendar" size={20} color={color} />,
        // }}
      />
      <Drawer.Screen
        name="SavedRecipe"
        component={SavedRecipeScreenTs}
        // options={{
        //   drawerIcon: ({ color }) => <Ionicons name="bookmark" size={20} color={color} />,
        // }}
      />
      <Drawer.Screen
        name="ShoppingList"
        component={ShoppingListScreenTs}
        // options={{
        //   drawerIcon: ({ color }) => <Ionicons name="cart" size={20} color={color} />,
        // }}
      />
      <Drawer.Screen
        name="UploadRecipe"
        component={UploadRecipeScreenTs}
        // options={{
        //   drawerIcon: ({ color }) => <Ionicons name="cloud-upload" size={20} color={color} />,
        // }}
      />
        <Drawer.Screen
        name="Recipe"
        component={ViewRecipeScreenTs}
        // options={{
        //   drawerIcon: ({ color }) => <Ionicons name="cloud-upload" size={20} color={color} />,
        // }}
      />
        <Drawer.Screen
        name="SignIn"
        component={SignInScreen}
        // options={{
        //   drawerIcon: ({ color }) => <Ionicons name="cloud-upload" size={20} color={color} />,
        // }}
      />
        <Drawer.Screen
        name="MainAppScreen"
        component={MainAppScreenTs}
        // options={{
        //   drawerIcon: ({ color }) => <Ionicons name="cloud-upload" size={20} color={color} />,
        // }}
      />
       
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerBackground: {
    backgroundColor: '#E0F2E9', // Light green background
  },
  drawerHeader: {
    padding: 20,
    backgroundColor: '#4CAF50', // Header background color
    marginBottom: 10,
  },
  drawerHeaderText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  drawerStyle: {
    backgroundColor: '#E0F2E9', // Light green background
    width: 240, // Adjust the width of the drawer
  },
});

export default DrawerNavigatorTs;