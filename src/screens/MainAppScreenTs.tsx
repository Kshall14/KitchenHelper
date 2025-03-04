// src/screens/RandomRecipesScreenTs.tsx
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../components/Types';
import { StackNavigationProp } from '@react-navigation/stack';
import ImageBackground2 from '../components/ImageBackground2';
import { fetchRandomRecipesRequest } from '../redux/slices/randomRecipeSlice';
import { RootState } from '../redux/store';

const RandomRecipesScreenTs: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Recipe'>>();

  // Access Redux state
  const { randomRecipes, loading, error } = useSelector((state: RootState) => state.randomRecipes);

  useEffect(() => {
    dispatch(fetchRandomRecipesRequest()); // Fetch random recipes on component mount
  }, []);

  const handleViewRecipe = (recipeId: number) => {
    navigation.navigate('Recipe', { recipeId });
  };

  const handleGoToSavedRecipes = () => {
    navigation.navigate('SavedRecipe');
  };

  const handleFindNewRecipe = () => {
    navigation.navigate('FindRecipe');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!Array.isArray(randomRecipes)) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No recipes found.</Text>
      </View>
    );
  }

  return (
    <ImageBackground2>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Check out these recipes!</Text>
        <View style={styles.recipeList}>
          {randomRecipes.map((recipe) => (
            <View key={recipe.id} style={styles.recipeCard}>
              <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
              <View style={styles.recipeDetails}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <View style={styles.timeContainer}>
                  <Image source={require('../../assets/ClockIcon.png')} style={styles.clockIcon} />
                  <Text style={styles.recipeTime}>{recipe.readyInMinutes} minutes</Text>
                </View>
                <TouchableOpacity
                  style={styles.viewRecipeButton}
                  onPress={() => handleViewRecipe(recipe.id)}
                >
                  <Text style={styles.viewRecipeButtonText}>View Recipe</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.bottomButton} onPress={handleGoToSavedRecipes}>
          <Text style={styles.bottomButtonText}>Go to Saved Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={handleFindNewRecipe}>
          <Text style={styles.bottomButtonText}>Find a New Recipe</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground2>
  );
};

// Styles remain the same as before
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  recipeList: {
    marginBottom: 16,
  },
  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  recipeDetails: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  clockIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  recipeTime: {
    fontSize: 14,
    color: '#666',
  },
  viewRecipeButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  viewRecipeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  bottomButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  bottomButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RandomRecipesScreenTs;