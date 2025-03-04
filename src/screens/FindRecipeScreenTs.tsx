import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../components/Types';
import { StackNavigationProp } from '@react-navigation/stack';
import ImageBackground2 from '../components/ImageBackground2';
import {
  fetchRecipesByIngredientsRequest,
  fetchRecipesByOnlyIngredientsRequest, // Import the new action
} from '../redux/slices/recipeSlice';
import { RootState } from '../redux/store';
import { Recipe } from '../components/Types';

const FindRecipeScreenTs: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'FindRecipe'>>();

  // Access Redux state
  const { recipes, recipesOnlyIngredients, loading, error } = useSelector(
    (state: RootState) => state.recipes
  );

  const addIngredient = () => {
    if (ingredients.length < 10) {
      setIngredients([...ingredients, '']);
    }
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    }
  };

  const handleIngredientChange = (text: string, index: number) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = text;
    setIngredients(newIngredients);
  };

  const handleFetchRecipes = () => {
    const ingredientsString = ingredients.join(',');
    dispatch(fetchRecipesByIngredientsRequest(ingredientsString)); // Dispatch Redux action
  };

  const handleFetchRecipesOnlyIngredients = () => {
    const ingredientsString = ingredients.join(',');
    dispatch(fetchRecipesByOnlyIngredientsRequest(ingredientsString)); // Dispatch the new action
  };

  const handleViewRecipe = (recipeId: number) => {
    navigation.navigate('Recipe', { recipeId });
  };

  const renderRecipeItem = ({ item }: { item: Recipe }) => (
    <View style={styles.recipeItem}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.title}</Text>
      <Text style={styles.recipeDetails}>
        Used Ingredients: {item.usedIngredientCount} | Missing Ingredients:{' '}
        {item.missedIngredientCount}
      </Text>
      <TouchableOpacity
        style={styles.viewRecipeButton}
        onPress={() => handleViewRecipe(item.id)}
      >
        <Text style={styles.viewRecipeButtonText}>View Recipe</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground2>
    <View style={styles.container}>
      <Text style={styles.title}>Find a Recipe!</Text>
      <Text style={styles.subtitle}>Enter ingredients:</Text>

      {/* Ingredient Inputs */}
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientRow}>
          <TextInput
            style={styles.input}
            placeholder={`Ingredient ${index + 1}`}
            placeholderTextColor="#888"
            value={ingredient}
            onChangeText={(text) => handleIngredientChange(text, index)}
          />
          {ingredients.length > 1 && (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeIngredient(index)}
            >
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* Add Ingredient Button */}
      {ingredients.length < 10 && (
        <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
          <Text style={styles.addButtonText}>+ Add Ingredient</Text>
        </TouchableOpacity>
      )}

      {/* Search Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: '#FF6F61' }]} // Coral color
          onPress={handleFetchRecipes}
          disabled={loading}
        >
          <Text style={styles.searchButtonText}>Search for Recipes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: '#6B5B95' }]} // Purple color
          onPress={handleFetchRecipesOnlyIngredients}
          disabled={loading}
        >
          <Text style={styles.searchButtonText}>Search (Only Ingredients)</Text>
        </TouchableOpacity>
      </View>

      {/* Loading and Error States */}
      {loading ? (
        <ActivityIndicator size="large" color="#6B5B95" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        <FlatList
          data={recipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.recipeList}
        />
      )}

      {/* Optional: Display results from the second search */}
      {recipesOnlyIngredients.length > 0 && (
        <>
          <Text style={styles.subtitle}>Recipes with Only Ingredients:</Text>
          <FlatList
            data={recipesOnlyIngredients}
            renderItem={renderRecipeItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.recipeList}
          />
        </>
      )}
    </View>
  </ImageBackground2>
);
};

// Styles remain the same as before
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 16,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  recipeList: {
    marginTop: 16,
  },
  recipeItem: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#EDD7F1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  recipeDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  viewRecipeButton: {
    backgroundColor: '#6B5B95', // Purple
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewRecipeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#FF6F61', // Coral
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  searchButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#FF5252', // Red
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: '#FF5252', // Red
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FindRecipeScreenTs;