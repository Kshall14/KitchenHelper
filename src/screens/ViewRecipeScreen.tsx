// src/screens/ViewRecipeScreenTs.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, SavedRecipe } from '../components/Types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchRecipeInformationRequest } from '../redux/slices/recipeInfoSlice';
import ImageBackground4 from '../components/ImageBackground2';
import { addSavedRecipe, removeSavedRecipe } from '../redux/slices/savedRecipesSlice';

type RecipeScreenRouteProp = RouteProp<RootStackParamList, 'Recipe'>;

type RecipeScreenProps = {
  route: RecipeScreenRouteProp;
};

const ViewRecipeScreenTs: React.FC<RecipeScreenProps> = ({ route }) => {
  const { recipeId, recipe: passedRecipe } = route.params;
  const dispatch = useDispatch();
  const { recipe, loading, error } = useSelector((state: RootState) => state.recipeInfo);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  useEffect(() => {
    if (!passedRecipe) {
      // Fetch recipe information if not passed via navigation
      dispatch(fetchRecipeInformationRequest(recipeId));
    } else {
      // Use the passed recipe and check if it's favorited
      checkIfFavorited(passedRecipe.id);
    }
  }, [recipeId, passedRecipe]);

  useEffect(() => {
    if (recipe) {
      checkIfFavorited(recipe.id); // Check if the fetched recipe is favorited
    }
  }, [recipe]);

  const checkIfFavorited = async (id: number) => {
    try {
      const savedRecipes = await AsyncStorage.getItem('savedRecipes');
      if (savedRecipes) {
        const recipes = JSON.parse(savedRecipes);
        const isSaved = recipes.some((recipe: SavedRecipe) => recipe.id === id);
        setIsFavorited(isSaved);
      }
    } catch (err) {
      console.error('Failed to check if recipe is favorited:', err);
    }
  };

  const toggleFavorite = async () => {
    const displayedRecipe = recipe || passedRecipe;
    if (!displayedRecipe) return;

    try {
      const savedRecipes = await AsyncStorage.getItem('savedRecipes');
      let updatedRecipes: SavedRecipe[] = savedRecipes ? JSON.parse(savedRecipes) : [];

      if (isFavorited) {
        // Remove the recipe from favorites
        updatedRecipes = updatedRecipes.filter((r: SavedRecipe) => r.id !== displayedRecipe.id);
        dispatch(removeSavedRecipe(displayedRecipe.id)); // Update Redux store
      } else {
        // Add the recipe to favorites
        updatedRecipes = [...updatedRecipes, displayedRecipe];
        dispatch(addSavedRecipe(displayedRecipe)); // Update Redux store
      }

      await AsyncStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes)); // Update Async Storage
      setIsFavorited(!isFavorited);
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
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

  const displayedRecipe = recipe || passedRecipe;

  if (!displayedRecipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Recipe not found.</Text>
      </View>
    );
  }

  return (
    <ImageBackground4>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{displayedRecipe.title}</Text>
        <Image source={{ uri: displayedRecipe.image }} style={styles.recipeImage} />
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <Text style={styles.favoriteButtonText}>
            {isFavorited ? 'Unfavorite' : 'Favorite'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Instructions:</Text>
        {displayedRecipe.analyzedInstructions?.[0]?.steps.map((step: any) => (
          <Text key={step.number} style={styles.stepText}>
            {step.number}. {step.step}
          </Text>
        ))}
      </ScrollView>
    </ImageBackground4>
  );
};

// Styles remain the same as before
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#F0FFF0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  favoriteButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  favoriteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepText: {
    fontSize: 16,
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default ViewRecipeScreenTs;