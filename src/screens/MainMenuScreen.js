// MainMenuScreen.js
import React from 'react';
import { useState } from 'react';
import { View, Text, Button, FlatList,StyleSheet } from 'react-native';
import { findRecipesByIngredients } from '../api/ApiHandler';
function MainMenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Main Menu Screen</Text>
      <Button
        title="Open Drawer"
        onPress={() => navigation.openDrawer()} // Open the drawer
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
      },
      recipeItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      recipeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      error: {
        color: 'red',
        marginTop: 16,
      },
});

export default MainMenuScreen;