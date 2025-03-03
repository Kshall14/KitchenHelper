// ShoppingListScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function ShoppingListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Shopping List Screen</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShoppingListScreen;