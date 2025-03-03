import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';
import ImageBackground2 from '../components/ImageBackground2';
import { SavedRecipe } from '../components/Types'; // Import from the combined Types.ts
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../components/Types'; // Import from the combined Types.ts
import { StackNavigationProp } from '@react-navigation/stack';

const SavedRecipesScreenTs = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SavedRecipe'>>(); 
  const savedRecipes = useSelector((state: RootState) => state.savedRecipes);

  const handleViewRecipe = (recipe: SavedRecipe) => {
    navigation.navigate('Recipe', { recipeId: recipe.id, recipe }); // Pass both recipeId and recipe
  };

  return (
    <ImageBackground2>
      <View style={styles.container}>
        <Text style={styles.title}>Saved Recipes</Text>
        {savedRecipes.length === 0 ? (
          <Text style={styles.noRecipesText}>No saved recipes found.</Text>
        ) : (
          <FlatList
            data={savedRecipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.recipeCard}
                onPress={() => handleViewRecipe(item)}
              >
                <Image source={{ uri: item.image }} style={styles.recipeImage} />
                <Text style={styles.recipeTitle}>{item.title}</Text>
                <Text style={styles.recipeTime}>Ready in {item.readyInMinutes} minutes</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </ImageBackground2>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  noRecipesText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  recipeCard: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  recipeImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recipeTime: {
    fontSize: 14,
    color: '#666',
  },
});

export default SavedRecipesScreenTs;