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
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../components/Types';
import { StackNavigationProp } from '@react-navigation/stack';
import { fetchRandomRecipesRequest } from '../redux/slices/randomRecipeSlice';
import { RootState } from '../redux/store';

const RandomRecipesScreenTs: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Recipe'>>();

  // Access Redux state
  const { randomRecipes, loading, error } = useSelector((state: RootState) => state.randomRecipes);
  const { displayName } = useSelector((state: RootState) => state.user); // Access displayName from the user slice

  useEffect(() => {
    dispatch(fetchRandomRecipesRequest()); // Fetch random recipes on component mount
  }, []);

  const handleViewRecipe = (recipeId: number) => {
    navigation.navigate('Recipe', { recipeId });
  };

  const handleRefresh = () => {
    dispatch(fetchRandomRecipesRequest()); // Fetch new random recipes
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
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

  if (!Array.isArray(randomRecipes) || randomRecipes.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No recipes found.</Text>
      </View>
    );
  }

  const recipeOfTheDay = randomRecipes[0]; // Use the first recipe as the "Recipe of the Day"

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* Welcome Message */}
        {displayName && (
          <Text style={styles.welcomeText}>Welcome, {displayName}!</Text>
        )}

        {/* Recipe of the Day */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: recipeOfTheDay.image }} style={styles.heroImage} />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Recipe of the Day!</Text>
            <Text style={styles.heroDescription}>{recipeOfTheDay.title}</Text>
            <Text style={styles.heroTime}>{recipeOfTheDay.readyInMinutes} minutes</Text>
            <TouchableOpacity
              style={styles.heroButton}
              onPress={() => handleViewRecipe(recipeOfTheDay.id)}
            >
              <Text style={styles.heroButtonText}>View Recipe</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Random Recipes Carousel */}
        <Text style={styles.carouselTitle}>More Recipes to Try</Text>
        <FlatList
          horizontal
          data={randomRecipes.slice(1)} // Exclude the first recipe (used as Recipe of the Day)
          renderItem={({ item }) => (
            <View style={styles.recipeCard}>
              <Image source={{ uri: item.image }} style={styles.recipeImage} />
              <View style={styles.recipeDetails}>
                <Text style={styles.recipeTitle}>{item.title}</Text>
                <Text style={styles.recipeTime}>{item.readyInMinutes} minutes</Text>
                <TouchableOpacity
                  style={styles.viewRecipeButton}
                  onPress={() => handleViewRecipe(item.id)}
                >
                  <Text style={styles.viewRecipeButtonText}>View Recipe</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />

        {/* Refresh Button */}
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <Text style={styles.refreshButtonText}>Refresh Recipes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C1D7AE', // Light green background
  },
  scrollContainer: {
    padding: 16,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B5B95', // Dark green
    marginBottom: 16,
  },
  heroContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  heroImage: {
    width: '100%',
    height: 200,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  heroDescription: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
  },
  heroTime: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  heroButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#6B5B95', // Dark green
  },
  recipeCard: {
    width: 160,
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: '#EDD7F1',
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: 120,
  },
  recipeDetails: {
    padding: 8,
  },
  recipeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recipeTime: {
    fontSize: 12,
    color: '#666',
  },
  viewRecipeButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  viewRecipeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  refreshButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 24,
  },
  refreshButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default RandomRecipesScreenTs;