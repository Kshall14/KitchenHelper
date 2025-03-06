import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Keyboard,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchShoppingListItems, deleteIngredientFromShoppingList, saveIngredientsToShoppingList } from '../waterMelonDB/helpers';
import { ShoppingListItem } from '../components/Types';

const ShoppingListTs: React.FC = () => {
  const [shoppingListItems, setShoppingListItems] = useState<ShoppingListItem[]>([]);
  const [groupedItems, setGroupedItems] = useState<{ title: string; data: ShoppingListItem[] }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newItemText, setNewItemText] = useState<string>(''); // State for user input

  // Fetch shopping list items when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const loadShoppingList = async () => {
        try {
          const items = await fetchShoppingListItems();
          setShoppingListItems(items);
          groupItemsByRecipe(items); // Group items by recipe name
        } catch (error) {
          console.error('Error fetching shopping list items:', error);
        } finally {
          setLoading(false);
        }
      };

      loadShoppingList();
    }, [])
  );

  // Group items by recipe name
  const groupItemsByRecipe = (items: ShoppingListItem[]) => {
    const grouped: { [key: string]: ShoppingListItem[] } = {};

    items.forEach((item) => {
      const recipeName = item.recipeName || 'Personal Item';
      if (!grouped[recipeName]) {
        grouped[recipeName] = [];
      }
      grouped[recipeName].push(item);
    });

    const sections = Object.keys(grouped).map((key) => ({
      title: key,
      data: grouped[key],
    }));

    setGroupedItems(sections);
  };

  // Handle deleting an item from the shopping list
  const handleDeleteItem = async (id: string) => {
    try {
      await deleteIngredientFromShoppingList(id);
      // Remove the deleted item from the local state
      const updatedItems = shoppingListItems.filter((item) => item.id !== id);
      setShoppingListItems(updatedItems);
      groupItemsByRecipe(updatedItems); // Re-group items
    } catch (error) {
      console.error('Error deleting item from shopping list:', error);
    }
  };

  // Handle adding a new user-input item to the shopping list
  const handleAddUserItem = async () => {
    if (!newItemText.trim()) return; // Don't add empty items

    try {
      // Save the new item to WatermelonDB
      await saveIngredientsToShoppingList([newItemText], 'Personal Item');

      // Refresh the shopping list
      const items = await fetchShoppingListItems();
      setShoppingListItems(items);
      groupItemsByRecipe(items); // Re-group items

      // Clear the input field and dismiss the keyboard
      setNewItemText('');
      Keyboard.dismiss();
    } catch (error) {
      console.error('Error adding user item to shopping list:', error);
    }
  };

  // Render each shopping list item
  const renderItem = ({ item }: { item: ShoppingListItem }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.ingredientText}>{item.ingredient}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteItem(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  // Render section headers
  const renderSectionHeader = ({ section }: { section: { title: string } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  // Show a loading indicator while fetching data
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Input field for adding new items */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new item..."
          placeholderTextColor="#888"
          value={newItemText}
          onChangeText={setNewItemText}
          onSubmitEditing={handleAddUserItem} // Add item when the user presses "Enter"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddUserItem}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Shopping list */}
      <SectionList
        sections={groupedItems}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your shopping list is empty.</Text>
        }
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#C1D7AE',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  sectionHeader: {
    backgroundColor: '#6B5B95',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemContainer: {
    backgroundColor: '#EDD7F1',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ingredientText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  deleteButton: {
    backgroundColor: '#FF5252',
    padding: 8,
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default ShoppingListTs;